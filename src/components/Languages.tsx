import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe } from 'lucide-react';
import { languages } from '../data/portfolioData';
import './Languages.css';

export default function Languages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="languages section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Languages</div>
          <h2 className="section-title">I speak</h2>
        </motion.div>

        <div className="languages__list">
          {languages.map((lang, i) => (
            <motion.div
              key={lang}
              className="languages__item glass-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <Globe size={18} className="languages__icon" />
              <span className="languages__name">{lang}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
