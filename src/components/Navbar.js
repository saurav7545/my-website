import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageSlider from './ImageSlider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logoImages = [
    '/images/logo1.svg',
    '/images/logo2.svg',
    '/images/logo3.svg',
    '/images/logo4.svg',
    '/images/logo5.svg',
    '/images/logo6.svg'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', href: '#home', isHash: true },
    { name: 'About', href: '#about', isHash: true },
    { name: 'About Me', href: '/about-person', isHash: false },
    { name: 'Projects', href: '/projects', isHash: false },
    { name: 'Gallery', href: '#gallery', isHash: true },
    { name: 'Social', href: '#social', isHash: true },
    { name: 'Video', href: '#video', isHash: true },
    { name: 'Contact', href: '#contact', isHash: true }
  ];

  const scrollToSection = (href, isHash) => {
    setIsOpen(false);
    
    if (isHash) {
      // If we're not on home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation then scroll - use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
          setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 150);
        });
      } else {
        // We're on home page, just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Navigate to different page
      navigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
        >
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home', true); }} className="logo-link">
            <ImageSlider 
              images={logoImages} 
              interval={5000} 
              className="logo-slider"
            />
            <span className="logo-text">Saurav</span>
          </a>
        </motion.div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              className="nav-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={item.href}
                className="nav-link"
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href, item.isHash); }}
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaBars />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 2px solid var(--neon-green);
          box-shadow: 
            0 0 20px rgba(0, 255, 65, 0.5),
            0 2px 20px rgba(0, 0, 0, 0.8);
        }

        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.95);
          box-shadow: 
            0 0 30px rgba(0, 255, 65, 0.6),
            0 2px 30px rgba(0, 0, 0, 0.9);
          border-bottom-color: var(--neon-cyan);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--neon-green);
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(45deg, #00ff41, #00ffff, #b026ff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap;
          display: block;
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
          animation: logoGlow 2s ease-in-out infinite alternate;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @keyframes logoGlow {
          0% { 
            filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.8));
          }
          100% { 
            filter: drop-shadow(0 0 15px rgba(0, 255, 255, 1));
          }
        }

        .logo-img {
          height: 40px;
          width: auto;
          transition: all 0.3s ease;
        }

        .logo-img:hover {
          transform: scale(1.05);
        }

        .logo-slider {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        }

        .logo-slider .slider-image {
          width: 40px;
          height: 40px;
        }

        .logo-slider .slider-dots {
          display: none;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
          min-width: 0;
        }

        .nav-link {
          color: var(--neon-green);
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
          display: block;
          padding: 0.5rem 0;
          text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
          font-family: 'Courier New', monospace;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--neon-green), var(--neon-cyan), var(--neon-purple));
          box-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: var(--neon-cyan);
          text-shadow: 
            0 0 10px rgba(0, 255, 255, 0.8),
            0 0 20px rgba(0, 255, 255, 0.6);
          transform: translateY(-2px);
        }

        .hamburger {
          display: none;
          font-size: 1.5rem;
          color: var(--neon-green);
          cursor: pointer;
          transition: all 0.3s ease;
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
        }

        .hamburger:hover {
          color: var(--neon-cyan);
          text-shadow: 
            0 0 15px rgba(0, 255, 255, 1),
            0 0 25px rgba(0, 255, 255, 0.6);
          transform: scale(1.1);
        }

        /* Smart TV and Large Displays */
        @media (min-width: 2560px) {
          .nav-container {
            max-width: 2400px;
            padding: 0 4rem;
            height: 100px;
          }

          .logo-text {
            font-size: 2rem;
          }

          .logo-slider {
            width: 60px;
            height: 60px;
          }

          .logo-slider .slider-image {
            width: 60px;
            height: 60px;
          }

          .nav-menu {
            gap: 3rem;
          }

          .nav-link {
            font-size: 1.4rem;
            padding: 1rem 1.5rem;
          }
        }

        /* Large Desktop Displays */
        @media (min-width: 1920px) and (max-width: 2559px) {
          .nav-container {
            max-width: 1800px;
            padding: 0 3rem;
            height: 90px;
          }

          .logo-text {
            font-size: 1.8rem;
          }

          .logo-slider {
            width: 55px;
            height: 55px;
          }

          .logo-slider .slider-image {
            width: 55px;
            height: 55px;
          }

          .nav-menu {
            gap: 2.5rem;
          }

          .nav-link {
            font-size: 1.2rem;
            padding: 0.8rem 1.2rem;
          }
        }

        /* Standard Desktop */
        @media (min-width: 1200px) and (max-width: 1919px) {
          .nav-container {
            padding: 0 2rem;
          }

          .logo-text {
            font-size: 1.5rem;
          }

          .nav-menu {
            gap: 1.5rem;
          }

          .nav-link {
            font-size: 1rem;
            padding: 0.5rem 0.8rem;
          }
        }

        /* Tablet Landscape */
        @media (min-width: 769px) and (max-width: 1199px) {
          .nav-container {
            padding: 0 1.5rem;
          }

          .logo-text {
            font-size: 1.3rem;
          }

          .logo-slider {
            width: 35px;
            height: 35px;
          }

          .logo-slider .slider-image {
            width: 35px;
            height: 35px;
          }

          .nav-menu {
            gap: 0.8rem;
          }

          .nav-link {
            font-size: 0.9rem;
            padding: 0.5rem 0.5rem;
            white-space: nowrap;
          }
        }

        /* Mobile Devices */
        @media (max-width: 768px) {
          .nav-container {
            padding: 0 1rem;
          }

          .logo-text {
            font-size: 1.2rem;
          }

          .logo-slider {
            width: 32px;
            height: 32px;
          }

          .logo-slider .slider-image {
            width: 32px;
            height: 32px;
          }

          .hamburger {
            display: block;
            z-index: 1001;
            flex-shrink: 0;
          }

          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(0, 0, 0, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            border-top: 2px solid var(--neon-green);
            box-shadow: 
              0 0 30px rgba(0, 255, 65, 0.5),
              inset 0 0 50px rgba(0, 255, 65, 0.1);
            overflow-y: auto;
            z-index: 999;
            gap: 0;
          }

          .nav-menu.active {
            left: 0;
          }

          .nav-item {
            margin: 0.5rem 0;
            width: 100%;
            text-align: center;
          }

          .nav-link {
            font-size: 1.1rem;
            display: block;
            padding: 0.75rem 1rem;
            width: 100%;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 480px) {
          .nav-container {
            padding: 0 0.75rem;
            height: 65px;
          }

          .logo-text {
            font-size: 1rem;
          }

          .logo-slider {
            width: 28px;
            height: 28px;
          }

          .logo-slider .slider-image {
            width: 28px;
            height: 28px;
          }

          .nav-menu {
            top: 65px;
            height: calc(100vh - 65px);
          }

          .nav-link {
            font-size: 1rem;
            padding: 0.7rem 1rem;
          }
        }

        /* Extra Extra Small Mobile */
        @media (max-width: 320px) {
          .logo-text {
            font-size: 0.9rem;
          }

          .logo-slider {
            width: 24px;
            height: 24px;
          }

          .logo-slider .slider-image {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
