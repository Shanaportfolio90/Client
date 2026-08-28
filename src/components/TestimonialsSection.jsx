import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import avatarsImg from '../assets/avatars.png';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      rating: '5.0',
      text: 'Working with Snaha completely transformed our campaign reach and audience engagement. The shorts and reels felt modern, authentic, and perfectly aligned with our brand vision. Communication was smooth, turnaround was fast, and every creative video felt strategic and high converting.',
      author: 'Ava Wilson',
      role: 'Marketing Director, Fashion Brand',
    },
    {
      id: 2,
      rating: '5.0',
      text: 'Snaha promoted our bestselling novel launch with an extraordinary short video series! Her storytelling ability brought the book to life, generating thousands of pre-orders and building real excitement among readers.',
      author: 'Marcus Vance',
      role: 'Senior Editor, Horizon Publishing',
    },
    {
      id: 3,
      rating: '5.0',
      text: 'An absolute powerhouse for brand collaborations. Snaha delivered incredible engagement metrics on our product sponsorship campaign. Professional, prompt, and highly creative!',
      author: 'Sophia Chen',
      role: 'Head of Growth, Lumina Tech',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="testimonials-section-container">
      <div className="testimonials-inner">
        {/* Section Header */}
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <div className="badge-circles">
              <span className="circle-black" />
              <span className="circle-orange" />
            </div>
            <span className="badge-label">What Clients Say</span>
          </div>

          <h2 className="testimonials-title">
            <span className="highlight-text">What Clients Say</span>
            <span className="leaf-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#292524" />
                <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#292524" opacity="0.8" />
              </svg>
            </span>
            <br />
            About My Work
          </h2>
        </div>

        {/* Main Content Grid: Left Score Card, Right Review Card */}
        <div className="testimonials-grid">
          {/* Left Summary Card */}
          <div className="rating-summary-card">
            <h3 className="rating-score">4.9</h3>

            <div className="stars-row">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>

            <span className="reviews-count-text">(350+ Reviews)</span>

            <p className="rating-card-subtitle">
              Trusted Experiences<br />Shared by Clients
            </p>

            <div className="avatar-stack-container">
              <img src={avatarsImg} alt="Client Avatars" className="avatars-img" />
            </div>
          </div>

          {/* Right Active Review Card */}
          <div className="testimonial-card">
            {/* Background Quote Watermark */}
            <div className="quote-watermark">“</div>

            {/* Rating Row */}
            <div className="testimonial-rating-row">
              <div className="stars-row">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <span className="rating-numeric">{currentTestimonial.rating}</span>
            </div>

            {/* Review Body Text */}
            <p className="testimonial-text">{currentTestimonial.text}</p>

            {/* Footer Row: Author Info & Controls */}
            <div className="testimonial-footer-row">
              <div className="author-info">
                <h4 className="author-name">{currentTestimonial.author}</h4>
                <span className="author-role">{currentTestimonial.role}</span>
              </div>

              {/* Navigation Arrow Controls */}
              <div className="carousel-controls">
                <button
                  type="button"
                  className="control-btn prev-btn"
                  onClick={handlePrev}
                  aria-label="Previous Testimonial"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  className="control-btn next-btn"
                  onClick={handleNext}
                  aria-label="Next Testimonial"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
