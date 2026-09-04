import React, { useState, useEffect } from 'react';
import { Play, ChevronDown, ChevronUp } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './PortfolioSection.css';

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);
  const [dbVideos, setDbVideos] = useState([]);

  // Fetch dynamic videos from Admin Media Manager if available
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/media`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDbVideos(data);
        }
      })
      .catch((err) => console.error('Failed to load portfolio media:', err));
  }, []);

  const filterTabs = [
    'All',
    'Reels',
    'Fashion',
    'Beauty',
    'Lifestyle',
    'Food',
    'UGC',
    'Comedy',
  ];

  // The 10 creator reel cards using Snaha's authentic photos
  const defaultReels = [
    // --- Initial 5 Cards (Always Visible) ---
    {
      id: 'reel-1',
      title: 'Cafe Diaries',
      subtitle: 'Lifestyle • Reel',
      image: '/WhatsApp Image 2026-09-03 at 09.08.41.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'Lifestyle', 'Food'],
    },
    {
      id: 'reel-2',
      title: 'Ethnic Fashion Look',
      subtitle: 'Fashion • Reel',
      image: '/WhatsApp Image 2026-09-03 at 09.18.54.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'Fashion', 'Beauty'],
    },
    {
      id: 'reel-3',
      title: 'Wedding Joy & Moments',
      subtitle: 'UGC • Reel',
      image: '/WhatsApp Image 2026-09-03 at 09.18.55.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'UGC', 'Lifestyle', 'Comedy'],
    },
    {
      id: 'reel-4',
      title: 'Royal Bridal Elegance',
      subtitle: 'Beauty • Reel',
      image: '/WhatsApp Image 2026-09-03 at 09.18.00.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'Beauty', 'Fashion'],
    },
    {
      id: 'reel-5',
      title: 'Traditional Banarasi Saree',
      subtitle: 'Fashion • Reel',
      image: '/WhatsApp Image 2026-09-03 at 09.18.58.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'Fashion', 'Reels'],
    },

    // --- Next 5 Cards (Revealed on "View More Work") ---
    {
      id: 'reel-6',
      title: 'Festive Glam Look',
      subtitle: 'Fashion • Reel',
      image: '/WhatsApp Image 2026-09-03 at 09.09.39.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'Fashion', 'Beauty'],
    },
    {
      id: 'reel-7',
      title: 'Elegance in Green',
      subtitle: 'Lifestyle • Fashion',
      image: '/WhatsApp Image 2026-09-03 at 09.18.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'Fashion', 'Lifestyle'],
    },
    {
      id: 'reel-8',
      title: 'Outdoor Golden Hour',
      subtitle: 'Fashion • Beauty',
      image: '/WhatsApp Image 2026-09-03 at 09.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'Fashion', 'Beauty'],
    },
    {
      id: 'reel-9',
      title: 'Midnight Glam Saree',
      subtitle: 'Fashion • Reel',
      image: '/WhatsApp Image 2026-09-03 at.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'Fashion', 'Reels'],
    },
    {
      id: 'reel-10',
      title: 'Haldi & Sunshine Vibes',
      subtitle: 'Lifestyle • Reel',
      image: '/WhatsApp Image 2026-09-03 at 09.22.02.jpeg',
      videoUrl: 'https://www.instagram.com/',
      categories: ['All', 'Reels', 'Lifestyle', 'Fashion', 'Comedy'],
    },
  ];

  // Map any additional videos from DB into the format
  const formattedDbVideos = dbVideos.map((v) => ({
    id: v._id,
    title: v.title,
    subtitle: `${v.category || 'Creator'} • Reel`,
    image: v.thumbnailUrl,
    videoUrl: v.videoUrl,
    categories: ['All', 'Reels', v.category],
  }));

  // Combine default with DB videos (avoiding duplicates)
  const allCards = [...defaultReels, ...formattedDbVideos.filter((dv) => dv.image)];

  // Filter items based on active pill
  const filteredCards = allCards.filter((card) => {
    if (activeFilter === 'All') return true;
    return card.categories.some(
      (cat) => cat && cat.toLowerCase() === activeFilter.toLowerCase()
    );
  });

  // Display initial 5 or all if expanded
  const displayedCards = isExpanded ? filteredCards : filteredCards.slice(0, 5);

  const handleCardClick = (card) => {
    if (card.videoUrl && card.videoUrl !== '#') {
      window.open(card.videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section id="portfolio" className="glimpse-portfolio-section">
      <div className="glimpse-container">
        {/* Section Header */}
        <div className="glimpse-header">
          <div className="glimpse-badge-pill">
            <span className="badge-sparkle-dot" />
            <span className="badge-text">MY PORTFOLIO</span>
            <span className="badge-sparkle-dot" />
          </div>
          <h2 className="glimpse-title">
            A Glimpse Of <span className="glimpse-title-highlight">My Work</span>
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="glimpse-filter-pills-row">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`glimpse-pill-btn ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(tab);
                setIsExpanded(false); // reset expansion on filter change
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 5-Column Vertical Cards Grid (Rows of 5) */}
        <div className="glimpse-cards-grid">
          {displayedCards.map((item) => (
            <div
              key={item.id}
              className="glimpse-card-item"
              onClick={() => handleCardClick(item)}
            >
              <div className="glimpse-thumb-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="glimpse-thumb-img"
                  loading="lazy"
                />
                <div className="glimpse-play-overlay">
                  <div className="glimpse-play-circle">
                    <Play size={15} fill="#FFFFFF" color="#FFFFFF" className="glimpse-play-icon" />
                  </div>
                </div>
              </div>

              <div className="glimpse-card-meta">
                <h3 className="glimpse-card-title">{item.title}</h3>
                <span className="glimpse-card-subtitle">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Expand / Collapse Toggle Button */}
        {filteredCards.length > 5 && (
          <div className="glimpse-bottom-action">
            <button
              type="button"
              className="glimpse-view-more-btn"
              onClick={handleToggleExpand}
            >
              <span>{isExpanded ? 'Show Less Work' : 'View More Work'}</span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
