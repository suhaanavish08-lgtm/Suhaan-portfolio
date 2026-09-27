import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutText, systemStatus } from '../data/portfolioData';
import './About.css';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">About</div>
          <h2 className="section-title">Who am I?</h2>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__text-block"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {aboutText.split('\n\n').map((paragraph, i) => (
              <p key={i} className="about__paragraph">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            className="about__status-panel glass-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="about__status-header">
              <span className="about__status-icon">⚙</span>
              SYSTEM STATUS
            </div>
            <div className="about__status-list">
              {systemStatus.map((item, i) => (
                <motion.div
                  key={item.name}
                  className="about__status-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                >
                  <div className="about__status-left">
                    <span
                      className={`about__status-dot ${
                        item.status === 'ONLINE'
                          ? 'about__status-dot--online'
                          : item.status === 'ERROR'
                          ? 'about__status-dot--error'
                          : 'about__status-dot--warning'
                      }`}
                    />
                    <span className="about__status-name">{item.name}</span>
                  </div>
                  <span
                    className={`about__status-value ${
                      item.status === 'ONLINE'
                        ? 'about__status-value--online'
                        : item.status === 'ERROR'
                        ? 'about__status-value--error'
                        : 'about__status-value--warning'
                    }`}
                  >
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="about__status-footer">
              Last updated: just now • Uptime: questionable
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
