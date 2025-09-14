import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaGithub, FaMapMarkerAlt, FaPhone, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'sauravkumarbgs75@gmail.com',
      link: 'mailto:sauravkumarbgs75@gmail.com',
      color: '#e74c3c'
    },
    {
      icon: <FaGithub />,
      title: 'GitHub',
      value: 'github.com/saurav7545',
      link: 'https://github.com/saurav7545',
      color: '#333'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Dehradun, Uttarakhand, India',
      link: null,
      color: '#3498db'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: 'Available on request',
      link: null,
      color: '#2ecc71'
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/saurav7545/',
      color: '#0077B5',
      comingSoon: false
    },
    {
      icon: <FaInstagram />,
      name: 'Instagram',
      link: 'https://www.instagram.com/saura_v75450/',
      color: '#E4405F',
      comingSoon: false
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
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="contact-header" variants={itemVariants}>
            <div className="section-header">
              <img src="/images/logo.svg" alt="Saurav Kumar Logo" className="section-logo" />
              <h2 className="section-title">Get In Touch</h2>
            </div>
            <p className="section-subtitle">
              Let's connect and discuss opportunities
            </p>
          </motion.div>

          <motion.div className="contact-grid" variants={containerVariants}>
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.title}
                className="contact-item"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="contact-icon"
                  style={{ color: contact.color }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {contact.icon}
                </motion.div>
                <h3>{contact.title}</h3>
                {contact.link ? (
                  <a href={contact.link} target="_blank" rel="noopener noreferrer">
                    {contact.value}
                  </a>
                ) : (
                  <p>{contact.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="social-links" variants={itemVariants}>
            <h3>Connect on Social Media</h3>
            <div className="social-links-grid">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  className={`social-link ${social.comingSoon ? 'coming-soon' : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: social.color }}
                >
                  {social.icon}
                  <span>{social.name}</span>
                  {social.comingSoon && <small>Coming Soon</small>}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="contact-cta" variants={itemVariants}>
            <h3>Ready to work together?</h3>
            <p>I'm always interested in new opportunities and exciting projects!</p>
            <motion.a
              href="mailto:sauravkumarbgs75@gmail.com"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope /> Send me an email
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .contact-section {
          background: var(--bg-white);
          padding: 100px 0;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .contact-item {
          background: var(--bg-light);
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .contact-item:hover {
          box-shadow: var(--shadow-hover);
        }

        .contact-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .contact-item h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .contact-item a {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .contact-item a:hover {
          color: var(--text-dark);
        }

        .contact-item p {
          color: var(--text-light);
          font-weight: 500;
        }

        .social-links {
          text-align: center;
          margin-bottom: 3rem;
        }

        .social-links h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 2rem;
        }

        .social-links-grid {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem;
          background: var(--bg-light);
          border-radius: 15px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
          min-width: 120px;
        }

        .social-link:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-5px);
        }

        .social-link svg {
          font-size: 2rem;
        }

        .social-link span {
          font-size: 0.9rem;
        }

        .social-link small {
          font-size: 0.7rem;
          opacity: 0.7;
        }

        .social-link.coming-soon {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .social-link.coming-soon:hover {
          transform: none;
          box-shadow: var(--shadow);
        }

        .contact-cta {
          text-align: center;
          background: var(--bg-light);
          padding: 3rem;
          border-radius: 20px;
          box-shadow: var(--shadow);
        }

        .contact-cta h3 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .contact-cta p {
          color: var(--text-light);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .contact-item {
            padding: 1.5rem;
          }

          .social-links-grid {
            gap: 1rem;
          }

          .social-link {
            padding: 1rem;
            min-width: 100px;
          }

          .contact-cta {
            padding: 2rem;
          }

          .contact-cta h3 {
            font-size: 1.5rem;
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

        @media (max-width: 480px) {
          .contact-section {
            padding: 60px 0;
          }

          .social-links-grid {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
