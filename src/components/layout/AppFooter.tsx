import { COPYRIGHT } from "../../config/site";

/** Footer for all study-hub app pages (not the marketing landing page). */
export function AppFooter() {
  return (
    <footer className="dashboard-footer" role="contentinfo">
      <p className="dashboard-footer-copyright">{COPYRIGHT}</p>
      <p className="dashboard-footer-note">
        Not affiliated with Bubble.io. Practice content only — not official exam questions.
      </p>
    </footer>
  );
}
