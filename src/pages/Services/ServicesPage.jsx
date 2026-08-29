import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, ChevronDown, Sparkles } from 'lucide-react';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import FaqSection from '../../components/FaqSection';
import FooterSection from '../../components/FooterSection';
import './ServicesPage.css';

export default function ServicesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Default expanded item index 1 (02. Website Design / Book Promotion)
  const [expandedId, setExpandedId] = useState(2);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleAccordion = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const servicesData = [
    {
      id: 1,
      num: '01.',
      title: 'Brand Collaboration & Strategy',
      tags: ['Brand Sponsorship', 'Sponsored Reels', 'Campaign Strategy', 'Influencer Marketing'],
      description:
        'Crafting high-impact promotional video campaigns, review reels, and strategic brand partnerships designed for maximum engagement and conversion.',
    },
    {
      id: 2,
      num: '02.',
      title: 'Book Promotion & Video Marketing',
      tags: ['Bestseller Promotions', 'Short Video Marketing', 'Author Branding', 'Trailer Reels'],
      description:
        'Designing cinematic short-video promotions and visual campaigns that turn novel launches into viral bestsellers across Instagram & YouTube.',
    },
    {
      id: 3,
      num: '03.',
      title: 'Shorts & Reels Series Production',
      tags: ['Short Content Series', 'Scripting & Directing', 'Viral Hooks', 'Editing & Packaging'],
      description:
        'End-to-end production of engaging multi-episode Shorts & Reels series tailored to build dedicated subscriber communities and brand loyalty.',
    },
    {
      id: 4,
      num: '04.',
      title: 'UI/UX & Mobile Application Design',
      tags: ['User Interface', 'User Experience', 'Mobile App Design', 'Wireframing'],
      description:
        'Creating intuitive, aesthetic mobile app interfaces focused on effortless user flows, clean accessibility, and delightful mobile experiences.',
    },
    {
      id: 5,
      num: '05.',
      title: 'Responsive Website Design',
      tags: ['Landing Page Design', 'Responsive Web Design', 'Wireframing & Prototyping', 'Custom Web UI'],
      description:
        'Designing modern, user-friendly websites focused on seamless experiences, usability, speed, and overall business growth.',
    },
    {
      id: 6,
      num: '06.',
      title: 'Dashboard & Web App Design',
      tags: ['SaaS Dashboard', 'Data Visualization', 'Control Panel UI', 'Design System'],
      description:
        'Architecting clean data dashboards and enterprise software interfaces that make complex data actionable and easy to navigate.',
    },
    {
      id: 7,
      num: '07.',
      title: 'Wireframing & Interactive Prototyping',
      tags: ['Low-Fi Wireframes', 'Interactive Prototypes', 'Figma Systems', 'User Flows'],
      description:
        'Building clickable interactive prototypes and structured visual blueprints to validate product ideas before developer handoff.',
    },
    {
      id: 8,
      num: '08.',
      title: 'Brand Identity & Visual System',
      tags: ['Logo & Typography', 'Brand Guidelines', 'Color Palette', 'Social Media Assets'],
      description:
        'Developing comprehensive brand identity systems including logo design, color hierarchy, custom typography, and social media brand kits.',
    },
    {
      id: 9,
      num: '09.',
      title: 'Usability Testing & Conversion Optimization',
      tags: ['UX Audit', 'A/B Testing', 'Conversion Optimization', 'User Feedback Analysis'],
      description:
        'Auditing user interfaces to identify UX friction points and implementing data-driven design enhancements for higher user retention.',
    },
  ];

  const marqueeItems = [
    'Brand Collaboration',
    'Book Promotion',
    'Shorts Series',
    'UI/UX Design',
    'Website Design',
    'Dashboard Design',
    'Wireframing & Prototyping',
    'Reel Marketing',
    'Brand Identity',
  ];

  return (
    <div className={`services-page-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Background Grid Pattern */}
      <div className="bg-grid-overlay" />

      {/* Floating Navbar */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activePage="Services" />

      {/* Hero Header Section */}
      <header className="services-hero-header">
        <div className="services-hero-inner">
          <h1 className="services-main-title">Services</h1>
          <nav className="services-breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Services</span>
          </nav>
        </div>
      </header>

      {/* Marquee Ticker Banner */}
      <div className="services-marquee-banner">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <Sparkles size={16} className="marquee-star" />
            </div>
          ))}
        </div>
      </div>

      {/* My Services Section */}
      <section className="services-list-section">
        <div className="services-section-inner">
          {/* Section Header Badge & Title */}
          <div className="services-section-header">
            <div className="services-badge">
              <div className="badge-circles">
                <span className="circle-black" />
                <span className="circle-orange" />
              </div>
              <span className="badge-label">My Services</span>
            </div>

            <h2 className="services-section-title">
              How I Bring <span className="highlight-text">Ideas to Life</span>
              <span className="leaf-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#191412" />
                  <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#191412" opacity="0.8" />
                </svg>
              </span>
            </h2>
          </div>

          {/* Accordion Cards Container */}
          <div className="services-accordion-list">
            {servicesData.map((service) => {
              const isExpanded = expandedId === service.id;
              return (
                <div
                  key={service.id}
                  className={`service-accordion-card ${isExpanded ? 'is-expanded' : ''}`}
                  onClick={() => toggleAccordion(service.id)}
                >
                  {/* Card Header Row */}
                  <div className="accordion-card-header">
                    <div className="header-left-group">
                      <span className="service-number-pill">{service.num}</span>
                      <div className="dotted-line-connector" />
                    </div>

                    <h3 className="service-card-title">{service.title}</h3>

                    <button
                      type="button"
                      className="accordion-toggle-btn"
                      aria-label={isExpanded ? 'Collapse service' : 'Expand service'}
                    >
                      <ArrowUpRight
                        size={20}
                        className={`action-arrow-icon ${isExpanded ? 'rotated' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Expanded Content Area */}
                  {isExpanded && (
                    <div className="accordion-card-body">
                      <div className="service-tags-row">
                        {service.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="service-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="service-description-text">{service.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <FaqSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}
