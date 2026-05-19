/** JSON-safe answer: single index or multiple for MA */
export type StoredAnswer = number | number[];

export function serializeAnswer(answer: number | Set<number>): StoredAnswer {
  if (answer instanceof Set) return [...answer].sort((a, b) => a - b);
  return answer;
}

export function deserializeAnswers(
  raw: Record<string, StoredAnswer>
): Record<number, number | Set<number>> {
  const out: Record<number, number | Set<number>> = {};
  for (const [key, value] of Object.entries(raw)) {
    const id = Number(key);
    if (Number.isNaN(id)) continue;
    out[id] = Array.isArray(value) ? new Set(value) : value;
  }
  return out;
}

export function deserializeSubmitted(raw: Record<string, boolean>): Record<number, boolean> {
  const out: Record<number, boolean> = {};
  for (const [key, value] of Object.entries(raw)) {
    const id = Number(key);
    if (!Number.isNaN(id)) out[id] = value;
  }
  return out;
}
