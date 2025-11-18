import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';
import ImageSlider from './ImageSlider';

const API_BASE_URL = (
  process.env.REACT_APP_API_URL ?? 'https://backend1-2agm.onrender.com/api'
).replace(/\/$/, '');

const BACKEND_BASE_URL = (() => {
  const fallback = API_BASE_URL.replace(/\/api\/?$/, '');
  if (typeof window === 'undefined') return fallback;
  try {
    const resolved = new URL(API_BASE_URL, window.location.origin);
    return resolved.origin.replace(/\/$/, '');
  } catch {
    return fallback;
  }
})();

const fixImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;

  const base = BACKEND_BASE_URL || API_BASE_URL;
  try {
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    return new URL(imageUrl.replace(/^\//, ''), normalizedBase).href;
  } catch {
    const fallbackBase = (BACKEND_BASE_URL || '').replace(/\/$/, '');
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${fallbackBase}${path}`;
  }
};

const resolveImageSrc = (image) => {
  if (!image) return null;
  if (typeof image === 'string') return fixImageUrl(image);
  if (typeof image === 'object') {
    return (
      image.secure_url ||
      image.url ||
      fixImageUrl(image.path || image.public_id || '')
    );
  }
  return null;
};

const TOKEN_KEY = 'sauravEdu:token';

const getStoredToken = () => {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
};

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const token = getStoredToken();
        const response = await fetch(`${API_BASE_URL}/photos/`, {
          headers: token ? { Authorization: `Token ${token}` } : undefined,
        });
        if (response.status === 401) {
          throw new Error('Gallery endpoint requires authentication. Log in from /db to sync photos.');
        }
        if (!response.ok) {
          throw new Error('Unable to load gallery photos right now.');
        }
        const data = await response.json();
        if (!isMounted) return;
        const normalized = data.map((photo) => ({
          ...photo,
          image: resolveImageSrc(photo.image),
        }));
        setPhotos(normalized);
        setError('');
      } catch (fetchError) {
        if (!isMounted) return;
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
                  <p>Uploads from the admin panel will appear here automatically.</p>
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
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </motion.div>
      </div>

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
          color: var(--text-dark);
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
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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
          color: var(--text-dark);
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

        .spinner {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 4px solid rgba(37, 99, 235, 0.2);
          border-top-color: #2563eb;
          animation: spin 0.8s linear infinite;
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
