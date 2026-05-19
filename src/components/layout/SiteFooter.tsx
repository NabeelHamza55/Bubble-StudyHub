import { Link } from "react-router-dom";
import { SITE } from "../../config/site";
import { tabToPath } from "../../routes/tabRoutes";
import { FooterAttribution } from "./FooterAttribution";

interface SiteFooterProps {
  /** Show compact links on app pages vs full footer on landing */
  variant?: "full" | "compact";
}

const FOOTER_LINKS = [
  { label: "Dashboard", path: tabToPath("home") },
  { label: "Practice Exam", path: tabToPath("practice") },
  { label: "Doc Quiz", path: tabToPath("studyquiz") },
  { label: "Flashcards", path: tabToPath("quiz") },
  { label: "Study Material", path: tabToPath("topics") },
] as const;

export function SiteFooter({ variant = "compact" }: SiteFooterProps) {
  return (
    <footer className={`site-footer site-footer--${variant}`} role="contentinfo">
      <div className="site-footer-inner">
        {variant === "full" && (
          <div className="site-footer-brand">
            <p className="site-footer-logo">
              Bubble <span className="site-footer-logo-accent">Study Hub</span>
            </p>
            <p className="site-footer-tagline">{SITE.tagline}</p>
          </div>
        )}

        <nav className="site-footer-nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          {FOOTER_LINKS.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer-legal">
          <FooterAttribution className="site-footer-attribution" />
          <p className="site-footer-disclaimer">
            Not affiliated with Bubble.io. Exam content is study material only; questions are
            practice mocks, not official exam items.
          </p>
        </div>
      </div>
    </footer>
  );
}
