import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects, type Project } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import './Projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="projects section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Projects</div>
          <h2 className="section-title">What I've built</h2>
          <p className="section-subtitle">
            A curated selection of things that somehow work.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className="projects__card glass-panel"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
            >
              <div className="projects__card-header">
                <span className="projects__card-number">
                  0{i + 1}
                </span>
                <ExternalLink size={16} className="projects__card-arrow" />
              </div>

              <h3 className="projects__card-title">{project.title}</h3>

              <p className="projects__card-desc">{project.description}</p>

              <div className="projects__card-footer">
                <span className="tag">{project.technology}</span>
                <span className="projects__card-caption">
                  {project.funnyCaption}
                </span>
              </div>

              <div className="projects__card-glow" />
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
