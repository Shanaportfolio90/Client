import React from 'react';
import './HeroTitle.css';

export default function HeroTitle() {
  return (
    <div className="hero-title-container">

      {/* Decorative glow */}
      <div className="hero-title-glow"></div>

      <h1 className="hero-headline">
        <span className="text-dark">
          I'm
        </span>

        <span className="text-highlight">
          <span className="name-text">
            Snaha Chakraborty
          </span>

          {/* Decorative Icon */}
          <span className="leaf-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z"
                fill="currentColor"
              />

              <path
                d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z"
                fill="currentColor"
                opacity="0.75"
              />
            </svg>
          </span>

          {/* Animated underline */}
          <span className="name-underline"></span>
        </span>
      </h1>

      <p className="hero-subheading">
        <span>Brand Collaborations</span>
        <i>•</i>
        <span>Book Promotions</span>
        <i>•</i>
        <span>Shorts & Reels Series</span>
      </p>

    </div>
  );
}