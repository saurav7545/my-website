import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaMobileAlt, FaDatabase, FaGraduationCap } from 'react-icons/fa';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const skills = [
    {
      icon: <FaCode />,
      title: 'Web Development',
      description: 'HTML, CSS, JavaScript, React.js',
      color: '#6366f1'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Responsive Design',
      description: 'Mobile-first approach, modern UI/UX',
      color: '#10b981'
    },
    {
      icon: <FaDatabase />,
      title: 'Data Structures & Algorithms',
      description: 'Python, problem-solving, optimization',
      color: '#f59e0b'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies',
      color: '#8b5cf6'
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
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="about-text" variants={itemVariants}>
            <div className="section-header">
              <img src="/images/logo.svg" alt="Saurav Kumar Logo" className="section-logo" />
              <h2 className="section-title">About Me</h2>
            </div>
            <div className="about-description">
              <p>
                I am a dedicated Computer Science Engineering student with a passion for technology and innovation.
                My journey in the world of programming began with curiosity and has evolved into a deep
                understanding of software development principles.
              </p>
              <p>
                I specialize in web development technologies including HTML, CSS, JavaScript, and React.js.
                My projects demonstrate my ability to create user-friendly applications that solve real-world
                problems.
              </p>
            </div>
          </motion.div>

          <motion.div className="about-image" variants={itemVariants}>
            <div className="image-container">
              <motion.div
                className="image-wrapper"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="/images/placeholder.svg" 
                  alt="Saurav Kumar - Computer Science Engineer"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>Saurav Kumar</h3>
                    <p>Computer Science Engineer</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="skills-grid" variants={containerVariants}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="skill-item"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="skill-icon"
                  style={{ color: skill.color }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {skill.icon}
                </motion.div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .about-section {
          background: var(--bg-white);
          padding: 100px 0;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 4rem;
        }

        .about-text {
          order: 1;
        }

        .about-image {
          order: 2;
        }

        .about-description p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-light);
          margin-bottom: 1.5rem;
        }

        .image-container {
          position: relative;
          max-width: 400px;
          margin: 0 auto;
        }

        .image-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow);
          background: var(--gradient-primary);
          padding: 10px;
        }

        .image-wrapper img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 15px;
          display: block;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 15px;
        }

        .image-wrapper:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
          color: white;
        }

        .overlay-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .overlay-content p {
          font-size: 1rem;
          opacity: 0.9;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .skill-item {
          background: var(--bg-white);
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .skill-item:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-5px);
        }

        .skill-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .skill-item h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-dark);
        }

        .skill-item p {
          color: var(--text-light);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .about-text {
            order: 2;
          }

          .about-image {
            order: 1;
          }

          .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
          }

          .skill-item {
            padding: 1.5rem;
          }
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
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
          .about-section {
            padding: 60px 0;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .section-logo {
            height: 35px;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
