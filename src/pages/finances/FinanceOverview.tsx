import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  accounts, budgets, savingsGoals, standingOrders, monthlyCashFlow,
  transactions, categories,
  fmt, fmtSigned, getCategoryById, getAccountById,
  getTotalBalance, getMonthlyIncome, getMonthlyExpenses, getSpendingByCategory,
  lastSyncedAt, syncStatus,
} from "../../data/financeData";

const chartTooltipStyle = {
  contentStyle: { background: "#161B26", border: "1px solid #242B38", borderRadius: 8, fontSize: 12, color: "#F5F7FA" },
  itemStyle: { color: "#A5ADBD" },
  labelStyle: { color: "#F5F7FA", marginBottom: 4, fontWeight: 500 },
};

const INCOME_COLOR = "#10B981";
const EXPENSE_COLOR = "#F59E0B";

function accountIcon(type: string) {
  if (type === "checking") return "🏦";
  if (type === "savings") return "🏦";
  if (type === "credit") return "💳";
  if (type === "cash") return "💵";
  return "🏦";
}

function BudgetBar({ label, spent, limit, prevSpent }: { label: string; spent: number; limit: number; prevSpent: number }) {
  const pct = Math.round((spent / limit) * 100);
  const over = spent > limit;
  const near = pct >= 80 && !over;
  const color = over ? "#EF4444" : near ? "#F59E0B" : "#10B981";

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs" style={{ color: "#A5ADBD" }}>{label}</span>
        <span className="text-xs" style={{ color: over ? "#EF4444" : "#697386" }}>
          ${spent.toFixed(0)} / ${limit.toFixed(0)}
          {over && " · Over budget"}
        </span>
      </div>
      <div className="rounded-full overflow-hidden" style={{ height: 5, background: "#242B38" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(pct, 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}

interface FinanceOverviewProps {
  onTabChange: (t: string) => void;
  onCategoryFilter: (catId: string) => void;
}

export default function FinanceOverview({ onTabChange, onCategoryFilter }: FinanceOverviewProps) {
  const thisMonthTxns = transactions.filter((t) => t.date.startsWith("2026-08"));
  const income = getMonthlyIncome(thisMonthTxns);
  const expenses = getMonthlyExpenses(thisMonthTxns);
  const net = income - expenses;
  const totalBalance = getTotalBalance();
  const spending = getSpendingByCategory(thisMonthTxns);

  // Snapshot derived values
  const largestExpense = thisMonthTxns
    .filter((t) => t.recordType === "expense")
    .sort((a, b) => Math.abs(a.amount.value) - Math.abs(b.amount.value))
    .at(-1);
  const topCat = spending[0];
  const bestBudget = budgets
    .map((b) => ({ b, pct: b.spent.value / b.limit.value }))
    .sort((a, x) => a.pct - x.pct)[0];
  const nextPayment = standingOrders.sort((a, b) => a.nextDate.localeCompare(b.nextDate))[0];

  const totalMonthlyRecurring = standingOrders.reduce((s, o) => s + o.amount.value, 0);
  const recurringPctOfIncome = Math.round((totalMonthlyRecurring / income) * 100);

  const diningBudget = budgets.find((b) => b.categoryId === "cat-dining");
  const diningPct = diningBudget ? Math.round(((diningBudget.spent.value - diningBudget.prevMonthSpent.value) / diningBudget.prevMonthSpent.value) * 100) : 0;

  const totalBudgeted = budgets.reduce((s, b) => s + b.limit.value, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent.value, 0);
  const budgetPct = Math.round((totalSpent / totalBudgeted) * 100);

  return (
    <div className="space-y-4">
      {/* Sync status */}
      <div className="flex items-center justify-end gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: syncStatus === "synced" ? "#10B981" : syncStatus === "unavailable" ? "#EF4444" : "#F59E0B" }}
        />
        <span className="text-xs" style={{ color: "#697386" }}>
          {syncStatus === "synced" ? `Updated ${lastSyncedAt}` : syncStatus === "syncing" ? "Syncing…" : "Sync unavailable"}
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl px-5 py-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <div className="text-xs mb-1" style={{ color: "#697386" }}>Total balance</div>
          <div className="text-2xl font-semibold" style={{ color: "#F5F7FA" }}>${totalBalance.toLocaleString()}</div>
          <div className="text-xs mt-0.5" style={{ color: "#697386" }}>Across {accounts.length} accounts</div>
        </div>
        <div className="rounded-xl px-5 py-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <div className="text-xs mb-1" style={{ color: "#697386" }}>Income</div>
          <div className="text-2xl font-semibold" style={{ color: "#10B981" }}>${income.toLocaleString()}</div>
          <div className="text-xs mt-0.5" style={{ color: "#697386" }}>This month</div>
        </div>
        <div className="rounded-xl px-5 py-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <div className="text-xs mb-1" style={{ color: "#697386" }}>Expenses</div>
          <div className="text-2xl font-semibold" style={{ color: "#F5F7FA" }}>${expenses.toLocaleString()}</div>
          <div className="text-xs mt-0.5" style={{ color: "#697386" }}>This month</div>
        </div>
        <div className="rounded-xl px-5 py-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <div className="text-xs mb-1" style={{ color: "#697386" }}>Net cash flow</div>
          <div className="text-2xl font-semibold" style={{ color: net >= 0 ? "#10B981" : "#EF4444" }}>
            {net >= 0 ? "+" : ""}${net.toLocaleString()}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "#697386" }}>Income − expenses</div>
        </div>
      </div>

      {/* Cash flow + Spending side by side */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Cash flow chart */}
        <div className="rounded-xl px-5 pt-5 pb-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <div className="text-sm font-medium mb-0.5" style={{ color: "#F5F7FA" }}>Cash flow</div>
          <div className="text-xs mb-4" style={{ color: "#697386" }}>Income and expenses over time</div>
          <div className="flex items-center gap-4 text-xs mb-3" style={{ color: "#697386" }}>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: INCOME_COLOR }} />
              Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: EXPENSE_COLOR }} />
              Expenses
            </span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthlyCashFlow} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={3}>
              <CartesianGrid stroke="#242B38" strokeWidth={0.5} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#697386", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#697386", fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                {...chartTooltipStyle}
                content={({ active, payload, label }) => {
                  if (!active || !payload) return null;
                  const inc = payload.find((p) => p.dataKey === "income")?.value as number ?? 0;
                  const exp = payload.find((p) => p.dataKey === "expenses")?.value as number ?? 0;
                  return (
                    <div className="rounded-lg px-4 py-3" style={{ background: "#161B26", border: "1px solid #242B38" }}>
                      <div className="text-xs font-medium mb-2" style={{ color: "#F5F7FA" }}>{label} 2026</div>
                      <div className="text-xs mb-1" style={{ color: INCOME_COLOR }}>Income  ${inc.toLocaleString()}</div>
                      <div className="text-xs mb-1" style={{ color: EXPENSE_COLOR }}>Expenses  ${exp.toLocaleString()}</div>
                      <div className="text-xs pt-1" style={{ color: "#A5ADBD", borderTop: "1px solid #242B38" }}>
                        Net  {inc - exp >= 0 ? "+" : ""}${(inc - exp).toLocaleString()}
                      </div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="income" fill={INCOME_COLOR} radius={[3, 3, 0, 0]} maxBarSize={22} />
              <Bar dataKey="expenses" fill={EXPENSE_COLOR} radius={[3, 3, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by category */}
        <div className="rounded-xl px-5 pt-5 pb-4" style={{ background: "#11151E", border: "1px solid #242B38" }}>
          <div className="text-sm font-medium mb-0.5" style={{ color: "#F5F7FA" }}>Spending by category</div>
          <div className="text-xs mb-4" style={{ color: "#697386" }}>This month — click to filter transactions</div>
          <div className="space-y-3">
            {spending.slice(0, 6).map(({ category, total }) => {
              const pct = Math.round((total / expenses) * 100);
              return (
                <button
                  key={category.id}
                  className="flex items-center gap-3 w-full text-left transition-opacity"
                  onClick={() => { onCategoryFilter(category.id); onTabChange("Transactions"); }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <span className="text-sm w-5 text-center flex-shrink-0">{category.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: "#A5ADBD" }}>{category.name}</span>
                      <span className="text-xs" style={{ color: "#697386" }}>{pct}%</span>
                    </div>
                    <div className="rounded-full overflow-hidden" style={{ height: 4, background: "#242B38" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: category.color }} />
                    </div>
                  </div>
                  <span className="text-xs flex-shrink-0 w-14 text-right" style={{ color: "#F5F7FA" }}>
                    ${total.toFixed(0)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Snapshot cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Largest expense",
            value: largestExpense ? getCategoryById(largestExpense.categoryId).name : "—",
            sub: largestExpense ? `$${Math.abs(largestExpense.amount.value).toFixed(0)}` : "",
          },
          {
            label: "Top category",
            value: topCat ? topCat.category.name : "—",
            sub: topCat ? `${Math.round((topCat.total / expenses) * 100)}% of spending` : "",
          },
          {
            label: "Best budget",
            value: bestBudget ? getCategoryById(bestBudget.b.categoryId).name : "—",
            sub: bestBudget ? `${Math.round((1 - bestBudget.pct) * 100)}% under budget` : "",
          },
          {
            label: "Next payment",
            value: nextPayment ? nextPayment.counterparty : "—",
            sub: nextPayment
              ? `${new Date(nextPayment.nextDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · $${nextPayment.amount.value}`
              : "",
          },
        ].map((card) => (
          <div key={card.label} className="rounded-xl px-4 py-3" style={{ background: "#11151E", border: "1px solid #242B38" }}>
            <div className="text-xs mb-1" style={{ color: "#697386" }}>{card.label}</div>
            <div className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>{card.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "#697386" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Accounts + Budgets side by side */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Accounts */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
          <div className="flex items-center justify-between px-5 py-3" style={{ background: "#0D1017", borderBottom: "1px solid #242B38" }}>
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Accounts</span>
            <button
              className="text-xs transition-colors"
              style={{ color: "#7C6CF2" }}
              onClick={() => onTabChange("Accounts")}
            >
              View all →
            </button>
          </div>
          {accounts.map((acc, i) => (
            <div
              key={acc.id}
              className="flex items-center gap-3 px-5 py-3"
              style={{ background: "#11151E", borderBottom: i < accounts.length - 1 ? "1px solid #1A2030" : "none" }}
            >
              <span className="text-base">{accountIcon(acc.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: "#F5F7FA" }}>{acc.name}</div>
                <div className="text-xs capitalize" style={{ color: "#697386" }}>{acc.type} · {acc.balance.currencyCode}</div>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: acc.balance.value < 0 ? "#EF4444" : "#F5F7FA" }}
              >
                {acc.balance.value < 0 ? `-$${Math.abs(acc.balance.value).toLocaleString()}` : `$${acc.balance.value.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>

        {/* Budgets */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
          <div className="flex items-center justify-between px-5 py-3" style={{ background: "#0D1017", borderBottom: "1px solid #242B38" }}>
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Budgets</span>
            <button
              className="text-xs transition-colors"
              style={{ color: "#7C6CF2" }}
              onClick={() => onTabChange("Budgets")}
            >
              View all →
            </button>
          </div>
          <div className="px-5 py-4 space-y-4" style={{ background: "#11151E" }}>
            {budgets.slice(0, 4).map((b) => {
              const cat = getCategoryById(b.categoryId);
              return (
                <BudgetBar
                  key={b.id}
                  label={cat.name}
                  spent={b.spent.value}
                  limit={b.limit.value}
                  prevSpent={b.prevMonthSpent.value}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming + Savings side by side */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Upcoming */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
          <div className="flex items-center justify-between px-5 py-3" style={{ background: "#0D1017", borderBottom: "1px solid #242B38" }}>
            <div>
              <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Upcoming</span>
              <span className="text-xs ml-2" style={{ color: "#697386" }}>Recurring commitments</span>
            </div>
            <button className="text-xs" style={{ color: "#7C6CF2" }} onClick={() => onTabChange("Recurring")}>
              View all →
            </button>
          </div>
          {standingOrders.slice(0, 5).map((so, i) => (
            <div
              key={so.id}
              className="flex items-center gap-4 px-5 py-3"
              style={{ background: "#11151E", borderBottom: i < 4 ? "1px solid #1A2030" : "none" }}
            >
              <div
                className="text-xs font-medium w-10 flex-shrink-0 text-center py-1 rounded"
                style={{ background: "#161B26", color: "#A5ADBD" }}
              >
                {new Date(so.nextDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: "#F5F7FA" }}>{so.counterparty}</div>
                <div className="text-xs" style={{ color: "#697386" }}>{getCategoryById(so.categoryId).name}</div>
              </div>
              <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>
                ${so.amount.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Savings goals */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
          <div className="px-5 py-3" style={{ background: "#0D1017", borderBottom: "1px solid #242B38" }}>
            <span className="text-sm font-medium" style={{ color: "#F5F7FA" }}>Savings goals</span>
            <span className="text-xs ml-2" style={{ color: "#697386" }}>Via Wallet</span>
          </div>
          <div className="px-5 py-4 space-y-5" style={{ background: "#11151E" }}>
            {savingsGoals.map((g) => {
              const pct = Math.round((g.current.value / g.target.value) * 100);
              return (
                <div key={g.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm" style={{ color: "#F5F7FA" }}>{g.name}</span>
                    <span className="text-xs" style={{ color: "#697386" }}>{pct}%</span>
                  </div>
                  <div className="rounded-full overflow-hidden mb-1" style={{ height: 5, background: "#242B38" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#7C6CF2" }} />
                  </div>
                  <div className="flex items-center justify-between text-xs" style={{ color: "#697386" }}>
                    <span>${g.current.value.toLocaleString()}</span>
                    <span>${g.target.value.toLocaleString()} goal</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Financial insights */}
      <div className="rounded-xl px-5 py-4" style={{ background: "#7C6CF20D", border: "1px solid #7C6CF230" }}>
        <div className="text-xs font-semibold mb-3" style={{ color: "#7C6CF2" }}>Financial Insights</div>
        <div className="space-y-2">
          {[
            diningPct > 0 ? `Dining spending is ${diningPct}% higher than last month.` : null,
            `You have used ${budgetPct}% of your monthly budgets with 11 days remaining.`,
            `Recurring commitments represent ${recurringPctOfIncome}% of this month's income ($${totalMonthlyRecurring.toFixed(0)} / mo).`,
          ].filter(Boolean).map((insight, i) => (
            <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "#A5ADBD", lineHeight: 1.6 }}>
              <span className="flex-shrink-0 mt-0.5" style={{ color: "#7C6CF2" }}>·</span>
              {insight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
