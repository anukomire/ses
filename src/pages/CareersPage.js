import React, { useState } from 'react';

function CareersPage() {
  const [activeTab, setActiveTab] = useState('positions');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume_link: '',
    position: '',
    cover_letter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const positions = [
    {
      title: 'Technician',
      department: 'Engineering',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '0 years',
      description: 'Technician',
      requirements: [
        'Bachelor\'s/Master\'s in Electronics/Computer Engineering',
        '5+ years experience in embedded systems development',
        'Expert in Soldering',
        // 'Experience with ARM Cortex processors',
        // 'Knowledge of MIL-STD-1553, RS422 protocols'
      ]
    },
    {
      title: 'FPGA Development Engineer',
      department: 'Hardware',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '0-3 years',
      description: 'Develop and optimize FPGA designs for high-performance Inovative applications.',
      requirements: [
        'Bachelor\'s/Master\'s in Electronics Engineering',
        '3+ years experience in FPGA development',
        'Proficiency in VLSI/Verilog',
        'Experience with Xilinx/Vivado',
        'knowledge of signal processsing'
      ]
    },
    {
      title: 'Software Engineer',
      department: 'Software',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '0 years',
      description: 'Develop mission-critical software applications for real-time systems with focus on reliability and performance.',
      requirements: [
        'Bachelor\'s/Master\'s in Computer Science, Electroics, Electrical',
        '0 years experience in software development',
        'Proficiency in C++, Python, Java',
        'Experience with real-time systems',
        'Knowledge of software development principles and life cycles'
      ]
    }
    ,
    {
      title: 'Expert in Time pass',
      department:'Time pass',
      location:'Work from Home',
      type:'part time',
      experience:'20 yrs',
      description: 'sleep for 24 hours',
      requirements:[
        'sleeping',
        'roaming',
        'never come to office',
        'experiance in laughing'
      ]
    }
  ];

  const benefits = [
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Industry-leading compensation packages with performance bonuses'
    },
    {
      icon: '🏥',
      title: 'Health Insurance',
      description: 'Comprehensive medical, dental, and vision coverage for you and your family'
    },
    {
      icon: '📚',
      title: 'Learning & Development',
      description: 'Continuous learning opportunities with training programs and certifications'
    },
    {
      icon: '⚡',
      title: 'Cutting-edge Technology',
      description: 'Work with the latest technologies on challenging real-time projects'
    },
    {
      icon: '🤝',
      title: 'Collaborative Environment',
      description: 'Work with experts in a supportive and innovative team environment'
    },
    {
      icon: '🎯',
      title: 'Meaningful Work',
      description: 'thought of what we are learning'
    }
  ];

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
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFormData({ 
          name: '', 
          email: '', 
          resume_link: '', 
          position: '', 
          cover_letter: '' 
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.error });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to submit application. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={pageStyle}>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div className="container">
          <div style={heroContentStyle}>
            <h1 style={heroTitleStyle}>Join Our Team</h1>
            <p style={heroDescriptionStyle}>
             This is the home section of hero 
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section style={tabsSectionStyle}>
        <div className="container">
          <div style={tabsStyle}>
            <button
              style={{
                ...tabButtonStyle,
                ...(activeTab === 'positions' ? activeTabButtonStyle : {})
              }}
              onClick={() => setActiveTab('positions')}
            >
              Open Positions
            </button>
            <button
              style={{
                ...tabButtonStyle,
                ...(activeTab === 'benefits' ? activeTabButtonStyle : {})
              }}
              onClick={() => setActiveTab('benefits')}
            >
              Benefits
            </button>
            <button
              style={{
                ...tabButtonStyle,
                ...(activeTab === 'apply' ? activeTabButtonStyle : {})
              }}
              onClick={() => setActiveTab('apply')}
            >
              Apply Now
            </button>
          </div>

          {/* Positions Tab */}
          {activeTab === 'positions' && (
            <div style={tabContentStyle} className="fade-in">
              <h2 style={tabTitleStyle}>Current Openings</h2>
              <p style={tabDescriptionStyle}>
                Explore more opportunitiesin our organzation
              </p>
              
              <div style={positionsGridStyle}>
                {positions.map((position, index) => (
                  <div key={position.title} style={positionCardStyle} className="slide-up">
                    <div style={positionHeaderStyle}>
                      <h3 style={positionTitleStyle}>{position.title}</h3>
                      <div style={positionMetaStyle}>
                        <span style={metaItemStyle}>{position.department}</span>
                        <span style={metaItemStyle}>{position.location}</span>
                        <span style={metaItemStyle}>{position.type}</span>
                        <span style={metaItemStyle}>{position.experience}</span>
                      </div>
                    </div>
                    
                    <p style={positionDescriptionStyle}>{position.description}</p>
                    
                    <div style={requirementsStyle}>
                      <h4 style={requirementsTitleStyle}>Requirements:</h4>
                      <ul style={requirementsListStyle}>
                        {position.requirements.map((req, idx) => (
                          <li key={idx} style={requirementItemStyle}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      style={applyButtonStyle}
                      onClick={() => {
                        setActiveTab('apply');
                        setFormData(prev => ({ ...prev, position: position.title }));
                      }}
                    >
                      Apply for this Position
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === 'benefits' && (
            <div style={tabContentStyle} className="fade-in">
              <h2 style={tabTitleStyle}>Why Join SES?</h2>
              <p style={tabDescriptionStyle}>
                fjhjjfj
              </p>
              
              <div style={benefitsGridStyle}>
                {benefits.map((benefit, index) => (
                  <div key={benefit.title} style={benefitCardStyle} className="slide-up">
                    <div style={benefitIconStyle}>{benefit.icon}</div>
                    <h3 style={benefitTitleStyle}>{benefit.title}</h3>
                    <p style={benefitDescriptionStyle}>{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Apply Tab */}
          {activeTab === 'apply' && (
            <div style={tabContentStyle} className="fade-in">
              <h2 style={tabTitleStyle}>Apply Now</h2>
              <p style={tabDescriptionStyle}>
                Ready to join our team? Fill out the application form below and we'll get back to you soon.
              </p>
              
              <div style={applyGridStyle}>
                <div style={formContainerStyle}>
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
                      <label htmlFor="position" className="form-label">
                        Position Applying For *
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="form-select"
                        disabled={isSubmitting}
                      >
                        <option value="">Select a position</option>
                        {positions.map(position => (
                          <option key={position.title} value={position.title}>
                            {position.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="resume_link" className="form-label">
                        Resume/CV Link
                      </label>
                      <input
                        type="url"
                        id="resume_link"
                        name="resume_link"
                        value={formData.resume_link}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="https://linkedin.com/in/yourprofile or Google Drive link"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cover_letter" className="form-label">
                        Cover Letter
                      </label>
                      <textarea
                        id="cover_letter"
                        name="cover_letter"
                        value={formData.cover_letter}
                        onChange={handleChange}
                        rows="6"
                        className="form-textarea"
                        placeholder="Tell us about your experience, skills, and why you're interested in joining SES..."
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
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          Submitting Application...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </form>
                </div>

                <div style={infoSidebarStyle}>
                  <h3 style={sidebarTitleStyle}>Application Process</h3>
                  <div style={processStepsStyle}>
                    <div style={processStepStyle}>
                      <div style={stepNumberStyle}>1</div>
                      <div style={stepContentStyle}>
                        {/* <h4 style={stepTitleStyle}>Submit Application</h4>
                        <p style={stepDescriptionStyle}>Fill out the form with your details and experience</p> */}
                      </div>
                    </div>
                    <div style={processStepStyle}>
                      <div style={stepNumberStyle}>2</div>
                      <div style={stepContentStyle}>
                        {/* <h4 style={stepTitleStyle}>Technical Interview</h4>
                        <p style={stepDescriptionStyle}>Discuss your skills and experience with our team</p> */}
                      </div>
                    </div>
                    <div style={processStepStyle}>
                      <div style={stepNumberStyle}>3</div>
                      <div style={stepContentStyle}>
                        {/* <h4 style={stepTitleStyle}>Technical Assessment</h4>
                        <p style={stepDescriptionStyle}>Complete a practical assessment related to the role</p> */}
                      </div>
                    </div>
                    <div style={processStepStyle}>
                      <div style={stepNumberStyle}>4</div>
                      <div style={stepContentStyle}>
                        {/* <h4 style={stepTitleStyle}>Final Interview</h4>
                        <p style={stepDescriptionStyle}>Meet with leadership and discuss your fit</p> */}
                      </div>
                    </div>
                    <div style={processStepStyle}>
                      <div style={stepNumberStyle}>5</div>
                      <div style={stepContentStyle}>
                        {/* <h4 style={stepTitleStyle}>Offer</h4>
                        <p style={stepDescriptionStyle}>Receive and review your employment offer</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Styles
const pageStyle = {
  minHeight: '100vh'
};

const heroSectionStyle = {
  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
  color: 'white',
  padding: '6rem 0 4rem',
  textAlign: 'center'
};

const heroContentStyle = {
  maxWidth: '800px',
  margin: '0 auto'
};

const heroTitleStyle = {
  fontSize: '3rem',
  fontWeight: '700',
  marginBottom: '1.5rem'
};

const heroDescriptionStyle = {
  fontSize: '1.5rem',
  opacity: '0.9',
  fontWeight: '300',
  lineHeight: '1.6'
};

const tabsSectionStyle = {
  padding: '3rem 0 5rem',
  backgroundColor: 'white'
};

const tabsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '0',
  marginBottom: '3rem',
  borderBottom: '2px solid var(--border-light)',
  flexWrap: 'wrap'
};

const tabButtonStyle = {
  padding: '1rem 2rem',
  border: 'none',
  backgroundColor: 'transparent',
  color: '#666666',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  borderBottom: '3px solid transparent'
};

const activeTabButtonStyle = {
  color: 'var(--primary)',
  borderBottomColor: 'var(--primary)'
};

const tabContentStyle = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const tabTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#1a1a1a',
  marginBottom: '1rem',
  textAlign: 'center'
};

const tabDescriptionStyle = {
  fontSize: '1.25rem',
  color: '#666666',
  marginBottom: '3rem',
  textAlign: 'center',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const positionsGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2rem',
  maxWidth: '1000px',
  margin: '0 auto'
};

const positionCardStyle = {
  backgroundColor: 'var(--surface)',
  padding: '2.5rem',
  borderRadius: '16px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  border: '1px solid var(--border-light)',
  transition: 'all 0.3s ease'
};

const positionHeaderStyle = {
  marginBottom: '1.5rem'
};

const positionTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#1a1a1a',
  marginBottom: '1rem'
};

const positionMetaStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap'
};

const metaItemStyle = {
  backgroundColor: 'white',
  color: 'var(--primary)',
  padding: '0.375rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: '500',
  border: '1px solid var(--border)'
};

const positionDescriptionStyle = {
  color: '#666666',
  lineHeight: '1.6',
  marginBottom: '1.5rem',
  fontSize: '1.1rem'
};

const requirementsStyle = {
  marginBottom: '2rem'
};

const requirementsTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '1rem'
};

const requirementsListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
};

const requirementItemStyle = {
  padding: '0.5rem 0',
  color: '#333333',
  borderBottom: '1px solid var(--border-light)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const applyButtonStyle = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  border: 'none',
  padding: '1rem 2rem',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  width: '100%'
};

const benefitsGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2rem',
  maxWidth: '1000px',
  margin: '0 auto'
};

const benefitCardStyle = {
  backgroundColor: 'var(--surface)',
  padding: '2.5rem',
  borderRadius: '16px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid var(--border-light)'
};

const benefitIconStyle = {
  fontSize: '3rem',
  marginBottom: '1.5rem'
};

const benefitTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#1a1a1a',
  marginBottom: '1rem'
};

const benefitDescriptionStyle = {
  color: '#666666',
  lineHeight: '1.6'
};

const applyGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '3rem',
  maxWidth: '1000px',
  margin: '0 auto'
};

const formContainerStyle = {
  backgroundColor: 'var(--surface)',
  padding: '2.5rem',
  borderRadius: '16px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const alertStyle = {
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '1.5rem',
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

const infoSidebarStyle = {
  backgroundColor: 'var(--surface)',
  padding: '2.5rem',
  borderRadius: '16px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
};

const sidebarTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#1a1a1a',
  marginBottom: '2rem',
  textAlign: 'center'
};

const processStepsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const processStepStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem'
};

const stepNumberStyle = {
  width: '2.5rem',
  height: '2.5rem',
  backgroundColor: 'var(--primary)',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  fontWeight: '700',
  flexShrink: 0
};

const stepContentStyle = {
  flex: '1'
};

const stepTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '0.5rem'
};

const stepDescriptionStyle = {
  color: '#666666',
  fontSize: '0.9rem',
  lineHeight: '1.5'
};

// Media queries and hover effects
const style = document.createElement('style');
style.textContent = `
  @media (min-width: 768px) {
    div[style*="gridTemplateColumns: 1fr"][style*="benefitsGrid"] {
      gridTemplateColumns: 1fr 1fr !important;
    }
    
    div[style*="gridTemplateColumns: 1fr"][style*="applyGrid"] {
      gridTemplateColumns: 2fr 1fr !important;
    }
  }
  
  @media (min-width: 1024px) {
    div[style*="gridTemplateColumns: 1fr 1fr"][style*="benefitsGrid"] {
      gridTemplateColumns: 1fr 1fr 1fr !important;
    }
  }
  
  @media (max-width: 767px) {
    h1[style*="fontSize: 3rem"] {
      fontSize: 2.5rem !important;
    }
    
    h2[style*="fontSize: 2.5rem"] {
      fontSize: 2rem !important;
    }
    
    section {
      padding: 3rem 0 !important;
    }
    
    div[style*="padding: 2.5rem"] {
      padding: 2rem 1.5rem !important;
    }
    
    div[style*="gap: 1rem"][style*="positionMeta"] {
      gap: 0.5rem !important;
    }
  }
  
  button[style*="transition: all 0.3s ease"]:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  div[style*="transition: all 0.3s ease"]:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  li[style*="requirementItem"]:before {
    content: "✓";
    color: var(--accent);
    font-weight: bold;
  }
`;

if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}

export default CareersPage;