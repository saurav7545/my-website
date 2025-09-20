import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUniversity, FaExternalLinkAlt, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import ImageSlider from './ImageSlider';

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const educationImages = [
    '/images/logo1.svg',
    '/images/logo2.svg',
    '/images/logo3.svg',
    '/images/logo4.svg',
    '/images/logo5.svg'
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
    <section className="education-section" ref={ref}>
      <div className="container">
        <motion.div
          className="education-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="education-header" variants={itemVariants}>
            <div className="section-header">
              <ImageSlider 
                images={educationImages} 
                interval={6000} 
                className="section-logo-slider"
              />
              <h2 className="section-title">Education & Academic Journey</h2>
            </div>
            <p className="section-subtitle">
              Pursuing excellence in Computer Science Engineering with a focus on practical learning and innovation
            </p>
          </motion.div>

          <motion.div className="education-card" variants={itemVariants}>
            

            <motion.div
              className="college-logo"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <FaUniversity />
            </motion.div>

            <h3 className="college-name">Shivalik College of Engineering</h3>
            
            <div className="college-details">
              <div className="detail-item">
                <FaGraduationCap />
                <span>Bachelor of Technology in Computer Science Engineering</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt />
                <span>Current Student | Dehradun, Uttarakhand</span>
              </div>
            </div>

            <motion.a
              href="https://shivalikcollege.edu.in/"
              className="visit-college-btn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none' }}
            >
              <FaExternalLinkAlt /> Visit College Website
            </motion.a>
          </motion.div>

          <motion.div className="academic-achievements" variants={itemVariants}>
            <h3>Academic Focus Areas</h3>
            <div className="achievements-grid">
              <motion.div
                className="achievement-item"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="achievement-icon">
                  <FaGraduationCap />
                </div>
                <h4>Web Development</h4>
                <p>Modern web technologies and frameworks</p>
              </motion.div>

              <motion.div
                className="achievement-item"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="achievement-icon">
                  <FaUniversity />
                </div>
                <h4>Data Structures</h4>
                <p>Algorithms and problem-solving with Python</p>
              </motion.div>

              <motion.div
                className="achievement-item"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="achievement-icon">
                  <FaGraduationCap />
                </div>
                <h4>Software Engineering</h4>
                <p>System design and development practices</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .education-section {
          background: var(--bg-light);
          padding: 100px 0;
        }

        .education-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .education-card {
          background: var(--bg-white);
          border-radius: 20px;
          padding: 3rem;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          margin-bottom: 3rem;
        }

        .education-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
        }

        .college-image {
          width: 200px;
          height: 120px;
          margin: 0 auto 2rem;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .college-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .college-logo {
          font-size: 3rem;
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }

        .college-name {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 2rem;
        }

        .college-details {
          margin-bottom: 2rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
          color: var(--text-light);
          font-size: 1.1rem;
        }

        .detail-item svg {
          color: var(--primary-color);
          font-size: 1.2rem;
        }

        .visit-college-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: var(--gradient-primary);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
        }

        .visit-college-btn:hover {
          box-shadow: var(--shadow-hover);
        }

        .academic-achievements {
          text-align: center;
        }

        .academic-achievements h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 2rem;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .achievement-item {
          background: var(--bg-white);
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .achievement-item:hover {
          box-shadow: var(--shadow-hover);
        }

        .achievement-icon {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .achievement-item h4 {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .achievement-item p {
          color: var(--text-light);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .education-card {
            padding: 2rem;
          }

          .college-name {
            font-size: 1.5rem;
          }

          .detail-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .achievement-item {
            padding: 1.5rem;
          }
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

        @media (max-width: 480px) {
          .education-section {
            padding: 60px 0;
          }

          .education-card {
            padding: 1.5rem;
          }

          .college-image {
            width: 150px;
            height: 90px;
          }
        }
      `}</style>
    </section>
  );
};

export default Education;
