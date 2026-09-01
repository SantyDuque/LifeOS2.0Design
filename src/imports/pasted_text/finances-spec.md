Add a completely new **Finances** section to the existing LifeOS application.

This must follow the exact visual language already established in the current LifeOS redesign:

* dark charcoal background
* cream primary accent
* sage / teal positive states
* muted orange for attention
* subtle wine/magenta where already appropriate
* thin borders
* restrained surfaces
* serif display headings
* compact analytical typography
* calm, premium, mature visual hierarchy

Do NOT redesign the rest of LifeOS.

The Finances experience should feel like a natural part of LifeOS rather than a separate banking application.

---

# IMPORTANT DATA SOURCE

The future financial data source will be the **BudgetBakers Wallet REST API**:

https://budgetbakers.com/en/products/wallet/integrations/rest-api/

Design the frontend around the actual concepts exposed by that API.

Wallet exposes financial information including:

* Records / transactions
* Accounts
* Categories
* Budgets
* Savings goals
* Standing orders / recurring payments
* Labels
* Record rules / automatic categorization information

Records contain concepts such as:

* transaction ID
* counterparty
* amount
* currency
* record date
* category
* record type
* payment type

The API also supports filtering, pagination and multi-currency financial data.

Do NOT connect to the real Wallet API yet.

Use deterministic mock data shaped around these API concepts.

Do NOT put an API token or Wallet credentials into the frontend.

Keep the frontend data source abstract so a secure server-side Wallet adapter can be connected later.

---

# NAVIGATION

Add:

**Finances**

to the main LifeOS sidebar.

Place it after:

Goals

and before:

Settings

Use an appropriate restrained finance/wallet icon from the existing icon library.

Route:

`/finances`

Finances should be one main LifeOS feature with internal navigation rather than adding many new sidebar items.

---

# FINANCES PAGE PURPOSE

The page should answer five questions immediately:

1. How much money do I currently have?
2. What came in and went out this month?
3. Where is my money going?
4. Am I staying within my budgets?
5. What payments and financial commitments are coming next?

The experience should prioritize:

**Position → Cash Flow → Spending → Budgets → Commitments → Transactions**

Do not make it look like an accounting package.

This is personal financial management.

---

# MAIN FINANCES HEADER

Header:

**Finances**

Subtitle:

`Know where your money is going`

Keep the existing global Search control in the standard LifeOS header position.

Add a primary action:

`+ Transaction`

Use the existing warm cream primary-button treatment.

The button does not need real API integration yet.

Create a functional frontend mock transaction flow.

Also include a compact period selector:

* This month
* Last month
* 3 months
* 6 months
* 1 year

Do not use a huge date-picker by default.

---

# INTERNAL FINANCE NAVIGATION

Inside Finances create restrained tabs:

* Overview
* Transactions
* Accounts
* Budgets
* Recurring

Do not add these to the global sidebar.

Default:

**Overview**

Keep the tabs compact and visually consistent with the filters already used in Habits and Goals.

---

# OVERVIEW

The Overview should be visually compelling but not overcrowded.

## PRIMARY METRICS

Create four metric cards matching the exact proportions and positioning of the metric cards already used on Today and Habits.

### Total balance

Example:

`$28,460`

Subtitle:

`Across 4 accounts`

Derived from account balances.

### Income

Example:

`$6,420`

Subtitle:

`This month`

### Expenses

Example:

`$4,180`

Subtitle:

`This month`

### Net cash flow

Example:

`+$2,240`

Subtitle:

`Income − expenses`

Use positive sage treatment for positive cash flow.

Use restrained muted orange/red only for negative cash flow.

Do not make financial gains bright neon green.

---

# CASH FLOW SECTION

Create a major visualization titled:

**Cash flow**

Subtitle:

`Income and expenses over time`

Use a monthly/weekly grouped bar chart or two-line chart.

Prefer:

Income vs Expenses

depending on the selected date range.

Example monthly data should contain realistic irregularity.

Do not create perfectly smooth financial data.

Allow tooltip:

August 2026

Income
$6,420

Expenses
$4,180

Net
+$2,240

Use the LifeOS palette.

Income:
sage/teal

Expenses:
warm muted orange / wine

Do not introduce unrelated blue SaaS colors.

---

# SPENDING BY CATEGORY

Next to Cash Flow or immediately beneath it create:

**Spending by category**

Prefer a ranked HORIZONTAL BAR visualization rather than a large pie chart.

Example:

Housing        $1,420
Groceries        $620
Transport        $390
Dining           $340
Health           $285
Subscriptions    $170

Show:

* category
* amount
* percentage of total expenses

Categories should map naturally to Wallet categories.

Allow clicking a category to filter Transactions.

---

# FINANCIAL SNAPSHOT

Create a compact secondary information panel similar in spirit to Habit Highlights.

Possible four cards:

### Largest expense

`Rent`
`$1,250`

### Top category

`Housing`
`34% of spending`

### Best budget

`Groceries`
`18% under budget`

### Upcoming payment

`Health insurance`
`Sep 5 · $180`

Derive all values from the mock financial dataset.

Do not hardcode the displayed examples in UI components.

---

# ACCOUNTS SUMMARY

Add a section:

**Accounts**

Show Wallet-style account information.

Example:

Checking
`$8,420`

Savings
`$17,300`

Credit Card
`-$1,260`

Cash
`$2,000`

Each account row/card should show:

* account name
* account type if available
* balance
* currency
* subtle account status/type icon

If multiple currencies exist, show the original currency clearly.

Do not silently pretend all accounts use one currency.

Provide:

`View all accounts`

which switches to the Accounts internal tab.

---

# BUDGET OVERVIEW

Create:

**Budgets**

Use clean horizontal progress indicators.

Example:

Groceries
`$420 / $600`
70%

Dining
`$280 / $350`
80%

Entertainment
`$110 / $300`
37%

Transport
`$390 / $450`
87%

Use semantic thresholds carefully:

* comfortably within budget → sage
* approaching limit → cream/orange
* over budget → muted warning/red

Never communicate budget state through color alone.

Include text values.

Add:

`View budgets`

---

# UPCOMING / RECURRING PAYMENTS

Wallet exposes Standing Orders, so create a useful section:

**Upcoming**

Subtitle:

`Recurring commitments`

Example:

Sep 3
Rent
`$1,250`

Sep 5
Health insurance
`$180`

Sep 8
Netflix
`$18`

Sep 12
Gym
`$45`

Display:

* next expected date
* counterparty/name
* amount
* category if useful

Use standing-order mock data compatible with the eventual Wallet data source.

This section should answer:

**What money is already committed?**

---

# SAVINGS GOALS

Wallet also exposes financial savings goals.

Do NOT mix them with the existing LifeOS Goals domain concept yet.

Keep them visually within Finances.

Create a section:

**Savings goals**

Example:

Emergency fund
`$8,400 / $12,000`
70%

Vacation
`$2,300 / $4,000`
57%

New laptop
`$950 / $1,600`
59%

Use restrained progress bars.

Treat these as **financial savings goals supplied by Wallet**, distinct from the existing LifeOS Goals feature.

Do not create cross-domain integration yet.

---

# TRANSACTIONS TAB

Create a powerful but clean transaction view.

Title:

**Transactions**

Search/filter toolbar:

* search counterparty / description
* period
* account
* category
* transaction type
* payment type
* label

Use concepts that map to Wallet REST API filters.

Transaction table/list columns:

Date

Counterparty

Category

Account

Payment type

Amount

Example:

31 Aug
Carulla
Groceries
Visa
Debit card
`-$82.40`

30 Aug
Employer
Income
Checking
Bank transfer
`+$3,200`

29 Aug
Uber
Transport
Visa
Card
`-$18.60`

Use:

* negative amount styling restrained
* positive income in sage
* category indicators
* clean row separators

Avoid heavy table chrome.

Clicking a transaction opens a detail drawer.

---

# TRANSACTION DETAIL DRAWER

Show:

* counterparty
* amount
* currency
* date
* record type
* payment type
* account
* category
* labels
* note if available

Actions in frontend mock mode:

* Edit
* Delete

Do not connect these actions to Wallet yet.

Prepare the UI because Wallet supports creation/update/deletion for relevant records.

---

# ADD TRANSACTION FLOW

Create a modal or drawer:

**Add transaction**

Fields should conceptually map to Wallet record information:

* Expense / Income / Transfer
* Amount
* Currency
* Date
* Account
* Category
* Counterparty
* Payment type
* Labels
* Note

Use existing LifeOS form styling.

The action should modify the local mock state only.

Do not call the real Wallet API.

---

# ACCOUNTS TAB

Create:

**Accounts**

Show all financial accounts.

Each account card/row:

* account name
* type
* currency
* current balance
* recent movement if derivable
* number of recent transactions if useful

Provide a compact total at the top.

Do not create unnecessary graphs for every account.

Allow account selection to show recent transactions associated with that account.

---

# BUDGETS TAB

Create a more detailed budget management view.

Header:

**Budgets**

Summary:

Total budgeted
Spent
Remaining

Then budget cards/rows:

Category
Spent / Limit
Remaining
Progress
Status

Example:

Groceries
`$420 / $600`
`$180 remaining`
70%

Also include a compact comparison:

**This month vs previous month**

Do not add a giant visualization.

A small comparison indicator is enough.

Add frontend-only:

`+ Budget`

using mock state.

---

# RECURRING TAB

Use standing-order concepts.

Header:

**Recurring payments**

Create sections:

Upcoming

Monthly

Other recurring schedules

Each item can show:

* description/counterparty
* amount
* frequency
* next expected date
* account/category when available

Add a compact monthly commitment summary:

`$1,493 committed monthly`

derived from recurring data.

---

# FINANCIAL INSIGHTS

On Overview include only 2–3 concise insights.

Examples:

`Dining spending is 22% higher than last month.`

`You have used 68% of your monthly budgets with 11 days remaining.`

`Recurring commitments represent 31% of this month's income.`

Generate these from mock data.

Do not fabricate causal statements.

Do not overwhelm the user with AI-style prose.

One or two lines per insight maximum.

---

# DATA FRESHNESS

The Wallet API exposes synchronization state.

Design a subtle status near the financial header such as:

`Updated 8 min ago`

or

`Sync in progress`

Do not make this visually prominent unless there is a problem.

Support mock states for:

* synced
* syncing
* initial synchronization
* stale data
* API unavailable

The future integration can use Wallet synchronization headers.

---

# MULTI-CURRENCY

The architecture must not assume only USD.

Money objects should conceptually contain:

* value
* currencyCode

Use proper localized currency formatting.

If accounts contain multiple currencies:

* preserve original currency
* optionally show a converted total only when a conversion basis exists

Do not mix currencies by simple arithmetic.

Design the frontend models accordingly.

---

# EMPTY / LOADING / ERROR STATES

Design states for:

No accounts

No transactions

No budgets

No recurring payments

No savings goals

Loading

Sync in progress

Connection unavailable

Insufficient transaction history

Examples:

`No transactions yet`

`More transaction history is needed before LifeOS can identify spending patterns.`

---

# DATA ARCHITECTURE

Do not scatter financial demo data through JSX.

Create a dedicated frontend finance domain.

Conceptually:

finance/

* models
* fixtures
* selectors
* repository interface
* mock repository
* components

Models should conceptually support:

FinancialRecord
FinancialAccount
FinancialCategory
FinancialBudget
FinancialGoal
StandingOrder
FinancialLabel

Keep components independent of Wallet network transport.

The future integration should be able to replace:

MockFinanceRepository

with something conceptually like:

WalletFinanceRepository

without redesigning components.

---

# FUTURE API CONSTRAINTS

Architect the frontend with the Wallet REST API behavior in mind:

* paginated datasets
* filters
* rate limits
* asynchronous synchronization
* possible partial write success
* multi-currency amounts

Do not fetch all transaction history as one conceptual request.

The future API adapter should be able to paginate and cache results.

Do not implement this network adapter now.

---

# SECURITY REQUIREMENT

Never place a real Wallet API token in:

* React source
* Vite public environment variables
* browser localStorage
* frontend configuration
* client network calls

The future Wallet integration must use a secure server-side integration/proxy.

For now, use mock data only.

---

# RESPONSIVE DESIGN

Desktop:

Use the available LifeOS main-content width effectively.

Possible Overview composition:

[ Total balance ] [ Income ] [ Expenses ] [ Cash flow ]

[ Cash Flow chart                   ] [ Spending by Category ]

[ Accounts                          ] [ Budgets              ]

[ Upcoming                          ] [ Savings Goals        ]

[ Financial insights                                      ]

Do not leave large unused right-side areas.

Tablet:

reflow logically.

Mobile:

* metric cards 2 × 2
* sections stacked
* transactions become touch-friendly list rows
* charts remain readable
* no page-level horizontal scrolling

---

# DESIGN PRIORITIES

The page should feel:

Calm
Financially serious
Clear
Data-rich
Private
Analytical
Actionable

Avoid:

* banking-app gradients
* giant credit-card illustrations
* stock-market aesthetics
* crypto aesthetics
* neon green
* excessive pie/donut charts
* gamification
* excessive decorative cards

This is a **personal financial control center inside LifeOS**.

It should visually answer:

**What do I have?**
**What did I earn?**
**What did I spend?**
**Where did it go?**
**What have I already committed?**
**Am I staying within plan?**

Build the full Finances frontend experience using deterministic mock data compatible with the concepts exposed by BudgetBakers Wallet REST API, without connecting the API yet.
