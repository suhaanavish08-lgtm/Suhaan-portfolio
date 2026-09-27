import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Send, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalInfo } from '../data/portfolioData';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="contact__header"
        >
          <div className="section-label">Contact</div>
          <h2 className="section-title">Want to talk?</h2>
          <p className="section-subtitle">
            Have a project, internship opportunity, or just want to say hi?
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact__links">
              <a href={`mailto:${personalInfo.email}`} className="contact__link glass-panel">
                <div className="contact__link-icon">
                  <Mail size={20} />
                </div>
                <div className="contact__link-info">
                  <span className="contact__link-label">Email</span>
                  <span className="contact__link-value">{personalInfo.email}</span>
                </div>
                <ExternalLink size={14} className="contact__link-arrow" />
              </a>

              <a href={`tel:${personalInfo.phone}`} className="contact__link glass-panel">
                <div className="contact__link-icon">
                  <Phone size={20} />
                </div>
                <div className="contact__link-info">
                  <span className="contact__link-label">Phone</span>
                  <span className="contact__link-value">{personalInfo.phone}</span>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link glass-panel"
              >
                <div className="contact__link-icon">
                  <GithubIcon width={20} height={20} />
                </div>
                <div className="contact__link-info">
                  <span className="contact__link-label">GitHub</span>
                  <span className="contact__link-value">suhaanavish08-lgtm</span>
                </div>
                <ExternalLink size={14} className="contact__link-arrow" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link glass-panel"
              >
                <div className="contact__link-icon">
                  <LinkedinIcon width={20} height={20} />
                </div>
                <div className="contact__link-info">
                  <span className="contact__link-label">LinkedIn</span>
                  <span className="contact__link-value">Suhaan Avish</span>
                </div>
                <ExternalLink size={14} className="contact__link-arrow" />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isSubmitted ? (
              <motion.div
                className="contact__success glass-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                <span className="contact__success-emoji">🚀</span>
                <h3 className="contact__success-title">
                  Message successfully launched into the void
                </h3>
                <p className="contact__success-text">
                  It's out there now. Somewhere. Probably.
                </p>
                <button
                  className="btn-secondary"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form className="contact__form glass-panel" onSubmit={handleSubmit}>
                <div className="contact__field">
                  <label htmlFor="contact-name" className="contact__label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="contact__input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-email" className="contact__label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="contact__input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-message" className="contact__label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="contact__textarea"
                    placeholder="Tell me something interesting..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <button type="submit" className="btn-primary contact__submit">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
