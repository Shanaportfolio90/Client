import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  Save,
  XCircle,
  Edit3,
  Trash2,
  ExternalLink,
  PlusCircle,
  CheckCircle,
} from 'lucide-react';
import { API_BASE_URL } from '../config';
import './AdminCollabsManager.css';

export default function AdminCollabsManager({ token, collabsList = [], setCollabsList }) {
  const [collabEditingId, setCollabEditingId] = useState(null);
  const [uploadingCollabImage, setUploadingCollabImage] = useState(false);
  const [publishingCollab, setPublishingCollab] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const [collabForm, setCollabForm] = useState({
    brandName: '',
    category: 'Skincare • Lifestyle',
    customCategory: '',
    title: '', // used for Work Details / Deliverables
    imageUrl: '',
    websiteUrl: '',
    description: '',
  });

  const categoryPresets = [
    'Skincare • Lifestyle',
    'Community • Lifestyle',
    'Haircare',
    'Fashion',
    'Food • Health',
    'Beauty • Personal Care',
    'Ethnic Fashion',
    'Tech & Digital',
    'Fitness & Wellness',
    'CUSTOM',
  ];

  // Image Upload to Cloudinary for Brand Logo
  const handleCollabImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Logo file size must be less than 10MB.');
      return;
    }

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
          setStatusMessage({ type: 'success', text: 'Logo uploaded successfully to Cloudinary!' });
        } else {
          alert(data.message || 'Image upload failed.');
        }
      } catch (err) {
        console.error('Collab logo upload error:', err);
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
    setStatusMessage({ type: '', text: '' });

    const finalCategory =
      collabForm.category === 'CUSTOM' ? collabForm.customCategory.trim() : collabForm.category;

    if (!collabForm.brandName.trim() || !finalCategory || !collabForm.title.trim() || !collabForm.imageUrl) {
      alert('Please fill in Brand Name, Category, Work Details, and provide a Brand Logo.');
      setPublishingCollab(false);
      return;
    }

    const payload = {
      brandName: collabForm.brandName.trim(),
      category: finalCategory,
      title: collabForm.title.trim(), // Work Details / Deliverables
      description: collabForm.description || '',
      websiteUrl: collabForm.websiteUrl.trim() || '#',
      displayUrl: collabForm.websiteUrl.trim() ? collabForm.websiteUrl.trim().replace(/^https?:\/\//, '') : '',
      imageUrl: collabForm.imageUrl,
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
      } catch (err) {
        console.error('Non-JSON response:', err);
      }

      if (res.ok && data.card) {
        if (collabEditingId) {
          setCollabsList(collabsList.map((item) => (item._id === collabEditingId ? data.card : item)));
          setStatusMessage({ type: 'success', text: `Collaboration "${data.card.brandName}" updated successfully!` });
        } else {
          setCollabsList([data.card, ...collabsList]);
          setStatusMessage({ type: 'success', text: `Collaboration "${data.card.brandName}" published live to Collab page!` });
        }
        resetCollabForm();
      } else {
        alert(data.message || 'Failed to save collaboration card.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Network error while saving collaboration card.');
    } finally {
      setPublishingCollab(false);
    }
  };

  const handleEditCollab = (item) => {
    setCollabEditingId(item._id);
    const isStandardCategory = categoryPresets.includes(item.category);
    setCollabForm({
      brandName: item.brandName || '',
      category: isStandardCategory ? item.category : 'CUSTOM',
      customCategory: isStandardCategory ? '' : item.category || '',
      title: item.title || '',
      description: item.description || '',
      websiteUrl: item.websiteUrl && item.websiteUrl !== '#' ? item.websiteUrl : '',
      imageUrl: item.imageUrl || '',
    });
    setStatusMessage({ type: 'info', text: `Editing "${item.brandName}" collaboration.` });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCollab = async (id, brandName) => {
    if (!window.confirm(`Are you sure you want to delete collaboration "${brandName || 'this brand'}"?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/collabs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setCollabsList(collabsList.filter((item) => item._id !== id));
        if (collabEditingId === id) resetCollabForm();
        setStatusMessage({ type: 'success', text: `Collaboration "${brandName}" deleted.` });
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete collaboration card.');
      }
    } catch (err) {
      console.error('Error deleting collab card:', err);
      alert('Network error while deleting.');
    }
  };

  const resetCollabForm = () => {
    setCollabEditingId(null);
    setCollabForm({
      brandName: '',
      category: 'Skincare • Lifestyle',
      customCategory: '',
      title: '',
      imageUrl: '',
      websiteUrl: '',
      description: '',
    });
  };

  const filteredCollabs = collabsList.filter((c) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      c.brandName?.toLowerCase().includes(q) ||
      c.category?.toLowerCase().includes(q) ||
      c.title?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="tab-content-area admin-collabs-container">
      {/* Form Card */}
      <div className="admin-media-form-card">
        <div className="card-header-bar">
          <div className="header-title-group">
            <Sparkles size={22} className="header-icon" />
            <div>
              <h2>{collabEditingId ? 'Edit Brand Collaboration' : 'Add New Brand Collaboration'}</h2>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#78716C' }}>
                Add brand logos, work deliverables, and details. Collaborations will publish directly to your live Collab page.
              </p>
            </div>
          </div>
          {collabEditingId && (
            <button type="button" className="cancel-edit-btn" onClick={resetCollabForm}>
              <XCircle size={14} />
              <span>Cancel Edit</span>
            </button>
          )}
        </div>

        {statusMessage.text && (
          <div
            style={{
              padding: '12px 18px',
              borderRadius: '12px',
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: statusMessage.type === 'success' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 159, 28, 0.12)',
              color: statusMessage.type === 'success' ? '#16A34A' : '#FF9F1C',
              border: `1px solid ${statusMessage.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 159, 28, 0.3)'}`,
            }}
          >
            <CheckCircle size={16} />
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleCollabSubmit} className="media-upload-form">
          <div className="form-grid-2">
            <div className="modal-form-group">
              <label>Brand Name *</label>
              <input
                type="text"
                placeholder="Ex. Dreabeai, Tandul Clothing, Nike..."
                value={collabForm.brandName}
                onChange={(e) => setCollabForm({ ...collabForm, brandName: e.target.value })}
                required
              />
            </div>

            <div className="modal-form-group">
              <label>Category / Niche *</label>
              <select
                value={collabForm.category}
                onChange={(e) => setCollabForm({ ...collabForm, category: e.target.value })}
                className="select-category-input"
                required
              >
                {categoryPresets.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'CUSTOM' ? '+ Custom Niche / Category' : cat}
                  </option>
                ))}
              </select>

              {collabForm.category === 'CUSTOM' && (
                <input
                  type="text"
                  placeholder="Enter custom category (e.g. Travel • Adventure)"
                  value={collabForm.customCategory}
                  onChange={(e) => setCollabForm({ ...collabForm, customCategory: e.target.value })}
                  style={{ marginTop: '10px' }}
                  required
                />
              )}
            </div>
          </div>

          <div className="form-grid-2">
            <div className="modal-form-group">
              <label>Work Details & Deliverables *</label>
              <input
                type="text"
                placeholder="Ex. Everyday Made Better • 2 reels • 2 stories"
                value={collabForm.title}
                onChange={(e) => setCollabForm({ ...collabForm, title: e.target.value })}
                required
              />
              <small style={{ color: '#78716C', fontSize: '11.5px', marginTop: '4px', display: 'block' }}>
                Shown on the deliverable badge pill on the card.
              </small>
            </div>

            <div className="modal-form-group">
              <label>Brand Website or Instagram Link (Optional)</label>
              <input
                type="text"
                placeholder="Ex. https://brandwebsite.com or @brandhandle"
                value={collabForm.websiteUrl}
                onChange={(e) => setCollabForm({ ...collabForm, websiteUrl: e.target.value })}
              />
            </div>
          </div>

          {/* Logo Upload Section */}
          <div className="modal-form-group full-width">
            <label>Brand Logo Image (PNG, JPG, WebP, AVIF | Max 10MB) *</label>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleCollabImageUpload}
                id="collab-logo-file-input"
                style={{ display: 'none' }}
              />
              <label
                htmlFor="collab-logo-file-input"
                className="upload-trigger-btn"
                style={{
                  cursor: 'pointer',
                  padding: '12px 20px',
                  backgroundColor: '#191412',
                  color: '#FF9F1C',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1.5px solid rgba(255, 159, 28, 0.4)',
                  fontWeight: '700',
                  fontSize: '14px',
                }}
              >
                {uploadingCollabImage ? <RefreshCw size={16} className="spin" /> : <Upload size={16} />}
                <span>{uploadingCollabImage ? 'Uploading Logo...' : 'Upload Brand Logo File'}</span>
              </label>

            </div>

            {/* Logo Preview */}
            {collabForm.imageUrl && (
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '14px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(255, 159, 28, 0.3)',
                  width: 'fit-content',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '14px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: '6px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <img
                    src={collabForm.imageUrl}
                    alt="Logo Preview"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#16A34A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={14} /> Logo Ready
                  </span>
                  <span style={{ fontSize: '12px', color: '#78716C', display: 'block', marginTop: '4px' }}>
                    Will display centered inside the collaboration card.
                  </span>
                  <button
                    type="button"
                    onClick={() => setCollabForm((prev) => ({ ...prev, imageUrl: '' }))}
                    style={{
                      marginTop: '6px',
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Trash2 size={12} /> Remove Logo
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="form-action-row" style={{ marginTop: '24px' }}>
            <button
              type="submit"
              className="publish-media-btn"
              disabled={publishingCollab || uploadingCollabImage}
              style={{
                backgroundColor: '#FF9F1C',
                color: '#191412',
                padding: '14px 28px',
                borderRadius: '9999px',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {publishingCollab ? (
                <RefreshCw size={18} className="spin" />
              ) : collabEditingId ? (
                <Save size={18} />
              ) : (
                <PlusCircle size={18} />
              )}
              <span>
                {publishingCollab
                  ? 'Saving Collaboration...'
                  : collabEditingId
                  ? 'Update Collaboration Card'
                  : 'Publish Collaboration Live'}
              </span>
            </button>

            {collabEditingId && (
              <button
                type="button"
                className="cancel-edit-secondary-btn"
                onClick={resetCollabForm}
                style={{
                  padding: '12px 20px',
                  borderRadius: '9999px',
                  border: '1px solid #78716C',
                  background: 'transparent',
                  color: '#78716C',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Published Collaborations List */}
      <div className="published-media-section" style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#191412' }}>
              Published Brand Collaborations ({collabsList.length})
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#78716C' }}>
              These brand cards render dynamically on the Collabs page alongside default partners.
            </p>
          </div>

          {collabsList.length > 3 && (
            <input
              type="text"
              placeholder="Search collaborations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontSize: '13px',
                minWidth: '220px',
              }}
            />
          )}
        </div>

        {collabsList.length === 0 ? (
          <div className="empty-state-box" style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px dashed rgba(255, 159, 28, 0.4)' }}>
            <Sparkles size={40} style={{ color: '#FF9F1C', margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '17px', fontWeight: '800', margin: '0 0 6px', color: '#191412' }}>No Custom Collaborations Added Yet</h4>
            <p style={{ fontSize: '14px', color: '#78716C', margin: 0 }}>
              Use the form above to add new brand collaborations. They will instantly appear on your live Collabs page!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredCollabs.map((item) => (
              <div
                key={item._id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: collabEditingId === item._id ? '2px solid #FF9F1C' : '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '12px',
                      backgroundColor: '#FAFAF8',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      padding: '4px',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.brandName}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 4px', color: '#191412', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.brandName}
                    </h4>
                    <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#78716C', display: 'block' }}>
                      {item.category}
                    </span>
                  </div>
                </div>

                {item.title && (
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 159, 28, 0.1)',
                      border: '1px solid rgba(255, 159, 28, 0.25)',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      color: '#D97706',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.title}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  {item.websiteUrl && item.websiteUrl !== '#' ? (
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '12px', color: '#FF9F1C', textDecoration: 'none', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>Visit</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span style={{ fontSize: '11.5px', color: '#A8A29E' }}>No external link</span>
                  )}

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleEditCollab(item)}
                      style={{
                        backgroundColor: 'rgba(255, 159, 28, 0.1)',
                        border: '1px solid rgba(255, 159, 28, 0.3)',
                        color: '#FF9F1C',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      title="Edit"
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCollab(item._id, item.brandName)}
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#EF4444',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      title="Delete"
                    >
                      <Trash2 size={13} /> Delete
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
