import { useState } from "react";

type SettingsSection = "profile" | "appearance" | "preferences" | "data";

const sections: { id: SettingsSection; label: string; icon: string }[] = [
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "appearance", label: "Appearance", icon: "🎨" },
  { id: "preferences", label: "Preferences", icon: "⚙️" },
  { id: "data", label: "Data & Account", icon: "🗄️" },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative rounded-full transition-all duration-200 flex-shrink-0"
      style={{ width: 40, height: 22, background: checked ? "#7C6CF2" : "#242B38" }}
    >
      <span
        className="absolute rounded-full transition-all duration-200"
        style={{
          width: 16,
          height: 16,
          background: "white",
          top: 3,
          left: checked ? 21 : 3,
        }}
      />
    </button>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4" style={{ borderBottom: "1px solid #1A2030" }}>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium" style={{ color: "#F5F7FA" }}>{label}</div>
        {description && <div className="text-xs mt-0.5" style={{ color: "#697386" }}>{description}</div>}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const [section, setSection] = useState<SettingsSection>("profile");
  const [name, setName] = useState("Alex Kim");
  const [email, setEmail] = useState("alex@lifeos.app");
  const [weekStart, setWeekStart] = useState("monday");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12h");
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1" style={{ color: "#F5F7FA" }}>Settings</h2>
          <p className="text-sm" style={{ color: "#697386" }}>Preferences and account</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar nav */}
          <div className="flex-shrink-0" style={{ width: 180 }}>
            <nav className="space-y-0.5">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-left transition-colors text-sm"
                  style={{
                    background: section === s.id ? "#7C6CF21A" : "transparent",
                    color: section === s.id ? "#F5F7FA" : "#697386",
                    fontWeight: section === s.id ? 500 : 400,
                  }}
                  onMouseEnter={(e) => { if (section !== s.id) e.currentTarget.style.color = "#A5ADBD"; }}
                  onMouseLeave={(e) => { if (section !== s.id) e.currentTarget.style.color = "#697386"; }}
                >
                  <span>{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="rounded-xl overflow-hidden" style={{ background: "#11151E", border: "1px solid #242B38" }}>
              <div className="px-6 py-4" style={{ borderBottom: "1px solid #242B38" }}>
                <span className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>
                  {sections.find((s) => s.id === section)?.label}
                </span>
              </div>

              <div className="px-6">
                {section === "profile" && (
                  <div>
                    {/* Avatar */}
                    <div className="flex items-center gap-4 py-5" style={{ borderBottom: "1px solid #1A2030" }}>
                      <div
                        className="rounded-full flex items-center justify-center font-semibold"
                        style={{ width: 56, height: 56, background: "#7C6CF230", color: "#7C6CF2", fontSize: 18 }}
                      >
                        AK
                      </div>
                      <div>
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                          style={{ background: "#161B26", border: "1px solid #242B38", color: "#A5ADBD" }}
                        >
                          Change photo
                        </button>
                        <div className="text-xs mt-1.5" style={{ color: "#697386" }}>JPG or PNG, max 2MB</div>
                      </div>
                    </div>

                    <SettingRow label="Display name">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-lg px-3 text-sm outline-none transition-colors"
                        style={{ height: 34, width: 200, background: "#161B26", border: "1px solid #242B38", color: "#F5F7FA" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#242B38")}
                      />
                    </SettingRow>
                    <SettingRow label="Email" description="Used for account-related notifications">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-lg px-3 text-sm outline-none transition-colors"
                        style={{ height: 34, width: 200, background: "#161B26", border: "1px solid #242B38", color: "#F5F7FA" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#242B38")}
                      />
                    </SettingRow>
                  </div>
                )}

                {section === "appearance" && (
                  <div>
                    <SettingRow label="Theme" description="Interface color scheme">
                      <div
                        className="flex rounded-lg overflow-hidden"
                        style={{ background: "#161B26", border: "1px solid #242B38" }}
                      >
                        {["Dark", "System", "Light"].map((t) => (
                          <button
                            key={t}
                            className="text-xs px-3 py-1.5 transition-colors"
                            style={{
                              background: t === "Dark" ? "#7C6CF2" : "transparent",
                              color: t === "Dark" ? "white" : "#697386",
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </SettingRow>
                    <SettingRow label="Sound effects" description="Subtle audio on habit completion">
                      <Toggle checked={soundEffects} onChange={setSoundEffects} />
                    </SettingRow>
                    <SettingRow label="Reduce motion" description="Minimize animations">
                      <Toggle checked={false} onChange={() => {}} />
                    </SettingRow>
                  </div>
                )}

                {section === "preferences" && (
                  <div>
                    <SettingRow label="Week starts on">
                      <div
                        className="flex rounded-lg overflow-hidden"
                        style={{ background: "#161B26", border: "1px solid #242B38" }}
                      >
                        {["Monday", "Sunday"].map((d) => (
                          <button
                            key={d}
                            onClick={() => setWeekStart(d.toLowerCase())}
                            className="text-xs px-3 py-1.5 transition-colors"
                            style={{
                              background: weekStart === d.toLowerCase() ? "#7C6CF2" : "transparent",
                              color: weekStart === d.toLowerCase() ? "white" : "#697386",
                            }}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </SettingRow>
                    <SettingRow label="Date format">
                      <select
                        value={dateFormat}
                        onChange={(e) => setDateFormat(e.target.value)}
                        className="rounded-lg px-3 text-xs outline-none"
                        style={{ height: 34, background: "#161B26", border: "1px solid #242B38", color: "#F5F7FA" }}
                      >
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </SettingRow>
                    <SettingRow label="Time format">
                      <div
                        className="flex rounded-lg overflow-hidden"
                        style={{ background: "#161B26", border: "1px solid #242B38" }}
                      >
                        {["12h", "24h"].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTimeFormat(t)}
                            className="text-xs px-3 py-1.5 transition-colors"
                            style={{
                              background: timeFormat === t ? "#7C6CF2" : "transparent",
                              color: timeFormat === t ? "white" : "#697386",
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </SettingRow>
                    <SettingRow label="Habit reminders" description="Daily push notifications">
                      <Toggle checked={notifications} onChange={setNotifications} />
                    </SettingRow>
                  </div>
                )}

                {section === "data" && (
                  <div>
                    <SettingRow label="Export data" description="Download all your habits and completions as JSON">
                      <button
                        className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                        style={{ background: "#161B26", border: "1px solid #242B38", color: "#A5ADBD" }}
                      >
                        Export JSON
                      </button>
                    </SettingRow>
                    <SettingRow label="Import data" description="Restore from a previous export">
                      <button
                        className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                        style={{ background: "#161B26", border: "1px solid #242B38", color: "#A5ADBD" }}
                      >
                        Import
                      </button>
                    </SettingRow>

                    <div className="py-5" style={{ borderTop: "1px solid #242B38", marginTop: 4 }}>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#697386" }}>
                        Danger Zone
                      </div>
                      <div className="space-y-2">
                        <button
                          className="w-full text-left text-sm px-4 py-3 rounded-lg transition-colors"
                          style={{ background: "#EF44440D", border: "1px solid #EF444420", color: "#EF4444" }}
                        >
                          Delete all habit data…
                        </button>
                        <button
                          className="w-full text-left text-sm px-4 py-3 rounded-lg transition-colors"
                          style={{ background: "#EF44440D", border: "1px solid #EF444420", color: "#EF4444" }}
                        >
                          Delete account…
                        </button>
                      </div>
                    </div>

                    <div className="py-4 flex" style={{ borderTop: "1px solid #1A2030" }}>
                      <button
                        className="text-sm px-4 py-2 rounded-lg transition-colors"
                        style={{ color: "#697386" }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Save button */}
              {section !== "data" && (
                <div className="px-6 py-4 flex justify-end" style={{ borderTop: "1px solid #242B38" }}>
                  <button
                    onClick={handleSave}
                    className="text-sm font-medium px-5 py-2 rounded-lg transition-all"
                    style={{ background: saved ? "#10B981" : "#7C6CF2", color: "white" }}
                  >
                    {saved ? "✓ Saved" : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
