import { STUDY_QUIZ_QUESTIONS } from "../../data";
import { BRAND } from "../../theme/colors";
import { card, layout, text } from "../../theme/styles";
import { SPACE } from "../../theme/tokens";
import { ExamRunner } from "../exam/ExamRunner";

export function StudyQuizTab() {
  const scenarioCount = STUDY_QUIZ_QUESTIONS.filter((q) => q.scenario).length;

  return (
    <div style={layout.stack(SPACE.lg)}>
      <section style={card}>
        <h2 style={{ ...text.h2, marginBottom: SPACE.sm }}>Documentation &amp; scenario quiz</h2>
        <p style={{ ...text.body, color: BRAND.muted, marginBottom: SPACE.md }}>
          {STUDY_QUIZ_QUESTIONS.length} questions drawn from official Bubble Manual concepts, study
          material links, and real-world certification scenarios. {scenarioCount} are scenario-based.
          Use this after reading the docs in Study Material — explanations cite the underlying rule.
        </p>
        <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: SPACE.md, margin: 0 }}>
          <div>
            <dt style={{ ...text.label, fontSize: 12 }}>Source</dt>
            <dd style={{ ...text.muted, margin: "4px 0 0" }}>manual.bubble.io + study hub links</dd>
          </div>
          <div>
            <dt style={{ ...text.label, fontSize: 12 }}>Goal</dt>
            <dd style={{ ...text.muted, margin: "4px 0 0" }}>Validate doc comprehension before mock exam</dd>
          </div>
          <div>
            <dt style={{ ...text.label, fontSize: 12 }}>Tip</dt>
            <dd style={{ ...text.muted, margin: "4px 0 0" }}>Multi-answer requires every correct option</dd>
          </div>
        </dl>
      </section>
      <ExamRunner questions={STUDY_QUIZ_QUESTIONS} passThreshold={75} />
    </div>
  );
}
