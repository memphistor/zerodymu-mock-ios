const STORAGE_KEY = "zerodymu-sonnet-v1";

const defaultState = () => ({
  version: 1,
  settings: {
    theme: "system",
    onboardingDone: false,
  },
  progress: {
    startedAt: null,
    modules: {},
    lessons: {},
    quizzes: {},
  },
  panel: {
    cigarettesToday: 0,
    streakDays: 0,
    habits: [],
    healthNotes: "",
    savingsPlaceholder: 0,
  },
});

function loadRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function mergeState(parsed) {
  const base = defaultState();
  if (!parsed || typeof parsed !== "object") return base;
  return {
    ...base,
    ...parsed,
    settings: { ...base.settings, ...parsed.settings },
    progress: { ...base.progress, ...parsed.progress },
    panel: { ...base.panel, ...parsed.panel },
  };
}

let state = mergeState(loadRaw());
const listeners = new Set();

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode */
  }
  listeners.forEach((fn) => fn(state));
}

export function patch(partial) {
  state = mergeState({ ...state, ...partial });
  persist();
}

export function updateSettings(settingsPatch) {
  state = mergeState({
    ...state,
    settings: { ...state.settings, ...settingsPatch },
  });
  persist();
}

export function updatePanel(panelPatch) {
  state = mergeState({
    ...state,
    panel: { ...state.panel, ...panelPatch },
  });
  persist();
}

export function resetDemo() {
  state = defaultState();
  persist();
}

export function ensureStarted() {
  if (!state.progress.startedAt) {
    state = mergeState({
      ...state,
      progress: { ...state.progress, startedAt: new Date().toISOString() },
    });
    persist();
  }
}
