import { useState } from "react";
import { habits as initialHabits } from "../data/mockData";
import type { Habit, TimeOfDay } from "../data/mockData";

const groupOrder: TimeOfDay[] = ["morning", "afternoon", "evening", "anytime"];
const groupLabels: Record<TimeOfDay, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  anytime: "Anytime",
};

function HabitRow({ habit, onToggle }: { habit: Habit; onToggle: (id: string) => void }) {
  const [showUndo, setShowUndo] = useState(false);

  const handleToggle = () => {
    onToggle(habit.id);
    if (!habit.completedToday) {
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 4000);
    }
  };

  return (
    <div
      className="flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-150 group"
      style={{
        background: habit.completedToday ? "#11151E80" : "#11151E",
        border: "1px solid",
        borderColor: habit.completedToday ? "#1A2030" : "#242B38",
        opacity: habit.completedToday ? 0.65 : 1,
      }}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className="flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-150"
        style={{
          width: 22,
          height: 22,
          border: `1.5px solid ${habit.completedToday ? "#10B981" : "#242B38"}`,
          background: habit.completedToday ? "#10B981" : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!habit.completedToday) e.currentTarget.style.borderColor = "#7C6CF2";
        }}
        onMouseLeave={(e) => {
          if (!habit.completedToday) e.currentTarget.style.borderColor = "#242B38";
        }}
      >
        {habit.completedToday && (
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2 5.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Icon */}
      <span className="text-base flex-shrink-0 w-6 text-center">{habit.icon}</span>

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-medium"
            style={{
              color: habit.completedToday ? "#697386" : "#F5F7FA",
              textDecoration: habit.completedToday ? "line-through" : "none",
            }}
          >
            {habit.name}
          </span>
          {habit.currentStreak > 0 && (
            <span
              className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded"
              style={{ background: "#F59E0B1A", color: "#F59E0B" }}
            >
              🔥 {habit.currentStreak}
            </span>
          )}
          {showUndo && (
            <button
              className="text-xs px-2 py-0.5 rounded transition-colors"
              style={{ background: "#7C6CF21A", color: "#7C6CF2" }}
              onClick={handleToggle}
            >
              Undo
            </button>
          )}
        </div>
        <div className="text-xs mt-0.5" style={{ color: "#697386" }}>
          {habit.frequency} · {habit.completionRate30}% last 30d
        </div>
      </div>

      {/* Mini sparkline */}
      <div className="hidden sm:flex items-end gap-px flex-shrink-0" style={{ height: 20, width: 52 }}>
        {habit.last30Days.slice(-14).map((done, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: done ? "100%" : "40%",
              background: done ? "#10B981" : "#1A2030",
            }}
          />
        ))}
      </div>

      {/* Category badge */}
      <span
        className="hidden md:inline text-xs px-2 py-0.5 rounded-md flex-shrink-0 capitalize"
        style={{ background: "#161B26", color: "#697386" }}
      >
        {habit.category}
      </span>
    </div>
  );
}

export default function Today() {
  const [habits, setHabits] = useState(initialHabits);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completedToday: !h.completedToday } : h))
    );
  };

  const completed = habits.filter((h) => h.completedToday).length;
  const total = habits.length;
  const pct = Math.round((completed / total) * 100);

  const grouped = groupOrder.reduce<Record<TimeOfDay, Habit[]>>(
    (acc, g) => {
      acc[g] = habits.filter((h) => h.timeOfDay === g);
      return acc;
    },
    { morning: [], afternoon: [], evening: [], anytime: [] }
  );

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-1" style={{ color: "#F5F7FA" }}>
            Good morning, Alex
          </h2>
          <p className="text-sm" style={{ color: "#697386" }}>
            Sunday, August 31, 2026
          </p>
        </div>

        {/* Daily Summary */}
        <div
          className="rounded-xl p-5 mb-6"
          style={{ background: "#11151E", border: "1px solid #242B38" }}
        >
          <div className="flex items-start gap-6">
            {/* Progress ring */}
            <div className="flex-shrink-0 relative" style={{ width: 80, height: 80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#242B38" strokeWidth="6"/>
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="#7C6CF2"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - pct / 100)}`}
                  transform="rotate(-90 40 40)"
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold" style={{ color: "#F5F7FA" }}>{pct}%</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xl font-semibold" style={{ color: "#F5F7FA" }}>
                  {completed}/{total}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#697386" }}>
                  Habits done
                </div>
              </div>
              <div>
                <div className="text-xl font-semibold" style={{ color: "#10B981" }}>
                  14
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#697386" }}>
                  Best streak
                </div>
              </div>
              <div>
                <div className="text-xl font-semibold" style={{ color: "#F59E0B" }}>
                  {total - completed}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#697386" }}>
                  Remaining
                </div>
              </div>
              <div>
                <div className="text-xl font-semibold" style={{ color: "#F5F7FA" }}>
                  2
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#697386" }}>
                  Goals active
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 4, background: "#242B38" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: pct === 100 ? "#10B981" : "#7C6CF2",
                }}
              />
            </div>
          </div>
        </div>

        {/* Habit groups */}
        <div className="space-y-6">
          {groupOrder.map((group) => {
            const groupHabits = grouped[group];
            if (groupHabits.length === 0) return null;
            const groupDone = groupHabits.filter((h) => h.completedToday).length;
            return (
              <div key={group}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#697386" }}>
                    {groupLabels[group]}
                  </h3>
                  <span className="text-xs" style={{ color: "#697386" }}>
                    {groupDone}/{groupHabits.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {groupHabits.map((h) => (
                    <HabitRow key={h.id} habit={h} onToggle={toggleHabit} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Goals needing attention */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#697386" }}>
            Goals Needing Attention
          </h3>
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #242B38" }}
          >
            {[
              { name: "Build a Side Project", pct: 35, due: "Oct 1", status: "at-risk" as const },
              { name: "Run a Half Marathon", pct: 68, due: "Dec 15", status: "on-track" as const },
            ].map((goal, i) => (
              <div
                key={goal.name}
                className="flex items-center gap-4 px-4 py-3"
                style={{
                  background: "#11151E",
                  borderBottom: i === 0 ? "1px solid #242B38" : "none",
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>
                    {goal.name}
                  </div>
                  <div
                    className="w-full rounded-full overflow-hidden"
                    style={{ height: 3, background: "#242B38" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${goal.pct}%`,
                        background: goal.status === "at-risk" ? "#F59E0B" : "#7C6CF2",
                      }}
                    />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-medium" style={{ color: "#F5F7FA" }}>
                    {goal.pct}%
                  </div>
                  <div className="text-xs" style={{ color: "#697386" }}>
                    Due {goal.due}
                  </div>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: goal.status === "at-risk" ? "#F59E0B1A" : "#7C6CF21A",
                    color: goal.status === "at-risk" ? "#F59E0B" : "#7C6CF2",
                  }}
                >
                  {goal.status === "at-risk" ? "At risk" : "On track"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Insight */}
        <div
          className="mt-6 rounded-xl px-5 py-4"
          style={{ background: "#7C6CF20D", border: "1px solid #7C6CF230" }}
        >
          <div className="flex items-start gap-3">
            <span className="text-base flex-shrink-0">💡</span>
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: "#7C6CF2" }}>
                Daily Insight
              </div>
              <p className="text-sm" style={{ color: "#A5ADBD", lineHeight: 1.6 }}>
                You complete your morning walk{" "}
                <strong style={{ color: "#F5F7FA" }}>24% more often</strong> on days when your
                meditation is completed first. Your best days start with both.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
