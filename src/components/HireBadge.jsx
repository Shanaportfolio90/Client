import React from 'react';
import './HireBadge.css';

export default function HireBadge() {
  const handleClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate 28-tooth starburst badge path
  const numPoints = 28;
  const cx = 100;
  const cy = 100;
  const rOuter = 96;
  const rInner = 88;
  const points = [];
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints;
    const r = i % 2 === 0 ? rOuter : rInner;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  const starburstD = points.join(' ') + ' Z';

  return (
    <div className="hire-badge-container" onClick={handleClick} title="Contact Me">
      <div className="hire-badge-wrapper">
        <svg viewBox="0 0 200 200" className="contact-badge-svg">
          <defs>
            <path
              id="circleTextPath"
              d="M 100, 100 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
            />
          </defs>

          {/* Scalloped Outer Badge */}
          <path d={starburstD} fill="#191412" />

          {/* Rotating Text */}
          <g className="rotating-text-group">
            <text fill="#FFFFFF" fontSize="13.5" fontWeight="900" letterSpacing="4.2">
              <textPath href="#circleTextPath" startOffset="0%">
                CONTACT ME • CONTACT ME •
              </textPath>
            </text>
          </g>

          {/* Center Amber Circle */}
          <circle cx="100" cy="100" r="24" fill="#FF9F1C" />

          {/* Center Arrow */}
          <g transform="translate(100, 100)">
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#191412" strokeWidth="3" strokeLinecap="round" />
            <polyline points="2,-6 8,0 2,6" fill="none" stroke="#191412" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}
