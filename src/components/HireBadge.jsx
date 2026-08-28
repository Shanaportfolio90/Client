import React from 'react';
import { ArrowRight } from 'lucide-react';
import hireBadgeImg from '../assets/hire-me-badge.png';
import './HireBadge.css';

export default function HireBadge() {
  return (
    <div className="hire-badge-container">
      <div className="hire-badge-wrapper">
        <img src={hireBadgeImg} alt="Hire Me Badge" className="hire-badge-img" />
      </div>
    </div>
  );
}
