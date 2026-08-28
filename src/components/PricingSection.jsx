import React from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import './PricingSection.css';

export default function PricingSection() {
  const hourlyFeatures = [
    'Flexible hourly hiring',
    'Fast turnaround & delivery',
    'Pay as you go',
    'Quick campaign updates',
    'Transparent hourly pricing',
    'Perfect for short-term projects',
  ];

  const monthlyFeatures = [
    'Dedicated monthly creator & strategist',
    'Priority campaign & content support',
    'Fast video turnaround',
    'Flexible revisions & scripting',
    'Long-term brand partnership',
    'Built for audience growth & ROI',
    'Smooth team collaboration',
    'Consistent high-quality content',
  ];

  return (
    <section id="pricing" className="pricing-section-container">
      <div className="pricing-inner">
        {/* Grid Layout: Left Title & Quote Card, Middle Hourly Card, Right Monthly Card */}
        <div className="pricing-grid">
          {/* Left Column */}
          <div className="pricing-left-col">
            <div className="pricing-badge">
              <div className="badge-circles">
                <span className="circle-white" />
                <span className="circle-orange" />
              </div>
              <span className="badge-label">Pricing Table</span>
            </div>

            <h2 className="pricing-title">
              <span className="highlight-text">My Pricing</span>
              <span className="leaf-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#FFFFFF" />
                  <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#FFFFFF" opacity="0.8" />
                </svg>
              </span>
              <br />
              Model
            </h2>

            {/* Custom Quote Box */}
            <div className="custom-quote-card">
              <h3 className="custom-quote-title">
                Need a <span className="highlight-text">Custom Quote?</span>
              </h3>
              <p className="custom-quote-text">
                Get a personalized brand collaboration or campaign quote tailored to your goals, timeline, and project needs.
              </p>
              <a href="#contact" className="contact-me-btn">
                <span>Contact Me</span>
                <div className="btn-arrow-circle">
                  <ArrowRight size={14} />
                </div>
              </a>
            </div>
          </div>

          {/* Middle Column: Hourly Plan (Bright Orange Card) */}
          <div className="pricing-card hourly-card">
            <div className="pricing-card-header">
              <div>
                <span className="plan-label">HOURLY</span>
                <div className="plan-price">
                  <span className="price-amount">₹1,500</span>
                  <span className="price-unit">/ Hour</span>
                </div>
              </div>
              <div className="plan-icon-btn">
                <ArrowUpRight size={18} />
              </div>
            </div>

            <ul className="plan-features-list">
              {hourlyFeatures.map((feature, i) => (
                <li key={i}>
                  <CheckCircle2 size={18} className="check-icon-dark" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Monthly Retainer Plan (Dark Card) */}
          <div className="pricing-card monthly-card">
            <div className="pricing-card-header">
              <div>
                <span className="plan-label">MONTHLY</span>
                <div className="plan-price">
                  <span className="price-amount">₹96,000</span>
                  <span className="price-unit">/ Month</span>
                </div>
              </div>
              <div className="plan-icon-btn">
                <ArrowUpRight size={18} />
              </div>
            </div>

            <ul className="plan-features-list">
              {monthlyFeatures.map((feature, i) => (
                <li key={i}>
                  <CheckCircle2 size={18} className="check-icon-orange" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
