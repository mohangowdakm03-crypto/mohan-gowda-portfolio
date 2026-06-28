'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Completely disable JS scrolling on mobile/touch devices for zero-lag native scrolling
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
    
    if (isMobile) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return; // Exit early, let the native OS handle scrolling natively
    }

    const lenis = new Lenis({
      lerp: 0.08, // Physics-based momentum (replaces fixed duration)
      smoothWheel: true, // Use smoothWheel instead of deprecated 'smooth'
      wheelMultiplier: 1.2, // Slightly faster wheel response to prevent heaviness
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Intercept anchor clicks for buttery smooth scrolling to sections
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.hash.startsWith('#')) {
        const id = target.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          // Custom ease for the nav link jump
          lenis.scrollTo(element, { 
            offset: -50, 
            duration: 1.8, 
            easing: (t) => 1 - Math.pow(1 - t, 4) // quartic ease out
          });
        }
      }
    };

    // Disable right-click menu globally for anti-theft
    const preventContextMenu = (e) => e.preventDefault();

    document.addEventListener('click', handleAnchorClick);
    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('contextmenu', preventContextMenu);
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return children;
}
