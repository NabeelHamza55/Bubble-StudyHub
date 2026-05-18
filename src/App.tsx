import { useMemo, useState } from "react";
import { AppSidebar } from "./components/layout/AppSidebar";
import { DashboardTab } from "./components/tabs/DashboardTab";
import { PracticeTab } from "./components/tabs/PracticeTab";
import { FlashcardsTab } from "./components/tabs/FlashcardsTab";
import { StudyMaterialTab } from "./components/tabs/StudyMaterialTab";
import { ResourcesTab } from "./components/tabs/ResourcesTab";
import { FLASHCARD_CATEGORIES } from "./data";
import type { TabId } from "./types";
import "./styles/global.css";

const TAB_TITLES: Record<TabId, string> = {
  home: "Dashboard",
  practice: "Practice Exam",
  quiz: "Flashcards",
  topics: "Study Material",
  extra: "Resources",
};

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [search, setSearch] = useState("");

  const totalFlashcards = useMemo(
    () => FLASHCARD_CATEGORIES.reduce((n, c) => n + c.q.length, 0),
    []
  );

  return (
    <div className="app-shell">
      <AppSidebar
        tab={tab}
        onTabChange={setTab}
        search={search}
        onSearchChange={setSearch}
        totalFlashcards={totalFlashcards}
      />

      <div className="app-main">
        <header className="app-main-header">
          <h2 className="app-main-title">{TAB_TITLES[tab]}</h2>
        </header>

        <main className="app-main-content">
          {tab === "home" && (
            <DashboardTab totalFlashcards={totalFlashcards} onNavigate={setTab} />
          )}
          {tab === "practice" && <PracticeTab />}
          {tab === "quiz" && <FlashcardsTab searchQuery={search} />}
          {tab === "topics" && <StudyMaterialTab searchQuery={search} />}
          {tab === "extra" && <ResourcesTab />}
        </main>
      </div>
    </div>
  );
}
