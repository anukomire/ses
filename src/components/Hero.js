// components/Hero.js
import React from 'react';

function Hero() {
  return (
    <section className="hero gradient-bg">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in">
              nfbbffjsbnnfehfjsnmdnfgmsnfnsfknfgjdfngjdf
              <span className="text-gradient"> Solutions</span>
            </h1>
            <p className="hero-description slide-up">
              fsddddddffffffffffffffffffffffff
            </p>
            <div className="hero-actions slide-up">
              <a href="#services" className="btn btn-primary">
                Explore Services
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Us
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="card card-1 slide-in-left">
                <div className="card-icon">🛡️</div>
                <h4>cccccccccccccc</h4>
                <p>kdfgkdmgkdegjdfklkfdgfg</p>
              </div>
              <div className="card card-2 slide-in-right">
                <div className="card-icon">🔒</div>
                <h4>Data Encryption</h4>
                <p>Secure data transmission</p>
              </div>
              <div className="card card-3 slide-in-left">
                <div className="card-icon">🌐</div>
                <h4>nfbsjfbjhdbfjbsdjff</h4>
                <p>kjfkjsfjsfjsffsfh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;