/**
 * Model danych ZeroDymu (wersja schematu 2).
 *
 * Całość żyje w jednym kluczu localStorage jako JSON. Klucz jest unikalny dla
 * tego prototypu, bo wszystkie warianty mocków na github.io dzielą ten sam origin.
 *
 * Zmiany względem v1: quizy mają prawdziwe wyniki (lastScore, bestScore);
 * wpis quizu z v1 bez wyniku nie liczy się jako zaliczony.
 *
 * @typedef {'system'|'light'|'dark'} ThemePref
 *
 * @typedef {Object} LessonProgress
 * @property {string} completedAt  ISO datetime ukończenia lekcji
 *
 * @typedef {Object} QuizProgress
 *   Klucze: `m1-l1-quiz` (lekcja), `m1-quiz` (moduł), `exam` (egzamin).
 * @property {number} attempts          liczba zakończonych podejść
 * @property {number|null} lastScore    ostatni wynik 0–1
 * @property {number|null} bestScore    najlepszy wynik 0–1 (null = brak wyniku)
 * @property {string|null} completedAt  ISO datetime ostatniego zakończenia
 *
 * @typedef {Object} AppState
 * @property {2} schemaVersion
 * @property {string} createdAt
 * @property {{ role: 'kursant', displayName: string }} profile
 *   Kursant od startu — pełny dostęp, bez paywalla (brak pola planu/subskrypcji).
 * @property {{ theme: ThemePref }} settings
 * @property {{
 *   lastVisited: { moduleId: string, lessonId: string|null, at: string } | null,
 *   lessons: Record<string, LessonProgress>,
 *   quizzes: Record<string, QuizProgress>
 * }} progress
 * @property {{
 *   smokeFreeSince: string|null,
 *   habits: Array<{ id: string, name: string, createdAt: string }>,
 *   journal: Array<{ id: string, at: string, text: string }>
 * }} panel  Placeholdery panelu — na razie puste.
 */

export const APP_VERSION = '0.2.0';
export const SCHEMA_VERSION = 2;
export const STORAGE_KEY = 'zerodymu:sonnet:data';
export const THEME_PREFS = ['system', 'light', 'dark'];

/** @returns {AppState} */
export function createDefaultState(now = new Date()) {
  return {
    schemaVersion: SCHEMA_VERSION,
    createdAt: now.toISOString(),
    profile: { role: 'kursant', displayName: '' },
    settings: { theme: 'system' },
    progress: { lastVisited: null, lessons: {}, quizzes: {} },
    panel: { smokeFreeSince: null, habits: [], journal: [] },
  };
}

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isString = (v) => typeof v === 'string';
const isIso = (v) => isString(v) && !Number.isNaN(Date.parse(v));
const toScore = (v) => (typeof v === 'number' && v >= 0 && v <= 1 ? v : null);

/**
 * Zamienia dowolną wartość (np. z localStorage) na poprawny AppState.
 * Odporne na brakujące pola, złe typy i dane z nowszych wersji.
 * @returns {AppState}
 */
export function normalizeState(raw) {
  const base = createDefaultState();
  if (!isObject(raw)) return base;

  const state = base;
  if (isIso(raw.createdAt)) state.createdAt = raw.createdAt;

  if (isObject(raw.profile) && isString(raw.profile.displayName)) {
    state.profile.displayName = raw.profile.displayName.slice(0, 40);
  }

  if (isObject(raw.settings) && THEME_PREFS.includes(raw.settings.theme)) {
    state.settings.theme = raw.settings.theme;
  }

  const progress = isObject(raw.progress) ? raw.progress : {};

  const last = progress.lastVisited;
  if (isObject(last) && isString(last.moduleId)) {
    state.progress.lastVisited = {
      moduleId: last.moduleId,
      lessonId: isString(last.lessonId) ? last.lessonId : null,
      at: isIso(last.at) ? last.at : state.createdAt,
    };
  }

  if (isObject(progress.lessons)) {
    for (const [id, entry] of Object.entries(progress.lessons)) {
      if (isObject(entry) && isIso(entry.completedAt)) {
        state.progress.lessons[id] = { completedAt: entry.completedAt };
      }
    }
  }

  if (isObject(progress.quizzes)) {
    for (const [id, entry] of Object.entries(progress.quizzes)) {
      if (!isObject(entry)) continue;
      const attempts = Number.isInteger(entry.attempts) && entry.attempts > 0 ? entry.attempts : 0;
      state.progress.quizzes[id] = {
        attempts,
        lastScore: toScore(entry.lastScore),
        bestScore: toScore(entry.bestScore),
        completedAt: isIso(entry.completedAt) ? entry.completedAt : null,
      };
    }
  }

  const panel = isObject(raw.panel) ? raw.panel : {};
  if (isIso(panel.smokeFreeSince)) state.panel.smokeFreeSince = panel.smokeFreeSince;
  if (Array.isArray(panel.habits)) {
    state.panel.habits = panel.habits.filter(
      (h) => isObject(h) && isString(h.id) && isString(h.name) && isIso(h.createdAt),
    );
  }
  if (Array.isArray(panel.journal)) {
    state.panel.journal = panel.journal.filter(
      (j) => isObject(j) && isString(j.id) && isIso(j.at) && isString(j.text),
    );
  }

  return state;
}
