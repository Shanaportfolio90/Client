import React from 'react';
import { ArrowRight } from 'lucide-react';
import './HeroImage.css';

export default function HeroImage() {
  return (
    <div className="hero-image-container">
      {/* Background wavy shape */}
      <div className="wavy-bg-shape">
        <svg viewBox="0 0 500 500" width="100%" height="100%" fill="none">
          <path
            d="M 50 150 Q 250 50 450 150 T 450 350 Q 250 450 50 350 Z"
            fill="rgba(230, 226, 215, 0.4)"
          />
        </svg>
      </div>

      {/* Main Hero Person Portrait */}
      <div className="hero-person-wrapper">
        <img
          src="/ChatGPT Image Aug 28, 2026, 07_19_20 PM.png"
          alt="Snaha Chakraborty - Brand Collaborator & Content Creator"
          className="hero-person-img"
        />
      </div>

      {/* Bottom Floating Action Capsule */}
      <div className="floating-action-capsule">
        <div className="action-capsule-inner">
          <a href="#portfolio" className="capsule-btn orange-btn">
            <span>Collab Work</span>
            <div className="arrow-circle">
              <ArrowRight size={14} />
            </div>
          </a>
          <a href="#contact" className="capsule-btn white-btn">
            Connect
          </a>
        </div>
      </div>
    </div>
  );
}
