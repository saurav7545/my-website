import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaCode, FaGraduationCap } from 'react-icons/fa';
import ImageSlider from './ImageSlider';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerImages = [
    '/images/logo1.svg',
    '/images/logo2.svg',
    '/images/logo3.svg',
    '/images/logo4.svg',
    '/images/logo5.svg'
  ];

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-main">
            <motion.div
              className="footer-brand"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ImageSlider 
                images={footerImages} 
                interval={7000} 
                className="footer-logo-slider"
              />
              <h3>Saurav Kumar</h3>
              <p>Computer Science Engineering Student</p>
            </motion.div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Projects</h4>
                <ul>
                  <li><a href="https://github.com/saurav7545/calculator.git" target="_blank" rel="noopener noreferrer">Calculator</a></li>
                  <li><a href="https://indiantodolist.netlify.app/login/login.html" target="_blank" rel="noopener noreferrer">Todo List</a></li>
                  <li><a href="/projects" target="_blank" rel="noopener noreferrer">All Projects</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Connect</h4>
                <ul>
                  <li><a href="mailto:sauravkumarbgs75@gmail.com">Email</a></li>
                  <li><a href="https://github.com/saurav7545" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  <li><a href="https://www.linkedin.com/in/saurav7545/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  <li><a href="https://www.instagram.com/saura_v75450/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>

          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="footer-copyright">
              <p>
                &copy; {currentYear} Saurav Kumar. All rights reserved.
              </p>
              <div className="footer-badges">
                <motion.span
                  className="badge"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaCode /> Made with React
                </motion.span>
                <motion.span
                  className="badge"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaGraduationCap /> CS Student
                </motion.span>
              </div>
            </div>

            <motion.div
              className="footer-heart"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          padding: 3rem 0 1rem;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
        }

        .footer-content {
          position: relative;
          z-index: 2;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .footer-logo {
          height: 50px;
          width: auto;
          margin-bottom: 1rem;
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }

        .footer-logo-slider {
          width: 50px;
          height: 50px;
          margin-bottom: 1rem;
        }

        .footer-logo-slider .slider-image {
          width: 50px;
          height: 50px;
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }

        .footer-logo-slider .slider-dots {
          display: none;
        }

        .footer-brand h3 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-brand p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
        }

        .footer-section h4 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: white;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section li {
          margin-bottom: 0.5rem;
        }

        .footer-section a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: white;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copyright {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-copyright p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .footer-badges {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }

        .badge:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .footer-heart {
          color: #e74c3c;
          font-size: 1.5rem;
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }

          .footer-badges {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 2rem 0 1rem;
          }

          .footer-links {
            grid-template-columns: 1fr;
          }

          .footer-brand h3 {
            font-size: 1.5rem;
          }

          .badge {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
