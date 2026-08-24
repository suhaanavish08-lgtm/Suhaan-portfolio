import { Mail, ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { personalInfo } from '../data/portfolioData'
import './Hero.css'

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        {/* Text column */}
        <div className="hero__content">
          <span className="hero__eyebrow">{personalInfo.tagline}</span>
          <h1 className="hero__title">{personalInfo.name}</h1>
          <p className="hero__description">{personalInfo.description}</p>

          <div className="hero__actions">
            <button className="btn btn-primary" onClick={scrollToProjects}>
              View Projects
              <ArrowDown size={15} />
            </button>
            <button className="btn btn-secondary" onClick={scrollToContact}>
              Get In Touch
            </button>
          </div>

          <div className="hero__social">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="GitHub profile"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hero__social-link"
              aria-label="Send email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Visual column — code editor inspired */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__terminal">
            <div className="hero__terminal-bar">
              <div className="hero__terminal-dots">
                <span></span><span></span><span></span>
              </div>
              <span className="hero__terminal-title">suhaan — portfolio</span>
            </div>
            <div className="hero__terminal-body">
              <div className="hero__code-line">
                <span className="code-keyword">const</span>{' '}
                <span className="code-var">developer</span>{' '}
                <span className="code-op">=</span>{' '}
                <span className="code-bracket">{'{'}</span>
              </div>
              <div className="hero__code-line hero__code-indent">
                <span className="code-key">name</span>
                <span className="code-op">:</span>{' '}
                <span className="code-string">"Suhaan"</span>
                <span className="code-op">,</span>
              </div>
              <div className="hero__code-line hero__code-indent">
                <span className="code-key">focus</span>
                <span className="code-op">:</span>{' '}
                <span className="code-string">"AI & Data Science"</span>
                <span className="code-op">,</span>
              </div>
              <div className="hero__code-line hero__code-indent">
                <span className="code-key">skills</span>
                <span className="code-op">:</span>{' '}
                <span className="code-bracket">[</span>
                <span className="code-string">"Python"</span>
                <span className="code-op">,</span>{' '}
                <span className="code-string">"C"</span>
                <span className="code-op">,</span>{' '}
                <span className="code-string">"HTML"</span>
                <span className="code-bracket">]</span>
                <span className="code-op">,</span>
              </div>
              <div className="hero__code-line hero__code-indent">
                <span className="code-key">building</span>
                <span className="code-op">:</span>{' '}
                <span className="code-bool">true</span>
              </div>
              <div className="hero__code-line">
                <span className="code-bracket">{'}'}</span>
                <span className="code-op">;</span>
              </div>
              <div className="hero__code-line hero__code-empty"></div>
              <div className="hero__code-line">
                <span className="code-comment">// Currently building cool things ▊</span>
              </div>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="hero__float hero__float--1">
            <span className="hero__float-tag">Python</span>
          </div>
          <div className="hero__float hero__float--2">
            <span className="hero__float-tag">AI</span>
          </div>
          <div className="hero__float hero__float--3">
            <span className="hero__float-tag">Data</span>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="hero__glow" aria-hidden="true"></div>
    </section>
  )
}
