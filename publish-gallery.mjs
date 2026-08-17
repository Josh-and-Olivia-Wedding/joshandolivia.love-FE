#!/usr/bin/env node

import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { planPublish, serializeJson } from './publish-gallery-lib.mjs';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BOOLEAN_FLAGS = new Set(['help', 'h', 'skip-s3', 'dry-run', 'delete']);

function printHelp() {
	console.log(`Usage:
  node publish-gallery.mjs --slug <slug> --name <gallery name> --date YYYY-MM-DD [--skip-s3] [--dry-run] [--delete]

Syncs staging to S3, then writes gallery catalog JSON and the CRA media map from .gallery-staging/{slug}/.
Use --skip-s3 to write catalog files only without calling AWS.
Use --dry-run to print the publish plan without calling AWS or writing catalog files.
Use --delete to pass --delete to aws s3 sync (removes S3 keys absent from staging).
This command does not ingest or resize media. Run upload-gallery.mjs first to stage media.
`);
}

function parseArgs(argv) {
	const args = { skipS3: false, dryRun: false, delete: false };
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
			if (key === 'dry-run') {
				args.dryRun = true;
			}
			if (key === 'delete') {
				args.delete = true;
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

const S3_BUCKET = 'sideris-wedding-images';
const S3_REGION = 'us-east-2';
const S3_PROFILE = 'personal';

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

function resolveAwsBin() {
	return process.env.PUBLISH_AWS_BIN ?? 'aws';
}

async function readExistingCatalog(catalogPath) {
	const raw = await fs.readFile(catalogPath, 'utf8');
	return JSON.parse(raw);
}

async function syncStagingToS3({ stagingDir, slug, awsBin, deleteRemote }) {
	const source = path.resolve(stagingDir);
	const destination = `s3://${S3_BUCKET}/uploads/galleries/${slug}/`;
	const awsArgs = [
		's3',
		'sync',
		source,
		destination,
		'--profile',
		S3_PROFILE,
		'--region',
		S3_REGION,
		'--exclude',
		'media.json',
	];
	if (deleteRemote) {
		awsArgs.push('--delete');
	}
	const { stderr } = await execFileAsync(awsBin, awsArgs, {
		maxBuffer: 10 * 1024 * 1024,
	});

	if (stderr) {
		process.stderr.write(stderr);
	}

	return destination;
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

	if (args.skipS3 && args.delete) {
		console.error('Cannot use --delete with --skip-s3.');
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
	const s3Destination = `s3://${S3_BUCKET}/uploads/galleries/${slug}/`;

	if (args.dryRun) {
		console.log(`Gallery slug: ${slug}`);
		console.log(`S3 destination: ${s3Destination}`);
		console.log(`S3 --delete: ${args.delete ? 'yes' : 'no'}`);
		console.log(`Gallery JSON: ${galleryJsonPath}`);
		console.log(`Catalog: ${paths.catalogPath}`);
		console.log(`Media map: ${paths.mapPath}`);
		console.log(`Media count: ${plan.media.length}`);
		return;
	}

	let syncedDestination;
	if (!args.skipS3) {
		const stagingDir = path.join(paths.stagingRoot, slug);
		try {
			syncedDestination = await syncStagingToS3({
				stagingDir,
				slug,
				awsBin: resolveAwsBin(),
				deleteRemote: args.delete,
			});
		} catch (error) {
			console.error('S3 sync failed.');
			if (error.stderr) {
				process.stderr.write(error.stderr);
			} else {
				console.error(error.message);
			}
			process.exit(1);
		}
	}

	await fs.mkdir(path.dirname(galleryJsonPath), { recursive: true });
	await fs.writeFile(galleryJsonPath, serializeJson(plan.media));
	await fs.writeFile(paths.catalogPath, serializeJson(plan.nextCatalog));
	await fs.writeFile(paths.mapPath, plan.mediaFilesSource);

	console.log(`Gallery slug: ${slug}`);
	if (syncedDestination) {
		console.log(`S3 destination: ${syncedDestination}`);
	}
	console.log(`Gallery JSON: ${galleryJsonPath}`);
	console.log(`Catalog: ${paths.catalogPath}`);
	console.log(`Media map: ${paths.mapPath}`);
	console.log(`Media count: ${plan.media.length}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
