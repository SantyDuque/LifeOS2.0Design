// ─── Domain Models ──────────────────────────────────────────────────────────

export interface Money {
  value: number;
  currencyCode: string;
}

export interface FinancialAccount {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "cash" | "investment";
  balance: Money;
  color: string;
}

export interface FinancialCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type RecordType = "expense" | "income" | "transfer";
export type PaymentType = "card" | "bank_transfer" | "cash" | "direct_debit";

export interface FinancialRecord {
  id: string;
  date: string; // ISO date
  counterparty: string;
  amount: Money;
  recordType: RecordType;
  paymentType: PaymentType;
  categoryId: string;
  accountId: string;
  labels: string[];
  note?: string;
}

export interface FinancialBudget {
  id: string;
  categoryId: string;
  limit: Money;
  spent: Money;
  prevMonthSpent: Money;
}

export interface FinancialGoal {
  id: string;
  name: string;
  current: Money;
  target: Money;
}

export interface StandingOrder {
  id: string;
  counterparty: string;
  amount: Money;
  frequency: "monthly" | "weekly" | "quarterly" | "annual";
  nextDate: string;
  categoryId: string;
  accountId: string;
}

export type SyncStatus = "synced" | "syncing" | "stale" | "unavailable";

// ─── Mock Fixtures ───────────────────────────────────────────────────────────

export const accounts: FinancialAccount[] = [
  { id: "acc-1", name: "Checking", type: "checking", balance: { value: 8420, currencyCode: "USD" }, color: "#7C6CF2" },
  { id: "acc-2", name: "Savings", type: "savings", balance: { value: 17300, currencyCode: "USD" }, color: "#10B981" },
  { id: "acc-3", name: "Visa Credit", type: "credit", balance: { value: -1260, currencyCode: "USD" }, color: "#F59E0B" },
  { id: "acc-4", name: "Cash", type: "cash", balance: { value: 2000, currencyCode: "USD" }, color: "#A5ADBD" },
];

export const categories: FinancialCategory[] = [
  { id: "cat-housing",       name: "Housing",       icon: "🏠", color: "#7C6CF2" },
  { id: "cat-groceries",     name: "Groceries",     icon: "🛒", color: "#10B981" },
  { id: "cat-transport",     name: "Transport",     icon: "🚗", color: "#3B82F6" },
  { id: "cat-dining",        name: "Dining",        icon: "🍽️", color: "#F59E0B" },
  { id: "cat-health",        name: "Health",        icon: "❤️", color: "#EF4444" },
  { id: "cat-subscriptions", name: "Subscriptions", icon: "📱", color: "#8B5CF6" },
  { id: "cat-entertainment", name: "Entertainment", icon: "🎬", color: "#EC4899" },
  { id: "cat-income",        name: "Income",        icon: "💰", color: "#10B981" },
  { id: "cat-transfer",      name: "Transfer",      icon: "↔️", color: "#697386" },
  { id: "cat-shopping",      name: "Shopping",      icon: "🛍️", color: "#F97316" },
];

const T = (
  id: string, date: string, counterparty: string, value: number,
  type: RecordType, payment: PaymentType, catId: string, accId: string,
  labels: string[] = [], note?: string
): FinancialRecord => ({
  id, date, counterparty,
  amount: { value, currencyCode: "USD" },
  recordType: type, paymentType: payment,
  categoryId: catId, accountId: accId, labels, note,
});

export const transactions: FinancialRecord[] = [
  T("tx-01","2026-08-31","Carulla Supermarket",-82.40,"expense","card","cat-groceries","acc-3"),
  T("tx-02","2026-08-30","Employer Payroll",3200,"income","bank_transfer","cat-income","acc-1"),
  T("tx-03","2026-08-29","Uber",-18.60,"expense","card","cat-transport","acc-3"),
  T("tx-04","2026-08-28","La Pepita Restaurant",-67.80,"expense","card","cat-dining","acc-3"),
  T("tx-05","2026-08-27","Landlord Rent",-1250,"expense","bank_transfer","cat-housing","acc-1",["Fixed"]),
  T("tx-06","2026-08-26","Netflix",-18,"expense","direct_debit","cat-subscriptions","acc-1"),
  T("tx-07","2026-08-25","Gym Membership",-45,"expense","direct_debit","cat-health","acc-1"),
  T("tx-08","2026-08-24","Éxito Grocery",-94.20,"expense","card","cat-groceries","acc-3"),
  T("tx-09","2026-08-22","Freelance Payment",3220,"income","bank_transfer","cat-income","acc-1"),
  T("tx-10","2026-08-22","Dr. Ramírez",-85,"expense","card","cat-health","acc-3"),
  T("tx-11","2026-08-21","Spotify",-10.99,"expense","direct_debit","cat-subscriptions","acc-1"),
  T("tx-12","2026-08-20","Shell Gas Station",-62,"expense","card","cat-transport","acc-3"),
  T("tx-13","2026-08-18","Cine Colombia",-28,"expense","card","cat-entertainment","acc-3"),
  T("tx-14","2026-08-17","Rappi Delivery",-38.50,"expense","card","cat-dining","acc-3"),
  T("tx-15","2026-08-16","Amazon",-134.99,"expense","card","cat-shopping","acc-3"),
  T("tx-16","2026-08-15","Transfer to Savings",-1000,"transfer","bank_transfer","cat-transfer","acc-1"),
  T("tx-17","2026-08-15","Transfer from Checking",1000,"transfer","bank_transfer","cat-transfer","acc-2"),
  T("tx-18","2026-08-14","Carulla Supermarket",-75.30,"expense","card","cat-groceries","acc-3"),
  T("tx-19","2026-08-12","Health Insurance",-180,"expense","direct_debit","cat-health","acc-1"),
  T("tx-20","2026-08-10","Taxis Libres",-24,"expense","cash","cat-transport","acc-4"),
  T("tx-21","2026-08-08","Andrés Carne de Res",-112,"expense","card","cat-dining","acc-3"),
  T("tx-22","2026-08-05","Adobe Creative Cloud",-54.99,"expense","direct_debit","cat-subscriptions","acc-1"),
  T("tx-23","2026-08-04","Carulla Supermarket",-68.10,"expense","card","cat-groceries","acc-3"),
  T("tx-24","2026-08-03","Rappi Delivery",-31.20,"expense","card","cat-dining","acc-3"),
  T("tx-25","2026-08-01","Gym Clothing",-89,"expense","card","cat-shopping","acc-3"),
];

export const budgets: FinancialBudget[] = [
  { id:"b-1", categoryId:"cat-groceries",     limit:{value:600,currencyCode:"USD"},  spent:{value:420,currencyCode:"USD"},  prevMonthSpent:{value:395,currencyCode:"USD"} },
  { id:"b-2", categoryId:"cat-dining",         limit:{value:350,currencyCode:"USD"},  spent:{value:280,currencyCode:"USD"},  prevMonthSpent:{value:230,currencyCode:"USD"} },
  { id:"b-3", categoryId:"cat-entertainment",  limit:{value:300,currencyCode:"USD"},  spent:{value:110,currencyCode:"USD"},  prevMonthSpent:{value:145,currencyCode:"USD"} },
  { id:"b-4", categoryId:"cat-transport",      limit:{value:450,currencyCode:"USD"},  spent:{value:390,currencyCode:"USD"},  prevMonthSpent:{value:328,currencyCode:"USD"} },
  { id:"b-5", categoryId:"cat-subscriptions",  limit:{value:200,currencyCode:"USD"},  spent:{value:170,currencyCode:"USD"},  prevMonthSpent:{value:150,currencyCode:"USD"} },
  { id:"b-6", categoryId:"cat-health",         limit:{value:400,currencyCode:"USD"},  spent:{value:310,currencyCode:"USD"},  prevMonthSpent:{value:265,currencyCode:"USD"} },
];

export const savingsGoals: FinancialGoal[] = [
  { id:"sg-1", name:"Emergency Fund",  current:{value:8400,currencyCode:"USD"},  target:{value:12000,currencyCode:"USD"} },
  { id:"sg-2", name:"Vacation",        current:{value:2300,currencyCode:"USD"},  target:{value:4000,currencyCode:"USD"} },
  { id:"sg-3", name:"New Laptop",      current:{value:950,currencyCode:"USD"},   target:{value:1600,currencyCode:"USD"} },
];

export const standingOrders: StandingOrder[] = [
  { id:"so-1", counterparty:"Rent",              amount:{value:1250,currencyCode:"USD"}, frequency:"monthly",  nextDate:"2026-09-03", categoryId:"cat-housing",       accountId:"acc-1" },
  { id:"so-2", counterparty:"Health Insurance",  amount:{value:180,currencyCode:"USD"},  frequency:"monthly",  nextDate:"2026-09-05", categoryId:"cat-health",        accountId:"acc-1" },
  { id:"so-3", counterparty:"Netflix",           amount:{value:18,currencyCode:"USD"},   frequency:"monthly",  nextDate:"2026-09-08", categoryId:"cat-subscriptions", accountId:"acc-1" },
  { id:"so-4", counterparty:"Gym",               amount:{value:45,currencyCode:"USD"},   frequency:"monthly",  nextDate:"2026-09-12", categoryId:"cat-health",        accountId:"acc-1" },
  { id:"so-5", counterparty:"Spotify",           amount:{value:10.99,currencyCode:"USD"},frequency:"monthly",  nextDate:"2026-09-21", categoryId:"cat-subscriptions", accountId:"acc-1" },
  { id:"so-6", counterparty:"Adobe CC",          amount:{value:54.99,currencyCode:"USD"},frequency:"monthly",  nextDate:"2026-09-22", categoryId:"cat-subscriptions", accountId:"acc-1" },
  { id:"so-7", counterparty:"Internet",          amount:{value:60,currencyCode:"USD"},   frequency:"monthly",  nextDate:"2026-09-15", categoryId:"cat-subscriptions", accountId:"acc-1" },
];

// ─── Monthly cash flow data ──────────────────────────────────────────────────

export const monthlyCashFlow = [
  { month: "Mar", income: 5840, expenses: 4210 },
  { month: "Apr", income: 6100, expenses: 4620 },
  { month: "May", income: 5980, expenses: 3890 },
  { month: "Jun", income: 6420, expenses: 4350 },
  { month: "Jul", income: 7100, expenses: 4980 },
  { month: "Aug", income: 6420, expenses: 4183 },
];

// ─── Selectors (pure functions over fixtures) ────────────────────────────────

export const fmt = (money: Money) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: money.currencyCode, maximumFractionDigits: 2 }).format(Math.abs(money.value));

export const fmtSigned = (money: Money) => {
  const abs = fmt(money);
  return money.value >= 0 ? `+${abs}` : `-${abs}`;
};

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id) ?? { id, name: "Uncategorized", icon: "❓", color: "#697386" };
}

export function getAccountById(id: string) {
  return accounts.find((a) => a.id === id) ?? accounts[0];
}

export function getTotalBalance() {
  return accounts.reduce((sum, a) => sum + a.balance.value, 0);
}

export function getMonthlyIncome(txns: FinancialRecord[]) {
  return txns.filter((t) => t.recordType === "income").reduce((s, t) => s + t.amount.value, 0);
}

export function getMonthlyExpenses(txns: FinancialRecord[]) {
  return txns.filter((t) => t.recordType === "expense").reduce((s, t) => s + Math.abs(t.amount.value), 0);
}

export function getSpendingByCategory(txns: FinancialRecord[]) {
  const map: Record<string, number> = {};
  txns.filter((t) => t.recordType === "expense").forEach((t) => {
    map[t.categoryId] = (map[t.categoryId] ?? 0) + Math.abs(t.amount.value);
  });
  return Object.entries(map)
    .map(([catId, total]) => ({ category: getCategoryById(catId), total }))
    .sort((a, b) => b.total - a.total);
}

export const syncStatus: SyncStatus = "synced";
export const lastSyncedAt = "8 min ago";
