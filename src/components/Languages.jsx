import { MessageCircle } from 'lucide-react'
import { languages } from '../data/portfolioData'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import './Languages.css'

export default function Languages() {
  const ref = useRevealOnScroll()

  return (
    <section id="languages" className="section languages" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Communication</span>
          <h2 className="section-title">Languages</h2>
        </div>

        <div className="languages__list reveal revealed">
          {languages.map((lang) => (
            <div key={lang} className="language-item">
              <MessageCircle size={16} className="language-item__icon" />
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
