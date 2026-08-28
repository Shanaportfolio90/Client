import React from 'react';
import { ArrowRight } from 'lucide-react';
import b1Img from '../assets/blog-1.png';
import b2Img from '../assets/blog-2.png';
import b3Img from '../assets/blog-3.png';
import './BlogsSection.css';

export default function BlogsSection() {
  const blogs = [
    {
      id: 1,
      category: 'Brand Collab',
      title: 'The Magic Behind High-Converting Brand Campaigns: Secrets of Viral Engagement',
      author: 'Snaha Chakraborty',
      date: '05 June 2026',
      image: b1Img,
    },
    {
      id: 2,
      category: 'Book Promotion',
      title: 'From Concept to Clicks: The Art of Promoting Bestseller Novels via Short Video',
      author: 'Snaha Chakraborty',
      date: '04 June 2026',
      image: b2Img,
    },
    {
      id: 3,
      category: 'Shorts Series',
      title: 'The Art of Building Shorts Series & Content That Truly Connects With Audiences',
      author: 'Snaha Chakraborty',
      date: '03 June 2026',
      image: b3Img,
    },
  ];

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
              <span className="badge-label">Latest Blogs</span>
            </div>

            <h2 className="blogs-title">
              Insights from <span className="highlight-text">My Blogs</span>
              <span className="leaf-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#FFFFFF" />
                  <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#FFFFFF" opacity="0.8" />
                </svg>
              </span>
            </h2>
          </div>

          <a href="#all-blogs" className="view-all-blogs-btn">
            <span>View All Blogs</span>
            <div className="btn-arrow-circle">
              <ArrowRight size={14} />
            </div>
          </a>
        </div>

        {/* Blog Cards Grid (3 Columns) */}
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              {/* Image & Category Overlay */}
              <div className="blog-image-wrapper">
                <img src={blog.image} alt={blog.title} className="blog-thumbnail-img" />
                <span className="blog-category-badge">{blog.category}</span>
              </div>

              {/* Blog Content & Meta */}
              <div className="blog-card-content">
                <h3 className="blog-card-title">{blog.title}</h3>

                <div className="blog-meta-row">
                  <span className="meta-item">
                    <span className="meta-dot" />
                    {blog.author}
                  </span>
                  <span className="meta-item">
                    <span className="meta-dot" />
                    {blog.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
