import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const terminalLines = [
  { prompt: '$ whoami', response: 'suhaan', delay: 0 },
  { prompt: '$ skills', response: 'python / c / ai / data', delay: 1.2 },
  { prompt: '$ status', response: 'somehow functioning', delay: 2.4 },
  { prompt: '$ coffee', response: 'required', delay: 3.6 },
];

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentTypedText, setCurrentTypedText] = useState('');
  const [showResponse, setShowResponse] = useState<boolean[]>([]);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;

    const currentLine = terminalLines[visibleLines];

    if (typingIndex < currentLine.prompt.length) {
      const timer = setTimeout(() => {
        setCurrentTypedText((prev) => prev + currentLine.prompt[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 50 + Math.random() * 40);
      return () => clearTimeout(timer);
    }

    // Prompt fully typed, show response after delay
    const responseTimer = setTimeout(() => {
      setShowResponse((prev) => {
        const next = [...prev];
        next[visibleLines] = true;
        return next;
      });

      // Move to next line
      setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        setTypingIndex(0);
        setCurrentTypedText('');
      }, 600);
    }, 400);

    return () => clearTimeout(responseTimer);
  }, [visibleLines, typingIndex]);

  return (
    <div className="hero-terminal">
      <div className="hero-terminal__header">
        <div className="hero-terminal__dots">
          <span className="hero-terminal__dot hero-terminal__dot--red" />
          <span className="hero-terminal__dot hero-terminal__dot--yellow" />
          <span className="hero-terminal__dot hero-terminal__dot--green" />
        </div>
        <span className="hero-terminal__title">suhaan@portfolio:~</span>
      </div>
      <div className="hero-terminal__body">
        {terminalLines.map((line, i) => {
          if (i > visibleLines) return null;
          const isCurrentLine = i === visibleLines;

          return (
            <div key={i} className="hero-terminal__line-group">
              <div className="hero-terminal__prompt-line">
                <span className="hero-terminal__prompt-symbol">
                  {isCurrentLine ? currentTypedText : line.prompt}
                </span>
                {isCurrentLine && typingIndex < line.prompt.length && (
                  <span className="hero-terminal__cursor">▌</span>
                )}
              </div>
              {showResponse[i] && (
                <motion.div
                  className="hero-terminal__response"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {line.response}
                </motion.div>
              )}
            </div>
          );
        })}
        {visibleLines >= terminalLines.length && (
          <div className="hero-terminal__prompt-line">
            <span className="hero-terminal__prompt-symbol">$ </span>
            <span className="hero-terminal__cursor">▌</span>
          </div>
        )}
      </div>
    </div>
  );
}
