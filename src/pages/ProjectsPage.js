import React, { useState, useEffect } from 'react';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Software', 'Hardware', 'Research'];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div className="container">
          <div style={loadingContentStyle}>
            <div className="spinner" style={spinnerStyle}></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div className="container">
          <div style={heroContentStyle}>
            <h1 style={heroTitleStyle}>Our Projects</h1>
            <p style={heroDescriptionStyle}>
              Showcasing our innovative work in defense technology - from embedded systems 
              to mission-critical software applications.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section style={projectsSectionStyle}>
        <div className="container">
          {/* Category Filter */}
          <div style={filterStyle}>
            {categories.map(category => (
              <button
                key={category}
                style={{
                  ...filterButtonStyle,
                  ...(selectedCategory === category ? activeFilterButtonStyle : {})
                }}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div style={projectsGridStyle}>
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                style={projectCardStyle}
                className="slide-up hover-lift"
              >
                <div style={projectImageStyle}>
                  <div style={imagePlaceholderStyle}>
                    <div style={placeholderIconStyle}>🔬</div>
                  </div>
                  <div style={projectStatusStyle(project.status)}>
                    {project.status}
                  </div>
                </div>
                
                <div style={projectContentStyle}>
                  <div style={projectCategoryStyle}>{project.category}</div>
                  <h3 style={projectTitleStyle}>{project.title}</h3>
                  <p style={projectDescriptionStyle}>{project.description}</p>
                  
                  <div style={technologiesStyle}>
                    <h4 style={technologiesTitleStyle}>Technologies</h4>
                    <div style={techTagsStyle}>
                      {project.technologies?.split(', ').map((tech, idx) => (
                        <span key={idx} style={techTagStyle}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={projectMetaStyle}>
                    <div style={metaItemStyle}>
                      <svg style={metaIconStyle} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>📁</div>
              <h3 style={emptyTitleStyle}>No projects found</h3>
              <p style={emptyDescriptionStyle}>
                No projects match the selected category. Please try another filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaSectionStyle}>
        <div className="container">
          <div style={ctaContentStyle}>
            <h2 style={ctaTitleStyle}>Have a Project in Mind?</h2>
            <p style={ctaDescriptionStyle}>
              Let's discuss how we can help bring your defense technology project to life 
              with our expertise in software and electronics engineering.
            </p>
            <a href="/contact" className="btn btn-primary" style={ctaButtonStyle}>
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Styles
const pageStyle = {
  minHeight: '100vh'
};

const loadingStyle = {
  padding: '5rem 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh'
};

const loadingContentStyle = {
  textAlign: 'center',
  color: '#666666'
};

const spinnerStyle = {
  width: '3rem',
  height: '3rem',
  margin: '0 auto 1rem',
  borderWidth: '3px'
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

const projectsSectionStyle = {
  padding: '5rem 0',
  backgroundColor: 'white'
};

const filterStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginBottom: '3rem',
  flexWrap: 'wrap'
};

const filterButtonStyle = {
  padding: '0.75rem 1.5rem',
  border: '2px solid var(--border)',
  backgroundColor: 'white',
  color: '#666666',
  borderRadius: '25px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: '500',
  transition: 'all 0.3s ease'
};

const activeFilterButtonStyle = {
  backgroundColor: 'var(--primary)',
  color: 'white',
  borderColor: 'var(--primary)'
};

const projectsGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2rem'
};

const projectCardStyle = {
  backgroundColor: 'var(--surface)',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  border: '1px solid var(--border-light)'
};

const projectImageStyle = {
  position: 'relative',
  height: '200px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const imagePlaceholderStyle = {
  textAlign: 'center',
  color: '#cbd5e1'
};

const placeholderIconStyle = {
  fontSize: '3rem',
  marginBottom: '0.5rem'
};

const projectStatusStyle = (status) => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  padding: '0.375rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: '600',
  backgroundColor: status === 'completed' ? '#10b981' : 
                   status === 'ongoing' ? '#f59e0b' : '#8b5cf6',
  color: 'white'
});

const projectContentStyle = {
  padding: '2rem'
};

const projectCategoryStyle = {
  display: 'inline-block',
  backgroundColor: 'rgba(0, 102, 255, 0.1)',
  color: 'var(--primary)',
  padding: '0.375rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: '600',
  marginBottom: '1rem'
};

const projectTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#1a1a1a',
  marginBottom: '1rem'
};

const projectDescriptionStyle = {
  color: '#666666',
  lineHeight: '1.6',
  marginBottom: '1.5rem'
};

const technologiesStyle = {
  marginBottom: '1.5rem'
};

const technologiesTitleStyle = {
  fontSize: '1rem',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '0.75rem'
};

const techTagsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const techTagStyle = {
  backgroundColor: 'white',
  color: 'var(--primary)',
  padding: '0.375rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: '500',
  border: '1px solid var(--border)'
};

const projectMetaStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  paddingTop: '1rem',
  borderTop: '1px solid var(--border-light)'
};

const metaItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#666666',
  fontSize: '0.9rem'
};

const metaIconStyle = {
  width: '1rem',
  height: '1rem'
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '4rem 2rem',
  color: '#666666'
};

const emptyIconStyle = {
  fontSize: '4rem',
  marginBottom: '1.5rem',
  opacity: '0.5'
};

const emptyTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '1rem'
};

const emptyDescriptionStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.6'
};

const ctaSectionStyle = {
  padding: '5rem 0',
  backgroundColor: 'var(--surface)',
  textAlign: 'center'
};

const ctaContentStyle = {
  maxWidth: '600px',
  margin: '0 auto'
};

const ctaTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#1a1a1a',
  marginBottom: '1.5rem'
};

const ctaDescriptionStyle = {
  fontSize: '1.25rem',
  color: '#666666',
  marginBottom: '2.5rem',
  lineHeight: '1.6'
};

const ctaButtonStyle = {
  fontSize: '1.1rem',
  padding: '1rem 2rem'
};

// Media queries and hover effects
const style = document.createElement('style');
style.textContent = `
  @media (min-width: 768px) {
    div[style*="gridTemplateColumns: 1fr"][style*="projectsGrid"] {
      gridTemplateColumns: 1fr 1fr !important;
    }
  }
  
  @media (max-width: 767px) {
    h1[style*="fontSize: 3rem"] {
      fontSize: 2.5rem !important;
    }
    
    section {
      padding: 3rem 0 !important;
    }
    
    div[style*="padding: 2rem"] {
      padding: 1.5rem !important;
    }
  }
  
  button[style*="transition: all 0.3s ease"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  div[style*="transition: all 0.3s ease"]:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}

export default ProjectsPage;