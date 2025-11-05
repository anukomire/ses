// components/Services.js
import React from 'react';

function Services() {
  const services = [
    {
      icon: '🔐',
      title: 'Advanced Encryption',
      description: 'Military-grade encryption protocols to secure your sensitive data and communications.',
      features: ['AES-256 Encryption', 'End-to-End Security', 'Zero-Knowledge Architecture']
    },
    {
      icon: '🛡️',
      title: 'Threat Intelligence',
      description: 'Real-time threat detection and analysis to prevent security breaches before they happen.',
      features: ['AI-Powered Analysis', 'Real-time Monitoring', 'Predictive Threat Modeling']
    },
    {
      icon: '🌐',
      title: 'Network Security',
      description: 'Comprehensive network protection with advanced firewall and intrusion detection systems.',
      features: ['DDoS Protection', 'Web Application Firewall', 'VPN Solutions']
    },
    {
      icon: '📱',
      title: 'Mobile Security',
      description: 'Secure mobile applications and device management for enterprise mobility.',
      features: ['Mobile Device Management', 'App Security', 'Remote Wipe Capabilities']
    },
    {
      icon: '☁️',
      title: 'Cloud Security',
      description: 'Protect your cloud infrastructure with advanced security measures and compliance.',
      features: ['Cloud Access Security', 'Data Loss Prevention', 'Compliance Management']
    },
    {
      icon: '🔍',
      title: 'Security Audit',
      description: 'Comprehensive security assessments and penetration testing services.',
      features: ['Vulnerability Assessment', 'Penetration Testing', 'Compliance Auditing']
    }
  ];

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">
            Our <span className="text-gradient">fjdjergngbgbgeggegregrrrgjims</span>
          </h2>
          <p className="section-description">
            kjdfgidhegnbdfjgberhfghgegnngerenjfsdfbeeeeeeeeeee
          </p>
        </div>
        
        <div className="grid grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="service-card card hover-lift">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;