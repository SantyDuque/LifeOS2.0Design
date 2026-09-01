type Page = "today" | "dashboard" | "habits" | "goals" | "finances" | "insights" | "calendar" | "review" | "settings";

const pageMeta: Record<Page, { title: string; subtitle: string }> = {
  today: { title: "Today", subtitle: "Sunday, August 31, 2026" },
  dashboard: { title: "Dashboard", subtitle: "Performance overview" },
  habits: { title: "Habits", subtitle: "Build consistency through repeatable behaviors" },
  goals: { title: "Goals", subtitle: "Medium and long-term outcomes" },
  finances: { title: "Finances", subtitle: "Know where your money is going" },
  insights: { title: "Insights", subtitle: "Patterns and trends in your data" },
  calendar: { title: "Calendar", subtitle: "Behavioral history" },
  review: { title: "Weekly Review", subtitle: "Aug 24–30, 2026" },
  settings: { title: "Settings", subtitle: "Preferences and account" },
};

interface TopBarProps {
  currentPage: Page;
  onOpenCommandPalette: () => void;
  onQuickAdd: () => void;
}

export default function TopBar({ currentPage, onOpenCommandPalette, onQuickAdd }: TopBarProps) {
  const meta = pageMeta[currentPage];

  return (
    <div
      className="flex items-center gap-4 px-6 flex-shrink-0"
      style={{
        height: 56,
        borderBottom: "1px solid #242B38",
        background: "#090B10",
      }}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3">
          <h1 className="text-sm font-semibold truncate" style={{ color: "#F5F7FA" }}>
            {meta.title}
          </h1>
          <span className="text-xs truncate hidden sm:block" style={{ color: "#697386" }}>
            {meta.subtitle}
          </span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Search / Command */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 rounded-md px-3 text-xs transition-colors"
          style={{
            height: 32,
            background: "#11151E",
            border: "1px solid #242B38",
            color: "#697386",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#242B38")}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span className="hidden md:block">Search</span>
          <span
            className="hidden md:flex items-center gap-0.5 rounded px-1 text-xs"
            style={{ background: "#161B26", color: "#697386", fontSize: 10 }}
          >
            <span>⌘</span>
            <span>K</span>
          </span>
        </button>

        {/* Notifications */}
        <button
          className="flex items-center justify-center rounded-md relative transition-colors"
          style={{
            width: 32,
            height: 32,
            background: "#11151E",
            border: "1px solid #242B38",
            color: "#697386",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#A5ADBD";
            e.currentTarget.style.borderColor = "#7C6CF2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#697386";
            e.currentTarget.style.borderColor = "#242B38";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5A4 4 0 003 5.5V9L2 10v.5h10V10l-1-1V5.5A4 4 0 007 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M5.5 11a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          <span
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              background: "#7C6CF2",
              top: 6,
              right: 6,
            }}
          />
        </button>

        {/* Quick Add */}
        <button
          onClick={onQuickAdd}
          className="flex items-center gap-2 rounded-md px-3 text-xs font-medium transition-all"
          style={{
            height: 32,
            background: "#7C6CF2",
            color: "white",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#9183F4")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#7C6CF2")}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="hidden sm:block">Quick Add</span>
        </button>
      </div>
    </div>
  );
}
