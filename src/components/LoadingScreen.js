import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation from 0 to 100
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Increment by 2 for smooth animation
      });
    }, 30); // Update every 30ms for smooth animation

    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-content">
            <motion.div
              className="loading-logo"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="logo-circle">
                <div className="logo-brackets">
                  <span>&lt;</span>
                  <span>&gt;</span>
                </div>
              </div>
            </motion.div>
            
            <motion.h2
              className="loading-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to Mr.Saurav website
            </motion.h2>
            
            <div className="loading-progress-container">
              <div className="loading-progress-bar">
                <motion.div
                  className="loading-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <motion.span
                className="loading-progress-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000;
          background-image: 
            linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: gridMove 10s linear infinite;
        }

        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }

        .loading-content {
          text-align: center;
          color: var(--neon-green);
          position: relative;
          z-index: 2;
        }

        .loading-logo {
          margin-bottom: 2rem;
        }

        .logo-circle {
          width: 120px;
          height: 120px;
          border: 4px solid rgba(0, 255, 65, 0.3);
          border-top: 4px solid var(--neon-green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          position: relative;
          animation: spin 2s linear infinite;
          box-shadow: 
            0 0 20px rgba(0, 255, 65, 0.5),
            inset 0 0 20px rgba(0, 255, 65, 0.1);
        }

        .logo-brackets {
          font-size: 3rem;
          font-weight: bold;
          display: flex;
          gap: 1rem;
          color: var(--neon-green);
          text-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
          font-family: 'Courier New', monospace;
        }

        .loading-text {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          background: linear-gradient(45deg, #00ff41, #00ffff, #b026ff, #ff00ff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(0, 255, 65, 0.8);
          animation: gradientShift 3s ease infinite;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .loading-progress-container {
          width: 400px;
          max-width: 90%;
          margin: 0 auto;
          position: relative;
        }

        .loading-progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid var(--neon-green);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: 
            0 0 20px rgba(0, 255, 65, 0.5),
            inset 0 0 10px rgba(0, 255, 65, 0.2);
        }

        .loading-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00ff41, #00ffff, #b026ff);
          background-size: 200% 100%;
          border-radius: 8px;
          box-shadow: 
            0 0 20px rgba(0, 255, 65, 0.8),
            inset 0 0 10px rgba(255, 255, 255, 0.3);
          animation: progressGlow 2s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .loading-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 1.5s infinite;
        }

        @keyframes progressGlow {
          0%, 100% { 
            box-shadow: 
              0 0 20px rgba(0, 255, 65, 0.8),
              inset 0 0 10px rgba(255, 255, 255, 0.3);
          }
          50% { 
            box-shadow: 
              0 0 30px rgba(0, 255, 255, 1),
              inset 0 0 15px rgba(255, 255, 255, 0.5);
          }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .loading-progress-text {
          display: block;
          margin-top: 1rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--neon-green);
          text-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
          font-family: 'Courier New', monospace;
          letter-spacing: 3px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .loading-text {
            font-size: 1.5rem;
            letter-spacing: 1px;
          }

          .loading-progress-container {
            width: 300px;
          }

          .loading-progress-text {
            font-size: 1.2rem;
          }

          .logo-circle {
            width: 100px;
            height: 100px;
          }

          .logo-brackets {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default LoadingScreen;
