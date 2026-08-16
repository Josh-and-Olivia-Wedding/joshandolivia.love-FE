import test from 'node:test';
import assert from 'node:assert/strict';
import {
	slugifyGalleryId,
	sanitizeFileStem,
	toGalleryMediaRecord,
} from './upload-gallery-lib.mjs';

test('C1: slugifyGalleryId produces date-kebab-name slug', () => {
	assert.equal(slugifyGalleryId('Ceremony', '2024-01-13'), '2024-01-13-ceremony');
});

test('C2: slugifyGalleryId rejects guest-uploads slug', () => {
	assert.throws(
		() => slugifyGalleryId('Guest uploads', '2024-01-13'),
		/guest-uploads/
	);
});

test('C3: slugifyGalleryId rejects invalid date', () => {
	assert.throws(
		() => slugifyGalleryId('Ceremony', 'bad'),
		/Invalid date/
	);
});

test('C4: toGalleryMediaRecord paths omit path and guestId', () => {
	const record = toGalleryMediaRecord({
		slug: '2024-01-13-ceremony',
		stem: 'foo',
		compressedSize: 99,
	});

	assert.equal(record.relPath, 'foo.webp');
	assert.equal(
		record.thumbnailPath,
		'/galleries/2024-01-13-ceremony/thumbnails/foo.webp'
	);
	assert.equal(
		record.compressedPath,
		'/galleries/2024-01-13-ceremony/compressed/foo.webp'
	);
	assert.equal(record.size, 99);
	assert.equal('path' in record, false);
	assert.equal('guestId' in record, false);
});

test('C5: sanitizeFileStem handles spaces and collisions', () => {
	const usedStems = new Set();
	const first = sanitizeFileStem('bridal shower/photo 1.jpg', usedStems);
	const second = sanitizeFileStem('bridal shower/photo 1.jpg', usedStems);

	assert.equal(first, 'bridal-shower-photo-1');
	assert.equal(second, 'bridal-shower-photo-1-2');
});
