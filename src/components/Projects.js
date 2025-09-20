import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCalculator, FaTasks, FaLaptopCode, FaExternalLinkAlt, FaGithub ,FaYoutube} from 'react-icons/fa';
import ImageSlider from './ImageSlider';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

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
      demoLink: '#',
      githubLink: 'https://github.com/saurav7545/calculator.git',
      status: 'demo-coming-soon'
    },
    {
      id: 2,
      icon: <FaTasks />,
      title: 'Student Todo List',
      description: 'A comprehensive todo application designed specifically for students with study planning features.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React.js'],
      demoLink: 'https://indiantodolist.netlify.app/login/login.html',
      githubLink: 'https://github.com/saurav7545/todolist.git',
      status: 'live'
    },
    {
      id: 3,
      icon: <FaYoutube />,
      title: 'Youtube audio downloader',
      description: 'Download youtube audio in mp4 format. Two options for downloading audio through playlist: 1. single link and 2. multiple links through playlist. Visit my GitHub page for more details.',
      technologies: ['python', 'python library'],
      demoLink: '',
      githubLink: 'https://github.com/saurav7545/youtube_audio_download',
      status: 'live'
    },
    
    {
      id: 4,
      icon: <FaLaptopCode />,
      title: 'Bus tracking system',
      description: 'A modern, responsive portfolio showcasing skills and projects with beautiful animations.',
      technologies: ['React.js', 'CSS3', 'JavaScript', 'Framer Motion'],
      demoLink: '#',
      githubLink: '#',
      status: 'current'
    }
  ];

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
          </motion.div>

          <motion.div className="projects-grid" variants={containerVariants}>
            {projects.map((project) => (
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

        .projects-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .project-card {
          background: var(--bg-white);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
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
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .project-description {
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .tech-tag {
          background: var(--gradient-primary);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
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
