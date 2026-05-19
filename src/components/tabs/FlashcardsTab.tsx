import type { CSSProperties } from "react";
import { Accordion } from "../ui/Accordion";
import { Badge } from "../ui/Badge";
import { FLASHCARD_CATEGORIES } from "../../data";
import { BRAND } from "../../theme/colors";
import { alertBox, btnSecondary, layout, text } from "../../theme/styles";
import { RADIUS, SPACE, TYPE } from "../../theme/tokens";
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
  const progress = totalQuestions ? (revealed.size / totalQuestions) * 100 : 0;

  return (
    <div style={layout.stack(SPACE.lg)}>
      <div style={{ ...layout.row(SPACE.md), justifyContent: "space-between" }}>
        <p style={text.muted}>Think through each question before revealing the answer.</p>
        <div style={layout.row(SPACE.sm)}>
          <span style={{ fontSize: TYPE.base, color: BRAND.pass, fontWeight: 700 }}>
            {revealed.size}/{totalQuestions}
          </span>
          {revealed.size > 0 && (
            <button type="button" onClick={resetRevealed} style={btnSecondary()}>
              Reset
            </button>
          )}
        </div>
      </div>

      <div style={{ height: 10, borderRadius: 99, background: BRAND.border, overflow: "hidden" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${BRAND.primary}, #38bdf8)`,
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
                  <Badge
                    color="var(--badge-fail-text)"
                    background="var(--badge-fail-bg)"
                    border="1px solid var(--exam-wrong-border)"
                  >
                    HARDEST
                  </Badge>
                )}
                <Badge
                  color={done === cat.q.length ? "var(--badge-pass-text)" : "var(--badge-neutral-text)"}
                  background={done === cat.q.length ? "var(--badge-pass-bg)" : "var(--badge-neutral-bg)"}
                >
                  {done}/{cat.q.length}
                </Badge>
              </>
            }
          >
            {isHardest && (
              <div style={{ ...alertBox("warn"), marginBottom: SPACE.md }}>
                ⚠ THE HARDEST TOPIC. Most who fail underestimate this.
              </div>
            )}
            <div style={layout.stack(SPACE.sm)}>
              {cat.q.map(([question, answer], qi) => (
                <FlashcardItem
                  key={`${ci}-${qi}`}
                  index={qi}
                  question={question}
                  answer={answer}
                  accent={cat.a}
                  revealed={revealed.has(`${ci}-${qi}`)}
                  onReveal={() => reveal(`${ci}-${qi}`)}
                />
              ))}
            </div>
          </Accordion>
        );
      })}
    </div>
  );
}

function FlashcardItem({
  index,
  question,
  answer,
  accent,
  revealed,
  onReveal,
}: {
  index: number;
  question: string;
  answer: string;
  accent: string;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <article
      className={`flashcard-row${revealed ? " is-revealed" : ""}`}
      style={
        {
          borderRadius: RADIUS.sm,
          overflow: "hidden",
          "--flashcard-accent": accent,
        } as CSSProperties & { "--flashcard-accent": string }
      }
    >
      <div style={{ padding: `${SPACE.md}px ${SPACE.lg}px`, display: "flex", gap: SPACE.md }}>
        <span
          style={{
            fontSize: TYPE.sm,
            fontWeight: 700,
            color: accent,
            minWidth: 28,
            flexShrink: 0,
          }}
        >
          Q{index + 1}
        </span>
        <p style={{ ...text.body, fontWeight: 500, flex: 1 }}>{question}</p>
      </div>
      {!revealed ? (
        <button type="button" onClick={onReveal} className="flashcard-reveal-btn" style={{ width: "100%", padding: `${SPACE.md}px`, cursor: "pointer", fontSize: TYPE.base, fontWeight: 600 }}>
          Reveal answer
        </button>
      ) : (
        <div style={{ padding: `${SPACE.md}px ${SPACE.lg}px ${SPACE.lg}px 52px`, borderTop: `1px solid color-mix(in srgb, ${accent} 25%, var(--app-border))` }}>
          <p className="flashcard-answer" style={{ ...text.body }}>{answer}</p>
        </div>
      )}
    </article>
  );
}
