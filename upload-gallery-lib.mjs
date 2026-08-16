export const GUEST_GALLERY_ID = 'guest-uploads';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const IMAGE_EXTENSIONS = new Set([
	'jpg',
	'jpeg',
	'png',
	'webp',
	'heic',
	'heif',
	'tif',
	'tiff',
]);

const VIDEO_EXTENSIONS = new Set([
	'mp4',
	'mov',
	'm4v',
	'webm',
	'avi',
	'mkv',
]);

export function isValidGalleryDate(date) {
	return DATE_PATTERN.test(date);
}

export function kebabCaseName(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-+/g, '-');
}

export function slugifyGalleryId(name, date) {
	if (!isValidGalleryDate(date)) {
		throw new Error(`Invalid date "${date}". Expected YYYY-MM-DD.`);
	}

	const nameSlug = kebabCaseName(name);
	if (!nameSlug) {
		throw new Error('Gallery name must produce a non-empty slug.');
	}
	if (nameSlug === GUEST_GALLERY_ID) {
		throw new Error(`Gallery slug "${GUEST_GALLERY_ID}" is reserved.`);
	}

	const slug = `${date}-${nameSlug}`;
	if (slug === GUEST_GALLERY_ID) {
		throw new Error(`Gallery slug "${GUEST_GALLERY_ID}" is reserved.`);
	}

	return slug;
}

export function getFileExtension(filePath) {
	const parts = filePath.split('.');
	if (parts.length < 2) {
		return '';
	}
	return parts.pop().toLowerCase();
}

export function isProcessableImage(ext) {
	return IMAGE_EXTENSIONS.has(ext);
}

export function isSkippableVideo(ext) {
	return VIDEO_EXTENSIONS.has(ext);
}

export function sanitizeFileStem(relativePath, usedStems) {
	const normalized = relativePath.replace(/\\/g, '/');
	const withoutExt = normalized.replace(/\.[^.]+$/, '');
	const rawStem = withoutExt
		.split('/')
		.filter(Boolean)
		.join('-')
		.replace(/[^a-zA-Z0-9._-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-+/g, '-');

	const baseStem = rawStem || 'image';
	let stem = baseStem;
	let suffix = 2;

	while (usedStems.has(stem)) {
		stem = `${baseStem}-${suffix}`;
		suffix += 1;
	}

	usedStems.add(stem);
	return stem;
}

export function toGalleryMediaRecord({ slug, stem, compressedSize }) {
	const fileName = `${stem}.webp`;
	return {
		relPath: fileName,
		thumbnailPath: `/galleries/${slug}/thumbnails/${fileName}`,
		compressedPath: `/galleries/${slug}/compressed/${fileName}`,
		size: compressedSize ?? 0,
	};
}
