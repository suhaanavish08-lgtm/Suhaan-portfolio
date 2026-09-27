import { useState, useEffect, useCallback } from 'react';
import BootSequence from './components/BootSequence';
import CursorGlow from './components/CursorGlow';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Tools from './components/Tools';
import Projects from './components/Projects';
import WhyHireMe from './components/WhyHireMe';
import Interests from './components/Interests';
import Languages from './components/Languages';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { DoNotClickButton, KonamiOverlay, useKonamiCode } from './components/EasterEggs';

export default function App() {
  const [showBoot, setShowBoot] = useState(() => {
    return !localStorage.getItem('suhaan-portfolio-visited');
  });
  const [appReady, setAppReady] = useState(!showBoot);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [showKonami, setShowKonami] = useState(false);

  const handleBootComplete = useCallback(() => {
    setShowBoot(false);
    setAppReady(true);
  }, []);

  // Terminal shortcut: Ctrl + /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Konami code
  const handleKonami = useCallback(() => {
    setShowKonami(true);
    setTimeout(() => setShowKonami(false), 2500);
  }, []);

  const konamiHandler = useKonamiCode(handleKonami);

  useEffect(() => {
    window.addEventListener('keydown', konamiHandler);
    return () => window.removeEventListener('keydown', konamiHandler);
  }, [konamiHandler]);

  if (showBoot) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  if (!appReady) return null;

  return (
    <>
      <CursorGlow />
      <InteractiveBackground />
      <Navbar onTerminalToggle={() => setTerminalOpen((prev) => !prev)} />

      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Tools />
        <Projects />
        <WhyHireMe />
        <DoNotClickButton />
        <Interests />
        <Languages />
        <Contact />
      </main>

      <Footer />

      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      <KonamiOverlay show={showKonami} />
    </>
  );
}
