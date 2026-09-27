import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalInfo } from '../data/portfolioData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">
              <span className="footer__logo-bracket">{'{'}</span>
              <span>S</span>
              <span className="footer__logo-bracket">{'}'}</span>
            </span>
            <p className="footer__credit">
              Built by {personalInfo.name}.
            </p>
          </div>

          <div className="footer__socials">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              <GithubIcon width={18} height={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <LinkedinIcon width={18} height={18} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__caffeine">
            Powered by questionable amounts of caffeine.
          </p>
          <code className="footer__exit">exit 0</code>
        </div>
      </div>
    </footer>
  );
}
