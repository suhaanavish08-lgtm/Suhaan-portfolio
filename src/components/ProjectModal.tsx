import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-modal__overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal__content"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Project details: ${project.title}`}
      >
        <div className="project-modal__header">
          <div className="project-modal__header-dots">
            <span className="project-modal__dot" />
            <span className="project-modal__dot" />
            <span className="project-modal__dot" />
          </div>
          <span className="project-modal__header-title">
            project://{project.id}
          </span>
          <button
            className="project-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="project-modal__body">
          <div className="project-modal__tag-row">
            <span className="tag">{project.technology}</span>
          </div>

          <h2 className="project-modal__title">{project.title}</h2>

          <p className="project-modal__desc">{project.description}</p>

          <motion.p
            className="project-modal__caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            "{project.funnyCaption}"
          </motion.p>

          <div className="project-modal__actions">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <GithubIcon width={16} height={16} />
              View on GitHub
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="project-modal__footer">
          <span className="project-modal__footer-text">
            Press ESC or click outside to close
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
