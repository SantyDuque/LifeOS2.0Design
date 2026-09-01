export type HabitStatus = "active" | "paused" | "archived";
export type HabitCategory = "health" | "mind" | "work" | "body" | "evening" | "morning";
export type TimeOfDay = "morning" | "afternoon" | "evening" | "anytime";

export interface Habit {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: HabitCategory;
  timeOfDay: TimeOfDay;
  frequency: string;
  completionRate30: number;
  completionRate90: number;
  currentStreak: number;
  bestStreak: number;
  totalCompletions: number;
  status: HabitStatus;
  completedToday: boolean;
  last30Days: boolean[];
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  target: number;
  unit: string;
  dueDate: string;
  status: "on-track" | "at-risk" | "completed" | "paused";
  linkedHabits: string[];
  milestones: { label: string; completed: boolean; date: string }[];
}

export const habits: Habit[] = [
  {
    id: "h1",
    name: "Morning Walk",
    description: "20-minute walk before breakfast",
    icon: "🚶",
    category: "body",
    timeOfDay: "morning",
    frequency: "Daily",
    completionRate30: 92,
    completionRate90: 87,
    currentStreak: 14,
    bestStreak: 31,
    totalCompletions: 248,
    status: "active",
    completedToday: true,
    last30Days: [true,true,true,false,true,true,true,true,true,false,true,true,true,true,true,false,true,true,true,true,false,true,true,true,true,true,false,true,true,true],
  },
  {
    id: "h2",
    name: "Read 30 Minutes",
    description: "Non-fiction or focused reading",
    icon: "📖",
    category: "mind",
    timeOfDay: "evening",
    frequency: "Daily",
    completionRate30: 87,
    completionRate90: 80,
    currentStreak: 7,
    bestStreak: 22,
    totalCompletions: 201,
    status: "active",
    completedToday: true,
    last30Days: [true,true,false,true,true,true,false,true,true,true,true,false,true,true,false,true,true,true,true,false,true,true,true,false,true,true,true,true,false,true],
  },
  {
    id: "h3",
    name: "Meditation",
    description: "10 minutes of focused breathing",
    icon: "🧘",
    category: "mind",
    timeOfDay: "morning",
    frequency: "Daily",
    completionRate30: 81,
    completionRate90: 74,
    currentStreak: 5,
    bestStreak: 18,
    totalCompletions: 172,
    status: "active",
    completedToday: true,
    last30Days: [true,false,true,true,false,true,true,true,false,true,true,true,false,true,true,false,true,true,true,false,true,false,true,true,true,false,true,true,false,true],
  },
  {
    id: "h4",
    name: "Exercise",
    description: "Gym or strength training session",
    icon: "🏋️",
    category: "body",
    timeOfDay: "afternoon",
    frequency: "Mon, Wed, Fri",
    completionRate30: 74,
    completionRate90: 68,
    currentStreak: 3,
    bestStreak: 12,
    totalCompletions: 89,
    status: "active",
    completedToday: false,
    last30Days: [false,true,false,true,false,true,false,false,true,false,true,false,true,false,false,true,false,true,false,true,false,false,true,false,true,false,true,false,false,false],
  },
  {
    id: "h5",
    name: "Plan the Day",
    description: "Review priorities and schedule",
    icon: "📋",
    category: "work",
    timeOfDay: "morning",
    frequency: "Weekdays",
    completionRate30: 63,
    completionRate90: 71,
    currentStreak: 2,
    bestStreak: 14,
    totalCompletions: 134,
    status: "active",
    completedToday: false,
    last30Days: [true,false,true,true,false,false,true,true,false,true,false,false,true,true,false,true,false,false,true,true,false,true,false,false,true,false,true,false,false,false],
  },
  {
    id: "h6",
    name: "Deep Work",
    description: "2+ hours of uninterrupted focused work",
    icon: "🎯",
    category: "work",
    timeOfDay: "morning",
    frequency: "Weekdays",
    completionRate30: 57,
    completionRate90: 61,
    currentStreak: 1,
    bestStreak: 9,
    totalCompletions: 97,
    status: "active",
    completedToday: false,
    last30Days: [false,true,false,false,true,false,true,false,false,true,false,true,false,false,true,false,false,true,false,false,true,true,false,false,false,true,false,true,false,false],
  },
  {
    id: "h7",
    name: "Drink Water",
    description: "8 glasses throughout the day",
    icon: "💧",
    category: "health",
    timeOfDay: "anytime",
    frequency: "Daily",
    completionRate30: 78,
    completionRate90: 75,
    currentStreak: 6,
    bestStreak: 21,
    totalCompletions: 198,
    status: "active",
    completedToday: true,
    last30Days: [true,true,false,true,true,false,true,true,true,false,true,true,false,true,true,true,false,true,true,false,true,true,true,false,true,true,false,true,false,true],
  },
  {
    id: "h8",
    name: "Evening Review",
    description: "Reflect on the day and plan tomorrow",
    icon: "🌙",
    category: "evening",
    timeOfDay: "evening",
    frequency: "Daily",
    completionRate30: 45,
    completionRate90: 52,
    currentStreak: 0,
    bestStreak: 8,
    totalCompletions: 61,
    status: "active",
    completedToday: false,
    last30Days: [false,true,false,false,true,false,false,false,true,false,false,true,false,false,false,true,false,false,true,false,false,false,true,false,false,false,true,false,false,false],
  },
];

export const goals: Goal[] = [
  {
    id: "g1",
    title: "Run a Half Marathon",
    description: "Complete a half marathon by end of year to build endurance and consistency.",
    category: "Health",
    progress: 68,
    target: 100,
    unit: "%",
    dueDate: "2026-12-15",
    status: "on-track",
    linkedHabits: ["h1", "h4"],
    milestones: [
      { label: "Run 5K without stopping", completed: true, date: "Mar 2026" },
      { label: "Complete 10K training run", completed: true, date: "May 2026" },
      { label: "15K long run", completed: false, date: "Sep 2026" },
      { label: "Half marathon race", completed: false, date: "Dec 2026" },
    ],
  },
  {
    id: "g2",
    title: "Read 24 Books This Year",
    description: "Two books per month to build a reading habit and broaden knowledge.",
    category: "Learning",
    progress: 63,
    target: 24,
    unit: "books",
    dueDate: "2026-12-31",
    status: "on-track",
    linkedHabits: ["h2"],
    milestones: [
      { label: "First 6 books", completed: true, date: "Mar 2026" },
      { label: "12 books halfway", completed: true, date: "Jun 2026" },
      { label: "18 books", completed: false, date: "Sep 2026" },
      { label: "24 books complete", completed: false, date: "Dec 2026" },
    ],
  },
  {
    id: "g3",
    title: "Build a Side Project",
    description: "Ship a working product that solves a real problem and has at least 10 users.",
    category: "Work",
    progress: 35,
    target: 100,
    unit: "%",
    dueDate: "2026-10-01",
    status: "at-risk",
    linkedHabits: ["h5", "h6"],
    milestones: [
      { label: "Define scope and tech stack", completed: true, date: "Jun 2026" },
      { label: "Working prototype", completed: false, date: "Aug 2026" },
      { label: "Beta launch", completed: false, date: "Sep 2026" },
      { label: "10 active users", completed: false, date: "Oct 2026" },
    ],
  },
  {
    id: "g4",
    title: "Daily Meditation Practice",
    description: "Meditate every day for an entire year to establish a lasting mindfulness practice.",
    category: "Wellbeing",
    progress: 82,
    target: 365,
    unit: "days",
    dueDate: "2026-12-31",
    status: "on-track",
    linkedHabits: ["h3"],
    milestones: [
      { label: "30 consecutive days", completed: true, date: "Jan 2026" },
      { label: "100 days total", completed: true, date: "Apr 2026" },
      { label: "200 days total", completed: true, date: "Jul 2026" },
      { label: "365 days total", completed: false, date: "Dec 2026" },
    ],
  },
];

// Generate daily completion data for the last 90 days
export function generateDailyData(days = 90) {
  const data = [];
  const now = new Date("2026-08-31");
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const base = 65 + Math.sin(i / 14) * 15;
    const noise = (Math.random() - 0.5) * 20;
    const pct = Math.max(10, Math.min(100, Math.round(base + noise)));
    data.push({ date: label, completion: pct, ma7: 0 });
  }
  // compute 7-day moving average
  for (let i = 6; i < data.length; i++) {
    const slice = data.slice(i - 6, i + 1).map((d) => d.completion);
    data[i].ma7 = Math.round(slice.reduce((a, b) => a + b, 0) / 7);
  }
  return data;
}

export function generateWeeklyData(weeks = 12) {
  const data = [];
  const weekNames = ["Jun 2","Jun 9","Jun 16","Jun 23","Jun 30","Jul 7","Jul 14","Jul 21","Jul 28","Aug 4","Aug 11","Aug 18","Aug 25"];
  for (let i = 0; i < weeks; i++) {
    const base = 60 + i * 2 + (Math.random() - 0.5) * 15;
    const completed = Math.max(30, Math.min(98, Math.round(base)));
    data.push({ week: weekNames[i] || `W${i + 1}`, completed, missed: 100 - completed });
  }
  return data;
}

export const weekdayData = [
  { day: "Mon", completion: 82 },
  { day: "Tue", completion: 74 },
  { day: "Wed", completion: 79 },
  { day: "Thu", completion: 68 },
  { day: "Fri", completion: 71 },
  { day: "Sat", completion: 57 },
  { day: "Sun", completion: 63 },
];

export const habitRankData = [
  { name: "Morning Walk", completion: 92 },
  { name: "Reading", completion: 87 },
  { name: "Meditation", completion: 81 },
  { name: "Drink Water", completion: 78 },
  { name: "Exercise", completion: 74 },
  { name: "Plan the Day", completion: 63 },
  { name: "Deep Work", completion: 57 },
  { name: "Evening Review", completion: 45 },
];

// Generate heatmap data for the last year
export function generateHeatmapData() {
  const cells: { date: string; pct: number; label: string }[] = [];
  const now = new Date("2026-08-31");
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const pct = Math.max(0, Math.min(100, Math.round(50 + Math.sin(i / 10) * 30 + (Math.random() - 0.5) * 30)));
    cells.push({
      date: d.toISOString().slice(0, 10),
      pct,
      label: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    });
  }
  return cells;
}

export const weeklyReviewData = {
  week: "Aug 24–30",
  overallCompletion: 71,
  previousCompletion: 64,
  habitsImproved: 3,
  habitsDeclined: 2,
  longestStreak: 14,
  goalsProgressed: 2,
  habits: [
    { name: "Morning Walk", thisWeek: 86, lastWeek: 71 },
    { name: "Reading", thisWeek: 71, lastWeek: 86 },
    { name: "Meditation", thisWeek: 86, lastWeek: 57 },
    { name: "Exercise", thisWeek: 67, lastWeek: 67 },
    { name: "Plan the Day", thisWeek: 60, lastWeek: 80 },
    { name: "Deep Work", thisWeek: 60, lastWeek: 40 },
    { name: "Drink Water", thisWeek: 71, lastWeek: 71 },
    { name: "Evening Review", thisWeek: 43, lastWeek: 57 },
  ],
};
