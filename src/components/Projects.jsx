import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { projects } from '../data/portfolioData'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import './Projects.css'

function ProjectCard({ project, index }) {
  return (
    <article className="project-card" style={{ '--card-delay': `${index * 0.1}s` }}>
      {/* Abstract visual header */}
      <div className="project-card__visual" style={{ background: project.gradient }}>
        <div className="project-card__pattern" aria-hidden="true">
          <div className="project-card__grid-lines">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="project-card__grid-line" style={{
                left: `${20 * (i + 1)}%`,
                opacity: 0.3 - i * 0.04,
              }} />
            ))}
          </div>
          <div className="project-card__circle" style={{
            borderColor: project.accentColor,
          }} />
          <div className="project-card__dot" style={{
            background: project.accentColor,
          }} />
        </div>
        <span className="project-card__tech-badge">{project.tech}</span>
      </div>

      {/* Card body */}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__link"
          aria-label={`View ${project.title} on GitHub`}
        >
          <GithubIcon size={15} />
          <span>View on GitHub</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </article>
  )
}

export default function Projects() {
  const ref = useRevealOnScroll()

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Work</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            A selection of projects I've built while learning and exploring.
          </p>
        </div>

        <div className="projects__grid reveal revealed">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
