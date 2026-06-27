'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import domStyles from './dom.module.css';

const navItems = [
  { id: 'about', label: 'Architecture' },
  { id: 'skills', label: 'Capabilities' },
  { id: 'experience', label: 'Milestones' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

export default function LiquidNav() {
  const [activeId, setActiveId] = useState('');
  const bubbleRef = useRef(null);
  const linksRef = useRef({});

  const visibleSections = useRef({});

  useEffect(() => {
    // Generate many thresholds for precise ratio tracking
    const thresholds = [];
    for (let i = 0; i <= 1.0; i += 0.05) thresholds.push(i);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        visibleSections.current[entry.target.id] = entry.intersectionRatio;
      });

      let maxRatio = 0;
      let maxId = '';
      
      Object.keys(visibleSections.current).forEach(id => {
        if (visibleSections.current[id] > maxRatio) {
          maxRatio = visibleSections.current[id];
          maxId = id;
        }
      });

      if (maxId && maxRatio > 0) {
        setActiveId(maxId);
      }
    }, { threshold: thresholds, rootMargin: "-15% 0px -15% 0px" });

    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // Set initial active state
    setTimeout(() => {
      setActiveId(prev => prev || 'about');
    }, 100);

    return () => observer.disconnect();
  }, [activeId]);

  useEffect(() => {
    const activeLink = linksRef.current[activeId];
    if (activeLink && bubbleRef.current) {
      gsap.to(bubbleRef.current, {
        x: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        duration: 0.5,
        ease: "elastic.out(1, 0.75)"
      });
    }
  }, [activeId]);

  return (
    <nav className={domStyles.macNav}>
      <div ref={bubbleRef} className={domStyles.activeBubble} />
      {navItems.map((item) => (
        <a 
          key={item.id}
          ref={el => linksRef.current[item.id] = el}
          href={`#${item.id}`}
          onClick={() => setActiveId(item.id)}
          className={`${domStyles.macNavLink} ${activeId === item.id ? domStyles.active : ''}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
