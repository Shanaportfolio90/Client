import React, { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Collabs', href: '#collabs' },
    { name: 'Shorts Series', href: '#series' },
    { name: 'Book Promo', href: '#book-promo' },
    { name: 'About Me', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const handleNavClick = (itemName) => {
    setActiveTab(itemName);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <nav className="navbar-pill">
        {/* Brand Logo */}
        <a href="#home" className="navbar-logo" onClick={() => handleNavClick('Home')}>
          <div className="logo-badge">
            <span className="logo-letter-s">S</span>
          </div>
          <span className="logo-text">
            Snaha<span className="logo-dot">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links desktop-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`nav-link ${activeTab === item.name ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.name);
                  const el = document.querySelector(item.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.name}
              </a>
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
                <a
                  href={item.href}
                  className={`mobile-nav-link ${activeTab === item.name ? 'active' : ''}`}
                  onClick={() => {
                    handleNavClick(item.name);
                    const el = document.querySelector(item.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.name}
                </a>
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
