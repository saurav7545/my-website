import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedin, FaYoutube, FaUsers, FaCodeBranch, FaHandshake, FaPlayCircle } from 'react-icons/fa';
import ImageSlider from './ImageSlider';

const Social = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const socialImages = [
    '/images/logo1.svg',
    '/images/logo2.svg',
    '/images/logo3.svg',
    '/images/logo4.svg',
    '/images/logo5.svg'
  ];

  const socialPlatforms = [
    {
      icon: <FaInstagram />,
      name: 'Instagram',
      description: 'Follow my daily life and behind-the-scenes',
      stats: { icon: <FaUsers />, number: '500+', label: 'Followers' },
      link: 'https://www.instagram.com/saura_v75450/',
      color: '#E4405F',
      gradient: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
    },
    {
      icon: <FaGithub />,
      name: 'GitHub',
      description: 'Check out my coding projects and contributions',
      stats: { icon: <FaCodeBranch />, number: '10+', label: 'Repositories' },
      link: 'https://github.com/saurav7545',
      color: '#333',
      gradient: 'linear-gradient(135deg, #333 0%, #555 100%)'
    },
    {
      icon: <FaLinkedin />,
      name: 'LinkedIn',
      description: 'Connect professionally and view my experience',
      stats: { icon: <FaHandshake />, number: '100+', label: 'Connections' },
      link: 'https://www.linkedin.com/in/saurav7545/',
      color: '#0077B5',
      gradient: 'linear-gradient(135deg, #0077B5 0%, #005885 100%)',
      comingSoon: false
    },
    {
      icon: <FaYoutube />,
      name: 'YouTube',
      description: 'Watch my tutorials and project demos',
      stats: { icon: <FaPlayCircle />, number: '5+', label: 'Videos' },
      link: '#',
      color: '#FF0000',
      gradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
      comingSoon: true
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

  return (
    <section id="social" className="social-section" ref={ref}>
      <div className="container">
        <motion.div
          className="social-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="social-header" variants={itemVariants}>
            <div className="section-header">
              <ImageSlider 
                images={socialImages} 
                interval={4000} 
                className="section-logo-slider"
              />
              <h2 className="section-title">Connect With Me</h2>
            </div>
            <p className="section-subtitle">
              Follow my journey on social media
            </p>
          </motion.div>

          <motion.div className="social-grid" variants={containerVariants}>
            {socialPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="social-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="social-icon"
                  style={{ background: platform.gradient }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {platform.icon}
                </motion.div>

                <h3>{platform.name}</h3>
                <p>{platform.description}</p>

                <div className="social-stats">
                  <div className="stat-item">
                    {platform.stats.icon}
                    <span className="stat-number">{platform.stats.number}</span>
                    <span className="stat-label">{platform.stats.label}</span>
                  </div>
                </div>

                {platform.comingSoon ? (
                  <button className="social-btn coming-soon" disabled>
                    {platform.icon} Coming Soon
                  </button>
                ) : (
                  <motion.a
                    href={platform.link}
                    className="social-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ background: platform.gradient }}
                  >
                    {platform.icon} Follow on {platform.name}
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .social-section {
          background: var(--bg-light);
          padding: 100px 0;
        }

        .social-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .social-card {
          background: var(--bg-white);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-card::before {
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

        .social-card:hover::before {
          transform: scaleX(1);
        }

        .social-card:hover {
          box-shadow: var(--shadow-hover);
        }

        .social-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          color: white;
          transition: all 0.3s ease;
        }

        .social-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .social-card p {
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .social-stats {
          margin-bottom: 2rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--bg-light);
          border-radius: 10px;
          font-weight: 600;
        }

        .stat-item svg {
          color: var(--primary-color);
          font-size: 1.2rem;
        }

        .stat-number {
          font-size: 1.2rem;
          color: var(--text-dark);
        }

        .stat-label {
          color: var(--text-light);
          font-size: 0.9rem;
        }

        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .social-btn:hover::before {
          left: 100%;
        }

        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .social-btn.coming-soon {
          background: linear-gradient(135deg, #95a5a6, #7f8c8d);
          cursor: not-allowed;
        }

        .social-btn.coming-soon:hover {
          transform: none;
          box-shadow: none;
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
          .social-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .social-card {
            padding: 1.5rem;
          }

          .social-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Social;
