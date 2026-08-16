import mediaData from '../media-data.json';
import { CLOUDFRONT_URL, videoFileFormats } from './constants';
import { IFileMetadata } from './filesystem/i-filesystem';
import UPLOAD_IDS from './upload-ids';

export interface GalleryMediaItem extends IFileMetadata {
	guestId: string;
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

export function toGalleryMedia(): GalleryMediaItem[] {
	return mediaData
		.filter((item) => item.path || item.compressedPath)
		.map((item) => ({
			guestId: item.guestId,
			relPath: item.relPath,
			path: item.path || item.compressedPath || '',
			thumbnailPath: item.thumbnailPath || undefined,
			compressedPath: item.compressedPath || undefined,
			size: item.size,
			name: item.relPath.split('/').pop() || '',
			isDirectory: false,
			lastModified: new Date(),
		}));
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
		.map((item) => `${CLOUDFRONT_URL}/uploads${item.compressedPath}`);
}
