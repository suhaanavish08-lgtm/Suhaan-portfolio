import { GraduationCap, MapPin, BookOpen } from 'lucide-react'
import { education } from '../data/portfolioData'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import './Education.css'

export default function Education() {
  const ref = useRevealOnScroll()

  return (
    <section id="education" className="section education" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Academic</span>
          <h2 className="section-title">Education</h2>
        </div>

        <div className="education__card reveal revealed">
          <div className="education__accent-line" aria-hidden="true" />
          <div className="education__content">
            <div className="education__header">
              <div className="education__icon">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="education__institution">{education.institution}</h3>
                <p className="education__course">{education.course}</p>
              </div>
            </div>

            <div className="education__details">
              <div className="education__detail">
                <MapPin size={14} />
                <span>{education.location}</span>
              </div>
              <div className="education__detail education__detail--status">
                <span className="education__status-dot" />
                <span>{education.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
