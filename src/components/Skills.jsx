import {
  Code2, Terminal, FileCode, GitBranch, Brain, BarChart3,
  Globe, Puzzle, NotebookPen, Package, Film
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { technicalSkills, tools } from '../data/portfolioData'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import './Skills.css'

const iconMap = {
  'code-2': Code2,
  'terminal': Terminal,
  'file-code': FileCode,
  'git-branch': GitBranch,
  'brain': Brain,
  'bar-chart-3': BarChart3,
  'globe': Globe,
  'puzzle': Puzzle,
  'github': GithubIcon,
  'notebook-pen': NotebookPen,
  'package': Package,
  'film': Film,
}

function SkillTag({ skill }) {
  const Icon = iconMap[skill.icon]
  return (
    <div className="skill-tag">
      {Icon && <Icon size={14} className="skill-tag__icon" />}
      <span>{skill.name}</span>
    </div>
  )
}

export default function Skills() {
  const ref = useRevealOnScroll()

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">Skills</h2>
        </div>

        <div className="skills__grid reveal revealed">
          <div className="skills__group">
            <h3 className="skills__group-title">Technical Skills</h3>
            <div className="skills__tags">
              {technicalSkills.map((s) => (
                <SkillTag key={s.name} skill={s} />
              ))}
            </div>
          </div>

          <div className="skills__group">
            <h3 className="skills__group-title">Tools & Technologies</h3>
            <div className="skills__tags">
              {tools.map((s) => (
                <SkillTag key={s.name} skill={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
