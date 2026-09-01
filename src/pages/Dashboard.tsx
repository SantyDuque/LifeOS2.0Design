import { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { generateDailyData, generateWeeklyData, weekdayData, habitRankData, generateHeatmapData } from "../data/mockData";

const periods = ["7d", "30d", "90d", "6mo", "1yr"] as const;
type Period = typeof periods[number];

function KpiCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div
      className="rounded-xl px-5 py-4"
      style={{ background: "#11151E", border: "1px solid #242B38" }}
    >
      <div className="text-xs mb-2" style={{ color: "#697386" }}>{label}</div>
      <div className="text-2xl font-semibold" style={{ color: color ?? "#F5F7FA" }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#697386" }}>{sub}</div>}
    </div>
  );
}

const chartTooltipStyle = {
  contentStyle: {
    background: "#161B26",
    border: "1px solid #242B38",
    borderRadius: 8,
    fontSize: 12,
    color: "#F5F7FA",
  },
  cursor: { stroke: "#7C6CF240", strokeWidth: 1 },
  itemStyle: { color: "#A5ADBD" },
  labelStyle: { color: "#F5F7FA", marginBottom: 4, fontWeight: 500 },
};

function Heatmap({ data }: { data: ReturnType<typeof generateHeatmapData> }) {
  const [hovered, setHovered] = useState<string | null>(null);

  // Build week columns
  const weeks: { date: string; pct: number; label: string }[][] = [];
  let week: { date: string; pct: number; label: string }[] = [];
  data.slice(-168).forEach((cell, i) => {
    week.push(cell);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) weeks.push(week);

  const getColor = (pct: number) => {
    if (pct === 0) return "#1A2030";
    if (pct < 30) return "#7C6CF240";
    if (pct < 60) return "#7C6CF270";
    if (pct < 80) return "#7C6CF2A0";
    return "#7C6CF2";
  };

  const hCell = data.find((d) => d.date === hovered);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs" style={{ color: "#697386" }}>Less</span>
        {[0, 25, 50, 75, 100].map((v) => (
          <div key={v} className="rounded-sm" style={{ width: 10, height: 10, background: getColor(v) }} />
        ))}
        <span className="text-xs" style={{ color: "#697386" }}>More</span>
        {hovered && hCell && (
          <span className="ml-auto text-xs" style={{ color: "#A5ADBD" }}>
            {hCell.label} — {hCell.pct}% completed
          </span>
        )}
      </div>
      <div className="flex gap-px overflow-x-auto">
        {weeks.map((wk, wi) => (
          <div key={wi} className="flex flex-col gap-px">
            {wk.map((cell) => (
              <div
                key={cell.date}
                className="rounded-sm cursor-pointer transition-all duration-100"
                style={{
                  width: 11,
                  height: 11,
                  background: getColor(cell.pct),
                  outline: hovered === cell.date ? "1.5px solid #7C6CF2" : "none",
                }}
                onMouseEnter={() => setHovered(cell.date)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>("30d");

  const dailyData = useMemo(() => {
    const n = period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 90 : period === "6mo" ? 180 : 365;
    return generateDailyData(n);
  }, [period]);

  const weeklyData = useMemo(() => generateWeeklyData(12), []);
  const heatmapData = useMemo(() => generateHeatmapData(), []);

  const avgCompletion = Math.round(dailyData.reduce((a, b) => a + b.completion, 0) / dailyData.length);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Period filter */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold" style={{ color: "#F5F7FA" }}>Performance Overview</h2>
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ background: "#11151E", border: "1px solid #242B38" }}
          >
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="text-xs font-medium px-3 py-1.5 transition-colors"
                style={{
                  background: period === p ? "#7C6CF2" : "transparent",
                  color: period === p ? "white" : "#697386",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <KpiCard label="Avg. Completion" value={`${avgCompletion}%`} sub={`Last ${period}`} color="#7C6CF2" />
          <KpiCard label="Active Habits" value="8" sub="All tracking" />
          <KpiCard label="Best Streak" value="14d" sub="Morning Walk" color="#10B981" />
          <KpiCard label="Goals On Track" value="3/4" sub="One at risk" />
          <KpiCard label="Weekly Score" value="71%" sub="↑7% vs last week" color="#10B981" />
        </div>

        {/* Completion trend */}
        <div
          className="rounded-xl px-5 pt-5 pb-4 mb-4"
          style={{ background: "#11151E", border: "1px solid #242B38" }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Habit Completion Trend</div>
              <div className="text-xs mt-0.5" style={{ color: "#697386" }}>Daily completion % with 7-day average</div>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: "#697386" }}>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-0.5 rounded" style={{ background: "#7C6CF2" }} />
                Daily
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-0.5 rounded" style={{ background: "#10B981" }} />
                7d avg
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={dailyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#242B38" strokeWidth={0.5} vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "#697386", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={Math.floor(dailyData.length / 6)}
              />
              <YAxis
                tick={{ fill: "#697386", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                {...chartTooltipStyle}
                formatter={(v, name) => [`${v}%`, name === "completion" ? "Daily" : "7d Avg"]}
              />
              <Line
                type="monotone"
                dataKey="completion"
                stroke="#7C6CF260"
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 4, fill: "#7C6CF2", strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="ma7"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#10B981", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Weekly consistency */}
          <div
            className="rounded-xl px-5 pt-5 pb-4"
            style={{ background: "#11151E", border: "1px solid #242B38" }}
          >
            <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Weekly Consistency</div>
            <div className="text-xs mb-4" style={{ color: "#697386" }}>Completion % by week</div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#242B38" strokeWidth={0.5} vertical={false} />
                <XAxis dataKey="week" tick={{ fill: "#697386", fontSize: 10 }} axisLine={false} tickLine={false} interval={1} />
                <YAxis tick={{ fill: "#697386", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip {...chartTooltipStyle} formatter={(v, n) => [`${v}%`, n === "completed" ? "Completed" : "Missed"]} />
                <Bar dataKey="completed" fill="#7C6CF2" radius={[3, 3, 0, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Completion by weekday */}
          <div
            className="rounded-xl px-5 pt-5 pb-4"
            style={{ background: "#11151E", border: "1px solid #242B38" }}
          >
            <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Completion by Weekday</div>
            <div className="text-xs mb-4" style={{ color: "#697386" }}>Average completion rate per day</div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weekdayData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#242B38" strokeWidth={0.5} vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#697386", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#697386", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip {...chartTooltipStyle} formatter={(v) => [`${v}%`, "Completion"]} />
                <Bar dataKey="completion" radius={[3, 3, 0, 0]} maxBarSize={28}>
                  {weekdayData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.completion >= 80 ? "#10B981" : entry.completion >= 65 ? "#7C6CF2" : "#F59E0B"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Habit rank */}
        <div
          className="rounded-xl px-5 pt-5 pb-4 mb-4"
          style={{ background: "#11151E", border: "1px solid #242B38" }}
        >
          <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Completion by Habit</div>
          <div className="text-xs mb-5" style={{ color: "#697386" }}>Ranked by 30-day completion rate</div>
          <div className="space-y-3">
            {habitRankData.map((h) => (
              <div key={h.name} className="flex items-center gap-3">
                <div className="w-28 text-xs text-right flex-shrink-0 truncate" style={{ color: "#A5ADBD" }}>
                  {h.name}
                </div>
                <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: "#242B38" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${h.completion}%`,
                      background: h.completion >= 80 ? "#10B981" : h.completion >= 65 ? "#7C6CF2" : "#F59E0B",
                    }}
                  />
                </div>
                <div className="w-8 text-right text-xs flex-shrink-0" style={{ color: "#A5ADBD" }}>
                  {h.completion}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div
          className="rounded-xl px-5 pt-5 pb-4"
          style={{ background: "#11151E", border: "1px solid #242B38" }}
        >
          <div className="text-sm font-medium mb-1" style={{ color: "#F5F7FA" }}>Habit Consistency Heatmap</div>
          <div className="text-xs mb-4" style={{ color: "#697386" }}>
            Daily habit completion over the last 24 weeks — hover for details
          </div>
          <Heatmap data={heatmapData} />
        </div>
      </div>
    </div>
  );
}
