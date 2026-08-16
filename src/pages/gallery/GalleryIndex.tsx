import React from 'react';
import { Link } from 'react-router-dom';
import { listGalleries } from '../../scripts/gallery-media';
import './Gallery.css';

const GalleryIndex: React.FC = () => {
	const galleries = listGalleries();

	return (
		<div className="gallery-container">
			<Link to="/" className="back-button">← Back to Home</Link>
			<h1 className="gallery-title">Our Wedding Gallery</h1>

			<ul className="gallery-index-list">
				{galleries.map((gallery) => (
					<li key={gallery.id}>
						<Link to={`/gallery/${gallery.id}`} className="gallery-index-link">
							<span className="gallery-index-name">{gallery.name}</span>
							<span className="gallery-index-date">{gallery.date}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default GalleryIndex;
