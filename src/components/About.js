import React from 'react';

function About() {
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '10+', label: 'Years Experience' },
    { number: '25+', label: 'Expert Engineers' },
    { number: '100%', label: 'Client Satisfaction' }
  ];

  return (
    <section style={aboutStyle} className="section">
      <div className="container">
        <div style={aboutGridStyle}>
          <div style={aboutContentStyle} className="fade-in">
            <h2 style={aboutTitleStyle}>
              About <span className="text-gradient">DefenseTech</span>
            </h2>
            
            <div style={aboutTextStyle}>
              <p>
                We are a Hyderabad-based technology company specializing in embedded electronics, 
                software systems, and defense-grade solutions. Our team works closely with DRDO, 
                Research Centre Imarat (RCI), and DRDL to design and deliver cutting-edge research 
                tools, test systems, and flight hardware interfaces.
              </p>
              
              <p>
                With over a decade of experience in defense technology, we combine innovation, 
                precision, and reliability to support India's strategic defense programs. Our 
                expertise spans across multiple domains including real-time systems, hardware 
                interfaces, and mission-critical software development.
              </p>
              
              <p>
                We are committed to excellence and national security, ensuring that every solution 
                we deliver meets the highest standards required for defense applications.
              </p>
            </div>

            <div style={statsStyle}>
              {stats.map((stat, index) => (
                <div key={stat.label} style={statStyle} className="slide-up">
                  <div style={statNumberStyle}>{stat.number}</div>
                  <div style={statLabelStyle}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={aboutVisualStyle} className="slide-in-right">
            <div style={visualGridStyle}>
              <div style={visualItemStyle}>
                <div style={visualCardStyle}>
                  <div style={visualIconStyle}>🎯</div>
                  <h4 style={visualTitleStyle}>Mission Focused</h4>
                  {/* <p style={visualTextStyle}>Delivering reliable solutions for critical defense applications</p> */}
                </div>
              </div>
              
              <div style={visualItemStyle}>
                <div style={visualCardStyle}>
                  <div style={visualIconStyle}>🔬</div>
                  <h4 style={visualTitleStyle}>R&D Driven</h4>
                  {/* <p style={visualTextStyle}>Continuous innovation in embedded systems and software</p> */}
                </div>
              </div>
              
              <div style={visualItemStyle}>
                <div style={visualCardStyle}>
                  <div style={visualIconStyle}>🤝</div>
                  <h4 style={visualTitleStyle}>Strategic Partnerships</h4>
                  <p style={visualTextStyle}>Collaborating with DRDO, RCI, and DRDL</p>
                </div>
              </div>
              
              <div style={visualItemStyle}>
                <div style={visualCardStyle}>
                  <div style={visualIconStyle}>⚡</div>
                  <h4 style={visualTitleStyle}>Advanced Technology</h4>
                  <p style={visualTextStyle}>State-of-the-art embedded and software solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const aboutStyle = {
  padding: '5rem 0',
  backgroundColor: 'var(--surface)'
};

const aboutGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '3rem',
  alignItems: 'center'
};

const aboutContentStyle = {
  maxWidth: '100%'
};

const aboutTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#1a1a1a',
  marginBottom: '2rem'
};

const aboutTextStyle = {
  color: '#666666',
  lineHeight: '1.7',
  marginBottom: '3rem'
};

const statsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2rem'
};

const statStyle = {
  textAlign: 'center',
  padding: '1.5rem',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
};

const statNumberStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  color: 'var(--primary)',
  marginBottom: '0.5rem'
};

const statLabelStyle = {
  fontSize: '0.9rem',
  color: '#666666',
  fontWeight: '500'
};

const aboutVisualStyle = {
  width: '100%'
};

const visualGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem'
};

const visualItemStyle = {
  display: 'flex'
};

const visualCardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  flex: '1',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
};

const visualIconStyle = {
  fontSize: '2rem',
  marginBottom: '1rem'
};

const visualTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '0.5rem'
};

const visualTextStyle = {
  fontSize: '0.9rem',
  color: '#666666',
  lineHeight: '1.5'
};

// Media queries
const mediaQueries = `
  @media (min-width: 768px) {
    div[style*="gridTemplateColumns: 1fr"] {
      gridTemplateColumns: 1fr 1fr !important;
    }
  }
  
  @media (max-width: 767px) {
    div[style*="gridTemplateColumns: repeat(2, 1fr)"] {
      gridTemplateColumns: 1fr !important;
    }
    
    div[style*="gridTemplateColumns: 1fr 1fr"] {
      gridTemplateColumns: 1fr !important;
      gap: 1rem !important;
    }
  }
  
  div[style*="transition: transform 0.3s ease"]:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

export default About;