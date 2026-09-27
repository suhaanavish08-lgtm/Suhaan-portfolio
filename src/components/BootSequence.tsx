import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bootSequenceLines } from '../data/portfolioData';
import './BootSequence.css';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const skip = useCallback(() => {
    setIsExiting(true);
    localStorage.setItem('suhaan-portfolio-visited', 'true');
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    if (isExiting) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    bootSequenceLines.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, 400 + i * 350)
      );
    });

    // After all lines appear, mark complete
    timers.push(
      setTimeout(() => {
        setIsComplete(true);
      }, 400 + bootSequenceLines.length * 350 + 500)
    );

    // Auto-transition
    timers.push(
      setTimeout(() => {
        skip();
      }, 400 + bootSequenceLines.length * 350 + 1500)
    );

    return () => timers.forEach(clearTimeout);
  }, [isExiting, skip]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="boot-scanline" />
          <div className="boot-content">
            <div className="boot-terminal">
              {bootSequenceLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`boot-line ${
                    line === 'STATUS: SOMEHOW WORKING' ? 'boot-line--status' : ''
                  } ${line === '' ? 'boot-line--empty' : ''} ${
                    line === 'INITIALIZING SUHAAN.EXE' ? 'boot-line--title' : ''
                  }`}
                >
                  {line && (
                    <>
                      <span className="boot-prompt">{'>'}</span>
                      <span className="boot-text">{line}</span>
                      {line.includes('...') && (
                        <span className="boot-check"> ✓</span>
                      )}
                    </>
                  )}
                </motion.div>
              ))}
              {visibleLines > 0 && visibleLines < bootSequenceLines.length && (
                <span className="boot-cursor">_</span>
              )}
            </div>

            {isComplete && (
              <motion.div
                className="boot-ready"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Press any key or click to continue...
              </motion.div>
            )}
          </div>

          <button className="boot-skip" onClick={skip} aria-label="Skip boot sequence">
            SKIP →
          </button>

          {isComplete && (
            <div
              className="boot-click-overlay"
              onClick={skip}
              onKeyDown={skip}
              tabIndex={0}
              role="button"
              aria-label="Continue to portfolio"
            />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
