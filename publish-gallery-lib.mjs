import fs from 'node:fs/promises';
import path from 'node:path';
import { GUEST_GALLERY_ID, getFileExtension, isValidGalleryDate } from './upload-gallery-lib.mjs';

const MEDIA_SOURCE_PREFIX = 'galleries/';
const MEDIA_SOURCE_SUFFIX = '.json';

export function assertPublishableSlug(slug) {
	if (slug === GUEST_GALLERY_ID) {
		throw new Error(`Gallery slug "${GUEST_GALLERY_ID}" is reserved.`);
	}
}

export function assertValidPublishDate(date) {
	if (!isValidGalleryDate(date)) {
		throw new Error(`Invalid date "${date}". Expected YYYY-MM-DD.`);
	}
}

export function assertDateMatchesSlug(slug, date) {
	if (!slug.startsWith(`${date}-`)) {
		throw new Error(`Slug "${slug}" does not match date "${date}".`);
	}
}

function assertNonEmptyName(name) {
	if (!name || !String(name).trim()) {
		throw new Error('Gallery name is required.');
	}
}

function isVideoRelPath(relPath) {
	const ext = getFileExtension(relPath);
	return ['mp4', 'mov', 'm4v', 'webm', 'avi', 'mkv'].includes(ext);
}

function validateMediaRecord(item, slug, index) {
	if (!item || typeof item !== 'object') {
		throw new Error(`media.json item at index ${index} must be an object.`);
	}

	if (!item.relPath) {
		throw new Error(`media.json item at index ${index} is missing relPath.`);
	}

	const hasThumbnail = Boolean(item.thumbnailPath);
	const hasCompressed = Boolean(item.compressedPath);
	const hasPath = Boolean(item.path);
	if (!hasThumbnail && !hasCompressed) {
		throw new Error(
			`media.json item at index ${index} must include thumbnailPath or compressedPath.`
		);
	}

	const expectedPrefix = `/galleries/${slug}/`;
	if (hasThumbnail && !item.thumbnailPath.startsWith(expectedPrefix)) {
		throw new Error(
			`media.json item at index ${index} thumbnailPath must start with "${expectedPrefix}".`
		);
	}
	if (hasCompressed && !item.compressedPath.startsWith(expectedPrefix)) {
		throw new Error(
			`media.json item at index ${index} compressedPath must start with "${expectedPrefix}".`
		);
	}
	if (hasPath && !item.path.startsWith(expectedPrefix)) {
		throw new Error(
			`media.json item at index ${index} path must start with "${expectedPrefix}".`
		);
	}
	if (isVideoRelPath(item.relPath)) {
		if (!hasPath) {
			throw new Error(`media.json item at index ${index} video must include path.`);
		}
		const expectedVideoPrefix = `/galleries/${slug}/videos/`;
		if (!item.path.startsWith(expectedVideoPrefix)) {
			throw new Error(
				`media.json item at index ${index} video path must start with "${expectedVideoPrefix}".`
			);
		}
	}
}

export function validateStagingMedia(media, slug) {
	if (!Array.isArray(media)) {
		throw new Error('media.json must be an array.');
	}
	if (media.length < 1) {
		throw new Error('media.json must contain at least one item.');
	}

	for (let index = 0; index < media.length; index += 1) {
		validateMediaRecord(media[index], slug, index);
	}

	return media;
}

export async function loadStagingMedia(stagingRoot, slug) {
	const stagingDir = path.join(stagingRoot, slug);
	const mediaPath = path.join(stagingDir, 'media.json');

	let stagingStat;
	try {
		stagingStat = await fs.stat(stagingDir);
	} catch {
		throw new Error(`Staging directory not found: ${stagingDir}`);
	}
	if (!stagingStat.isDirectory()) {
		throw new Error(`Staging path is not a directory: ${stagingDir}`);
	}

	let raw;
	try {
		raw = await fs.readFile(mediaPath, 'utf8');
	} catch {
		throw new Error(`media.json not found: ${mediaPath}`);
	}

	let parsed;
	try {
		parsed = JSON.parse(raw);
	} catch {
		throw new Error(`Invalid JSON in media.json: ${mediaPath}`);
	}

	return validateStagingMedia(parsed, slug);
}

export function buildGalleryRecord({ slug, name, date, media }) {
	return {
		id: slug,
		name,
		date,
		coverThumbnailPath: media[0]?.thumbnailPath || null,
		mediaSource: `${MEDIA_SOURCE_PREFIX}${slug}${MEDIA_SOURCE_SUFFIX}`,
		hasPhotographers: false,
	};
}

export function upsertGalleryCatalog(galleries, record) {
	if (record.id === GUEST_GALLERY_ID) {
		throw new Error(`Gallery slug "${GUEST_GALLERY_ID}" is reserved.`);
	}

	const nextCatalog = galleries.map((row) => {
		if (row.id === GUEST_GALLERY_ID) {
			return { ...row };
		}
		return row;
	});

	const existingIndex = nextCatalog.findIndex((row) => row.id === record.id);
	if (existingIndex >= 0) {
		nextCatalog[existingIndex] = { ...record };
	} else {
		nextCatalog.push({ ...record });
	}

	return nextCatalog;
}

function slugFromMediaSource(mediaSource) {
	if (!mediaSource.startsWith(MEDIA_SOURCE_PREFIX) || !mediaSource.endsWith(MEDIA_SOURCE_SUFFIX)) {
		throw new Error(`Invalid mediaSource "${mediaSource}". Expected galleries/{slug}.json.`);
	}
	return mediaSource.slice(MEDIA_SOURCE_PREFIX.length, -MEDIA_SOURCE_SUFFIX.length);
}

function importIdentifierForSlug(slug) {
	const identifier = `gallery${slug.replace(/-/g, '')}`;
	if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(identifier)) {
		throw new Error(`Unable to derive import identifier for slug "${slug}".`);
	}
	return identifier;
}

export function generateGalleryMediaFilesSource(mediaSources) {
	const sortedSources = [...mediaSources].sort();
	const identifiers = new Map();

	for (const mediaSource of sortedSources) {
		const slug = slugFromMediaSource(mediaSource);
		const identifier = importIdentifierForSlug(slug);
		if (identifiers.has(identifier)) {
			throw new Error(`Duplicate import identifier "${identifier}" for media sources.`);
		}
		identifiers.set(identifier, slug);
	}

	const lines = [
		"import type { GalleryMediaRecord } from './gallery-media';",
	];

	for (const mediaSource of sortedSources) {
		const slug = slugFromMediaSource(mediaSource);
		const identifier = importIdentifierForSlug(slug);
		lines.push(`import ${identifier} from '../galleries/${slug}.json';`);
	}

	lines.push('');
	if (sortedSources.length === 0) {
		lines.push('export const GALLERY_MEDIA_FILES: Record<string, GalleryMediaRecord[]> = {};');
	} else {
		lines.push('export const GALLERY_MEDIA_FILES: Record<string, GalleryMediaRecord[]> = {');
		for (const mediaSource of sortedSources) {
			const slug = slugFromMediaSource(mediaSource);
			const identifier = importIdentifierForSlug(slug);
			lines.push(`\t'${mediaSource}': ${identifier} as GalleryMediaRecord[],`);
		}
		lines.push('};');
	}
	lines.push('');

	return `${lines.join('\n')}`;
}

export function serializeJson(value) {
	return `${JSON.stringify(value, null, '\t')}\n`;
}

export async function planPublish({ stagingRoot, slug, name, date, existingCatalog }) {
	assertPublishableSlug(slug);
	assertValidPublishDate(date);
	assertDateMatchesSlug(slug, date);
	assertNonEmptyName(name);

	const media = await loadStagingMedia(stagingRoot, slug);
	const galleryRecord = buildGalleryRecord({ slug, name, date, media });
	const nextCatalog = upsertGalleryCatalog(existingCatalog, galleryRecord);
	const mediaSources = nextCatalog
		.filter((row) => row.mediaSource !== 'legacy')
		.map((row) => row.mediaSource);
	const mediaFilesSource = generateGalleryMediaFilesSource(mediaSources);

	return {
		media,
		galleryRecord,
		nextCatalog,
		mediaFilesSource,
	};
}
