import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AboutPerson from './components/AboutPerson';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Social from './components/Social';
import Video from './components/Video';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';


function App() {
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
              <>
               
                <Hero />
                <About />
                <Gallery />
                <Social />
                <Video />
                <Education />
                <Contact />
              </>
              } />
              <Route path="/about-person" element={<AboutPerson />} />
              <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
