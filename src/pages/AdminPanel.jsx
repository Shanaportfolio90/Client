import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  LogOut,
  RefreshCw,
  Trash2,
  ExternalLink,
  Phone,
  Briefcase,
  DollarSign,
  Tag,
  Search,
  Filter,
  CheckCircle,
  Clock,
  MessageSquare,
  ArrowLeft,
  Video,
  Upload,
  Image as ImageIcon,
  PlusCircle,
  PlayCircle,
  Send,
  Zap,
  Film,
  Sparkles,
  Edit3,
  Save,
  XCircle
} from 'lucide-react';
import './AdminPanel.css';
import { API_BASE_URL } from '../config';


export default function AdminPanel() {
  const [token, setToken] = useState(localStorage.getItem('snaha_admin_token') || '');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [inquiries, setInquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const [activeTab, setActiveTab] = useState('media'); // 'media' | 'proposals' | 'contacts'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Media Form & Edit State
  const [editingId, setEditingId] = useState(null);
  const [mediaForm, setMediaForm] = useState({
    title: '',
    category: 'Brand Collab',
    videoUrl: '',
    description: '',
    thumbnailUrl: '',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [publishingMedia, setPublishingMedia] = useState(false);
  const [statusState, setStatusState] = useState({ message: '', type: 'info' }); // type: 'info' | 'success' | 'error' | 'edit'

  // Fetch Admin Data
  const fetchData = async (authToken = token) => {
    if (!authToken) return;
    setLoadingData(true);

    try {
      // Fetch Brand Proposals
      const reqInquiries = fetch(`${API_BASE_URL}/api/admin/inquiries`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Fetch Contact Messages
      const reqContacts = fetch(`${API_BASE_URL}/api/admin/contacts`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Fetch Media List
      const reqMedia = fetch(`${API_BASE_URL}/api/media`);

      const [resInquiries, resContacts, resMedia] = await Promise.all([
        reqInquiries,
        reqContacts,
        reqMedia,
      ]);

      if (resInquiries.status === 401 || resContacts.status === 401) {
        handleLogout();
        return;
      }

      if (resInquiries.ok) setInquiries(await resInquiries.json());
      if (resContacts.ok) setContacts(await resContacts.json());
      if (resMedia.ok) setMediaList(await resMedia.json());
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  // Login Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('snaha_admin_token', data.token);
        setToken(data.token);
        fetchData(data.token);
      } else {
        setLoginError(data.message || 'Invalid admin credentials');
      }
    } catch (err) {
      setLoginError('Unable to connect to server. Please check backend.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Pre-fill Admin Credentials
  const autofillCredentials = () => {
    setLoginEmail('connect.snaha@gmail.com');
    setLoginPassword('Snaha@00');
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('snaha_admin_token');
    setToken('');
    setInquiries([]);
    setContacts([]);
    setMediaList([]);
  };

  // Cloudinary Image File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setStatusState({ message: '', type: 'info' });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setMediaForm((prev) => ({ ...prev, thumbnailUrl: data.url }));
          setStatusState({ message: 'Thumbnail uploaded to Cloudinary!', type: 'success' });
        } else {
          setStatusState({ message: 'Failed to upload thumbnail image.', type: 'error' });
        }
      } catch (err) {
        console.error('Cloudinary Upload Error:', err);
        setStatusState({ message: 'Server error during Cloudinary upload.', type: 'error' });
      } finally {
        setUploadingImage(false);
      }
    };
  };

  // Populate Form for Editing an Existing Media Card
  const handleEditMedia = (item) => {
    setEditingId(item._id);
    setMediaForm({
      title: item.title,
      category: item.category,
      videoUrl: item.videoUrl,
      description: item.description || '',
      thumbnailUrl: item.thumbnailUrl,
      date: item.date || '',
    });
    setStatusState({ message: 'Edit mode active. Update fields below and save changes.', type: 'edit' });
    document.querySelector('.admin-media-form-card')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cancel Edit Mode
  const handleCancelEdit = () => {
    setEditingId(null);
    setMediaForm({
      title: '',
      category: 'Brand Collab',
      videoUrl: '',
      description: '',
      thumbnailUrl: '',
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
    setStatusState({ message: '', type: 'info' });
  };

  // Media Publish / Update Handler
  const handlePublishMedia = async (e) => {
    e.preventDefault();
    if (!mediaForm.thumbnailUrl) {
      alert('Please upload a thumbnail image or provide an image URL.');
      return;
    }

    setPublishingMedia(true);
    setStatusState({ message: '', type: 'info' });

    const isEdit = Boolean(editingId);
    const endpoint = isEdit
      ? `${API_BASE_URL}/api/admin/media/${editingId}`
      : `${API_BASE_URL}/api/admin/media`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mediaForm),
      });

      const data = await res.json();
      if (res.ok && data.media) {
        if (isEdit) {
          setMediaList(mediaList.map((m) => (m._id === editingId ? data.media : m)));
          setStatusState({ message: 'Video card updated successfully!', type: 'success' });
        } else {
          setMediaList([data.media, ...mediaList]);
          setStatusState({ message: 'New video card published to homepage!', type: 'success' });
        }

        setEditingId(null);
        setMediaForm({
          title: '',
          category: 'Brand Collab',
          videoUrl: '',
          description: '',
          thumbnailUrl: '',
          date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
        });
      } else {
        setStatusState({ message: data.message || 'Error processing request.', type: 'error' });
      }
    } catch (err) {
      console.error('Error saving media:', err);
      setStatusState({ message: 'Network error while saving media.', type: 'error' });
    } finally {
      setPublishingMedia(false);
    }
  };

  // Delete Media Handler
  const handleDeleteMedia = async (id) => {
    if (!window.confirm('Delete this video/media card?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMediaList(mediaList.filter((m) => m._id !== id));
        if (editingId === id) handleCancelEdit();
      }
    } catch (err) {
      console.error('Error deleting media:', err);
    }
  };

  // Status & Delete Handlers for Proposals & Contacts
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInquiries(
          inquiries.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this proposal response?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setInquiries(inquiries.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this contact message?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setContacts(contacts.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.brandName?.toLowerCase().includes(q) ||
      item.contactName?.toLowerCase().includes(q) ||
      item.contactEmail?.toLowerCase().includes(q) ||
      item.phoneNo?.includes(q) ||
      item.connectPurpose?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const totalProposals = inquiries.length;
  const newProposals = inquiries.filter((i) => i.status === 'New').length;
  const totalContacts = contacts.length;
  const totalMedia = mediaList.length;

  // ==========================================================================
  // UNAUTHENTICATED: LOGIN SCREEN
  // ==========================================================================
  if (!token) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="login-logo-header">
            <a href="/" className="back-site-link">
              <ArrowLeft size={16} /> Back to Website
            </a>
            <div className="admin-badge-circle">
              <Lock size={24} />
            </div>
            <h2>Snaha Admin Portal</h2>
            <p>Form Responses, Media & Proposal Management</p>
          </div>

          {loginError && <div className="login-error-banner">{loginError}</div>}

          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            <div className="input-group">
              <label>Admin Email ID</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  placeholder="connect.snaha@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Admin Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="admin-login-btn" disabled={loginLoading}>
              {loginLoading ? 'Signing in...' : 'Login to Admin Panel'}
            </button>

            <button type="button" className="autofill-btn" onClick={autofillCredentials}>
              <Zap size={14} /> Auto-fill Default Admin Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // AUTHENTICATED: ADMIN DASHBOARD
  // ==========================================================================
  return (
    <div className="admin-dashboard-container">
      {/* Top Header Navigation */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="header-left">
            <a href="/" className="admin-brand-logo">
              <span className="badge-dot" />
              <span>Snaha Portfolio Admin</span>
            </a>
            <span className="live-db-pill">MongoDB & Cloudinary Connected</span>
          </div>

          <div className="header-right">
            <button
              type="button"
              className="refresh-btn"
              onClick={() => fetchData(token)}
              disabled={loadingData}
              title="Refresh Data"
            >
              <RefreshCw size={16} className={loadingData ? 'spin' : ''} />
              <span>Refresh</span>
            </button>

            <div className="admin-user-tag">
              <Mail size={14} />
              <span>connect.snaha@gmail.com</span>
            </div>

            <button type="button" className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        <div className="dashboard-inner">
          {/* Dashboard Headline & Stats Overview */}
          <div className="dashboard-top-section">
            <div>
              <h1 className="dashboard-title">Media Manager & Database Panel</h1>
              <p className="dashboard-subtitle">
                Upload & Edit YouTube/Instagram video content with Cloudinary media thumbnails & manage live Brand Proposal form responses.
              </p>
            </div>

            {/* 4 Overview Stat Cards */}
            <div className="stats-overview-grid">
              <div className="stat-card">
                <div className="stat-icon-circle orange">
                  <Video size={20} />
                </div>
                <div>
                  <span className="stat-value">{totalMedia}</span>
                  <span className="stat-label">Uploaded Videos</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-circle yellow">
                  <Briefcase size={20} />
                </div>
                <div>
                  <span className="stat-value">{totalProposals}</span>
                  <span className="stat-label">Brand Proposals</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-circle green">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="stat-value">{newProposals}</span>
                  <span className="stat-label">New Proposals</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-circle blue">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <span className="stat-value">{totalContacts}</span>
                  <span className="stat-label">Contact Messages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="tab-navigation-bar">
            <div className="tabs-left">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
                onClick={() => setActiveTab('media')}
              >
                <Film size={18} />
                <span>Videos & Media Manager ({totalMedia})</span>
              </button>

              <button
                type="button"
                className={`tab-btn ${activeTab === 'proposals' ? 'active' : ''}`}
                onClick={() => setActiveTab('proposals')}
              >
                <Briefcase size={18} />
                <span>Brand Proposals ({totalProposals})</span>
              </button>

              <button
                type="button"
                className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
                onClick={() => setActiveTab('contacts')}
              >
                <MessageSquare size={18} />
                <span>Contact Messages ({totalContacts})</span>
              </button>
            </div>

            <a href="/" className="view-live-site-link" target="_blank" rel="noreferrer">
              <span>View Live Website</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* TAB 1: MEDIA & VIDEOS MANAGER (CLOUDINARY) */}
          {activeTab === 'media' && (
            <div className="tab-content-area">
              {/* Media Upload / Edit Form Box */}
              <div className={`admin-media-form-card ${editingId ? 'is-edit-mode' : ''}`}>
                <div className="form-card-header">
                  <div className="header-title-flex">
                    <h3>
                      {editingId ? <Edit3 size={20} /> : <PlusCircle size={20} />}
                      <span>{editingId ? 'Edit Video Content Card' : 'Add New YouTube / Instagram Video Content'}</span>
                    </h3>

                    {editingId && (
                      <button type="button" className="cancel-edit-btn" onClick={handleCancelEdit}>
                        <XCircle size={15} />
                        <span>Cancel Editing</span>
                      </button>
                    )}
                  </div>
                  <p>
                    {editingId
                      ? 'Modify the details below and click Update to save changes.'
                      : 'Upload a thumbnail to Cloudinary (cloud: c5d1k8xy) & link your YouTube or Instagram video.'}
                  </p>
                </div>

                {/* Animated Publishing Progress Banner */}
                {publishingMedia && (
                  <div className="publishing-progress-banner">
                    <div className="publishing-bar-track">
                      <div className="publishing-bar-fill animated-shimmer" />
                    </div>
                    <div className="publishing-status-row">
                      <RefreshCw size={16} className="spin" />
                      <span>
                        {editingId ? 'Saving video changes to database...' : 'Publishing video content live to website...'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Clean Status Banner with Lucide SVG Icons */}
                {statusState.message && (
                  <div className={`media-status-banner banner-${statusState.type}`}>
                    {statusState.type === 'edit' && <Edit3 size={16} />}
                    {statusState.type === 'success' && <CheckCircle size={16} />}
                    {statusState.type === 'error' && <XCircle size={16} />}
                    <span>{statusState.message}</span>
                  </div>
                )}

                <form onSubmit={handlePublishMedia} className="media-upload-form">
                  <div className="form-grid-2">
                    <div className="modal-form-group">
                      <label>Video Title *</label>
                      <input
                        type="text"
                        placeholder="Ex. The Magic Behind High-Converting Brand Campaigns"
                        value={mediaForm.title}
                        onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="modal-form-group">
                      <label>Category Tag *</label>
                      <select
                        value={mediaForm.category}
                        onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })}
                        className="select-category-input"
                        required
                      >
                        <option value="Brand Collab">Brand Collab</option>
                        <option value="Book Promotion">Book Promotion</option>
                        <option value="Shorts Series">Shorts Series</option>
                        <option value="Instagram Reel">Instagram Reel</option>
                        <option value="YouTube Video">YouTube Video</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="modal-form-group">
                      <label>YouTube / Instagram Video Link *</label>
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=... or Instagram reel URL"
                        value={mediaForm.videoUrl}
                        onChange={(e) => setMediaForm({ ...mediaForm, videoUrl: e.target.value })}
                        required
                      />
                    </div>

                    <div className="modal-form-group">
                      <label>Publication Date</label>
                      <input
                        type="text"
                        placeholder="Ex. 05 June 2026"
                        value={mediaForm.date}
                        onChange={(e) => setMediaForm({ ...mediaForm, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="modal-form-group full-width">
                    <label>Description</label>
                    <textarea
                      rows="3"
                      placeholder="Enter brief video summary or campaign highlights..."
                      value={mediaForm.description}
                      onChange={(e) => setMediaForm({ ...mediaForm, description: e.target.value })}
                    />
                  </div>

                  {/* Cloudinary Thumbnail Image Upload Section */}
                  <div className="thumbnail-upload-box">
                    <label className="section-group-label">Thumbnail Image (Cloudinary Upload) *</label>

                    {/* Animated Cloudinary Upload Progress Bar */}
                    {uploadingImage && (
                      <div className="upload-progress-overlay">
                        <div className="progress-bar-track">
                          <div className="progress-bar-fill animated-shimmer" />
                        </div>
                        <div className="upload-status-row">
                          <RefreshCw size={14} className="spin" />
                          <span>Uploading image file to Cloudinary CDN servers...</span>
                        </div>
                      </div>
                    )}

                    <div className="upload-options-grid">
                      {/* Left: Upload Button Zone */}
                      <div className="upload-zone-left">
                        <label className={`upload-file-btn ${uploadingImage ? 'is-uploading' : ''}`}>
                          {uploadingImage ? (
                            <RefreshCw size={18} className="spin" />
                          ) : (
                            <Upload size={18} />
                          )}
                          <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Choose Image File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={uploadingImage}
                          />
                        </label>
                        <span className="upload-hint">
                          PNG, JPG, WEBP • <strong>Recommended: 1280 × 720 px (16:9 ratio)</strong>
                        </span>
                      </div>

                      <div className="or-divider">
                        <span>OR</span>
                      </div>

                      {/* Right: Enter Image URL */}
                      <div className="upload-zone-right">
                        <label className="sublabel">Enter Direct Image URL</label>
                        <div className="url-input-with-icon">
                          <ImageIcon size={18} className="input-icon" />
                          <input
                            type="url"
                            placeholder="https://res.cloudinary.com/c5d1k8xy/..."
                            value={mediaForm.thumbnailUrl}
                            onChange={(e) => setMediaForm({ ...mediaForm, thumbnailUrl: e.target.value })}
                            className="dark-url-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Thumbnail Image Preview */}
                    {mediaForm.thumbnailUrl && (
                      <div className="thumbnail-preview-wrap">
                        <div className="preview-header">
                          <span className="preview-label">
                            <CheckCircle size={14} /> Cloudinary Thumbnail Ready
                          </span>
                        </div>
                        <img src={mediaForm.thumbnailUrl} alt="Thumbnail Preview" className="preview-img" />
                      </div>
                    )}
                  </div>

                  <div className="form-action-row">
                    <button
                      type="submit"
                      className={`publish-media-btn ${publishingMedia ? 'is-publishing' : ''}`}
                      disabled={publishingMedia || uploadingImage}
                    >
                      {publishingMedia ? (
                        <RefreshCw size={18} className="spin" />
                      ) : editingId ? (
                        <Save size={18} />
                      ) : (
                        <Send size={18} />
                      )}
                      <span>
                        {publishingMedia
                          ? editingId
                            ? 'Saving Changes...'
                            : 'Publishing to Website...'
                          : editingId
                          ? 'Update Video Content'
                          : 'Publish Video Content'}
                      </span>
                    </button>

                    {editingId && (
                      <button type="button" className="cancel-edit-secondary-btn" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Published Videos List */}
              <div className="published-media-section">
                <h3>Published Media Cards ({mediaList.length})</h3>
                {mediaList.length === 0 ? (
                  <div className="empty-state-box">
                    <Video size={40} />
                    <p>No video content published yet. Fill out the form above to add your first YouTube/Instagram video card!</p>
                  </div>
                ) : (
                  <div className="media-cards-grid">
                    {mediaList.map((item) => (
                      <div key={item._id} className={`admin-media-card ${editingId === item._id ? 'is-being-edited' : ''}`}>
                        <div className="card-thumb-container">
                          <img src={item.thumbnailUrl} alt={item.title} className="card-thumb-img" />
                          <span className="card-category-badge">{item.category}</span>
                          <a
                            href={item.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="play-overlay-btn"
                            title="Watch Video"
                          >
                            <PlayCircle size={36} />
                          </a>
                        </div>

                        <div className="card-body">
                          <h4 className="card-title">{item.title}</h4>
                          <p className="card-desc">{item.description}</p>

                          <div className="card-meta-row">
                            <span className="card-date">{item.date}</span>
                            <a href={item.videoUrl} target="_blank" rel="noreferrer" className="card-link">
                              Link <ExternalLink size={12} />
                            </a>
                          </div>

                          <div className="card-actions-row">
                            <button
                              type="button"
                              className="edit-media-btn"
                              onClick={() => handleEditMedia(item)}
                            >
                              <Edit3 size={14} /> Edit Card
                            </button>

                            <button
                              type="button"
                              className="delete-media-btn"
                              onClick={() => handleDeleteMedia(item._id)}
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
          )}

          {/* TAB 2: BRAND PROPOSALS */}
          {activeTab === 'proposals' && (
            <div className="tab-content-area">
              <div className="filters-control-bar">
                <div className="search-box">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by brand name, person, email, or purpose..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button type="button" className="clear-search" onClick={() => setSearchQuery('')}>
                      ×
                    </button>
                  )}
                </div>

                <div className="status-filter-pills">
                  <span className="filter-label">
                    <Filter size={14} /> Filter Status:
                  </span>
                  {['All', 'New', 'Pending', 'Reviewed', 'Contacted'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      className={`status-pill ${statusFilter === st ? 'active' : ''}`}
                      onClick={() => setStatusFilter(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {loadingData ? (
                <div className="loading-state">
                  <RefreshCw size={28} className="spin" />
                  <p>Loading responses from MongoDB Atlas...</p>
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="empty-state-box">
                  <Briefcase size={48} />
                  <h3>No Proposal Form Responses Found</h3>
                </div>
              ) : (
                <div className="proposals-list-grid">
                  {filteredInquiries.map((item) => (
                    <div key={item._id} className="proposal-response-card">
                      <div className="card-top-row">
                        <div className="brand-title-wrap">
                          <h3 className="brand-name">{item.brandName}</h3>
                          {item.brandWebsite && (
                            <a href={item.brandWebsite} target="_blank" rel="noreferrer" className="brand-website-link">
                              <span>{item.brandWebsite}</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>

                        <div className="status-dropdown-wrap">
                          <span className={`status-badge status-${item.status?.toLowerCase()}`}>
                            {item.status || 'New'}
                          </span>
                          <select
                            value={item.status || 'New'}
                            onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                            className="status-select-input"
                          >
                            <option value="New">Mark: New</option>
                            <option value="Pending">Mark: Pending</option>
                            <option value="Reviewed">Mark: Reviewed</option>
                            <option value="Contacted">Mark: Contacted</option>
                          </select>
                        </div>
                      </div>

                      <div className="card-info-grid">
                        <div className="info-cell">
                          <span className="cell-label">Contact Person</span>
                          <span className="cell-value bold">{item.contactName}</span>
                          <span className="cell-subvalue">{item.contactDesignation}</span>
                        </div>

                        <div className="info-cell">
                          <span className="cell-label">Mail ID & Phone</span>
                          <a href={`mailto:${item.contactEmail}`} className="cell-link">
                            <Mail size={13} /> {item.contactEmail}
                          </a>
                          <a href={`tel:${item.phoneNo}`} className="cell-link">
                            <Phone size={13} /> {item.phoneNo}
                          </a>
                        </div>

                        <div className="info-cell">
                          <span className="cell-label">Wanna Connect For</span>
                          <span className="purpose-tag">
                            <Tag size={13} /> {item.connectPurpose}
                          </span>
                        </div>

                        <div className="info-cell">
                          <span className="cell-label">Promotional Budget</span>
                          <span className="budget-tag">
                            <DollarSign size={13} /> {item.promotionalBudget}
                          </span>
                        </div>
                      </div>

                      <div className="card-footer-row">
                        <span className="timestamp-text">
                          <Clock size={14} /> Submitted on: {new Date(item.createdAt).toLocaleString()}
                        </span>

                        <button
                          type="button"
                          className="delete-card-btn"
                          onClick={() => handleDeleteInquiry(item._id)}
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GENERAL CONTACT MESSAGES */}
          {activeTab === 'contacts' && (
            <div className="tab-content-area">
              {loadingData ? (
                <div className="loading-state">
                  <RefreshCw size={28} className="spin" />
                  <p>Loading messages...</p>
                </div>
              ) : contacts.length === 0 ? (
                <div className="empty-state-box">
                  <MessageSquare size={48} />
                  <h3>No Contact Form Messages</h3>
                </div>
              ) : (
                <div className="contacts-table-wrapper">
                  <table className="contacts-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact Details</th>
                        <th>Interest</th>
                        <th>Budget & Country</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((c) => (
                        <tr key={c._id}>
                          <td className="bold">{c.name}</td>
                          <td>
                            <div>{c.email}</div>
                            <div className="subtext">{c.phone}</div>
                          </td>
                          <td>
                            <span className="table-tag">{c.interest}</span>
                          </td>
                          <td>
                            <div>{c.budget}</div>
                            <div className="subtext">{c.country}</div>
                          </td>
                          <td className="message-cell">{c.message}</td>
                          <td className="subtext">{new Date(c.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button
                              type="button"
                              className="delete-icon-btn"
                              onClick={() => handleDeleteContact(c._id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
