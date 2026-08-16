import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import MediaRenderer from "./media-renderer/MediaRenderer";
import PhotoInfo from "./photo-info/PhotoInfo";
import TouchHandler from "./touch-handler/TouchHandler";
import { CLOUDFRONT_URL } from "../../scripts/constants";
import './MediaViewer.css';
import { IFileMetadata } from "../../scripts/filesystem/i-filesystem";

interface MediaViewerProps {
  isOpen: boolean;
  mediaData: IFileMetadata[];
  mediaIndex: number;
  photographerName?: string;
  hdPhotoUrl?: string;
  showSlideshowToggle?: boolean;
  onClose: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SLIDESHOW_INTERVAL_MS = 4000;

const MediaViewer: React.FC<MediaViewerProps> = ({
  isOpen,
  mediaData: mediaUrls,
  mediaIndex,
  photographerName,
  hdPhotoUrl,
  showSlideshowToggle = false,
  onClose,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${mediaIndex * 100}%)`;
      trackRef.current.style.transition = 'transform 100ms ease-in-out';
    }
  }, [mediaIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const intervalId = window.setInterval(() => {
      onSwipeLeft();
    }, SLIDESHOW_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isOpen, isPlaying, onSwipeLeft]);

  const handleManualNext = useCallback(() => {
    setIsPlaying(false);
    onSwipeLeft();
  }, [onSwipeLeft]);

  const handleManualPrev = useCallback(() => {
    setIsPlaying(false);
    onSwipeRight();
  }, [onSwipeRight]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'ArrowRight') {
        handleManualNext();
      } else if (event.key === 'ArrowLeft') {
        handleManualPrev();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleManualNext, handleManualPrev, onClose]);

  const handleDownload = async () => {
    try {
      const response = await fetch(hdPhotoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', hdPhotoUrl.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  const toggleSlideshow = (event: MouseEvent) => {
    event.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <div className={`media-viewer-overlay${isOpen && " visible" || ""}`} onClick={onClose}>
      <TouchHandler onSwipeLeft={handleManualNext} onSwipeRight={handleManualPrev}>
        <div className="media-viewer-content">
          <button className="close-btn" onClick={onClose}>&times;</button>
          {showSlideshowToggle && (
            <button
              className="slideshow-btn"
              onClick={toggleSlideshow}
              aria-pressed={isPlaying}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          )}
          <div className="track-container">
            <div className="track" ref={trackRef}>
              {mediaUrls.map((m, i) => (
                (m?.compressedPath || m?.path) && (
                  <MediaRenderer 
                    key={i} 
                    mediaUrl={`${CLOUDFRONT_URL}/uploads${m.compressedPath || m.path}`} 
                    render={Math.abs(mediaIndex - i) <= 1} 
                    onNext={handleManualNext}
                    onPrev={handleManualPrev}
                  />
                ) || <div key={i}>NO PREVIEW AVAILABLE</div>
              ))}
            </div>
          </div>
          {(hdPhotoUrl || photographerName) && (
            <PhotoInfo
              photographerName={photographerName}
              hdPhotoUrl={hdPhotoUrl}
              onDownload={handleDownload}
            />
          )}
        </div>
      </TouchHandler>
    </div>
  );
};

export default MediaViewer;
