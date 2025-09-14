import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <>
      <motion.div
        className="scroll-progress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />
      <style jsx>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 0%;
          height: 6px;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
          z-index: 9999;
          transition: width 0.1s ease;
          box-shadow: 0 2px 15px rgba(102, 126, 234, 0.4);
          border-radius: 0 3px 3px 0;
          transform-origin: left;
        }

        .scroll-progress::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
          border-radius: 0 3px 3px 0;
        }
      `}</style>
    </>
  );
};

export default ScrollProgress;
