import { useState } from "react";

const days = ["M", "T", "W", "T", "F", "S", "S"];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const categories = ["health", "mind", "body", "work", "evening", "morning"];
const icons = ["🚶", "📖", "🧘", "🏋️", "📋", "🎯", "💧", "🌙", "🏃", "🥗", "✍️", "🎵", "💻", "🌿", "💊", "🛌"];

export default function CreateHabit({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🚶");
  const [category, setCategory] = useState("health");
  const [frequency, setFrequency] = useState<"daily" | "weekdays" | "custom">("daily");
  const [selectedDays, setSelectedDays] = useState([true, true, true, true, true, false, false]);
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [saved, setSaved] = useState(false);

  const toggleDay = (i: number) => {
    setSelectedDays((prev) => prev.map((d, idx) => (idx === i ? !d : d)));
  };

  const recurrenceSummary = () => {
    if (frequency === "daily") return "Every day";
    if (frequency === "weekdays") return "Monday through Friday";
    const selected = dayLabels.filter((_, i) => selectedDays[i]);
    if (selected.length === 0) return "No days selected";
    if (selected.length === 7) return "Every day";
    return `Every ${selected.join(", ")}`;
  };

  const handleSave = () => {
    if (!name.trim()) return;
    setSaved(true);
    setTimeout(onBack, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-2xl mx-auto px-6 py-8">
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

        <h2 className="text-xl font-semibold mb-6" style={{ color: "#F5F7FA" }}>New Habit</h2>

        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #242B38" }}
        >
          {/* Basic info */}
          <div className="px-6 py-5" style={{ background: "#11151E", borderBottom: "1px solid #242B38" }}>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#697386" }}>
              Basic Info
            </h3>

            <div className="space-y-4">
              {/* Icon picker */}
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "#A5ADBD" }}>Icon</label>
                <div className="flex flex-wrap gap-2">
                  {icons.map((ic) => (
                    <button
                      key={ic}
                      onClick={() => setIcon(ic)}
                      className="text-xl rounded-lg transition-all"
                      style={{
                        width: 40,
                        height: 40,
                        background: icon === ic ? "#7C6CF21A" : "#161B26",
                        border: `1px solid ${icon === ic ? "#7C6CF2" : "#242B38"}`,
                      }}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "#A5ADBD" }}>
                  Habit name <span style={{ color: "#7C6CF2" }}>*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Morning walk"
                  className="w-full rounded-lg px-4 text-sm outline-none transition-colors"
                  style={{
                    height: 38,
                    background: "#161B26",
                    border: `1px solid ${name ? "#7C6CF2" : "#242B38"}`,
                    color: "#F5F7FA",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = name ? "#7C6CF2" : "#242B38")}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "#A5ADBD" }}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional details…"
                  rows={2}
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none transition-colors"
                  style={{
                    background: "#161B26",
                    border: "1px solid #242B38",
                    color: "#F5F7FA",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#242B38")}
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "#A5ADBD" }}>Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className="text-xs px-3 py-1.5 rounded-lg transition-all capitalize"
                      style={{
                        background: category === cat ? "#7C6CF21A" : "#161B26",
                        border: `1px solid ${category === cat ? "#7C6CF2" : "#242B38"}`,
                        color: category === cat ? "#7C6CF2" : "#697386",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recurrence */}
          <div className="px-6 py-5" style={{ background: "#11151E", borderBottom: "1px solid #242B38" }}>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#697386" }}>
              Recurrence
            </h3>

            <div className="space-y-4">
              {/* Frequency type */}
              <div
                className="flex rounded-lg overflow-hidden"
                style={{ background: "#161B26", border: "1px solid #242B38", width: "fit-content" }}
              >
                {(["daily", "weekdays", "custom"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className="text-xs font-medium px-4 py-2 transition-colors capitalize"
                    style={{
                      background: frequency === f ? "#7C6CF2" : "transparent",
                      color: frequency === f ? "white" : "#697386",
                    }}
                  >
                    {f === "weekdays" ? "Weekdays" : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              {/* Day picker */}
              {frequency === "custom" && (
                <div>
                  <div className="flex gap-2">
                    {days.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => toggleDay(i)}
                        className="rounded-lg text-xs font-medium transition-all"
                        style={{
                          width: 36,
                          height: 36,
                          background: selectedDays[i] ? "#7C6CF2" : "#161B26",
                          border: `1px solid ${selectedDays[i] ? "#7C6CF2" : "#242B38"}`,
                          color: selectedDays[i] ? "white" : "#697386",
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs"
                style={{ background: "#7C6CF20D", border: "1px solid #7C6CF230", color: "#A5ADBD" }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ color: "#7C6CF2", flexShrink: 0 }}>
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M6.5 4v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {recurrenceSummary()}
              </div>

              {/* Time of day */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "#A5ADBD" }}>Preferred time</label>
                <div className="flex gap-2">
                  {["morning", "afternoon", "evening", "anytime"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeOfDay(t)}
                      className="text-xs px-3 py-1.5 rounded-lg transition-all capitalize"
                      style={{
                        background: timeOfDay === t ? "#7C6CF21A" : "#161B26",
                        border: `1px solid ${timeOfDay === t ? "#7C6CF2" : "#242B38"}`,
                        color: timeOfDay === t ? "#7C6CF2" : "#697386",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className="px-6 py-4 flex items-center justify-end gap-3"
            style={{ background: "#0D1017" }}
          >
            <button
              onClick={onBack}
              className="text-sm px-4 py-2 rounded-lg transition-colors"
              style={{ color: "#697386" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!name.trim() || saved}
              className="text-sm font-medium px-5 py-2 rounded-lg transition-all"
              style={{
                background: saved ? "#10B981" : name.trim() ? "#7C6CF2" : "#7C6CF240",
                color: "white",
                cursor: name.trim() ? "pointer" : "not-allowed",
              }}
            >
              {saved ? "✓ Created" : "Create Habit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
