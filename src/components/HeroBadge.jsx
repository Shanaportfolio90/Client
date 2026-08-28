import React from 'react';
import './HeroBadge.css';

export default function HeroBadge() {
  return (
    <div className="hero-badge">
      <div className="badge-icon-wrapper">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="6" fill="#FF9F1C" stroke="#191412" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" stroke="#191412" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="badge-text">Top Brand Collaborator & Content Creator</span>
    </div>
  );
}
