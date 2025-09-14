import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCamera, FaImages } from 'react-icons/fa';
import ImageSlider from './ImageSlider';

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const galleryImages = [
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
    <section id="gallery" className="gallery-section" ref={ref}>
      <div className="container">
        <motion.div
          className="gallery-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="gallery-header" variants={itemVariants}>
            <div className="section-header">
              <ImageSlider 
                images={galleryImages} 
                interval={5000} 
                className="section-logo-slider"
              />
              <h2 className="section-title">Photo Gallery</h2>
            </div>
            <p className="section-subtitle">
              A glimpse into my journey and experiences
            </p>
          </motion.div>

          <motion.div className="gallery-filters" variants={itemVariants}>
            <button className="filter-btn active" data-filter="all">
              All
            </button>
            <button className="filter-btn" data-filter="personal">
              Personal
            </button>
            <button className="filter-btn" data-filter="professional">
              Professional
            </button>
            <button className="filter-btn" data-filter="projects">
              Projects
            </button>
          </motion.div>

          <motion.div className="coming-soon-container" variants={itemVariants}>
            <motion.div
              className="coming-soon-content"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="coming-soon-icon"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FaCamera />
              </motion.div>
              <h3>Gallery Coming Soon</h3>
              <p>
                I'm working on curating a collection of photos that showcase my journey,
                projects, and experiences. Check back soon for updates!
              </p>
              <div className="coming-soon-features">
                <div className="feature-item">
                  <FaImages />
                  <span>Project Screenshots</span>
                </div>
                <div className="feature-item">
                  <FaCamera />
                  <span>Behind the Scenes</span>
                </div>
                <div className="feature-item">
                  <FaImages />
                  <span>Learning Journey</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .gallery-section {
          background: var(--bg-white);
          padding: 100px 0;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .gallery-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.8rem 1.5rem;
          border: 2px solid var(--primary-color);
          background: transparent;
          color: var(--primary-color);
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: var(--gradient-primary);
          color: white;
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }

        .coming-soon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .coming-soon-content {
          text-align: center;
          max-width: 600px;
          padding: 3rem;
          background: var(--bg-light);
          border-radius: 20px;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .coming-soon-icon {
          font-size: 4rem;
          color: var(--primary-color);
          margin-bottom: 2rem;
        }

        .coming-soon-content h3 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .coming-soon-content p {
          font-size: 1.1rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .coming-soon-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--bg-white);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow);
        }

        .feature-item svg {
          font-size: 1.5rem;
          color: var(--primary-color);
        }

        .feature-item span {
          font-weight: 600;
          color: var(--text-dark);
          font-size: 0.9rem;
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
          .gallery-filters {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }

          .coming-soon-content {
            padding: 2rem;
            margin: 0 1rem;
          }

          .coming-soon-icon {
            font-size: 3rem;
          }

          .coming-soon-content h3 {
            font-size: 1.5rem;
          }

          .coming-soon-features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
