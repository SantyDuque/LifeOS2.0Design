import { useState, useEffect, useRef } from "react";

type Page = "today" | "dashboard" | "habits" | "goals" | "finances" | "insights" | "calendar" | "review" | "settings";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: string;
  action: () => void;
  group: string;
}

export default function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { id: "goto-today", label: "Go to Today", icon: "📅", group: "Navigate", action: () => { onNavigate("today"); onClose(); } },
    { id: "goto-dashboard", label: "Go to Dashboard", icon: "📊", group: "Navigate", action: () => { onNavigate("dashboard"); onClose(); } },
    { id: "goto-habits", label: "Go to Habits", icon: "✅", group: "Navigate", action: () => { onNavigate("habits"); onClose(); } },
    { id: "goto-goals", label: "Go to Goals", icon: "🎯", group: "Navigate", action: () => { onNavigate("goals"); onClose(); } },
    { id: "goto-finances", label: "Go to Finances", icon: "💰", group: "Navigate", action: () => { onNavigate("finances"); onClose(); } },
    { id: "goto-insights", label: "Go to Insights", icon: "📈", group: "Navigate", action: () => { onNavigate("insights"); onClose(); } },
    { id: "goto-calendar", label: "Go to Calendar", icon: "🗓", group: "Navigate", action: () => { onNavigate("calendar"); onClose(); } },
    { id: "goto-review", label: "Go to Weekly Review", icon: "📝", group: "Navigate", action: () => { onNavigate("review"); onClose(); } },
    { id: "goto-settings", label: "Go to Settings", icon: "⚙️", group: "Navigate", action: () => { onNavigate("settings"); onClose(); } },
    { id: "create-habit", label: "Create New Habit", description: "Add a new habit to track", icon: "➕", group: "Create", action: () => { onNavigate("habits"); onClose(); } },
    { id: "create-goal", label: "Create New Goal", description: "Set a medium or long-term goal", icon: "🏁", group: "Create", action: () => { onNavigate("goals"); onClose(); } },
    { id: "habit-morning-walk", label: "Morning Walk", description: "14-day streak · 92%", icon: "🚶", group: "Habits", action: () => { onNavigate("habits"); onClose(); } },
    { id: "habit-meditation", label: "Meditation", description: "5-day streak · 81%", icon: "🧘", group: "Habits", action: () => { onNavigate("habits"); onClose(); } },
    { id: "habit-reading", label: "Read 30 Minutes", description: "7-day streak · 87%", icon: "📖", group: "Habits", action: () => { onNavigate("habits"); onClose(); } },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()) ||
          c.group.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[selected]?.action();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, onClose]);

  if (!open) return null;

  let flatIdx = 0;

  return (
    <div
      className="fixed inset-0 flex items-start justify-center pt-24 z-50"
      style={{ background: "rgba(9,11,16,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl overflow-hidden"
        style={{
          background: "#161B26",
          border: "1px solid #242B38",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-4"
          style={{ height: 52, borderBottom: "1px solid #242B38" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "#697386", flexShrink: 0 }}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or jump to…"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#F5F7FA" }}
          />
          <kbd
            className="text-xs rounded px-1.5 py-0.5"
            style={{ background: "#11151E", color: "#697386", border: "1px solid #242B38" }}
          >
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="py-2 max-h-80 overflow-y-auto">
          {Object.entries(grouped).length === 0 && (
            <div className="px-4 py-8 text-center text-sm" style={{ color: "#697386" }}>
              No results for "{query}"
            </div>
          )}
          {Object.entries(grouped).map(([group, cmds]) => (
            <div key={group}>
              <div
                className="px-4 py-1.5 text-xs font-medium"
                style={{ color: "#697386" }}
              >
                {group}
              </div>
              {cmds.map((cmd) => {
                const idx = flatIdx++;
                const isSelected = selected === idx;
                return (
                  <button
                    key={cmd.id}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors"
                    style={{
                      background: isSelected ? "#7C6CF21A" : "transparent",
                      color: isSelected ? "#F5F7FA" : "#A5ADBD",
                    }}
                    onMouseEnter={() => setSelected(idx)}
                    onClick={cmd.action}
                  >
                    <span className="text-base w-5 text-center flex-shrink-0">{cmd.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">{cmd.label}</div>
                      {cmd.description && (
                        <div className="text-xs mt-0.5" style={{ color: "#697386" }}>
                          {cmd.description}
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "#7C6CF2", flexShrink: 0 }}>
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-4 px-4 text-xs"
          style={{ height: 36, borderTop: "1px solid #242B38", color: "#697386" }}
        >
          <span className="flex items-center gap-1.5">
            <kbd className="rounded px-1 py-0.5" style={{ background: "#11151E", border: "1px solid #242B38" }}>↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded px-1 py-0.5" style={{ background: "#11151E", border: "1px solid #242B38" }}>↵</kbd>
            select
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded px-1 py-0.5" style={{ background: "#11151E", border: "1px solid #242B38" }}>esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
