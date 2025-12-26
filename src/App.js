import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Header */}
        <header className="header">
          <div className="container">
            <nav className="navbar">
              <div className="logo">
                <img 
                  src="/ses_logo.png"
                  alt="Soft Electronic Solutions Logo"
                  className="logo-image"
                />
                <span className="logo-text"><span>SOFT</span> <span2 className="blue-text">ELECTRONIC</span2><span> SOLUTIONS</span></span>
              </div>
              
              <ul className={`nav-links ${isMenuOpen ? 'nav-open' : ''}`}>
                <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                <li><a href="/services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
                <li><a href="/about" onClick={() => setIsMenuOpen(false)}>About</a></li>
                <li><a href="/projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
                <li><a href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
              </ul>
              
              <button className="cta-button" onClick={() => window.location.href = '/contact'}>
                Get Started
              </button>
              
              <button 
                className="mobile-menu-button" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <div className="logo">
                  <img 
                    src="/ses_logo.png"
                    alt="Soft Electronic Solutions Logo"
                    className="logo-image"
                  />
                  <span className="logo-text"><span>SOFT</span> <span2 className="blue-text">ELECTRONIC</span2><span> SOLUTIONS</span></span>
                </div>
                <div className="social-icons">
                  <div className="social-icon">⌨</div>
                  <div className="social-icon">모</div>
                  <div className="social-icon">🛠</div>
                  <div className="social-icon">🗪</div>
                </div>
              </div>
              
              <div className="footer-section">
                <h4 className="footer-title">Quick Links</h4>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/services">Services</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/projects">Projects</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4 className="footer-title">Contact</h4>
                <p>13-6/33, Ground floor, Road number 2, Gayathri hills, Badangpet</p>
                <p>8415796558</p>
                <p>softelectronicsolutions@gmail.com</p>
                <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; 2021 SOFT ELECTRONIC SOLUTIONS. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          :root {
            --primary-white: #ffffff;
            --primary-orange: #FF6B35;
            --primary-black: #1a1a1a;
            --light-orange: #FF8C42;
            --dark-orange: #fa8b30ff;
            --light-gray: #f8f9fa;
            --dark-gray: #333333;
            --header-bg: #2C3E50;
            --footer-bg: #34495E;
            --body-bg: #ECF0F1;      
            --header-text: #FFFFFF;  
            --footer-text: #ECF0F1;
            --accent-blue: #eca553ff;        
            --accent-purple: #9B59B6;   
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--primary-black);
            background-color: var(--body-bg);
            overflow-x: hidden;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Header Styles */
          .header {
            background: var(--header-bg);
            box-shadow: 0 2px 30px rgba(0,0,0,0.1);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            backdrop-filter: blur(10px);
          }

          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
          }

          .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            min-width: 0;
          }

          .logo-image {
            height: 50px;
            width: auto;
            max-width: 50px;
            object-fit: contain;
            display: block;
          }

          .logo-text {
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--header-text);
            white-space: nowrap;
            display: flex;
            flex-wrap: wrap;
            gap: 0.2rem;
          }
          .blue-text {
            color: #00bfff;
            font-weight: bold;
          }
          /* Hero Section with Video Background */
          .hero {
            position: relative;
            padding: 150px 0 100px;
            text-align: center;
            overflow: hidden;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .video-background {
            position: absolute;
            top: 5%;
            left: 5%;
            width: 90%;
            height: 90%;   
            z-index: 1;              
            overflow: hidden;
          }
          .video-background video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }

         /* Horizontal Scrolling Panel Styles */
.horizontal-scroller-container {
  padding: 5px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-top: 1px solid rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.horizontal-scroller {
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  position: relative;
  padding: 10px 0;
}
  .horizontal-scroller::before {
  left: 0;
  background: linear-gradient(to right, #f8f9fa, transparent);
}

.horizontal-scroller::after {
  right: 0;
  background: linear-gradient(to left, #f8f9fa, transparent);
}

.scrolling-content {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
  will-change: transform;
}

.scroll-item {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 20px;
  background: var(--primary-white);
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 107, 53, 0.1);
  flex-shrink: 0;
}

.scroll-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.2);
  border-color: var(--primary-orange);
}

.point-icon {
  color: var(--primary-orange);
  font-weight: bold;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.point-text {
  color: var(--dark-gray);
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
}

.pause-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 107, 53, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 10;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

/* Responsive styles */
@media (max-width: 768px) {
  .horizontal-scroller-container {
    padding: 20px 0;
  }
  
  .scrolling-content {
    gap: 1.5rem;
  }
  
  .scroll-item {
    padding: 10px 16px;
    border-radius: 40px;
  }
  
  .point-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .horizontal-scroller-container {
    padding: 15px 0;
  }
  
  .scrolling-content {
    gap: 1rem;
    padding: 0 0.5rem;
  }
  
  .scroll-item {
    padding: 8px 14px;
    border-radius: 35px;
  }
  
  .point-text {
    font-size: 0.85rem;
  }
  
  .point-icon {
    font-size: 1rem;
    width: 20px;
    height: 20px;
  }
}

/* Gradient overlay for fade effect on edges */
.horizontal-scroller::before,
.horizontal-scroller::after {
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  width: 60px;
  z-index: 2;
  pointer-events: none;
}

.horizontal-scroller::before {
  left: 0;
  background: linear-gradient(to right, #f8f9fa, transparent);
}

.horizontal-scroller::after {
  right: 0;
  background: linear-gradient(to left, #f8f9fa, transparent);
}

/* Animation for pause indicator */
@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(3); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(4); }
}
   .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          background: var(--primary-white);
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-height: 300px;
          display: flex;
          flex-direction: column;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .feature-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .feature-header h3 {
          font-size: 1.5rem;
          color: var(--primary-black);
          margin-bottom: 0.5rem;
        }

        .feature-header p {
          color: var(--dark-gray);
          font-size: 0.9rem;
        }

        .logos-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Logo Grid Layout */
        .logos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
          gap: 1rem;
          width: 100%;
          place-items: center;
        }

        .logo-item {
          position: relative;
          width: 80px;
          height: 80px;
          padding: 10px;
          background: var(--light-gray);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          border: 2px solid transparent;
        }

        .logo-item:hover {
          transform: scale(1.05);
        }

        .logo-item.active {
          transform: scale(1.15);
          box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
          border-color: var(--primary-orange);
          z-index: 10;
          background: var(--primary-white);
          filter: brightness(1.1);
        }

        .partner-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .logo-item.active .partner-logo {
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
        }

        .logo-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(44, 62, 80, 0.9);
          color: white;
          padding: 0.5rem;
          text-align: center;
          font-size: 0.7rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
          pointer-events: none;
        }

        .logo-item:hover .logo-overlay,
        .logo-item.active .logo-overlay {
          transform: translateY(0);
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .logos-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .feature-card {
            padding: 1.5rem;
            min-height: 250px;
          }

          .logos-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.75rem;
          }

          .logo-item {
            width: 70px;
            height: 70px;
            padding: 8px;
          }
        }

        @media (max-width: 480px) {
          .logos-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }

          .logo-item {
            width: 60px;
            height: 60px;
            padding: 6px;
          }

          .feature-header h3 {
            font-size: 1.3rem;
          }
        }
          .hero-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
          }
          .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(236, 248, 252, 0.7);
            z-index: 1;
          }

          .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            color: var(--primary-white);
            position: relative;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }

          .hero p {
            font-size: 1.3rem;
            color: var(--primary-white);
            margin-bottom: 2.5rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            opacity: 0.95;
            text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
          }

          /* Section Styles */
          .section {
            padding: 80px 0;
          }

          .section-dark {
            background: var(--footer-bg);
            color: var(--footer-text);
          }

          .section-title {
            text-align: center;
            margin-bottom: 3rem;
          }

          .section-title h2 {
            font-size: 2.5rem;
            color: var(--primary-black);
            margin-bottom: 1rem;
          }

          .section-dark .section-title h2 {
            color: var(--footer-text);
          }

          .section-title p {
            color: var(--dark-gray);
            font-size: 1.1rem;
          }

          .section-dark .section-title p {
            color: #ccc;
          }

          /* Responsive adjustments for hero video */
          @media (max-width: 768px) {
            .hero {
              padding: 120px 0 80px;
              min-height: 80vh;
            }
            
            .hero h1 {
              font-size: 2.5rem;
            }
            
            .hero p {
              font-size: 1.1rem;
            }
            
            .video-background video {
              object-fit: cover;
              height: 100%;
            }
          }

          @media (max-width: 480px) {
            .hero {
              min-height: 70vh;
            }
            
            .hero h1 {
              font-size: 2rem;
            }
            
            .hero p {
              font-size: 1rem;
            }
          }

          /* Rest of your existing styles remain the same */
          .logo-text span {
            color: var(--primary-orange);
            margin-left: 0.2rem;
          }

          .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
          }

          .nav-links a {
            text-decoration: none;
            color: var(--header-text);
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
          }

          .nav-links a:hover {
            color: var(--primary-orange);
          }

          .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-orange);
            transition: width 0.3s ease;
          }

          .nav-links a:hover::after {
            width: 100%;
          }

          .cta-button {
            background: var(--primary-orange);
            color: var(--header-text);
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .cta-button:hover {
            background: var(--dark-orange);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
          }

          .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            color: var(--header-text);
            font-size: 1.5rem;
            cursor: pointer;
          }

          /* Services Grid */
          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }

          .service-card {
            background: var(--primary-white);
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
          }

          .service-card:hover::before {
            left: 100%;
          }

          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }

          .service-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--primary-orange) 0%, var(--accent-blue) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            color: var(--primary-white);
            font-size: 2rem;
            transition: all 0.3s ease;
          }

          .service-card:hover .service-icon {
            transform: scale(1.1) rotate(10deg);
          }

          /* Contact Form */
          .contact-form {
            max-width: 600px;
            margin: 0 auto;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--primary-black);
          }

          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: var(--primary-white);
          }

          .form-group input:focus,
          .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-orange);
            box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
          }

          /* Footer */
          .footer {
            background: var(--footer-bg);
            color: var(--footer-text);
            padding: 3rem 0 1rem;
          }

          .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
          }

          .footer-section h3, .footer-section h4 {
            color: var(--primary-orange);
            margin-bottom: 1rem;
          }

          .footer-section ul {
            list-style: none;
          }

          .footer-section ul li {
            margin-bottom: 0.5rem;
          }

          .footer-section ul li a {
            color: var(--footer-text);
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .footer-section ul li a:hover {
            color: var(--primary-orange);
          }

          .footer-logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
          .footer-description {
            color: #ccc;
            line-height: 1.6;
            margin-bottom: 1rem;
          }
          .social-icons {
            display: flex;
            gap: 1rem;
          }
          .social-icon {
            width: 40px;
            height: 40px;
            background: #2C3E50;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .social-icon:hover {
            background: var(--primary-orange);
            transform: translateY(-3px);
          }
          .footer-bottom {
            border-top: 1px solid #4a6278;
            padding-top: 2rem;
            text-align: center;
            color: #999;
          }
          /* Projects Grid */
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
          }
          .project-card {
            background: var(--primary-white);
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
          .project-image {
            height: 200px;
            background: linear-gradient(135deg, var(--primary-orange) 0%, var(--accent-blue) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
          }
          .project-content {
            padding: 1.5rem;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .nav-links {
              display: none;
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: var(--header-bg);
              flex-direction: column;
              padding: 1rem;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }

            .nav-open {
              display: flex !important;
            }

            .mobile-menu-button {
              display: block;
            }

            .cta-button {
              display: none;
            }
          }

          /* Logo responsive adjustments */
          @media (max-width: 1024px) {
            .logo-text {
              font-size: 1.1rem;
            }
            .logo-image {
              height: 45px;
              max-width: 45px;
            }
          }
          @media (max-width: 768px) {
            .logo {
              gap: 0.5rem;
            }
            .logo-text {
              font-size: 1rem;
              white-space: normal;
              display: none;
            }
            .logo-image {
              height: 40px;
              max-width: 40px;
            }
          }
          @media (max-width: 480px) {
            .logo-text {
              display: none;
            }
            .logo-image {
              height: 35px;
              max-width: 35px;
            }
          }
          /* Animation classes */
          .fade-in {
            animation: fadeIn 1s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .slide-in-left {
            animation: slideInLeft 1s ease-out;
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .pulse {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    </Router>
  );
}

// Page Components
const Home = () => {
  const [isScrollingPaused, setIsScrollingPaused] = useState(false);
  const [activeLogo, setActiveLogo] = useState(null);
  const scrollContainerRef = useRef(null);
  
  const scrollPoints = [
    "• Deep expertise in Automotive and Embedded System applications",
    "• Strong innovation culture driven by ongoing R&D",
    "• Bespoke solutions crafted to meet client-specific needs",
    "• Proven track record of reliability and quality assurance",
    "• Strategic focus on defense sector technologies"
  ];

  // Technology Partners logos (replace with actual image paths)
  const techPartners = [
    { id: 1, name: "NVIDIA", logo: "/clients/NVIDIA.jpg" },
    { id: 2, name: "SBL", logo: "/clients/SBL.png" },
    { id: 3, name: "ADVANTECH", logo: "/clients/Advantech.png" },
    { id: 4, name: "XILINX", logo: "/clients/Xilinx.png" },
    { id: 5, name: "SCIENTIFIC ", logo: "/clients/Scientific-logo1.png" },
    {id: 6, name: "SIGLANT", logo: "/clients/siglent-logo1.png"}
  ];

  // Defensive Solutions logos (replace with actual image paths)
  const defensiveSolutions = [
    { id: 7, name: "DRDL", logo: "/clients/drdo-logo-png_seeklogo-343990.png" },
    { id: 8, name: "BDL", logo: "/clients/BDL_Logo_2.jpg" },
    { id: 9, name: "RCI", logo: "/clients/DRDO-RCI-logo.webp" },
   
  ];

  // Industrial Services logos (replace with actual image paths)
  const industrialServices = [
    { id: 10, name: "MAGNARUS", logo: "/clients/Magnarus.png" },
    { id: 11, name: "VAISHNVAI TECHNOLOGIES", logo: "/clients/Vaishnavitechnologies.png" },
    { id: 12, name: "SRIDATTA", logo: "/clients/SRIDATTA.png" },
    { id: 13, name: "SILICON ENGINEERS", logo: "/clients/SiliconEngineers.png" },
    // { id: 14, name: "Industrial 5", logo: "/logos/industrial5.png" },
  ];

  const engineeringPartners = [
    {id: 14, name:"SAARC", logo: "/clients/SAARC.png"},
    {id: 15, name:"SRIDATTA DMV", logo: "clients/SRIDATTA-DMV.png"},
    {id: 16, name:"UNITECH", logo: "/clients/Unitech-Engineers.png"},
    {id: 17, name: "RAINBOW WORKS", logo:"/clients/Rainbow-works.png"}

  ]

  // Handle logo hover/click
  const handleLogoInteraction = (logoId) => {
    setActiveLogo(logoId);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const content = container.querySelector('.scrolling-content');
    const clone = content.cloneNode(true);
    container.appendChild(clone);

    let animationId;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isScrollingPaused) {
        position += speed;
        
        const contentWidth = content.scrollWidth / 2;
        if (position >= contentWidth) {
          position = 0;
        }
        
        container.scrollLeft = position;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isScrollingPaused]);

  return (
    <>
      <section className="hero animate-on-scroll">
        <div className="video-background">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            poster="/video-poster.jpg"
          >
            <source src="/akash-bg.mp4" type="video/mp4" />
            <source src="/hero-background.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="hero-content">
          <h1>Innovative Software Solutions</h1>
          <p>
            To design, develop, and implement hardware and software systems for real-time data acquisition, control, diagnostics, and simulation—seamlessly 
            integrated with mechanical, electromechanical, and communication subsystems.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/services" className="cta-button">Our Services</a>
            <a href="/contact" className="cta-button" style={{ background: 'transparent', border: '2px solid var(--primary-orange)', color: 'var(--primary-orange)' }}>
              Get Quote
            </a>
          </div>
        </div>
      </section>

      {/* Horizontal Scrolling Panel */}
      <div className="horizontal-scroller-container">
        <div className="container">
          <div 
            className="horizontal-scroller"
            ref={scrollContainerRef}
            onMouseEnter={() => setIsScrollingPaused(true)}
            onMouseLeave={() => setIsScrollingPaused(false)}
            style={{ overflow: 'hidden', position: 'relative' }}
          >
            <div className="scrolling-content">
              {[...scrollPoints, ...scrollPoints].map((point, index) => (
                <div key={index} className="scroll-item">
                  <span className="point-icon">→</span>
                  <span className="point-text">{point}</span>
                </div>
              ))}
            </div>
            
            {/* Pause indicator */}
            {isScrollingPaused && (
              <div className="pause-indicator">
                <span>Paused</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Section with Logo Groups */}
      <section className="section animate-on-scroll">
        <div className="container">
          <div className="section-title">
            <h2>Our Expertise & Partnerships</h2>
            <p>We collaborate with industry leaders to deliver cutting-edge solutions</p>
          </div>
          
          <div className="features-grid">
            {/* Technology Partners */}
            <div className="feature-card">
              <div className="feature-header">
                <h3>Technology Partners</h3>
                <p>Collaborating with leading tech innovators</p>
              </div>
              <div className="logos-container">
                <div className="logos-grid">
                  {techPartners.map((partner) => (
                    <div 
                      key={partner.id}
                      className={`logo-item ${activeLogo === partner.id ? 'active' : ''}`}
                      onMouseEnter={() => handleLogoInteraction(partner.id)}
                      onMouseLeave={() => setActiveLogo(null)}
                      onClick={() => handleLogoInteraction(partner.id)}
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="partner-logo"
                      />
                      <div className="logo-overlay">
                        <span>{partner.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Defensive Solutions */}
            <div className="feature-card">
              <div className="feature-header">
                <h3>Defensive Solutions</h3>
                <p>Defensive solutions </p>
              </div>
              <div className="logos-container">
                <div className="logos-grid">
                  {defensiveSolutions.map((solution) => (
                    <div 
                      key={solution.id}
                      className={`logo-item ${activeLogo === solution.id ? 'active' : ''}`}
                      onMouseEnter={() => handleLogoInteraction(solution.id)}
                      onMouseLeave={() => setActiveLogo(null)}
                      onClick={() => handleLogoInteraction(solution.id)}
                    >
                      <img 
                        src={solution.logo} 
                        alt={solution.name}
                        className="partner-logo"
                      />
                      <div className="logo-overlay">
                        <span>{solution.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Industrial Services */}
            <div className="feature-card">
              <div className="feature-header">
                <h3>Industrial Services</h3>
                <p>Specialized solutions for industrial applications</p>
              </div>
              <div className="logos-container">
                <div className="logos-grid">
                  {industrialServices.map((service) => (
                    <div 
                      key={service.id}
                      className={`logo-item ${activeLogo === service.id ? 'active' : ''}`}
                      onMouseEnter={() => handleLogoInteraction(service.id)}
                      onMouseLeave={() => setActiveLogo(null)}
                      onClick={() => handleLogoInteraction(service.id)}
                    >
                      <img 
                        src={service.logo} 
                        alt={service.name}
                        className="partner-logo"
                      />
                      <div className="logo-overlay">
                        <span>{service.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
             <div className="feature-card">
        <div className="feature-header">
          <h3>Engineering Partners</h3>
          <p>Collaborating with engineering specialists</p>
        </div>
        <div className="logos-container">
          <div className="logos-grid">
            {engineeringPartners.map((partner) => (
              <div 
                key={partner.id}
                className={`logo-item ${activeLogo === partner.id ? 'active' : ''}`}
                onMouseEnter={() => handleLogoInteraction(partner.id)}
                onMouseLeave={() => setActiveLogo(null)}
                onClick={() => handleLogoInteraction(partner.id)}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="partner-logo"
                />
                <div className="logo-overlay">
                  <span>{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
          </div>
        </div>
      </section>

      <section className="section section-dark animate-on-scroll">
        <div className="container">
          <div className="section-title">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's discuss how our software solutions can help you achieve your goals</p>
            <a href="/contact" className="cta-button pulse" style={{ marginTop: '2rem' }}>
              Start Your Project
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
const Services = () => {
  const services = [
    {
      icon: '모',
      title: 'Embedded',
      description: 'Embedded.'
    },
    {
      icon: '🀆',
      title: 'Software',
      description: 'Software.'
    },
    {
      icon: '☁️',
      title: 'Hardware',
      description: 'Hardware.'
    }
    // ,
    // {
    //   icon: '🤖',
    //   title: 'AI & Machine Learning',
    //   description: 'Intelligent solutions powered by artificial intelligence and machine learning algorithms.'
    // },
    // {
    //   icon: '🔒',
    //   title: 'Cybersecurity',
    //   description: 'Comprehensive security solutions to protect your applications and data from threats.'
    // },
    // {
    //   icon: '📊',
    //   title: 'Data Analytics',
    //   description: 'Transform your data into actionable insights with powerful analytics and visualization tools.'
    // }
  ];

  return (
    <section className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-title animate-on-scroll">
          <h2>Our Services</h2>
          <p>Includes...</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card animate-on-scroll">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-title animate-on-scroll">
          <h2>About soft electronic solutions</h2>
          <p>Leading the digital transformation with innovative software solutions</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }} className="animate-on-scroll">
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-black)' }}>Our Story</h3>
            <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              Founded in 2020, Soft Electronic Solutions has been at the forefront of software innovation, 
              helping businesses of all sizes leverage technology to achieve their goals.
            </p>
            <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              Our team of experienced developers, designers, and strategists work together 
              to create solutions that not only meet technical requirements but also drive 
              business value and user satisfaction.
            </p>
          </div>
          <div style={{ background: 'var(--light-gray)', padding: '2rem', borderRadius: '10px' }}>
            <h4 style={{ color: 'var(--primary-orange)', marginBottom: '1rem' }}>Our Mission</h4>
            <p style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
              "To deliver bespoke, high-performance electronic solutions and expert consulting services aligned with client-specific needs across embedded systems, 
              automotive electronics, and test and measurement domains."
            </p>
          </div>
        </div>

        <div className="section-dark" style={{ padding: '3rem', borderRadius: '10px' }} >
          <div className="section-title">
            <h2>Our Values</h2>
          </div>
          <div className="services-grid">
            <div className="service-card" style={{ background: 'transparent', color: 'var(--primary-white)', boxShadow: 'none' }}>
              <h3>Innovation</h3>
              <p>Constantly pushing boundaries with cutting-edge technologies and creative solutions</p>
            </div>
            <div className="service-card" style={{ background: 'transparent', color: 'var(--primary-white)', boxShadow: 'none' }}>
              <h3>Quality</h3>
              <p>Delivering exceptional quality in every project with attention to detail</p>
            </div>
            <div className="service-card" style={{ background: 'transparent', color: 'var(--primary-white)', boxShadow: 'none' }}>
              <h3>Partnership</h3>
              <p>partner with us for effective software/ embedded solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock projects data
    const mockProjects = [
      {
        id: 1,
        title: "Embedded",
        description: "Embedded solution",
        category: "Embedded",
        status: "completed",
        technologies: "python, cpp, pyqt",
        created_at: "2021"
      },
      {
        id: 2,
        title: "Software",
        description: "Software",
        category: "Hardware",
        status: "ongoing",
        technologies: "Python",
        created_at: "2022"
      },
      {
        id: 3,
        title: "Hardware",
        description: "Hardware",
        category: "Research",
        status: "completed",
        technologies: "Python",
        created_at: "2023"
      }
    ];
    setProjects(mockProjects);
  }, []);

  const categories = ['all', 'Embedded', 'Software', 'Hardware'];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-title animate-on-scroll">
          <h2>Our Projects</h2>
          <p>Showcasing our innovative work in software development and technology solutions</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid var(--primary-orange)',
                backgroundColor: selectedCategory === category ? 'var(--primary-orange)' : 'transparent',
                color: selectedCategory === category ? 'white' : 'var(--primary-orange)',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="project-card animate-on-scroll">
              <div className="project-image">
                {project.category === 'Software' && '모'}
                {project.category === 'Hardware' && '🛠'}
                {project.category === 'Embedded' && '⌨'}
              </div>
              <div className="project-content">
                <div style={{ 
                  display: 'inline-block', 
                  backgroundColor: 'rgba(255, 107, 53, 0.1)', 
                  color: 'var(--primary-orange)', 
                  padding: '0.375rem 0.75rem', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem' 
                }}>
                  {project.category}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-black)' }}>
                  {project.title}
                </h3>
                <p style={{ color: 'var(--dark-gray)', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {project.description}
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Technologies:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {project.technologies.split(', ').map((tech, idx) => (
                      <span key={idx} style={{ 
                        backgroundColor: 'var(--light-gray)', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '15px', 
                        fontSize: '0.8rem' 
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  color: 'var(--dark-gray)', 
                  fontSize: '0.9rem' 
                }}>
                  <span>Status: <strong>{project.status}</strong></span>
                  <span>{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/contact', formData);
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    }
    
    setIsSubmitting(false);
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
                />
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
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
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
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="cta-button"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitMessage && (
                <p style={{ 
                  marginTop: '1rem', 
                  color: submitMessage.includes('error') ? 'red' : 'green',
                  textAlign: 'center'
                }}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;