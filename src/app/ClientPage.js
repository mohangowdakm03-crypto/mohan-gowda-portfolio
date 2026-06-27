'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import styles from './page.module.css';
import domStyles from '../components/dom/dom.module.css';
import { PORTFOLIO_DATA } from '../data/content';
import CustomCursor from '../components/dom/CustomCursor';
import LiquidNav from '../components/dom/LiquidNav';

// Import Scene dynamically to avoid SSR window is not defined error
const Scene = dynamic(() => import('../components/canvas/Scene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function ClientPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Fade in sections on scroll
    const sections = gsap.utils.toArray(`.${domStyles.section}`);
    
    sections.forEach((sec, i) => {
      if (i === 0) return; // Skip hero
      gsap.fromTo(sec, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className={styles.main}>
      <CustomCursor />

      <div className={styles.canvasContainer}>
        {mounted && <Scene />}
      </div>

      <div className={styles.domContainer}>
        {/* MAC OS LIQUID GLASS NAV */}
        <LiquidNav />

        {/* HERO SECTION */}
        <section className={`${domStyles.section} ${domStyles.hero}`}>
          <div className={domStyles.contentWrapper}>
            <h1 className={domStyles.title}>{PORTFOLIO_DATA.hero.name}</h1>
            <p className={domStyles.tagline}>{PORTFOLIO_DATA.hero.tagline}</p>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className={domStyles.section}>
          <div className={domStyles.contentWrapper}>
            <h2 className={domStyles.heading}>Architecture & Aesthetics</h2>
            <p className={domStyles.aboutText}>{PORTFOLIO_DATA.about.text}</p>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className={domStyles.section}>
          <div className={domStyles.contentWrapper}>
            <h2 className={domStyles.heading}>Technical Capabilities</h2>
            <div className={domStyles.skillsGrid}>
              {PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <h3 className={domStyles.skillCategory}>{skillGroup.category}</h3>
                  <ul className={domStyles.skillList}>
                    {skillGroup.items.map((item, i) => (
                      <li key={i} className={domStyles.skillItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className={domStyles.section}>
          <div className={domStyles.contentWrapper}>
            <h2 className={domStyles.heading}>Operational Impact</h2>
            <div className={domStyles.expList}>
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div key={idx} className={domStyles.expItem}>
                  <h3 className={domStyles.expRole}>{exp.role}</h3>
                  <div className={domStyles.expCompany}>{exp.company}</div>
                  <div className={domStyles.expDate}>{exp.date}</div>
                  <p className={domStyles.expDesc}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className={domStyles.section}>
          <div className={domStyles.contentWrapper}>
            <h2 className={domStyles.heading}>Engineered Systems</h2>
            <div className={domStyles.projectsGrid}>
              {PORTFOLIO_DATA.projects.map((project, idx) => (
                <div key={idx} className={domStyles.projectCard}>
                  <h3 className={domStyles.projectTitle}>{project.title}</h3>
                  <p className={domStyles.projectDesc}>{project.description}</p>
                  <div className={domStyles.projectTech}>
                    {project.techStack.map((tech, i) => (
                      <span key={i} className={domStyles.projectTechItem}>{tech}</span>
                    ))}
                  </div>
                  <div className={domStyles.projectLinks}>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className={domStyles.link}>View Deployment</a>}
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={domStyles.link}>Source Code</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className={domStyles.section}>
          <div className={`${domStyles.contentWrapper} ${domStyles.contactWrapper}`}>
            <h2 className={domStyles.heading}>Initiate Contact</h2>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_DATA.contact.email}`} target="_blank" rel="noopener noreferrer" className={domStyles.contactEmail}>
              {PORTFOLIO_DATA.contact.email}
            </a>
            <div className={domStyles.socialLinks}>
              <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noopener noreferrer" className={domStyles.link}>GitHub</a>
              <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className={domStyles.link}>LinkedIn</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
