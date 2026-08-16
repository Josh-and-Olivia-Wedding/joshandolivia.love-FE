import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MediaViewer from '../../components/media-viewer/MediaViewer';
import {
	galleryAssetUrl,
	getGallery,
	getGalleryMedia,
	getPhotographerName,
	isVideoPath,
} from '../../scripts/gallery-media';
import './Gallery.css';

type GalleryTab = 'all' | 'videos';

const Gallery: React.FC = () => {
	const { galleryId = '' } = useParams<{ galleryId: string }>();
	const gallery = useMemo(() => getGallery(galleryId), [galleryId]);

	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
	const [tab, setTab] = useState<GalleryTab>('all');
	const [photographerId, setPhotographerId] = useState('');

	const galleryMedia = useMemo(() => getGalleryMedia(galleryId), [galleryId]);
	const hasVideos = useMemo(
		() => galleryMedia.some((media) => isVideoPath(media.relPath)),
		[galleryMedia]
	);

	const tabMedia = useMemo(() => {
		if (tab === 'videos') {
			return galleryMedia.filter((media) => isVideoPath(media.relPath));
		}
		return galleryMedia;
	}, [galleryMedia, tab]);

	const photographers = useMemo(() => {
		const ids = Array.from(
			new Set(tabMedia.map((media) => media.guestId).filter(Boolean) as string[])
		);
		return ids
			.map((id) => ({ id, name: getPhotographerName(id) }))
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [tabMedia]);

	const visibleMedia = useMemo(() => {
		if (!photographerId) return tabMedia;
		return tabMedia.filter((media) => media.guestId === photographerId);
	}, [tabMedia, photographerId]);

	const closeViewer = useCallback(() => {
		setIsViewerOpen(false);
		document.body.classList.remove('no-scroll');
	}, []);

	useEffect(() => {
		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, []);

	const handleMediaClick = (index: number) => {
		setSelectedMediaIndex(index);
		setIsViewerOpen(true);
		document.body.classList.add('no-scroll');
	};

	const selectNext = useCallback(() => {
		setSelectedMediaIndex((prev) => (prev + 1) % visibleMedia.length);
	}, [visibleMedia.length]);

	const selectPrev = useCallback(() => {
		setSelectedMediaIndex((prev) => (prev - 1 + visibleMedia.length) % visibleMedia.length);
	}, [visibleMedia.length]);

	const handleTabChange = (nextTab: GalleryTab) => {
		setTab(nextTab);
		setSelectedMediaIndex(0);
		closeViewer();
	};

	const handlePhotographerChange = (nextId: string) => {
		setPhotographerId(nextId);
		setSelectedMediaIndex(0);
		closeViewer();
	};

	if (!gallery) {
		return (
			<div className="gallery-container">
				<Link to="/gallery" className="back-button">← All galleries</Link>
				<p className="gallery-empty">Gallery not found.</p>
			</div>
		);
	}

	const currentMedia = visibleMedia[selectedMediaIndex];
	const showPhotographers = gallery.hasPhotographers;
	const photographerName = showPhotographers && currentMedia?.guestId
		? getPhotographerName(currentMedia.guestId)
		: '';
	const hdPhotoUrl = currentMedia
		? galleryAssetUrl(currentMedia.path || currentMedia.compressedPath)
		: '';

	return (
		<div className="gallery-container">
			<Link to="/gallery" className="back-button">← All galleries</Link>
			<h1 className="gallery-title">{gallery.name}</h1>

			<div className="gallery-toolbar">
				{hasVideos && (
					<div className="gallery-tabs">
						<button
							className={`gallery-tab${tab === 'all' ? ' active' : ''}`}
							onClick={() => handleTabChange('all')}
						>
							All media
						</button>
						<button
							className={`gallery-tab${tab === 'videos' ? ' active' : ''}`}
							onClick={() => handleTabChange('videos')}
						>
							Videos
						</button>
					</div>
				)}

				{showPhotographers && (
					<label className="photographer-filter">
						<span>Photographer</span>
						<select
							value={photographerId}
							onChange={(event) => handlePhotographerChange(event.target.value)}
						>
							<option value="">All photographers</option>
							{photographers.map((photographer) => (
								<option key={photographer.id} value={photographer.id}>
									{photographer.name}
								</option>
							))}
						</select>
					</label>
				)}
			</div>

			{visibleMedia.length === 0 ? (
				<p className="gallery-empty">No photos match this filter.</p>
			) : (
				<div className="photo-grid">
					{visibleMedia.map((media, index) => {
						const isVideo = isVideoPath(media.relPath);
						const thumbnailUrl = media.thumbnailPath
							? galleryAssetUrl(media.thumbnailPath)
							: galleryAssetUrl(media.compressedPath || media.path);

						return (
							<div
								key={media.path}
								className={`photo-item${isVideo ? ' video' : ''}`}
								onClick={() => handleMediaClick(index)}
							>
								<img
									src={thumbnailUrl}
									alt={media.name}
									loading="lazy"
								/>
								{showPhotographers && media.guestId && (
									<span className="photo-caption">{getPhotographerName(media.guestId)}</span>
								)}
							</div>
						);
					})}
				</div>
			)}

			<MediaViewer
				isOpen={isViewerOpen}
				mediaData={visibleMedia}
				mediaIndex={selectedMediaIndex}
				photographerName={photographerName}
				hdPhotoUrl={hdPhotoUrl}
				showSlideshowToggle
				onClose={closeViewer}
				onSwipeLeft={selectNext}
				onSwipeRight={selectPrev}
			/>
		</div>
	);
};

export default Gallery;
