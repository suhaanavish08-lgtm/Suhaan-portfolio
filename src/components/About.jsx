import { MapPin, GraduationCap, BookOpen, User } from 'lucide-react'
import { aboutText, education } from '../data/portfolioData'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import './About.css'

export default function About() {
  const ref = useRevealOnScroll()

  const infoItems = [
    { icon: GraduationCap, label: 'University', value: education.institution },
    { icon: BookOpen, label: 'Course', value: education.course },
    { icon: MapPin, label: 'Location', value: education.location },
    { icon: User, label: 'Status', value: education.status },
  ]

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Background</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about__grid reveal revealed">
          <div className="about__text">
            {aboutText.map((p, i) => (
              <p key={i} className="about__paragraph">{p}</p>
            ))}
          </div>

          <div className="about__info">
            {infoItems.map((item) => (
              <div key={item.label} className="about__info-item">
                <div className="about__info-icon">
                  <item.icon size={16} />
                </div>
                <div>
                  <span className="about__info-label">{item.label}</span>
                  <span className="about__info-value">{item.value}</span>
                </div>
              </div>
            ))}

            {/* Decorative element */}
            <div className="about__decoration" aria-hidden="true">
              <span className="about__decoration-bracket">{'{'}</span>
              <span className="about__decoration-dots">···</span>
              <span className="about__decoration-bracket">{'}'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
