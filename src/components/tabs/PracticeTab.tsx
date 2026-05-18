import { BRAND } from "../../theme/colors";
import { card, layout, text } from "../../theme/styles";
import { SPACE, TYPE } from "../../theme/tokens";
import { PracticeExam } from "../exam/PracticeExam";

const EXAM_INFO = [
  ["Format", "Mirrors the official Bubble Developer Certification (90 Qs, 80% to pass, 3.5 hrs)"],
  ["Question types", "Single-answer MC · Multi-answer (select ALL that apply) · True/False · Scenario-based"],
  ["Hardest", "Multi-answer questions — you must select every correct option to get credit"],
  [
    "Topics",
    "All 7 official categories: Interface · Layout · Frontend · Backend · DB & Security · WU · APIs",
  ],
] as const;

export function PracticeTab() {
  return (
    <div style={layout.stack(SPACE.lg)}>
      <section style={card}>
        <h2 style={{ ...text.h2, marginBottom: SPACE.md }}>About this practice exam</h2>
        <dl style={{ display: "grid", gap: SPACE.md, margin: 0 }}>
          {EXAM_INFO.map(([key, value]) => (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "minmax(100px, 28%) 1fr", gap: SPACE.sm }}>
              <dt style={{ fontWeight: 600, fontSize: TYPE.base, color: BRAND.text }}>{key}</dt>
              <dd style={{ ...text.muted, fontSize: TYPE.base, margin: 0 }}>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <PracticeExam />
    </div>
  );
}
