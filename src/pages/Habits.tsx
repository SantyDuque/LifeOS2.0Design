import { useState } from "react";
import { habits as allHabits } from "../data/mockData";
import type { Habit } from "../data/mockData";
import HabitDetail from "./HabitDetail";
import CreateHabit from "./CreateHabit";

type FilterStatus = "all" | "active" | "paused" | "archived";

function StatusBadge({ status }: { status: Habit["status"] }) {
  const map = {
    active: { bg: "#10B9811A", color: "#10B981", label: "Active" },
    paused: { bg: "#F59E0B1A", color: "#F59E0B", label: "Paused" },
    archived: { bg: "#1A2030", color: "#697386", label: "Archived" },
  };
  const s = map[status];
  return (
    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

function MiniBar({ last30 }: { last30: boolean[] }) {
  return (
    <div className="flex items-end gap-px" style={{ height: 18, width: 60 }}>
      {last30.slice(-20).map((done, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{ height: done ? "100%" : "35%", background: done ? "#7C6CF2" : "#1A2030" }}
        />
      ))}
    </div>
  );
}

export default function Habits() {
  const [filter, setFilter] = useState<FilterStatus>("active");
  const [search, setSearch] = useState("");
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filtered = allHabits.filter((h) => {
    const matchStatus = filter === "all" || h.status === filter;
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (selectedHabit) return <HabitDetail habit={selectedHabit} onBack={() => setSelectedHabit(null)} />;
  if (showCreate) return <CreateHabit onBack={() => setShowCreate(false)} />;

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-1" style={{ color: "#F5F7FA" }}>Habits</h2>
            <p className="text-sm" style={{ color: "#697386" }}>
              Build consistency through repeatable behaviors
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors"
            style={{ height: 36, background: "#7C6CF2", color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#9183F4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#7C6CF2")}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            New Habit
          </button>
        </div>

        {/* Filter + search bar */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ background: "#11151E", border: "1px solid #242B38" }}
          >
            {(["all", "active", "paused", "archived"] as FilterStatus[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="text-xs font-medium px-3 py-1.5 transition-colors capitalize"
                style={{
                  background: filter === f ? "#7C6CF2" : "transparent",
                  color: filter === f ? "white" : "#697386",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div
            className="flex items-center gap-2 rounded-lg px-3 flex-1 min-w-48"
            style={{ height: 34, background: "#11151E", border: "1px solid #242B38" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ color: "#697386", flexShrink: 0 }}>
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search habits…"
              className="flex-1 bg-transparent outline-none text-xs"
              style={{ color: "#F5F7FA" }}
            />
          </div>

          <span className="text-xs" style={{ color: "#697386" }}>
            {filtered.length} habit{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20" style={{ color: "#697386" }}>
            <div className="text-3xl mb-3">🌱</div>
            <div className="text-sm font-medium mb-1" style={{ color: "#A5ADBD" }}>No habits yet</div>
            <div className="text-xs text-center max-w-xs">
              Start with one behavior you want to make consistent. Small and specific is better than ambitious and vague.
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-4 text-xs px-4 py-2 rounded-lg transition-colors"
              style={{ background: "#7C6CF2", color: "white" }}
            >
              Create your first habit
            </button>
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #242B38" }}
          >
            {/* Header row */}
            <div
              className="grid text-xs font-medium px-4 py-2.5"
              style={{
                background: "#0D1017",
                color: "#697386",
                gridTemplateColumns: "1fr 80px 70px 60px 60px 72px 80px 40px",
                borderBottom: "1px solid #242B38",
              }}
            >
              <span>Habit</span>
              <span>Frequency</span>
              <span>30d rate</span>
              <span>Streak</span>
              <span>Best</span>
              <span>Last 30d</span>
              <span>Status</span>
              <span />
            </div>

            {filtered.map((h, i) => (
              <div
                key={h.id}
                className="grid items-center px-4 py-3 cursor-pointer transition-colors group"
                style={{
                  gridTemplateColumns: "1fr 80px 70px 60px 60px 72px 80px 40px",
                  background: "#11151E",
                  borderBottom: i < filtered.length - 1 ? "1px solid #1A2030" : "none",
                }}
                onClick={() => setSelectedHabit(h)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#161B26")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#11151E")}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-base flex-shrink-0">{h.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: "#F5F7FA" }}>{h.name}</div>
                    <div className="text-xs truncate" style={{ color: "#697386" }}>{h.description}</div>
                  </div>
                </div>
                <span className="text-xs" style={{ color: "#A5ADBD" }}>{h.frequency}</span>
                <span className="text-sm font-medium" style={{ color: h.completionRate30 >= 80 ? "#10B981" : h.completionRate30 >= 60 ? "#F5F7FA" : "#F59E0B" }}>
                  {h.completionRate30}%
                </span>
                <span className="text-sm" style={{ color: "#F5F7FA" }}>
                  {h.currentStreak > 0 ? `🔥 ${h.currentStreak}` : "—"}
                </span>
                <span className="text-xs" style={{ color: "#697386" }}>{h.bestStreak}d</span>
                <MiniBar last30={h.last30Days} />
                <StatusBadge status={h.status} />
                <button
                  className="flex items-center justify-center rounded w-7 h-7 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "#161B26", color: "#697386" }}
                  onClick={(e) => { e.stopPropagation(); setSelectedHabit(h); }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
