#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { planPublish, serializeJson } from './publish-gallery-lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BOOLEAN_FLAGS = new Set(['help', 'h', 'skip-s3']);

function printHelp() {
	console.log(`Usage:
  node publish-gallery.mjs --slug <slug> --name <gallery name> --date YYYY-MM-DD --skip-s3

Writes gallery catalog JSON and the CRA media map from .gallery-staging/{slug}/.
This command does not ingest or resize images. S3 sync is not implemented yet.
Videos are unsupported.
`);
}

function parseArgs(argv) {
	const args = { skipS3: false };
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
			if (key === 'skip-s3') {
				args.skipS3 = true;
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

function resolvePaths() {
	const stagingRoot = process.env.PUBLISH_STAGING_ROOT
		?? path.join(__dirname, '.gallery-staging');
	const srcRoot = process.env.PUBLISH_SRC_ROOT ?? path.join(__dirname, 'src');

	return {
		stagingRoot,
		srcRoot,
		catalogPath: path.join(srcRoot, 'galleries.json'),
		galleryJsonPath: (slug) => path.join(srcRoot, 'galleries', `${slug}.json`),
		mapPath: path.join(srcRoot, 'scripts', 'gallery-media-files.ts'),
	};
}

async function readExistingCatalog(catalogPath) {
	const raw = await fs.readFile(catalogPath, 'utf8');
	return JSON.parse(raw);
}

async function main(argv = process.argv.slice(2)) {
	let args;
	try {
		args = parseArgs(argv);
	} catch (error) {
		console.error(error.message);
		printHelp();
		process.exit(1);
	}

	if (args.help) {
		printHelp();
		process.exit(0);
	}

	const slug = args.slug;
	const name = args.name;
	const date = args.date;

	if (!slug || !name || !date) {
		console.error('Missing required arguments: --slug, --name, --date');
		printHelp();
		process.exit(1);
	}

	if (!args.skipS3) {
		console.error('S3 sync is not implemented yet. Re-run with --skip-s3 to write catalog files only.');
		process.exit(1);
	}

	const paths = resolvePaths();

	let existingCatalog;
	try {
		existingCatalog = await readExistingCatalog(paths.catalogPath);
	} catch (error) {
		console.error(`Failed to read catalog: ${paths.catalogPath}`);
		console.error(error.message);
		process.exit(1);
	}

	let plan;
	try {
		plan = await planPublish({
			stagingRoot: paths.stagingRoot,
			slug,
			name,
			date,
			existingCatalog,
		});
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}

	const galleryJsonPath = paths.galleryJsonPath(slug);
	await fs.mkdir(path.dirname(galleryJsonPath), { recursive: true });
	await fs.writeFile(galleryJsonPath, serializeJson(plan.media));
	await fs.writeFile(paths.catalogPath, serializeJson(plan.nextCatalog));
	await fs.writeFile(paths.mapPath, plan.mediaFilesSource);

	console.log(`Gallery slug: ${slug}`);
	console.log(`Gallery JSON: ${galleryJsonPath}`);
	console.log(`Catalog: ${paths.catalogPath}`);
	console.log(`Media map: ${paths.mapPath}`);
	console.log(`Media count: ${plan.media.length}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
