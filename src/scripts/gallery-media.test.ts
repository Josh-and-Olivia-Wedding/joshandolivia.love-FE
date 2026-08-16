import mediaData from '../media-data.json';
import { CLOUDFRONT_URL } from './constants';
import {
	GUEST_GALLERY_ID,
	galleryAssetUrl,
	getGallery,
	getGalleryMedia,
	isVideoPath,
	listGalleries,
	pickRandomCompressedUrls,
} from './gallery-media';

describe('gallery-media catalog loaders', () => {
	test('T1: listGalleries returns guest-uploads with photographers', () => {
		const galleries = listGalleries();
		expect(galleries).toHaveLength(1);
		expect(galleries[0].id).toBe(GUEST_GALLERY_ID);
		expect(galleries[0].hasPhotographers).toBe(true);
		expect(galleries[0].mediaSource).toBe('legacy');
	});

	test('T2: getGalleryMedia guest-uploads length matches filtered media-data.json', () => {
		const expectedCount = mediaData.filter((item) => item.path || item.compressedPath).length;
		expect(getGalleryMedia(GUEST_GALLERY_ID)).toHaveLength(expectedCount);
	});

	test('T3: every guest item has guestId and non-empty path', () => {
		const items = getGalleryMedia(GUEST_GALLERY_ID);
		for (const item of items) {
			expect(item.guestId).toBeTruthy();
			expect(item.path).toBeTruthy();
		}
	});

	test('T4: unknown gallery returns undefined and empty media', () => {
		expect(getGallery('missing')).toBeUndefined();
		expect(getGalleryMedia('missing')).toEqual([]);
	});

	test('T5: isVideoPath detects mov and mp4', () => {
		expect(isVideoPath('clip.mov')).toBe(true);
		expect(isVideoPath('clip.MP4')).toBe(true);
	});

	test('T6: galleryAssetUrl includes uploads prefix', () => {
		const url = galleryAssetUrl('/galleries/ceremony/compressed/a.webp');
		expect(url).toContain('/uploads/galleries/ceremony/');
		expect(url).toBe(`${CLOUDFRONT_URL}/uploads/galleries/ceremony/compressed/a.webp`);
	});

	test('T7: pickRandomCompressedUrls returns cloudfront uploads URLs', () => {
		const urls = pickRandomCompressedUrls(2);
		expect(urls.length).toBeLessThanOrEqual(2);
		for (const url of urls) {
			expect(url.startsWith(`${CLOUDFRONT_URL}/uploads`)).toBe(true);
		}
	});
});
