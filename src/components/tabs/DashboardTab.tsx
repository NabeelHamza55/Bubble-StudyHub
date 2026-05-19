import { useNavigate } from "react-router-dom";
import {
  FLASHCARD_CATEGORIES,
  HARD_MA_QUESTIONS,
  PRACTICE_EXAM_QUESTIONS,
  STUDY_QUIZ_QUESTIONS,
} from "../../data";
import { tabToPath } from "../../routes/tabRoutes";
import { TabIcon } from "../icons/TabIcons";
import { BRAND } from "../../theme/colors";
import type { TabId } from "../../types";

interface DashboardTabProps {
  totalFlashcards: number;
}

const QUICK_ACTIONS: {
  tab: TabId;
  title: string;
  description: string;
  accent: string;
}[] = [
  {
    tab: "practice",
    title: "Practice Exam",
    description: "50 scenario, MC, multi-answer, and T/F questions with explanations.",
    accent: BRAND.primary,
  },
  {
    tab: "studyquiz",
    title: "Doc & Scenario Quiz",
    description: "100 manual-based questions with real-world scenarios before the mock exam.",
    accent: "#6D28D9",
  },
  {
    tab: "hardquiz",
    title: "Hard Mode (MA)",
    description: "35 expert multi-answer-only traps—select every correct option or fail.",
    accent: "#B91C1C",
  },
  {
    tab: "quiz",
    title: "Flashcards",
    description: "Reveal answers across all 7 certification topic areas.",
    accent: "#0369A1",
  },
  {
    tab: "topics",
    title: "Study Material",
    description: "Curated docs, videos, and blogs organized by official syllabus.",
    accent: "#047857",
  },
  {
    tab: "extra",
    title: "Resources",
    description: "Mock tests, expert advice, and workload concepts to memorize.",
    accent: "#B45309",
  },
];

const STUDY_PATH = [
  "Skim Study Material for weak areas (start with Workload — Section 06).",
  "Run through Flashcards until you can answer without peeking.",
  "Complete the Doc & Scenario Quiz (100 Qs) to validate manual concepts.",
  "Crush Hard Mode (35 MA-only) — aim for 85%+ before the mock exam.",
  "Take the Practice Exam under timed conditions; aim for 80%+.",
  "Review wrong answers and revisit linked manual sections.",
];

export function DashboardTab({ totalFlashcards }: DashboardTabProps) {
  const navigate = useNavigate();
  const go = (tab: TabId) => navigate(tabToPath(tab));
  const examCount = PRACTICE_EXAM_QUESTIONS.length;

  return (
    <div className="dashboard">
      <section className="dashboard-hero">
        <p className="dashboard-eyebrow">Bubble Developer Certification</p>
        <h2 className="dashboard-welcome">Welcome back — let&apos;s get you certified.</h2>
        <p className="dashboard-lead">
          Your all-in-one prep hub: practice questions, flashcards, official-topic resources, and
          community links. Pick a starting point below or jump straight into the exam simulator.
        </p>
        <div className="dashboard-hero-actions">
          <button type="button" className="dashboard-btn-primary" onClick={() => go("studyquiz")}>
            Start doc quiz (100 Qs)
          </button>
          <button type="button" className="dashboard-btn-secondary" onClick={() => go("practice")}>
            Practice exam
          </button>
          <button type="button" className="dashboard-btn-secondary" onClick={() => go("quiz")}>
            Flashcards
          </button>
        </div>
      </section>

      <section className="dashboard-stats" aria-label="Study hub overview">
        <StatCard label="Doc quiz" value={String(STUDY_QUIZ_QUESTIONS.length)} hint="Manual & scenarios" />
        <StatCard label="Hard mode" value={String(HARD_MA_QUESTIONS.length)} hint="MA-only expert" />
        <StatCard label="Practice exam" value={String(examCount)} hint="Cert-style mock" />
        <StatCard label="Flashcards" value={String(totalFlashcards)} hint="Across 7 topics" />
        <StatCard label="Pass score" value="80%" hint="Official exam threshold" />
      </section>

      <section className="dashboard-alert">
        <span className="dashboard-alert-icon" aria-hidden>
          🔥
        </span>
        <div>
          <h3 className="dashboard-alert-title">Workload is the #1 trap</h3>
          <p className="dashboard-alert-text">
            Certified devs consistently say Performance &amp; Workload is what they were least
            prepared for. Don&apos;t skip Section 06 — constraints, WU, and client vs server logic
            show up often on the real exam.
          </p>
        </div>
      </section>

      <section className="dashboard-section">
        <h3 className="dashboard-section-title">Quick actions</h3>
        <div className="dashboard-actions-grid">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.tab}
              type="button"
              className="dashboard-action-card"
              onClick={() => go(action.tab)}
            >
              <span className="dashboard-action-icon" style={{ color: action.accent }}>
                <TabIcon tab={action.tab} size={28} />
              </span>
              <span className="dashboard-action-title">{action.title}</span>
              <span className="dashboard-action-desc">{action.description}</span>
              <span className="dashboard-action-link" style={{ color: action.accent }}>
                Open →
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="dashboard-two-col">
        <section className="dashboard-panel">
          <h3 className="dashboard-section-title">Recommended study path</h3>
          <ol className="dashboard-path-list">
            {STUDY_PATH.map((step, i) => (
              <li key={step}>
                <span className="dashboard-path-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="dashboard-panel">
          <h3 className="dashboard-section-title">Official exam at a glance</h3>
          <dl className="dashboard-exam-facts">
            <div className="dashboard-fact">
              <dt>Questions</dt>
              <dd>90</dd>
            </div>
            <div className="dashboard-fact">
              <dt>Time limit</dt>
              <dd>3.5 hours</dd>
            </div>
            <div className="dashboard-fact">
              <dt>To pass</dt>
              <dd>80% correct</dd>
            </div>
            <div className="dashboard-fact">
              <dt>Hardest format</dt>
              <dd>Multi-answer (select all that apply)</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="dashboard-topics">
        <h3 className="dashboard-section-title">Topics covered</h3>
        <div className="dashboard-topic-chips">
          {FLASHCARD_CATEGORIES.map((cat) => (
            <span
              key={cat.c}
              className="dashboard-topic-chip"
              style={{
                borderColor: cat.a + "44",
                background: cat.bg,
                color: cat.a,
              }}
            >
              {cat.c}
              <span className="dashboard-topic-chip-count">{cat.q.length}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="dashboard-stat-card">
      <p className="dashboard-stat-value">{value}</p>
      <p className="dashboard-stat-label">{label}</p>
      <p className="dashboard-stat-hint">{hint}</p>
    </article>
  );
}
