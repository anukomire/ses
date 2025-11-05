import React from 'react';

const About = () => {
  return (
    <section className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-title">
          <h2>About soft Electronic Solutions</h2>
          <p>Leading the digital transformation with innovative software solutions</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
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
              "To empower businesses through innovative software solutions that simplify complexity, 
              enhance productivity, and drive sustainable growth in the digital age."
            </p>
          </div>
        </div>

        <div className="section-dark" style={{ padding: '3rem', borderRadius: '10px' }}>
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
              <p>Building long-term relationships based on trust and mutual success</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;