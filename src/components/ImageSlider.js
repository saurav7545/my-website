import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageSlider = ({ images, interval = 5000, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const slideVariants = {
    enter: {
      x: 300,
      opacity: 0
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0
    }
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

  return (
    <div className={`image-slider ${className}`}>
      <div className="slider-container">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Logo ${currentIndex + 1}`}
            className="slider-image"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
          />
        </AnimatePresence>
      </div>
      
      {/* Dots indicator */}
      <div className="slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <style jsx>{`
        .image-slider {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .slider-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slider-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }

        .slider-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 2;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: var(--primary-color);
          transform: scale(1.2);
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        /* Responsive Design */
        @media (min-width: 2560px) {
          .dot {
            width: 12px;
            height: 12px;
          }
          
          .slider-dots {
            bottom: 15px;
            gap: 12px;
          }
        }

        @media (min-width: 1920px) and (max-width: 2559px) {
          .dot {
            width: 10px;
            height: 10px;
          }
          
          .slider-dots {
            bottom: 12px;
            gap: 10px;
          }
        }

        @media (max-width: 768px) {
          .dot {
            width: 6px;
            height: 6px;
          }
          
          .slider-dots {
            bottom: 8px;
            gap: 6px;
          }
        }

        @media (max-width: 480px) {
          .dot {
            width: 5px;
            height: 5px;
          }
          
          .slider-dots {
            bottom: 5px;
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
