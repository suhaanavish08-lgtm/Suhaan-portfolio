import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, GitBranch, BookOpen, Package, Film } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { tools } from '../data/portfolioData';
import './Tools.css';

const toolIcons: Record<string, React.ReactNode> = {
  'Visual Studio Code': <Code2 size={24} />,
  'Git': <GitBranch size={24} />,
  'GitHub': <GithubIcon width={24} height={24} />,
  'Jupyter Notebook': <BookOpen size={24} />,
  'Anaconda': <Package size={24} />,
  'DaVinci Resolve': <Film size={24} />,
};

export default function Tools() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="tools section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Tools</div>
          <h2 className="section-title">My Arsenal</h2>
        </motion.div>

        <div className="tools__grid">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="tools__card glass-panel animated-border"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="tools__icon">
                {toolIcons[tool.name] || <Code2 size={24} />}
              </div>
              <h3 className="tools__name">{tool.name}</h3>
              <p className="tools__desc">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
