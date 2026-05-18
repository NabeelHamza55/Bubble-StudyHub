import { useMemo, useState } from "react";
import { AppHeader } from "./components/layout/AppHeader";
import { PracticeTab } from "./components/tabs/PracticeTab";
import { FlashcardsTab } from "./components/tabs/FlashcardsTab";
import { StudyMaterialTab } from "./components/tabs/StudyMaterialTab";
import { ResourcesTab } from "./components/tabs/ResourcesTab";
import { FLASHCARD_CATEGORIES } from "./data";
import type { TabId } from "./types";
import { BRAND } from "./theme/colors";

const GLOBAL_STYLES = `
  * { box-sizing: border-box; }
  input:focus {
    border-color: #7C3AED !important;
    box-shadow: 0 0 0 2px #7C3AED22 !important;
  }
`;

export default function App() {
  const [tab, setTab] = useState<TabId>("practice");
  const [search, setSearch] = useState("");

  const totalFlashcards = useMemo(
    () => FLASHCARD_CATEGORIES.reduce((n, c) => n + c.q.length, 0),
    []
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.surface,
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      <AppHeader
        tab={tab}
        onTabChange={setTab}
        search={search}
        onSearchChange={setSearch}
        totalFlashcards={totalFlashcards}
      />

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "12px 12px 60px" }}>
        {tab === "practice" && <PracticeTab />}
        {tab === "quiz" && <FlashcardsTab searchQuery={search} />}
        {tab === "topics" && <StudyMaterialTab searchQuery={search} />}
        {tab === "extra" && <ResourcesTab />}
      </main>

      <style>{GLOBAL_STYLES}</style>
    </div>
  );
}
