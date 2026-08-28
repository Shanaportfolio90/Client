import React, { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import b1Img from '../assets/blog-1.png';
import b2Img from '../assets/blog-2.png';
import b3Img from '../assets/blog-3.png';
import './BlogsSection.css';

export default function BlogsSection() {
  const [liveMedia, setLiveMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultBlogs = [
    {
      _id: 'default-1',
      category: 'Brand Collab',
      title: 'The Magic Behind High-Converting Brand Campaigns: Secrets of Viral Engagement',
      author: 'Snaha Chakraborty',
      date: '05 June 2026',
      thumbnailUrl: b1Img,
      videoUrl: 'https://youtube.com',
    },
    {
      _id: 'default-2',
      category: 'Book Promotion',
      title: 'From Concept to Clicks: The Art of Promoting Bestseller Novels via Short Video',
      author: 'Snaha Chakraborty',
      date: '04 June 2026',
      thumbnailUrl: b2Img,
      videoUrl: 'https://instagram.com',
    },
    {
      _id: 'default-3',
      category: 'Shorts Series',
      title: 'The Art of Building Shorts Series & Content That Truly Connects With Audiences',
      author: 'Snaha Chakraborty',
      date: '03 June 2026',
      thumbnailUrl: b3Img,
      videoUrl: 'https://youtube.com',
    },
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/media')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLiveMedia(data);
        }
      })
      .catch((err) => console.warn('Using default media fallback:', err))
      .finally(() => setLoading(false));
  }, []);

  const displayList = liveMedia.length > 0 ? liveMedia : defaultBlogs;

  return (
    <section id="blogs" className="blogs-section-container">
      <div className="blogs-inner">
        {/* Section Header */}
        <div className="blogs-header">
          <div className="blogs-header-left">
            <div className="blogs-badge">
              <div className="badge-circles">
                <span className="circle-white" />
                <span className="circle-orange" />
              </div>
              <span className="badge-label">Featured Content</span>
            </div>

            <h2 className="blogs-title">
              Shorts, Reels & <span className="highlight-text">Videos</span>
              <span className="leaf-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#FFFFFF" />
                  <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#FFFFFF" opacity="0.8" />
                </svg>
              </span>
            </h2>
          </div>

          <a href="#contact" className="view-all-blogs-btn">
            <span>Explore All Work</span>
            <div className="btn-arrow-circle">
              <ArrowRight size={14} />
            </div>
          </a>
        </div>

        {/* Blog Cards Grid (3 Columns) */}
        <div className="blogs-grid">
          {displayList.map((item) => (
            <a
              key={item._id}
              href={item.videoUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="blog-card"
            >
              {/* Image & Category Overlay */}
              <div className="blog-image-wrapper">
                <img
                  src={item.thumbnailUrl || item.image}
                  alt={item.title}
                  className="blog-thumbnail-img"
                />
                <span className="blog-category-badge">{item.category}</span>
                <div className="play-icon-overlay">
                  <PlayCircle size={44} />
                </div>
              </div>

              {/* Blog Content & Meta */}
              <div className="blog-card-content">
                <h3 className="blog-card-title">{item.title}</h3>

                <div className="blog-meta-row">
                  <span className="meta-item">
                    <span className="meta-dot" />
                    {item.author || 'Snaha Chakraborty'}
                  </span>
                  <span className="meta-item">
                    <span className="meta-dot" />
                    {item.date || '2026'}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
