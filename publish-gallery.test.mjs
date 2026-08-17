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

async function writeFakeAwsScript(dir, { exitCode, logPath }) {
	const scriptPath = path.join(dir, 'fake-aws.mjs');
	const script = `#!/usr/bin/env node
import fs from 'node:fs/promises';

const args = process.argv.slice(2);
await fs.appendFile(${JSON.stringify(logPath)}, \`\${args.join(' ')}\\n\`);
process.exit(${exitCode});
`;
	await fs.writeFile(scriptPath, script);
	await fs.chmod(scriptPath, 0o755);
	return scriptPath;
}

async function makeSandbox() {
	const root = await fs.mkdtemp(path.join(SANDBOX_ROOT, 'publish-cli-'));
	const stagingRoot = path.join(root, 'staging');
	const srcRoot = path.join(root, 'src');
	const awsLogPath = path.join(root, 'aws-log.txt');

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

	return { root, stagingRoot, srcRoot, awsLogPath };
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

async function assertCatalogWrites(srcRoot) {
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
}

test('CLI1: --skip-s3 writes gallery JSON, upserts catalog, and regenerates map', async () => {
	const { stagingRoot, srcRoot, awsLogPath, root } = await makeSandbox();
	const fakeAws = await writeFakeAwsScript(root, { exitCode: 0, logPath: awsLogPath });

	const result = await runCli(
		['--slug', SLUG, '--name', NAME, '--date', DATE, '--skip-s3'],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
			PUBLISH_AWS_BIN: fakeAws,
		}
	);

	assert.equal(result.code, 0, result.stderr);
	await assertCatalogWrites(srcRoot);
	await assert.rejects(() => fs.stat(awsLogPath));
});

test('CLI2: failed aws sync exits non-zero and does not write dest files', async () => {
	const { stagingRoot, srcRoot, awsLogPath, root } = await makeSandbox();
	const catalogBefore = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');
	const mapBefore = await fs.readFile(
		path.join(srcRoot, 'scripts', 'gallery-media-files.ts'),
		'utf8'
	);
	const fakeAws = await writeFakeAwsScript(root, { exitCode: 1, logPath: awsLogPath });

	const result = await runCli(
		['--slug', SLUG, '--name', NAME, '--date', DATE],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
			PUBLISH_AWS_BIN: fakeAws,
		}
	);

	assert.notEqual(result.code, 0);
	assert.match(result.stderr, /S3 sync failed/);

	const catalogAfter = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');
	const mapAfter = await fs.readFile(
		path.join(srcRoot, 'scripts', 'gallery-media-files.ts'),
		'utf8'
	);
	assert.equal(catalogAfter, catalogBefore);
	assert.equal(mapAfter, mapBefore);
	await assert.rejects(() => fs.stat(path.join(srcRoot, 'galleries', `${SLUG}.json`)));

	const awsLog = await fs.readFile(awsLogPath, 'utf8');
	assert.match(awsLog, /s3 sync/);
	assert.match(awsLog, new RegExp(path.join(stagingRoot, SLUG).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('CLI3: reserved slug and missing staging do not write dest files', async () => {
	const { stagingRoot, srcRoot, awsLogPath, root } = await makeSandbox();
	const catalogBefore = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');
	const fakeAws = await writeFakeAwsScript(root, { exitCode: 0, logPath: awsLogPath });

	const reserved = await runCli(
		['--slug', 'guest-uploads', '--name', NAME, '--date', DATE, '--skip-s3'],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
			PUBLISH_AWS_BIN: fakeAws,
		}
	);
	assert.notEqual(reserved.code, 0);
	assert.match(reserved.stderr, /guest-uploads/);

	const missingStaging = await runCli(
		['--slug', '2024-01-13-missing', '--name', NAME, '--date', DATE, '--skip-s3'],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
			PUBLISH_AWS_BIN: fakeAws,
		}
	);
	assert.notEqual(missingStaging.code, 0);
	assert.match(missingStaging.stderr, /Staging directory not found/);

	const catalogAfter = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');
	assert.equal(catalogAfter, catalogBefore);
	await assert.rejects(() => fs.stat(awsLogPath));
});

test('CLI4: default path syncs via aws then writes catalog and map', async () => {
	const { stagingRoot, srcRoot, awsLogPath, root } = await makeSandbox();
	const fakeAws = await writeFakeAwsScript(root, { exitCode: 0, logPath: awsLogPath });

	const result = await runCli(
		['--slug', SLUG, '--name', NAME, '--date', DATE],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
			PUBLISH_AWS_BIN: fakeAws,
		}
	);

	assert.equal(result.code, 0, result.stderr);
	await assertCatalogWrites(srcRoot);

	const awsLog = await fs.readFile(awsLogPath, 'utf8');
	assert.match(awsLog, /s3 sync/);
	assert.match(awsLog, new RegExp(path.join(stagingRoot, SLUG).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
	assert.match(awsLog, /s3:\/\/sideris-wedding-images\/uploads\/galleries\/2024-01-13-ceremony\//);
	assert.match(awsLog, /--profile personal/);
	assert.match(awsLog, /--region us-east-2/);
	assert.match(awsLog, /--exclude media\.json/);
	assert.doesNotMatch(awsLog, /--delete/);
	assert.match(result.stdout, /S3 destination: s3:\/\/sideris-wedding-images\/uploads\/galleries\/2024-01-13-ceremony\//);
});

test('H3: --dry-run prints plan without aws or catalog writes', async () => {
	const { stagingRoot, srcRoot, awsLogPath, root } = await makeSandbox();
	const catalogBefore = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');
	const mapBefore = await fs.readFile(
		path.join(srcRoot, 'scripts', 'gallery-media-files.ts'),
		'utf8'
	);
	const fakeAws = await writeFakeAwsScript(root, { exitCode: 0, logPath: awsLogPath });

	const result = await runCli(
		['--slug', SLUG, '--name', NAME, '--date', DATE, '--dry-run'],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
			PUBLISH_AWS_BIN: fakeAws,
		}
	);

	assert.equal(result.code, 0, result.stderr);
	assert.match(result.stdout, /Gallery slug: 2024-01-13-ceremony/);
	assert.match(result.stdout, /Media count: 1/);
	assert.match(result.stdout, /S3 --delete: no/);

	const catalogAfter = await fs.readFile(path.join(srcRoot, 'galleries.json'), 'utf8');
	const mapAfter = await fs.readFile(
		path.join(srcRoot, 'scripts', 'gallery-media-files.ts'),
		'utf8'
	);
	assert.equal(catalogAfter, catalogBefore);
	assert.equal(mapAfter, mapBefore);
	await assert.rejects(() => fs.stat(path.join(srcRoot, 'galleries', `${SLUG}.json`)));
	await assert.rejects(() => fs.stat(awsLogPath));
});

test('H4: --delete passes --delete to aws sync', async () => {
	const { stagingRoot, srcRoot, awsLogPath, root } = await makeSandbox();
	const fakeAws = await writeFakeAwsScript(root, { exitCode: 0, logPath: awsLogPath });

	const withDelete = await runCli(
		['--slug', SLUG, '--name', NAME, '--date', DATE, '--delete'],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
			PUBLISH_AWS_BIN: fakeAws,
		}
	);
	assert.equal(withDelete.code, 0, withDelete.stderr);
	const deleteLog = await fs.readFile(awsLogPath, 'utf8');
	assert.match(deleteLog, /--delete/);

	await fs.rm(awsLogPath, { force: true });
	const withoutDelete = await runCli(
		['--slug', SLUG, '--name', NAME, '--date', DATE],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
			PUBLISH_AWS_BIN: fakeAws,
		}
	);
	assert.equal(withoutDelete.code, 0, withoutDelete.stderr);
	const defaultLog = await fs.readFile(awsLogPath, 'utf8');
	assert.doesNotMatch(defaultLog, /--delete/);
});

test('H5: --skip-s3 and --delete together is rejected', async () => {
	const { stagingRoot, srcRoot, awsLogPath, root } = await makeSandbox();
	const fakeAws = await writeFakeAwsScript(root, { exitCode: 0, logPath: awsLogPath });

	const result = await runCli(
		['--slug', SLUG, '--name', NAME, '--date', DATE, '--skip-s3', '--delete'],
		{
			PUBLISH_STAGING_ROOT: stagingRoot,
			PUBLISH_SRC_ROOT: srcRoot,
			PUBLISH_AWS_BIN: fakeAws,
		}
	);

	assert.notEqual(result.code, 0);
	assert.match(result.stderr, /--delete/);
	await assert.rejects(() => fs.stat(awsLogPath));
});
