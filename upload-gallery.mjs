#!/usr/bin/env node

import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
	getFileExtension,
	isProcessableImage,
	isProcessableVideo,
	isSkippableVideo,
	sanitizeFileStem,
	slugifyGalleryId,
	toGalleryMediaRecord,
	toGalleryVideoRecord,
} from './upload-gallery-lib.mjs';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKIP_DIRS = new Set(['.gallery-staging', 'node_modules', '.git']);
const BOOLEAN_FLAGS = new Set(['help', 'h', 'dry-run']);

function printHelp() {
	console.log(`Usage:
  node upload-gallery.mjs --folder <dir> --name <gallery name> --date YYYY-MM-DD [--dry-run]

Stages webp thumbnails and compressed images, plus transcoded mp4 videos with poster
thumbnails, under .gallery-staging/{slug}/ (or INGEST_STAGING_ROOT).
Images use sharp (100x100 thumb, 2560 compressed webp, quality 85).
Videos use ffmpeg (H.264 AAC mp4, max edge 1920, CRF 23) and a 100x100 webp poster.
Set INGEST_FFMPEG_BIN to override the ffmpeg executable path.
Set INGEST_STAGING_ROOT to override the staging directory root.
Use --dry-run to scan and print what would be processed without writing files.
This command does not upload to S3 or update src/galleries.json.
Missing ffmpeg fails individual videos but images still process.
Re-running overwrites the staging directory for that slug.
After ingest, run publish-gallery.mjs to sync and update the catalog.
`);
}

function parseArgs(argv) {
	const args = { dryRun: false };
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
		if (BOOLEAN_FLAGS.has(key)) {
			if (key === 'dry-run') {
				args.dryRun = true;
			}
			continue;
		}
		const value = argv[i + 1];
		if (!value || value.startsWith('--')) {
			throw new Error(`Missing value for --${key}`);
		}
		args[key] = value;
		i += 1;
	}
	return args;
}

function resolveStagingRoot() {
	return process.env.INGEST_STAGING_ROOT ?? path.join(__dirname, '.gallery-staging');
}

function resolveFfmpegBin() {
	return process.env.INGEST_FFMPEG_BIN ?? 'ffmpeg';
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

function classifyFile(relativePath) {
	const ext = getFileExtension(relativePath);
	if (isProcessableImage(ext)) {
		return 'image';
	}
	if (isProcessableVideo(ext)) {
		return 'video';
	}
	if (isSkippableVideo(ext)) {
		return 'unsupported-video';
	}
	return 'unsupported';
}

async function warnIfFfmpegMissing(files, ffmpegBin) {
	const hasVideo = files.some((file) => classifyFile(file.relativePath) === 'video');
	if (!hasVideo) {
		return;
	}

	try {
		await execFileAsync(ffmpegBin, ['-version'], { maxBuffer: 1024 * 1024 });
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.error(
				'ffmpeg not found (set INGEST_FFMPEG_BIN). Videos will fail; images still process.'
			);
		}
	}
}

async function removeIfExists(filePath) {
	try {
		await fs.rm(filePath, { force: true });
	} catch {
		// ignore
	}
}

async function runFfmpeg(ffmpegBin, args) {
	try {
		await execFileAsync(ffmpegBin, args, { maxBuffer: 20 * 1024 * 1024 });
	} catch (error) {
		if (error.code === 'ENOENT') {
			throw new Error('ffmpeg not found');
		}
		const stderr = error.stderr ? String(error.stderr) : error.message;
		throw new Error(stderr.trim() || 'ffmpeg failed');
	}
}

async function transcodeVideo(filePath, outputPath, ffmpegBin) {
	const scaleFilter =
		"scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2";

	const withAudioArgs = [
		'-y',
		'-i',
		filePath,
		'-vf',
		scaleFilter,
		'-c:v',
		'libx264',
		'-pix_fmt',
		'yuv420p',
		'-preset',
		'medium',
		'-crf',
		'23',
		'-c:a',
		'aac',
		'-movflags',
		'+faststart',
		outputPath,
	];

	try {
		await runFfmpeg(ffmpegBin, withAudioArgs);
		return;
	} catch {
		const videoOnlyArgs = [
			'-y',
			'-i',
			filePath,
			'-vf',
			scaleFilter,
			'-c:v',
			'libx264',
			'-pix_fmt',
			'yuv420p',
			'-preset',
			'medium',
			'-crf',
			'23',
			'-an',
			'-movflags',
			'+faststart',
			outputPath,
		];
		await runFfmpeg(ffmpegBin, videoOnlyArgs);
	}
}

async function extractPosterFrame(filePath, posterPath, ffmpegBin) {
	const seekTimes = ['0', '1'];
	let lastError;

	for (const seek of seekTimes) {
		await removeIfExists(posterPath);
		try {
			await runFfmpeg(ffmpegBin, [
				'-y',
				'-ss',
				seek,
				'-i',
				filePath,
				'-frames:v',
				'1',
				'-update',
				'1',
				'-q:v',
				'2',
				posterPath,
			]);
			await fs.stat(posterPath);
			return;
		} catch (error) {
			lastError = error;
		}
	}

	throw lastError ?? new Error('ffmpeg poster extraction failed');
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

async function processVideo(filePath, stem, stagingDir, ffmpegBin) {
	const outputPath = path.join(stagingDir, 'videos', `${stem}.mp4`);
	const posterPath = path.join(stagingDir, 'thumbnails', `${stem}.webp`);
	const tempPosterPath = path.join(
		os.tmpdir(),
		`upload-gallery-${process.pid}-${stem}-${Date.now()}.png`
	);

	await removeIfExists(outputPath);
	await removeIfExists(posterPath);

	try {
		await transcodeVideo(filePath, outputPath, ffmpegBin);
		await extractPosterFrame(outputPath, tempPosterPath, ffmpegBin);

		const posterBuffer = await sharp(tempPosterPath)
			.resize({ width: 100, height: 100, fit: 'inside', withoutEnlargement: true })
			.webp({ quality: 85 })
			.toBuffer();

		await fs.writeFile(posterPath, posterBuffer);
		const stats = await fs.stat(outputPath);
		return stats.size;
	} catch (error) {
		await removeIfExists(outputPath);
		await removeIfExists(posterPath);
		throw error;
	} finally {
		await removeIfExists(tempPosterPath);
	}
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

	const stagingRoot = resolveStagingRoot();
	const stagingDir = path.join(stagingRoot, slug);
	const ffmpegBin = resolveFfmpegBin();
	const files = await walkFiles(folderPath);

	let processed = 0;
	let skipped = 0;

	for (const file of files) {
		const kind = classifyFile(file.relativePath);
		if (kind === 'image') {
			console.log(`Would process image: ${file.relativePath}`);
			processed += 1;
			continue;
		}
		if (kind === 'video') {
			console.log(`Would process video: ${file.relativePath}`);
			processed += 1;
			continue;
		}
		if (kind === 'unsupported-video') {
			console.log(`Would skip unsupported video: ${file.relativePath}`);
			skipped += 1;
			continue;
		}
		console.log(`Would skip unsupported file: ${file.relativePath}`);
		skipped += 1;
	}

	if (args.dryRun) {
		if (files.some((file) => classifyFile(file.relativePath) === 'video')) {
			console.error(
				'A real run requires ffmpeg (set INGEST_FFMPEG_BIN).'
			);
		}

		if (processed === 0) {
			console.error('No media were processed.');
			process.exit(1);
		}

		console.log(`Gallery slug: ${slug}`);
		console.log(`Processed: ${processed}`);
		console.log(`Skipped: ${skipped}`);
		console.log(`Staging path: ${stagingDir}`);
		return;
	}

	await warnIfFfmpegMissing(files, ffmpegBin);

	await fs.rm(stagingDir, { recursive: true, force: true });
	await fs.mkdir(path.join(stagingDir, 'thumbnails'), { recursive: true });
	await fs.mkdir(path.join(stagingDir, 'compressed'), { recursive: true });
	await fs.mkdir(path.join(stagingDir, 'videos'), { recursive: true });

	const usedStems = new Set();
	const records = [];
	let failed = 0;
	processed = 0;
	skipped = 0;

	for (const file of files) {
		const ext = getFileExtension(file.relativePath);

		if (isProcessableImage(ext)) {
			const stem = sanitizeFileStem(file.relativePath, usedStems);
			try {
				const compressedSize = await processImage(file.absolutePath, stem, stagingDir);
				records.push(toGalleryMediaRecord({ slug, stem, compressedSize }));
				processed += 1;
			} catch (error) {
				console.error(`Failed to process ${file.relativePath}: ${error.message}`);
				failed += 1;
			}
			continue;
		}

		if (isProcessableVideo(ext)) {
			const stem = sanitizeFileStem(file.relativePath, usedStems);
			try {
				const videoSize = await processVideo(
					file.absolutePath,
					stem,
					stagingDir,
					ffmpegBin
				);
				records.push(toGalleryVideoRecord({ slug, stem, videoSize }));
				processed += 1;
			} catch (error) {
				console.error(`Failed to process ${file.relativePath}: ${error.message}`);
				failed += 1;
			}
			continue;
		}

		if (isSkippableVideo(ext)) {
			console.log(`Skipping unsupported video: ${file.relativePath}`);
			skipped += 1;
			continue;
		}

		console.log(`Skipping unsupported file: ${file.relativePath}`);
		skipped += 1;
	}

	if (processed === 0) {
		console.error('No media were processed.');
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
