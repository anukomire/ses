import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.error });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactFormStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid var(--border-light)'
  };

  const formTitleStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '2rem',
    textAlign: 'center'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const alertStyle = {
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    border: '1px solid'
  };

  const alertSuccessStyle = {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    color: '#166534'
  };

  const alertErrorStyle = {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    color: '#dc2626'
  };

  const submitButtonStyle = {
    width: '100%',
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '1rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const submitButtonDisabledStyle = {
    opacity: '0.6',
    cursor: 'not-allowed',
    transform: 'none'
  };

  return (
    <div style={contactFormStyle} className="slide-up">
      <h3 style={formTitleStyle}>Send us a Message</h3>
      
      {submitStatus && (
        <div style={{
          ...alertStyle,
          ...(submitStatus.type === 'success' ? alertSuccessStyle : alertErrorStyle)
        }}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={formStyle}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter your email address"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="form-textarea"
            placeholder="Tell us about your project requirements, collaboration opportunities, or any questions you might have..."
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...submitButtonStyle,
            ...(isSubmitting ? submitButtonDisabledStyle : {})
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = 'var(--primary-dark)';
              e.target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = 'var(--primary)';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              Sending...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
              Send Message
            </>
          )}
        </button>
        
        <p style={{ 
          fontSize: '0.8rem', 
          color: '#666666', 
          textAlign: 'center',
          marginTop: '1rem'
        }}>
          * Required fields
        </p>
      </form>
    </div>
  );
}

export default ContactForm;