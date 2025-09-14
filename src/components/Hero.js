import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaProjectDiagram, FaExternalLinkAlt } from 'react-icons/fa';
import { ReactTyped } from 'react-typed';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
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
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
