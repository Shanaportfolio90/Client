import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Play,
  ChevronRight,
  Filter,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import FooterSection from '../../components/FooterSection';
import ScrollReveal from '../../components/ScrollReveal';
import { API_BASE_URL } from '../../config';
import b1Img from '../../assets/blog-1.png';
import b2Img from '../../assets/blog-2.png';
import b3Img from '../../assets/blog-3.png';
import './BlogArchivePage.css';

export default function BlogArchivePage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const [fetchedCategories, setFetchedCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        }
      })
      .catch((err) => console.warn('Failed to load blogs from server:', err))
      .finally(() => setLoading(false));

    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((cats) => {
        if (Array.isArray(cats)) {
          setFetchedCategories(cats.map((c) => c.name));
        }
      })
      .catch((err) => console.warn('Failed to load categories:', err));
  }, []);

  // Sample default articles if DB is empty
  const defaultArticles = [
    {
      _id: 'archive-1',
      title: 'AFC North Preview: Should You Believe in the Bengals?',
      summary: 'An inside look into team rosters, quarterback durability, and strategic play-calling for the upcoming season.',
      category: 'NFL',
      author: 'Sheil Kapadia',
      date: 'Sept. 1, 2026',
      readTime: '13 min read',
      coverImage: b1Img,
      content: `<p>Detailed analysis of AFC North teams, offensive lineups, and defense metrics for 2026.</p>`,
    },
    {
      _id: 'archive-2',
      title: 'Who Will Have the NFL’s Best Offense in 2026?',
      summary: 'Evaluating explosive passing attacks, run-game efficiency, and offensive coordinator schemes.',
      category: 'NFL',
      author: 'Anthony Dabbundo',
      date: 'Sept. 1, 2026',
      readTime: '27 min read',
      coverImage: b2Img,
      content: `<p>A comprehensive rating of NFL offensive powerhouses for the 2026 season.</p>`,
    },
    {
      _id: 'archive-3',
      title: 'Bill Belichick’s System Failure & Modern Defensive Evolution',
      summary: 'Why traditional defensive coaching paradigms are adapting to modern high-speed spreading offenses.',
      category: 'College Football',
      author: 'Tyler Parker',
      date: 'Aug. 31, 2026',
      readTime: '7 min read',
      coverImage: b3Img,
      content: `<p>How tactical innovations in football defense have reshaped modern game planning.</p>`,
    },
    {
      _id: 'archive-4',
      title: 'NFC East Preview: Is This the Cowboys’ Year?',
      summary: 'Breaking down NFC East contenders, salary cap shifts, and high-pressure postseason expectations.',
      category: 'NFL',
      author: 'Sheil Kapadia',
      date: 'Aug. 27, 2026',
      readTime: '15 min read',
      coverImage: b1Img,
      content: `<p>Deep dive into Dallas Cowboys roster depth and division competition.</p>`,
    },
    {
      _id: 'archive-5',
      title: 'Keep Chasing That Bird: The Oral History of ‘Coyote vs. Acme’',
      summary: 'Inside the unreleased Hollywood film that captured the internet’s imagination and controversy.',
      category: 'Movies',
      author: 'Alan Siegel',
      date: 'Aug. 27, 2026',
      readTime: '25 min read',
      coverImage: b2Img,
      content: `<p>Behind-the-scenes interviews with creators, animators, and film archivists.</p>`,
    },
  ];

  const allArticles = blogs.length > 0 ? blogs : defaultArticles;

  // Filtered Articles
  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch =
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  const defaultCategoryList = ['Brand Collab', 'Book Promotion', 'Shorts Series', 'Strategy & Tips', 'Tech & Web'];

  const categories = Array.from(
    new Set([
      'All',
      ...(fetchedCategories.length > 0 ? fetchedCategories : defaultCategoryList),
      ...blogs.map((b) => b.category).filter(Boolean),
    ])
  );

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

  return (
    <div className={`blogs-page-root ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* NAVBAR */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activePage="Blogs" />

      {/* MAIN ARCHIVE CONTAINER */}
      <main className="magazine-main-container archive-page-container">
        <ScrollReveal>
          {/* HERO TITLE BLOCK */}
          <section className="archive-hero-block">
            <button type="button" className="archive-back-link" onClick={() => navigate('/blogs')}>
              <ArrowLeft size={16} />
              <span>Back to Magazine</span>
            </button>

            <h1 className="archive-page-title">Archive</h1>
            <p className="archive-page-subtitle">
              We've been around since day one writing strategy, brand stories, and insights
            </p>

            {/* SEARCH & FILTER TOOLBAR */}
            <div className="archive-search-toolbar">
              <div className="archive-search-input-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Discover anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="archive-search-input"
                />
                {searchTerm && (
                  <button type="button" className="clear-search-btn" onClick={() => setSearchTerm('')}>
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* CATEGORY FILTER PILLS */}
              <div className="archive-category-pills-row">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`archive-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && cat !== 'All' && <X size={12} className="pill-x" />}
                  </button>
                ))}

                {(selectedCategory !== 'All' || searchTerm) && (
                  <button
                    type="button"
                    className="archive-clear-all-btn"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchTerm('');
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ARCHIVE ARTICLES LIST (THE RINGER STYLE) */}
        <ScrollReveal delay={150}>
          <section className="archive-articles-list-section">
            {displayedArticles.length === 0 ? (
              <div className="archive-empty-state">
                <h3>No articles found</h3>
                <p>Try clearing your search query or selecting another category.</p>
                <button
                  type="button"
                  className="archive-clear-all-btn"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="archive-cards-column">
                {displayedArticles.map((article) => (
                  <article
                    key={article._id}
                    className="archive-horizontal-card"
                    onClick={() => setSelectedBlog(article)}
                  >
                    <div className="archive-card-thumb">
                      <img
                        src={article.coverImage || b1Img}
                        alt={article.title}
                      />
                      {article.videoUrl && (
                        <span className="archive-video-play-badge">
                          <Play size={12} fill="#191412" color="#191412" />
                        </span>
                      )}
                    </div>

                    <div className="archive-card-content">
                      <span className="archive-card-category">{article.category || 'ARTICLE'}</span>
                      <h2 className="archive-card-title">{article.title}</h2>
                      <div className="archive-card-meta-row">
                        <span>By {article.author || 'Snaha Chakraborty'}</span>
                        <span className="dot-sep">•</span>
                        <span>{article.date || 'Recently Published'}</span>
                        {article.readTime && (
                          <>
                            <span className="dot-sep">•</span>
                            <span>{article.readTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* SHOW MORE BUTTON */}
            {filteredArticles.length > visibleCount && (
              <div className="archive-show-more-wrap">
                <button
                  type="button"
                  className="archive-show-more-btn"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                >
                  Show More
                </button>
              </div>
            )}
          </section>
        </ScrollReveal>
      </main>

      {/* FOOTER & CONTACT SECTIONS */}
      <ContactSection />
      <FooterSection />

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
                __html: selectedBlog.content || `<p>${selectedBlog.summary || 'Full article content coming soon...'}</p>`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
