import React, { useState } from 'react';
import './AwardsSection.css';

export default function AwardsSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const awards = [
    {
      id: '01.',
      year: '2026',
      badgeText: 'DESIGN EXCELLENCE AWARD',
      title: 'Design Excellence Award',
      description:
        'Recognized for outstanding product design, creativity, and user experience.',
    },
    {
      id: '02.',
      year: '2025',
      badgeText: 'DESIGN MASTERY AWARD',
      title: 'Design Mastery Award',
      description:
        'Awarded for creative thinking and exceptional product design skills.',
    },
    {
      id: '03.',
      year: '2024',
      badgeText: 'CREATIVE DESIGN AWARD',
      title: 'Creative Design Award',
      description:
        'Honored for modern, functional, and visually engaging design work.',
    },
  ];

  return (
    <section id="awards" className="awards-section-container">
      <div className="awards-inner">
        {/* Section Header */}
        <div className="awards-header">
          <div className="awards-header-left">
            <div className="awards-badge">
              <div className="badge-circles">
                <span className="circle-white" />
                <span className="circle-orange" />
              </div>
              <span className="badge-label">Achievement Awards</span>
            </div>

            <h2 className="awards-title">
              <span className="highlight-text">My Award-Winning</span>
              <span className="leaf-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#FFFFFF" />
                  <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#FFFFFF" opacity="0.8" />
                </svg>
              </span>
              <br />
              Design Journey
            </h2>
          </div>

          <div className="awards-header-right">
            <p className="awards-header-description">
              Recognized for creating innovative product designs, meaningful user experiences, creative solutions, and impactful digital products.
            </p>
          </div>
        </div>

        {/* Award Cards Grid */}
        <div className="awards-grid">
          {awards.map((award, index) => (
            <div key={award.id} className="award-card">
              {/* Top Row: Laurel Emblem & ID Badge */}
              <div className="award-card-header">
                <div className="laurel-wreath-emblem">
                  <div className="stars-row">
                    <span>★</span>
                    <span>★</span>
                    <span className="star-active">★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  <div className="emblem-center-text">{award.badgeText}</div>

                  {/* Laurel Leaves SVG Graphic */}
                  <svg className="laurel-svg" viewBox="0 0 100 60" width="90" height="54">
                    <path
                      d="M 20 45 C 10 35 10 15 25 10 C 20 20 25 35 35 40 Z"
                      fill="#A8A29E"
                      opacity="0.6"
                    />
                    <path
                      d="M 80 45 C 90 35 90 15 75 10 C 80 20 75 35 65 40 Z"
                      fill="#A8A29E"
                      opacity="0.6"
                    />
                  </svg>

                  <span className="emblem-year">{award.year}</span>
                </div>

                <div className="award-id-badge">{award.id}</div>
              </div>

              {/* Award Title & Description */}
              <div className="award-card-body">
                <h3 className="award-title">{award.title}</h3>
                <p className="award-description">{award.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="awards-pagination">
          <button
            type="button"
            className={`pagination-dot ${activeSlide === 0 ? 'active' : ''}`}
            onClick={() => setActiveSlide(0)}
            aria-label="Slide 1"
          />
          <button
            type="button"
            className={`pagination-dot ${activeSlide === 1 ? 'active' : ''}`}
            onClick={() => setActiveSlide(1)}
            aria-label="Slide 2"
          />
          <button
            type="button"
            className={`pagination-dot ${activeSlide === 2 ? 'active' : ''}`}
            onClick={() => setActiveSlide(2)}
            aria-label="Slide 3"
          />
        </div>
      </div>
    </section>
  );
}
