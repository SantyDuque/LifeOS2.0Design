import { useState } from "react";

type Page = "today" | "dashboard" | "habits" | "goals" | "finances" | "insights" | "calendar" | "review" | "settings";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
  {
    id: "today",
    label: "Today",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 7h12" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "habits",
    label: "Habits",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "goals",
    label: "Goals",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 2v1M8 13v1M2 8h1M13 8h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "finances",
    label: "Finances",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="4.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 4.5V3a1 1 0 011-1h4a1 1 0 011 1v1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    id: "insights",
    label: "Insights",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 12l3.5-4 3 2.5 3.5-5L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 7h12" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="5" y="9.5" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="9" y="9.5" width="2" height="2" rx="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "review",
    label: "Review",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 5h6M5 8h6M5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Sidebar({ currentPage, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div
      className="flex flex-col h-full transition-all duration-200 select-none"
      style={{
        width: collapsed ? 56 : 220,
        background: "#0D1017",
        borderRight: "1px solid #242B38",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4"
        style={{ height: 56, borderBottom: "1px solid #242B38" }}
      >
        <div
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{ width: 28, height: 28, background: "#7C6CF2" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L2 4.5V9.5L7 13L12 9.5V4.5L7 1Z" fill="white" fillOpacity="0.9"/>
            <path d="M7 4L4 6V8.5L7 10.5L10 8.5V6L7 4Z" fill="white"/>
          </svg>
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm tracking-tight" style={{ color: "#F5F7FA" }}>
            LifeOS
          </span>
        )}
        <button
          onClick={onToggleCollapse}
          className="ml-auto rounded-md p-1 transition-colors"
          style={{ color: "#697386" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#A5ADBD")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#697386")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            {collapsed ? (
              <path d="M2 4h10M2 7h10M2 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            ) : (
              <path d="M9 2L5 7l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex items-center gap-3 w-full rounded-md transition-all duration-100 text-left"
              style={{
                height: 34,
                paddingLeft: 10,
                paddingRight: 10,
                color: active ? "#F5F7FA" : "#697386",
                background: active ? "#7C6CF21A" : "transparent",
                fontWeight: active ? 500 : 400,
                fontSize: 13,
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "#11151E";
                  e.currentTarget.style.color = "#A5ADBD";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#697386";
                }
              }}
            >
              <span style={{ color: active ? "#7C6CF2" : "currentColor", flexShrink: 0 }}>
                {item.icon}
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #242B38" }} />

      {/* Settings */}
      <div className="px-2 py-2">
        <button
          onClick={() => onNavigate("settings")}
          className="flex items-center gap-3 w-full rounded-md transition-all duration-100 text-left"
          style={{
            height: 34,
            paddingLeft: 10,
            paddingRight: 10,
            color: currentPage === "settings" ? "#F5F7FA" : "#697386",
            background: currentPage === "settings" ? "#7C6CF21A" : "transparent",
            fontSize: 13,
          }}
          onMouseEnter={(e) => {
            if (currentPage !== "settings") {
              e.currentTarget.style.background = "#11151E";
              e.currentTarget.style.color = "#A5ADBD";
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== "settings") {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#697386";
            }
          }}
        >
          <span style={{ color: currentPage === "settings" ? "#7C6CF2" : "currentColor", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.93 2.93l1.41 1.41M11.66 11.66l1.41 1.41M13.07 2.93l-1.41 1.41M4.34 11.66l-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          {!collapsed && <span>Settings</span>}
        </button>
      </div>

      {/* User */}
      <div style={{ borderTop: "1px solid #242B38" }} className="relative">
        <button
          className="flex items-center gap-3 w-full px-4 transition-colors"
          style={{ height: 56, background: showUserMenu ? "#11151E" : "transparent" }}
          onClick={() => setShowUserMenu(!showUserMenu)}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#11151E")}
          onMouseLeave={(e) => (e.currentTarget.style.background = showUserMenu ? "#11151E" : "transparent")}
        >
          <div
            className="rounded-full flex items-center justify-center font-medium text-xs flex-shrink-0"
            style={{ width: 28, height: 28, background: "#7C6CF230", color: "#7C6CF2" }}
          >
            AK
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 text-left min-w-0">
                <div className="text-xs font-medium truncate" style={{ color: "#F5F7FA" }}>
                  Alex Kim
                </div>
                <div className="text-xs truncate" style={{ color: "#697386" }}>
                  alex@lifeos.app
                </div>
              </div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "#697386" }}>
                <path d="M3 5l3-3 3 3M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
        {showUserMenu && !collapsed && (
          <div
            className="absolute bottom-full left-2 right-2 mb-1 rounded-lg py-1"
            style={{ background: "#161B26", border: "1px solid #242B38", zIndex: 50 }}
          >
            {["Profile", "Export Data", "Sign Out"].map((item, i) => (
              <button
                key={item}
                className="w-full text-left px-3 py-2 text-xs transition-colors"
                style={{
                  color: item === "Sign Out" ? "#EF4444" : "#A5ADBD",
                  borderTop: i === 2 ? "1px solid #242B38" : "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1A2030")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
