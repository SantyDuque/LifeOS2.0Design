import { standingOrders, getCategoryById, getAccountById } from "../../data/financeData";

const freqLabel: Record<string, string> = {
  monthly: "Monthly",
  weekly: "Weekly",
  quarterly: "Quarterly",
  annual: "Annual",
};

export default function FinanceRecurring() {
  const totalMonthly = standingOrders
    .filter((o) => o.frequency === "monthly")
    .reduce((s, o) => s + o.amount.value, 0);

  const upcoming = [...standingOrders].sort((a, b) => a.nextDate.localeCompare(b.nextDate));
  const monthly = standingOrders.filter((o) => o.frequency === "monthly");
  const other = standingOrders.filter((o) => o.frequency !== "monthly");

  return (
    <div>
      {/* Summary */}
      <div className="rounded-xl px-5 py-4 mb-5 flex items-center justify-between" style={{ background: "#11151E", border: "1px solid #242B38" }}>
        <div>
          <div className="text-xs mb-0.5" style={{ color: "#697386" }}>Monthly commitment</div>
          <div className="text-2xl font-semibold" style={{ color: "#F5F7FA" }}>
            ${totalMonthly.toFixed(0)} / mo
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs mb-0.5" style={{ color: "#697386" }}>Active orders</div>
          <div className="text-lg font-semibold" style={{ color: "#A5ADBD" }}>{standingOrders.length}</div>
        </div>
      </div>

      {/* Upcoming */}
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#697386" }}>Upcoming</h3>
      <div className="rounded-xl overflow-hidden mb-5" style={{ border: "1px solid #242B38" }}>
        {upcoming.map((so, i) => {
          const cat = getCategoryById(so.categoryId);
          const acc = getAccountById(so.accountId);
          const daysUntil = Math.ceil((new Date(so.nextDate).getTime() - new Date("2026-08-31").getTime()) / 86400000);
          return (
            <div
              key={so.id}
              className="flex items-center gap-4 px-5 py-3"
              style={{
                background: "#11151E",
                borderBottom: i < upcoming.length - 1 ? "1px solid #1A2030" : "none",
              }}
            >
              <div
                className="text-xs font-medium text-center rounded-lg flex-shrink-0 px-2 py-1"
                style={{
                  background: daysUntil <= 3 ? "#F59E0B1A" : "#161B26",
                  color: daysUntil <= 3 ? "#F59E0B" : "#A5ADBD",
                  minWidth: 60,
                }}
              >
                {new Date(so.nextDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium" style={{ color: "#F5F7FA" }}>{so.counterparty}</div>
                <div className="text-xs" style={{ color: "#697386" }}>
                  {cat.icon} {cat.name} · {acc.name} · {freqLabel[so.frequency]}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>
                  ${so.amount.value.toFixed(2)}
                </div>
                <div className="text-xs" style={{ color: "#697386" }}>
                  in {daysUntil}d
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly */}
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#697386" }}>
        Monthly — ${monthly.reduce((s, o) => s + o.amount.value, 0).toFixed(0)} total
      </h3>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
        {monthly.map((so, i) => {
          const cat = getCategoryById(so.categoryId);
          const pct = Math.round((so.amount.value / totalMonthly) * 100);
          return (
            <div
              key={so.id}
              className="flex items-center gap-4 px-5 py-3"
              style={{
                background: "#11151E",
                borderBottom: i < monthly.length - 1 ? "1px solid #1A2030" : "none",
              }}
            >
              <span className="text-base">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm" style={{ color: "#F5F7FA" }}>{so.counterparty}</span>
                  <span className="text-xs" style={{ color: "#697386" }}>{pct}% of total</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 3, background: "#242B38" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#7C6CF2" }} />
                </div>
              </div>
              <span className="text-sm font-semibold flex-shrink-0" style={{ color: "#F5F7FA" }}>
                ${so.amount.value.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      {other.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#697386" }}>Other schedules</h3>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
            {other.map((so, i) => (
              <div
                key={so.id}
                className="flex items-center gap-4 px-5 py-3"
                style={{ background: "#11151E", borderBottom: i < other.length - 1 ? "1px solid #1A2030" : "none" }}
              >
                <span className="text-sm" style={{ color: "#F5F7FA" }}>{so.counterparty}</span>
                <span className="text-xs ml-2" style={{ color: "#697386" }}>{freqLabel[so.frequency]}</span>
                <span className="ml-auto text-sm font-semibold" style={{ color: "#F5F7FA" }}>
                  ${so.amount.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
