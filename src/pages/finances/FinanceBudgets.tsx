import { useState } from "react";
import { budgets, getCategoryById } from "../../data/financeData";

export default function FinanceBudgets() {
  const [showAdd, setShowAdd] = useState(false);

  const totalBudgeted = budgets.reduce((s, b) => s + b.limit.value, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent.value, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total budgeted", value: `$${totalBudgeted.toLocaleString()}`, color: "#F5F7FA" },
          { label: "Spent", value: `$${totalSpent.toLocaleString()}`, color: "#F5F7FA" },
          { label: "Remaining", value: `$${totalRemaining.toLocaleString()}`, color: totalRemaining >= 0 ? "#10B981" : "#EF4444" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
            <div className="text-xs mb-1" style={{ color: "#697386" }}>{s.label}</div>
            <div className="text-xl font-semibold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Budget rows */}
      <div className="rounded-xl overflow-hidden mb-4" style={{ border: "1px solid #242B38" }}>
        <div
          className="grid text-xs font-medium px-5 py-2.5"
          style={{
            background: "#0D1017",
            color: "#697386",
            gridTemplateColumns: "1fr 120px 100px 80px 80px",
            borderBottom: "1px solid #242B38",
          }}
        >
          <span>Category</span>
          <span>Spent / Limit</span>
          <span>Remaining</span>
          <span>Progress</span>
          <span>vs last mo.</span>
        </div>

        {budgets.map((b, i) => {
          const cat = getCategoryById(b.categoryId);
          const pct = Math.round((b.spent.value / b.limit.value) * 100);
          const remaining = b.limit.value - b.spent.value;
          const over = remaining < 0;
          const near = pct >= 80 && !over;
          const barColor = over ? "#EF4444" : near ? "#F59E0B" : "#10B981";
          const prevPct = Math.round((b.prevMonthSpent.value / b.limit.value) * 100);
          const deltaPct = pct - prevPct;

          return (
            <div
              key={b.id}
              className="grid items-center px-5 py-3"
              style={{
                gridTemplateColumns: "1fr 120px 100px 80px 80px",
                background: "#11151E",
                borderBottom: i < budgets.length - 1 ? "1px solid #1A2030" : "none",
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span>{cat.icon}</span>
                <span className="text-sm" style={{ color: "#F5F7FA" }}>{cat.name}</span>
              </div>
              <span className="text-xs" style={{ color: "#A5ADBD" }}>
                ${b.spent.value} / ${b.limit.value}
              </span>
              <span className="text-xs" style={{ color: over ? "#EF4444" : "#10B981" }}>
                {over ? `-$${Math.abs(remaining)}` : `$${remaining} left`}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: "#242B38" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min(pct, 100)}%`, background: barColor }}
                  />
                </div>
                <span className="text-xs w-7 text-right" style={{ color: "#697386" }}>{pct}%</span>
              </div>
              <span
                className="text-xs"
                style={{ color: deltaPct > 0 ? "#F59E0B" : deltaPct < 0 ? "#10B981" : "#697386" }}
              >
                {deltaPct === 0 ? "—" : deltaPct > 0 ? `+${deltaPct}pp` : `${deltaPct}pp`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Add budget */}
      <button
        onClick={() => setShowAdd(!showAdd)}
        className="flex items-center gap-2 text-xs font-medium rounded-lg px-4 py-2 transition-colors"
        style={{ background: "#7C6CF21A", border: "1px solid #7C6CF230", color: "#7C6CF2" }}
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        New Budget
      </button>

      {showAdd && (
        <div className="mt-3 rounded-xl px-5 py-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <p className="text-xs" style={{ color: "#697386" }}>
            Budget creation will be available when connected to the Wallet API. For now, budgets are loaded from mock fixtures.
          </p>
        </div>
      )}
    </div>
  );
}
