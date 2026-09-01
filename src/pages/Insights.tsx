import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { habitRankData, weekdayData, generateDailyData } from "../data/mockData";

const chartTooltipStyle = {
  contentStyle: { background: "#161B26", border: "1px solid #242B38", borderRadius: 8, fontSize: 12, color: "#F5F7FA" },
  itemStyle: { color: "#A5ADBD" },
  labelStyle: { color: "#F5F7FA", marginBottom: 4, fontWeight: 500 },
};

const tabs = ["Consistency", "Time Patterns", "Trends", "Relationships"] as const;
type Tab = typeof tabs[number];

const trendHabits = [
  { name: "Morning Walk", direction: "up", delta: 12, rate: 92 },
  { name: "Meditation", direction: "up", delta: 8, rate: 81 },
  { name: "Deep Work", direction: "up", delta: 5, rate: 57 },
  { name: "Exercise", direction: "stable", delta: 0, rate: 74 },
  { name: "Drink Water", direction: "stable", delta: -2, rate: 78 },
  { name: "Evening Review", direction: "down", delta: -11, rate: 45 },
  { name: "Plan the Day", direction: "down", delta: -8, rate: 63 },
];

const correlations = [
  { if: "Morning Walk", then: "Meditation", lift: 38, confidence: "High" },
  { if: "Plan the Day", then: "Deep Work", lift: 29, confidence: "High" },
  { if: "Meditation", then: "Evening Review", lift: 22, confidence: "Moderate" },
];

export default function Insights() {
  const [tab, setTab] = useState<Tab>("Consistency");
  const dailyData = generateDailyData(90);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1" style={{ color: "#F5F7FA" }}>Insights</h2>
          <p className="text-sm" style={{ color: "#697386" }}>Patterns and trends in your tracking data</p>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-0 rounded-lg mb-6 overflow-hidden w-fit"
          style={{ background: "#11151E", border: "1px solid #242B38" }}
        >
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="text-xs font-medium px-4 py-2 transition-colors"
              style={{
                background: tab === t ? "#7C6CF2" : "transparent",
                color: tab === t ? "white" : "#697386",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Consistency tab */}
        {tab === "Consistency" && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-3 mb-2">
              <div className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
                <div className="text-xs mb-1" style={{ color: "#697386" }}>Overall 30d Avg</div>
                <div className="text-2xl font-semibold" style={{ color: "#7C6CF2" }}>74%</div>
                <div className="text-xs mt-0.5" style={{ color: "#10B981" }}>↑5% vs prior period</div>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
                <div className="text-xs mb-1" style={{ color: "#697386" }}>Strongest Habit</div>
                <div className="text-lg font-semibold" style={{ color: "#F5F7FA" }}>Morning Walk</div>
                <div className="text-xs mt-0.5" style={{ color: "#697386" }}>92% · 14-day streak</div>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
                <div className="text-xs mb-1" style={{ color: "#697386" }}>Needs Attention</div>
                <div className="text-lg font-semibold" style={{ color: "#F59E0B" }}>Evening Review</div>
                <div className="text-xs mt-0.5" style={{ color: "#697386" }}>45% · 0-day streak</div>
              </div>
            </div>

            <div className="rounded-xl px-5 pt-5 pb-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
              <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Completion by Habit</div>
              <div className="text-xs mb-5" style={{ color: "#697386" }}>Ranked by 30-day completion rate</div>
              <div className="space-y-3">
                {habitRankData.map((h) => (
                  <div key={h.name} className="flex items-center gap-3">
                    <div className="w-28 text-xs text-right flex-shrink-0" style={{ color: "#A5ADBD" }}>{h.name}</div>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: "#242B38" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${h.completion}%`,
                          background: h.completion >= 80 ? "#10B981" : h.completion >= 60 ? "#7C6CF2" : "#F59E0B",
                        }}
                      />
                    </div>
                    <div className="w-8 text-right text-xs flex-shrink-0" style={{ color: "#A5ADBD" }}>{h.completion}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Time Patterns tab */}
        {tab === "Time Patterns" && (
          <div className="space-y-4">
            <div className="rounded-xl px-5 pt-5 pb-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
              <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Completion by Weekday</div>
              <div className="text-xs mb-4" style={{ color: "#697386" }}>Average completion rate across all habits</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weekdayData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#242B38" strokeWidth={0.5} vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#697386", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#697386", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip {...chartTooltipStyle} formatter={(v) => [`${v}%`, "Avg Completion"]} />
                  <Bar dataKey="completion" radius={[3, 3, 0, 0]} maxBarSize={32}>
                    {weekdayData.map((e, i) => (
                      <Cell key={i} fill={e.completion >= 80 ? "#10B981" : e.completion >= 65 ? "#7C6CF2" : "#F59E0B"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div
                className="mt-4 px-4 py-3 rounded-lg text-xs"
                style={{ background: "#7C6CF20D", border: "1px solid #7C6CF230", color: "#A5ADBD" }}
              >
                💡 Monday is your most consistent day at 82%. Weekends drop to 57–63%. Consider lighter weekend targets.
              </div>
            </div>

            <div className="rounded-xl px-5 pt-5 pb-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
              <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>90-Day Completion Trend</div>
              <div className="text-xs mb-4" style={{ color: "#697386" }}>Daily completion % over the last three months</div>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={dailyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#242B38" strokeWidth={0.5} vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: "#697386", fontSize: 10 }} axisLine={false} tickLine={false} interval={14} />
                  <YAxis tick={{ fill: "#697386", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip {...chartTooltipStyle} formatter={(v) => [`${v}%`, "Completion"]} />
                  <Line type="monotone" dataKey="ma7" stroke="#7C6CF2" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#7C6CF2", strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Trends tab */}
        {tab === "Trends" && (
          <div className="space-y-3">
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid #242B38" }}
            >
              <div className="px-5 py-3" style={{ background: "#0D1017", borderBottom: "1px solid #242B38" }}>
                <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Habit Momentum (30d vs 60d)</span>
              </div>
              {trendHabits.map((h, i) => (
                <div
                  key={h.name}
                  className="flex items-center gap-4 px-5 py-3"
                  style={{
                    background: "#11151E",
                    borderBottom: i < trendHabits.length - 1 ? "1px solid #1A2030" : "none",
                  }}
                >
                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-sm" style={{ color: "#F5F7FA" }}>{h.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 rounded-full overflow-hidden" style={{ height: 4, background: "#242B38" }}>
                      <div className="h-full rounded-full" style={{ width: `${h.rate}%`, background: "#7C6CF2" }} />
                    </div>
                    <span className="text-xs w-8 text-right" style={{ color: "#A5ADBD" }}>{h.rate}%</span>
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs w-14 justify-end"
                    style={{ color: h.direction === "up" ? "#10B981" : h.direction === "down" ? "#EF4444" : "#697386" }}
                  >
                    {h.direction === "up" ? "↑" : h.direction === "down" ? "↓" : "→"}
                    {h.delta !== 0 && ` ${Math.abs(h.delta)}%`}
                    {h.delta === 0 && " stable"}
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full w-20 text-center"
                    style={{
                      background: h.direction === "up" ? "#10B9811A" : h.direction === "down" ? "#EF44441A" : "#1A2030",
                      color: h.direction === "up" ? "#10B981" : h.direction === "down" ? "#EF4444" : "#697386",
                    }}
                  >
                    {h.direction === "up" ? "Improving" : h.direction === "down" ? "Declining" : "Stable"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Relationships tab */}
        {tab === "Relationships" && (
          <div className="space-y-4">
            <div
              className="px-4 py-3 rounded-lg text-xs leading-relaxed"
              style={{ background: "#F59E0B0D", border: "1px solid #F59E0B30", color: "#A5ADBD" }}
            >
              ⚠️ These are associations based on co-occurrence in your data, not causal relationships. Patterns require
              at least 30 days of consistent tracking to be meaningful.
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
              <div className="px-5 py-3" style={{ background: "#0D1017", borderBottom: "1px solid #242B38" }}>
                <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Co-occurrence Patterns</span>
              </div>
              {correlations.map((c, i) => (
                <div
                  key={i}
                  className="px-5 py-4"
                  style={{ background: "#11151E", borderBottom: i < correlations.length - 1 ? "1px solid #1A2030" : "none" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-sm mb-1" style={{ color: "#F5F7FA" }}>
                        Days with <strong style={{ color: "#7C6CF2" }}>{c.if}</strong> are associated with{" "}
                        <strong style={{ color: "#10B981" }}>+{c.lift}%</strong> higher completion of{" "}
                        <strong style={{ color: "#7C6CF2" }}>{c.then}</strong>
                      </div>
                      <div className="text-xs" style={{ color: "#697386" }}>
                        This is a correlation, not a cause. Both may share a common factor.
                      </div>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: c.confidence === "High" ? "#10B9811A" : "#F59E0B1A",
                        color: c.confidence === "High" ? "#10B981" : "#F59E0B",
                      }}
                    >
                      {c.confidence}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl px-5 py-8 text-center"
              style={{ background: "#11151E", border: "1px solid #242B38" }}
            >
              <div className="text-3xl mb-3">📊</div>
              <div className="text-sm font-medium mb-1" style={{ color: "#A5ADBD" }}>More patterns with more data</div>
              <div className="text-xs max-w-xs mx-auto" style={{ color: "#697386" }}>
                LifeOS needs at least 90 days of consistent tracking to identify reliable behavioral relationships.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
