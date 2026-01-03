import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitMessage('Please fix the errors below');
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('');
    
    try {
      const response = await axios.post('http://192.168.29.239:7501/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        setSubmitMessage(response.data.message || 'Thank you for your message! We will get back to you soon.');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      } else {
        setSubmitMessage(response.data.message || 'Failed to send message. Please try again.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error.response) {
        if (error.response.data && error.response.data.errors) {
          const serverErrors = error.response.data.errors.join(', ');
          errorMessage = `Validation error: ${serverErrors}`;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 429) {
          errorMessage = 'Too many requests. Please try again in 15 minutes.';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      setSubmitMessage(errorMessage);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-title animate-on-scroll">
          <h2>Get In Touch</h2>
          <p>Ready to start your project? Contact us today for a free consultation</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="animate-on-scroll">
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-black)' }}>Contact Information</h3>
            <div style={{ marginBottom: '2rem' }}>
              <p><strong>Email:</strong> softelectronicsolutions@gmail.com</p>
              <p><strong>Contact:</strong> 8415796558</p>
              <p><strong>Address:</strong> 13-6/33, Ground floor, Road number 2, Gayathri hills, Badangpet</p>
            </div>
            
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-black)' }}>Business Hours</h3>
            <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
            <p>Sunday: Closed</p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={errors.name ? 'error' : ''}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={errors.email ? 'error' : ''}
                  placeholder="Your email address"
                />
                {errors.email && (
                  <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                    {errors.email}
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name (optional)"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number (optional)"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={errors.message ? 'error' : ''}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && (
                  <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                    {errors.message}
                  </span>
                )}
              </div>
              
              <button 
                type="submit" 
                className="cta-button"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>Sending...</span>
                      <span style={{ fontSize: '0.875rem' }}>⏳</span>
                    </span>
                  </>
                ) : 'Send Message'}
              </button>
              
              {submitMessage && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '1rem',
                  backgroundColor: submitStatus === 'success' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                  color: submitStatus === 'success' ? '#28a745' : '#dc3545',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: `1px solid ${submitStatus === 'success' ? '#28a745' : '#dc3545'}`
                }}>
                  <p style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span>
                      {submitStatus === 'success' ? '✓' : '⚠'}
                    </span>
                    <span>{submitMessage}</span>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .form-group input.error,
        .form-group textarea.error {
          border-color: #dc3545;
          background-color: rgba(220, 53, 69, 0.05);
        }
        
        .form-group input.error:focus,
        .form-group textarea.error:focus {
          box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
      `}</style>
    </section>
  );
};


export default Contact;