import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skills } from '../data/portfolioData';
import { useIsMobile } from '../hooks/useMediaQuery';
import './Skills.css';

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();

  const orbitRadii = [140, 200, 260, 140, 200, 260, 140, 200];
  const orbitSpeeds = [30, 45, 60, 35, 50, 65, 40, 55];
  const startAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  if (isMobile) {
    return (
      <section id="skills" className="skills section" ref={ref}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">Skills</div>
            <h2 className="section-title">Tech Stack</h2>
          </motion.div>

          <div className="skills__mobile-grid">
            {skills.map((skill, i) => (
              <motion.button
                key={skill.name}
                className={`skills__mobile-card glass-panel ${
                  activeSkill === i ? 'skills__mobile-card--active' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                onClick={() => setActiveSkill(activeSkill === i ? null : i)}
              >
                <span className="skills__mobile-name">{skill.name}</span>
                <AnimatePresence>
                  {activeSkill === i && (
                    <motion.span
                      className="skills__mobile-desc"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.description}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="skills section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Skills</div>
          <h2 className="section-title">Tech Stack</h2>
        </motion.div>

        <div className="skills__orbit-container">
          {/* Orbit rings */}
          <div className="skills__orbit-ring skills__orbit-ring--1" />
          <div className="skills__orbit-ring skills__orbit-ring--2" />
          <div className="skills__orbit-ring skills__orbit-ring--3" />

          {/* Core */}
          <motion.div
            className="skills__core"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <span className="skills__core-label">SKILL</span>
            <span className="skills__core-sublabel">CORE</span>
          </motion.div>

          {/* Orbiting skills */}
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skills__orbit-wrapper"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              style={{
                animation: activeSkill === i
                  ? 'none'
                  : `orbit-${i % 3} ${orbitSpeeds[i]}s linear infinite`,
                animationDelay: `-${(startAngles[i] / 360) * orbitSpeeds[i]}s`,
              }}
            >
              <button
                className={`skills__node ${
                  activeSkill === i ? 'skills__node--active' : ''
                }`}
                style={{
                  '--orbit-radius': `${orbitRadii[i]}px`,
                } as React.CSSProperties}
                onMouseEnter={() => setActiveSkill(i)}
                onMouseLeave={() => setActiveSkill(null)}
                onClick={() => setActiveSkill(activeSkill === i ? null : i)}
              >
                <span className="skills__node-name">{skill.name}</span>
              </button>
            </motion.div>
          ))}

          {/* Active skill tooltip */}
          <AnimatePresence>
            {activeSkill !== null && (
              <motion.div
                className="skills__tooltip"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="skills__tooltip-name">
                  {skills[activeSkill].name}
                </span>
                <span className="skills__tooltip-desc">
                  {skills[activeSkill].description}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
