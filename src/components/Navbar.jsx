import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ isDarkMode, toggleDarkMode, activePage }) {
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collabs', path: '/collabs' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Promotions', path: '/#book-promo' },
    { name: 'About Me', path: '/#about' },
  ];

  const currentTab =
    activePage ||
    (location.pathname === '/collabs' ? 'Collabs' : location.pathname === '/blogs' ? 'Blogs' : 'Home');

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    closeMobileMenu();
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-container">
      <nav
        className={`navbar-pill ${
          isScrolled ? 'navbar-scrolled' : ''
        }`}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={handleLogoClick}
        >
          <div className="logo-badge">
            <span className="logo-letter-s">S</span>
          </div>

          <img
            src="/Logo_Snaha.png"
            alt="Snaha Logo"
            className="navbar-logo-img"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-links">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`nav-link ${
                  currentTab === item.name ? 'active' : ''
                }`}
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Navbar Actions */}
        <div className="navbar-actions">

          {/* Theme Toggle */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="lets-talk-btn desktop-cta"
          >
            <span>Let's Talk</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`mobile-menu-toggle-btn ${
              isMobileMenuOpen ? 'menu-open' : ''
            }`}
            onClick={() =>
              setIsMobileMenuOpen((prev) => !prev)
            }
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown-menu">

          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li
                key={item.name}
                style={{
                  animationDelay: `${index * 0.06}s`,
                }}
              >
                <Link
                  to={item.path}
                  className={`mobile-nav-link ${
                    currentTab === item.name ? 'active' : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  <span>{item.name}</span>
                  <span className="mobile-arrow">↗</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-dropdown-actions">
            <a
              href="#contact"
              className="lets-talk-btn mobile-cta"
              onClick={closeMobileMenu}
            >
              <span>Let's Talk</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
}