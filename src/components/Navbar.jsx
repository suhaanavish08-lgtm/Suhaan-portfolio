import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, personalInfo } from '../data/portfolioData'
import { useScrollSpy } from '../hooks/useScrollSpy'
import './Navbar.css'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
  const activeSection = useScrollSpy(sectionIds)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault()
      setIsMobileOpen(false)
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    []
  )

  return (
    <header className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, '#home')}>
          {personalInfo.shortName}
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link${activeSection === link.href.replace('#', '') ? ' navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile overlay + menu */}
      <div
        className={`navbar__mobile-overlay${isMobileOpen ? ' open' : ''}`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />
      <div className={`navbar__mobile${isMobileOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <ul role="list">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ transitionDelay: isMobileOpen ? `${i * 60 + 100}ms` : '0ms' }}>
              <a
                href={link.href}
                className={`navbar__mobile-link${activeSection === link.href.replace('#', '') ? ' navbar__mobile-link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
