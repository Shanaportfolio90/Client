import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Clock, Calendar, User, ArrowRight, X, Share2, BookOpen, Filter, ChevronDown, Check } from 'lucide-react';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import FooterSection from '../../components/FooterSection';
import ScrollReveal from '../../components/ScrollReveal';
import { API_BASE_URL } from '../../config';
import b1Img from '../../assets/blog-1.png';
import b2Img from '../../assets/blog-2.png';
import b3Img from '../../assets/blog-3.png';
import './BlogsPage.css';

export default function BlogsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); // Modal state

  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Fetch Blogs from DB
    fetch(`${API_BASE_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        }
      })
      .catch((err) => {
        console.warn('Failed to load blogs from server:', err);
      })
      .finally(() => setLoading(false));

    // Fetch categories dynamically
    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((cats) => {
        if (Array.isArray(cats)) {
          setFetchedCategories(cats.map((c) => c.name));
        }
      })
      .catch((err) => console.warn('Failed to load categories:', err));

    // Fetch Ads from Admin Panel DB
    fetch(`${API_BASE_URL}/api/ads`)
      .then((res) => res.json())
      .then((adData) => {
        if (Array.isArray(adData)) {
          setAds(adData);
        }
      })
      .catch((err) => {
        console.warn('Failed to load ads:', err);
      });
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Compute unique categories dynamically
  const defaultCats = ['Brand Collab', 'Book Promotion', 'Shorts Series', 'Strategy & Tips'];
  const blogCats = blogs.map((b) => b.category).filter(Boolean);
  const categoriesList = ['All', ...Array.from(new Set([...fetchedCategories, ...defaultCats, ...blogCats]))];

  // Filtered & Searched Blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.summary && blog.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`blogs-page-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Background Grid Pattern */}
      <div className="bg-grid-overlay" />

      {/* Floating Navbar */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activePage="Blogs" />

      {/* Hero Header */}
      <header className="blogs-hero-header">
        <div className="blogs-hero-inner">
          <div className="blogs-hero-badge">
            <div className="badge-circles">
              <span className="circle-black" />
              <span className="circle-orange" />
            </div>
            <span className="badge-label">Insights & Articles</span>
          </div>

          <h1 className="blogs-main-title">
            Blogs, Shorts & <span className="highlight-text">Articles</span>
          </h1>

          <p className="blogs-subtitle">
            Insights on brand collaborations, book promotions, short video strategy, and content marketing by <strong>Snaha Chakraborty</strong>.
          </p>

          <nav className="blogs-breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Blogs</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="blogs-main-content">
        <div className="blogs-content-inner">
          <div className="blogs-layout-container">
            {/* Main Column */}
            <div className="blogs-main-column">
              {/* Controls Bar: Search & Category Tabs */}
              <div className="blogs-controls-bar">
                {/* Search Box */}
                <div className="blog-search-wrapper">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search articles by title or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="clear-search-btn"
                      onClick={() => setSearchQuery('')}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Category Filter Dropdown */}
                <div className="blog-filter-dropdown-wrapper">
                  <button
                    type="button"
                    className={`filter-dropdown-btn ${activeCategory !== 'All' ? 'active' : ''}`}
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  >
                    <Filter size={16} />
                    <span>{activeCategory === 'All' ? 'Filter Category' : activeCategory}</span>
                    <ChevronDown size={14} className={`chevron-icon ${showFilterDropdown ? 'open' : ''}`} />
                  </button>

                  {activeCategory !== 'All' && (
                    <button
                      type="button"
                      className="reset-category-badge-btn"
                      onClick={() => setActiveCategory('All')}
                      title="Reset Category Filter"
                    >
                      <span>Clear Filter</span>
                      <X size={12} />
                    </button>
                  )}

                  {showFilterDropdown && (
                    <div className="filter-dropdown-menu">
                      <div className="dropdown-menu-header">Filter by Category</div>
                      {categoriesList.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={`dropdown-item-btn ${activeCategory === cat ? 'selected' : ''}`}
                          onClick={() => {
                            setActiveCategory(cat);
                            setShowFilterDropdown(false);
                          }}
                        >
                          <span>{cat}</span>
                          {activeCategory === cat && <Check size={14} className="check-icon" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Blogs Grid */}
              {filteredBlogs.length === 0 ? (
                <div className="no-blogs-found">
                  <BookOpen size={48} className="no-icon" />
                  <h3>No articles found</h3>
                  <p>Try resetting your search query or switching category filters.</p>
                  <button
                    type="button"
                    className="reset-filter-btn"
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="blogs-grid">
                  {filteredBlogs.map((blog) => (
                    <article
                      key={blog._id}
                      className="blog-card"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      <div className="blog-card-media">
                        <img
                          src={blog.coverImage || b1Img}
                          alt={blog.title}
                          className="blog-cover-img"
                        />
                        <span className="blog-category-tag">{blog.category}</span>
                      </div>

                      <div className="blog-card-body">
                        <div className="blog-meta-row">
                          <span className="meta-item">
                            <Calendar size={13} />
                            <span>{blog.date || '2026'}</span>
                          </span>
                          <span className="meta-item">
                            <Clock size={13} />
                            <span>{blog.readTime || '4 min read'}</span>
                          </span>
                        </div>

                        <h3 className="blog-card-title">{blog.title}</h3>
                        <p className="blog-card-summary">
                          {blog.summary || (blog.content ? blog.content.replace(/<[^>]+>/g, '').slice(0, 110) + '...' : '')}
                        </p>

                        <div className="blog-card-footer">
                          <div className="author-info">
                            <User size={14} />
                            <span>{blog.author || 'Snaha Chakraborty'}</span>
                          </div>
                          <span className="read-more-btn">
                            <span>Read Article</span>
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar Column: Sticky Advertisements */}
            <aside className="blogs-sidebar-column">
              <div className="sticky-sidebar-inner">
                <div className="sidebar-section-header">
                  <Sparkles size={16} className="sparkle-icon" />
                  <span>Featured & Sponsored</span>
                </div>

                {ads.map((ad) => (
                  <div key={ad._id} className="ad-card-item">
                    {ad.imageUrl ? (
                      <div className="ad-card-img-wrap">
                        {ad.badgeText && <span className="ad-badge">{ad.badgeText}</span>}
                        <img src={ad.imageUrl} alt={ad.title} className="ad-card-img" />
                      </div>
                    ) : (
                      ad.badgeText && <span className="ad-badge-inline">{ad.badgeText}</span>
                    )}
                    <div className="ad-card-body">
                      <h4 className="ad-card-title">{ad.title}</h4>
                      {ad.tagline && <p className="ad-card-tagline">{ad.tagline}</p>}
                      <a
                        href={ad.link}
                        target={ad.link.startsWith('http') ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="ad-cta-btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                ))}

                {/* Quick Connect / Consultation Promo Card */}
                <div className="ad-card-item promo-card-accent">
                  <span className="ad-badge-inline badge-dark">Work With Snaha</span>
                  <h4 className="ad-card-title" style={{ color: '#191412', marginTop: '4px' }}>
                    Need a Custom Brand Campaign or Book Trailer?
                  </h4>
                  <p className="ad-card-tagline" style={{ color: '#332F2C' }}>
                    Get tailored short-form video strategy, scripting, and creator distribution.
                  </p>
                  <a href="#contact" className="ad-cta-btn btn-dark">
                    <span>Let's Collaborate</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Article Detail Reader Modal */}
      {selectedBlog && (
        <div className="blog-modal-backdrop" onClick={() => setSelectedBlog(null)}>
          <div className="blog-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blog-modal-close-btn"
              onClick={() => setSelectedBlog(null)}
              aria-label="Close Article"
            >
              <X size={20} />
            </button>

            <header className="blog-modal-header">
              <div className="blog-modal-tags">
                <span className="modal-category-badge">{selectedBlog.category}</span>
                <span className="modal-meta-item">
                  <Calendar size={13} />
                  <span>{selectedBlog.date}</span>
                </span>
                <span className="modal-meta-item">
                  <Clock size={13} />
                  <span>{selectedBlog.readTime || '5 min read'}</span>
                </span>
              </div>

              <h1 className="blog-modal-title">{selectedBlog.title}</h1>

              <div className="blog-modal-author-bar">
                <div className="author-badge">
                  <User size={16} />
                  <span>Written by {selectedBlog.author || 'Snaha Chakraborty'}</span>
                </div>
              </div>
            </header>

            {selectedBlog.coverImage && (
              <div className="blog-modal-cover-wrap">
                <img src={selectedBlog.coverImage} alt={selectedBlog.title} className="blog-modal-cover-img" />
              </div>
            )}

            {/* Jodit HTML Content */}
            <div
              className="blog-modal-html-content jodit-rendered-content"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />

            <footer className="blog-modal-footer">
              <div className="modal-footer-cta">
                <h3>Want to collaborate or discuss a project?</h3>
                <a href="#contact" onClick={() => setSelectedBlog(null)} className="modal-contact-btn">
                  <span>Contact Me</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <ScrollReveal variant="fade-up">
        <ContactSection />
      </ScrollReveal>

      {/* Footer Section */}
      <ScrollReveal variant="fade-up">
        <FooterSection />
      </ScrollReveal>
    </div>
  );
}
