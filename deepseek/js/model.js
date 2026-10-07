/**
 * Szkic modelu danych ZeroDymu (krok 1).
 *
 * Trzy obszary:
 *  - settings — motyw, metadane konta/demo, flaga onboardingu
 *  - progress — postęp kursu (moduły, lekcje, quizy)
 *  - panel    — trackery i placeholdery widoczne w zakładce Panel
 *
 * Wszystko trzymane w jednym kluczu localStorage. `migrate()` pozwala
 * dokładać pola w kolejnych krokach bez psucia zapisanych danych.
 */

export const SCHEMA_VERSION = 1;

export function createDefaultState() {
  return {
    schemaVersion: SCHEMA_VERSION,
    createdAt: null,
    updatedAt: null,
    settings: {
      theme: "system", // "system" | "light" | "dark"
      reducedMotion: false,
      onboardingDone: false,
      displayName: "",
    },
    progress: {
      startedAt: null,
      lastVisited: null, // np. "kurs/modul/m1/lekcja/0"
      lessons: {}, // { "m1/0": { status: "done", lastAt: ISO } }
      quizzes: {}, // { "lesson:m1/0": { score, total, lastAt } }
      examPassed: false,
    },
    panel: {
      smoking: {
        cigsToday: 0,
        baselinePerDay: 0, // szkic — ile dziennie przed startem
      },
      streakDays: 0,
      habits: [], // ["Spacer po obiedzie", ...]
      healthNotes: "",
      savings: { perPack: 0, currency: "PLN", savedTotal: 0 },
    },
  };
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Rekurencyjne scalanie: wartości z `patch` wygrywają, brakujące pola
 *  uzupełniamy z `base`. Nieznane pola z `patch` przechodzą bez zmian. */
export function deepMerge(base, patch) {
  if (!isPlainObject(patch)) return base;
  const out = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (isPlainObject(value) && isPlainObject(base[key])) {
      out[key] = deepMerge(base[key], value);
    } else if (value !== undefined) {
      out[key] = value;
    }
  }
  return out;
}

/** Uzupełnia brakujące pola, typy i znaczniki czasu. Nie resetuje danych. */
function finalize(state) {
  const next = isPlainObject(state) ? { ...state } : createDefaultState();

  const base = createDefaultState();
  next.schemaVersion = SCHEMA_VERSION;
  next.settings = isPlainObject(next.settings) ? next.settings : base.settings;
  next.progress = isPlainObject(next.progress) ? next.progress : base.progress;
  next.panel = isPlainObject(next.panel) ? next.panel : base.panel;

  // Twarde gwarancje typów — localStorage nie jest zaufanym źródłem.
  if (!Array.isArray(next.panel.habits)) next.panel.habits = [];
  if (!isPlainObject(next.progress.lessons)) next.progress.lessons = {};
  if (!isPlainObject(next.progress.quizzes)) next.progress.quizzes = {};

  if (!next.createdAt) next.createdAt = new Date().toISOString();
  next.updatedAt = new Date().toISOString();

  return next;
}

/** Uzupełnia brakujące pola przy wczytywaniu zapisu z localStorage. */
export function migrate(raw) {
  if (!isPlainObject(raw)) return finalize(createDefaultState());
  return finalize(deepMerge(createDefaultState(), raw));
}

/** Scala częściową zmianę z BIEŻĄCYM stanem (nie z domyślnym) i normalizuje.
 *  Dzięki temu `patch({ progress: { lastVisited } })` nie kasuje `startedAt`. */
export function patchState(current, partial) {
  return finalize(deepMerge(current, partial));
}

/** Wyliczone wartości pochodne (nie zapisujemy ich w localStorage). */
export function derive(state) {
  const lessonEntries = Object.values(state.progress.lessons);
  const lessonsDone = lessonEntries.filter((l) => l && l.status === "done").length;
  const quizzesDone = Object.keys(state.progress.quizzes).length;

  return {
    lessonsDone,
    quizzesDone,
    hasProgress: lessonsDone > 0 || quizzesDone > 0,
    isFresh: !state.progress.startedAt,
  };
}
