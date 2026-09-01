import { useState } from "react";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday-first
}

// Fake completion data
function getDayData(year: number, month: number, day: number): { pct: number; hasGoal: boolean; hasReview: boolean } {
  const seed = (year * 100 + month) * 32 + day;
  const pct = Math.round(40 + ((seed * 7919) % 60));
  const hasGoal = day % 14 === 0;
  const hasReview = day % 7 === 0 && day > 1;
  return { pct, hasGoal, hasReview };
}

function getPctColor(pct: number) {
  if (pct >= 85) return "#10B981";
  if (pct >= 65) return "#7C6CF2";
  if (pct >= 40) return "#F59E0B";
  return "#EF4444";
}

export default function CalendarPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(7); // August = 7
  const [selectedDay, setSelectedDay] = useState<number | null>(31);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prev = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const today = selectedDay ? getDayData(year, month, selectedDay) : null;

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1" style={{ color: "#F5F7FA" }}>Calendar</h2>
          <p className="text-sm" style={{ color: "#697386" }}>Behavioral history — not a scheduling tool</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden" style={{ background: "#11151E", border: "1px solid #242B38" }}>
              {/* Nav */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: "1px solid #242B38" }}
              >
                <button
                  onClick={prev}
                  className="rounded-md p-1.5 transition-colors"
                  style={{ color: "#697386" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#A5ADBD")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#697386")}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M8 2L3 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>
                  {months[month]} {year}
                </span>
                <button
                  onClick={next}
                  className="rounded-md p-1.5 transition-colors"
                  style={{ color: "#697386" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#A5ADBD")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#697386")}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="p-4">
                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                    <div key={d} className="text-center text-xs py-1" style={{ color: "#697386" }}>{d}</div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Leading empty cells */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const day = idx + 1;
                    const data = getDayData(year, month, day);
                    const isSelected = selectedDay === day;
                    const isToday = year === 2026 && month === 7 && day === 31;

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className="relative rounded-lg flex flex-col items-center py-2 transition-all"
                        style={{
                          background: isSelected ? "#7C6CF21A" : "transparent",
                          border: `1px solid ${isSelected ? "#7C6CF2" : "transparent"}`,
                        }}
                        onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "#161B26"; }}
                        onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                      >
                        <span
                          className="text-xs font-medium mb-1"
                          style={{ color: isToday ? "#7C6CF2" : "#F5F7FA" }}
                        >
                          {day}
                        </span>
                        <div
                          className="rounded-full"
                          style={{ width: 6, height: 6, background: getPctColor(data.pct) }}
                        />
                        {(data.hasGoal || data.hasReview) && (
                          <div className="flex gap-0.5 mt-0.5">
                            {data.hasGoal && <div className="rounded-full" style={{ width: 3, height: 3, background: "#F59E0B" }} />}
                            {data.hasReview && <div className="rounded-full" style={{ width: 3, height: 3, background: "#3B82F6" }} />}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-4 pt-3" style={{ borderTop: "1px solid #242B38" }}>
                  {[
                    { color: "#10B981", label: "85%+" },
                    { color: "#7C6CF2", label: "65–84%" },
                    { color: "#F59E0B", label: "40–64%" },
                    { color: "#EF4444", label: "<40%" },
                    { color: "#F59E0B", label: "Goal milestone", dot: true },
                    { color: "#3B82F6", label: "Weekly review", dot: true },
                  ].map((l) => (
                    <span key={l.label} className="flex items-center gap-1.5 text-xs" style={{ color: "#697386" }}>
                      <span
                        className="rounded-full"
                        style={{
                          width: l.dot ? 5 : 7,
                          height: l.dot ? 5 : 7,
                          background: l.color,
                        }}
                      />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Day detail */}
          <div>
            {selectedDay && today ? (
              <div className="rounded-xl overflow-hidden" style={{ background: "#11151E", border: "1px solid #242B38" }}>
                <div className="px-4 py-3" style={{ borderBottom: "1px solid #242B38" }}>
                  <div className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>
                    {months[month]} {selectedDay}
                  </div>
                  <div className="text-xs" style={{ color: "#697386" }}>{year}</div>
                </div>

                <div className="px-4 py-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: `${getPctColor(today.pct)}1A`, color: getPctColor(today.pct) }}
                    >
                      {today.pct}%
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Habits complete</div>
                      <div className="text-xs" style={{ color: "#697386" }}>
                        ~{Math.round(today.pct / 12.5)}/8 habits
                      </div>
                    </div>
                  </div>

                  <div className="w-full rounded-full overflow-hidden mb-4" style={{ height: 4, background: "#242B38" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${today.pct}%`, background: getPctColor(today.pct) }}
                    />
                  </div>

                  {today.hasGoal && (
                    <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-2" style={{ background: "#F59E0B0D", color: "#F59E0B" }}>
                      🏁 Goal milestone recorded
                    </div>
                  )}
                  {today.hasReview && (
                    <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg" style={{ background: "#3B82F60D", color: "#3B82F6" }}>
                      📝 Weekly review completed
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="rounded-xl px-4 py-8 text-center"
                style={{ background: "#11151E", border: "1px solid #242B38" }}
              >
                <div className="text-2xl mb-2">📅</div>
                <div className="text-sm" style={{ color: "#697386" }}>Select a day to see details</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
