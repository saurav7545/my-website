// Smooth Scroll Utility for All Devices
// Enhances native scroll behavior with optimizations

export const initSmoothScroll = () => {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Enhanced smooth scroll with offset for fixed headers
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// Debounce function for scroll events
export const debounce = (func, wait = 10) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Optimize scroll performance
export const optimizeScrollPerformance = () => {
  let ticking = false;

  const updateScrollPosition = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update scroll-based UI elements here
    // For example, navbar background, scroll progress, etc.
    
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollPosition();
        ticking = false;
      });
      ticking = true;
    }
  });
};

// Prevent layout shift during scroll
export const preventLayoutShift = () => {
  // Add scroll padding for better UX
  const root = document.documentElement;
  const header = document.querySelector('header, nav');
  
  if (header) {
    const headerHeight = header.offsetHeight;
    root.style.scrollPaddingTop = `${headerHeight}px`;
  }
};

// Initialize all scroll optimizations
export const initScrollOptimizations = () => {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll();
      optimizeScrollPerformance();
      preventLayoutShift();
    });
  } else {
    initSmoothScroll();
    optimizeScrollPerformance();
    preventLayoutShift();
  }
};

export default initScrollOptimizations;
