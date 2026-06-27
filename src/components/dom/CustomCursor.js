'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './dom.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let isHovered = false;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const render = () => {
      // Smooth lerp (linear interpolation) for the fluid halo physics
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      const scale = isHovered ? 1.5 : 1;
      
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX - 16}px, ${cursorY - 16}px, 0) scale(${scale})`;
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(render);

    const handleMouseEnter = () => {
      isHovered = true;
      cursor.classList.add(styles.cursorActive);
    };
    const handleMouseLeave = () => {
      isHovered = false;
      cursor.classList.remove(styles.cursorActive);
    };

    // Apply to links and project cards
    const applyListeners = () => {
      const interactables = document.querySelectorAll(`a, button, [class*="projectCard"]`);
      interactables.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Small delay to ensure DOM is rendered
    setTimeout(applyListeners, 500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      
      const interactables = document.querySelectorAll(`a, button, [class*="projectCard"]`);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.customCursorRing} />
  );
}
