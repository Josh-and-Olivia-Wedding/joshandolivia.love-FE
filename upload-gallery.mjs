#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
	getFileExtension,
	isProcessableImage,
	isSkippableVideo,
	sanitizeFileStem,
	slugifyGalleryId,
	toGalleryMediaRecord,
} from './upload-gallery-lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STAGING_ROOT = path.join(__dirname, '.gallery-staging');
const SKIP_DIRS = new Set(['.gallery-staging', 'node_modules', '.git']);

function printHelp() {
	console.log(`Usage:
  node upload-gallery.mjs --folder <dir> --name <gallery name> --date YYYY-MM-DD

Stages webp thumbnails and compressed images under .gallery-staging/{slug}/.
This command does not upload to S3 or update src/galleries.json (Phase 4).
Videos are skipped. Re-running overwrites the staging directory for that slug.
`);
}

function parseArgs(argv) {
	const args = {};
	for (let i = 0; i < argv.length; i += 1) {
		const arg = argv[i];
		if (arg === '--help' || arg === '-h') {
			args.help = true;
			continue;
		}
		if (!arg.startsWith('--')) {
			continue;
		}
		const key = arg.slice(2);
		const value = argv[i + 1];
		if (!value || value.startsWith('--')) {
			throw new Error(`Missing value for --${key}`);
		}
		args[key] = value;
		i += 1;
	}
	return args;
}

async function walkFiles(rootDir, currentDir = rootDir, files = []) {
	const entries = await fs.readdir(currentDir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(currentDir, entry.name);
		if (entry.isDirectory()) {
			if (SKIP_DIRS.has(entry.name)) {
				continue;
			}
			await walkFiles(rootDir, fullPath, files);
			continue;
		}
		if (entry.isFile()) {
			files.push({
				absolutePath: fullPath,
				relativePath: path.relative(rootDir, fullPath),
			});
		}
	}
	return files;
}

async function processImage(filePath, stem, stagingDir) {
	const thumbBuffer = await sharp(filePath)
		.rotate()
		.resize({ width: 100, height: 100, fit: 'inside', withoutEnlargement: true })
		.webp({ quality: 85 })
		.toBuffer();

	const compressedBuffer = await sharp(filePath)
		.rotate()
		.resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
		.webp({ quality: 85 })
		.toBuffer();

	await fs.writeFile(path.join(stagingDir, 'thumbnails', `${stem}.webp`), thumbBuffer);
	await fs.writeFile(path.join(stagingDir, 'compressed', `${stem}.webp`), compressedBuffer);

	return compressedBuffer.length;
}

async function main() {
	let args;
	try {
		args = parseArgs(process.argv.slice(2));
	} catch (error) {
		console.error(error.message);
		printHelp();
		process.exit(1);
	}

	if (args.help) {
		printHelp();
		process.exit(0);
	}

	const folder = args.folder;
	const name = args.name;
	const date = args.date;

	if (!folder || !name || !date) {
		console.error('Missing required arguments: --folder, --name, --date');
		printHelp();
		process.exit(1);
	}

	const folderPath = path.resolve(folder);
	let folderStat;
	try {
		folderStat = await fs.stat(folderPath);
	} catch {
		console.error(`Folder not found: ${folderPath}`);
		process.exit(1);
	}
	if (!folderStat.isDirectory()) {
		console.error(`Not a directory: ${folderPath}`);
		process.exit(1);
	}

	let slug;
	try {
		slug = slugifyGalleryId(name, date);
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}

	const stagingDir = path.join(STAGING_ROOT, slug);
	await fs.rm(stagingDir, { recursive: true, force: true });
	await fs.mkdir(path.join(stagingDir, 'thumbnails'), { recursive: true });
	await fs.mkdir(path.join(stagingDir, 'compressed'), { recursive: true });

	const files = await walkFiles(folderPath);
	const usedStems = new Set();
	const records = [];
	let processed = 0;
	let skipped = 0;
	let failed = 0;

	for (const file of files) {
		const ext = getFileExtension(file.relativePath);
		if (isSkippableVideo(ext)) {
			console.log(`Skipping video: ${file.relativePath}`);
			skipped += 1;
			continue;
		}
		if (!isProcessableImage(ext)) {
			console.log(`Skipping unsupported file: ${file.relativePath}`);
			skipped += 1;
			continue;
		}

		const stem = sanitizeFileStem(file.relativePath, usedStems);
		try {
			const compressedSize = await processImage(file.absolutePath, stem, stagingDir);
			records.push(toGalleryMediaRecord({ slug, stem, compressedSize }));
			processed += 1;
		} catch (error) {
			console.error(`Failed to process ${file.relativePath}: ${error.message}`);
			failed += 1;
		}
	}

	if (processed === 0) {
		console.error('No images were processed.');
		process.exit(1);
	}

	await fs.writeFile(
		path.join(stagingDir, 'media.json'),
		`${JSON.stringify(records, null, '\t')}\n`
	);

	console.log(`Gallery slug: ${slug}`);
	console.log(`Processed: ${processed}`);
	console.log(`Skipped: ${skipped}`);
	console.log(`Failed: ${failed}`);
	console.log(`Staging path: ${stagingDir}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
