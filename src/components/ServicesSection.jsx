import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import './ServicesSection.css';

export default function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState(1); // Default card 02 expanded

  const services = [
    {
      id: '01.',
      title: 'Brand Collaborations',
      tags: [
        'Brand Deals & Endorsements',
        'Sponsored Reels & Posts',
        'Product Integration',
        'Long-term Ambassadorship',
      ],
      description:
        'Crafting authentic, high-converting brand integration campaigns that seamlessly resonate with highly engaged audiences.',
    },
    {
      id: '02.',
      title: 'Website & UI/UX Design',
      tags: [
        'Landing Page Design',
        'Responsive Website Design',
        'Wireframing & Prototyping',
        'Custom UI/UX Design',
      ],
      description:
        'Designing modern, user-friendly websites focused on seamless experiences, usability, and business growth.',
    },
    {
      id: '03.',
      title: 'Book Promotions & Reviews',
      tags: [
        'Bestseller Book Launches',
        'Author Interviews & Reviews',
        'Engaging Storytelling Shorts',
        'Dedicated Unboxing Videos',
      ],
      description:
        'Creating captivating book promotion series, creative storytelling reels, and dedicated reviews to boost reader engagement.',
    },
    {
      id: '04.',
      title: 'Shorts & Reels Series',
      tags: [
        'Episode-based Shorts',
        'Viral Reel Concepts',
        'Scriptwriting & Editing',
        'Multi-platform Distribution',
      ],
      description:
        'Launching episodic short-form video series designed for high retention, viral reach, and audience growth across YouTube & Instagram.',
    },
    {
      id: '05.',
      title: 'Campaign Strategy & Growth',
      tags: [
        'Content Strategy',
        'Audience Analytics',
        'Influencer Campaign Pitching',
        'Monetization Planning',
      ],
      description:
        'Strategic content planning and audience growth consulting to maximize brand impact, engagement metrics, and ROI.',
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="services-section-container">
      <div className="services-inner">
        {/* Section Header */}
        <div className="services-header">
          <div className="services-header-left">
            <div className="services-badge">
              <div className="badge-circles">
                <span className="circle-black" />
                <span className="circle-orange" />
              </div>
              <span className="badge-label">My Services</span>
            </div>
            <h2 className="services-title">
              How I Bring <span className="highlight-text">Ideas to Life</span>
              <span className="leaf-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#292524" />
                  <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#292524" opacity="0.8" />
                </svg>
              </span>
            </h2>
          </div>

          <a href="#all-services" className="view-all-services-btn">
            <span>View All Services</span>
            <div className="btn-arrow-circle">
              <ArrowRight size={14} />
            </div>
          </a>
        </div>

        {/* Services Accordion Cards List */}
        <div className="services-list">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={service.id}
                className={`service-card ${isExpanded ? 'expanded' : 'collapsed'}`}
                onClick={() => toggleExpand(index)}
              >
                {/* Card Top Row */}
                <div className="service-card-top">
                  <div className="service-id-wrapper">
                    <span className="service-id">{service.id}</span>
                    <span className="service-dotted-line" />
                  </div>

                  <h3 className="service-title">{service.title}</h3>

                  <div className="service-action-btn">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="service-card-expanded-body">
                    <div className="service-tags-grid">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="service-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="service-description">{service.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
