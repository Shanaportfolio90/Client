import React from 'react';
import './MarqueeSlider.css';

export default function MarqueeSlider() {
  const items = [
    'Brand Collaborations',
    'Book Promotions',
    'Shorts Series',
    'Reels Content',
    'Campaign Strategy',
    'Audience Engagement',
    'Influencer Marketing',
    'Content Creator',
  ];

  // Duplicate items array to ensure seamless infinite looping
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="marquee-slider-container">
      <div className="marquee-track">
        {marqueeItems.map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <div className="marquee-spark">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path
                  d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                  fill="#FF9F1C"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
