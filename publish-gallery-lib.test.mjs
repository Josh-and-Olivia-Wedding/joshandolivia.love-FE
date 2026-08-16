import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	assertPublishableSlug,
	buildGalleryRecord,
	generateGalleryMediaFilesSource,
	loadStagingMedia,
	planPublish,
	upsertGalleryCatalog,
} from './publish-gallery-lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SANDBOX_ROOT = path.join(__dirname, '.decomposer', 'sandbox');

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

const SLUG = '2024-01-13-ceremony';
const DATE = '2024-01-13';
const NAME = 'Ceremony';

const VALID_MEDIA = [
	{
		relPath: 'DSC_0001.webp',
		thumbnailPath: `/galleries/${SLUG}/thumbnails/DSC_0001.webp`,
		compressedPath: `/galleries/${SLUG}/compressed/DSC_0001.webp`,
		size: 123456,
	},
];

async function makeTempStagingRoot() {
	const stagingRoot = await fs.mkdtemp(path.join(SANDBOX_ROOT, 'publish-'));
	return stagingRoot;
}

async function writeStagingMedia(stagingRoot, slug, media) {
	const stagingDir = path.join(stagingRoot, slug);
	await fs.mkdir(stagingDir, { recursive: true });
	await fs.writeFile(
		path.join(stagingDir, 'media.json'),
		`${JSON.stringify(media, null, '\t')}\n`
	);
}

test('P1: upsert adds ceremony row and preserves guest-uploads', async () => {
	const record = buildGalleryRecord({
		slug: SLUG,
		name: NAME,
		date: DATE,
		media: VALID_MEDIA,
	});

	const nextCatalog = upsertGalleryCatalog(GUEST_CATALOG, record);
	assert.equal(nextCatalog.length, 2);

	const guestRow = nextCatalog.find((row) => row.id === 'guest-uploads');
	assert.deepEqual(guestRow, GUEST_CATALOG[0]);

	const ceremonyRow = nextCatalog.find((row) => row.id === SLUG);
	assert.equal(ceremonyRow.hasPhotographers, false);
	assert.equal(ceremonyRow.mediaSource, 'galleries/2024-01-13-ceremony.json');
	assert.equal(
		ceremonyRow.coverThumbnailPath,
		'/galleries/2024-01-13-ceremony/thumbnails/DSC_0001.webp'
	);

	const republished = upsertGalleryCatalog(nextCatalog, {
		...record,
		name: 'Ceremony updated',
	});
	assert.equal(republished.length, 2);
	assert.equal(republished.filter((row) => row.id === SLUG).length, 1);
	assert.equal(republished.find((row) => row.id === SLUG).name, 'Ceremony updated');
	assert.deepEqual(republished.find((row) => row.id === 'guest-uploads'), GUEST_CATALOG[0]);

	const stagingRoot = await makeTempStagingRoot();
	await writeStagingMedia(stagingRoot, SLUG, VALID_MEDIA);
	const plan = await planPublish({
		stagingRoot,
		slug: SLUG,
		name: NAME,
		date: DATE,
		existingCatalog: GUEST_CATALOG,
	});
	assert.equal(plan.nextCatalog.length, 2);
	assert.equal(plan.galleryRecord.mediaSource, 'galleries/2024-01-13-ceremony.json');
});

test('P2: guest-uploads slug is refused', async () => {
	assert.throws(() => assertPublishableSlug('guest-uploads'), /guest-uploads/);

	const record = buildGalleryRecord({
		slug: 'guest-uploads',
		name: 'Guest',
		date: DATE,
		media: VALID_MEDIA,
	});
	assert.throws(() => upsertGalleryCatalog(GUEST_CATALOG, record), /guest-uploads/);

	const stagingRoot = await makeTempStagingRoot();
	await writeStagingMedia(stagingRoot, 'guest-uploads', VALID_MEDIA);
	await assert.rejects(
		() =>
			planPublish({
				stagingRoot,
				slug: 'guest-uploads',
				name: NAME,
				date: DATE,
				existingCatalog: [...GUEST_CATALOG],
			}),
		/guest-uploads/
	);
});

test('P3: staging media.json validation', async () => {
	const stagingRoot = await makeTempStagingRoot();
	await writeStagingMedia(stagingRoot, SLUG, VALID_MEDIA);

	const media = await loadStagingMedia(stagingRoot, SLUG);
	assert.equal(media.length, 1);
	assert.equal('guestId' in media[0], false);
	assert.equal('path' in media[0], false);

	await writeStagingMedia(stagingRoot, SLUG, [
		{
			relPath: 'bad.webp',
		},
	]);
	await assert.rejects(() => loadStagingMedia(stagingRoot, SLUG), /thumbnailPath or compressedPath/);

	await writeStagingMedia(stagingRoot, SLUG, [
		{
			relPath: 'bad.webp',
			thumbnailPath: '/galleries/other/thumbnails/bad.webp',
		},
	]);
	await assert.rejects(() => loadStagingMedia(stagingRoot, SLUG), /thumbnailPath must start with/);

	await assert.rejects(
		() =>
			planPublish({
				stagingRoot,
				slug: SLUG,
				name: NAME,
				date: 'bad-date',
				existingCatalog: GUEST_CATALOG,
			}),
		/Invalid date/
	);

	await assert.rejects(
		() =>
			planPublish({
				stagingRoot,
				slug: SLUG,
				name: NAME,
				date: '2024-02-01',
				existingCatalog: GUEST_CATALOG,
			}),
		/does not match date/
	);
});

test('P4: map codegen emits static imports and keys', () => {
	const source = generateGalleryMediaFilesSource(['galleries/2024-01-13-ceremony.json']);
	assert.match(source, /import type \{ GalleryMediaRecord \} from '\.\/gallery-media';/);
	assert.match(
		source,
		/import gallery20240113ceremony from '\.\.\/galleries\/2024-01-13-ceremony\.json';/
	);
	assert.match(
		source,
		/'galleries\/2024-01-13-ceremony\.json': gallery20240113ceremony as GalleryMediaRecord\[\],/
	);

	const emptySource = generateGalleryMediaFilesSource([]);
	assert.match(emptySource, /import type \{ GalleryMediaRecord \} from '\.\/gallery-media';/);
	assert.match(emptySource, /export const GALLERY_MEDIA_FILES: Record<string, GalleryMediaRecord\[\]> = \{\};/);
	assert.doesNotMatch(emptySource, /from '\.\.\/galleries\//);
});

test('P5: missing or empty staging throws without writing catalog', async () => {
	const stagingRoot = await makeTempStagingRoot();

	await assert.rejects(() => loadStagingMedia(stagingRoot, SLUG), /Staging directory not found/);

	await fs.mkdir(path.join(stagingRoot, SLUG), { recursive: true });
	await assert.rejects(() => loadStagingMedia(stagingRoot, SLUG), /media\.json not found/);

	await writeStagingMedia(stagingRoot, SLUG, []);
	await assert.rejects(() => loadStagingMedia(stagingRoot, SLUG), /at least one item/);

	const dummyPath = path.join(stagingRoot, 'dummy-catalog.json');
	const dummyContents = '{"unchanged":true}\n';
	await fs.writeFile(dummyPath, dummyContents);

	await assert.rejects(
		() =>
			planPublish({
				stagingRoot,
				slug: SLUG,
				name: NAME,
				date: DATE,
				existingCatalog: GUEST_CATALOG,
			}),
		/at least one item/
	);

	const after = await fs.readFile(dummyPath, 'utf8');
	assert.equal(after, dummyContents);
});
