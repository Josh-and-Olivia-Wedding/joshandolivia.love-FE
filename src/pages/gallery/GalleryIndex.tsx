import React from 'react';
import { Link } from 'react-router-dom';
import { getGalleryCoverUrl, listGalleries } from '../../scripts/gallery-media';
import './Gallery.css';

const GalleryIndex: React.FC = () => {
	const galleries = listGalleries();

	return (
		<div className="gallery-container">
			<Link to="/" className="back-button">← Back to Home</Link>
			<h1 className="gallery-title">Our Wedding Gallery</h1>

			{galleries.length === 0 ? (
				<p className="gallery-empty">No galleries yet.</p>
			) : (
				<div className="gallery-card-list">
					{galleries.map((gallery) => {
						const coverUrl = getGalleryCoverUrl(gallery);

						return (
							<Link
								key={gallery.id}
								to={`/gallery/${gallery.id}`}
								className="gallery-card"
							>
								{coverUrl ? (
									<img
										src={coverUrl}
										alt=""
										className="gallery-card-cover"
									/>
								) : (
									<div className="gallery-card-placeholder" />
								)}
								<div className="gallery-card-overlay">
									<span className="gallery-card-name">{gallery.name}</span>
									<span className="gallery-card-date">{gallery.date}</span>
								</div>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default GalleryIndex;
