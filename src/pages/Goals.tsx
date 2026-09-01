import { useState } from "react";
import { goals } from "../data/mockData";
import type { Goal } from "../data/mockData";
import GoalDetail from "./GoalDetail";

const statusConfig = {
  "on-track": { bg: "#10B9811A", color: "#10B981", label: "On track" },
  "at-risk": { bg: "#F59E0B1A", color: "#F59E0B", label: "At risk" },
  "completed": { bg: "#7C6CF21A", color: "#7C6CF2", label: "Completed" },
  "paused": { bg: "#1A2030", color: "#697386", label: "Paused" },
};

export default function Goals() {
  const [selected, setSelected] = useState<Goal | null>(null);

  if (selected) return <GoalDetail goal={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-1" style={{ color: "#F5F7FA" }}>Goals</h2>
            <p className="text-sm" style={{ color: "#697386" }}>Medium and long-term outcomes</p>
          </div>
          <button
            className="flex items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors"
            style={{ height: 36, background: "#7C6CF2", color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#9183F4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#7C6CF2")}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            New Goal
          </button>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Active Goals", value: "4", color: "#F5F7FA" },
            { label: "On Track", value: "3", color: "#10B981" },
            { label: "At Risk", value: "1", color: "#F59E0B" },
            { label: "Completed", value: "2", color: "#7C6CF2" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
              <div className="text-xs mb-1" style={{ color: "#697386" }}>{s.label}</div>
              <div className="text-xl font-semibold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Goal cards */}
        <div className="space-y-3">
          {goals.map((goal) => {
            const sc = statusConfig[goal.status];
            const completed = goal.milestones.filter((m) => m.completed).length;
            return (
              <div
                key={goal.id}
                className="rounded-xl px-5 py-5 cursor-pointer transition-all duration-150"
                style={{ background: "#11151E", border: "1px solid #242B38" }}
                onClick={() => setSelected(goal)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7C6CF240")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#242B38")}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>{goal.title}</h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        {sc.label}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded flex-shrink-0"
                        style={{ background: "#161B26", color: "#697386" }}
                      >
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-xs mb-4 leading-relaxed" style={{ color: "#697386" }}>
                      {goal.description}
                    </p>

                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: "#242B38" }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${goal.progress}%`,
                            background: goal.status === "at-risk" ? "#F59E0B" : goal.status === "completed" ? "#10B981" : "#7C6CF2",
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium flex-shrink-0" style={{ color: "#A5ADBD" }}>
                        {goal.status === "completed" ? `${goal.target} ${goal.unit}` : `${goal.progress}%`}
                      </span>
                    </div>
                  </div>

                  {/* Right col */}
                  <div className="flex-shrink-0 text-right min-w-24">
                    <div className="text-xs mb-1" style={{ color: "#697386" }}>Due</div>
                    <div className="text-sm font-medium mb-3" style={{ color: "#A5ADBD" }}>
                      {new Date(goal.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                    <div className="text-xs" style={{ color: "#697386" }}>Milestones</div>
                    <div className="text-sm font-medium" style={{ color: "#A5ADBD" }}>
                      {completed}/{goal.milestones.length}
                    </div>
                  </div>
                </div>

                {/* Milestones mini */}
                <div className="flex gap-1.5 mt-4">
                  {goal.milestones.map((m, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full"
                      style={{
                        height: 3,
                        background: m.completed ? (goal.status === "at-risk" ? "#F59E0B" : "#7C6CF2") : "#242B38",
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
