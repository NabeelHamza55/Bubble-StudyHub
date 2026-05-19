import { useState } from "react";
import { NavLink } from "react-router-dom";
import type { TabId } from "../../types";
import { HARD_MA_QUESTIONS, PRACTICE_EXAM_QUESTIONS, STUDY_QUIZ_QUESTIONS } from "../../data";
import { tabToPath } from "../../routes/tabRoutes";
import { IconMenu, IconSearch, TabIcon } from "../icons/TabIcons";
import { ThemeToggle } from "../ui/ThemeToggle";

const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Dashboard" },
  { id: "practice", label: "Practice Exam" },
  { id: "studyquiz", label: "Doc & Scenario Quiz" },
  { id: "hardquiz", label: "Hard Mode (MA)" },
  { id: "quiz", label: "Flashcards" },
  { id: "topics", label: "Study Material" },
  { id: "extra", label: "Resources" },
];

interface AppSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalFlashcards: number;
}

export function AppSidebar({
  search,
  onSearchChange,
  totalFlashcards,
}: AppSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const counts: Record<TabId, number | null> = {
    home: null,
    practice: PRACTICE_EXAM_QUESTIONS.length,
    studyquiz: STUDY_QUIZ_QUESTIONS.length,
    hardquiz: HARD_MA_QUESTIONS.length,
    quiz: totalFlashcards,
    topics: 7,
    extra: null,
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="mobile-topbar">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <IconMenu size={22} />
        </button>
        <span className="mobile-topbar-title">Bubble Study Hub</span>
        <ThemeToggle compact />
      </header>

      {mobileOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      )}

      <aside className={`app-sidebar${mobileOpen ? " is-open" : ""}`}>
        <div className="sidebar-inner">
          <div className="sidebar-brand">
            <h1 className="sidebar-title">
              Bubble <span className="sidebar-title-accent">Study Hub</span>
            </h1>
            <p className="sidebar-subtitle">Certification prep</p>
          </div>

          <nav className="sidebar-nav" aria-label="Main navigation">
            {TABS.map((t) => {
              const count = counts[t.id];
              return (
                <NavLink
                  key={t.id}
                  to={tabToPath(t.id)}
                  end={t.id === "home"}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `sidebar-nav-item${isActive ? " is-active" : ""}`
                  }
                >
                  <span className="sidebar-nav-icon">
                    <TabIcon tab={t.id} size={20} />
                  </span>
                  <span className="sidebar-nav-label">{t.label}</span>
                  {count !== null && <span className="sidebar-nav-count">{count}</span>}
                </NavLink>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <ThemeToggle />
            <label htmlFor="global-search" className="sidebar-search-label">
              Search
            </label>
            <div className="sidebar-search-wrap">
              <span className="sidebar-search-icon">
                <IconSearch size={18} />
              </span>
              <input
                id="global-search"
                type="search"
                placeholder="Flashcards & topics…"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="sidebar-search-input"
              />
            </div>
          </div>

          <button
            type="button"
            className="sidebar-close-mobile"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            Close menu
          </button>
        </div>
      </aside>
    </>
  );
}
