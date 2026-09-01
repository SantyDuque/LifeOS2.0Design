import { useState } from "react";
import { accounts, transactions, getCategoryById, getAccountById } from "../../data/financeData";

const typeIcon: Record<string, string> = {
  checking: "🏦", savings: "🏦", credit: "💳", cash: "💵", investment: "📈",
};

const typeLabel: Record<string, string> = {
  checking: "Checking", savings: "Savings", credit: "Credit", cash: "Cash", investment: "Investment",
};

export default function FinanceAccounts() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const totalBalance = accounts.reduce((s, a) => s + a.balance.value, 0);
  const totalPositive = accounts.filter((a) => a.balance.value >= 0).reduce((s, a) => s + a.balance.value, 0);

  const accountTxns = selectedAccount
    ? transactions.filter((t) => t.accountId === selectedAccount)
    : [];

  return (
    <div>
      {/* Total */}
      <div className="rounded-xl px-5 py-4 mb-4 flex items-center justify-between" style={{ background: "#11151E", border: "1px solid #242B38" }}>
        <div>
          <div className="text-xs mb-0.5" style={{ color: "#697386" }}>Net worth (liquid)</div>
          <div className="text-2xl font-semibold" style={{ color: totalBalance >= 0 ? "#F5F7FA" : "#EF4444" }}>
            ${totalBalance.toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs mb-0.5" style={{ color: "#697386" }}>Positive accounts</div>
          <div className="text-lg font-semibold" style={{ color: "#10B981" }}>${totalPositive.toLocaleString()}</div>
        </div>
      </div>

      {/* Account cards */}
      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {accounts.map((acc) => {
          const accTxns = transactions.filter((t) => t.accountId === acc.id);
          const isSelected = selectedAccount === acc.id;
          return (
            <button
              key={acc.id}
              className="rounded-xl px-5 py-4 text-left transition-all"
              style={{
                background: "#11151E",
                border: `1px solid ${isSelected ? "#7C6CF2" : "#242B38"}`,
              }}
              onClick={() => setSelectedAccount(isSelected ? null : acc.id)}
              onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = "#7C6CF240"; }}
              onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = "#242B38"; }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{typeIcon[acc.type]}</span>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>{acc.name}</div>
                    <div className="text-xs" style={{ color: "#697386" }}>
                      {typeLabel[acc.type]} · {acc.balance.currencyCode}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-xl font-semibold"
                    style={{ color: acc.balance.value < 0 ? "#EF4444" : "#F5F7FA" }}
                  >
                    {acc.balance.value < 0 ? "-" : ""}${Math.abs(acc.balance.value).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#697386" }}>
                <span>{accTxns.length} transactions</span>
                <span>·</span>
                <span>
                  Last: {accTxns[0]
                    ? new Date(accTxns[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "none"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Transactions for selected account */}
      {selectedAccount && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#697386" }}>
            Recent — {getAccountById(selectedAccount).name}
          </h3>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
            {accountTxns.length === 0 ? (
              <div className="py-10 text-center" style={{ background: "#11151E", color: "#697386" }}>
                No transactions for this account
              </div>
            ) : (
              accountTxns.slice(0, 8).map((tx, i) => {
                const cat = getCategoryById(tx.categoryId);
                const isIncome = tx.recordType === "income";
                return (
                  <div
                    key={tx.id}
                    className="flex items-center gap-4 px-5 py-3"
                    style={{
                      background: "#11151E",
                      borderBottom: i < Math.min(accountTxns.length, 8) - 1 ? "1px solid #1A2030" : "none",
                    }}
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate" style={{ color: "#F5F7FA" }}>{tx.counterparty}</div>
                      <div className="text-xs" style={{ color: "#697386" }}>
                        {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {cat.name}
                      </div>
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: isIncome ? "#10B981" : "#F5F7FA" }}
                    >
                      {isIncome ? "+" : "-"}${Math.abs(tx.amount.value).toFixed(2)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
