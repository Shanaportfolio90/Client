import React from 'react';
import './SkillTags.css';

export default function SkillTags() {
  return (
    <div className="skill-tags-container">
      {/* Row 1 */}
      <div className="tags-row row-1">
        <span className="tag-pill tag-black">Brand Collab</span>
        <span className="tag-pill tag-orange">Book Promotion</span>
      </div>

      {/* Row 2 */}
      <div className="tags-row row-2">
        <div className="spark-badge">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#191412" />
          </svg>
        </div>
        <span className="tag-pill tag-black">Shorts Series</span>
      </div>

      {/* Row 3 */}
      <div className="tags-row row-3">
        <span className="tag-pill tag-black">Reels & Content</span>
        <span className="tag-pill tag-orange">Campaign Strategy</span>
      </div>
    </div>
  );
}
