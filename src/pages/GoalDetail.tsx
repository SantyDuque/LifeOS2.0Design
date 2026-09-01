import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Goal } from "../data/mockData";

const chartTooltipStyle = {
  contentStyle: { background: "#161B26", border: "1px solid #242B38", borderRadius: 8, fontSize: 12, color: "#F5F7FA" },
  itemStyle: { color: "#A5ADBD" },
  labelStyle: { color: "#F5F7FA", marginBottom: 4, fontWeight: 500 },
};

export default function GoalDetail({ goal, onBack }: { goal: Goal; onBack: () => void }) {
  const progressData = useMemo(() => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"];
    return months.map((m, i) => ({
      month: m,
      progress: Math.min(goal.progress, Math.round((goal.progress / 7) * (i + 1) + (Math.random() - 0.5) * 5)),
    }));
  }, [goal.progress]);

  const statusConfig = {
    "on-track": { bg: "#10B9811A", color: "#10B981", label: "On track" },
    "at-risk": { bg: "#F59E0B1A", color: "#F59E0B", label: "At risk" },
    "completed": { bg: "#7C6CF21A", color: "#7C6CF2", label: "Completed" },
    "paused": { bg: "#1A2030", color: "#697386", label: "Paused" },
  };
  const sc = statusConfig[goal.status];

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          className="flex items-center gap-2 text-sm mb-6 transition-colors"
          style={{ color: "#697386" }}
          onClick={onBack}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#A5ADBD")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#697386")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8 2L3 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Goals
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold" style={{ color: "#F5F7FA" }}>{goal.title}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.color }}>
                {sc.label}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#697386" }}>{goal.description}</p>
          </div>
          <button className="text-xs px-3 py-1.5 rounded-lg flex-shrink-0" style={{ background: "#11151E", border: "1px solid #242B38", color: "#A5ADBD" }}>
            Edit
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
            <div className="text-xs mb-1" style={{ color: "#697386" }}>Progress</div>
            <div className="text-2xl font-semibold" style={{ color: "#7C6CF2" }}>{goal.progress}%</div>
          </div>
          <div className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
            <div className="text-xs mb-1" style={{ color: "#697386" }}>Target</div>
            <div className="text-2xl font-semibold" style={{ color: "#F5F7FA" }}>{goal.target} <span className="text-sm">{goal.unit}</span></div>
          </div>
          <div className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
            <div className="text-xs mb-1" style={{ color: "#697386" }}>Due</div>
            <div className="text-lg font-semibold" style={{ color: "#F5F7FA" }}>
              {new Date(goal.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })}
            </div>
          </div>
        </div>

        {/* Progress chart */}
        <div className="rounded-xl px-5 pt-5 pb-4 mb-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Progress Over Time</div>
          <div className="text-xs mb-4" style={{ color: "#697386" }}>Monthly progression toward target</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={progressData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#242B38" strokeWidth={0.5} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#697386", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#697386", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip {...chartTooltipStyle} formatter={(v) => [`${v}%`, "Progress"]} />
              <Line type="monotone" dataKey="progress" stroke="#7C6CF2" strokeWidth={2} dot={{ r: 3, fill: "#7C6CF2", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#7C6CF2", strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Milestones */}
        <div className="rounded-xl overflow-hidden mb-4" style={{ border: "1px solid #242B38" }}>
          <div className="px-5 py-3" style={{ background: "#0D1017", borderBottom: "1px solid #242B38" }}>
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Milestones</span>
          </div>
          {goal.milestones.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-3"
              style={{
                background: "#11151E",
                borderBottom: i < goal.milestones.length - 1 ? "1px solid #1A2030" : "none",
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: m.completed ? "#7C6CF21A" : "#161B26",
                  border: `1px solid ${m.completed ? "#7C6CF2" : "#242B38"}`,
                }}
              >
                {m.completed && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2 4-4" stroke="#7C6CF2" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm" style={{ color: m.completed ? "#A5ADBD" : "#F5F7FA", textDecoration: m.completed ? "line-through" : "none" }}>
                  {m.label}
                </span>
              </div>
              <span className="text-xs" style={{ color: "#697386" }}>{m.date}</span>
            </div>
          ))}
        </div>

        {/* Linked habits */}
        <div className="rounded-xl px-5 py-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <div className="text-sm font-medium mb-3" style={{ color: "#F5F7FA" }}>Linked Habits</div>
          <div className="flex gap-2 flex-wrap">
            {["Morning Walk", "Exercise"].map((h) => (
              <span
                key={h}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "#161B26", border: "1px solid #242B38", color: "#A5ADBD" }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
