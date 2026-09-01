Create a complete, production-ready frontend design for **LifeOS**, a personal life-management and self-tracking web application.

The existing frontend is being redesigned from scratch. The new interface must feel premium, mature, highly usable, data-driven, and coherent. Avoid the appearance of a generic SaaS admin dashboard.

## 1. PRODUCT CONCEPT

LifeOS is a private personal operating system where a user can organize, track, review, and improve important areas of life over time.

The product should help answer questions such as:

* What should I focus on today?
* Am I consistently completing my habits?
* Am I improving over weeks and months?
* Which habits are becoming stable?
* Where am I losing consistency?
* What deserves my attention?
* How am I progressing toward longer-term goals?
* What patterns can I identify in my behavior?
* How productive or consistent have I been recently?

The experience should emphasize:

**Today → Action → Tracking → Trends → Reflection → Improvement**

Do not design it as a social network, gamified children's app, or corporate project-management tool.

---

# 2. VISUAL DIRECTION

Design the entire application in **dark mode first**.

Use a sophisticated dark palette inspired by premium analytics and productivity applications.

Suggested palette:

* App background: near-black / deep charcoal such as #090B10
* Sidebar: #0D1017
* Primary surfaces: #11151E
* Elevated surfaces: #161B26
* Borders: subtle #242B38
* Primary text: #F5F7FA
* Secondary text: #A5ADBD
* Muted text: #697386

Primary accent:

* refined violet / indigo, approximately #7C6CF2

Secondary semantic accents:

* emerald for positive/completed
* amber for warnings/attention
* red/coral for missed/negative
* blue/cyan for informational data

Do NOT overuse accent colors.

Avoid:

* excessive gradients
* neon cyberpunk styling
* glassmorphism everywhere
* glowing borders
* huge cards with little information
* oversized typography
* excessive rounded pills
* rainbow dashboards
* decorative visualizations with no purpose

Use subtle shadows, 1px borders, layered surfaces, excellent spacing, and restrained use of color.

Border radius should generally remain around 8–12px.

The design should feel somewhere between:

* Linear
* Raycast
* Arc
* modern health analytics applications
* professional quantitative dashboards

while maintaining its own LifeOS identity.

---

# 3. DESIGN SYSTEM

Build a reusable design system rather than isolated screens.

Create:

## Foundations

* color tokens
* semantic colors
* spacing scale
* typography scale
* border radius
* elevation levels
* icon sizing
* chart colors
* focus states
* disabled states
* interactive states

## Typography

Use a highly readable modern sans-serif.

Possible direction:

* Inter
* Geist
* SF Pro-like typography

Use clear hierarchy rather than excessive font-size differences.

## Components

Create reusable components and variants for:

* buttons
* icon buttons
* inputs
* text areas
* selects
* search
* date picker
* segmented controls
* toggles
* checkboxes
* radio controls
* tabs
* badges
* status chips
* dropdown menus
* tooltips
* popovers
* command palette
* modal dialogs
* confirmation dialogs
* drawers
* toast notifications
* skeleton loaders
* empty states
* error states
* metric cards
* chart containers
* tables
* list rows
* navigation items
* habit rows/cards
* progress indicators
* calendars
* streak indicators

Include hover, pressed, selected, focus, disabled, loading, success, warning, and error variants where appropriate.

---

# 4. GLOBAL APPLICATION SHELL

Create a responsive desktop-first application shell.

## Left sidebar

Use a compact persistent sidebar on desktop.

Include:

LifeOS logo / wordmark

Navigation:

* Today
* Dashboard
* Habits
* Goals
* Insights
* Calendar
* Review

Secondary navigation:

* Settings

Do NOT include Projects.

Allow sidebar collapsing.

Clearly highlight the active route without using an oversized colored block.

Bottom area:

* user avatar
* user name
* account/settings menu

---

# 5. GLOBAL TOP BAR

The main content area should contain a restrained top navigation/header.

Include:

* current page title
* optional contextual subtitle
* global search
* command palette shortcut
* current date where contextually useful
* notifications
* quick-add button

Quick Add should make it easy to create relevant LifeOS items without navigating away.

Example:

* Habit
* Goal
* Note / reflection when appropriate

---

# 6. TODAY SCREEN — MOST IMPORTANT SCREEN

Design the Today view as the operational home of LifeOS.

It should immediately answer:

**What matters today?**

Top section:

"Good morning, [Name]"
Day and complete date

Then a compact daily summary:

* habits completed
* habits remaining
* current streak status
* daily completion %
* active goals requiring attention

Create a prominent but elegant **Daily Progress** visualization.

Example:

7 / 10 habits completed
70% complete

Do NOT make it look like a videogame.

## Today's Habits

Create a highly usable habit execution list.

Each habit may display:

* completion checkbox
* icon
* habit name
* category
* target/frequency
* current streak
* small contextual status
* completion action

Examples:

Morning walk
Read 30 minutes
Meditation
Exercise
Deep work
Drink water
Review daily priorities

Completed habits should remain visible but visually subdued.

Allow grouping such as:

Morning
Afternoon
Evening
Anytime

Provide excellent empty, partial-completion, and fully-completed states.

## Goals needing attention

Compact section showing 2–4 active goals.

Each displays:

* goal
* progress %
* current milestone
* due date if applicable
* trend or status

## Daily insight

Show one meaningful insight rather than many notifications.

Example:

"You complete your exercise habit 24% more often on days when your morning routine is completed."

Clearly indicate that real insights require sufficient data.

---

# 7. DASHBOARD

The Dashboard should provide a compact overview of personal performance.

At the top include a time filter:

7 days
30 days
90 days
6 months
1 year

Primary KPI cards:

* Overall habit completion
* Current active habits
* Best streak
* Goals on track
* Weekly consistency score

Avoid enormous KPI cards.

The dashboard must prioritize trends and meaningful relationships.

---

# 8. DASHBOARD CHARTS

Create realistic data visualizations with proper axes, labels, legends, tooltips, hover states, date ranges, empty states, and insufficient-data states.

Do not use charts just for decoration.

### Chart 1 — Habit completion trend

LINE CHART

X axis: date
Y axis: completion percentage

Display:

* daily completion
* optional 7-day moving average

Purpose:
Understand whether consistency is improving or declining.

---

### Chart 2 — Weekly consistency

BAR CHART

Show weekly completion percentage over approximately 8–12 weeks.

Allow comparing:

* completed
* missed

Keep visualization visually quiet.

---

### Chart 3 — Habit consistency heatmap

GITHUB-STYLE CALENDAR HEATMAP

Months horizontally.
Days represented as cells.

Intensity represents percentage of scheduled habits completed.

Allow hover:

Tuesday, August 25
8 of 10 habits completed
80%

This should become one of the signature LifeOS visualizations.

---

### Chart 4 — Completion by habit

HORIZONTAL BAR CHART

Rank habits by completion percentage.

Example:

Morning walk — 92%
Reading — 87%
Meditation — 81%
Exercise — 74%
Planning — 63%

This helps identify strong and weak routines.

---

### Chart 5 — Completion by weekday

BAR CHART

Monday through Sunday.

Show average completion rate.

Highlight behavioral patterns without over-emphasizing individual days.

---

### Chart 6 — Habit streak timeline

Create a compact longitudinal visualization showing current and historical streaks.

Possible visual form:

horizontal timeline / streak bands.

Make the concept immediately understandable.

---

# 9. HABITS PAGE

Design a dedicated Habits management experience.

Header:

Habits
"Build consistency through repeatable behaviors."

Actions:

* New Habit

Filters:

* Active
* Paused
* Archived
* Category
* Frequency

Search habits.

Provide two views:

### List view

Recommended default.

Columns/information:

Habit
Frequency
Completion rate
Current streak
Best streak
Last 30 days mini visualization
Status
Actions

Use small sparklines or mini heatmaps where useful.

### Optional card view

More visual but still dense enough for productivity use.

Each habit displays:

* habit name
* description when present
* recurrence
* progress
* current streak
* best streak
* completion %
* last 7 or 30 day activity visualization

---

# 10. HABIT DETAIL PAGE

This should be a powerful analytical page.

Header:

Habit name
Icon/category
Active/paused state
Edit
Archive

Key metrics:

* Current streak
* Best streak
* 30-day completion
* 90-day completion
* Total completions

Charts:

### Completion history

Line chart over time.

### Habit calendar

Calendar heatmap showing completed, missed, and non-scheduled days.

### Weekday performance

Monday–Sunday bar chart.

### Monthly consistency

Monthly percentages.

### Streak history

Timeline of streak periods.

Include a **History / Activity** section listing completion events.

Allow users to inspect and correct historical tracking where product permissions allow it.

---

# 11. CREATE / EDIT HABIT

Design an elegant form presented either as a focused page or large modal/drawer.

Fields:

Habit name
Description
Icon
Category

Recurrence:

* Daily
* Specific weekdays
* X times per week
* Custom schedule where supported

For weekday recurrence display:

M T W T F S S

Allow selecting days clearly.

Optional fields:

* start date
* preferred time / time of day
* target
* unit
* notes

Include a real-time recurrence summary:

"Every Monday, Wednesday and Friday"

Primary action:
Create Habit

Secondary:
Cancel

Make validation states clear.

---

# 12. GOALS

Create a Goals section for medium- and long-term outcomes.

Goals should complement habits rather than duplicate them.

Goal list should show:

* title
* category
* progress
* status
* target date
* linked habits
* latest milestone

Statuses:

* On track
* At risk
* Completed
* Paused

Goal detail:

* objective
* why it matters / description
* overall progress
* target
* target date
* milestones
* linked habits
* progress history
* notes/reflections

Useful visualization:

GOAL PROGRESS OVER TIME — line chart showing progression toward target.

Include milestone timeline.

---

# 13. INSIGHTS

Build a dedicated analytics page named **Insights**.

The purpose is not to overwhelm users with statistics.

Organize into:

### Consistency

* overall habit completion
* strongest habits
* weakest habits
* streak patterns

### Time patterns

* completion by weekday
* completion by time period if data exists

### Trends

* improving habits
* declining habits
* stable habits

### Relationships

Allow future correlation insights such as:

"When Habit A is completed, Habit B is completed more frequently."

Do NOT claim causality.

Label correlations carefully.

Example:

"Days with morning planning are associated with a higher daily habit completion rate."

Provide an "insufficient data" design for analytics that need more history.

---

# 14. REVIEW

Create a Weekly Review experience.

This should feel thoughtful and calm.

Header:

Weekly Review
Aug 24–30

Summary:

* overall completion
* habits improved
* habits declined
* longest streak
* goals progressed

Charts:

Weekly completion comparison:
This week vs previous week.

Habit performance comparison:
horizontal bars.

Then reflection areas:

What went well?
What was difficult?
What should change next week?

Provide a CTA:

Complete Weekly Review

Past reviews should be accessible.

---

# 15. CALENDAR

Create a LifeOS calendar focused on behavioral history rather than meeting scheduling.

Month view.

Each date may communicate:

* habit completion percentage
* goal milestone
* review event

Selecting a date opens daily details.

Provide visual hierarchy so the calendar does not become cluttered.

---

# 16. SEARCH / COMMAND PALETTE

Create a keyboard-first command palette.

Shortcut concept:

⌘ K / Ctrl K

Allow:

Search habits
Search goals
Navigate pages
Create habit
Create goal
Open today's view
Open settings

Design this as a premium productivity feature.

---

# 17. NOTIFICATIONS / FEEDBACK

Design restrained notifications for:

* successful habit creation
* habit update
* archive confirmation
* completion actions
* API errors
* network failures

Use non-blocking toasts where appropriate.

Critical destructive actions require confirmation.

---

# 18. SETTINGS

Create settings sections:

## Profile

Name
Avatar
Email where appropriate

## Appearance

Dark theme selected by default

Option architecture should support future light/system themes.

## Preferences

Week starts Monday/Sunday
Date formatting
Time formatting

## Data / account

Data export
Account-related actions
Logout

Keep destructive controls separate.

---

# 19. AUTHENTICATION

Design:

Login
Loading/authentication verification
Expired session
Access error

Login should be extremely clean.

Do not use large marketing sections.

Focus on LifeOS branding + authentication.

---

# 20. STATES THAT MUST BE DESIGNED

The UI cannot assume perfect data.

For all major screens include:

* loading
* skeleton
* empty
* populated
* partially populated
* API failure
* permission/authentication failure where relevant
* offline/network issue where appropriate

Examples:

No habits yet:
"Start with one behavior you want to make consistent."

No analytics yet:
"More history is needed before LifeOS can identify meaningful patterns."

Avoid fake charts when no data exists.

---

# 21. RESPONSIVE DESIGN

Design responsive variants.

Desktop:
1440px reference width

Laptop:
1280px

Tablet:
768–1024px

Mobile:
375–430px

Mobile navigation should transform appropriately rather than simply shrinking the desktop sidebar.

For mobile prioritize:

Today
Habits
Dashboard/Insights
Goals
More

Habit completion should be exceptionally easy with one hand.

Touch targets should be at least approximately 44px.

Charts must remain readable on mobile.

Consider horizontal chart scrolling only when unavoidable.

---

# 22. ACCESSIBILITY

Design toward WCAG 2.2 AA.

Ensure:

* strong text/background contrast
* visible keyboard focus
* keyboard navigation
* accessible selected states
* color is never the only status indicator
* icons have text or accessible labels
* charts have accompanying textual summaries
* minimum usable touch targets

Do not rely on low-contrast gray text throughout the interface.

---

# 23. DATA VISUALIZATION RULES

Charts should follow a unified visual language.

Use:

* thin grid lines
* restrained axis labels
* informative tooltips
* consistent date formatting
* consistent semantic colors
* subtle animation
* responsive sizing

Avoid:

* 3D charts
* gauges
* speedometers
* gratuitous donut charts
* decorative infographics
* excessive pie charts

Preferred visualization types:

* line charts
* horizontal bar charts
* column charts
* calendar heatmaps
* sparklines
* progress bars
* timelines

Every chart must answer a user question.

---

# 24. DASHBOARD INFORMATION HIERARCHY

Do not fill the screen with isolated cards.

Use hierarchy:

1. What needs attention
2. Current state
3. Trend
4. Explanation / insight
5. Details on demand

Prefer larger analytical areas containing related information rather than placing every metric inside its own card.

Use progressive disclosure.

---

# 25. SAMPLE DATA

Populate the design with realistic sample data so that the interface can be evaluated properly.

Example habits:

* Morning walk
* Read 30 minutes
* Meditation
* Exercise
* Plan the day
* Deep work
* Drink water
* Evening review

Show realistic mixtures of:

* completed
* missed
* improving
* declining
* long streaks
* newly-created habits

Do not create perfect data because real behavioral tracking is irregular.

---

# 26. INTERACTION DETAILS

Prototype important interactions:

* mark habit complete
* undo completion
* create habit
* edit habit
* pause habit
* archive habit
* change analytics period
* chart tooltip
* select heatmap date
* navigate from dashboard metric to detail
* open command palette
* filter habits
* open goal
* perform weekly review

Use smooth, subtle transitions around 150–250ms.

Avoid unnecessary animation.

---

# 27. FRONTEND IMPLEMENTATION MINDSET

Design this as something developers will actually implement.

Use:

* reusable components
* auto layout
* component variants
* variables/tokens
* consistent spacing
* semantic names
* predictable responsive behavior

Do not create one-off components for every screen.

Keep the design compatible with a modern React/Next.js frontend consuming an existing API.

Do not require new backend capabilities merely to make the UI visually interesting.

Where a feature might need backend support, clearly treat it as optional/future rather than assuming it already exists.

---

# 28. FIGMA FILE STRUCTURE

Organize the Figma file into pages:

01 — Foundations
02 — Components
03 — Authentication
04 — Today
05 — Dashboard
06 — Habits
07 — Habit Detail
08 — Goals
09 — Insights
10 — Calendar
11 — Weekly Review
12 — Settings
13 — Responsive / Mobile
14 — States
15 — Prototype

Use proper naming conventions and auto layout throughout.

---

# 29. CORE SCREENS TO PRODUCE

At minimum create polished high-fidelity designs for:

1. Login
2. Today — partially completed day
3. Today — everything completed
4. Dashboard — 30-day data
5. Dashboard — insufficient data
6. Habits — populated
7. Habits — empty
8. Habit detail
9. Create habit
10. Edit habit
11. Goals
12. Goal detail
13. Insights
14. Calendar
15. Weekly Review
16. Settings
17. Mobile Today
18. Mobile Habits
19. Mobile Dashboard/Insights
20. Error/loading examples

---

# 30. MOST IMPORTANT UX PRINCIPLE

LifeOS should make complexity understandable.

The user should never feel that they are maintaining the system for the sake of maintaining the system.

Every screen should help the user either:

**Act**
**Understand**
**Reflect**
or
**Improve**

The final visual identity should communicate:

Calm.
Control.
Consistency.
Clarity.
Progress.
Long-term thinking.

Make the interface sophisticated enough for someone who may use LifeOS every day for years.

Create the complete high-fidelity dark-mode frontend concept, component system, responsive screens, realistic data visualizations, interaction states, and prototype flows accordingly.
