import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { interests } from '../data/portfolioData';
import './Interests.css';

export default function Interests() {
  const [activeInterest, setActiveInterest] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="interests section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Interests</div>
          <h2 className="section-title">Beyond the code</h2>
        </motion.div>

        <div className="interests__grid">
          {interests.map((interest, i) => (
            <motion.button
              key={interest.name}
              className={`interests__tag glass-panel ${
                activeInterest === i ? 'interests__tag--active' : ''
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setActiveInterest(i)}
              onMouseLeave={() => setActiveInterest(null)}
              onClick={() =>
                setActiveInterest(activeInterest === i ? null : i)
              }
            >
              <span className="interests__tag-name">{interest.name}</span>
              <AnimatePresence>
                {activeInterest === i && (
                  <motion.span
                    className="interests__tag-desc"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {interest.funnyCaption}
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
