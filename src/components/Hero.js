import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaProjectDiagram, FaExternalLinkAlt } from 'react-icons/fa';
import { ReactTyped } from 'react-typed';
import ImageSlider from './ImageSlider';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const backgroundImages = [
    '/images/bg1.svg',
    '/images/logo1.svg',
    '/images/logo2.svg',
    '/images/logo3.svg',
    '/images/logo4.svg'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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
    <section id="home" className="hero-section">
      <motion.div
        className="hero-background"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
      
      <div className="hero-image-slider">
        <ImageSlider 
          images={backgroundImages} 
          interval={6000} 
          className="background-slider"
        />
      </div>
      
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-text" variants={itemVariants}>
          <motion.h1
            className="hero-title"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Saurav Kumar
          </motion.h1>
          
          <motion.h2 className="hero-subtitle" variants={itemVariants}>
            <ReactTyped
              strings={[
                'Computer Science Engineering Student',
                'Web Developer',
                'Problem Solver',
                'Tech Enthusiast'
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
              showCursor
              cursorChar="|"
            />
          </motion.h2>
          
          <motion.p className="hero-description" variants={itemVariants}>
            Passionate about technology, innovation, and creating solutions that make a difference.
            Currently pursuing Computer Science Engineering at Shivalik College of Engineering,
            specializing in web development, algorithms, and software engineering.
          </motion.p>
        </motion.div>

        <motion.div className="cta-buttons" variants={itemVariants}>
          <motion.a
            href="/about-person"
            className="btn btn-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUser /> Personal About Me
          </motion.a>
          
          <motion.a
            href="#projects"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <FaProjectDiagram /> View Projects
          </motion.a>
          
          <motion.a
            href="/projects"
            className="btn btn-outline"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt /> View All Projects
          </motion.a>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="scroll-arrow">
            <div className="scroll-line"></div>
            <div className="scroll-arrow-head"></div>
          </div>
          <span>Scroll Down</span>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-attachment: fixed;
        }

        .hero-background {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-image-slider {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0.3;
        }

        .background-slider {
          width: 100%;
          height: 100%;
        }

        .background-slider .slider-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .background-slider .slider-dots {
          display: none;
        }

        .hero-content {
          text-align: center;
          color: white;
          z-index: 2;
          position: relative;
          max-width: 800px;
          padding: 0 20px;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 2rem;
          opacity: 0.9;
          min-height: 2rem;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 3rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: white;
          opacity: 0.7;
          font-size: 0.9rem;
        }

        .scroll-arrow {
          position: relative;
          width: 2px;
          height: 30px;
        }

        .scroll-line {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 1px;
        }

        .scroll-arrow-head {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 6px solid white;
        }

        /* Smart TV and Large Displays */
        @media (min-width: 2560px) {
          .hero-section {
            min-height: 100vh;
            padding: 4rem 0;
          }

          .hero-content {
            padding: 4rem 3rem;
          }

          .hero-title {
            font-size: 6rem;
            margin-bottom: 2rem;
          }

          .hero-subtitle {
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }

          .hero-description {
            font-size: 1.8rem;
            margin-bottom: 3rem;
            max-width: 1000px;
          }

          .cta-buttons {
            gap: 2rem;
          }

          .btn {
            padding: 1.5rem 3rem;
            font-size: 1.4rem;
          }
        }

        /* Large Desktop Displays */
        @media (min-width: 1920px) and (max-width: 2559px) {
          .hero-section {
            min-height: 100vh;
            padding: 3rem 0;
          }

          .hero-content {
            padding: 3rem 2rem;
          }

          .hero-title {
            font-size: 6rem;
            line-height: 1;
            margin-bottom: 1.5rem;
            white-space: nowrap;
          }

          .hero-subtitle {
            font-size: 2.5rem;
            line-height: 1;
            margin-bottom: 1.5rem;
            white-space: nowrap;
          }

          .hero-description {
            font-size: 1.6rem;
            line-height: 1.6;
            margin-bottom: 2.5rem;
            max-width: 900px;
          }

          .cta-buttons {
            gap: 1.5rem;
          }

          .btn {
            padding: 1.2rem 2.5rem;
            font-size: 1.2rem;
          }
        }

        /* Standard Desktop */
        @media (min-width: 1200px) and (max-width: 1919px) {
          .hero-content {
            padding: 2.5rem 1.5rem;
          }

          .hero-title {
            font-size: 5rem;
            line-height: 1;
            margin-bottom: 1.5rem;
            white-space: nowrap;
          }

          .hero-subtitle {
            font-size: 2.2rem;
            line-height: 1;
            margin-bottom: 1.5rem;
            white-space: nowrap;
          }

          .hero-description {
            font-size: 1.4rem;
            line-height: 1.6;
            max-width: 800px;
            margin-bottom: 3rem;
          }

          .cta-buttons {
            gap: 2rem;
          }

          .btn {
            padding: 1rem 2rem;
            font-size: 1.1rem;
          }
        }

        /* Tablet Landscape */
        @media (min-width: 768px) and (max-width: 1199px) {
          .hero-content {
            padding: 2rem 1rem;
          }

          .hero-title {
            font-size: 3.5rem;
          }

          .hero-subtitle {
            font-size: 1.5rem;
          }

          .hero-description {
            font-size: 1.1rem;
            max-width: 600px;
          }

          .btn {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
        }

        /* Tablet Portrait */
        @media (min-width: 481px) and (max-width: 767px) {
          .hero-content {
            text-align: center;
            padding: 2rem 1rem;
          }

          .hero-title {
            font-size: 3rem;
          }

          .hero-subtitle {
            font-size: 1.3rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 350px;
          }
        }

        /* Mobile Devices */
        @media (max-width: 480px) {
          .hero-content {
            padding: 1.5rem 0.5rem;
          }

          .hero-title {
            font-size: 2rem;
            line-height: 1.2;
            margin-bottom: 1rem;
          }

          .hero-subtitle {
            font-size: 1rem;
            line-height: 1.3;
            margin-bottom: 1rem;
          }

          .hero-description {
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 2rem;
          }

          .cta-buttons {
            gap: 1rem;
          }

          .btn {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
            max-width: 280px;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 320px) {
          .hero-content {
            padding: 1rem 0.25rem;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-subtitle {
            font-size: 0.9rem;
          }

          .hero-description {
            font-size: 0.8rem;
          }

          .btn {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
            max-width: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
