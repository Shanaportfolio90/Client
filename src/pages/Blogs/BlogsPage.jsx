import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, Clock, Calendar, User, ArrowRight, X, Play, ChevronRight, BookOpen, Video, ArrowUpRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import FooterSection from '../../components/FooterSection';
import ScrollReveal from '../../components/ScrollReveal';
import { API_BASE_URL } from '../../config';
import b1Img from '../../assets/blog-1.png';
import b2Img from '../../assets/blog-2.png';
import b3Img from '../../assets/blog-3.png';
import yamkitchImg from '../../assets/yamkitch-mockup.jpg';
import lekhokTripuraImg from '../../assets/lekhok-tripura-mockup.jpg';
import './BlogsPage.css';

export default function BlogsPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('The Latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [mediaList, setMediaList] = useState([]);

  const isDirectVideo = (url) => {
    if (!url || typeof url !== 'string') return false;
    const lower = url.toLowerCase();
    return (
      lower.endsWith('.mp4') ||
      lower.endsWith('.mov') ||
      lower.endsWith('.webm') ||
      lower.includes('/video/upload/') ||
      lower.includes('cloudinary.com')
    );
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0];
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    } else {
      videoId = url.match(/^[a-zA-Z0-9_-]{11}$/) ? url : 'dQw4w9WgXcQ';
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  useEffect(() => {
    // Fetch Blogs from Server DB
    fetch(`${API_BASE_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        }
      })
      .catch((err) => console.warn('Failed to load blogs from server:', err))
      .finally(() => setLoading(false));

    // Fetch Published Media Content (Videos) from Database
    fetch(`${API_BASE_URL}/api/media`)
      .then((res) => res.json())
      .then((mediaData) => {
        if (Array.isArray(mediaData)) {
          setMediaList(mediaData);
        }
      })
      .catch((err) => console.warn('Failed to load media content:', err));

    // Fetch categories dynamically
    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((cats) => {
        if (Array.isArray(cats)) {
          setFetchedCategories(cats.map((c) => c.name));
        }
      })
      .catch((err) => console.warn('Failed to load categories:', err));

    // Fetch Ads
    fetch(`${API_BASE_URL}/api/ads`)
      .then((res) => res.json())
      .then((adData) => {
        if (Array.isArray(adData)) {
          setAds(adData);
        }
      })
      .catch((err) => console.warn('Failed to load ads:', err));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Sample articles for default presentation if DB is sparse
  const defaultArticles = [
    {
      _id: 'default-1',
      title: 'How Short-Form Video Strategy Boosts Brand Engagement by 300%',
      summary: 'An inside look into scripting, visual pacing, and high-converting storytelling for Instagram Reels and YouTube Shorts.',
      category: 'Shorts Series',
      author: 'Snaha Chakraborty',
      date: 'Sep 01, 2026',
      readTime: '5 min read',
      coverImage: b1Img,
      content: `<p>Short-form video is no longer optional—it is the single highest converting medium for brands and authors alike in 2026.</p><h3>1. The First 3-Second Hook</h3><p>Your opening frame determines retention. Use bold typography and unexpected visual motion.</p><h3>2. Story Arc in 60 Seconds</h3><p>Focus on problem identification, immediate demonstration, and an unmistakable Call to Action.</p>`,
    },
    {
      _id: 'default-2',
      title: 'Publishing & Promoting Bestsellers with Lekhok Tripura Publishers',
      summary: 'Behind-the-scenes walkthrough of full book marketing campaigns, author trailers, and regional book distribution.',
      category: 'Book Promotion',
      author: 'Snaha Chakraborty',
      date: 'Aug 28, 2026',
      readTime: '7 min read',
      coverImage: lekhokTripuraImg,
      content: `<p>Launching a novel requires a synchronized press release, author interviews, and cinematic book trailers across social channels.</p>`,
    },
    {
      _id: 'default-3',
      title: 'Building Modern Digital Web Solutions with GenWeb Tech & YamKitch',
      summary: 'Exploring website architecture, high-converting UX principles, and responsive performance for digital platforms.',
      category: 'Tech & Web',
      author: 'GenWeb Team',
      date: 'Aug 24, 2026',
      readTime: '6 min read',
      coverImage: yamkitchImg,
      content: `<p>Engineered for lightning-fast speeds and seamless mobile user experience.</p>`,
    },
    {
      _id: 'default-4',
      title: 'The Blueprint for High-ROI Influencer Brand Collaborations',
      summary: 'How content creators and consumer brands build authentic partnerships that drive real conversion metrics.',
      category: 'Brand Collab',
      author: 'Snaha Chakraborty',
      date: 'Aug 18, 2026',
      readTime: '4 min read',
      coverImage: b2Img,
      content: `<p>Authenticity is the currency of modern influencer marketing.</p>`,
    },
    {
      _id: 'default-5',
      title: 'Mastering Visual Storytelling & Lighting for Mobile Video Shoots',
      summary: 'Practical camera setups, color grading tips, and audio secrets for producing studio-quality Reels on a smartphone.',
      category: 'Strategy & Tips',
      author: 'Snaha Chakraborty',
      date: 'Aug 12, 2026',
      readTime: '8 min read',
      coverImage: b3Img,
      content: `<p>Lighting makes or breaks mobile cinematography. Learn natural key lighting techniques.</p>`,
    },
  ];

  // Combine DB articles with default list
  const allArticles = blogs.length > 0 ? [...blogs, ...defaultArticles] : defaultArticles;

  // Dynamic placement resolution from Admin Panel assignments
  const assignedMainHero = allArticles.find((a) => a.heroPosition === 'main_hero');
  const assignedMini1 = allArticles.find((a) => a.heroPosition === 'mini_1');
  const assignedMini2 = allArticles.find((a) => a.heroPosition === 'mini_2');
  const assignedMini3 = allArticles.find((a) => a.heroPosition === 'mini_3');
  const assignedSpotlight = allArticles.find((a) => a.heroPosition === 'spotlight');

  // Filtered Articles based on search & category
  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory =
      activeCategory === 'The Latest' || activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.summary && article.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Top featured hero article
  const heroArticle = assignedMainHero || filteredArticles[0] || allArticles[0];

  // Mini previews under main hero
  const defaultMinis = filteredArticles.filter((a) => a._id !== heroArticle._id).slice(0, 3);
  const miniPreviews = [
    assignedMini1 || defaultMinis[0] || allArticles[1],
    assignedMini2 || defaultMinis[1] || allArticles[2],
    assignedMini3 || defaultMinis[2] || allArticles[3],
  ].filter(Boolean);

  const latestGridArticles = filteredArticles.slice(0, 4);
  const spotlightArticle = assignedSpotlight || filteredArticles[4] || allArticles[1];
  const noteworthyArticles = filteredArticles.slice(0, 7);

  // Video series playlist (dynamically mapped strictly from server DB mediaList)
  const videoPlaylist = mediaList.map((item) => ({
    id: item._id,
    title: item.title,
    show: item.category || 'Featured Series',
    duration: item.date || 'Video',
    thumbnail: item.thumbnailUrl || b1Img,
    desc: item.description || '',
    videoUrl: item.videoUrl,
    author: item.author || 'Snaha Chakraborty',
    date: item.date,
  }));

  const categoryPills = [
    'The Latest',
    'Brand Collab',
    'Book Promotion',
    'Shorts Series',
    'Strategy & Tips',
    'Tech & Web',
  ];

  return (
    <div className={`blogs-page-wrapper magazine-theme ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Background Grid Pattern */}
      <div className="bg-grid-overlay" />

      {/* Floating Navbar */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activePage="Blogs" />

      {/* RINGER STYLE MAGAZINE HEADER */}
      <header className="magazine-header-section">
        <div className="magazine-header-inner">
          <div className="magazine-branding-bar">
            <Link to="/" className="magazine-logo-text">
              SNAHA<span className="logo-dot">•</span>JOURNAL
            </Link>

            {/* Discover Search Input */}
            <div className="magazine-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Discover anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Category Filter Pill Bar (Ringer Style) */}
          <nav className="magazine-category-pill-bar">
            {categoryPills.map((pill) => (
              <button
                key={pill}
                type="button"
                className={`category-pill-btn ${activeCategory === pill ? 'active' : ''}`}
                onClick={() => setActiveCategory(pill)}
              >
                {pill}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN MAGAZINE CONTENT CONTAINER */}
      <main className="magazine-main-container">
        {/* ==========================================================================
            SECTION 1: HERO FEATURED BANNER CARD WITH MINI PREVIEW OVERLAYS (SCREENSHOT 1)
            ========================================================================== */}
        {heroArticle && (
          <section className="magazine-hero-banner-section">
            <div
              className="hero-banner-card"
              onClick={() => setSelectedBlog(heroArticle)}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(10, 8, 7, 0.92) 100%), url(${
                  heroArticle.coverImage || b1Img
                })`,
              }}
            >
              <div className="hero-banner-content">
                <span className="hero-category-badge">{heroArticle.category || 'FEATURED'}</span>
                <h1 className="hero-banner-title">{heroArticle.title}</h1>
                <div className="hero-author-row">
                  <img src="/Logo_Snaha.png" alt={heroArticle.author} className="hero-author-avatar" />
                  <span>By {heroArticle.author || 'Snaha Chakraborty'}</span>
                  <span className="dot-sep">•</span>
                  <span>{heroArticle.readTime || '5 min read'}</span>
                </div>
              </div>

              {/* Bottom Mini Preview Overlay Cards */}
              <div className="hero-mini-previews-row">
                {miniPreviews.map((mini) => (
                  <div
                    key={mini._id}
                    className="mini-preview-card"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBlog(mini);
                    }}
                  >
                    <img src={mini.coverImage || b2Img} alt={mini.title} className="mini-thumb-img" />
                    <div className="mini-card-text">
                      <h4 className="mini-card-title">{mini.title}</h4>
                      <span className="mini-card-meta">
                        By {mini.author || 'Snaha'} • {mini.readTime || '4 min read'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==========================================================================
            SECTION 2: "THE LATEST" DISTINCT STYLED CARD GRID (SCREENSHOT 2)
            ========================================================================== */}
        <section className="magazine-section latest-grid-section">
          <div className="section-header-bar">
            <h2
              className="magazine-section-title"
              onClick={() => navigate('/archive')}
              style={{ cursor: 'pointer' }}
              title="Click to view all articles in Archive"
            >
              The Latest
              <span className="title-arrow-circle">
                <ChevronRight size={18} />
              </span>
            </h2>
          </div>

          <div className="latest-cards-grid">
            {latestGridArticles.map((article, idx) => {
              const isVideo = Boolean(article.videoUrl);
              return (
                <article
                  key={article._id}
                  className={`ringer-card ${isVideo ? 'is-video-card' : ''}`}
                  onClick={() => setSelectedBlog(article)}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(10, 8, 7, 0.95) 100%), url(${
                      article.coverImage || (idx % 2 === 0 ? b2Img : b3Img)
                    })`,
                  }}
                >
                  {isVideo && (
                    <div
                      className="card-play-button-overlay"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideoModal(article);
                      }}
                      title="Play Video Popup"
                    >
                      <Play size={20} fill="#191412" color="#191412" />
                    </div>
                  )}
                  <div className="card-body-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isVideo && (
                        <span className="video-icon-badge" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000', color: '#FFFFFF', padding: '3px 6px', borderRadius: '6px', fontSize: '10px', fontWeight: '900' }}>
                          <Play size={10} fill="#FFFFFF" color="#FFFFFF" /> YT
                        </span>
                      )}
                      <span className="card-top-badge">{article.category || 'ARTICLE'}</span>
                    </div>
                    <h3 className="ringer-card-title">{article.title}</h3>
                    <div className="ringer-card-author-bar">
                      <img src="/Logo_Snaha.png" alt={article.author} className="ringer-author-avatar" />
                      <span>By {article.author || 'Snaha Chakraborty'} • {article.readTime || '5 min read'}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ==========================================================================
            SECTION 3: FULL-WIDTH CINEMATIC BANNER SPOTLIGHT (SCREENSHOT 3)
            ========================================================================== */}
        {spotlightArticle && (
          <section className="magazine-section wide-spotlight-section">
            <div
              className="wide-spotlight-banner"
              onClick={() => setSelectedBlog(spotlightArticle)}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(10, 8, 7, 0.95) 100%), url(${
                  spotlightArticle.coverImage || b3Img
                })`,
              }}
            >
              <div className="spotlight-content-center">
                <span className="spotlight-badge">{spotlightArticle.category || 'DEEP DIVE'}</span>
                <h2 className="spotlight-title">{spotlightArticle.title}</h2>
                <div className="spotlight-author-row">
                  <User size={16} />
                  <span>By {spotlightArticle.author || 'Snaha Chakraborty'}</span>
                  <span className="dot-sep">•</span>
                  <span>{spotlightArticle.readTime || '6 min read'}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================================================
            SECTION 4: NOTEWORTHY READS & 2 VISUAL STORY CARDS (SCREENSHOT 4)
            ========================================================================== */}
        <section className="magazine-section noteworthy-section">
          <div className="noteworthy-grid-container">
            {/* Column 1: Noteworthy Reads List Card */}
            <div className="noteworthy-list-card">
              <h3 className="noteworthy-card-heading">Noteworthy Reads</h3>
              <ul className="noteworthy-links-list">
                {noteworthyArticles.map((art, index) => (
                  <li
                    key={art._id || index}
                    className="noteworthy-item"
                    onClick={() => setSelectedBlog(art)}
                  >
                    <span className="bullet-dot" />
                    <span className="noteworthy-item-title">{art.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 & 3: Visual Graphic Story Cards */}
            {allArticles.slice(2, 4).map((art, idx) => (
              <div
                key={art._id || idx}
                className="visual-story-card"
                onClick={() => setSelectedBlog(art)}
              >
                <img src={art.coverImage || (idx === 0 ? b1Img : b2Img)} alt={art.title} className="visual-story-img" />
                <div className="visual-story-overlay">
                  <span className="visual-category-pill">{art.category}</span>
                  <h3 className="visual-story-title">{art.title}</h3>
                  <div className="visual-author-bar">
                    <span>By {art.author || 'Snaha'}</span>
                    <span>• {art.readTime || '5 min read'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            SECTION 5: VIDEOS & REELS SERIES BLOCK (THE RINGER STYLE)
            ========================================================================== */}
        {videoPlaylist.length > 0 && (() => {
          const currentVid = videoPlaylist[activeVideoIndex] || videoPlaylist[0];
          return (
            <section className="magazine-section videos-block-section">
              <div className="videos-block-container">
                <h2 className="videos-section-heading">Videos</h2>

                <div className="videos-layout-grid">
                  {/* Left Column: Playlist items */}
                  <div className="videos-playlist-col">
                    <div className="playlist-items-list">
                      {videoPlaylist.map((vid, idx) => (
                        <div
                          key={vid.id}
                          className={`playlist-item-card ${activeVideoIndex === idx ? 'active' : ''}`}
                          onClick={() => setActiveVideoIndex(idx)}
                        >
                          <div className="playlist-item-thumb">
                            <img src={vid.thumbnail} alt={vid.title} />
                          </div>
                          <div className="playlist-item-info">
                            <h4 className="vid-item-title">{vid.title}</h4>
                            <div className="vid-item-meta">
                              <span className="vid-icon-badge">
                                <Play size={10} fill="#191412" color="#191412" />
                              </span>
                              <span>{vid.show}</span>
                              <span className="dot-sep">•</span>
                              <span>{vid.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* All Videos Pill Button */}
                    <button type="button" className="all-videos-pill-btn" onClick={() => navigate('/archive')}>
                      <span>All Videos</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Right Column: Main Player Preview */}
                  {currentVid && (
                    <div className="main-video-player-col">
                      <div
                        className="main-video-card"
                        onClick={() => setActiveVideoModal(currentVid)}
                      >
                        <img
                          src={currentVid.thumbnail}
                          alt={currentVid.title}
                          className="video-cover-img"
                        />
                        <div className="video-player-overlay">
                          <button
                            type="button"
                            className="ringer-white-play-btn"
                            aria-label="Play Video"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveVideoModal(currentVid);
                            }}
                          >
                            <Play size={28} fill="#191412" color="#191412" />
                          </button>
                        </div>
                      </div>

                      {/* Below Poster: Title & Channel Meta Bar (The Ringer Style) */}
                      <div className="video-main-title-block">
                        <h2 className="video-main-title">{currentVid.title}</h2>
                        <div className="video-main-channel-meta">
                          <img src="/Logo_Snaha.png" alt="Channel Logo" className="video-channel-avatar" />
                          <span>{currentVid.show}</span>
                          <span className="dot-sep">•</span>
                          <span>Recently Published</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })()}
      </main>

      {/* FLOATING INTERACTIVE YOUTUBE VIDEO POPUP MODAL (THE RINGER STYLE) */}
      {activeVideoModal && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="video-modal-popover" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header-actions">
              <button
                type="button"
                className="video-modal-close-btn"
                onClick={() => setActiveVideoModal(null)}
                title="Close Video"
              >
                <X size={20} />
              </button>
            </div>

            <div className="video-modal-player-wrap">
              {isDirectVideo(activeVideoModal.videoUrl || activeVideoModal.url) ? (
                <video
                  src={activeVideoModal.videoUrl || activeVideoModal.url}
                  controls
                  autoPlay
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: '#000000',
                  }}
                />
              ) : (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideoModal.videoUrl || activeVideoModal.url)}
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="video-modal-iframe"
                />
              )}
            </div>

            <div className="video-modal-info-footer">
              <h3 className="video-modal-title">{activeVideoModal.title}</h3>
              <div className="video-modal-channel-meta">
                <img src="/Logo_Snaha.png" alt="Channel Logo" className="video-channel-avatar" />
                <span>{activeVideoModal.author || activeVideoModal.show || 'Snaha Video Essays'}</span>
                <span className="dot-sep">•</span>
                <span>{activeVideoModal.date || 'Recently Published'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE READER MODAL */}
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
                <span className="modal-category-badge">{selectedBlog.category || 'Article'}</span>
                {selectedBlog.date && (
                  <span className="modal-meta-item">
                    <Calendar size={13} />
                    <span>{selectedBlog.date}</span>
                  </span>
                )}
                {selectedBlog.readTime && (
                  <span className="modal-meta-item">
                    <Clock size={13} />
                    <span>{selectedBlog.readTime}</span>
                  </span>
                )}
              </div>

              <h1 className="blog-modal-title">{selectedBlog.title}</h1>

              <div className="blog-modal-author-bar">
                <div className="author-badge">
                  <User size={16} />
                  <span>Written by {selectedBlog.author || 'Snaha Chakraborty'}</span>
                </div>
              </div>
            </header>

            {selectedBlog.videoUrl ? (
              <div className="blog-modal-video-wrap" style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '20px', overflow: 'hidden', marginBottom: '28px', backgroundColor: '#000000' }}>
                {isDirectVideo(selectedBlog.videoUrl) ? (
                  <video
                    src={selectedBlog.videoUrl}
                    controls
                    autoPlay
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedBlog.videoUrl)}
                    title={selectedBlog.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                )}
              </div>
            ) : selectedBlog.coverImage ? (
              <div className="blog-modal-cover-wrap">
                <img src={selectedBlog.coverImage} alt={selectedBlog.title} className="blog-modal-cover-img" />
              </div>
            ) : null}

            {/* Render HTML content */}
            <div
              className="blog-modal-html-content jodit-rendered-content"
              dangerouslySetInnerHTML={{
                __html:
                  selectedBlog.content ||
                  `<p>${selectedBlog.summary || 'Full content for this article will be published soon.'}</p>`,
              }}
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
