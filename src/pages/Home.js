import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Innovative Software Solutions</h1>
          <p>
            We build cutting-edge software that transforms businesses and drives digital innovation. 
            From web applications to enterprise solutions, we deliver excellence.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="cta-button">Our Services</Link>
            <Link to="/contact" className="cta-button" style={{ background: 'transparent', border: '2px solid var(--primary-orange)', color: 'var(--primary-orange)' }}>
              Get Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Soft Electronic Solutions?</h2>
            <p>We combine technical expertise with business understanding to deliver exceptional results</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>Rapid development cycles without compromising on quality</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3>Secure Solutions</h3>
              <p>Enterprise-grade security for your applications and data</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📈</div>
              <h3>Scalable Architecture</h3>
              <p>Solutions that grow with your business needs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-title">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's discuss how our software solutions can help you achieve your goals</p>
            <Link to="/contact" className="cta-button" style={{ marginTop: '2rem' }}>
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;