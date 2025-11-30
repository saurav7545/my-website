import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaGitAlt, 
  FaNode, FaDatabase, FaBootstrap, FaFigma, FaGithub 
} from 'react-icons/fa';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const technicalSkills = [
    { name: 'HTML5', level: 90, icon: <FaHtml5 />, color: '#00ff41' },
    { name: 'CSS3', level: 85, icon: <FaCss3Alt />, color: '#00ffff' },
    { name: 'JavaScript', level: 80, icon: <FaJs />, color: '#b026ff' },
    { name: 'React.js', level: 75, icon: <FaReact />, color: '#ff00ff' },
    { name: 'Python', level: 70, icon: <FaPython />, color: '#ffff00' },
    { name: 'Node.js', level: 65, icon: <FaNode />, color: '#00d9ff' },
    { name: 'Git/Github', level: 80, icon: <FaGitAlt />, color: '#00ff41' },
    { name: 'Database', level: 70, icon: <FaDatabase />, color: '#00ffff' },
  ];

  const softSkills = [
    { name: 'Problem Solving', level: 85 },
    { name: 'Team Collaboration', level: 80 },
    { name: 'Communication', level: 75 },
    { name: 'Time Management', level: 80 },
    { name: 'Adaptability', level: 85 },
    { name: 'Critical Thinking', level: 75 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const SkillBar = ({ skill, index }) => {
    return (
      <motion.div
        className="skill-bar-item"
        variants={itemVariants}
        onHoverStart={() => setHoveredSkill(index)}
        onHoverEnd={() => setHoveredSkill(null)}
        whileHover={{ scale: 1.02, y: -2 }}
      >
        <div className="skill-header">
          <div className="skill-name-icon">
            <span className="skill-icon" style={{ color: skill.color }}>
              {skill.icon}
            </span>
            <span className="skill-name">{skill.name}</span>
          </div>
          <span className="skill-percentage">{skill.level}%</span>
        </div>
        <div className="skill-bar-container">
          <motion.div
            className="skill-bar-fill"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
            style={{ 
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
              boxShadow: hoveredSkill === index ? `0 0 20px ${skill.color}` : 'none'
            }}
          />
        </div>
      </motion.div>
    );
  };

  const CircularSkill = ({ skill, index }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (skill.level / 100) * circumference;

    return (
      <motion.div
        className="circular-skill"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      >
        <svg className="circular-progress" width="140" height="140">
          <circle
            className="circular-bg"
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(0, 255, 65, 0.2)"
            strokeWidth="8"
          />
          <motion.circle
            className="circular-progress-bar"
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={skill.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 2, delay: index * 0.1, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 10px ${skill.color})`
            }}
          />
        </svg>
        <div className="circular-content">
          <div className="circular-icon" style={{ color: skill.color }}>
            {skill.icon}
          </div>
          <div className="circular-percentage">{skill.level}%</div>
          <div className="circular-name">{skill.name}</div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <motion.div
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="skills-header" variants={itemVariants}>
            <h2 className="section-title">Technical Skills</h2>
            <p className="section-subtitle">
              Technologies I work with and my proficiency levels
            </p>
          </motion.div>

          <div className="skills-layout">
            <motion.div className="skills-bars" variants={containerVariants}>
              <h3 className="skills-subtitle">Proficiency Levels</h3>
              {technicalSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>

            <motion.div className="skills-circles" variants={containerVariants}>
              <h3 className="skills-subtitle">Core Technologies</h3>
              <div className="circular-skills-grid">
                {technicalSkills.slice(0, 6).map((skill, index) => (
                  <CircularSkill key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div className="soft-skills-section" variants={itemVariants}>
            <h3 className="skills-subtitle">Soft Skills</h3>
            <div className="soft-skills-grid">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="soft-skill-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  style={{
                    borderColor: hoveredSkill === index + 10 ? '#00ffff' : 'rgba(0, 255, 65, 0.3)'
                  }}
                  onHoverStart={() => setHoveredSkill(index + 10)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <div className="soft-skill-name">{skill.name}</div>
                  <div className="soft-skill-level">
                    <motion.div
                      className="soft-skill-fill"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                  <div className="soft-skill-percentage">{skill.level}%</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .skills-section {
          background: rgba(0, 0, 0, 0.3);
          padding: 100px 0;
          position: relative;
        }

        .skills-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .skills-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .skills-subtitle {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--neon-cyan);
          margin-bottom: 2rem;
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
          font-family: 'Courier New', monospace;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .skills-bars {
          background: rgba(0, 0, 0, 0.5);
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid var(--neon-green);
          box-shadow: 
            0 0 30px rgba(0, 255, 65, 0.3),
            inset 0 0 30px rgba(0, 255, 65, 0.1);
        }

        .skill-bar-item {
          margin-bottom: 2rem;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .skill-name-icon {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .skill-icon {
          font-size: 1.5rem;
          filter: drop-shadow(0 0 5px currentColor);
        }

        .skill-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--neon-green);
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
          font-family: 'Courier New', monospace;
        }

        .skill-percentage {
          font-size: 1rem;
          font-weight: 700;
          color: var(--neon-cyan);
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
          font-family: 'Courier New', monospace;
        }

        .skill-bar-container {
          width: 100%;
          height: 12px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(0, 255, 65, 0.3);
          position: relative;
        }

        .skill-bar-fill {
          height: 100%;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
        }

        .skill-bar-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .skills-circles {
          background: rgba(0, 0, 0, 0.5);
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid var(--neon-purple);
          box-shadow: 
            0 0 30px rgba(176, 38, 255, 0.3),
            inset 0 0 30px rgba(176, 38, 255, 0.1);
        }

        .circular-skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .circular-skill {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .circular-progress {
          transform: rotate(-90deg);
        }

        .circular-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .circular-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          filter: drop-shadow(0 0 10px currentColor);
        }

        .circular-percentage {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--neon-green);
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
          font-family: 'Courier New', monospace;
        }

        .circular-name {
          font-size: 0.8rem;
          color: var(--neon-cyan);
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.6);
          font-family: 'Courier New', monospace;
          margin-top: 0.25rem;
        }

        .soft-skills-section {
          background: rgba(0, 0, 0, 0.5);
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid var(--neon-yellow);
          box-shadow: 
            0 0 30px rgba(255, 255, 0, 0.3),
            inset 0 0 30px rgba(255, 255, 0, 0.1);
        }

        .soft-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .soft-skill-item {
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem;
          border-radius: 15px;
          border: 2px solid rgba(0, 255, 65, 0.3);
          transition: all 0.3s ease;
        }

        .soft-skill-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--neon-green);
          margin-bottom: 0.75rem;
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
          font-family: 'Courier New', monospace;
        }

        .soft-skill-level {
          width: 100%;
          height: 8px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 0.5rem;
          border: 1px solid rgba(0, 255, 65, 0.3);
        }

        .soft-skill-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--neon-green), var(--neon-cyan));
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
        }

        .soft-skill-percentage {
          font-size: 0.9rem;
          color: var(--neon-cyan);
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.6);
          font-family: 'Courier New', monospace;
          text-align: right;
        }

        @media (max-width: 1024px) {
          .skills-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .circular-skills-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .skills-section {
            padding: 60px 0;
          }

          .circular-skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .soft-skills-grid {
            grid-template-columns: 1fr;
          }

          .skills-bars,
          .skills-circles,
          .soft-skills-section {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .circular-skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .circular-progress {
            width: 100px;
            height: 100px;
          }

          .circular-icon {
            font-size: 1.5rem;
          }

          .circular-percentage {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;

