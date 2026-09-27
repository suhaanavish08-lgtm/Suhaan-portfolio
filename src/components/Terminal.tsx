import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { terminalCommands } from '../data/portfolioData';
import './Terminal.css';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to suhaan.terminal v2.0' },
    { type: 'output', content: 'Type "help" for available commands.\n' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [
      ...history,
      { type: 'input', content: `$ ${cmd}` },
    ];

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const response = terminalCommands[trimmed];
    if (response) {
      newHistory.push({ type: 'output', content: response });
    } else if (trimmed === '') {
      // empty
    } else {
      newHistory.push({
        type: 'output',
        content: `Command not found: ${trimmed}\nType "help" for available commands.`,
      });
    }

    setHistory(newHistory);
    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="terminal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="terminal-header">
              <div className="terminal-header__dots">
                <span className="terminal-header__dot terminal-header__dot--red" />
                <span className="terminal-header__dot terminal-header__dot--yellow" />
                <span className="terminal-header__dot terminal-header__dot--green" />
              </div>
              <span className="terminal-header__title">suhaan@portfolio:~</span>
              <div className="terminal-header__right">
                <span className="terminal-header__shortcut">Ctrl + /</span>
                <button
                  className="terminal-header__close"
                  onClick={onClose}
                  aria-label="Close terminal"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="terminal-body" ref={scrollRef}>
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`terminal-line ${
                    line.type === 'input'
                      ? 'terminal-line--input'
                      : 'terminal-line--output'
                  }`}
                >
                  {line.content.split('\n').map((l, j) => (
                    <div key={j}>{l || '\u00A0'}</div>
                  ))}
                </div>
              ))}
              <div className="terminal-input-line">
                <span className="terminal-prompt">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="terminal-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
