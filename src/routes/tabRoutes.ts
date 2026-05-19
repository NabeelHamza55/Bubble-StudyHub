import type { TabId } from "../types";

export const TAB_TITLES: Record<TabId, string> = {
  home: "Dashboard",
  practice: "Practice Exam",
  studyquiz: "Doc & Scenario Quiz",
  hardquiz: "Hard Mode Challenge",
  quiz: "Flashcards",
  topics: "Study Material",
  extra: "Resources",
};

/** Browser history paths (e.g. `/practice`). */
export const TAB_PATHS: Record<TabId, string> = {
  home: "/",
  practice: "/practice",
  studyquiz: "/studyquiz",
  hardquiz: "/hardquiz",
  quiz: "/quiz",
  topics: "/topics",
  extra: "/extra",
};

const TAB_IDS = Object.keys(TAB_PATHS) as TabId[];

export function isTabId(value: unknown): value is TabId {
  return typeof value === "string" && (TAB_IDS as string[]).includes(value);
}

export function tabToPath(tab: TabId): string {
  return TAB_PATHS[tab];
}

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function pathToTab(pathname: string): TabId {
  const normalized = normalizePath(pathname);
  for (const id of TAB_IDS) {
    if (normalizePath(TAB_PATHS[id]) === normalized) return id;
  }
  return "home";
}

const UI_STORAGE_KEY = "bubble-study-hub-ui";

/** One-time: restore tab from pre-router localStorage when hash is still default. */
export function readLegacyTabFromStorage(): TabId | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(UI_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: { activeTab?: unknown } };
    const activeTab = parsed.state?.activeTab;
    return isTabId(activeTab) && activeTab !== "home" ? activeTab : null;
  } catch {
    return null;
  }
}

export function clearLegacyTabInStorage(): void {
  try {
    const raw = localStorage.getItem(UI_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { state?: Record<string, unknown> };
    if (!parsed.state || !("activeTab" in parsed.state)) return;
    const { activeTab: _removed, ...rest } = parsed.state;
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify({ ...parsed, state: rest }));
  } catch {
    /* ignore */
  }
}
