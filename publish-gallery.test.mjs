import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = __dirname;
const SANDBOX_ROOT = path.join(REPO_ROOT, '.decomposer', 'sandbox');
const CLI_PATH = path.join(REPO_ROOT, 'publish-gallery.mjs');

const SLUG = '2024-01-13-ceremony';
const DATE = '2024-01-13';
const NAME = 'Ceremony';

const GUEST_CATALOG = [
	{
		id: 'guest-uploads',
		name: 'Guest photos',
		date: '2024-01-13',
		coverThumbnailPath: null,
		mediaSource: 'legacy',
		hasPhotographers: true,
	},
];

const VALID_MEDIA = [
	{
		relPath: 'DSC_0001.webp',
		thumbnailPath: `/galleries/${SLUG}/thumbnails/DSC_0001.webp`,
		compressedPath: `/galleries/${SLUG}/compressed/DSC_0001.webp`,
		size: 123456,
	},
];

const EMPTY_MAP = `import type { GalleryMediaRecord } from './gallery-media';

export const GALLERY_MEDIA_FILES: Record<string, GalleryMediaRecord[]> = {};
`;

async function makeSandbox() {
	const root = await fs.mkdtemp(path.join(SANDBOX_ROOT, 'publish-cli-'));
	const stagingRoot = path.join(root, 'staging');
	const srcRoot = path.join(root, 'src');

	await fs.mkdir(path.join(stagingRoot, SLUG), { recursive: true });
	await fs.writeFile(
		path.join(stagingRoot, SLUG, 'media.json'),
		`${JSON.stringify(VALID_MEDIA, null, '\t')}\n`
	);

	await fs.mkdir(path.join(srcRoot, 'scripts'), { recursive: true });
	await fs.writeFile(
		path.join(srcRoot, 'galleries.json'),
		`${JSON.stringify(GUEST_CATALOG, null, '\t')}\n`
	);
	await fs.writeFile(path.join(srcRoot, 'scripts', 'gallery-media-files.ts'), EMPTY_MAP);

	return { root, stagingRoot, srcRoot };
}

function runCli(argv, env) {
	return new Promise((resolve) => {
		const child = spawn(process.execPath, [CLI_PATH, ...argv], {
			cwd: REPO_ROOT,
			env: { ...process.env, ...env },
			stdio: ['ignore', 'pipe', 'pipe'],
		});

		let stdout = '';
		let stderr = '';
		child.stdout.on('data', (chunk) => {
			stdout += chunk.toString();
		});
		child.stderr.on('data', (chunk) => {
			stderr += chunk.toString();
		});
		child.on('close', (code) => {
			resolve({ code, stdout, stderr });
		});
	});
}

test('CLI1: --skip-s3 writes gallery JSON, upserts catalog, and regenerates map', async () => {
	const { stagingRoot, srcRoot } = await makeSandbox();

	const result = await runCli(
		['--slug', SLUG, '--name', NAME, '--date', DATE, '--skip-s3'],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
		}
	);

	assert.equal(result.code, 0, result.stderr);

	const galleryJson = JSON.parse(
		await fs.readFile(path.join(srcRoot, 'galleries', `${SLUG}.json`), 'utf8')
	);
	assert.deepEqual(galleryJson, VALID_MEDIA);

	const catalog = JSON.parse(await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8'));
	assert.equal(catalog.length, 2);
	assert.deepEqual(catalog.find((row) => row.id === 'guest-uploads'), GUEST_CATALOG[0]);

	const ceremony = catalog.find((row) => row.id === SLUG);
	assert.equal(ceremony.hasPhotographers, false);
	assert.equal(ceremony.mediaSource, 'galleries/2024-01-13-ceremony.json');

	const mapSource = await fs.readFile(
		path.join(srcRoot, 'scripts', 'gallery-media-files.ts'),
		'utf8'
	);
	assert.match(mapSource, /'galleries\/2024-01-13-ceremony\.json': gallery20240113ceremony/);
});

test('CLI2: without --skip-s3 exits non-zero and does not write dest files', async () => {
	const { stagingRoot, srcRoot } = await makeSandbox();
	const catalogBefore = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');
	const mapBefore = await fs.readFile(
		path.join(srcRoot, 'scripts', 'gallery-media-files.ts'),
		'utf8'
	);

	const result = await runCli(
		['--slug', SLUG, '--name', NAME, '--date', DATE],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
		}
	);

	assert.notEqual(result.code, 0);
	assert.match(result.stderr, /S3 sync is not implemented/);

	const catalogAfter = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');
	const mapAfter = await fs.readFile(
		path.join(srcRoot, 'scripts', 'gallery-media-files.ts'),
		'utf8'
	);
	assert.equal(catalogAfter, catalogBefore);
	assert.equal(mapAfter, mapBefore);

	await assert.rejects(() => fs.stat(path.join(srcRoot, 'galleries', `${SLUG}.json`)));
});

test('CLI3: reserved slug and missing staging do not write dest files', async () => {
	const { stagingRoot, srcRoot } = await makeSandbox();
	const catalogBefore = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');

	const reserved = await runCli(
		['--slug', 'guest-uploads', '--name', NAME, '--date', DATE, '--skip-s3'],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
		}
	);
	assert.notEqual(reserved.code, 0);
	assert.match(reserved.stderr, /guest-uploads/);

	const missingStaging = await runCli(
		['--slug', '2024-01-13-missing', '--name', NAME, '--date', DATE, '--skip-s3'],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
		}
	);
	assert.notEqual(missingStaging.code, 0);
	assert.match(missingStaging.stderr, /Staging directory not found/);

	const catalogAfter = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');
	assert.equal(catalogAfter, catalogBefore);
});
