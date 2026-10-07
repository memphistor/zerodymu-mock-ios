/**
 * Model danych ZeroDymu — schemat v1.
 *
 * Wszystko żyje w jednym kluczu localStorage jako JSON. Klucz jest unikalny dla
 * tego prototypu, ponieważ wszystkie mocki na `memphistor.github.io` dzielą ten
 * sam origin (czyli i localStorage).
 *
 * Kursant od startu: profil ma rolę `kursant` i nie ma planu ani subskrypcji —
 * pełny dostęp do treści bez paywalla.
 *
 * @typedef {'system'|'light'|'dark'} ThemePref
 *
 * @typedef {Object} LessonProgress
 * @property {string} completedAt  ISO datetime ukończenia lekcji
 *
 * @typedef {Object} QuizProgress
 *   Klucze: `m1-l1-quiz` (quiz lekcji), `m1-quiz` (quiz modułu), `exam` (egzamin).
 * @property {number} attempts         liczba zakończonych podejść
 * @property {number|null} lastScore   ostatni wynik 0–1
 * @property {number|null} bestScore   najlepszy wynik 0–1
 * @property {string|null} completedAt ISO datetime ostatniego zakończenia
 *
 * @typedef {Object} AppState
 * @property {1} schemaVersion
 * @property {string} createdAt
 * @property {{ role: 'kursant', displayName: string }} profile
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
 * }} panel  Placeholdery panelu — w kroku 1 zostają puste.
 */

export const APP_VERSION = '0.1.0';
export const SCHEMA_VERSION = 1;
export const STORAGE_KEY = 'zerodymu:deepseek2:data';
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
 * Odporne na brakujące pola, złe typy i dane z innych wersji schematu.
 * @returns {AppState}
 */
export function normalizeState(raw) {
  const state = createDefaultState();
  if (!isObject(raw)) return state;

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
      (hab) => isObject(hab) && isString(hab.id) && isString(hab.name) && isIso(hab.createdAt),
    );
  }
  if (Array.isArray(panel.journal)) {
    state.panel.journal = panel.journal.filter(
      (entry) => isObject(entry) && isString(entry.id) && isIso(entry.at) && isString(entry.text),
    );
  }

  return state;
}

/** Data ISO zapisu — jedno miejsce, żeby łatwo podmienić w testach. */
export const nowIso = () => new Date().toISOString();
