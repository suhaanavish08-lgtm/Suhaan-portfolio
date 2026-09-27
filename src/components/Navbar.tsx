import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  onTerminalToggle: () => void;
}

export default function Navbar({ onTerminalToggle }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [logoSpin, setLogoSpin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll spy
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  }, []);

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount >= 5) {
      setLogoSpin(true);
      setLogoClicks(0);
      setTimeout(() => setLogoSpin(false), 2000);
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="navbar__inner container">
          <button
            className={`navbar__logo ${logoSpin ? 'navbar__logo--spin' : ''}`}
            onClick={handleLogoClick}
            aria-label="Logo"
          >
            <span className="navbar__logo-bracket">{'{'}</span>
            <span className="navbar__logo-text">S</span>
            <span className="navbar__logo-bracket">{'}'}</span>
          </button>

          <ul className="navbar__links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`navbar__link ${
                    activeSection === item.id ? 'navbar__link--active' : ''
                  }`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="navbar__indicator"
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <button
              className="navbar__terminal-btn"
              onClick={onTerminalToggle}
              aria-label="Open terminal"
              title="Ctrl + /"
            >
              <Terminal size={16} />
            </button>

            <button
              className="navbar__menu-btn"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu__inner">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  className={`mobile-menu__link ${
                    activeSection === item.id ? 'mobile-menu__link--active' : ''
                  }`}
                  onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="mobile-menu__number">0{i + 1}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
