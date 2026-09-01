import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { weeklyReviewData } from "../data/mockData";

const chartTooltipStyle = {
  contentStyle: { background: "#161B26", border: "1px solid #242B38", borderRadius: 8, fontSize: 12, color: "#F5F7FA" },
  itemStyle: { color: "#A5ADBD" },
  labelStyle: { color: "#F5F7FA", marginBottom: 4, fontWeight: 500 },
};

const pastReviews = [
  { week: "Aug 17–23", completion: 64, completed: true },
  { week: "Aug 10–16", completion: 71, completed: true },
  { week: "Aug 3–9", completion: 58, completed: true },
];

export default function Review() {
  const [wentWell, setWentWell] = useState("");
  const [difficult, setDifficult] = useState("");
  const [nextWeek, setNextWeek] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const data = weeklyReviewData;
  const delta = data.overallCompletion - data.previousCompletion;

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1" style={{ color: "#F5F7FA" }}>Weekly Review</h2>
          <p className="text-sm" style={{ color: "#697386" }}>{data.week}, 2026</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Completion", value: `${data.overallCompletion}%`, sub: `${delta > 0 ? "↑" : "↓"}${Math.abs(delta)}% vs prior week`, color: delta >= 0 ? "#10B981" : "#EF4444" },
            { label: "Improved", value: `${data.habitsImproved}`, sub: "habits", color: "#10B981" },
            { label: "Declined", value: `${data.habitsDeclined}`, sub: "habits", color: "#EF4444" },
            { label: "Longest streak", value: `${data.longestStreak}d`, sub: "Morning Walk", color: "#F59E0B" },
            { label: "Goals moved", value: `${data.goalsProgressed}`, sub: "forward", color: "#7C6CF2" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
              <div className="text-xs mb-1" style={{ color: "#697386" }}>{s.label}</div>
              <div className="text-xl font-semibold" style={{ color: s.color }}>{s.value}</div>
              {s.sub && <div className="text-xs mt-0.5" style={{ color: "#697386" }}>{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* Habit comparison chart */}
        <div className="rounded-xl px-5 pt-5 pb-4 mb-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Habit Performance Comparison</div>
            <div className="flex items-center gap-4 text-xs" style={{ color: "#697386" }}>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#7C6CF2" }} />
                This week
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#7C6CF240" }} />
                Last week
              </span>
            </div>
          </div>
          <div className="text-xs mb-4" style={{ color: "#697386" }}>Aug 24–30 vs Aug 17–23</div>
          <div className="space-y-3">
            {data.habits.map((h) => (
              <div key={h.name} className="flex items-center gap-3">
                <div className="w-28 text-xs text-right" style={{ color: "#A5ADBD" }}>{h.name}</div>
                <div className="flex-1 relative">
                  <div className="rounded-full overflow-hidden mb-1" style={{ height: 4, background: "#242B38" }}>
                    <div className="h-full rounded-full" style={{ width: `${h.thisWeek}%`, background: "#7C6CF2" }} />
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: 3, background: "#242B38" }}>
                    <div className="h-full rounded-full" style={{ width: `${h.lastWeek}%`, background: "#7C6CF240" }} />
                  </div>
                </div>
                <div className="flex items-center gap-1 w-12 justify-end">
                  <span className="text-xs" style={{ color: "#A5ADBD" }}>{h.thisWeek}%</span>
                  <span
                    className="text-xs"
                    style={{ color: h.thisWeek > h.lastWeek ? "#10B981" : h.thisWeek < h.lastWeek ? "#EF4444" : "#697386" }}
                  >
                    {h.thisWeek > h.lastWeek ? "↑" : h.thisWeek < h.lastWeek ? "↓" : "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection */}
        <div className="rounded-xl overflow-hidden mb-6" style={{ border: "1px solid #242B38" }}>
          <div className="px-5 py-3" style={{ background: "#0D1017", borderBottom: "1px solid #242B38" }}>
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Reflection</span>
          </div>

          <div className="px-5 py-5 space-y-4" style={{ background: "#11151E" }}>
            {[
              { key: "wentWell", label: "What went well this week?", value: wentWell, onChange: setWentWell, placeholder: "Morning routine felt solid. Exercise sessions were consistent…" },
              { key: "difficult", label: "What was difficult?", value: difficult, onChange: setDifficult, placeholder: "Evening habits fell apart mid-week. Hard to review at night…" },
              { key: "nextWeek", label: "What should change next week?", value: nextWeek, onChange: setNextWeek, placeholder: "Set a 9pm reminder for evening review. Move exercise to morning…" },
            ].map(({ key, label, value, onChange, placeholder }) => (
              <div key={key}>
                <label className="text-xs font-medium mb-2 block" style={{ color: "#A5ADBD" }}>{label}</label>
                <textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  rows={3}
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none transition-colors"
                  style={{ background: "#161B26", border: "1px solid #242B38", color: "#F5F7FA" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#242B38")}
                />
              </div>
            ))}
          </div>

          <div className="px-5 py-4 flex justify-end" style={{ background: "#0D1017", borderTop: "1px solid #242B38" }}>
            <button
              onClick={() => setSubmitted(true)}
              className="text-sm font-medium px-5 py-2 rounded-lg transition-all"
              style={{ background: submitted ? "#10B981" : "#7C6CF2", color: "white" }}
            >
              {submitted ? "✓ Review Saved" : "Complete Weekly Review"}
            </button>
          </div>
        </div>

        {/* Past reviews */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#697386" }}>Past Reviews</h3>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
            {pastReviews.map((r, i) => (
              <div
                key={r.week}
                className="flex items-center gap-4 px-5 py-3 transition-colors cursor-pointer"
                style={{ background: "#11151E", borderBottom: i < pastReviews.length - 1 ? "1px solid #1A2030" : "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#161B26")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#11151E")}
              >
                <div className="flex-1">
                  <span className="text-sm" style={{ color: "#F5F7FA" }}>{r.week}, 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 rounded-full overflow-hidden" style={{ height: 3, background: "#242B38" }}>
                    <div className="h-full rounded-full" style={{ width: `${r.completion}%`, background: "#7C6CF2" }} />
                  </div>
                  <span className="text-xs w-8" style={{ color: "#A5ADBD" }}>{r.completion}%</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#10B9811A", color: "#10B981" }}>
                  Done
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
