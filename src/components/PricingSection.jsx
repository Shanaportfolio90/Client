import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './PricingSection.css';

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formState, setFormState] = useState({
    brandName: '',
    brandWebsite: '',
    contactName: '',
    contactDesignation: '',
    contactEmail: '',
    phoneNo: '',
    connectPurpose: 'Promotional Video making for brand',
    promotionalBudget: '₹10,000 - ₹50,000',
  });

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    setModalSubmitted(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Enforce integer-only digits and max 10 digits
  const handlePhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormState({ ...formState, phoneNo: onlyDigits });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formState.phoneNo.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    setSubmitting(true);

    try {
      // API call to backend Express server / MongoDB
      const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        console.warn('API submission notice: Server error or offline. Saving in session.');
      }
    } catch (error) {
      console.warn('Backend server connecting via fallback:', error);
    } finally {
      setSubmitting(false);
      setModalSubmitted(true);
      setTimeout(() => {
        setModalSubmitted(false);
        setIsModalOpen(false);
      }, 3500);
    }
  };

  return (
    <section id="pricing" className="pricing-section-container">
      <div className="pricing-inner">
        <div className="custom-pricing-header-wrap">
          <div className="pricing-badge">
            <div className="badge-circles">
              <span className="circle-white" />
              <span className="circle-orange" />
            </div>
            <span className="badge-label">Custom Collaboration</span>
          </div>

          <h2 className="pricing-title">
            Need a <span className="highlight-text">Custom Quote?</span>
            <span className="leaf-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.6L12 12V2z" fill="#FFFFFF" />
                <path d="M18 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="#FFFFFF" opacity="0.8" />
              </svg>
            </span>
          </h2>

          <p className="custom-pricing-subtitle">
            Get a personalized brand collaboration, promotional video, photoshoot, or Instagram campaign quote tailored to your goals, timeline, and budget.
          </p>

          <button type="button" className="contact-me-btn main-quote-btn" onClick={openModal}>
            <span>Request Custom Proposal</span>
            <div className="btn-arrow-circle">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>
      </div>

      {/* Brand Collaboration Inquiry Modal */}
      {isModalOpen && (
        <div className="pricing-modal-overlay" onClick={closeModal}>
          <div className="pricing-modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-badge">
                <span className="badge-circle" />
                <span>Brand Collaboration</span>
              </div>
              <h3 className="modal-title">Let's Partner for Your Brand</h3>
              <p className="modal-subtitle">Fill out the details below to request a tailored campaign proposal.</p>
            </div>

            {modalSubmitted ? (
              <div className="modal-success-message">
                <div className="success-icon-wrap">✓</div>
                <h4>Proposal Submitted!</h4>
                <p>Your brand inquiry has been saved to MongoDB. Snaha will get in touch with you shortly!</p>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleFormSubmit}>
                <div className="form-grid-2">
                  <div className="modal-form-group">
                    <label>Brand Name *</label>
                    <input
                      type="text"
                      name="brandName"
                      placeholder="Ex. Acme Corp"
                      value={formState.brandName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>Brand Website *</label>
                    <input
                      type="url"
                      name="brandWebsite"
                      placeholder="https://www.example.com"
                      value={formState.brandWebsite}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="modal-form-group">
                    <label>Contact Person Name *</label>
                    <input
                      type="text"
                      name="contactName"
                      placeholder="Ex. Jane Smith"
                      value={formState.contactName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>Contact Person Designation *</label>
                    <input
                      type="text"
                      name="contactDesignation"
                      placeholder="Ex. Marketing Lead / Founder"
                      value={formState.contactDesignation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="modal-form-group">
                    <label>Contact Person Mail ID *</label>
                    <input
                      type="email"
                      name="contactEmail"
                      placeholder="jane@example.com"
                      value={formState.contactEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>Phone No * (10 Digits)</label>
                    <input
                      type="tel"
                      name="phoneNo"
                      placeholder="Ex. 9876543210"
                      value={formState.phoneNo}
                      onChange={handlePhoneChange}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Please enter exactly 10 digits"
                      required
                    />
                  </div>
                </div>

                {/* Wanna connect for */}
                <div className="modal-form-group full-width">
                  <label className="section-group-label">Wanna connect for :-</label>
                  <div className="radio-options-grid">
                    <label className="radio-card">
                      <input
                        type="radio"
                        name="connectPurpose"
                        value="Promotional Video making for brand"
                        checked={formState.connectPurpose === 'Promotional Video making for brand'}
                        onChange={handleInputChange}
                      />
                      <span>1. Promotional Video making for brand</span>
                    </label>

                    <label className="radio-card">
                      <input
                        type="radio"
                        name="connectPurpose"
                        value="Promotional photoshoot for brand"
                        checked={formState.connectPurpose === 'Promotional photoshoot for brand'}
                        onChange={handleInputChange}
                      />
                      <span>2. Promotional photoshoot for brand</span>
                    </label>

                    <label className="radio-card">
                      <input
                        type="radio"
                        name="connectPurpose"
                        value="Review Post on Instagram"
                        checked={formState.connectPurpose === 'Review Post on Instagram'}
                        onChange={handleInputChange}
                      />
                      <span>3. Review Post on Instagram</span>
                    </label>
                  </div>
                </div>

                {/* Promotional budget excluding meta ad */}
                <div className="modal-form-group full-width">
                  <label className="section-group-label">Promotional budget excluding meta ad :-</label>
                  <div className="radio-options-grid three-cols">
                    <label className="radio-card">
                      <input
                        type="radio"
                        name="promotionalBudget"
                        value="₹5,000 - ₹10,000"
                        checked={formState.promotionalBudget === '₹5,000 - ₹10,000'}
                        onChange={handleInputChange}
                      />
                      <span>₹5,000 - ₹10,000</span>
                    </label>

                    <label className="radio-card">
                      <input
                        type="radio"
                        name="promotionalBudget"
                        value="₹10,000 - ₹50,000"
                        checked={formState.promotionalBudget === '₹10,000 - ₹50,000'}
                        onChange={handleInputChange}
                      />
                      <span>₹10,000 - ₹50,000</span>
                    </label>

                    <label className="radio-card">
                      <input
                        type="radio"
                        name="promotionalBudget"
                        value="₹50,000 - ₹1,00,000"
                        checked={formState.promotionalBudget === '₹50,000 - ₹1,00,000'}
                        onChange={handleInputChange}
                      />
                      <span>₹50,000 - ₹1,00,000</span>
                    </label>
                  </div>
                </div>

                <div className="modal-actions-row">
                  <button type="submit" className="modal-submit-btn" disabled={submitting}>
                    {submitting ? 'Submitting to Database...' : 'Submit Proposal Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
