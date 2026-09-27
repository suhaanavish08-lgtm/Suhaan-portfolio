import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { education } from '../data/portfolioData';
import './Education.css';

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="education section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Education</div>
          <h2 className="section-title">Where I study</h2>
        </motion.div>

        <motion.div
          className="education__card glass-panel animated-border"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="education__icon">
            <GraduationCap size={28} />
          </div>
          <div className="education__info">
            <h3 className="education__institution">{education.institution}</h3>
            <p className="education__degree">{education.degree}</p>
            <div className="education__meta">
              <span className="education__location">
                <MapPin size={14} />
                {education.location}
              </span>
              <span className="education__status-badge">{education.status}</span>
            </div>
          </div>
          <motion.p
            className="education__caption"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            "{education.caption}"
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
