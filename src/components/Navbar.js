import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ImageSlider from './ImageSlider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'About Me', href: '/about-person' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Social', href: '#social' },
    { name: 'Video', href: '#video' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For external links, navigate normally
      window.location.href = href;
    }
    setIsOpen(false);
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
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}>
            <ImageSlider 
              images={logoImages} 
              interval={5000} 
              className="logo-slider"
            />
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
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
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
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
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

        .nav-logo a {
          display: flex;
          align-items: center;
          text-decoration: none;
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
          gap: 2rem;
        }

        .nav-link {
          color: var(--text-dark);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: var(--primary-color);
        }

        .hamburger {
          display: none;
          font-size: 1.5rem;
          color: var(--text-dark);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hamburger:hover {
          color: var(--primary-color);
        }

        /* Smart TV and Large Displays */
        @media (min-width: 2560px) {
          .nav-container {
            padding: 0 3rem;
            height: 100px;
          }

          .nav-logo {
            height: 80px;
          }

          .logo-img {
            height: 60px;
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
            padding: 0 2rem;
            height: 90px;
          }

          .nav-logo {
            height: 75px;
          }

          .logo-img {
            height: 55px;
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
            padding: 0 1.5rem;
          }

          .nav-menu {
            gap: 2rem;
          }

          .nav-link {
            font-size: 1.1rem;
            padding: 0.7rem 1rem;
          }
        }

        /* Tablet Landscape */
        @media (min-width: 768px) and (max-width: 1199px) {
          .nav-container {
            padding: 0 1rem;
          }

          .nav-menu {
            gap: 1.5rem;
          }

          .nav-link {
            font-size: 1rem;
            padding: 0.6rem 0.8rem;
          }
        }

        /* Mobile Devices */
        @media (max-width: 768px) {
          .hamburger {
            display: block;
          }

          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
          }

          .nav-menu.active {
            left: 0;
          }

          .nav-item {
            margin: 1rem 0;
          }

          .nav-link {
            font-size: 1.2rem;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 480px) {
          .nav-container {
            padding: 0 0.5rem;
          }

          .nav-logo {
            height: 45px;
          }

          .logo-img {
            height: 30px;
          }

          .logo-slider {
            width: 30px;
            height: 30px;
          }

          .logo-slider .slider-image {
            width: 30px;
            height: 30px;
          }

          .nav-link {
            font-size: 1rem;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
