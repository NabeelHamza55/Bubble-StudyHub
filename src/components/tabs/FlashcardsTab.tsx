import { Accordion } from "../ui/Accordion";
import { FLASHCARD_CATEGORIES } from "../../data";
import { useToggleSet } from "../../hooks/useToggleSet";

interface FlashcardsTabProps {
  searchQuery: string;
}

export function FlashcardsTab({ searchQuery }: FlashcardsTabProps) {
  const { set: openCategories, toggle: toggleCategory } = useToggleSet<number>();
  const { set: revealed, add: reveal, clear: resetRevealed } = useToggleSet<string>();

  const sq = searchQuery.toLowerCase();
  const categories = FLASHCARD_CATEGORIES.filter(
    (cat) => !sq || JSON.stringify(cat).toLowerCase().includes(sq)
  );
  const totalQuestions = FLASHCARD_CATEGORIES.reduce((n, c) => n + c.q.length, 0);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
        <p style={{ fontSize: 11.5, color: "#6B7280", margin: 0 }}>Think through each before revealing.</p>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#047857", fontWeight: 600 }}>
            {revealed.size}/{totalQuestions}
          </span>
          {revealed.size > 0 && (
            <button
              type="button"
              onClick={resetRevealed}
              style={{
                fontSize: 10.5,
                color: "#6B7280",
                background: "#F3F4F6",
                border: "1px solid #E5E7EB",
                borderRadius: 4,
                padding: "2px 7px",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          height: 5,
          borderRadius: 99,
          background: "#E5E7EB",
          marginBottom: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(revealed.size / totalQuestions) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg,#7C3AED,#0369A1)",
            borderRadius: 99,
            transition: "width .4s",
          }}
        />
      </div>

      {categories.map((cat, ci) => {
        const isHardest = cat.c === "Performance & Workload";
        const done = cat.q.filter((_, qi) => revealed.has(`${ci}-${qi}`)).length;

        return (
          <Accordion
            key={cat.c}
            title={cat.c}
            accent={cat.a}
            open={openCategories.has(ci)}
            toggle={() => toggleCategory(ci)}
            badge={
              <>
                {isHardest && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#B91C1C",
                      background: "#FFF1F2",
                      border: "1px solid #FECACA",
                      padding: "1px 6px",
                      borderRadius: 99,
                      marginRight: 3,
                    }}
                  >
                    HARDEST
                  </span>
                )}
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: done === cat.q.length ? "#047857" : "#9CA3AF",
                    background: done === cat.q.length ? "#ECFDF5" : "#F3F4F6",
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  {done}/{cat.q.length}
                </span>
              </>
            }
          >
            {isHardest && (
              <div
                style={{
                  margin: "0 0 8px",
                  padding: "7px 10px",
                  background: "#FFF7ED",
                  border: "1px solid #FED7AA",
                  borderRadius: 6,
                  fontSize: 11,
                  color: "#92400E",
                }}
              >
                ⚠ THE HARDEST TOPIC. Most who fail underestimate this.
              </div>
            )}
            <div style={{ display: "grid", gap: 3 }}>
              {cat.q.map(([question, answer], qi) => {
                const key = `${ci}-${qi}`;
                const isRevealed = revealed.has(key);
                return (
                  <FlashcardItem
                    key={key}
                    index={qi}
                    question={question}
                    answer={answer}
                    accent={cat.a}
                    bg={cat.bg}
                    rowBg={cat.rb}
                    revealed={isRevealed}
                    onReveal={() => reveal(key)}
                  />
                );
              })}
            </div>
          </Accordion>
        );
      })}
    </>
  );
}

function FlashcardItem({
  index,
  question,
  answer,
  accent,
  bg,
  rowBg,
  revealed,
  onReveal,
}: {
  index: number;
  question: string;
  answer: string;
  accent: string;
  bg: string;
  rowBg: string;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <article
      style={{
        background: revealed ? rowBg : "#F9FAFB",
        borderRadius: 7,
        border: `1px solid ${revealed ? accent + "33" : "#E5E7EB"}`,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "8px 11px", display: "flex", gap: 7 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: accent, minWidth: 22, marginTop: 1, flexShrink: 0 }}>
          Q{index + 1}
        </span>
        <p style={{ fontSize: 12, color: "#1F2937", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{question}</p>
      </div>
      {!revealed ? (
        <button
          type="button"
          onClick={onReveal}
          style={{
            width: "100%",
            padding: 7,
            background: "#fff",
            border: "none",
            borderTop: "1px solid #E5E7EB",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 600,
            color: accent,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = bg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
          }}
        >
          Reveal Answer
        </button>
      ) : (
        <div style={{ padding: "8px 11px 9px 40px", borderTop: `1px solid ${accent}22` }}>
          <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.6 }}>{answer}</p>
        </div>
      )}
    </article>
  );
}
