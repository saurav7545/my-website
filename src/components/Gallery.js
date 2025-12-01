import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaCamera, FaTimes } from 'react-icons/fa';
import ImageSlider from './ImageSlider';

// API Configuration
import { API_BASE_URL, getBackendBaseURL } from '../config/api';

const BACKEND_BASE_URL = getBackendBaseURL();

// Utility Functions
const fixImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  const base = BACKEND_BASE_URL || API_BASE_URL;
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${base}${path}`;
};

const resolveImageSrc = (image) => {
  if (!image) return null;
  let url;
  if (typeof image === 'string') {
    url = fixImageUrl(image);
  } else if (typeof image === 'object') {
    url = image.secure_url || image.url || fixImageUrl(image.path || image.public_id || '');
  }
  return url ? `${url}?t=${Date.now()}` : null; // Cache busting
};

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    let isMounted = true;
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Try to fetch from public endpoint first
        const response = await fetch(`${API_BASE_URL}/api/gallery/photos/public/`);
        
        if (response.status === 404) {
          // If public endpoint doesn't exist, try authenticated endpoint with token
          const token = localStorage.getItem('sauravEdu:token');
          const authResponse = await fetch(`${API_BASE_URL}/api/gallery/photos/`, {
            headers: token ? { Authorization: `Token ${token}` } : {}
          });
          
          if (!authResponse.ok) {
            if (authResponse.status === 401 || authResponse.status === 403) {
              throw new Error('Gallery photos are currently private. Please check back later.');
            }
            throw new Error('Unable to load gallery photos at the moment.');
          }
          
          const data = await authResponse.json();
          if (!isMounted) return;
          const normalized = data.map((photo) => ({
            ...photo,
            image: resolveImageSrc(photo.image),
          }));
          setPhotos(normalized);
        } else if (response.ok) {
          const data = await response.json();
          if (!isMounted) return;
          const normalized = data.map((photo) => ({
            ...photo,
            image: resolveImageSrc(photo.image),
          }));
          setPhotos(normalized);
        } else {
          throw new Error('Unable to load gallery photos.');
        }
      } catch (fetchError) {
        if (!isMounted) return;
        console.error('Gallery fetch error:', fetchError);
        setError(fetchError.message || 'Something went wrong while loading photos.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    fetchPhotos();
    return () => {
      isMounted = false;
    };
  }, []);

  const headerLogos = useMemo(
    () => [
      '/images/logo1.svg',
      '/images/logo2.svg',
      '/images/logo3.svg',
      '/images/logo4.svg',
      '/images/logo5.svg',
    ],
    [],
  );

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

  const handleImageClick = (photo, event) => {
    const imgElement = event.currentTarget;
    const rect = imgElement.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    
    setImagePosition({
      x: rect.left + rect.width / 2 + scrollX,
      y: rect.top + rect.height / 2 + scrollY,
      width: rect.width,
      height: rect.height
    });
    
    setSelectedImage(photo);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <section id="gallery" className="gallery-section" ref={ref}>
      <div className="container">
        <motion.div
          className="gallery-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="gallery-header" variants={itemVariants}>
            <div className="section-header">
              <ImageSlider
                images={headerLogos}
                interval={5000}
                className="section-logo-slider"
              />
              <h2 className="section-title">Photo Gallery</h2>
            </div>
            <p className="section-subtitle">
              A glimpse into my journey and experiences
            </p>
          </motion.div>
          <motion.div className="gallery-body" variants={itemVariants}>
            {loading && (
              <div className="gallery-status">
                <span className="spinner" />
                <p>Loading gallery...</p>
              </div>
            )}
            {!loading && error && (
              <div className="gallery-status error">
                <FaCamera />
                <div>
                  <h3>Unable to load gallery</h3>
                  <p>{error}</p>
                </div>
              </div>
            )}
            {!loading && !error && photos.length === 0 && (
              <div className="gallery-status empty">
                <FaCamera />
                <div>
                  <h3>No photos yet</h3>
                  <p>Check back later for new uploads!</p>
                </div>
              </div>
            )}
            {!loading && !error && photos.length > 0 && (
              <motion.ul
                className="public-gallery-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {photos.map((photo) => (
                  <motion.li
                    key={photo.id}
                    className="public-gallery-card"
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                  >
                    {photo.image ? (
                      <img
                        src={photo.image}
                        alt={photo.title || 'Gallery photo'}
                        loading="lazy"
                        onClick={(e) => handleImageClick(photo, e)}
                        style={{ cursor: 'pointer' }}
                      />
                    ) : (
                      <div className="placeholder">
                        <FaCamera />
                      </div>
                    )}
                    <div className="card-info">
                      {photo.category && <p className="pill">{photo.category}</p>}
                      <h3>{photo.title || 'Untitled photo'}</h3>
                      {photo.notes && <p className="muted">{photo.notes}</p>}
                      {photo.created_at && (
                        <p className="date muted">
                          {new Date(photo.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Image Modal/Popup */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="image-modal-content"
              initial={{ 
                scale: imagePosition.width && window.innerWidth ? Math.min(imagePosition.width / window.innerWidth, 0.4) : 0.3,
                opacity: 0,
                x: imagePosition.x ? imagePosition.x - window.innerWidth / 2 : 0,
                y: imagePosition.y ? imagePosition.y - window.innerHeight / 2 : 0
              }}
              animate={{ 
                scale: 1,
                opacity: 1,
                x: 0,
                y: 0
              }}
              exit={{ 
                scale: imagePosition.width && window.innerWidth ? Math.min(imagePosition.width / window.innerWidth, 0.4) : 0.3,
                opacity: 0,
                x: imagePosition.x ? imagePosition.x - window.innerWidth / 2 : 0,
                y: imagePosition.y ? imagePosition.y - window.innerHeight / 2 : 0
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
              <div className="modal-image-container">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title || 'Gallery photo'}
                  className="modal-image"
                />
              </div>
              {selectedImage.title && (
                <div className="modal-image-info">
                  <h3>{selectedImage.title}</h3>
                  {selectedImage.category && (
                    <span className="modal-category">{selectedImage.category}</span>
                  )}
                  {selectedImage.notes && (
                    <p className="modal-notes">{selectedImage.notes}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .gallery-section {
          background: var(--bg-white);
          padding: 100px 0;
        }
        .gallery-header {
          text-align: center;
          margin-bottom: 3rem;
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
        .section-logo-slider {
          width: 40px;
          height: 40px;
        }
        .section-logo-slider .slider-image {
          width: 40px;
          height: 40px;
        }
        .section-logo-slider .slider-dots {
          display: none;
        }
        .gallery-body {
          min-height: 400px;
        }
        .gallery-status {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          border-radius: 16px;
          background: var(--bg-light);
          border: 1px solid rgba(0, 0, 0, 0.05);
          color: var(--text-light);
          text-align: center;
          flex-wrap: wrap;
        }
        .gallery-status h3 {
          margin: 0 0 0.35rem;
          color: var(--neon-green);
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
          font-family: 'Courier New', monospace;
        }
        .gallery-status.error {
          background: rgba(239, 68, 68, 0.12);
          border-color: rgba(239, 68, 68, 0.3);
          color: #b91c1c;
        }
        .gallery-status.empty {
          background: rgba(37, 99, 235, 0.08);
          border-color: rgba(37, 99, 235, 0.25);
          color: #1d4ed8;
        }
        .public-gallery-grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .public-gallery-card {
          border-radius: 20px;
          overflow: hidden;
          background: var(--bg-white);
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .public-gallery-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .public-gallery-card img,
        .public-gallery-card .placeholder {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          background: #0f172a;
        }
        .public-gallery-card .placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 2rem;
        }
        .card-info {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .card-info h3 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--neon-cyan);
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
          font-family: 'Courier New', monospace;
        }
        .pill {
          align-self: flex-start;
          padding: 0.25rem 0.8rem;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.15);
          color: #1d4ed8;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .muted {
          color: var(--text-light);
          margin: 0;
          font-size: 0.95rem;
        }
        .date {
          font-size: 0.85rem;
          opacity: 0.7;
        }
        .spinner {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 4px solid rgba(37, 99, 235, 0.2);
          border-top-color: #2563eb;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Image Modal Styles */
        .image-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          cursor: pointer;
          overflow: auto;
          box-sizing: border-box;
        }

        .image-modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: default;
          transform-origin: center center;
          will-change: transform, opacity;
          margin: auto;
        }

        .modal-close-btn {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          z-index: 10001;
          backdrop-filter: blur(10px);
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: var(--neon-green);
          color: var(--neon-green);
          transform: rotate(90deg);
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
        }

        .modal-image-container {
          width: 100%;
          height: auto;
          max-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
          border: 2px solid rgba(0, 255, 65, 0.3);
        }

        .modal-image {
          width: 100%;
          height: auto;
          max-height: 80vh;
          object-fit: contain;
          display: block;
          image-rendering: high-quality;
          -webkit-image-rendering: high-quality;
        }

        .modal-image-info {
          margin-top: 1.5rem;
          text-align: center;
          color: #fff;
          max-width: 600px;
        }

        .modal-image-info h3 {
          margin: 0 0 0.75rem 0;
          font-size: 1.5rem;
          color: var(--neon-cyan);
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
          font-family: 'Courier New', monospace;
        }

        .modal-category {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.2);
          color: #60a5fa;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .modal-notes {
          margin: 0.75rem 0 0 0;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .image-modal-overlay {
            padding: 1rem;
          }

          .modal-close-btn {
            top: -40px;
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }

          .modal-image-container {
            max-height: 75vh;
          }

          .modal-image {
            max-height: 75vh;
          }

          .modal-image-info h3 {
            font-size: 1.2rem;
          }

          .modal-notes {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .image-modal-overlay {
            padding: 0.5rem;
          }

          .modal-close-btn {
            top: -35px;
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }

          .modal-image-container {
            max-height: 70vh;
            border-radius: 8px;
          }

          .modal-image {
            max-height: 70vh;
          }

          .modal-image-info {
            margin-top: 1rem;
          }

          .modal-image-info h3 {
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
          }
          .public-gallery-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        }
        @media (max-width: 520px) {
          .public-gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;