import React from 'react';
import './ToolsSection.css';

export default function ToolsSection() {
  const tools = [
    {
      name: 'Figma',
      percentage: '98%',
      progress: 98,
      bgColor: '#F2EBE4',
      icon: (
        <svg viewBox="0 0 38 57" width="24" height="24">
          <path d="M19 28.5c0-5.247 4.253-9.5 9.5-9.5s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5H19v-9.5z" fill="#FF7262" />
          <path d="M0 47.5C0 42.253 4.253 38 9.5 38H19v9.5c0 5.247-4.253 9.5-9.5 9.5S0 52.747 0 47.5z" fill="#0ACF83" />
          <path d="M19 0v19H9.5C4.253 19 0 14.747 0 9.5S4.253 0 9.5 0H19z" fill="#F24E1E" />
          <path d="M0 28.5C0 23.253 4.253 19 9.5 19H19v19H9.5C4.253 38 0 33.747 0 28.5z" fill="#A259FF" />
          <path d="M19 0h9.5c5.247 0 9.5 4.253 9.5 9.5s-4.253 9.5-9.5 9.5H19V0z" fill="#1ABCFE" />
        </svg>
      ),
    },
    {
      name: 'Sketch',
      percentage: '92%',
      progress: 92,
      bgColor: '#FBF5E6',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path d="M12 2L3 8L12 22L21 8L12 2Z" fill="#FDB300" />
          <path d="M12 2L3 8H21L12 2Z" fill="#EA6C00" />
          <path d="M12 22L7 8H17L12 22Z" fill="#FDD835" />
        </svg>
      ),
    },
    {
      name: 'Photoshop',
      percentage: '90%',
      progress: 90,
      bgColor: '#E6F0F8',
      icon: (
        <div className="ps-icon-box">
          <span>Ps</span>
        </div>
      ),
    },
    {
      name: 'Webflow',
      percentage: '98%',
      progress: 98,
      bgColor: '#EBF3FE',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#146EF5">
          <path d="M17.844 5.342l-5.612 13.316h-4.32L2.5 5.342h4.56l3.376 8.35 3.312-8.35h4.096z" />
        </svg>
      ),
    },
    {
      name: 'Storybook',
      percentage: '90%',
      progress: 90,
      bgColor: '#FDEBF2',
      icon: (
        <div className="storybook-icon-box">
          <span>S</span>
        </div>
      ),
    },
    {
      name: 'InVision',
      percentage: '95%',
      progress: 95,
      bgColor: '#FDEAEF',
      icon: (
        <div className="invision-icon-box">
          <span>in</span>
        </div>
      ),
    },
  ];

  return (
    <section id="tools" className="tools-section-container">
      <div className="tools-inner">
        {/* Section Header */}
        <div className="tools-header">
          <div className="tools-badge">
            <div className="badge-circles">
              <span className="circle-black" />
              <span className="circle-orange" />
            </div>
            <span className="badge-label">My Favorite Tools</span>
          </div>

          <h2 className="tools-title">
            <span className="highlight-text">Exploring the Tools</span>
            <span className="leaf-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#292524" />
                <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#292524" opacity="0.8" />
              </svg>
            </span>
            <br />
            Behind My Work
          </h2>
        </div>

        {/* Tools Cards Grid (3 Columns) */}
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <div key={index} className="tool-card">
              {/* Top Row: Icon + Name + Percentage Badge */}
              <div className="tool-card-content">
                <div className="tool-icon-wrapper" style={{ backgroundColor: tool.bgColor }}>
                  {tool.icon}
                </div>

                <h3 className="tool-name">{tool.name}</h3>

                <div className="tool-percentage-badge">{tool.percentage}</div>
              </div>

              {/* Bottom Progress Bar Line */}
              <div className="tool-progress-track">
                <div
                  className="tool-progress-fill"
                  style={{ width: `${tool.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
