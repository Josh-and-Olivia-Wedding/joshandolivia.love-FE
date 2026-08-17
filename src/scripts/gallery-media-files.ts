import type { GalleryMediaRecord } from './gallery-media';
import gallery20260801newfoundland from '../galleries/2026-08-01-newfoundland.json';
import gallery20260808london from '../galleries/2026-08-08-london.json';
import gallery20260812scotland from '../galleries/2026-08-12-scotland.json';

export const GALLERY_MEDIA_FILES: Record<string, GalleryMediaRecord[]> = {
	'galleries/2026-08-01-newfoundland.json': gallery20260801newfoundland as GalleryMediaRecord[],
	'galleries/2026-08-08-london.json': gallery20260808london as GalleryMediaRecord[],
	'galleries/2026-08-12-scotland.json': gallery20260812scotland as GalleryMediaRecord[],
};
