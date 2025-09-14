import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Social from './components/Social';
import Video from './components/Video';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ParticleBackground from './components/ParticleBackground';
import DarkModeToggle from './components/DarkModeToggle';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <LoadingScreen />
        <ParticleBackground />
        <ScrollProgress />
        <DarkModeToggle />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Gallery />
          <Social />
          <Video />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
