import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EasterEggs.css';

export function DoNotClickButton() {
  const [stage, setStage] = useState(0);

  const handleClick = () => {
    setStage((prev) => prev + 1);
    if (stage >= 2) {
      setTimeout(() => setStage(0), 3000);
    }
  };

  return (
    <div className="donotclick">
      <motion.button
        className="donotclick__btn glass-panel"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {stage === 0 && '⚠ DO NOT CLICK'}
        {stage === 1 && '⚠ SERIOUSLY, DON\'T'}
        {stage >= 2 && '💀 WHY'}
      </motion.button>

      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            className="donotclick__warning"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            WARNING: You were specifically told not to click this.
          </motion.div>
        )}
        {stage >= 2 && (
          <motion.div
            className="donotclick__warning donotclick__warning--final"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Respectfully, why?
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function useKonamiCode(callback: () => void) {
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA',
  ];
  let index = 0;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === konamiSequence[index]) {
        index++;
        if (index === konamiSequence.length) {
          callback();
          index = 0;
        }
      } else {
        index = 0;
      }
    },
    [callback]
  );

  return handleKeyDown;
}

export function KonamiOverlay({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="konami-overlay"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.4, type: 'spring' }}
        >
          <div className="konami-text">
            <span className="konami-icon">🎮</span>
            <span>CHEAT MODE ACTIVATED</span>
            <span className="konami-sub">Just kidding. But nice find.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
