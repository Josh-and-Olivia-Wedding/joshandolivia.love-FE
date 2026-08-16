import React, { useEffect, useMemo, useRef, useState } from 'react';
import './MainSection.css';
import PageSection from '../../../components/page-section/PageSection';
import DateWidget from '../../../components/date-widget/DateWidget';
import { Link } from 'react-router-dom';
import { FEATURES } from '../../../scripts/features';
import { pickRandomCompressedUrls } from '../../../scripts/gallery-media';

const FALLBACK_HERO_URL = 'https://d16gku0mdgm9y9.cloudfront.net/uploads/d8997814-5fb2-491b-b800-dffd2a08e210/compressed/portraits/7M301079.jpeg';
const CAROUSEL_INTERVAL_MS = 6000;

const MainSection: React.FC = () => {
  const namesRef = useRef<HTMLHeadingElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = useMemo(() => {
    if (!FEATURES.homeHeroCarousel) {
      return [FALLBACK_HERO_URL];
    }
    const urls = pickRandomCompressedUrls(8);
    return urls.length ? urls : [FALLBACK_HERO_URL];
  }, []);

  useEffect(() => {
    // Opacity transition after 1 second
    const overlayElement = document.querySelector('.overlay-ms');
    if (overlayElement) {
      setTimeout(() => {
        overlayElement.setAttribute('style', 'opacity: 1');
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (!FEATURES.homeHeroCarousel || slides.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [slides.length]);

  return (
    <PageSection>
      <div className="section-container-ms">
        {FEATURES.homeHeroCarousel ? (
          <div className="wedding-bg-carousel">
            {slides.map((url, index) => (
              <div
                key={url}
                className={`wedding-bg${index === activeSlide ? ' active' : ''}`}
                style={{ backgroundImage: `url('${url}')` }}
              />
            ))}
          </div>
        ) : (
          <div className="wedding-bg"></div>
        )}
        <div className="overlay-ms">
          <h1 className="msh1" ref={namesRef}>Josh and Olivia</h1>
          <p className="subheading">Thank you for joining us!</p>
          <br />
          <br />
          <br />
          <br />
          <div>
            <DateWidget />
          </div>
          <br />
          <div style={{ marginTop: '20px' }}>
            <Link to="/gallery" className="gallery-link-btn">
              View Our Photo Gallery
            </Link>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default MainSection;
