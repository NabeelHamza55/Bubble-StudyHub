import type { TabId } from "../../types";
import { PRACTICE_EXAM_QUESTIONS, FLASHCARD_CATEGORIES } from "../../data";
import { BRAND } from "../../theme/colors";

const TABS: { id: TabId; label: string }[] = [
  { id: "practice", label: `🎯 Practice Exam (${PRACTICE_EXAM_QUESTIONS.length})` },
  {
    id: "quiz",
    label: `⚡ Flashcards (${FLASHCARD_CATEGORIES.reduce((n, c) => n + c.q.length, 0)})`,
  },
  { id: "topics", label: "📚 Study Material" },
  { id: "extra", label: "🔗 Resources" },
];

interface AppHeaderProps {
  tab: TabId;
  onTabChange: (tab: TabId) => void;
  search: string;
  onSearchChange: (value: string) => void;
  totalFlashcards: number;
}

export function AppHeader({
  tab,
  onTabChange,
  search,
  onSearchChange,
  totalFlashcards,
}: AppHeaderProps) {
  const tabs = TABS.map((t) =>
    t.id === "quiz" ? { ...t, label: `⚡ Flashcards (${totalFlashcards})` } : t
  );

  return (
    <header
      style={{
        background: BRAND.white,
        borderBottom: `1px solid ${BRAND.border}`,
        padding: "18px 14px 13px",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: BRAND.text,
            margin: "0 0 2px",
            letterSpacing: "-.02em",
          }}
        >
          Bubble Certification <span style={{ color: BRAND.primary }}>Study Hub</span>
        </h1>
        <p style={{ fontSize: 11, color: BRAND.muted, margin: "0 0 11px" }}>
          {PRACTICE_EXAM_QUESTIONS.length} exam-style questions · {totalFlashcards} flashcards · 7
          study topics
        </p>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 13,
              color: "#9CA3AF",
            }}
          >
            ⌕
          </span>
          <input
            type="text"
            placeholder="Search flashcards and study material..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: "100%",
              padding: "7px 10px 7px 28px",
              background: BRAND.surface,
              border: `1.5px solid ${BRAND.border}`,
              borderRadius: 7,
              color: BRAND.text,
              fontSize: 12,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <nav style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              style={{
                padding: "5px 12px",
                borderRadius: 6,
                border: `1.5px solid ${tab === t.id ? BRAND.primary : BRAND.border}`,
                cursor: "pointer",
                fontSize: 11.5,
                fontWeight: 600,
                background: tab === t.id ? BRAND.primary : BRAND.white,
                color: tab === t.id ? BRAND.white : "#374151",
                transition: "all .2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
