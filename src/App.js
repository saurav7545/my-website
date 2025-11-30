import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AboutPerson from './components/AboutPerson';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Social from './components/Social';
import SocialProof from './components/SocialProof';
import Video from './components/Video';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';

// Lazy load heavy components for better performance
const DB = lazy(() => import('./components/db'));

// Simple smooth scroll function
const initScrollOptimizations = () => {
  // Add smooth scrolling behavior
  const style = document.createElement('style');
  style.textContent = `
    html {
      scroll-behavior: smooth;
    }
  `;
  document.head.appendChild(style);
};

function App() {
  useEffect(() => {
    initScrollOptimizations();
    
    // Add smooth page transitions
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Performance: Preload critical resources
    const preloadImages = () => {
      const criticalImages = [
        '/images/logo1.svg',
        '/images/logo2.svg',
        '/images/mypic.jpg'
      ];
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };
    
    preloadImages();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <LoadingScreen />
        <ParticleBackground />
        <ScrollProgress />
        <Navbar />
      
        <main>
          <Routes>
            <Route path="/" element={
              <PageTransition>
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Gallery />
                  <Social />
                  <SocialProof />
                  <Video />
                  <Education />
                  <Contact />
                </>
              </PageTransition>
            } />
            <Route path="/about-person" element={
              <PageTransition>
                <AboutPerson />
              </PageTransition>
            } />
            <Route path="/projects" element={
              <PageTransition>
                <Projects />
              </PageTransition>
            } />
            <Route path="/db" element={
              <Suspense fallback={
                <div style={{
                  minHeight: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#000',
                  color: '#00ff41',
                  fontFamily: 'Courier New, monospace'
                }}>
                  Loading...
                </div>
              }>
                <PageTransition>
                  <DB />
                </PageTransition>
              </Suspense>
            } />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;