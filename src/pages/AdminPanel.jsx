import React, { useState, useEffect, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
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
  XCircle,
  BookOpen,
  Menu,
  ChevronLeft,
  ChevronRight,
  Star,
  Pin,
  FileText
} from 'lucide-react';
import './AdminPanel.css';
import { API_BASE_URL } from '../config';
import AdminCollabsManager from '../components/AdminCollabsManager';


export default function AdminPanel() {
  const [token, setToken] = useState(localStorage.getItem('snaha_admin_token') || '');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [inquiries, setInquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [collabsList, setCollabsList] = useState([]);
  const [blogsList, setBlogsList] = useState([]);
  const [adsList, setAdsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([
    { _id: 'cat-1', name: 'Brand Collab' },
    { _id: 'cat-2', name: 'Book Promotion' },
    { _id: 'cat-3', name: 'Shorts Series' },
    { _id: 'cat-4', name: 'Strategy & Tips' },
  ]);
  const [newCatInput, setNewCatInput] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [showCatManager, setShowCatManager] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' | 'media' | 'collabs' | 'proposals' | 'contacts'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Blog Form & Jodit Editor State
  const [blogEditingId, setBlogEditingId] = useState(null);
  const [publishingBlog, setPublishingBlog] = useState(false);
  const [uploadingBlogCover, setUploadingBlogCover] = useState(false);
  const blogEditorRef = useRef(null);

  const joditConfig = useMemo(() => ({
    readonly: false,
    height: 400,
    placeholder: 'Write or paste (Ctrl+V) your rich blog post here with headings, formatting, lists, quotes...',
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_clear_html',
    processPasteHTML: true,
    theme: 'default',
    uploader: {
      url: `${API_BASE_URL}/api/admin/upload-jodit`,
      format: 'json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      isSuccess: (resp) => resp && resp.success,
      process: (resp) => ({
        files: resp.files || [],
        path: '',
        baseurl: '',
        error: resp.error || null,
        msg: resp.msg || '',
      }),
      defaultHandlerSuccess: function (data) {
        const files = data.files || [data.url];
        if (files && files.length) {
          for (let i = 0; i < files.length; i++) {
            this.selection.insertImage(files[i]);
          }
        }
      },
    },
    events: {
      afterInsertImage: function (img) {
        if (img && img.src && (img.src.startsWith('blob:') || img.src.startsWith('data:image'))) {
          fetch(img.src)
            .then((res) => res.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                fetch(`${API_BASE_URL}/api/admin/upload`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ image: reader.result }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data && data.url) {
                      img.src = data.url;
                    }
                  })
                  .catch((err) => console.error('Cloudinary auto upload error:', err));
              };
            });
        }
      },
    },
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', 'indent', 'outdent', '|',
      'font', 'fontsize', 'paragraph', '|',
      'image', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'fullsize'
    ],
    controls: {
      ul: {
        command: 'insertUnorderedList',
        tags: ['ul'],
        tooltip: 'Insert Bullet List'
      },
      ol: {
        command: 'insertOrderedList',
        tags: ['ol'],
        tooltip: 'Insert Numbered List'
      }
    }
  }), [token]);

  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Brand Collab',
    summary: '',
    content: '',
    coverImage: '',
    author: 'Snaha Chakraborty',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    readTime: '5 min read',
    heroPosition: 'normal',
    videoUrl: '',
  });

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

  // Collabs Form & Edit State
  const [collabEditingId, setCollabEditingId] = useState(null);
  const [collabForm, setCollabForm] = useState({
    brandName: '',
    category: 'Tech & Web',
    customCategory: '',
    title: '',
    description: '',
    websiteUrl: '',
    displayUrl: '',
    imageUrl: '',
    tags: '',
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCollabImage, setUploadingCollabImage] = useState(false);
  const [publishingMedia, setPublishingMedia] = useState(false);
  const [publishingCollab, setPublishingCollab] = useState(false);
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

      // Fetch Collabs List
      const reqCollabs = fetch(`${API_BASE_URL}/api/collabs`);

      // Fetch Blogs List
      const reqBlogs = fetch(`${API_BASE_URL}/api/blogs`);

      // Fetch Categories List
      const reqCategories = fetch(`${API_BASE_URL}/api/categories`);

      // Fetch Ads List
      const reqAds = fetch(`${API_BASE_URL}/api/admin/ads`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const [resInquiries, resContacts, resMedia, resCollabs, resBlogs, resCategories, resAds] = await Promise.all([
        reqInquiries,
        reqContacts,
        reqMedia,
        reqCollabs,
        reqBlogs,
        reqCategories,
        reqAds,
      ]);

      if (resInquiries.status === 401 || resContacts.status === 401) {
        handleLogout();
        return;
      }

      if (resInquiries.ok) setInquiries(await resInquiries.json());
      if (resContacts.ok) setContacts(await resContacts.json());
      if (resMedia.ok) setMediaList(await resMedia.json());
      if (resCollabs.ok) setCollabsList(await resCollabs.json());
      if (resBlogs.ok) setBlogsList(await resBlogs.json());
      if (resAds.ok) setAdsList(await resAds.json());
      if (resCategories.ok) {
        const catsData = await resCategories.json();
        if (Array.isArray(catsData) && catsData.length > 0) {
          setCategoriesList(catsData);
        }
      }
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

  const [videoUploadProgress, setVideoUploadProgress] = useState({
    uploading: false,
    target: null,
    loadedMB: '0.0',
    totalMB: '0.0',
    percent: 0,
  });

  const handleMediaVideoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      alert('Video file size exceeds Cloudinary limit of 100MB. Please select a video < 100MB or paste a YouTube/Instagram link.');
      return;
    }

    const fileMB = (file.size / (1024 * 1024)).toFixed(1);
    setVideoUploadProgress({
      uploading: true,
      target: 'media',
      loadedMB: '0.0',
      totalMB: fileMB,
      percent: 0,
    });

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/api/admin/upload-video`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const loadedMB = (event.loaded / (1024 * 1024)).toFixed(1);
        const totalMB = (event.total / (1024 * 1024)).toFixed(1);
        const percent = Math.min(99, Math.round((event.loaded / event.total) * 100));
        setVideoUploadProgress({
          uploading: true,
          target: 'media',
          loadedMB,
          totalMB,
          percent,
        });
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.url) {
            setMediaForm((prev) => ({ ...prev, videoUrl: data.url }));
            setStatusState({
              message: `✓ Video (${fileMB} MB) uploaded successfully to Cloudinary!`,
              type: 'success',
            });
          }
        } catch (err) {
          console.error('Parse error:', err);
        }
      } else {
        alert('Video upload failed. Status: ' + xhr.status);
      }
      setVideoUploadProgress({ uploading: false, target: null, loadedMB: '0.0', totalMB: '0.0', percent: 0 });
    };

    xhr.onerror = () => {
      alert('Network error during video upload');
      setVideoUploadProgress({ uploading: false, target: null, loadedMB: '0.0', totalMB: '0.0', percent: 0 });
    };

    xhr.send(formData);
  };

  const handleBlogVideoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      alert('Video file size exceeds Cloudinary limit of 100MB. Please select a video < 100MB or paste a YouTube link.');
      return;
    }

    const fileMB = (file.size / (1024 * 1024)).toFixed(1);
    setVideoUploadProgress({
      uploading: true,
      target: 'blog',
      loadedMB: '0.0',
      totalMB: fileMB,
      percent: 0,
    });

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/api/admin/upload-video`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const loadedMB = (event.loaded / (1024 * 1024)).toFixed(1);
        const totalMB = (event.total / (1024 * 1024)).toFixed(1);
        const percent = Math.min(99, Math.round((event.loaded / event.total) * 100));
        setVideoUploadProgress({
          uploading: true,
          target: 'blog',
          loadedMB,
          totalMB,
          percent,
        });
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.url) {
            setBlogForm((prev) => ({ ...prev, videoUrl: data.url }));
          }
        } catch (err) {
          console.error('Parse error:', err);
        }
      } else {
        alert('Video upload failed. Status: ' + xhr.status);
      }
      setVideoUploadProgress({ uploading: false, target: null, loadedMB: '0.0', totalMB: '0.0', percent: 0 });
    };

    xhr.onerror = () => {
      alert('Network error during video upload');
      setVideoUploadProgress({ uploading: false, target: null, loadedMB: '0.0', totalMB: '0.0', percent: 0 });
    };

    xhr.send(formData);
  };

  // Blog Handlers
  const handleBlogCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Cover image size must be less than 10MB.');
      return;
    }

    setUploadingBlogCover(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await res.json();
        if (res.ok) {
          setBlogForm((prev) => ({ ...prev, coverImage: data.url }));
        } else {
          alert(data.message || 'Image upload failed.');
        }
      } catch (err) {
        console.error('Blog cover image upload error:', err);
        alert('Failed to upload image to Cloudinary.');
      } finally {
        setUploadingBlogCover(false);
      }
    };
  };

  const [uploadingInlineImage, setUploadingInlineImage] = useState(false);

  const handleInlineImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB.');
      return;
    }

    setUploadingInlineImage(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await res.json();
        if (res.ok && data.url) {
          const imgHtml = `<p><img src="${data.url}" alt="Article Image" style="max-width: 100%; border-radius: 12px; margin: 16px 0;" /></p>`;
          if (blogEditorRef.current && blogEditorRef.current.editor) {
            blogEditorRef.current.editor.selection.insertHTML(imgHtml);
          } else {
            setBlogForm((prev) => ({ ...prev, content: prev.content + imgHtml }));
          }
        } else {
          alert(data.message || 'Image upload failed.');
        }
      } catch (err) {
        console.error('Inline image upload error:', err);
        alert('Failed to upload image to Cloudinary.');
      } finally {
        setUploadingInlineImage(false);
      }
    };
  };

  const handlePublishBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.coverImage || !blogForm.content) {
      alert('Please fill in Title, Cover Image, and Content.');
      return;
    }

    setPublishingBlog(true);
    const isEdit = Boolean(blogEditingId);
    const endpoint = isEdit
      ? `${API_BASE_URL}/api/admin/blogs/${blogEditingId}`
      : `${API_BASE_URL}/api/admin/blogs`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogForm),
      });

      const data = await res.json();
      if (res.ok) {
        alert(isEdit ? 'Blog post updated successfully!' : 'Blog post published successfully!');
        resetBlogForm();
        fetchData(token);
      } else {
        alert(data.message || 'Action failed.');
      }
    } catch (err) {
      console.error('Error saving blog post:', err);
      alert('Server connection error.');
    } finally {
      setPublishingBlog(false);
    }
  };

  const handleEditBlog = (blog) => {
    setBlogEditingId(blog._id);
    setBlogForm({
      title: blog.title || '',
      category: blog.category || 'Brand Collab',
      summary: blog.summary || '',
      content: blog.content || '',
      coverImage: blog.coverImage || '',
      author: blog.author || 'Snaha Chakraborty',
      date: blog.date || new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      readTime: blog.readTime || '5 min read',
      heroPosition: blog.heroPosition || 'normal',
      videoUrl: blog.videoUrl || '',
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post permanently?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setBlogsList((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const resetBlogForm = () => {
    setBlogEditingId(null);
    setBlogForm({
      title: '',
      category: categoriesList[0]?.name || 'Brand Collab',
      summary: '',
      content: '',
      coverImage: '',
      author: 'Snaha Chakraborty',
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      readTime: '5 min read',
      heroPosition: 'normal',
      videoUrl: '',
    });
  };

  // Advertisement Handlers
  const [adEditingId, setAdEditingId] = useState(null);
  const [publishingAd, setPublishingAd] = useState(false);
  const [uploadingAdImage, setUploadingAdImage] = useState(false);
  const [adForm, setAdForm] = useState({
    title: '',
    tagline: '',
    imageUrl: '',
    link: '',
    badgeText: 'Sponsored',
    active: true,
  });

  const handleAdImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB.');
      return;
    }

    setUploadingAdImage(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setAdForm((prev) => ({ ...prev, imageUrl: data.url }));
        } else {
          alert(data.message || 'Image upload failed.');
        }
      } catch (err) {
        console.error('Ad image upload error:', err);
        alert('Failed to upload image to Cloudinary.');
      } finally {
        setUploadingAdImage(false);
      }
    };
  };

  const handlePublishAd = async (e) => {
    e.preventDefault();
    if (!adForm.title || !adForm.imageUrl) {
      alert('Please fill in Ad Title and Banner Image.');
      return;
    }

    setPublishingAd(true);
    const isEdit = Boolean(adEditingId);
    const endpoint = isEdit
      ? `${API_BASE_URL}/api/admin/ads/${adEditingId}`
      : `${API_BASE_URL}/api/admin/ads`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adForm),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusState({
          message: isEdit ? 'Advertisement updated successfully!' : 'New Advertisement card created live!',
          type: 'success',
        });
        setAdForm({
          title: '',
          tagline: '',
          imageUrl: '',
          link: '',
          badgeText: 'Sponsored',
          active: true,
        });
        setAdEditingId(null);
        fetchData(token);
      } else {
        alert(data.message || 'Failed to save advertisement.');
      }
    } catch (err) {
      console.error('Save ad error:', err);
      alert('Failed to save advertisement card.');
    } finally {
      setPublishingAd(false);
    }
  };

  const handleEditAd = (ad) => {
    setAdEditingId(ad._id);
    setAdForm({
      title: ad.title || '',
      tagline: ad.tagline || '',
      imageUrl: ad.imageUrl || '',
      link: ad.link || '',
      badgeText: ad.badgeText || 'Sponsored',
      active: ad.active !== undefined ? ad.active : true,
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteAd = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Advertisement card?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/ads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusState({ message: 'Advertisement deleted successfully!', type: 'success' });
        fetchData(token);
      } else {
        alert('Failed to delete advertisement.');
      }
    } catch (err) {
      console.error('Delete ad error:', err);
      alert('Error deleting advertisement.');
    }
  };

  const resetAdForm = () => {
    setAdEditingId(null);
    setAdForm({
      title: '',
      tagline: '',
      imageUrl: '',
      link: '',
      badgeText: 'Sponsored',
      active: true,
    });
  };

  // Category Handlers
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;

    setAddingCategory(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCatInput.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setCategoriesList((prev) => [...prev, data.category]);
        setBlogForm((prev) => ({ ...prev, category: data.category.name }));
        setNewCatInput('');
      } else {
        alert(data.message || 'Failed to add category.');
      }
    } catch (err) {
      console.error('Error adding category:', err);
      alert('Failed to connect to server.');
    } finally {
      setAddingCategory(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setCategoriesList((prev) => prev.filter((c) => c._id !== id));
      } else {
        // Fallback for default local categories
        setCategoriesList((prev) => prev.filter((c) => c._id !== id && c.name !== name));
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setCategoriesList((prev) => prev.filter((c) => c._id !== id && c.name !== name));
    }
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
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
    <div className={`admin-app-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Collapsible Left Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-top-header">
          <a href="/" className="sidebar-brand">
            <img src="/Logo_Snaha.png" alt="Snaha Logo" className="sidebar-logo-img" />
            <span className="brand-title">Snaha Admin</span>
          </a>
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav-menu">
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
            title="Blogs Manager"
          >
            <BookOpen size={20} className="nav-icon" />
            <span className="nav-label">Blogs Manager</span>
            <span className="nav-count-badge">{blogsList.length}</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
            title="Videos & Media Manager"
          >
            <Film size={20} className="nav-icon" />
            <span className="nav-label">Videos & Media</span>
            <span className="nav-count-badge">{totalMedia}</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'collabs' ? 'active' : ''}`}
            onClick={() => setActiveTab('collabs')}
            title="Collabs Manager"
          >
            <Sparkles size={20} className="nav-icon" />
            <span className="nav-label">Collabs Manager</span>
            <span className="nav-count-badge">{collabsList.length}</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'ads' ? 'active' : ''}`}
            onClick={() => setActiveTab('ads')}
            title="Ads & Promos"
          >
            <Zap size={20} className="nav-icon" />
            <span className="nav-label">Ads & Promos</span>
            <span className="nav-count-badge">{adsList.length}</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'proposals' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposals')}
            title="Brand Proposals"
          >
            <Briefcase size={20} className="nav-icon" />
            <span className="nav-label">Brand Proposals</span>
            <span className="nav-count-badge">{totalProposals}</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
            title="Contact Messages"
          >
            <MessageSquare size={20} className="nav-icon" />
            <span className="nav-label">Contact Messages</span>
            <span className="nav-count-badge">{totalContacts}</span>
          </button>
        </nav>

        <div className="sidebar-bottom-actions">
          <a href="/" target="_blank" rel="noreferrer" className="sidebar-action-btn view-site">
            <ExternalLink size={18} />
            <span className="action-label">View Live Site</span>
          </a>
          <button type="button" className="sidebar-action-btn refresh" onClick={() => fetchData(token)} disabled={loadingData}>
            <RefreshCw size={18} className={loadingData ? 'spin' : ''} />
            <span className="action-label">Refresh Data</span>
          </button>
          <button type="button" className="sidebar-action-btn logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span className="action-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport Content */}
      <main className="admin-main-viewport">
        <header className="viewport-top-bar">
          <div className="top-bar-left">
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              <Menu size={22} />
            </button>
            <span className="active-tab-title">
              {activeTab === 'blogs' && 'Blogs Manager'}
              {activeTab === 'media' && 'Videos & Media Manager'}
              {activeTab === 'collabs' && 'Collabs Manager'}
              {activeTab === 'ads' && 'Ads & Promos Manager'}
              {activeTab === 'proposals' && 'Brand Proposals'}
              {activeTab === 'contacts' && 'Contact Messages'}
            </span>
            <span className="live-db-pill">MongoDB & Cloudinary Connected</span>
          </div>

          <div className="top-bar-right">
            <div className="admin-user-tag">
              <Mail size={14} />
              <span>connect.snaha@gmail.com</span>
            </div>
          </div>
        </header>

        <div className="viewport-content-inner">
          {/* Dashboard Stats Overview */}
          <div className="dashboard-top-section">
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

          {/* TAB 0: BLOGS MANAGER WITH JODIT RICH TEXT EDITOR */}
          {activeTab === 'blogs' && (
            <div className="tab-content-panel">
              {/* Category Management Card */}
              <div className="admin-media-form-card" style={{ marginBottom: '24px', padding: '24px' }}>
                <div className="header-title-flex">
                  <h3>
                    <Tag size={18} />
                    <span>Categories ({categoriesList.length})</span>
                  </h3>
                  <button
                    type="button"
                    className="cancel-edit-btn"
                    onClick={() => setShowCatManager((prev) => !prev)}
                    style={{ background: 'rgba(255, 159, 28, 0.15)', color: '#FF9F1C', border: '1px solid rgba(255, 159, 28, 0.3)' }}
                  >
                    {showCatManager ? 'Close Category Panel' : '+ Manage & Create Categories'}
                  </button>
                </div>

                {showCatManager && (
                  <div className="category-manager-body">
                    <form onSubmit={handleAddCategory} className="category-add-form">
                      <div className="category-input-wrap">
                        <Tag size={16} className="cat-icon" />
                        <input
                          type="text"
                          className="category-dark-input"
                          placeholder="Enter new category name (e.g. SEO Tips, Creator Secrets)..."
                          value={newCatInput}
                          onChange={(e) => setNewCatInput(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="add-category-btn" disabled={addingCategory}>
                        <PlusCircle size={16} />
                        <span>{addingCategory ? 'Adding...' : 'Add Category'}</span>
                      </button>
                    </form>

                    <div className="category-pills-wrap">
                      {categoriesList.map((cat) => (
                        <div key={cat._id || cat.name} className="category-manage-pill">
                          <span className="pill-dot" />
                          <span className="pill-name">{cat.name}</span>
                          <button
                            type="button"
                            className="pill-delete-btn"
                            onClick={() => handleDeleteCategory(cat._id, cat.name)}
                            title="Delete category"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Blog Form Card */}
              <div className="admin-media-form-card">
                <div className="header-title-flex">
                  <h3>
                    <BookOpen size={20} />
                    <span>{blogEditingId ? 'Edit Blog Post' : 'Create New Blog Post (Jodit Editor)'}</span>
                  </h3>
                  {blogEditingId && (
                    <button type="button" className="cancel-edit-btn" onClick={resetBlogForm}>
                      <XCircle size={16} /> Cancel Editing
                    </button>
                  )}
                </div>

                <form onSubmit={handlePublishBlog} className="media-publish-form">
                  {/* Row 1: Title & Category */}
                  <div className="form-row-2">
                    <div className="form-group-col">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label>Blog Title * (Max 80-100 chars / ~12-15 words)</label>
                        <small style={{ color: blogForm.title.length >= 90 ? '#FF9F1C' : '#78716C', fontWeight: '600', fontSize: '12px' }}>
                          {blogForm.title ? blogForm.title.length : 0} / 100
                        </small>
                      </div>
                      <input
                        type="text"
                        maxLength={100}
                        placeholder="Ex. 10 Secrets to High-Converting Brand Campaigns (~12-15 words)"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group-col">
                      <label>Category *</label>
                      <select
                        value={blogForm.category}
                        onChange={(e) => {
                          if (e.target.value === '__add_new__') {
                            setShowCatManager(true);
                          } else {
                            setBlogForm({ ...blogForm, category: e.target.value });
                          }
                        }}
                        required
                      >
                        {categoriesList.map((cat) => (
                          <option key={cat._id || cat.name} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                        <option value="__add_new__">+ Add / Manage Categories...</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Cover Image & Summary */}
                  <div className="form-row-2">
                    <div className="form-group-col">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label>Cover Image / Thumbnail *</label>
                        <small style={{ color: '#FF9F1C', fontWeight: '700', fontSize: '12px' }}>
                          {blogForm.heroPosition === 'main_hero' && 'Rec: 1920 × 1080 px (16:9 Widescreen)'}
                          {(blogForm.heroPosition === 'mini_1' || blogForm.heroPosition === 'mini_2' || blogForm.heroPosition === 'mini_3') && 'Rec: 400 × 400 px (1:1 Square)'}
                          {blogForm.heroPosition === 'spotlight' && 'Rec: 1920 × 800 px (21:9 Widescreen)'}
                          {(!blogForm.heroPosition || blogForm.heroPosition === 'normal') && 'Rec: 1200 × 675 px (16:9 Aspect Ratio)'}
                        </small>
                      </div>
                      <div className="file-upload-row">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBlogCoverUpload}
                          id="blog-cover-input"
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="blog-cover-input" className="upload-trigger-btn">
                          <Upload size={16} />
                          <span>{uploadingBlogCover ? 'Uploading...' : 'Choose Image File'}</span>
                        </label>
                      </div>
                      {blogForm.coverImage && (
                        <div className="image-preview-badge">
                          <img src={blogForm.coverImage} alt="Cover Preview" className="preview-thumb-img" />
                          <span>✓ Cover Image Ready</span>
                        </div>
                      )}
                    </div>

                    <div className="form-group-col">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label>Summary / Excerpt (Max 150-160 chars / ~25-30 words)</label>
                        <small style={{ color: blogForm.summary.length >= 150 ? '#FF9F1C' : '#78716C', fontWeight: '600', fontSize: '12px' }}>
                          {blogForm.summary ? blogForm.summary.length : 0} / 160
                        </small>
                      </div>
                      <input
                        type="text"
                        maxLength={160}
                        placeholder="Short summary preview for blog cards (~25-30 words)..."
                        value={blogForm.summary}
                        onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 3: Jodit Rich Text Editor */}
                  <div className="form-group-col full-width-group" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontWeight: '700', color: '#E7E5E4', margin: 0 }}>
                        Rich Article Content (Jodit Editor) *
                      </label>
                      <div className="inline-image-upload-wrap">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleInlineImageUpload}
                          id="inline-img-input"
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="inline-img-input"
                          className="cancel-edit-btn"
                          style={{
                            background: 'rgba(255, 159, 28, 0.15)',
                            color: '#FF9F1C',
                            border: '1.5px solid rgba(255, 159, 28, 0.3)',
                            cursor: 'pointer',
                            padding: '6px 14px',
                          }}
                        >
                          <ImageIcon size={14} />
                          <span>{uploadingInlineImage ? 'Uploading Image...' : '+ Add Image from Device'}</span>
                        </label>
                      </div>
                    </div>
                    <div className="jodit-editor-wrapper">
                      <JoditEditor
                        ref={blogEditorRef}
                        value={blogForm.content}
                        config={joditConfig}
                        onBlur={(newContent) => setBlogForm((prev) => ({ ...prev, content: newContent }))}
                      />
                    </div>
                  </div>

                  {/* Row 4: Author & Read Time */}
                  <div className="form-row-2">
                    <div className="form-group-col">
                      <label>Author</label>
                      <input
                        type="text"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      />
                    </div>

                    <div className="form-group-col">
                      <label>Estimated Read Time</label>
                      <input
                        type="text"
                        placeholder="Ex. 5 min read"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group-col full-width-group" style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ color: '#60A5FA', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                        <PlayCircle size={16} />
                        <span>Video Essay Source (Upload MP4 &lt;100MB or Paste Link)</span>
                      </label>
                      <small style={{ color: '#FF9F1C', fontWeight: '700' }}>Cloudinary MP4 or YouTube Link</small>
                    </div>

                    {videoUploadProgress.uploading && videoUploadProgress.target === 'blog' && (
                      <div style={{ background: 'rgba(255, 159, 28, 0.12)', border: '1.5px solid rgba(255, 159, 28, 0.4)', borderRadius: '14px', padding: '12px 16px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: '800', color: '#FF9F1C' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <RefreshCw size={14} className="spin" />
                            <span>Uploading Video File to Cloudinary...</span>
                          </span>
                          <span>{videoUploadProgress.loadedMB} MB / {videoUploadProgress.totalMB} MB ({videoUploadProgress.percent}%)</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${videoUploadProgress.percent}%`,
                              height: '100%',
                              backgroundColor: '#FF9F1C',
                              borderRadius: '9999px',
                              boxShadow: '0 0 10px rgba(255, 159, 28, 0.8)',
                              transition: 'width 0.15s ease',
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Ex. Paste YouTube link or upload MP4 video file (<100MB)..."
                        value={blogForm.videoUrl || ''}
                        onChange={(e) => setBlogForm({ ...blogForm, videoUrl: e.target.value })}
                        style={{ flex: 1 }}
                      />
                      <input
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm"
                        onChange={handleBlogVideoFileUpload}
                        id="blog-video-file-input"
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor="blog-video-file-input"
                        className="upload-trigger-btn"
                        style={{ whiteSpace: 'nowrap', cursor: 'pointer', padding: '10px 14px' }}
                      >
                        <Upload size={14} />
                        <span>
                          {videoUploadProgress.uploading && videoUploadProgress.target === 'blog'
                            ? `Uploading ${videoUploadProgress.percent}% (${videoUploadProgress.loadedMB} / ${videoUploadProgress.totalMB} MB)`
                            : '+ Video File (<100MB)'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Row 5: Magazine Placement Options Grid */}
                  <div className="form-group-col full-width-group" style={{ marginTop: '16px', marginBottom: '20px' }}>
                    <label style={{ color: '#FF9F1C', fontWeight: '800', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={16} />
                      <span>Magazine Layout Placement (Recommended Cover Dimensions)</span>
                    </label>

                    <div className="placement-cards-grid">
                      {[
                        { id: 'normal', label: 'Normal List', desc: 'Standard article grid card', dim: '1200 × 675 px (16:9)', icon: <FileText size={18} /> },
                        { id: 'main_hero', label: 'Main Hero Banner', desc: 'Top main feature card', dim: '1920 × 1080 px (16:9)', icon: <Star size={18} fill="#FF9F1C" color="#FF9F1C" /> },
                        { id: 'spotlight', label: 'Spotlight Wide Banner', desc: 'Middle wide banner (Full Section)', dim: '1920 × 1080 px (16:9)', icon: <Sparkles size={18} color="#FF9F1C" /> },
                        { id: 'mini_1', label: 'Hero Mini #1', desc: 'Top hero bottom-left overlay', dim: '400 × 400 px (1:1)', icon: <Pin size={18} color="#FF9F1C" /> },
                        { id: 'mini_2', label: 'Hero Mini #2', desc: 'Top hero bottom-center overlay', dim: '400 × 400 px (1:1)', icon: <Pin size={18} color="#FF9F1C" /> },
                        { id: 'mini_3', label: 'Hero Mini #3', desc: 'Top hero bottom-right overlay', dim: '400 × 400 px (1:1)', icon: <Pin size={18} color="#FF9F1C" /> },
                      ].map((opt) => {
                        const isSelected = (blogForm.heroPosition || 'normal') === opt.id;
                        return (
                          <div
                            key={opt.id}
                            className={`placement-selector-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setBlogForm({ ...blogForm, heroPosition: opt.id })}
                          >
                            <div className="placement-card-icon">{opt.icon}</div>
                            <div className="placement-card-text">
                              <span className="placement-card-label">{opt.label}</span>
                              <span className="placement-card-desc">{opt.desc}</span>
                              <span className="placement-card-dim-tag">📏 {opt.dim}</span>
                            </div>
                            {isSelected && <span className="placement-check-badge">✓ Selected</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <button type="submit" className="publish-submit-btn" disabled={publishingBlog}>
                      <Save size={16} />
                      <span>{publishingBlog ? 'Saving...' : blogEditingId ? 'Update Blog Post' : 'Publish Blog Post'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Published Blogs Table */}
              <div className="admin-table-card" style={{ marginTop: '30px' }}>
                <div className="card-header-bar">
                  <h2>Published Blog Posts ({blogsList.length})</h2>
                </div>

                <div className="table-wrapper">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Cover</th>
                        <th>Title, Category & Placement</th>
                        <th>Author & Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogsList.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="empty-table-cell">
                            No blog posts published yet. Use the editor above to publish your first blog post.
                          </td>
                        </tr>
                      ) : (
                        blogsList.map((blog) => (
                          <tr key={blog._id}>
                            <td>
                              <img src={blog.coverImage} alt={blog.title} className="table-thumb-img" />
                            </td>
                            <td>
                              <strong>{blog.title}</strong>
                              <br />
                              <span className="category-tag-pill">{blog.category}</span>
                              {blog.heroPosition && blog.heroPosition !== 'normal' && (
                                <span
                                  className="category-tag-pill"
                                  style={{
                                    backgroundColor: '#FF9F1C',
                                    color: '#191412',
                                    fontWeight: '800',
                                    marginLeft: '6px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                  }}
                                >
                                  {blog.heroPosition === 'main_hero' && (
                                    <>
                                      <Star size={12} fill="#191412" />
                                      <span>Main Hero Banner</span>
                                    </>
                                  )}
                                  {blog.heroPosition === 'mini_1' && (
                                    <>
                                      <Pin size={12} fill="#191412" />
                                      <span>Hero Mini #1</span>
                                    </>
                                  )}
                                  {blog.heroPosition === 'mini_2' && (
                                    <>
                                      <Pin size={12} fill="#191412" />
                                      <span>Hero Mini #2</span>
                                    </>
                                  )}
                                  {blog.heroPosition === 'mini_3' && (
                                    <>
                                      <Pin size={12} fill="#191412" />
                                      <span>Hero Mini #3</span>
                                    </>
                                  )}
                                  {blog.heroPosition === 'spotlight' && (
                                    <>
                                      <Sparkles size={12} fill="#191412" />
                                      <span>Spotlight Banner</span>
                                    </>
                                  )}
                                </span>
                              )}
                            </td>
                            <td>
                              <span>{blog.author || 'Snaha'}</span>
                              <br />
                              <small style={{ color: '#78716C' }}>{blog.date}</small>
                            </td>
                            <td>
                              <div className="action-buttons-cell">
                                <button
                                  type="button"
                                  className="icon-action-btn edit"
                                  onClick={() => handleEditBlog(blog)}
                                  title="Edit Blog"
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button
                                  type="button"
                                  className="icon-action-btn delete"
                                  onClick={() => handleDeleteBlog(blog._id)}
                                  title="Delete Blog"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ADS & PROMOS MANAGER */}
          {activeTab === 'ads' && (
            <div className="tab-content-area">
              <div className="admin-media-form-card">
                <div className="card-header-bar">
                  <div className="header-title-group">
                    <Zap size={20} className="header-icon" />
                    <h2>{adEditingId ? 'Edit Advertisement Card' : 'Create New Advertisement Card'}</h2>
                  </div>
                  {adEditingId && (
                    <button type="button" className="cancel-edit-btn" onClick={resetAdForm}>
                      <XCircle size={14} />
                      <span>Cancel Edit</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handlePublishAd} className="media-publish-form">
                  <div className="form-row-2">
                    <div className="form-group-col">
                      <label>Ad Title *</label>
                      <input
                        type="text"
                        placeholder="Ex. YamKitch Brand Partnership or Book Launch Promo"
                        value={adForm.title}
                        onChange={(e) => setAdForm({ ...adForm, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group-col">
                      <label>Badge Text (e.g. Sponsored, Book Promo, Featured)</label>
                      <input
                        type="text"
                        placeholder="Ex. Sponsored, Featured Partner, Pre-Order"
                        value={adForm.badgeText}
                        onChange={(e) => setAdForm({ ...adForm, badgeText: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group-col">
                      <label>Banner Image / Thumbnail (Recommended: 600 × 340 px | Max 10MB) *</label>
                      <div className="file-upload-row">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAdImageUpload}
                          id="ad-banner-input"
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="ad-banner-input" className="upload-trigger-btn">
                          <Upload size={16} />
                          <span>{uploadingAdImage ? 'Uploading...' : 'Choose Banner File'}</span>
                        </label>
                      </div>
                      {adForm.imageUrl && (
                        <div className="image-preview-badge">
                          <img src={adForm.imageUrl} alt="Banner Preview" className="preview-thumb-img" />
                          <span>✓ Banner Ready</span>
                        </div>
                      )}
                    </div>

                    <div className="form-group-col">
                      <label>Target CTA Link / URL (e.g. #contact or https://...)</label>
                      <input
                        type="text"
                        placeholder="Ex. #contact or https://brandpartner.com"
                        value={adForm.link}
                        onChange={(e) => setAdForm({ ...adForm, link: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group-col full-width-group">
                    <label>Subheading / Tagline</label>
                    <textarea
                      rows={3}
                      placeholder="Short engaging description for sidebar ad card..."
                      value={adForm.tagline}
                      onChange={(e) => setAdForm({ ...adForm, tagline: e.target.value })}
                    />
                  </div>

                  <div className="form-submit-row-bar">
                    <button type="submit" className="publish-submit-btn" disabled={publishingAd || uploadingAdImage}>
                      <Save size={18} />
                      <span>{publishingAd ? 'Saving Ad Card...' : adEditingId ? 'Update Ad Card' : 'Publish Ad Card'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Published Ads Table */}
              <div className="admin-table-card" style={{ marginTop: '32px' }}>
                <div className="card-header-bar">
                  <div className="header-title-group">
                    <Zap size={20} className="header-icon" />
                    <h2>Active Advertisements Sidebar Cards ({adsList.length})</h2>
                  </div>
                </div>

                <div className="table-wrapper">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Banner</th>
                        <th>Title & Tagline</th>
                        <th>Badge & Link</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adsList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="empty-table-cell">
                            No advertisement cards published yet. Use the form above to add your first Ad.
                          </td>
                        </tr>
                      ) : (
                        adsList.map((ad) => (
                          <tr key={ad._id}>
                            <td>
                              <img src={ad.imageUrl} alt={ad.title} className="table-thumb-img" />
                            </td>
                            <td>
                              <strong>{ad.title}</strong>
                              <br />
                              <small style={{ color: '#78716C' }}>{ad.tagline}</small>
                            </td>
                            <td>
                              <span className="category-tag-pill">{ad.badgeText}</span>
                              <br />
                              <small style={{ color: '#FF9F1C' }}>{ad.link}</small>
                            </td>
                            <td>
                              <span className={`status-pill ${ad.active ? 'published' : 'draft'}`}>
                                {ad.active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons-cell">
                                <button
                                  type="button"
                                  className="icon-action-btn edit"
                                  onClick={() => handleEditAd(ad)}
                                  title="Edit Ad"
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button
                                  type="button"
                                  className="icon-action-btn delete"
                                  onClick={() => handleDeleteAd(ad._id)}
                                  title="Delete Ad"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ margin: 0 }}>Video Source (Link or Direct Upload) *</label>
                        <small style={{ color: '#FF9F1C', fontWeight: '700' }}>Upload MP4 (&lt;100MB) or Paste Link</small>
                      </div>

                      {videoUploadProgress.uploading && videoUploadProgress.target === 'media' && (
                        <div style={{ background: 'rgba(255, 159, 28, 0.12)', border: '1.5px solid rgba(255, 159, 28, 0.4)', borderRadius: '14px', padding: '12px 16px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: '800', color: '#FF9F1C' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <RefreshCw size={14} className="spin" />
                              <span>Uploading Video File to Cloudinary...</span>
                            </span>
                            <span>{videoUploadProgress.loadedMB} MB / {videoUploadProgress.totalMB} MB ({videoUploadProgress.percent}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${videoUploadProgress.percent}%`,
                                height: '100%',
                                backgroundColor: '#FF9F1C',
                                borderRadius: '9999px',
                                boxShadow: '0 0 10px rgba(255, 159, 28, 0.8)',
                                transition: 'width 0.15s ease',
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Paste YouTube / Instagram Reel URL or Cloudinary video link..."
                          value={mediaForm.videoUrl}
                          onChange={(e) => setMediaForm({ ...mediaForm, videoUrl: e.target.value })}
                          required
                          style={{ flex: 1 }}
                        />
                        <input
                          type="file"
                          accept="video/mp4,video/quicktime,video/webm"
                          onChange={handleMediaVideoFileUpload}
                          id="direct-video-file-input"
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor="direct-video-file-input"
                          className="upload-trigger-btn"
                          style={{ whiteSpace: 'nowrap', cursor: 'pointer', padding: '10px 14px' }}
                        >
                          <Upload size={14} />
                          <span>
                            {videoUploadProgress.uploading && videoUploadProgress.target === 'media'
                              ? `Uploading ${videoUploadProgress.percent}% (${videoUploadProgress.loadedMB} / ${videoUploadProgress.totalMB} MB)`
                              : '+ Video File (<100MB)'}
                          </span>
                        </label>
                      </div>
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

          {/* TAB 2: COLLABS & BRAND CARDS MANAGER */}
          {activeTab === 'collabs' && (
            <AdminCollabsManager
              token={token}
              collabsList={collabsList}
              setCollabsList={setCollabsList}
            />
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
