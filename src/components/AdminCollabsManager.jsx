import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  PlusCircle,
  Save,
  XCircle,
  Edit3,
  Trash2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { API_BASE_URL } from '../config';
import './AdminCollabsManager.css';

export default function AdminCollabsManager({ token, collabsList, setCollabsList }) {
  const [collabEditingId, setCollabEditingId] = useState(null);
  const [uploadingCollabImage, setUploadingCollabImage] = useState(false);
  const [publishingCollab, setPublishingCollab] = useState(false);

  const [collabForm, setCollabForm] = useState({
    brandName: '',
    category: 'Tech & Web',
    customCategory: '',
    title: '',
    description: '',
    websiteUrl: '',
    displayUrl: '',
    ctaButtonText: '',
    hasActionCta: false,
    actionCtaTitle: '',
    actionCtaSubtitle: '',
    actionCtaBtnText: '',
    actionCtaLink: '',
    imageUrl: '',
    tags: '',
  });

  // Image Upload to Cloudinary for Collabs
  const handleCollabImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingCollabImage(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64Data = reader.result;
        const res = await fetch(`${API_BASE_URL}/api/admin/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: base64Data }),
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setCollabForm((prev) => ({ ...prev, imageUrl: data.url }));
        } else {
          alert(data.message || 'Image upload failed.');
        }
      } catch (err) {
        console.error('Collab image upload error:', err);
        alert('Image upload failed. Please try again.');
      } finally {
        setUploadingCollabImage(false);
      }
    };

    reader.readAsDataURL(file);
  };

  // Create or Update Collab Card Submit
  const handleCollabSubmit = async (e) => {
    e.preventDefault();
    setPublishingCollab(true);

    const finalCategory =
      collabForm.category === 'CUSTOM' ? collabForm.customCategory : collabForm.category;

    if (!collabForm.brandName || !finalCategory || !collabForm.title || !collabForm.imageUrl) {
      alert('Please fill in Brand Name, Category, Title, and Upload Image.');
      setPublishingCollab(false);
      return;
    }

    const payload = {
      brandName: collabForm.brandName,
      category: finalCategory,
      title: collabForm.title,
      description: collabForm.description,
      websiteUrl: collabForm.websiteUrl || '#',
      displayUrl: collabForm.displayUrl || '',
      ctaButtonText: collabForm.ctaButtonText || '',
      hasActionCta: Boolean(collabForm.hasActionCta),
      actionCtaTitle: collabForm.actionCtaTitle || '',
      actionCtaSubtitle: collabForm.actionCtaSubtitle || '',
      actionCtaBtnText: collabForm.actionCtaBtnText || '',
      actionCtaLink: collabForm.actionCtaLink || '',
      imageUrl: collabForm.imageUrl,
      tags: collabForm.tags
        ? collabForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };

    try {
      const url = collabEditingId
        ? `${API_BASE_URL}/api/admin/collabs/${collabEditingId}`
        : `${API_BASE_URL}/api/admin/collabs`;
      const method = collabEditingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        console.error('Non-JSON response:', e);
      }

      if (res.ok && data.card) {
        if (collabEditingId) {
          setCollabsList(collabsList.map((item) => (item._id === collabEditingId ? data.card : item)));
        } else {
          setCollabsList([data.card, ...collabsList]);
        }
        resetCollabForm();
        alert(collabEditingId ? 'Collab card updated!' : 'Collab card added!');
      } else {
        alert(data.message || `Failed to save collab card (Server status: ${res.status}).`);
      }
    } catch (err) {
      console.error('Error saving collab card:', err);
      alert('Network / Server error while saving collab card.');
    } finally {
      setPublishingCollab(false);
    }
  };

  const handleEditCollab = (item) => {
    setCollabEditingId(item._id);
    setCollabForm({
      brandName: item.brandName || '',
      category: item.category || 'Tech & Web',
      customCategory: '',
      title: item.title || '',
      description: item.description || '',
      websiteUrl: item.websiteUrl || '',
      displayUrl: item.displayUrl || '',
      ctaButtonText: item.ctaButtonText || '',
      hasActionCta: Boolean(item.hasActionCta),
      actionCtaTitle: item.actionCtaTitle || '',
      actionCtaSubtitle: item.actionCtaSubtitle || '',
      actionCtaBtnText: item.actionCtaBtnText || '',
      actionCtaLink: item.actionCtaLink || '',
      imageUrl: item.imageUrl || '',
      tags: item.tags ? item.tags.join(', ') : '',
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteCollab = async (id) => {
    if (!window.confirm('Are you sure you want to delete this brand card?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/collabs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setCollabsList(collabsList.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error('Error deleting collab card:', err);
    }
  };

  const resetCollabForm = () => {
    setCollabEditingId(null);
    setCollabForm({
      brandName: '',
      category: 'Tech & Web',
      customCategory: '',
      title: '',
      description: '',
      websiteUrl: '',
      displayUrl: '',
      ctaButtonText: '',
      hasActionCta: false,
      actionCtaTitle: '',
      actionCtaSubtitle: '',
      actionCtaBtnText: '',
      actionCtaLink: '',
      imageUrl: '',
      tags: '',
    });
  };

  return (
    <div className="collabs-manager-container">
      {/* Collab Card Form Box */}
      <div className={`collab-form-card ${collabEditingId ? 'is-edit-mode' : ''}`}>
        <div className="collab-form-header">
          <div className="collab-header-icon-badge">
            <Sparkles size={24} />
          </div>
          <div className="collab-header-text">
            <h2>{collabEditingId ? 'Edit Brand Collab Card' : 'Add New Collab / Brand Showcase Card'}</h2>
            <p>
              {collabEditingId
                ? 'Update details for this brand collaboration card'
                : 'Create a new brand card to display on the live Collabs page'}
            </p>
          </div>
          {collabEditingId && (
            <button type="button" className="collab-cancel-edit-btn" onClick={resetCollabForm}>
              <XCircle size={16} /> Cancel Editing
            </button>
          )}
        </div>

        <form onSubmit={handleCollabSubmit} className="collab-form-body">
          <div className="collab-form-grid">
            {/* Brand Name */}
            <div className="collab-input-group">
              <label>
                Brand Name <span className="req">*</span>
              </label>
              <input
                type="text"
                className="collab-text-input"
                placeholder="e.g. GenWeb Tech, Lekhok Tripura, YamKitch"
                value={collabForm.brandName}
                onChange={(e) => setCollabForm({ ...collabForm, brandName: e.target.value })}
                required
              />
            </div>

            {/* Category Selection & Custom Category */}
            <div className="collab-input-group">
              <label>
                Category <span className="req">*</span>
              </label>
              <select
                className="collab-select-input"
                value={collabForm.category}
                onChange={(e) => setCollabForm({ ...collabForm, category: e.target.value })}
              >
                <option value="Tech & Web">Tech & Web</option>
                <option value="Book Publishers">Book Publishers</option>
                <option value="Shorts & Reels">Shorts & Reels</option>
                <option value="Brand Collab">Brand Collab</option>
                <option value="CUSTOM">+ Add New Custom Category...</option>
              </select>
            </div>

            {collabForm.category === 'CUSTOM' && (
              <div className="collab-input-group full-width">
                <label>
                  Enter Custom Category Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className="collab-text-input"
                  placeholder="e.g. E-Commerce, Food Tech, Fashion & Beauty"
                  value={collabForm.customCategory}
                  onChange={(e) => setCollabForm({ ...collabForm, customCategory: e.target.value })}
                  required
                />
              </div>
            )}

            {/* Project Title */}
            <div className="collab-input-group full-width">
              <label>
                Card Title / Headline <span className="req">*</span>
              </label>
              <input
                type="text"
                className="collab-text-input"
                placeholder="e.g. YamKitch - Food Tech & Digital Web Solution"
                value={collabForm.title}
                onChange={(e) => setCollabForm({ ...collabForm, title: e.target.value })}
                required
              />
            </div>

            {/* Website URL & Display Link */}
            <div className="collab-input-group">
              <label>Website / Project Link</label>
              <input
                type="text"
                className="collab-text-input"
                placeholder="https://www.yamkitch.in/"
                value={collabForm.websiteUrl}
                onChange={(e) => setCollabForm({ ...collabForm, websiteUrl: e.target.value })}
              />
            </div>

            <div className="collab-input-group">
              <label>Display Link Text</label>
              <input
                type="text"
                className="collab-text-input"
                placeholder="yamkitch.in"
                value={collabForm.displayUrl}
                onChange={(e) => setCollabForm({ ...collabForm, displayUrl: e.target.value })}
              />
            </div>

            {/* Custom CTA Button Label */}
            <div className="collab-input-group full-width">
              <label>Custom Dark Pill Button Text (Optional)</label>
              <input
                type="text"
                className="collab-text-input"
                placeholder="e.g. Explore Publications: lekhoktripura.in or Explore Web App: yamkitch.in"
                value={collabForm.ctaButtonText}
                onChange={(e) => setCollabForm({ ...collabForm, ctaButtonText: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="collab-input-group full-width">
              <label>Description / Overview</label>
              <textarea
                className="collab-textarea-input"
                placeholder="Write a brief overview of the project or brand collaboration..."
                rows="3"
                value={collabForm.description}
                onChange={(e) => setCollabForm({ ...collabForm, description: e.target.value })}
              />
            </div>

            {/* Tags */}
            <div className="collab-input-group full-width">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                className="collab-text-input"
                placeholder="UI/UX Design, Responsive Web, GenWeb Tech"
                value={collabForm.tags}
                onChange={(e) => setCollabForm({ ...collabForm, tags: e.target.value })}
              />
            </div>

            {/* Special Action CTA Banner Builder Box */}
            <div className="collab-input-group full-width collab-cta-builder-box">
              <label className="collab-checkbox-label">
                <input
                  type="checkbox"
                  checked={collabForm.hasActionCta}
                  onChange={(e) => setCollabForm({ ...collabForm, hasActionCta: e.target.checked })}
                />
                <span>+ Add Bottom Action CTA Banner Box (WhatsApp / Lead Box)</span>
              </label>

              {collabForm.hasActionCta && (
                <div className="collab-action-cta-fields">
                  <div className="collab-input-group">
                    <label>Action Banner Headline / Question</label>
                    <input
                      type="text"
                      className="collab-text-input"
                      placeholder="e.g. Are you an author or publisher?"
                      value={collabForm.actionCtaTitle}
                      onChange={(e) => setCollabForm({ ...collabForm, actionCtaTitle: e.target.value })}
                    />
                  </div>

                  <div className="collab-input-group">
                    <label>Action Subtitle / Subtext</label>
                    <input
                      type="text"
                      className="collab-text-input"
                      placeholder="e.g. Promote & launch your book into a bestseller campaign."
                      value={collabForm.actionCtaSubtitle}
                      onChange={(e) => setCollabForm({ ...collabForm, actionCtaSubtitle: e.target.value })}
                    />
                  </div>

                  <div className="collab-input-group">
                    <label>Orange CTA Button Label</label>
                    <input
                      type="text"
                      className="collab-text-input"
                      placeholder="e.g. Promote Your Book Now or Get a Professional Website"
                      value={collabForm.actionCtaBtnText}
                      onChange={(e) => setCollabForm({ ...collabForm, actionCtaBtnText: e.target.value })}
                    />
                  </div>

                  <div className="collab-input-group">
                    <label>WhatsApp Number or Action URL</label>
                    <input
                      type="text"
                      className="collab-text-input"
                      placeholder="e.g. 8258892262 or https://wa.me/918258892262?text=..."
                      value={collabForm.actionCtaLink}
                      onChange={(e) => setCollabForm({ ...collabForm, actionCtaLink: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Card Image Upload (Cloudinary) */}
            <div className="collab-input-group full-width">
              <label>
                Card Showcase Image <span className="req">*</span>
              </label>

              <div className="collab-upload-box">
                <div className="collab-upload-grid">
                  <div className="upload-zone-left">
                    <label className="collab-upload-file-btn">
                      {uploadingCollabImage ? (
                        <RefreshCw size={18} className="spin" />
                      ) : (
                        <Upload size={18} />
                      )}
                      <span>{uploadingCollabImage ? 'Uploading...' : 'Choose Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCollabImageUpload}
                        disabled={uploadingCollabImage}
                      />
                    </label>
                    <span className="collab-upload-hint">PNG, JPG, WEBP • Recommended resolution 16:9</span>
                  </div>

                  <div className="collab-or-divider">
                    <span>OR</span>
                  </div>

                  <div className="upload-zone-right">
                    <label className="sublabel">Enter Direct Image URL</label>
                    <div className="collab-url-input-wrap">
                      <ImageIcon size={18} className="collab-url-icon" />
                      <input
                        type="url"
                        placeholder="https://res.cloudinary.com/..."
                        value={collabForm.imageUrl}
                        onChange={(e) => setCollabForm({ ...collabForm, imageUrl: e.target.value })}
                        className="collab-text-input collab-url-input"
                      />
                    </div>
                  </div>
                </div>

                {collabForm.imageUrl && (
                  <div className="collab-preview-wrap">
                    <span className="collab-preview-label">Card Image Preview:</span>
                    <div className="collab-img-preview-card">
                      <img src={collabForm.imageUrl} alt="Card Preview" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="collab-submit-row">
            <button
              type="submit"
              className="collab-primary-submit-btn"
              disabled={publishingCollab || uploadingCollabImage}
            >
              {publishingCollab ? (
                <>
                  <RefreshCw size={18} className="spin" />
                  <span>{collabEditingId ? 'Updating...' : 'Publishing...'}</span>
                </>
              ) : (
                <>
                  {collabEditingId ? <Save size={18} /> : <PlusCircle size={18} />}
                  <span>{collabEditingId ? 'Update Collab Card' : 'Publish Brand Card'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Published Collab Cards List Grid */}
      <div className="collab-list-section">
        <h3 className="collab-list-title">
          <Sparkles size={20} style={{ color: '#FF9F1C' }} />
          <span>Live Brand Collaboration Cards ({collabsList.length})</span>
        </h3>

        {collabsList.length === 0 ? (
          <div className="empty-state-box">
            <Sparkles size={40} />
            <p>No custom brand cards added yet. Create your first card above to showcase it live on the Collabs page!</p>
          </div>
        ) : (
          <div className="collab-cards-grid">
            {collabsList.map((item) => (
              <div
                key={item._id}
                className={`collab-admin-card ${collabEditingId === item._id ? 'is-being-edited' : ''}`}
              >
                <div className="collab-card-media">
                  <img src={item.imageUrl} alt={item.title} />
                  <span className="collab-card-category-tag">{item.category}</span>
                </div>

                <div className="collab-card-content">
                  <span className="collab-card-brand">{item.brandName}</span>
                  <h4 className="collab-card-headline">{item.title}</h4>
                  <p className="collab-card-description">{item.description}</p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="collab-card-tags">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="collab-card-tag-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="collab-card-actions">
                    <button
                      type="button"
                      className="collab-card-edit-btn"
                      onClick={() => handleEditCollab(item)}
                    >
                      <Edit3 size={14} /> Edit
                    </button>

                    <button
                      type="button"
                      className="collab-card-delete-btn"
                      onClick={() => handleDeleteCollab(item._id)}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
