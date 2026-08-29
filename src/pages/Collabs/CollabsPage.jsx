import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Globe, BookOpen, Sparkles, CheckCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import PricingSection from '../../components/PricingSection';
import FooterSection from '../../components/FooterSection';
import yamkitchImg from '../../assets/yamkitch-mockup.jpg';
import lekhokTripuraImg from '../../assets/lekhok-tripura-mockup.jpg';
import yamkitchLogo from '../../assets/yamkitch-logo.png';
import genwebOfficialLogo from '../../assets/genweb-official-logo.png';
import lekhokTripuraLogo from '../../assets/lekhok-tripura-logo.png';
import p1Img from '../../assets/project-1-mockup.png';
import p2Img from '../../assets/project-2-mockup.png';
import b1Img from '../../assets/blog-1.png';
import b2Img from '../../assets/blog-2.png';
import b3Img from '../../assets/blog-3.png';
import './CollabsPage.css';

export default function CollabsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const marqueeBrands = [
    'GenWeb Tech',
    'Lekhok Tripura Publishers',
    'YamKitch',
    'Brand Collaborations',
    'Book Promotions',
    'Shorts & Reels Series',
    'Digital Web Solutions',
  ];

  const brandProjects = [
    {
      id: 'yamkitch',
      brand: 'GenWeb Tech',
      category: 'Tech & Web',
      title: 'YamKitch - Modern Food Tech & Digital Web Solution',
      websiteUrl: 'https://www.yamkitch.in/',
      displayUrl: 'yamkitch.in',
      image: yamkitchImg,
      description:
        'Designed and engineered a high-converting, responsive web solution for YamKitch under GenWeb Tech. Features modern UI/UX design, custom visual branding, lightning-fast performance, and seamless user interaction.',
      tags: ['UI/UX Design', 'Web Development', 'Responsive Design', 'GenWeb Tech'],
      ctaText: 'Get a Professional Website',
    },
    {
      id: 'lekhok-tripura',
      brand: 'Lekhok Tripura Publishers',
      category: 'Book Publishers',
      title: 'Lekhok Tripura - Bestseller Publications & Video Marketing',
      websiteUrl: 'https://www.lekhoktripura.in/',
      displayUrl: 'lekhoktripura.in',
      image: lekhokTripuraImg,
      description:
        'End-to-end book launch campaign & promotional video series for Lekhok Tripura Publishers. Created bestseller book trailers, author spotlights, and multi-platform promotional reels that boosted novel sales and reader engagement.',
      tags: ['Book Promotion', 'Video Marketing', 'Author Branding', 'Publisher Campaign'],
      ctaText: 'Publish Your Book Now',
    },
    {
      id: 'brand-collab-1',
      brand: 'Brand Collab',
      category: 'Shorts & Reels',
      title: 'High-Converting Viral Brand Campaign',
      websiteUrl: '#',
      displayUrl: 'Instagram Reel Campaign',
      image: b1Img,
      description:
        'Viral promo series crafted for top consumer brand. Generated 250,000+ views across Instagram Reels & YouTube Shorts with direct click-through to client platform.',
      tags: ['Brand Collab', 'Viral Reels', 'Influencer Campaign'],
    },
    {
      id: 'book-promo-2',
      brand: 'Lekhok Tripura Publishers',
      category: 'Book Publishers',
      title: 'Bestseller Fiction Novel Promotion Series',
      websiteUrl: 'https://www.lekhoktripura.in/',
      displayUrl: 'lekhoktripura.in',
      image: b2Img,
      description:
        'Short-video promo series highlighting key plot hooks and author backstory. Drove novel pre-orders and bookstore distribution reach.',
      tags: ['Book Promo', 'Publisher Reel', 'Shorts Series'],
    },
    {
      id: 'app-solution-1',
      brand: 'GenWeb Tech',
      category: 'Tech & Web',
      title: 'Bakery Shop Mobile App Solution UI/UX',
      websiteUrl: '#',
      displayUrl: 'GenWeb Mobile UX',
      image: p1Img,
      description:
        'Mobile ordering application concept for artisanal bakery chain. Clean wireframes, design system tokens, and interactive prototype.',
      tags: ['App Design', 'Wireframe', 'UI/UX Design'],
    },
    {
      id: 'ecommerce-1',
      brand: 'GenWeb Tech',
      category: 'Tech & Web',
      title: 'Clothing Store E-Commerce Platform',
      websiteUrl: '#',
      displayUrl: 'Fashion E-Commerce',
      image: p2Img,
      description:
        'Full responsive fashion store web interface with smooth product discovery, filter system, and streamlined checkout experience.',
      tags: ['Web Design', 'E-Commerce', 'UI System'],
    },
  ];

  const filteredProjects = brandProjects.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

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

          <h1 className="collabs-main-title">
            Brand <span className="highlight-text">Collaborations</span> & Showcase
          </h1>

          <p className="collabs-subtitle">
            Explore our curated work across Tech Solutions with <strong>GenWeb Tech</strong> and Bestseller Publishing with <strong>Lekhok Tripura Publishers</strong>.
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
            FEATURED SHOWCASE 1: GENWEB TECH (WEB & DIGITAL SOLUTIONS)
            ================================================================== */}
        <section className="featured-brand-showcase tech-showcase">
          <div className="showcase-inner">
            {/* Brand Header */}
            <div className="brand-showcase-header">
              <div className="brand-logo-pill">
                <img src={genwebOfficialLogo} alt="GenWeb Tech Logo" className="brand-circle-pill-img" />
                <span>GenWeb Tech</span>
              </div>
              <h2 className="brand-showcase-title with-circle-logo">
                <div className="title-logo-circle">
                  <img src={genwebOfficialLogo} alt="GenWeb Tech Logo" className="circle-logo-img" />
                </div>
                <span>GenWeb Tech</span>
                <span className="dot-divider">•</span>
                <span className="highlight-text">Web & Tech Showcase</span>
              </h2>
              <p className="brand-showcase-tagline">
                High-performance website architecture, modern UI/UX design systems, and digital platform development.
              </p>
            </div>

            {/* Showcase Card: YamKitch */}
            <div className="showcase-project-card">
              <div className="showcase-image-col">
                <div className="showcase-img-wrap">
                  <img src={yamkitchImg} alt="YamKitch Website Mockup" className="showcase-mockup-img" />
                  <span className="showcase-badge-pill">Featured Web Project</span>
                </div>
              </div>

              <div className="showcase-info-col">
                <div className="showcase-tags-row">
                  <span className="tag-pill">GenWeb Tech</span>
                  <span className="tag-pill tag-pill-dark-logo">
                    <img src={yamkitchLogo} alt="YamKitch Logo" className="pill-logo-img" />
                    <span>YamKitch</span>
                  </span>
                  <span className="tag-pill">UI/UX Design</span>
                  <span className="tag-pill">Responsive Web</span>
                </div>

                <h3 className="project-headline with-circle-logo">
                  <div className="title-logo-circle">
                    <img src={yamkitchLogo} alt="YamKitch Logo" className="circle-logo-img" />
                  </div>
                  <span>YamKitch - Food Tech & Digital Web Solution</span>
                </h3>

                <p className="project-description">
                  Designed and built a modern, responsive web application interface for YamKitch. Engineered for optimal performance, smooth user flow, and clean visual branding.
                </p>

                {/* Direct Live Website Link */}
                <a
                  href="https://www.yamkitch.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="visit-live-site-btn"
                >
                  <Globe size={18} />
                  <span>Visit Live Website: yamkitch.in</span>
                  <ExternalLink size={16} />
                </a>

                {/* Bottom Section CTA Button for GenWeb Tech */}
                <div className="brand-action-cta-box">
                  <div className="cta-box-text">
                    <strong>Need a website like YamKitch?</strong>
                    <span>Get a custom, high-converting website built for your business.</span>
                  </div>
                  <a
                    href="https://wa.me/918258892262?text=Hi%20Snaha%20%26%20GenWeb%20Tech%20team!%20I%20came%20across%20your%20portfolio%20website%20and%20I%20am%20interested%20in%20getting%20a%20professional%20website%20built.%20Please%20share%20details!"
                    target="_blank"
                    rel="noreferrer"
                    className="brand-action-btn"
                  >
                    <span>Get a Professional Website</span>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            FEATURED SHOWCASE 2: LEKHOK TRIPURA PUBLISHERS (বই ও প্রকাশনা)
            ================================================================== */}
        <section className="featured-brand-showcase publisher-showcase">
          <div className="showcase-inner">
            {/* Brand Header */}
            <div className="brand-showcase-header">
              <div className="brand-logo-pill publisher-pill">
                <img src={lekhokTripuraLogo} alt="Lekhok Tripura Logo" className="brand-circle-pill-img" />
                <span>Lekhok Tripura Publishers</span>
              </div>
              <h2 className="brand-showcase-title with-circle-logo">
                <div className="title-logo-circle">
                  <img src={lekhokTripuraLogo} alt="Lekhok Tripura Logo" className="circle-logo-img" />
                </div>
                <span>Lekhok Tripura Publishers</span>
                <span className="dot-divider">•</span>
                <span className="highlight-text">Published Books & Campaigns</span>
              </h2>
              <p className="brand-showcase-tagline">
                Bestseller book launches, author branding, trailer reels, and multi-platform literature promotions.
              </p>
            </div>

            {/* Showcase Card: Lekhok Tripura */}
            <div className="showcase-project-card layout-reverse">
              <div className="showcase-info-col">
                <div className="showcase-tags-row">
                  <span className="tag-pill tag-pill-dark-logo">
                    <img src={lekhokTripuraLogo} alt="Lekhok Tripura Logo" className="pill-logo-img" />
                    <span>Lekhok Tripura</span>
                  </span>
                  <span className="tag-pill">Book Promotion</span>
                  <span className="tag-pill">Author Branding</span>
                </div>

                <h3 className="project-headline with-circle-logo">
                  <div className="title-logo-circle">
                    <img src={lekhokTripuraLogo} alt="Lekhok Tripura Logo" className="circle-logo-img" />
                  </div>
                  <span>Lekhok Tripura - Published Books & Video Marketing</span>
                </h3>

                <p className="project-description">
                  Full-scale book promotion campaign & video marketing for Lekhok Tripura Publishers. Produced bestseller book trailers, author spotlights, and short video reels that expanded novel circulation and reader reach across Tripura & Bengal.
                </p>

                {/* Direct Live Website Link */}
                <a
                  href="https://www.lekhoktripura.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="visit-live-site-btn"
                >
                  <BookOpen size={18} />
                  <span>Explore Publications: lekhoktripura.in</span>
                  <ExternalLink size={16} />
                </a>

                {/* Bottom Section CTA Button for Lekhok Tripura */}
                <div className="brand-action-cta-box publisher-cta-box">
                  <div className="cta-box-text">
                    <strong>Are you an author or publisher?</strong>
                    <span>Promote & launch your book into a bestseller campaign.</span>
                  </div>
                  <a
                    href="https://wa.me/918258892262?text=Hi%20Snaha%20%26%20Lekhok%20Tripura%20team!%20I%20am%20an%20author/publisher%20interested%20in%20book%20promotions.%20Please%20share%20details!"
                    target="_blank"
                    rel="noreferrer"
                    className="brand-action-btn publisher-action-btn"
                  >
                    <span>Promote Your Book Now</span>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>

              <div className="showcase-image-col">
                <div className="showcase-img-wrap">
                  <img src={lekhokTripuraImg} alt="Lekhok Tripura Book Showcase" className="showcase-mockup-img" />
                  <span className="showcase-badge-pill">Bestseller Publisher Showcase</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            ALL BRAND COLLABORATIONS PORTFOLIO & FILTER GRID
            ================================================================== */}
        <section className="all-collabs-portfolio-section">
          <div className="portfolio-section-inner">
            <div className="section-title-wrap">
              <div className="portfolio-badge">
                <span className="badge-dot" />
                <span>Client Work</span>
              </div>
              <h2 className="section-heading">Explore All Brand Partnerships</h2>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs-row">
              {['All', 'Tech & Web', 'Book Publishers', 'Shorts & Reels'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Brand Projects Grid */}
            <div className="brand-projects-grid">
              {filteredProjects.map((item) => (
                <div key={item.id} className="brand-card">
                  <div className="card-media-wrap">
                    <img src={item.image} alt={item.title} className="card-thumb-img" />
                    <span className="card-brand-badge">{item.brand}</span>
                  </div>

                  <div className="card-body">
                    <div className="card-tags-row">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="card-tag-pill">
                          {t}
                        </span>
                      ))}
                    </div>

                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-desc">{item.description}</p>

                    {item.websiteUrl && item.websiteUrl !== '#' && (
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="card-link"
                      >
                        <span>{item.displayUrl}</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Pricing Proposal Form Section */}
        <PricingSection />
      </main>

      {/* Contact & Footer */}
      <ContactSection />
      <FooterSection />
    </div>
  );
}
