import galleries from '../galleries.json';
import mediaData from '../media-data.json';
import { CLOUDFRONT_URL, videoFileFormats } from './constants';
import { GALLERY_MEDIA_FILES } from './gallery-media-files';
import { IFileMetadata } from './filesystem/i-filesystem';
import UPLOAD_IDS from './upload-ids';

export const GUEST_GALLERY_ID = 'guest-uploads';

export type GalleryMediaSource = 'legacy' | string;

export interface GalleryRecord {
	id: string;
	name: string;
	date: string;
	coverThumbnailPath: string | null;
	mediaSource: GalleryMediaSource;
	hasPhotographers: boolean;
}

export interface GalleryMediaRecord {
	relPath: string;
	thumbnailPath?: string;
	compressedPath?: string;
	path?: string;
	guestId?: string;
	size?: number;
}

export interface GalleryMediaItem extends IFileMetadata {
	guestId?: string;
	relPath: string;
}

const photographerNames = UPLOAD_IDS as Record<string, string>;

export function isVideoPath(relPath: string): boolean {
	const ext = relPath.toLowerCase().split('.').pop() || '';
	return videoFileFormats.includes(ext);
}

export function getPhotographerName(guestId: string): string {
	return photographerNames[guestId] || 'Unknown';
}

export function listGalleries(): GalleryRecord[] {
	return galleries as GalleryRecord[];
}

export function getGallery(galleryId: string): GalleryRecord | undefined {
	return listGalleries().find((gallery) => gallery.id === galleryId);
}

function mapMediaRecord(item: GalleryMediaRecord): GalleryMediaItem {
	const mapped: GalleryMediaItem = {
		relPath: item.relPath,
		path: item.path || item.compressedPath || item.thumbnailPath || '',
		thumbnailPath: item.thumbnailPath || undefined,
		compressedPath: item.compressedPath || undefined,
		size: item.size ?? 0,
		name: item.relPath.split('/').pop() || '',
		isDirectory: false,
		lastModified: new Date(),
	};

	if (item.guestId) {
		mapped.guestId = item.guestId;
	}

	return mapped;
}

function mapLegacyMedia(): GalleryMediaItem[] {
	return mediaData
		.filter((item) => item.path || item.compressedPath)
		.map((item) => mapMediaRecord(item));
}

export function getGalleryMedia(galleryId: string): GalleryMediaItem[] {
	const gallery = getGallery(galleryId);
	if (!gallery) {
		return [];
	}

	if (gallery.mediaSource === 'legacy') {
		return mapLegacyMedia();
	}

	const records = GALLERY_MEDIA_FILES[gallery.mediaSource];
	if (!records) {
		return [];
	}

	return records
		.filter((item) => item.path || item.compressedPath || item.thumbnailPath)
		.map((item) => mapMediaRecord(item));
}

export function galleryAssetUrl(relativePath: string | undefined): string {
	if (!relativePath) {
		return '';
	}
	return `${CLOUDFRONT_URL}/uploads${relativePath}`;
}

export function getGalleryCoverUrl(gallery: GalleryRecord): string {
	if (gallery.coverThumbnailPath) {
		return galleryAssetUrl(gallery.coverThumbnailPath);
	}

	const items = getGalleryMedia(gallery.id);
	const withThumbnail = items.find((item) => item.thumbnailPath);
	if (withThumbnail?.thumbnailPath) {
		return galleryAssetUrl(withThumbnail.thumbnailPath);
	}

	const withFull = items.find((item) => item.compressedPath || item.path);
	if (withFull) {
		return galleryAssetUrl(withFull.compressedPath || withFull.path);
	}

	return '';
}

export function pickRandomCompressedUrls(count: number): string[] {
	const withCompressed = mediaData.filter((item) => item.compressedPath);
	const shuffled = [...withCompressed];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled
		.slice(0, count)
		.map((item) => galleryAssetUrl(item.compressedPath));
}
