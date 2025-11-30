import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaTrophy, FaCertificate, FaCode, FaStar, FaUsers } from 'react-icons/fa';

const SocialProof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [githubStats, setGithubStats] = useState({
    repos: 12,
    contributions: 150,
    stars: 25,
    followers: 50
  });

  // GitHub username
  const githubUsername = 'saurav7545';

  const certifications = [
    {
      name: 'Web Development',
      issuer: 'Online Platform',
      year: '2024',
      icon: <FaCode />
    },
    {
      name: 'React.js Fundamentals',
      issuer: 'Self Learning',
      year: '2024',
      icon: <FaCertificate />
    },
    {
      name: 'Problem Solving',
      issuer: 'Practice',
      year: '2024',
      icon: <FaTrophy />
    }
  ];

  const achievements = [
    {
      title: 'Live Projects',
      value: '12+',
      icon: <FaCode />,
      color: '#00ff41'
    },
    {
      title: 'GitHub Repos',
      value: githubStats.repos.toString(),
      icon: <FaGithub />,
      color: '#00ffff'
    },
    {
      title: 'Contributions',
      value: githubStats.contributions.toString(),
      icon: <FaStar />,
      color: '#b026ff'
    },
    {
      title: 'Followers',
      value: githubStats.followers.toString(),
      icon: <FaUsers />,
      color: '#ff00ff'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const Counter = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isInView) {
        let startTime = null;
        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }
    }, [isInView, end, duration]);

    return <span>{count}+</span>;
  };

  return (
    <section id="social-proof" className="social-proof-section" ref={ref}>
      <div className="container">
        <motion.div
          className="social-proof-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="social-proof-header" variants={itemVariants}>
            <h2 className="section-title">Social Proof & Achievements</h2>
            <p className="section-subtitle">
              My contributions, achievements, and recognition in the tech community
            </p>
          </motion.div>

          <div className="proof-layout">
            <motion.div className="github-stats-section" variants={itemVariants}>
              <h3 className="proof-subtitle">
                <FaGithub /> GitHub Statistics
              </h3>
              <div className="github-stats-grid">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    className="stat-card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{
                      borderColor: achievement.color,
                      boxShadow: `0 0 20px ${achievement.color}40`
                    }}
                  >
                    <div className="stat-icon" style={{ color: achievement.color }}>
                      {achievement.icon}
                    </div>
                    <div className="stat-value" style={{ color: achievement.color }}>
                      {achievement.title === 'Live Projects' ? (
                        <Counter end={12} />
                      ) : (
                        achievement.value
                      )}
                    </div>
                    <div className="stat-label">{achievement.title}</div>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub /> View GitHub Profile
              </motion.a>
            </motion.div>

            <motion.div className="certifications-section" variants={itemVariants}>
              <h3 className="proof-subtitle">
                <FaCertificate /> Certifications & Achievements
              </h3>
              <div className="certifications-list">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    className="certification-item"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                    initial={{ x: -50, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="cert-icon">{cert.icon}</div>
                    <div className="cert-details">
                      <div className="cert-name">{cert.name}</div>
                      <div className="cert-meta">
                        <span className="cert-issuer">{cert.issuer}</span>
                        <span className="cert-year">{cert.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div className="github-contribution" variants={itemVariants}>
            <h3 className="proof-subtitle">GitHub Contribution Graph</h3>
            <div className="contribution-graph">
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=react-dark&bg_color=000000&color=00ff41&line=00ffff&point=b026ff&area=true&hide_border=true`}
                alt="GitHub Contribution Graph"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div className="github-streak" variants={itemVariants}>
            <div className="streak-cards">
              <motion.div
                className="streak-card"
                whileHover={{ scale: 1.05 }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&background=000000&ring=00ff41&fire=00ffff&currStreakLabel=00ff41`}
                  alt="GitHub Streak"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <motion.div
                className="streak-card"
                whileHover={{ scale: 1.05 }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&theme=dark&bg_color=000000&title_color=00ff41&icon_color=00ffff&text_color=00ffff&hide_rank=false`}
                  alt="GitHub Stats"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .social-proof-section {
          background: rgba(0, 0, 0, 0.3);
          padding: 100px 0;
          position: relative;
        }

        .social-proof-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .proof-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .proof-subtitle {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--neon-green);
          margin-bottom: 2rem;
          text-shadow: 0 0 15px rgba(0, 255, 65, 0.6);
          font-family: 'Courier New', monospace;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .github-stats-section,
        .certifications-section {
          background: rgba(0, 0, 0, 0.5);
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid var(--neon-green);
          box-shadow: 
            0 0 30px rgba(0, 255, 65, 0.3),
            inset 0 0 30px rgba(0, 255, 65, 0.1);
        }

        .github-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem;
          border-radius: 15px;
          border: 2px solid;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 10px currentColor);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 20px currentColor;
          font-family: 'Courier New', monospace;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--neon-cyan);
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
          font-family: 'Courier New', monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .github-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #00ff41, #00ffff);
          color: #000;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 700;
          font-family: 'Courier New', monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }

        .github-link-btn:hover {
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
          transform: translateY(-2px);
        }

        .certifications-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .certification-item {
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem;
          border-radius: 15px;
          border: 2px solid rgba(0, 255, 65, 0.3);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
        }

        .certification-item:hover {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
        }

        .cert-icon {
          font-size: 2.5rem;
          color: var(--neon-green);
          filter: drop-shadow(0 0 10px rgba(0, 255, 65, 0.8));
        }

        .cert-details {
          flex: 1;
        }

        .cert-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--neon-cyan);
          margin-bottom: 0.5rem;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
          font-family: 'Courier New', monospace;
        }

        .cert-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: var(--neon-green);
          text-shadow: 0 0 5px rgba(0, 255, 65, 0.6);
          font-family: 'Courier New', monospace;
        }

        .cert-issuer::after {
          content: ' • ';
          margin: 0 0.5rem;
          color: var(--neon-cyan);
        }

        .github-contribution {
          margin-bottom: 3rem;
        }

        .contribution-graph {
          background: rgba(0, 0, 0, 0.5);
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid var(--neon-purple);
          box-shadow: 
            0 0 30px rgba(176, 38, 255, 0.3),
            inset 0 0 30px rgba(176, 38, 255, 0.1);
          overflow: hidden;
        }

        .contribution-graph img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }

        .github-streak {
          margin-top: 3rem;
        }

        .streak-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .streak-card {
          background: rgba(0, 0, 0, 0.5);
          padding: 1.5rem;
          border-radius: 20px;
          border: 2px solid var(--neon-cyan);
          box-shadow: 
            0 0 30px rgba(0, 255, 255, 0.3),
            inset 0 0 30px rgba(0, 255, 255, 0.1);
          overflow: hidden;
        }

        .streak-card img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }

        @media (max-width: 1024px) {
          .proof-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .streak-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .social-proof-section {
            padding: 60px 0;
          }

          .github-stats-grid {
            grid-template-columns: 1fr;
          }

          .github-stats-section,
          .certifications-section,
          .contribution-graph,
          .streak-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SocialProof;

