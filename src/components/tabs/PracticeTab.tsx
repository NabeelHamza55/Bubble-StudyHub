import { BRAND } from "../../theme/colors";
import { PracticeExam } from "../exam/PracticeExam";

const EXAM_INFO = [
  ["Format", "Mirrors the official Bubble Developer Certification (90 Qs, 80% to pass, 3.5 hrs)"],
  ["Question types", "Single-answer MC · Multi-answer (select ALL that apply) · True/False · Scenario-based"],
  ["Hardest", "Multi-answer questions — you must select every correct option to get credit"],
  [
    "Topics",
    "All 7 official categories covered: Interface · Layout · Frontend · Backend · DB & Security · WU · APIs",
  ],
] as const;

export function PracticeTab() {
  return (
    <>
      <section
        style={{
          background: BRAND.white,
          border: `1.5px solid ${BRAND.border}`,
          borderRadius: 8,
          padding: "10px 13px",
          marginBottom: 10,
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 12, color: BRAND.text, marginBottom: 6 }}>
          About this Practice Exam
        </h2>
        <dl style={{ display: "grid", gap: 4, margin: 0 }}>
          {EXAM_INFO.map(([key, value]) => (
            <div key={key} style={{ display: "flex", gap: 8, fontSize: 11.5 }}>
              <dt style={{ fontWeight: 600, color: "#374151", minWidth: 90, flexShrink: 0 }}>{key}:</dt>
              <dd style={{ color: BRAND.muted, lineHeight: 1.45, margin: 0 }}>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <PracticeExam />
    </>
  );
}
