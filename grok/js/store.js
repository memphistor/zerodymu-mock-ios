export const STORAGE_KEY = "zerodymu-grok-v1";

const THEMES = new Set(["light", "dark", "system"]);

export function defaultState() {
  return {
    version: 1,
    settings: {
      theme: "system",
    },
    progress: {
      updatedAt: null,
      lessons: {},
      quizzes: {},
    },
    panel: {
      habits: [],
      streakDays: null,
      cigarettesAvoided: null,
      savedPln: null,
    },
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = defaultState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return { state: fresh, loadError: false };
    }
    const parsed = JSON.parse(raw);
    return { state: normalize(parsed), loadError: false };
  } catch {
    return { state: null, loadError: true };
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState() {
  const fresh = defaultState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

function normalize(parsed) {
  const base = defaultState();
  if (!parsed || typeof parsed !== "object" || parsed.version !== 1) {
    return base;
  }

  const theme = parsed.settings && parsed.settings.theme;
  base.settings.theme = THEMES.has(theme) ? theme : "system";

  const lessons = parsed.progress && parsed.progress.lessons;
  if (lessons && typeof lessons === "object" && !Array.isArray(lessons)) {
    for (const [key, value] of Object.entries(lessons)) {
      if (!value || typeof value !== "object") continue;
      const openedAt = typeof value.openedAt === "string" ? value.openedAt : null;
      if (openedAt) base.progress.lessons[key] = { openedAt };
    }
  }
  if (parsed.progress && typeof parsed.progress.updatedAt === "string") {
    base.progress.updatedAt = parsed.progress.updatedAt;
  }

  const quizzes = parsed.progress && parsed.progress.quizzes;
  if (quizzes && typeof quizzes === "object" && !Array.isArray(quizzes)) {
    for (const [key, value] of Object.entries(quizzes)) {
      const record = readQuiz(value);
      if (record) base.progress.quizzes[key] = record;
    }
  }

  const panel = parsed.panel;
  if (panel && typeof panel === "object") {
    base.panel.habits = Array.isArray(panel.habits) ? panel.habits.filter(isHabit) : [];
    base.panel.streakDays = numberOrNull(panel.streakDays);
    base.panel.cigarettesAvoided = numberOrNull(panel.cigarettesAvoided);
    base.panel.savedPln = numberOrNull(panel.savedPln);
  }

  return base;
}

function isHabit(item) {
  return Boolean(item && typeof item === "object" && typeof item.id === "string");
}

function numberOrNull(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function readQuiz(value) {
  if (!value || typeof value !== "object") return null;
  const correct = numberOrNull(value.correct);
  const total = numberOrNull(value.total);
  if (correct === null || total === null || total < 1 || correct < 0 || correct > total) return null;
  return {
    correct,
    total,
    passed: Boolean(value.passed),
    at: typeof value.at === "string" ? value.at : null,
  };
}
