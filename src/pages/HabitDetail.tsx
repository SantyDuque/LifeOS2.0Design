import { useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import type { Habit } from "../data/mockData";
import { generateDailyData, weekdayData } from "../data/mockData";

const chartTooltipStyle = {
  contentStyle: { background: "#161B26", border: "1px solid #242B38", borderRadius: 8, fontSize: 12, color: "#F5F7FA" },
  itemStyle: { color: "#A5ADBD" },
  labelStyle: { color: "#F5F7FA", marginBottom: 4, fontWeight: 500 },
};

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
      <div className="text-xs mb-1" style={{ color: "#697386" }}>{label}</div>
      <div className="text-xl font-semibold" style={{ color: color ?? "#F5F7FA" }}>{value}</div>
    </div>
  );
}

export default function HabitDetail({ habit, onBack }: { habit: Habit; onBack: () => void }) {
  const historyData = useMemo(() => generateDailyData(90), []);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back */}
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
          Back to Habits
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center rounded-xl text-2xl"
              style={{ width: 52, height: 52, background: "#7C6CF21A" }}
            >
              {habit.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold" style={{ color: "#F5F7FA" }}>{habit.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs" style={{ color: "#697386" }}>{habit.description}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#10B9811A", color: "#10B981" }}
                >
                  Active
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="text-xs px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: "#11151E", border: "1px solid #242B38", color: "#A5ADBD" }}
            >
              Edit
            </button>
            <button
              className="text-xs px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: "#11151E", border: "1px solid #242B38", color: "#697386" }}
            >
              Archive
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <StatCard label="Current Streak" value={`${habit.currentStreak}d`} color="#F59E0B" />
          <StatCard label="Best Streak" value={`${habit.bestStreak}d`} color="#10B981" />
          <StatCard label="30d Completion" value={`${habit.completionRate30}%`} />
          <StatCard label="90d Completion" value={`${habit.completionRate90}%`} />
          <StatCard label="Total Done" value={`${habit.totalCompletions}`} />
        </div>

        {/* Completion history chart */}
        <div
          className="rounded-xl px-5 pt-5 pb-4 mb-4"
          style={{ background: "#11151E", border: "1px solid #242B38" }}
        >
          <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Completion History</div>
          <div className="text-xs mb-4" style={{ color: "#697386" }}>Daily % of scheduled habits completed — last 90 days</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={historyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#242B38" strokeWidth={0.5} vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "#697386", fontSize: 10 }} axisLine={false} tickLine={false} interval={13} />
              <YAxis tick={{ fill: "#697386", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip {...chartTooltipStyle} formatter={(v) => [`${v}%`, "Completion"]} />
              <Line type="monotone" dataKey="completion" stroke="#7C6CF2" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#7C6CF2", strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Weekday performance */}
          <div
            className="rounded-xl px-5 pt-5 pb-4"
            style={{ background: "#11151E", border: "1px solid #242B38" }}
          >
            <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Weekday Performance</div>
            <div className="text-xs mb-4" style={{ color: "#697386" }}>Average completion by day of week</div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={weekdayData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#242B38" strokeWidth={0.5} vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#697386", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#697386", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip {...chartTooltipStyle} formatter={(v) => [`${v}%`, "Completion"]} />
                <Bar dataKey="completion" radius={[3, 3, 0, 0]} maxBarSize={24}>
                  {weekdayData.map((e, i) => (
                    <Cell key={i} fill={e.completion >= 78 ? "#10B981" : "#7C6CF2"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Habit calendar (30-day) */}
          <div
            className="rounded-xl px-5 pt-5 pb-4"
            style={{ background: "#11151E", border: "1px solid #242B38" }}
          >
            <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Last 30 Days</div>
            <div className="text-xs mb-4" style={{ color: "#697386" }}>Daily completion record</div>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
              {["M","T","W","T","F","S","S"].map((d) => (
                <div key={d} className="text-center text-xs" style={{ color: "#697386" }}>{d}</div>
              ))}
              {habit.last30Days.map((done, i) => (
                <div
                  key={i}
                  className="rounded aspect-square"
                  style={{ background: done ? "#7C6CF2" : "#1A2030" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Activity log */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #242B38" }}
        >
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ background: "#0D1017", borderBottom: "1px solid #242B38" }}
          >
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Recent Activity</span>
            <span className="text-xs" style={{ color: "#697386" }}>Last 7 days</span>
          </div>
          {[
            { date: "Aug 31, 2026", day: "Today", done: true },
            { date: "Aug 30, 2026", day: "Yesterday", done: false },
            { date: "Aug 29, 2026", day: "Sat", done: true },
            { date: "Aug 28, 2026", day: "Fri", done: true },
            { date: "Aug 27, 2026", day: "Thu", done: true },
            { date: "Aug 26, 2026", day: "Wed", done: true },
            { date: "Aug 25, 2026", day: "Tue", done: false },
          ].map((entry, i, arr) => (
            <div
              key={entry.date}
              className="flex items-center gap-4 px-5 py-3"
              style={{
                background: "#11151E",
                borderBottom: i < arr.length - 1 ? "1px solid #1A2030" : "none",
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: entry.done ? "#10B9811A" : "#EF44441A",
                  border: `1px solid ${entry.done ? "#10B981" : "#EF4444"}`,
                }}
              >
                {entry.done ? (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2 4-4" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M2.5 2.5l4 4M6.5 2.5l-4 4" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm" style={{ color: "#F5F7FA" }}>{entry.day}</span>
                <span className="text-xs ml-2" style={{ color: "#697386" }}>{entry.date}</span>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: entry.done ? "#10B9811A" : "#EF44441A",
                  color: entry.done ? "#10B981" : "#EF4444",
                }}
              >
                {entry.done ? "Completed" : "Missed"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
