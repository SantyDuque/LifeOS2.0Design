import { useState } from "react";
import FinanceOverview from "./finances/FinanceOverview";
import FinanceTransactions from "./finances/FinanceTransactions";
import FinanceAccounts from "./finances/FinanceAccounts";
import FinanceBudgets from "./finances/FinanceBudgets";
import FinanceRecurring from "./finances/FinanceRecurring";

const TABS = ["Overview", "Transactions", "Accounts", "Budgets", "Recurring"] as const;
type Tab = typeof TABS[number];

const PERIODS = ["This month", "Last month", "3 months", "6 months", "1 year"] as const;
type Period = typeof PERIODS[number];

export default function Finances() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [period, setPeriod] = useState<Period>("This month");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const handleCategoryFilter = (catId: string) => {
    setCategoryFilter(catId);
  };

  const handleTabChange = (t: string) => {
    setTab(t as Tab);
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#090B10" }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-0.5" style={{ color: "#F5F7FA" }}>Finances</h2>
            <p className="text-sm" style={{ color: "#697386" }}>Know where your money is going</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Period selector */}
            <div
              className="flex rounded-lg overflow-hidden"
              style={{ background: "#11151E", border: "1px solid #242B38" }}
            >
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className="text-xs font-medium px-3 py-1.5 transition-colors whitespace-nowrap"
                  style={{
                    background: period === p ? "#7C6CF2" : "transparent",
                    color: period === p ? "white" : "#697386",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Add transaction */}
            <button
              onClick={() => setTab("Transactions")}
              className="flex items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors"
              style={{ height: 36, background: "#7C6CF2", color: "white" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#9183F4")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#7C6CF2")}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Transaction
            </button>
          </div>
        </div>

        {/* Internal tabs */}
        <div
          className="flex rounded-lg overflow-hidden w-fit mb-6"
          style={{ background: "#11151E", border: "1px solid #242B38" }}
        >
          {TABS.map((t) => (
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

        {/* Tab content */}
        {tab === "Overview" && (
          <FinanceOverview
            onTabChange={handleTabChange}
            onCategoryFilter={handleCategoryFilter}
          />
        )}
        {tab === "Transactions" && (
          <FinanceTransactions initialCategoryFilter={categoryFilter} />
        )}
        {tab === "Accounts" && <FinanceAccounts />}
        {tab === "Budgets" && <FinanceBudgets />}
        {tab === "Recurring" && <FinanceRecurring />}
      </div>
    </div>
  );
}
