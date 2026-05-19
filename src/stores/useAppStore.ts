import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const STORAGE_KEY = "bubble-study-hub-ui";

function readPersistedSearch(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "";
    const parsed = JSON.parse(raw) as { state?: { globalSearch?: unknown } };
    const globalSearch = parsed.state?.globalSearch;
    return typeof globalSearch === "string" ? globalSearch : "";
  } catch {
    return "";
  }
}

interface AppState {
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      globalSearch: readPersistedSearch(),
      setGlobalSearch: (globalSearch) => set({ globalSearch }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ globalSearch: state.globalSearch }),
    }
  )
);
