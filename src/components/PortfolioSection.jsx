import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import p1Img from '../assets/project-1-mockup.png';
import p2Img from '../assets/project-2-mockup.png';
import './PortfolioSection.css';

export default function PortfolioSection() {
  const projects = [
    {
      id: 1,
      title: 'Bakery Shop - Bakery Shop Mobile App Solution',
      description:
        'Modern bakery app for exploring fresh bakery products, easy ordering, seamless shopping, and fast doorstep delivery.',
      tags: ['UI/UX Design', 'App Design', 'Wireframe'],
      image: p1Img,
      layout: 'image-left',
    },
    {
      id: 2,
      title: 'Clothing Store - Clothing E Commerce Website',
      description:
        'Modern clothing store website for browsing fashion collections, seamless shopping, secure checkout, and smooth online purchasing experience.',
      tags: ['UI/UX Design', 'Web Design', 'Wireframe'],
      image: p2Img,
      layout: 'image-right',
    },
  ];

  return (
    <section id="portfolio" className="portfolio-section-container">
      <div className="portfolio-inner">
        {/* Section Header */}
        <div className="portfolio-header">
          <div className="portfolio-header-left">
            <div className="portfolio-badge">
              <div className="badge-circles">
                <span className="circle-white" />
                <span className="circle-orange" />
              </div>
              <span className="badge-label">My Portfolio</span>
            </div>

            <h2 className="portfolio-title">
              Let's Have a <span className="highlight-text">Look</span>
              <span className="leaf-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#FFFFFF" />
                  <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#FFFFFF" opacity="0.8" />
                </svg>
              </span>
              <br />
              <span className="highlight-text">at My Portfolio</span>
            </h2>
          </div>

          <a href="#all-projects" className="view-all-projects-btn">
            <span>View All Projects</span>
            <div className="btn-arrow-circle">
              <ArrowRight size={14} />
            </div>
          </a>
        </div>

        {/* Project Cards List */}
        <div className="projects-list">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.layout === 'image-left' ? 'layout-image-left' : 'layout-image-right'}`}
            >
              {/* Project Showcase Image */}
              <div className="project-image-column">
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-mockup-img" />
                </div>
              </div>

              {/* Project Details Info */}
              <div className="project-info-column">
                <div className="project-tags-row">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="project-title">{project.title}</h3>

                <p className="project-description">{project.description}</p>

                <a href="#project-detail" className="project-action-btn" aria-label="View project details">
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
