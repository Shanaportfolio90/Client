import React from 'react';
import './WorkProcessSection.css';

export default function WorkProcessSection() {
  const steps = [
    {
      number: '01.',
      title: 'Research & Analyze',
      description:
        'Understanding audience demographics, brand vision, and campaign requirements to build high-impact content strategies.',
    },
    {
      number: '02.',
      title: 'Plan & Strategize',
      description:
        'Defining storyboards, video concepts, brand messaging, and engagement funnels for seamless execution.',
    },
    {
      number: '03.',
      title: 'Create & Produce',
      description:
        'Filming high-quality shorts, crafting engaging reels, and designing visually stunning promo materials.',
    },
    {
      number: '04.',
      title: 'Refine & Launch',
      description:
        'Finalizing post-production edits, optimizing multi-platform distribution, and tracking campaign performance metrics.',
    },
  ];

  return (
    <section id="process" className="process-section-container">
      <div className="process-inner">
        {/* Section Header */}
        <div className="process-header">
          <div className="process-badge">
            <div className="badge-circles">
              <span className="circle-black" />
              <span className="circle-orange" />
            </div>
            <span className="badge-label">My Work Process</span>
          </div>

          <h2 className="process-title">
            <span className="highlight-text">The Way I Create</span>
            <span className="leaf-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#292524" />
                <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#292524" opacity="0.8" />
              </svg>
            </span>
            <br />
            Impactful Campaigns
          </h2>
        </div>

        {/* 2x2 Grid of Chamfered Process Cards */}
        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className="process-card">
              {/* Top Header Row with Dotted Line */}
              <div className="process-card-header">
                <span className="step-number-badge">{step.number}</span>
                <div className="step-dotted-line" />
              </div>

              {/* Title & Description */}
              <div className="process-card-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>

              {/* Faint Spark Accent */}
              <div className="process-card-spark">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path
                    d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                    fill="rgba(0, 0, 0, 0.05)"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
