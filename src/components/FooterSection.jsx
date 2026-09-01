import React, { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import './FooterSection.css';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer-container">
      {/* Upper Main Footer Box */}
      <div className="footer-inner">
        {/* Top Connect CTA Banner */}
        <div className="footer-top-cta">
          <h2 className="footer-connect-title">
            Let's <span className="highlight-text">Connect</span> there
          </h2>

          <a href="#contact" className="footer-contact-btn">
            <span>Contact Me</span>
            <div className="btn-arrow-circle">
              <ArrowRight size={14} />
            </div>
          </a>
        </div>

        {/* Divider Line */}
        <div className="footer-divider-line" />

        {/* Main 4-Column Footer Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-col brand-col">
            <a href="#home" className="footer-logo">
              <div className="logo-badge">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#191412" stroke="#191412" strokeWidth="1" />
                </svg>
              </div>
              <img src="/Logo_Snaha.png" alt="Snaha Logo" className="footer-logo-img" />
            </a>

            <p className="footer-bio-text">
              I'm Snaha Chakraborty — a content creator & brand strategist passionate about crafting impactful collaborations, book promotions, and engaging shorts series.
            </p>

            {/* Yellow Social Buttons */}
            <div className="footer-social-row">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345c-.09.375-.293 1.199-.334 1.369-.053.225-.173.271-.4.165-1.495-.695-2.43-2.878-2.43-4.632 0-3.774 2.743-7.239 7.904-7.239 4.15 0 7.376 2.957 7.376 6.91 0 4.123-2.599 7.44-6.207 7.44-1.212 0-2.352-.63-2.743-1.377l-.747 2.848c-.27 1.039-1.001 2.342-1.49 3.125C9.404 23.844 10.677 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="/collabs">Collabs</a></li>
              <li><a href="#about">About Me</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-info-list">
              <li>+91 98765-43210</li>
              <li>www.snahachakraborty.com</li>
              <li>connect.snaha@gmail.com</li>
              <li>Agartala, Tripura West, India</li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-col-title">Get Latest Updates</h4>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                  <Send size={14} fill="#FF9F1C" color="#FF9F1C" />
                </button>
              </div>
            </form>
            {subscribed && (
              <span className="newsletter-success">
                ✓ Subscribed for updates!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Dark Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="bottom-bar-inner">
          <p className="copyright-text">
            Copyright © 2026 <span className="highlight-name">Snaha.</span> All Rights Reserved.
          </p>

          <div className="bottom-legal-links">
            <a href="/admin">Admin Panel Login</a>
            <span className="legal-divider">|</span>
            <a href="#terms">User Terms & Conditions</a>
            <span className="legal-divider">|</span>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
