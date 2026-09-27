import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalInfo } from '../data/portfolioData';
import HeroTerminal from './HeroTerminal';
import './Hero.css';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Words are grouped to prevent breaking in the middle of a word on smaller screens
  return (
    <section id="home" className="hero section" ref={ref}>
      <div className="container hero__container">
        <div className="hero__content">
          <motion.div
            className="hero__label"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="hero__label-dot" />
            <span>Available for opportunities</span>
          </motion.div>

          <h1 className="hero__heading">
            {"Hi, I'm Suhaan.".split(' ').map((word, wordIdx, wordsArray) => {
              const wordStartIndex = wordsArray
                .slice(0, wordIdx)
                .reduce((acc, w) => acc + w.length + 1, 0);

              return (
                <span key={wordIdx} className="hero__word" style={{ display: 'inline-flex' }}>
                  {word.split('').map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      className="hero__char"
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + (wordStartIndex + charIdx) * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {personalInfo.role}
          </motion.p>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Currently trying to convince computers that I know what I'm doing.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <button
              className="btn-primary"
              onClick={() =>
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore the Chaos
              <ArrowDown size={16} />
            </button>
            <button
              className="btn-secondary"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="GitHub"
            >
              <GithubIcon width={20} height={20} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn"
            >
              <LinkedinIcon width={20} height={20} />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroTerminal />
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
