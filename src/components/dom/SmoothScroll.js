'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
      smooth: true,
      wheelMultiplier: 1,
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
