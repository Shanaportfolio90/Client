import React, { useState } from 'react';
import { Plus, Minus, MessageSquare } from 'lucide-react';
import './FaqSection.css';

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState(1); // Default Q2 expanded

  const faqs = [
    {
      question: 'What brand collaboration formats do you specialize in?',
      answer:
        'I specialize in sponsored reels, dedicated shorts series, product unboxings, long-term brand ambassadorships, and bestseller book promotion campaigns.',
    },
    {
      question: 'Do you offer book promotions and storytelling shorts?',
      answer:
        'Yes! I create engaging storytelling shorts, dedicated review videos, and multi-platform promotional campaigns to boost reader reach for authors & publishers.',
    },
    {
      question: 'What is your typical turnaround time for a campaign?',
      answer:
        'Turnaround typically ranges from 3 to 7 business days depending on script requirements, editing complexity, and approval schedules.',
    },
    {
      question: 'Do you work with startups, authors, and global brands?',
      answer:
        'Absolutely! I partner with startups, independent authors, e-commerce brands, and leading global businesses to craft tailored content.',
    },
    {
      question: 'How do custom brand quotes and retainers work?',
      answer:
        'We discuss your campaign objectives, deliverables, and timeline to prepare a personalized quote or a flexible monthly retainer plan.',
    },
    {
      question: 'What is your content creation and campaign process?',
      answer:
        'From initial concept brainstorming and scriptwriting to filming, post-production editing, and tracking audience engagement metrics.',
    },
  ];

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="faq-section-container">
      <div className="faq-inner">
        {/* Section Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <div className="badge-circles">
              <span className="circle-white" />
              <span className="circle-orange" />
            </div>
            <span className="badge-label">FAQs</span>
          </div>

          <h2 className="faq-title">
            Question? <span className="highlight-text">Look here.</span>
            <span className="leaf-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#FFFFFF" />
                <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#FFFFFF" opacity="0.8" />
              </svg>
            </span>
          </h2>
        </div>

        {/* Main Content Grid: Left Ask Away Box, Right Accordion */}
        <div className="faq-grid">
          {/* Left Ask Away Card */}
          <div className="faq-ask-card">
            <div className="ask-card-icon-wrapper">
              <div className="chat-bubble-icon">
                <MessageSquare size={36} fill="#FF9F1C" color="#191412" />
              </div>
            </div>

            <h3 className="ask-card-title">
              You have different<br />questions? <span>Ask Away!</span>
            </h3>

            <p className="ask-card-subtext">
              Your Questions, My Answers.<br />Quick Responses Guaranteed.
            </p>

            <a href="#contact" className="ask-contact-btn">
              Contact Me
            </a>
          </div>

          {/* Right Accordion List */}
          <div className="faq-accordion-list">
            {faqs.map((faq, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <div
                  key={index}
                  className={`faq-item ${isExpanded ? 'expanded' : 'collapsed'}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-item-header">
                    <h3 className="faq-question">{faq.question}</h3>
                    <div className="faq-toggle-icon">
                      {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="faq-item-body">
                      <p className="faq-answer">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
