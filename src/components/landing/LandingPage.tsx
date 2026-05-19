import { Link } from "react-router-dom";
import {
  FLASHCARD_CATEGORIES,
  HARD_MA_QUESTIONS,
  PRACTICE_EXAM_QUESTIONS,
  STUDY_QUIZ_QUESTIONS,
} from "../../data";
import { SITE } from "../../config/site";
import { usePageSeo } from "../../hooks/usePageSeo";
import { SEO_PAGES } from "../../seo/seoConfig";
import { landingJsonLd } from "../../seo/structuredData";
import { tabToPath } from "../../routes/tabRoutes";
import { SiteFooter } from "../layout/SiteFooter";
import { ThemeToggle } from "../ui/ThemeToggle";
import { landingAnchorClick } from "./LandingAnchorNav";
import "../../styles/landing.css";

const FEATURES = [
  {
    title: "Practice Exam",
    description: "50 cert-style questions — scenarios, MC, multi-answer, and true/false with explanations.",
    path: tabToPath("practice"),
    stat: `${PRACTICE_EXAM_QUESTIONS.length} questions`,
  },
  {
    title: "Doc & Scenario Quiz",
    description: "100 manual-based questions mirroring how Bubble tests real-world builder knowledge.",
    path: tabToPath("studyquiz"),
    stat: `${STUDY_QUIZ_QUESTIONS.length} questions`,
  },
  {
    title: "Hard Mode (MA only)",
    description: "35 expert multi-answer traps — miss one correct option and the question is wrong.",
    path: tabToPath("hardquiz"),
    stat: `${HARD_MA_QUESTIONS.length} questions`,
  },
  {
    title: "Flashcards",
    description: "Seven official syllabus areas. Reveal answers and track progress in your browser.",
    path: tabToPath("quiz"),
    stat: `${FLASHCARD_CATEGORIES.reduce((n, c) => n + c.q.length, 0)} cards`,
  },
  {
    title: "Study Material",
    description: "Curated docs, videos, and blogs mapped to certification topics.",
    path: tabToPath("topics"),
    stat: "7 topic areas",
  },
  {
    title: "Resources",
    description: "Community mock tests, expert advice, and workload concepts to memorize.",
    path: tabToPath("extra"),
    stat: "External links",
  },
] as const;

const FAQ = [
  {
    q: "What is the Bubble Developer Certification?",
    a: "An official Bubble.io exam: 90 questions, 3.5 hours, 80% required to pass. Topics span the manual, data, workflows, security, plugins, and performance/workload.",
  },
  {
    q: "Is Bubble Study Hub free?",
    a: "Yes. No account, no paywall. Quizzes and flashcard progress save locally in your browser.",
  },
  {
    q: "Are these real exam questions?",
    a: "No. Official exam items are not public. Everything here is original practice content aligned with the syllabus.",
  },
  {
    q: "Where should I start?",
    a: "Skim Study Material (especially Workload), run Flashcards, complete the 100-question doc quiz, then Hard Mode and the 50-question practice exam under timed conditions.",
  },
] as const;

export function LandingPage() {
  const origin = typeof window !== "undefined" ? window.location.origin : SITE.url;
  const jsonLd = landingJsonLd(origin);
  usePageSeo(SEO_PAGES.landing, jsonLd);

  const totalQuestions =
    PRACTICE_EXAM_QUESTIONS.length + STUDY_QUIZ_QUESTIONS.length + HARD_MA_QUESTIONS.length;

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header-inner">
          <Link to="/" className="landing-logo" aria-label={`${SITE.name} home`}>
            Bubble <span className="landing-logo-accent">Study Hub</span>
          </Link>
          <nav className="landing-header-nav" aria-label="Primary">
            <a href="#features" onClick={(e) => landingAnchorClick(e, "features")}>
              Features
            </a>
            <a href="#exam-facts" onClick={(e) => landingAnchorClick(e, "exam-facts")}>
              Exam facts
            </a>
            <a href="#faq" onClick={(e) => landingAnchorClick(e, "faq")}>
              FAQ
            </a>
            <ThemeToggle compact />
            <Link to={tabToPath("home")} className="landing-cta-header">
              Open study hub
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="landing-hero" aria-labelledby="hero-heading">
          <div className="landing-hero-inner">
            <p className="landing-eyebrow">Bubble Developer Certification</p>
            <h1 id="hero-heading" className="landing-title">
              Free prep hub to pass the Bubble certification exam
            </h1>
            <p className="landing-lead">
              {SITE.description}
            </p>
            <div className="landing-hero-actions">
              <Link to={tabToPath("home")} className="landing-btn landing-btn-primary">
                Start studying — free
              </Link>
              <Link to={tabToPath("practice")} className="landing-btn landing-btn-secondary">
                Jump to practice exam
              </Link>
            </div>
            <ul className="landing-hero-stats" aria-label="Study hub at a glance">
              <li>
                <strong>{totalQuestions}+</strong>
                <span>Practice questions</span>
              </li>
              <li>
                <strong>7</strong>
                <span>Syllabus topics</span>
              </li>
              <li>
                <strong>80%</strong>
                <span>Pass threshold</span>
              </li>
              <li>
                <strong>$0</strong>
                <span>Always free</span>
              </li>
            </ul>
          </div>
        </section>

        <section id="features" className="landing-section" aria-labelledby="features-heading">
          <div className="landing-section-inner">
            <h2 id="features-heading" className="landing-section-title">
              Everything you need in one study hub
            </h2>
            <p className="landing-section-lead">
              Practice formats match the real exam — including multi-answer questions where you must
              select every correct option.
            </p>
            <ul className="landing-features-grid">
              {FEATURES.map((f) => (
                <li key={f.path}>
                  <article className="landing-feature-card">
                    <p className="landing-feature-stat">{f.stat}</p>
                    <h3 className="landing-feature-title">{f.title}</h3>
                    <p className="landing-feature-desc">{f.description}</p>
                    <Link to={f.path} className="landing-feature-link">
                      Open {f.title} →
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="exam-facts"
          className="landing-section landing-section-muted"
          aria-labelledby="exam-heading"
        >
          <div className="landing-section-inner">
            <h2 id="exam-heading" className="landing-section-title landing-section-title--center">
              Official exam at a glance
            </h2>
            <p className="landing-section-lead landing-section-lead--center">
              Plan your study around the real format. Our practice exams help you build speed and
              accuracy before test day.
            </p>
            <div className="landing-exam-facts-row">
              <article className="landing-exam-fact-card">
                <p className="landing-exam-fact-value">90</p>
                <p className="landing-exam-fact-label">Questions</p>
              </article>
              <article className="landing-exam-fact-card">
                <p className="landing-exam-fact-value">3.5 hrs</p>
                <p className="landing-exam-fact-label">Time limit</p>
              </article>
              <article className="landing-exam-fact-card">
                <p className="landing-exam-fact-value">80%</p>
                <p className="landing-exam-fact-label">To pass</p>
              </article>
              <article className="landing-exam-fact-card">
                <p className="landing-exam-fact-value">Multi-answer</p>
                <p className="landing-exam-fact-label">Hardest format</p>
              </article>
            </div>
          </div>
        </section>

        <section className="landing-section landing-alert" aria-labelledby="workload-heading">
          <div className="landing-section-inner landing-alert-inner">
            <h2 id="workload-heading" className="landing-alert-title">
              Workload is the #1 trap
            </h2>
            <p>
              Certified developers consistently say Performance &amp; Workload is what they were
              least prepared for. Don&apos;t skip Section 06 — constraints, workload units, and
              client vs server logic show up often.
            </p>
            <Link to={tabToPath("topics")} className="landing-feature-link">
              Browse study material →
            </Link>
          </div>
        </section>

        <section id="faq" className="landing-section" aria-labelledby="faq-heading">
          <div className="landing-section-inner landing-faq">
            <h2 id="faq-heading" className="landing-section-title">
              Frequently asked questions
            </h2>
            <dl>
              {FAQ.map((item) => (
                <div key={item.q} className="landing-faq-item">
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="landing-cta-section" aria-labelledby="cta-heading">
          <div className="landing-section-inner">
            <div className="landing-cta-card">
              <p className="landing-cta-eyebrow">Free · No account · Works offline</p>
              <h2 id="cta-heading" className="landing-cta-title">
                Ready to pass the Bubble certification?
              </h2>
              <p className="landing-cta-lead">
                Open the study hub and pick up where you left off — quizzes, flashcards, and
                progress save automatically in your browser.
              </p>
              <ul className="landing-cta-perks" aria-label="What's included">
                <li>185+ practice questions</li>
                <li>7-topic flashcards</li>
                <li>Official study links</li>
              </ul>
              <div className="landing-cta-actions">
                <Link to={tabToPath("home")} className="landing-btn landing-btn-primary landing-btn-lg">
                  Open study hub
                </Link>
                <Link to={tabToPath("studyquiz")} className="landing-btn landing-btn-secondary landing-btn-lg">
                  Start doc quiz
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="full" />
    </div>
  );
}
