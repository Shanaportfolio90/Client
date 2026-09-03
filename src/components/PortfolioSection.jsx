import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Sparkles, X } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './PortfolioSection.css';

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
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

  // The 5 featured creator reel cards using Snaha's authentic photos
  const defaultReels = [
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
  const allCards = [...defaultReels, ...formattedDbVideos.filter(dv => dv.image)];

  // Filter items based on active pill
  const filteredCards = allCards.filter((card) => {
    if (activeFilter === 'All') return true;
    return card.categories.some(
      (cat) => cat && cat.toLowerCase() === activeFilter.toLowerCase()
    );
  });

  const handleCardClick = (card) => {
    if (card.videoUrl && card.videoUrl !== '#') {
      window.open(card.videoUrl, '_blank', 'noopener,noreferrer');
    }
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
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 5-Column Vertical Cards Grid */}
        <div className="glimpse-cards-grid">
          {filteredCards.slice(0, 5).map((item) => (
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

        {/* Bottom Call to Action Button */}
        <div className="glimpse-bottom-action">
          <Link to="/collabs" className="glimpse-view-more-btn">
            <span>View More Work</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
