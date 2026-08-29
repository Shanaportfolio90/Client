import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ isDarkMode, toggleDarkMode, activePage }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collabs', path: '/collabs' },
    { name: 'Shorts Series', path: '/#series' },
    { name: 'Book Promo', path: '/#book-promo' },
    { name: 'About Me', path: '/#about' },
    { name: 'Testimonials', path: '/#testimonials' },
  ];

  const currentTab = activePage || (location.pathname === '/collabs' ? 'Collabs' : 'Home');

  return (
    <header className="navbar-container">
      <nav className="navbar-pill">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="logo-badge">
            <span className="logo-letter-s">S</span>
          </div>
          <span className="logo-text">
            Snaha<span className="logo-dot">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links desktop-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`nav-link ${currentTab === item.name ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Let's Talk CTA (Desktop) */}
          <a href="#contact" className="lets-talk-btn desktop-cta">
            Let's Talk
          </a>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`mobile-nav-link ${currentTab === item.name ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-dropdown-actions">
            <a href="#contact" className="lets-talk-btn mobile-cta" onClick={() => setIsMobileMenuOpen(false)}>
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
