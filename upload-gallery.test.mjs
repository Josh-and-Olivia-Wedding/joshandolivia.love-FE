import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = __dirname;
const SANDBOX_ROOT = path.join(REPO_ROOT, '.decomposer', 'sandbox');
const CLI_PATH = path.join(REPO_ROOT, 'upload-gallery.mjs');

const DATE = '2024-01-13';
const NAME = 'Dry Run Test';
const SLUG = '2024-01-13-dry-run-test';

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

async function makeInputDir(name) {
	const inputDir = await fs.mkdtemp(path.join(SANDBOX_ROOT, `${name}-`));
	return inputDir;
}

async function makeStagingRoot() {
	return fs.mkdtemp(path.join(SANDBOX_ROOT, 'ingest-staging-'));
}

test('H1: ingest --dry-run with one jpg does not write staging', async () => {
	const inputDir = await makeInputDir('h1');
	const stagingRoot = await makeStagingRoot();
	const jpg = await sharp({
		create: { width: 200, height: 150, channels: 3, background: { r: 10, g: 20, b: 30 } },
	})
		.jpeg()
		.toBuffer();
	await fs.writeFile(path.join(inputDir, 'photo.jpg'), jpg);

	const result = await runCli(
		['--folder', inputDir, '--name', NAME, '--date', DATE, '--dry-run'],
		{ INGEST_STAGING_ROOT: stagingRoot }
	);

	assert.equal(result.code, 0, result.stderr);
	assert.match(result.stdout, new RegExp(`Gallery slug: ${SLUG}`));
	assert.match(result.stdout, /Would process image: photo\.jpg/);
	assert.match(result.stdout, /Staging path:/);
	await assert.rejects(() => fs.stat(path.join(stagingRoot, SLUG)));
});

test('H2: ingest --dry-run with only unsupported files exits 1 without staging', async () => {
	const inputDir = await makeInputDir('h2');
	const stagingRoot = await makeStagingRoot();
	await fs.writeFile(path.join(inputDir, 'notes.txt'), 'not media');

	const result = await runCli(
		['--folder', inputDir, '--name', NAME, '--date', DATE, '--dry-run'],
		{ INGEST_STAGING_ROOT: stagingRoot }
	);

	assert.notEqual(result.code, 0);
	assert.match(result.stderr, /No media were processed/);
	await assert.rejects(() => fs.stat(path.join(stagingRoot, SLUG)));
});
