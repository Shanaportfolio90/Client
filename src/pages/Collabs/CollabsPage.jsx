import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  Handshake,
  Users,
  PlayCircle,
  Rocket,
  TrendingUp,
  Heart,
  ShieldCheck,
  Plus,
  ArrowRight,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import PricingSection from '../../components/PricingSection';
import FooterSection from '../../components/FooterSection';
import ScrollReveal from '../../components/ScrollReveal';
import { API_BASE_URL } from '../../config';
import { COLLAB_BRANDS } from './BrandLogos';
import './CollabsPage.css';

export default function CollabsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dbCollabs, setDbCollabs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/collabs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDbCollabs(data);
        }
      })
      .catch((err) => console.error('Failed to load collab cards:', err));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const formattedDbCollabs = dbCollabs.map((c) => ({
    id: c._id,
    name: c.brandName,
    category: c.category,
    logo: c.imageUrl,
    details: c.title,
    websiteUrl: c.websiteUrl,
  }));

  const allBrandCollabs = [...COLLAB_BRANDS, ...formattedDbCollabs];

  const marqueeBrands = [
    ...new Set([
      ...allBrandCollabs.map((b) => b.name),
      'Brand Collaborations',
      'Shorts & Reels Series',
      'Book Promotions',
      'Influencer Campaigns',
    ]),
  ];

  return (
    <div className={`collabs-page-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Subtle Background Grid */}
      <div className="bg-grid-overlay" />

      {/* Floating Header Navbar */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activePage="Collabs" />

      {/* Hero Header */}
      <header className="collabs-hero-header">
        <div className="collabs-hero-inner">
          <div className="collabs-hero-badge">
            <div className="badge-circles">
              <span className="circle-black" />
              <span className="circle-orange" />
            </div>
            <span className="badge-label">Brand Partnerships</span>
          </div>

          <div className="collabs-title-wrap">
            <h1 className="collabs-main-title">
              Brand <span className="highlight-text">Collaborations</span>
            </h1>
            <div className="title-sparkle-stars">
              <Sparkles size={26} className="title-sparkle" />
            </div>
          </div>

          <div className="title-heart-divider">
            <Heart size={16} className="heart-icon" fill="currentColor" />
          </div>

          <p className="collabs-subtitle">
            I partner with brands to create authentic, engaging and result-driven content that connects with people and builds real impact.
          </p>

          <nav className="collabs-breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Collabs</span>
          </nav>
        </div>
      </header>

      {/* Marquee Banner */}
      <div className="collabs-marquee-banner">
        <div className="marquee-track">
          {[...marqueeBrands, ...marqueeBrands, ...marqueeBrands].map((brand, idx) => (
            <div key={idx} className="marquee-item">
              <span className="marquee-text">{brand}</span>
              <Sparkles size={16} className="marquee-star" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="collabs-main-content">
        {/* ==================================================================
            SECTION 1: BRANDS I'VE WORKED WITH (3-CARD GRID)
            ================================================================== */}
        <section className="collabs-section brands-worked-section">
          <div className="collabs-container">
            {/* Header row */}
            <div className="collabs-section-header-row">
              <div className="section-title-group">
                <div className="section-header-icon-circle award-circle">
                  <Award size={22} />
                </div>
                <div>
                  <h2 className="section-title-text">Brands I've Worked With</h2>
                  <p className="section-subtitle-text">Successful collaborations and campaigns delivered.</p>
                </div>
              </div>
            </div>

            {/* 3 Cards In A Row Grid */}
            <div className="brands-worked-grid">
              {allBrandCollabs.map((item) => {
                const isSvgComponent = typeof item.logo === 'function';
                const LogoComponent = isSvgComponent ? item.logo : null;

                return (
                  <div key={item.id} className="brand-worked-card">
                    <div className="brand-card-logo-box">
                      {isSvgComponent ? (
                        <LogoComponent mode="card" />
                      ) : (
                        <img
                          src={item.logo}
                          alt={`${item.name} Logo`}
                          style={{
                            maxHeight: '88px',
                            maxWidth: '220px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                          }}
                        />
                      )}
                    </div>
                    <div className="brand-card-meta">
                      <h3 className="brand-card-title">{item.name}</h3>
                      <p className="brand-card-category">{item.category}</p>
                      {item.details && (
                        <div className="brand-card-deliverable-tooltip">
                          <span>{item.details}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Upcoming Slot: More exciting collaborations coming soon! */}
              <div className="brand-worked-card upcoming-card">
                <div className="upcoming-icon-wrap">
                  <Plus size={32} />
                </div>
                <div className="upcoming-content">
                  <span className="upcoming-title">More exciting collaborations coming soon!</span>
                </div>
              </div>
            </div>

            {/* Open to new collaborations banner */}
            <div className="collab-open-callout">
              <ShieldCheck size={20} className="open-callout-shield" />
              <p className="open-callout-text">
                Open to new collaborations.{' '}
                <a href="#contact-section" className="open-callout-link">
                  Let's create something amazing together!
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 2: BRANDS I'VE CONNECTED WITH (OPPORTUNITIES)
            ================================================================== */}
        <section className="collabs-section brands-connected-section">
          <div className="collabs-container">
            {/* Header row */}
            <div className="section-title-group">
              <div className="section-header-icon-circle handshake-circle">
                <Handshake size={22} />
              </div>
              <div>
                <div className="section-title-with-pill">
                  <h2 className="section-title-text">Brands I've Connected With</h2>
                  <span className="opportunity-badge-pill">Opportunities</span>
                </div>
                <p className="section-subtitle-text">
                  Exciting campaigns & collaboration opportunities I'm in conversation with.
                </p>
              </div>
            </div>

            {/* Circular Avatars Row */}
            <div className="brands-avatar-strip">
              {allBrandCollabs.map((item) => {
                const isSvgComponent = typeof item.logo === 'function';
                const LogoComponent = isSvgComponent ? item.logo : null;

                return (
                  <div key={`avatar-${item.id}`} className="brand-avatar-item">
                    <div className="brand-avatar-circle-wrapper">
                      {isSvgComponent ? (
                        <LogoComponent mode="avatar" className="brand-avatar-svg" />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '50%',
                            padding: '4px',
                            boxSizing: 'border-box',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={item.logo}
                            alt={item.name}
                            style={{ width: '90%', height: '90%', objectFit: 'contain', borderRadius: '50%' }}
                          />
                        </div>
                      )}
                    </div>
                    <span className="brand-avatar-label">{item.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Note banner card */}
            <div className="opportunity-note-card">
              <Sparkles size={24} className="opportunity-note-sparkle" />
              <p className="opportunity-note-text">
                These are brands I've shown interest in collaborating with. Looking forward to creating impactful content and driving great results together!
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 3: COLLABORATION IMPACT (DARK STATS BANNER)
            ================================================================== */}
        <section className="collabs-section collab-impact-section">
          <div className="collabs-container">
            <div className="collab-impact-card">
              {/* Left column */}
              <div className="impact-left-col">
                <h3 className="impact-heading">
                  Collaboration <br />
                  Impact
                  <Sparkles size={20} className="impact-sparkle-star" />
                </h3>
                <p className="impact-desc">
                  Delivering content that creates engagement, builds trust and drives results.
                </p>
              </div>

              {/* Right stats grid */}
              <div className="impact-stats-row">
                <div className="impact-stat-cell">
                  <div className="stat-icon-wrap">
                    <Users size={28} />
                  </div>
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Engaged Audience Across Platforms</div>
                </div>

                <div className="impact-divider" />

                <div className="impact-stat-cell">
                  <div className="stat-icon-wrap">
                    <PlayCircle size={28} />
                  </div>
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Pieces of Content Created</div>
                </div>

                <div className="impact-divider" />

                <div className="impact-stat-cell">
                  <div className="stat-icon-wrap">
                    <Rocket size={28} />
                  </div>
                  <div className="stat-number">30+</div>
                  <div className="stat-label">Successful Brand Collaborations</div>
                </div>

                <div className="impact-divider" />

                <div className="impact-stat-cell">
                  <div className="stat-icon-wrap">
                    <TrendingUp size={28} />
                  </div>
                  <div className="stat-number">High</div>
                  <div className="stat-label">Engagement & Conversion Driven</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 4: BOTTOM COLLABORATION CTA
            ================================================================== */}
        <section className="collabs-section collab-cta-section">
          <div className="collabs-container">
            <div className="collab-cta-card">
              <div className="cta-left-content">
                <div className="cta-heart-graphic">
                  <Heart size={32} />
                </div>
                <div className="cta-text-wrap">
                  <h3 className="cta-headline">Let's collaborate and create something amazing!</h3>
                  <p className="cta-subheadline">Have a project in mind? I'd love to hear from you.</p>
                </div>
              </div>

              <div className="cta-right-btn-wrap">
                <a href="#contact-section" className="cta-work-btn">
                  <span>Let's Work Together</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Pricing Proposal Form Section */}
        <ScrollReveal variant="fade-up">
          <PricingSection />
        </ScrollReveal>
      </main>

      {/* Contact & Footer */}
      <ScrollReveal variant="fade-up">
        <div id="contact-section">
          <ContactSection />
        </div>
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <FooterSection />
      </ScrollReveal>
    </div>
  );
}
