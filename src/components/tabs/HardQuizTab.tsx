import { HARD_MA_QUESTIONS } from "../../data";
import { BRAND } from "../../theme/colors";
import { alertBox, card, layout, text } from "../../theme/styles";
import { SPACE } from "../../theme/tokens";
import { ExamRunner } from "../exam/ExamRunner";

export function HardQuizTab() {
  const scenarioCount = HARD_MA_QUESTIONS.filter((q) => q.scenario).length;

  return (
    <div className="hard-quiz-tab" style={layout.stack(SPACE.lg)}>
      <section style={{ ...card, borderColor: "#C4B5FD", background: "linear-gradient(135deg, #FAF5FF 0%, #fff 60%)" }}>
        <p style={{ ...text.label, fontSize: 12, color: "#6D28D9", marginBottom: SPACE.sm }}>
          EXPERT · MULTI-ANSWER ONLY
        </p>
        <h2 style={{ ...text.h2, marginBottom: SPACE.sm }}>Hard mode challenge</h2>
        <p style={{ ...text.body, color: BRAND.muted, marginBottom: SPACE.md }}>
          {HARD_MA_QUESTIONS.length} certification-style questions where every item requires selecting{" "}
          <strong>all</strong> correct options—no partial credit. {scenarioCount} are scenario-based traps
          mixing deploy, privacy, WU, and API boundaries. Aim for 85%+ before the real exam.
        </p>
        <div style={{ ...alertBox("warn"), marginBottom: 0 }}>
          Miss one correct checkbox or select one wrong option → marked incorrect. Read every option carefully.
        </div>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: SPACE.md,
            margin: `${SPACE.lg}px 0 0`,
          }}
        >
          <div>
            <dt style={{ ...text.label, fontSize: 12 }}>Format</dt>
            <dd style={{ ...text.muted, margin: "4px 0 0" }}>Multi-answer only</dd>
          </div>
          <div>
            <dt style={{ ...text.label, fontSize: 12 }}>Pass target</dt>
            <dd style={{ ...text.muted, margin: "4px 0 0" }}>85% recommended</dd>
          </div>
          <div>
            <dt style={{ ...text.label, fontSize: 12 }}>Topics</dt>
            <dd style={{ ...text.muted, margin: "4px 0 0" }}>All 7 syllabus areas</dd>
          </div>
        </dl>
      </section>
      <ExamRunner
        questions={HARD_MA_QUESTIONS}
        passThreshold={85}
        showPassHint
        defaultTypeFilter="ma"
      />
    </div>
  );
}
