import { useState, useEffect } from "react";
import {
  transactions as allTxns, categories, accounts,
  getCategoryById, getAccountById,
  type FinancialRecord, type RecordType, type PaymentType,
} from "../../data/financeData";

const paymentTypeLabel: Record<PaymentType, string> = {
  card: "Card",
  bank_transfer: "Bank transfer",
  cash: "Cash",
  direct_debit: "Direct debit",
};

const recordTypeLabel: Record<RecordType, string> = {
  expense: "Expense",
  income: "Income",
  transfer: "Transfer",
};

interface Props {
  initialCategoryFilter?: string;
}

function Drawer({ tx, onClose }: { tx: FinancialRecord; onClose: () => void }) {
  const cat = getCategoryById(tx.categoryId);
  const acc = getAccountById(tx.accountId);
  const isIncome = tx.recordType === "income";

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(9,11,16,0.5)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full flex flex-col"
        style={{ width: 340, background: "#0D1017", borderLeft: "1px solid #242B38" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #242B38" }}>
          <span className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>Transaction</span>
          <button
            onClick={onClose}
            className="rounded-md p-1 transition-colors"
            style={{ color: "#697386" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A5ADBD")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#697386")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Amount */}
          <div className="px-5 py-6 text-center" style={{ borderBottom: "1px solid #242B38" }}>
            <div
              className="text-3xl font-semibold mb-1"
              style={{ color: isIncome ? "#10B981" : tx.recordType === "transfer" ? "#A5ADBD" : "#F5F7FA" }}
            >
              {isIncome ? "+" : tx.recordType === "transfer" ? "" : "-"}
              ${Math.abs(tx.amount.value).toFixed(2)} {tx.amount.currencyCode}
            </div>
            <div className="text-sm" style={{ color: "#697386" }}>{tx.counterparty}</div>
          </div>

          {/* Details */}
          <div className="px-5 py-4 space-y-3">
            {[
              { label: "Date", value: new Date(tx.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) },
              { label: "Type", value: recordTypeLabel[tx.recordType] },
              { label: "Payment", value: paymentTypeLabel[tx.paymentType] },
              { label: "Account", value: acc.name },
              { label: "Category", value: `${cat.icon} ${cat.name}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4">
                <span className="text-xs flex-shrink-0" style={{ color: "#697386" }}>{label}</span>
                <span className="text-xs text-right" style={{ color: "#A5ADBD" }}>{value}</span>
              </div>
            ))}

            {tx.labels.length > 0 && (
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs flex-shrink-0" style={{ color: "#697386" }}>Labels</span>
                <div className="flex gap-1 flex-wrap justify-end">
                  {tx.labels.map((l) => (
                    <span key={l} className="text-xs px-2 py-0.5 rounded" style={{ background: "#161B26", color: "#A5ADBD" }}>{l}</span>
                  ))}
                </div>
              </div>
            )}

            {tx.note && (
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs flex-shrink-0" style={{ color: "#697386" }}>Note</span>
                <span className="text-xs text-right" style={{ color: "#A5ADBD" }}>{tx.note}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-5 py-4" style={{ borderTop: "1px solid #242B38" }}>
          <button
            className="flex-1 text-sm py-2 rounded-lg transition-colors"
            style={{ background: "#11151E", border: "1px solid #242B38", color: "#A5ADBD" }}
          >
            Edit
          </button>
          <button
            className="flex-1 text-sm py-2 rounded-lg transition-colors"
            style={{ background: "#EF44440D", border: "1px solid #EF444420", color: "#EF4444" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function AddTransactionModal({ onClose, onAdd }: { onClose: () => void; onAdd: (t: FinancialRecord) => void }) {
  const [type, setType] = useState<RecordType>("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2026-08-31");
  const [counterparty, setCounterparty] = useState("");
  const [categoryId, setCategoryId] = useState("cat-groceries");
  const [accountId, setAccountId] = useState("acc-1");
  const [paymentType, setPaymentType] = useState<PaymentType>("card");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = () => {
    if (!amount || !counterparty) return;
    const val = parseFloat(amount);
    onAdd({
      id: `tx-new-${Date.now()}`,
      date,
      counterparty,
      amount: { value: type === "expense" ? -val : val, currencyCode: "USD" },
      recordType: type,
      paymentType,
      categoryId,
      accountId,
      labels: [],
      note: note || undefined,
    });
    setSaved(true);
    setTimeout(onClose, 1000);
  };

  const inputStyle = {
    height: 36, background: "#161B26", border: "1px solid #242B38",
    color: "#F5F7FA", borderRadius: 8, paddingLeft: 12, paddingRight: 12,
    fontSize: 13, outline: "none", width: "100%",
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(9,11,16,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl overflow-hidden w-full max-w-md"
        style={{ background: "#161B26", border: "1px solid #242B38", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #242B38" }}>
          <span className="text-sm font-semibold" style={{ color: "#F5F7FA" }}>Add Transaction</span>
          <button onClick={onClose} className="rounded-md p-1" style={{ color: "#697386" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-3">
          {/* Type */}
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ background: "#11151E", border: "1px solid #242B38" }}
          >
            {(["expense","income","transfer"] as RecordType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className="flex-1 text-xs py-2 font-medium capitalize transition-colors"
                style={{
                  background: type === t ? "#7C6CF2" : "transparent",
                  color: type === t ? "white" : "#697386",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Amount */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="text-xs mb-1 block" style={{ color: "#697386" }}>Amount</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                type="number"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#242B38")}
              />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "#697386" }}>Currency</label>
              <select style={{ ...inputStyle }}>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>COP</option>
              </select>
            </div>
          </div>

          {/* Counterparty + Date */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs mb-1 block" style={{ color: "#697386" }}>Counterparty</label>
              <input
                value={counterparty}
                onChange={(e) => setCounterparty(e.target.value)}
                placeholder="e.g. Carulla"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#242B38")}
              />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "#697386" }}>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ ...inputStyle, colorScheme: "dark" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#242B38")}
              />
            </div>
          </div>

          {/* Category + Account */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs mb-1 block" style={{ color: "#697386" }}>Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={inputStyle}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "#697386" }}>Account</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                style={inputStyle}
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment type */}
          <div>
            <label className="text-xs mb-1 block" style={{ color: "#697386" }}>Payment type</label>
            <div
              className="flex rounded-lg overflow-hidden"
              style={{ background: "#11151E", border: "1px solid #242B38" }}
            >
              {(["card","bank_transfer","cash","direct_debit"] as PaymentType[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPaymentType(p)}
                  className="flex-1 text-xs py-1.5 transition-colors"
                  style={{
                    background: paymentType === p ? "#7C6CF2" : "transparent",
                    color: paymentType === p ? "white" : "#697386",
                  }}
                >
                  {paymentTypeLabel[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-xs mb-1 block" style={{ color: "#697386" }}>Note (optional)</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note…"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#7C6CF2")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#242B38")}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 py-4" style={{ borderTop: "1px solid #242B38" }}>
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-lg" style={{ color: "#697386" }}>Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={!amount || !counterparty || saved}
            className="text-sm font-medium px-5 py-2 rounded-lg transition-all"
            style={{
              background: saved ? "#10B981" : amount && counterparty ? "#7C6CF2" : "#7C6CF240",
              color: "white",
              cursor: amount && counterparty ? "pointer" : "not-allowed",
            }}
          >
            {saved ? "✓ Added" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FinanceTransactions({ initialCategoryFilter }: Props) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState(initialCategoryFilter ?? "");
  const [accountFilter, setAccountFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<"" | RecordType>("");
  const [selectedTx, setSelectedTx] = useState<FinancialRecord | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [extraTxns, setExtraTxns] = useState<FinancialRecord[]>([]);

  useEffect(() => { if (initialCategoryFilter) setCatFilter(initialCategoryFilter); }, [initialCategoryFilter]);

  const allWithExtra = [...extraTxns, ...allTxns];
  const filtered = allWithExtra.filter((t) => {
    const matchSearch = !search || t.counterparty.toLowerCase().includes(search.toLowerCase());
    const matchCat = !catFilter || t.categoryId === catFilter;
    const matchAcc = !accountFilter || t.accountId === accountFilter;
    const matchType = !typeFilter || t.recordType === typeFilter;
    return matchSearch && matchCat && matchAcc && matchType;
  });

  const handleAdd = (tx: FinancialRecord) => setExtraTxns((prev) => [tx, ...prev]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-lg px-3 flex-1 min-w-48"
          style={{ height: 34, background: "#11151E", border: "1px solid #242B38" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "#697386" }}>
            <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search counterparty…"
            className="flex-1 bg-transparent outline-none text-xs"
            style={{ color: "#F5F7FA" }}
          />
        </div>

        {/* Type filter */}
        <div
          className="flex rounded-lg overflow-hidden"
          style={{ background: "#11151E", border: "1px solid #242B38" }}
        >
          {(["", "expense", "income", "transfer"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className="text-xs px-3 py-1.5 font-medium capitalize transition-colors"
              style={{
                background: typeFilter === t ? "#7C6CF2" : "transparent",
                color: typeFilter === t ? "white" : "#697386",
              }}
            >
              {t === "" ? "All" : t}
            </button>
          ))}
        </div>

        {/* Category */}
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="text-xs rounded-lg px-3 outline-none transition-colors"
          style={{ height: 34, background: "#11151E", border: "1px solid #242B38", color: catFilter ? "#F5F7FA" : "#697386" }}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
          ))}
        </select>

        {/* Account */}
        <select
          value={accountFilter}
          onChange={(e) => setAccountFilter(e.target.value)}
          className="text-xs rounded-lg px-3 outline-none"
          style={{ height: 34, background: "#11151E", border: "1px solid #242B38", color: accountFilter ? "#F5F7FA" : "#697386" }}
        >
          <option value="">All accounts</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        {(catFilter || accountFilter || typeFilter || search) && (
          <button
            onClick={() => { setSearch(""); setCatFilter(""); setAccountFilter(""); setTypeFilter(""); }}
            className="text-xs px-2 py-1.5 rounded-lg transition-colors"
            style={{ color: "#697386" }}
          >
            Clear filters
          </button>
        )}

        <button
          onClick={() => setShowAdd(true)}
          className="ml-auto flex items-center gap-2 text-xs font-medium rounded-lg px-3 transition-colors"
          style={{ height: 34, background: "#7C6CF2", color: "white" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#9183F4")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#7C6CF2")}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Add
        </button>
      </div>

      {/* Count */}
      <div className="text-xs mb-3" style={{ color: "#697386" }}>
        {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
        {catFilter && ` · ${getCategoryById(catFilter).name}`}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #242B38" }}>
        {/* Header */}
        <div
          className="grid text-xs font-medium px-4 py-2.5 hidden md:grid"
          style={{
            background: "#0D1017",
            color: "#697386",
            gridTemplateColumns: "80px 1fr 100px 80px 110px 90px",
            borderBottom: "1px solid #242B38",
          }}
        >
          <span>Date</span>
          <span>Counterparty</span>
          <span>Category</span>
          <span>Account</span>
          <span>Payment</span>
          <span className="text-right">Amount</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center" style={{ background: "#11151E" }}>
            <div className="text-2xl mb-2">🔍</div>
            <div className="text-sm" style={{ color: "#697386" }}>No transactions match your filters</div>
          </div>
        ) : (
          filtered.map((tx, i) => {
            const cat = getCategoryById(tx.categoryId);
            const acc = getAccountById(tx.accountId);
            const isIncome = tx.recordType === "income";
            const isTransfer = tx.recordType === "transfer";
            const amtColor = isIncome ? "#10B981" : isTransfer ? "#A5ADBD" : "#F5F7FA";

            return (
              <div
                key={tx.id}
                className="grid items-center px-4 py-3 cursor-pointer transition-colors"
                style={{
                  gridTemplateColumns: "80px 1fr 100px 80px 110px 90px",
                  background: "#11151E",
                  borderBottom: i < filtered.length - 1 ? "1px solid #1A2030" : "none",
                }}
                onClick={() => setSelectedTx(tx)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#161B26")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#11151E")}
              >
                <span className="text-xs" style={{ color: "#697386" }}>
                  {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <span className="text-sm truncate pr-4" style={{ color: "#F5F7FA" }}>{tx.counterparty}</span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#A5ADBD" }}>
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </span>
                <span className="text-xs truncate" style={{ color: "#697386" }}>{acc.name}</span>
                <span className="text-xs" style={{ color: "#697386" }}>{paymentTypeLabel[tx.paymentType]}</span>
                <span className="text-sm font-medium text-right" style={{ color: amtColor }}>
                  {isIncome ? "+" : isTransfer ? "" : "-"}${Math.abs(tx.amount.value).toFixed(2)}
                </span>
              </div>
            );
          })
        )}
      </div>

      {selectedTx && <Drawer tx={selectedTx} onClose={() => setSelectedTx(null)} />}
      {showAdd && <AddTransactionModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </div>
  );
}
