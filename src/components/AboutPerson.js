import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaGraduationCap, FaHeart, FaRocket, FaLightbulb, FaUsers, FaTrophy, FaBook } from 'react-icons/fa';

const AboutPerson = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const personalInfo = [
    {
      icon: <FaGraduationCap />,
      title: "Education",
      details: "Pursuing B.Tech in Computer Science Engineering from Shivalik College of Engineering, Dehradun"
    },
    {
      icon: <FaCode />,
      title: "Passion",
      details: "Passionate about coding, problem-solving, and creating innovative solutions that make a difference"
    },
    {
      icon: <FaRocket />,
      title: "Goals",
      details: "Aspiring to become a full-stack developer and contribute to the tech industry with meaningful projects"
    },
    {
      icon: <FaHeart />,
      title: "Values",
      details: "Believes in continuous learning, teamwork, and creating technology that benefits society"
    }
  ];

  const achievements = [
    {
      icon: <FaTrophy />,
      title: "Academic Excellence",
      description: "Consistently maintaining good academic performance while balancing studies with practical projects"
    },
    {
      icon: <FaBook />,
      title: "Self-Learning",
      description: "Self-taught web development skills through online courses, tutorials, and hands-on practice"
    },
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description: "Active participant in coding communities and always ready to help fellow developers"
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "Always exploring new technologies and finding creative solutions to complex problems"
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
    <div className="about-person-page" ref={ref}>
      <div className="container">
        <motion.div
          className="about-person-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Hero Section */}
          <motion.div className="about-hero" variants={itemVariants}>
            <div className="about-hero-content">
              <motion.div
                className="profile-image"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="/images/placeholder.svg" 
                  alt="Saurav Kumar"
                />
                <div className="image-overlay">
                  <h3>Saurav Kumar</h3>
                  <p>CS Engineering Student</p>
                </div>
              </motion.div>
              
              <div className="hero-text">
                <h1>About Saurav Kumar</h1>
                <p className="hero-subtitle">
                  A passionate Computer Science Engineering student with a love for technology and innovation
                </p>
              </div>
            </div>
          </motion.div>

          {/* Personal Story */}
          <motion.div className="personal-story" variants={itemVariants}>
            <h2>My Journey</h2>
            <div className="story-content">
              <p>
                Hello! I'm Saurav Kumar, a dedicated Computer Science Engineering student currently pursuing my B.Tech degree at Shivalik College of Engineering in Dehradun, Uttarakhand. My journey into the world of technology began with curiosity and has evolved into a deep passion for creating digital solutions.
              </p>
              <p>
                From a young age, I was fascinated by how computers work and how software can solve real-world problems. This curiosity led me to choose Computer Science Engineering as my field of study. Throughout my academic journey, I've not only focused on theoretical knowledge but also actively engaged in practical projects and self-learning.
              </p>
              <p>
                I specialize in web development technologies including HTML, CSS, JavaScript, and React.js. My projects demonstrate my ability to create user-friendly applications that solve real-world problems. I believe in the power of technology to make a positive impact on society.
              </p>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div className="personal-info-grid" variants={containerVariants}>
            {personalInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="info-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="info-icon"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {info.icon}
                </motion.div>
                <h3>{info.title}</h3>
                <p>{info.details}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Achievements */}
          <motion.div className="achievements-section" variants={itemVariants}>
            <h2>What Drives Me</h2>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="achievement-card"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="achievement-icon"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Goals */}
          <motion.div className="future-goals" variants={itemVariants}>
            <h2>Future Aspirations</h2>
            <div className="goals-content">
              <p>
                My goal is to become a proficient full-stack developer and contribute meaningfully to the tech industry. 
                I want to work on projects that solve real-world problems and make technology more accessible to everyone.
              </p>
              <p>
                I'm particularly interested in exploring areas like artificial intelligence, machine learning, and mobile app development. 
                I believe in continuous learning and staying updated with the latest technologies and industry trends.
              </p>
              <p>
                Ultimately, I want to use my skills to create innovative solutions that can benefit society and make a positive impact on people's lives.
              </p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div className="about-cta" variants={itemVariants}>
            <h2>Let's Connect!</h2>
            <p>I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology!</p>
            <div className="cta-buttons">
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="https://github.com/saurav7545"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View My GitHub
              </motion.a>
              <motion.a1
                href="https://www.instagram.com/saura_v75450/"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Instagram
              </motion.a1>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .about-person-page {
          min-height: 100vh;
          background: var(--bg-white);
          padding: 100px 0;
        }

        .about-hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .about-hero-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .profile-image {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: var(--shadow);
          background: var(--gradient-primary);
          padding: 10px;
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 50%;
        }

        .profile-image:hover .image-overlay {
          opacity: 1;
        }

        .image-overlay h3 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .image-overlay p {
          color: white;
          font-size: 1rem;
          opacity: 0.9;
        }

        .hero-text h1 {
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 1rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-light);
          line-height: 1.6;
        }

        .personal-story {
          margin-bottom: 4rem;
        }
        .motion.a1 {
          margin-left: 1rem;
          bgcolor: black;
          color: white;
          border-radius: 10px;
          padding: 10px;
          text-decoration: none;
          transition: all 0.3s ease;
          &:hover {
            background-color: white;
            color: black;
          }
        }

        .personal-story h2 {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: var(--text-dark);
        }

        .story-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-light);
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .personal-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .info-card {
          background: var(--bg-light);
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .info-card:hover {
          box-shadow: var(--shadow-hover);
        }

        .info-icon {
          font-size: 3rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
          display: block;
        }

        .info-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .info-card p {
          color: var(--text-light);
          line-height: 1.6;
        }

        .achievements-section {
          margin-bottom: 4rem;
        }

        .achievements-section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: var(--text-dark);
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .achievement-card {
          background: var(--bg-white);
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .achievement-card:hover {
          box-shadow: var(--shadow-hover);
        }

        .achievement-icon {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
          display: block;
        }

        .achievement-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .achievement-card p {
          color: var(--text-light);
          line-height: 1.6;
        }

        .future-goals {
          margin-bottom: 4rem;
        }

        .future-goals h2 {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: var(--text-dark);
        }

        .goals-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-light);
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .about-cta {
          text-align: center;
          background: var(--bg-light);
          padding: 3rem;
          border-radius: 20px;
          box-shadow: var(--shadow);
        }

        .about-cta h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .about-cta p {
          font-size: 1.1rem;
          color: var(--text-light);
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .about-hero-content {
            flex-direction: column;
            gap: 2rem;
          }

          .hero-text h1 {
            font-size: 2rem;
          }

          .personal-info-grid {
            grid-template-columns: 1fr;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPerson;
