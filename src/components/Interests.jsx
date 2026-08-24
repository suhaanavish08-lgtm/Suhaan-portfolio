import {
  Code2, Brain, BarChart3, Layers, Globe,
  Cpu, Gamepad2, Film, Hammer
} from 'lucide-react'
import { interests } from '../data/portfolioData'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import './Interests.css'

const iconMap = {
  'code-2': Code2,
  'brain': Brain,
  'bar-chart-3': BarChart3,
  'layers': Layers,
  'globe': Globe,
  'cpu': Cpu,
  'gamepad-2': Gamepad2,
  'film': Film,
  'hammer': Hammer,
}

export default function Interests() {
  const ref = useRevealOnScroll()

  return (
    <section id="interests" className="section interests" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Beyond Code</span>
          <h2 className="section-title">Interests & Hobbies</h2>
        </div>

        <div className="interests__grid reveal revealed">
          {interests.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <div key={item.name} className="interest-item">
                {Icon && <Icon size={18} className="interest-item__icon" />}
                <span className="interest-item__label">{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
