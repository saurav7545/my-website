import React, { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaTasks, FaLaptopCode, FaExternalLinkAlt, FaGithub, FaYoutube, FaSearch, FaFilter } from 'react-icons/fa';
import ImageSlider from './ImageSlider';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projectImages = [
    '/images/logo1.svg',
    '/images/logo2.svg',
    '/images/logo3.svg',
    '/images/logo4.svg',
    '/images/logo5.svg'
  ];

  const projects = [
    {
      id: 1,
      icon: <FaCalculator />,
      title: 'Advanced Calculator',
      description: 'A feature-rich calculator with scientific functions, history tracking, and modern UI design.',
      technologies: ['JavaScript', 'CSS3', 'HTML5', 'Math.js'],
      demoLink: 'https://calsk.netlify.app/',
      githubLink: 'https://github.com/saurav7545/calculator.git',
      status: 'live',
      category: 'web'
    },
    {
      id: 2,
      icon: <FaTasks />,
      title: 'Student Todo List',
      description: 'A comprehensive todo application designed specifically for students with study planning features.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React.js'],
      demoLink: 'https://indiantodolist.netlify.app/login/login.html',
      githubLink: 'https://github.com/saurav7545/todolist.git',
      status: 'live',
      category: 'web'
    },
    {
      id: 3,
      icon: <FaYoutube />,
      title: 'Youtube audio downloader',
      description: 'Download youtube audio in mp4 format. Two options for downloading audio through playlist: 1. single link and 2. multiple links through playlist. Visit my GitHub page for more details.',
      technologies: ['python', 'python library'],
      demoLink: '#',
      githubLink: 'https://github.com/saurav7545/youtube_audio_download',
      status: 'github',
      category: 'python'
    },
    {
      id: 4,
      icon: <FaLaptopCode />,
      title: 'SmartBus',
      description: 'A bus tracking system that allows you to track the location of a bus in real-time. It uses the Google Maps API to display the bus location on a map.',
      technologies: ['React.js', 'CSS3', 'MySQL Database', 'Framer Motion','Django'],
      demoLink: '#',
      githubLink: 'https://github.com/saurav7545/SmartBus.git',
      status: 'github',
      category: 'fullstack'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'web', label: 'Web Development' },
    { value: 'python', label: 'Python' },
    { value: 'fullstack', label: 'Full Stack' }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = selectedFilter === 'all' || project.category === selectedFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'live':
        return <span className="status-badge live">Live</span>;
      case 'demo-coming-soon':
        return <span className="status-badge coming-soon">Demo Coming Soon</span>;
      case 'current':
        return <span className="status-badge current">Current Project</span>;
      case 'github':
        return <span className="status-badge github-only">GitHub Project</span>;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <motion.div
          className="projects-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="projects-header" variants={itemVariants}>
            <div className="section-header">
              <ImageSlider 
                images={projectImages} 
                interval={4500} 
                className="section-logo-slider"
              />
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <p className="section-subtitle">
              Explore some of my latest work and technical achievements
            </p>
            
            <div className="projects-controls">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filter-buttons">
                <FaFilter className="filter-icon" />
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`filter-btn ${selectedFilter === option.value ? 'active' : ''}`}
                    onClick={() => setSelectedFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {filteredProjects.length === 0 && (
              <motion.div
                className="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>No projects found matching your search.</p>
              </motion.div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div className="projects-grid" variants={containerVariants}>
              {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-header">
                  <motion.div 
                    className="project-icon"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {project.icon}
                  </motion.div>
                  {getStatusBadge(project.status)}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.status === 'live' ? (
                    <a
                      href={project.demoLink}
                      className="project-link demo-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  ) : project.status === 'demo-coming-soon' ? (
                    <span className="project-link coming-soon-link">
                      <FaExternalLinkAlt /> Demo Coming Soon
                    </span>
                  ) : 
                  project.status === 'github' ? (
                    <span className="project-link github-project-link">
                      <FaGithub /> Code Only github
                    </span>
                  ) : (
                    <span className="project-link current-link">
                      <FaExternalLinkAlt /> Current Project
                    </span>
                  )}

                  {project.githubLink !== '#' && (
                    <a
                      href={project.githubLink}
                      className="project-link github-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> Source Code
                    </a>
                  )}
                </div>
              </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div className="view-all-projects" variants={itemVariants}>
            <motion.a
              href="/projects"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt /> View All Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .projects-section {
          background: var(--bg-light);
          padding: 100px 0;
        }
        .status-badge.github-project {
  background: linear-gradient(135deg,rgb(26, 69, 213), #8e44ad);
  color: white;
}

.github-project-link {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
  cursor: not-allowed;
}


        .projects-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .projects-controls {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }

        .search-box {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--neon-green);
          font-size: 1.2rem;
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid var(--neon-green);
          border-radius: 25px;
          color: var(--neon-green);
          font-size: 1rem;
          font-family: 'Courier New', monospace;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        }

        .search-input:focus {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
          background: rgba(0, 0, 0, 0.7);
        }

        .search-input::placeholder {
          color: rgba(0, 255, 65, 0.5);
        }

        .filter-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .filter-icon {
          color: var(--neon-cyan);
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(0, 255, 65, 0.3);
          border-radius: 25px;
          color: var(--neon-green);
          font-family: 'Courier New', monospace;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .filter-btn:hover {
          border-color: var(--neon-cyan);
          color: var(--neon-cyan);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #00ff41, #00ffff);
          border-color: var(--neon-cyan);
          color: #000;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.6);
          font-weight: 700;
        }

        .no-results {
          text-align: center;
          padding: 3rem;
          color: var(--neon-cyan);
          font-family: 'Courier New', monospace;
          font-size: 1.2rem;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .project-card {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--shadow);
          border: 2px solid var(--neon-green);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 0 20px rgba(0, 255, 65, 0.3),
            inset 0 0 20px rgba(0, 255, 65, 0.1);
        }

        .project-card:hover {
          border-color: var(--neon-cyan);
          box-shadow: 
            0 0 30px rgba(0, 255, 255, 0.5),
            inset 0 0 30px rgba(0, 255, 255, 0.15);
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .project-card:hover::before {
          transform: scaleX(1);
        }

        .project-card:hover {
          box-shadow: var(--shadow-hover);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .project-icon {
          font-size: 3rem;
          color: var(--primary-color);
          transition: all 0.3s ease;
        }

        .status-badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge.live {
          background: linear-gradient(135deg, #2ecc71, #27ae60);
          color: white;
        }

        .status-badge.coming-soon {
          background: linear-gradient(135deg, #f39c12, #e67e22);
          color: white;
        }

        .status-badge.current {
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--neon-green);
          margin-bottom: 1rem;
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
          font-family: 'Courier New', monospace;
        }

        .project-description {
          color: var(--neon-cyan);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
          font-family: 'Courier New', monospace;
        }

        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .tech-tag {
          background: linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 255, 255, 0.2));
          color: var(--neon-green);
          padding: 0.4rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(0, 255, 65, 0.3);
          font-family: 'Courier New', monospace;
          text-shadow: 0 0 5px rgba(0, 255, 65, 0.6);
        }

        .project-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .project-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .project-link:hover::before {
          left: 100%;
        }

        .demo-link {
          background: linear-gradient(135deg, #2ecc71, #27ae60);
          color: white;
        }

        .demo-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(46, 204, 113, 0.4);
        }

        .github-link {
          background: linear-gradient(135deg, #34495e, #2c3e50);
          color: white;
        }

        .github-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(52, 73, 94, 0.4);
        }

        .coming-soon-link,
        .current-link {
          background: linear-gradient(135deg, #95a5a6, #7f8c8d);
          color: white;
          cursor: not-allowed;
        }

        .view-all-projects {
          text-align: center;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .section-logo {
          height: 40px;
          width: auto;
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .section-logo:hover {
          opacity: 1;
          transform: scale(1.05);
        }

        .section-logo-slider {
          width: 40px;
          height: 40px;
        }

        .section-logo-slider .slider-image {
          width: 40px;
          height: 40px;
        }

        .section-logo-slider .slider-dots {
          display: none;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .project-card {
            padding: 1.5rem;
          }

          .project-links {
            flex-direction: column;
          }

          .project-link {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
