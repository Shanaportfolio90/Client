import React from 'react';
import avatarsImg from '../assets/avatars.png';
import './ReviewsCard.css';

export default function ReviewsCard() {
  return (
    <div className="reviews-card-container">
      <div className="avatar-stack-wrapper">
        <img src={avatarsImg} alt="Valued Clients" className="avatar-stack-img" />
      </div>
      <div className="reviews-info">
        <div className="reviews-score">
          <span className="orange-text">350+ Reviews </span>
          <span className="dark-text">(4.9 of 5)</span>
        </div>
        <div className="reviews-subtext">Reviews from Valued Clients</div>
      </div>
    </div>
  );
}
