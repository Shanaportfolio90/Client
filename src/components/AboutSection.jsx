import React from 'react';
import { ArrowRight } from 'lucide-react';
import './AboutSection.css';

export default function AboutSection() {
  const stats = [
    { number: '250+', label: 'Successful Campaigns' },
    { number: '25+', label: 'Brands Collaborated' },
    { number: '150+', label: 'Books Promoted' },
    { number: '5+', label: 'Years Experience' },
  ];

  return (
    <section id="about" className="about-section-container">
      <div className="about-inner">
        {/* Main Content Grid (Portrait Left, Bio Right) */}
        <div className="about-main-grid">
          {/* Left Column: Graphic Portrait Card */}
          <div className="about-left-column">
            <div className="about-card-wrapper">
              <img
                src="/ChatGPT Image Aug 28, 2026, 07_19_20 PM.png"
                alt="Who is Snaha Chakraborty"
                className="about-portrait-img"
              />
            </div>
          </div>

          {/* Right Column: About Info & Signature */}
          <div className="about-right-column">
            <div className="about-badge">
              <div className="badge-circles">
                <span className="circle-white" />
                <span className="circle-orange" />
              </div>
              <span className="badge-label">About Me</span>
            </div>

            <h2 className="about-title">
              Who is <span className="highlight-text">Snaha Chakraborty?</span>
              <span className="leaf-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#FFFFFF" />
                  <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#FFFFFF" opacity="0.8" />
                </svg>
              </span>
            </h2>

            <p className="about-description">
              Hey there, I'm Snaha Chakraborty — a passionate content creator, brand collaborator, and book promoter focused on crafting high-converting campaign series, engaging shorts, and authentic audience experiences that blend creativity with strategy.
            </p>

            {/* CTA & Signature Row */}
            <div className="about-cta-row">
              <a href="#portfolio" className="download-cv-btn">
                <span>Download Portfolio</span>
                <div className="btn-arrow-circle">
                  <ArrowRight size={14} />
                </div>
              </a>

              <div className="signature-wrapper">
                <span className="signature-text">Snaha Chakraborty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statistics Counter Row */}
        <div className="about-stats-row">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="stat-item">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
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
