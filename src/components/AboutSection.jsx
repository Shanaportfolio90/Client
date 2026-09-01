import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './AboutSection.css';

function AnimatedCounter({ value, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  const numericValue = parseInt(value.replace(/\D/g, ''), 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;

            const progress = Math.min(
              (currentTime - startTime) / duration,
              1
            );

            const easeOut = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(easeOut * numericValue));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [numericValue, duration]);

  return (
    <span ref={counterRef}>
      {count}+
    </span>
  );
}

export default function AboutSection() {
  const stats = [
    { number: '250+', label: 'Successful Campaigns' },
    { number: '25+', label: 'Brands Collaborated' },
    { number: '150+', label: 'Books Promoted' },
    { number: '5+', label: 'Years Experience' },
  ];

  return (
    <section id="about" className="about-section-container">
      
      {/* Decorative background elements */}
      <div className="about-glow about-glow-1" />
      <div className="about-glow about-glow-2" />

      <span className="floating-dot dot-1" />
      <span className="floating-dot dot-2" />
      <span className="floating-dot dot-3" />

      <div className="about-inner">

        {/* Main Content */}
        <div className="about-main-grid">

          {/* Portrait */}
          <div className="about-left-column reveal-left">
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />

            <div className="about-card-wrapper">
              <div className="portrait-glow" />

              <img
                src="/ChatGPT Image Aug 28, 2026, 07_19_20 PM.png"
                alt="Who is Snaha Chakraborty"
                className="about-portrait-img"
              />

              <div className="portrait-shine" />
            </div>
          </div>

          {/* Content */}
          <div className="about-right-column">

            {/* Badge */}
            <div className="about-badge reveal-up delay-1">
              <div className="badge-circles">
                <span className="circle-white" />
                <span className="circle-orange" />
              </div>

              <span className="badge-label">About Me</span>
            </div>

            {/* Title */}
            <h2 className="about-title reveal-up delay-2">
              Who is{' '}
              <span className="highlight-text">
                Snaha Chakraborty?
              </span>

              <span className="leaf-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z"
                    fill="#FFFFFF"
                    opacity="0.8"
                  />
                </svg>
              </span>
            </h2>

            {/* Description */}
            <p className="about-description reveal-up delay-3">
              Hey there, I'm Snaha Chakraborty — a passionate content creator,
              brand collaborator, and book promoter focused on crafting
              high-converting campaign series, engaging shorts, and authentic
              audience experiences that blend creativity with strategy.
            </p>

            {/* CTA */}
            <div className="about-cta-row reveal-up delay-4">

              <a href="/collabs" className="download-cv-btn">
                <span>View Collabs & Projects</span>

                <div className="btn-arrow-circle">
                  <ArrowRight size={15} />
                </div>
              </a>

              <div className="signature-wrapper">
                <span className="signature-text">
                  Snaha Chakraborty
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* Statistics */}
        <div className="about-stats-row reveal-stats">

          {stats.map((stat, index) => (
            <React.Fragment key={index}>

              <div
                className="stat-item"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <h3 className="stat-number">
                  <AnimatedCounter value={stat.number} />
                </h3>

                <p className="stat-label">
                  {stat.label}
                </p>
              </div>

              {index < stats.length - 1 && (
                <div className="stat-divider">
                  <div className="divider-circles">
                    <span className="circle-white" />
                    <span className="circle-orange" />
                  </div>

                  <div className="divider-line" />
                </div>
              )}

            </React.Fragment>
          ))}

        </div>

      </div>
    </section>
  );
}