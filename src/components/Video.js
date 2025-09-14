import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPlay, FaPlayCircle } from 'react-icons/fa';
import ImageSlider from './ImageSlider';

const Video = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [activeTab, setActiveTab] = useState('intro');

  const videoImages = [
    '/images/logo1.svg',
    '/images/logo2.svg',
    '/images/logo3.svg',
    '/images/logo4.svg',
    '/images/logo5.svg'
  ];

  const videoTabs = [
    { id: 'intro', label: 'Introduction' },
    { id: 'projects', label: 'Project Demos' },
    { id: 'tutorials', label: 'Tutorials' }
  ];

  const videoContent = {
    intro: {
      title: 'Introduction Video',
      description: 'Coming Soon - A personal introduction video showcasing my journey, skills, and aspirations.',
      placeholder: true
    },
    projects: [
      {
        title: 'Advanced Calculator Demo',
        description: 'Watch the calculator in action with all its features',
        thumbnail: 'calculator-thumb.jpg'
      },
      {
        title: 'Todo App Demo',
        description: 'See how the student todo application works',
        thumbnail: 'todo-thumb.jpg'
      }
    ],
    tutorials: [
      {
        title: 'Web Development Basics',
        description: 'Learn HTML, CSS, and JavaScript fundamentals',
        thumbnail: 'web-dev-thumb.jpg'
      },
      {
        title: 'React.js Tutorial',
        description: 'Build modern web applications with React',
        thumbnail: 'react-thumb.jpg'
      }
    ]
  };

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

  const playVideo = (type) => {
    alert(`${type} video will be available soon!`);
  };

  return (
    <section id="video" className="video-section" ref={ref}>
      <div className="container">
        <motion.div
          className="video-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="video-header" variants={itemVariants}>
            <div className="section-header">
              <ImageSlider 
                images={videoImages} 
                interval={5500} 
                className="section-logo-slider"
              />
              <h2 className="section-title">Video Introduction</h2>
            </div>
            <p className="section-subtitle">
              Watch my introduction video to know more about me
            </p>
          </motion.div>

          <motion.div className="video-tabs" variants={itemVariants}>
            {videoTabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`video-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div className="video-tab-content" variants={itemVariants}>
            {activeTab === 'intro' && (
              <motion.div
                className="video-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="video-placeholder">
                  <motion.div
                    className="play-icon"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaPlayCircle />
                  </motion.div>
                  <h3>{videoContent.intro.title}</h3>
                  <p>{videoContent.intro.description}</p>
                  <motion.button
                    className="video-btn"
                    onClick={() => playVideo('intro')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlay /> Watch Video
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                className="video-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {videoContent.projects.map((video, index) => (
                  <motion.div
                    key={index}
                    className="video-item"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="video-thumbnail">
                      <img
                        src={`/assets/images/${video.thumbnail}`}
                        alt={video.title}
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180"><rect width="300" height="180" fill="%23667eea"/><text x="150" y="90" text-anchor="middle" fill="white" font-size="18">${video.title}</text></svg>`;
                        }}
                      />
                      <div className="video-overlay">
                        <motion.div
                          className="play-button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaPlay />
                        </motion.div>
                      </div>
                    </div>
                    <h4>{video.title}</h4>
                    <p>{video.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'tutorials' && (
              <motion.div
                className="video-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {videoContent.tutorials.map((video, index) => (
                  <motion.div
                    key={index}
                    className="video-item"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="video-thumbnail">
                      <img
                        src={`/assets/images/${video.thumbnail}`}
                        alt={video.title}
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180"><rect width="300" height="180" fill="%23667eea"/><text x="150" y="90" text-anchor="middle" fill="white" font-size="18">${video.title}</text></svg>`;
                        }}
                      />
                      <div className="video-overlay">
                        <motion.div
                          className="play-button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaPlay />
                        </motion.div>
                      </div>
                    </div>
                    <h4>{video.title}</h4>
                    <p>{video.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .video-section {
          background: var(--bg-white);
          padding: 100px 0;
        }

        .video-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .video-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .video-tab {
          padding: 1rem 2rem;
          border: 2px solid var(--primary-color);
          background: transparent;
          color: var(--primary-color);
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .video-tab:hover,
        .video-tab.active {
          background: var(--gradient-primary);
          color: white;
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }

        .video-tab-content {
          min-height: 400px;
        }

        .video-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .video-placeholder {
          text-align: center;
          padding: 3rem;
          background: var(--bg-light);
          border-radius: 20px;
          box-shadow: var(--shadow);
          max-width: 500px;
        }

        .play-icon {
          font-size: 4rem;
          color: var(--primary-color);
          margin-bottom: 2rem;
          cursor: pointer;
        }

        .video-placeholder h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .video-placeholder p {
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .video-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: var(--gradient-primary);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .video-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .video-item {
          background: var(--bg-white);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .video-item:hover {
          box-shadow: var(--shadow-hover);
        }

        .video-thumbnail {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .video-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .video-item:hover .video-thumbnail img {
          transform: scale(1.1);
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-item:hover .video-overlay {
          opacity: 1;
        }

        .play-button {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--primary-color);
          transition: all 0.3s ease;
        }

        .video-item h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-dark);
          margin: 1rem 0 0.5rem 1rem;
        }

        .video-item p {
          color: var(--text-light);
          margin: 0 0 1rem 1rem;
          line-height: 1.5;
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
          .video-tabs {
            gap: 0.5rem;
          }

          .video-tab {
            padding: 0.8rem 1.5rem;
            font-size: 0.9rem;
          }

          .video-grid {
            grid-template-columns: 1fr;
          }

          .video-placeholder {
            padding: 2rem;
            margin: 0 1rem;
          }

          .play-icon {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Video;
