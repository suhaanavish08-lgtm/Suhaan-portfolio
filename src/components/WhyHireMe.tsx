import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { whyHireMe } from '../data/portfolioData';
import './WhyHireMe.css';

export default function WhyHireMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="whyhire section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="whyhire__header"
        >
          <div className="section-label">The Pitch</div>
          <h2 className="section-title">{whyHireMe.heading}</h2>
          <p className="whyhire__subtitle">{whyHireMe.subtitle}</p>
        </motion.div>

        <div className="whyhire__grid">
          {whyHireMe.cards.map((card, i) => (
            <motion.div
              key={card}
              className="whyhire__card glass-panel"
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              whileHover={{
                scale: 1.05,
                rotate: Math.random() > 0.5 ? 2 : -2,
                transition: { duration: 0.2 },
              }}
            >
              <span className="whyhire__card-icon">✦</span>
              <span className="whyhire__card-text">{card}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
