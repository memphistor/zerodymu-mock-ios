/**
 * Locki — krok 2: tryb WYŁĄCZNIE WIZUALNY.
 *
 * Zasada kolejności jest pokazywana (kłódka + przygaszenie), ale nic nie jest
 * twardo zablokowane — każdy moduł i każdą lekcję można otworzyć. Dzięki temu
 * na tym etapie da się obejrzeć całą treść, a użytkownik widzi, jak będzie
 * działał kurs docelowo.
 *
 * Pełna logika (twarde blokady, odblokowanie po quizie) przyjdzie w kroku 3 —
 * wystarczy zmienić `LOCK_MODE` na "enforced" i dopisać gałąź w `canOpen()`.
 */

import { getModule, modules } from "../data/course.js";
import { isLessonDone, moduleProgress, getQuizResult } from "./progress.js";

export const LOCK_MODE = "visual-only"; // krok 3: "enforced"

/** Moduł 1 jest zawsze otwarty; reszta „otwiera się” po ukończeniu poprzedniego. */
export function isModuleCompleted(state, moduleId) {
  const { done, total } = moduleProgress(state, moduleId);
  if (total > 0 && done === total) return true;
  return Boolean(getQuizResult(state, "module", moduleId)?.passed);
}

export function moduleLockState(state, moduleId) {
  const index = modules.findIndex((m) => m.id === moduleId);
  if (index <= 0) return { locked: false, reason: "" };

  const previous = modules[index - 1];
  const open = isModuleCompleted(state, previous.id);
  return {
    locked: !open,
    reason: open
      ? ""
      : `Otwiera się po ukończeniu modułu ${previous.index}: ${previous.title}`,
  };
}

/** Status modułu do wyświetlenia na liście. */
export function moduleStatus(state, moduleId) {
  const { done, total, percent } = moduleProgress(state, moduleId);
  const lock = moduleLockState(state, moduleId);
  const quizPassed = Boolean(getQuizResult(state, "module", moduleId)?.passed);

  if (percent === 100 && quizPassed) return { key: "done", label: "Ukończony", done, total, percent, ...lock };
  if (done > 0) return { key: "progress", label: "W trakcie", done, total, percent, ...lock };
  if (lock.locked) return { key: "locked", label: "Kolejny w kolejności", done, total, percent, ...lock };
  return { key: "open", label: "Do startu", done, total, percent, ...lock };
}

/**
 * Czy można wejść. W trybie "visual-only" zawsze true — kłódka jest tylko
 * podpowiedzią. W kroku 3 ta funkcja zwróci `false` dla zamkniętych modułów.
 */
export function canOpen() {
  if (LOCK_MODE === "enforced") return false; // krok 3
  return true;
}

/** Czy pokazać wizualną kłódkę. */
export function showLockBadge(state, moduleId) {
  return moduleLockState(state, moduleId).locked;
}

/** Status lekcji: done / current / upcoming (kolejność wizualna). */
export function lessonStatus(state, moduleId, index) {
  if (isLessonDone(state, moduleId, index)) return "done";
  const module = getModule(moduleId);
  if (!module) return "upcoming";
  const firstOpen = module.lessons.findIndex((_, i) => !isLessonDone(state, moduleId, i));
  if (firstOpen === -1) return "done";
  return index <= firstOpen ? "current" : "upcoming";
}
