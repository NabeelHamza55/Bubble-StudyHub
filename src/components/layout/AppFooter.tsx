import { FooterAttribution } from "./FooterAttribution";

/** Footer for all study-hub app pages (not the marketing landing page). */
export function AppFooter() {
  return (
    <footer className="dashboard-footer" role="contentinfo">
      <FooterAttribution className="dashboard-footer-attribution" />
      <p className="dashboard-footer-note">
        Not affiliated with Bubble.io. Practice content only — not official exam questions.
      </p>
    </footer>
  );
}
