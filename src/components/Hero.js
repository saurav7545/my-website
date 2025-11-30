import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaProjectDiagram, FaExternalLinkAlt } from 'react-icons/fa';
import { ReactTyped } from 'react-typed';
import ImageSlider from './ImageSlider';

const highlightBadges = [
  { label: 'Focus', value: 'Full Stack • Cloud • UI' },
  { label: 'Currently', value: 'Building immersive web systems' },
  { label: 'Open For', value: 'Internships & freelance collabs' },
];

const stats = [
  { label: 'Live Projects on Github', value: '12+' },
  { label: 'Users Impacted', value: '10K+' },
  { label: 'Hackathon participation', value: '01' },
];

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
            style={{ color: '#ffffff' }}
          >
            Hi, I'm Saurav
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

        <motion.div
          className="hero-highlight-grid"
          variants={itemVariants}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 10 }}
        >
          {highlightBadges.map((badge) => (
            <div className="highlight-card" key={badge.label}>
              <p className="badge-label">{badge.label}</p>
              <p className="badge-value">{badge.value}</p>
            </div>
          ))}
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

        <motion.div className="hero-stats" variants={itemVariants}>
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
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
          background: #000000;
          background-image: 
            linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 20% 30%, rgba(0, 255, 65, 0.1), transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.1), transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(176, 38, 255, 0.1), transparent 50%);
          background-size: 100px 100px, 100px 100px, 800px 800px, 800px 800px, 600px 600px;
          background-position: 0 0, 0 0, 0 0, 0 0, 0 0;
          animation: matrixMove 15s linear infinite, pulseGlow 4s ease-in-out infinite;
          padding-top: 70px;
        }

        @keyframes matrixMove {
          0% { background-position: 0 0, 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 100px 100px, 100px 100px, 200px 200px, -200px -200px, 100px -100px; }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 100px rgba(0, 255, 65, 0.3), inset 0 0 100px rgba(0, 255, 65, 0.1); }
          50% { box-shadow: 0 0 150px rgba(0, 255, 255, 0.4), inset 0 0 150px rgba(0, 255, 255, 0.15); }
        }

        .hero-section::before,
        .hero-section::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(150px);
          opacity: 0.4;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, -50px) scale(1.1); }
        }

        .hero-section::before {
          top: 5%;
          left: 10%;
          background: rgba(0, 255, 65, 0.3);
          animation-delay: 0s;
        }

        .hero-section::after {
          bottom: 5%;
          right: 10%;
          background: rgba(0, 255, 255, 0.3);
          animation-delay: 3s;
        }

        .hero-background {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background:
            radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%),
            repeating-linear-gradient(
              0deg,
              rgba(248, 250, 252, 0.05) 0,
              rgba(248, 250, 252, 0.05) 1px,
              transparent 1px,
              transparent 60px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(248, 250, 252, 0.05) 0,
              rgba(248, 250, 252, 0.05) 1px,
              transparent 1px,
              transparent 60px
            );
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
          color: var(--neon-green);
          z-index: 2;
          position: relative;
          max-width: 920px;
          padding: 3rem 1.5rem;
          border-radius: 32px;
          backdrop-filter: blur(18px);
          background: rgba(0, 0, 0, 0.7);
          border: 2px solid var(--neon-green);
          box-shadow: 
            0 0 30px rgba(0, 255, 65, 0.5),
            0 0 60px rgba(0, 255, 65, 0.3),
            inset 0 0 30px rgba(0, 255, 65, 0.1);
          animation: borderPulse 3s ease-in-out infinite;
        }

        @keyframes borderPulse {
          0%, 100% { 
            border-color: var(--neon-green);
            box-shadow: 
              0 0 30px rgba(0, 255, 65, 0.5),
              0 0 60px rgba(0, 255, 65, 0.3),
              inset 0 0 30px rgba(0, 255, 65, 0.1);
          }
          50% { 
            border-color: var(--neon-cyan);
            box-shadow: 
              0 0 40px rgba(0, 255, 255, 0.6),
              0 0 80px rgba(0, 255, 255, 0.4),
              inset 0 0 40px rgba(0, 255, 255, 0.15);
          }
        }

        .hero-text {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #00ff41, #00ffff, #b026ff, #ff00ff, #ffff00);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 
            0 0 20px rgba(0, 255, 65, 0.8),
            0 0 40px rgba(0, 255, 65, 0.6),
            0 0 60px rgba(0, 255, 65, 0.4);
          line-height: 1.2;
          word-wrap: break-word;
          white-space: normal;
          display: block;
          width: 100%;
          opacity: 1 !important;
          visibility: visible !important;
          animation: gradientShift 3s ease infinite, textGlow 2s ease-in-out infinite alternate;
          font-family: 'Courier New', monospace;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes textGlow {
          0% { 
            text-shadow: 
              0 0 20px rgba(0, 255, 65, 0.8),
              0 0 40px rgba(0, 255, 65, 0.6);
          }
          100% { 
            text-shadow: 
              0 0 30px rgba(0, 255, 255, 1),
              0 0 60px rgba(0, 255, 255, 0.8),
              0 0 90px rgba(176, 38, 255, 0.6);
          }
        }

        @supports not (-webkit-background-clip: text) {
          .hero-title {
            -webkit-text-fill-color: #ffffff;
            color: #ffffff;
          }
        }

        .hero-subtitle {
          font-size: 1.6rem;
          font-weight: 500;
          margin-bottom: 2rem;
          opacity: 0.95;
          min-height: 2rem;
          color: var(--neon-cyan);
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.75;
          margin-bottom: 2rem;
          opacity: 0.9;
          max-width: 620px;
          margin-left: auto;
          margin-right: auto;
          color: rgba(0, 255, 65, 0.9);
          text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
          font-family: 'Courier New', monospace;
        }

        .hero-highlight-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .highlight-card {
          text-align: left;
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid var(--neon-green);
          border-radius: 1.2rem;
          padding: 1rem 1.2rem;
          box-shadow: 
            0 0 15px rgba(0, 255, 65, 0.4),
            inset 0 0 15px rgba(0, 255, 65, 0.1);
          transition: all 0.3s ease;
        }

        .highlight-card:hover {
          border-color: var(--neon-cyan);
          box-shadow: 
            0 0 25px rgba(0, 255, 255, 0.6),
            inset 0 0 25px rgba(0, 255, 255, 0.15);
          transform: translateY(-5px);
        }

        .badge-label {
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.65rem;
          color: var(--neon-cyan);
          margin: 0 0 0.25rem;
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
          font-family: 'Courier New', monospace;
        }

        .badge-value {
          margin: 0;
          font-size: 0.95rem;
          color: var(--neon-green);
          text-shadow: 0 0 5px rgba(0, 255, 65, 0.8);
          font-family: 'Courier New', monospace;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
          padding: 1.2rem;
          border-radius: 1.5rem;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid var(--neon-purple);
          box-shadow: 
            0 0 20px rgba(176, 38, 255, 0.4),
            inset 0 0 20px rgba(176, 38, 255, 0.1);
          margin-bottom: 3rem;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-value {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: var(--neon-yellow);
          text-shadow: 0 0 10px rgba(255, 255, 0, 0.8);
          font-family: 'Courier New', monospace;
        }

        .stat-label {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.65rem;
          color: var(--neon-cyan);
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
          font-family: 'Courier New', monospace;
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
          color: var(--neon-green);
          opacity: 0.9;
          font-size: 0.9rem;
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
          font-family: 'Courier New', monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .scroll-arrow {
          position: relative;
          width: 2px;
          height: 30px;
        }

        .scroll-line {
          width: 100%;
          height: 100%;
          background: var(--neon-green);
          border-radius: 1px;
          box-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
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
          border-top: 6px solid var(--neon-green);
          filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.8));
        }

        /* Smart TV and Large Displays */
        @media (min-width: 2560px) {
          .hero-section {
            min-height: 100vh;
            padding: 4rem 0;
            padding-top: 100px; /* Account for larger navbar */
          }

          .hero-content {
            padding: 4rem 3.5rem;
          }

          .hero-title {
            font-size: 6rem;
            margin-bottom: 2rem;
            line-height: 1.2;
            word-wrap: break-word;
            white-space: normal;
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
            padding-top: 90px; /* Account for larger navbar */
          }

          .hero-content {
            padding: 3rem 2.5rem;
          }

          .hero-title {
            font-size: 6rem;
            line-height: 1.2;
            margin-bottom: 1.5rem;
            white-space: normal;
            word-wrap: break-word;
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
            line-height: 1.2;
            margin-bottom: 1.5rem;
            white-space: normal;
            word-wrap: break-word;
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
            line-height: 1.2;
            word-wrap: break-word;
            white-space: normal;
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
            line-height: 1.2;
            word-wrap: break-word;
            white-space: normal;
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
          .hero-section {
            padding-top: 65px; /* Account for smaller navbar */
          }

          .hero-content {
            padding: 1.5rem 0.5rem;
          }

          .hero-title {
            font-size: 2rem;
            line-height: 1.3;
            margin-bottom: 1rem;
            word-wrap: break-word;
            white-space: normal;
            display: block;
            width: 100%;
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
            line-height: 1.3;
            word-wrap: break-word;
            white-space: normal;
            display: block;
            width: 100%;
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
