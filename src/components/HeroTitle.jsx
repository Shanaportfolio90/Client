import React from 'react';
import './HeroTitle.css';

export default function HeroTitle() {
  return (
    <div className="hero-title-container">
      <h1 className="hero-headline">
        <span className="text-dark">I'm </span>
        <span className="text-highlight">
          Snaha Chakraborty
          <span className="leaf-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#292524" />
              <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#292524" opacity="0.8" />
            </svg>
          </span>
        </span>
      </h1>
      <p className="hero-subheading">
        Brand Collaborations • Book Promotions • Shorts & Reels Series
      </p>
    </div>
  );
}
