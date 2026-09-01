import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import CommandPalette from "./components/CommandPalette";
import Today from "./pages/Today";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Goals from "./pages/Goals";
import Insights from "./pages/Insights";
import CalendarPage from "./pages/CalendarPage";
import Review from "./pages/Review";
import Finances from "./pages/Finances";
import Settings from "./pages/Settings";

type Page = "today" | "dashboard" | "habits" | "goals" | "finances" | "insights" | "calendar" | "review" | "settings";

function QuickAddModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(9,11,16,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl overflow-hidden w-80"
        style={{ background: "#161B26", border: "1px solid #242B38", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #242B38" }}>
          <div className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>Quick Add</div>
        </div>
        <div className="py-2">
          {[
            { icon: "✅", label: "New Habit", sub: "Track a repeatable behavior" },
            { icon: "🎯", label: "New Goal", sub: "Set a medium or long-term outcome" },
            { icon: "📝", label: "Reflection note", sub: "Write a quick note" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 w-full px-5 py-3 text-left transition-colors"
              style={{ color: "#A5ADBD" }}
              onClick={onClose}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1A2030")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span className="text-lg">{item.icon}</span>
              <div>
                <div className="text-sm font-medium" style={{ color: "#F5F7FA" }}>{item.label}</div>
                <div className="text-xs" style={{ color: "#697386" }}>{item.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("today");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "today": return <Today />;
      case "dashboard": return <Dashboard />;
      case "habits": return <Habits />;
      case "goals": return <Goals />;
      case "finances": return <Finances />;
      case "insights": return <Insights />;
      case "calendar": return <CalendarPage />;
      case "review": return <Review />;
      case "settings": return <Settings />;
    }
  };

  return (
    <div className="flex h-full overflow-hidden" style={{ background: "#090B10" }}>
      {/* Sidebar */}
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          currentPage={page}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onQuickAdd={() => setQuickAddOpen(true)}
        />
        {renderPage()}
      </div>

      {/* Overlays */}
      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={setPage}
      />
      {quickAddOpen && <QuickAddModal onClose={() => setQuickAddOpen(false)} />}
    </div>
  );
}
