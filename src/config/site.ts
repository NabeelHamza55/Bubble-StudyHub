/** Site-wide copy, SEO defaults, and legal. Set VITE_SITE_URL in .env for production canonical URLs. */
export const SITE = {
  name: "Bubble Certification Study Hub",
  shortName: "Bubble Study Hub",
  tagline: "Free Bubble Developer Certification prep — practice exams, flashcards, and study guides",
  description:
    "Prepare for the Bubble Developer Certification with 185+ practice questions, 100-question doc quiz, hard-mode multi-answer drills, flashcards across 7 syllabus topics, and curated official study resources. Free, browser-based, no account required.",
  keywords: [
    "Bubble certification",
    "Bubble developer certification",
    "Bubble.io exam prep",
    "Bubble practice exam",
    "no-code certification",
    "Bubble study guide",
    "Bubble flashcards",
    "Bubble workload exam",
  ],
  locale: "en_US",
  author: "Mughalsoft",
  copyrightHolder: "Mughalsoft",
  publisher: {
    name: "Mughalsoft",
    url: "",
  },
  creator: {
    name: "Nabeel Hamza",
    github: "https://github.com/NabeelHamza55",
    repo: "https://github.com/NabeelHamza55/Bubble-Certification",
  },
  get copyrightYear() {
    return new Date().getFullYear();
  },
  /** Override with VITE_SITE_URL for correct canonical/OG URLs in production. */
  url:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
    "https://bubble-certification-study-hub.example.com",
  twitterHandle: "",
} as const;

export const ATTRIBUTION = `Powered by ${SITE.publisher.name} · © ${SITE.copyrightYear} ${SITE.copyrightHolder} · Built by ${SITE.creator.name}`;
