import { getState } from "../store.js";
import { getModule, getLesson, MODULES } from "../data/course.js";
import { isLessonCompleted, isModuleQuizPassed } from "./progress.js";

/** Krok 2: locki tylko wizualne — pełna logika w kroku 3. */
export const LOCKS_MODE = "visual-only";

export function isModuleVisuallyLocked(moduleId) {
  const idx = MODULES.findIndex((m) => m.id === moduleId);
  if (idx <= 0) return false;
  const prev = MODULES[idx - 1];
  if (!prev) return false;
  const allPrevLessons = prev.lessons.every((l) => isLessonCompleted(l.id));
  const prevQuiz = isModuleQuizPassed(prev.id);
  return !(allPrevLessons && prevQuiz);
}

export function isLessonVisuallyLocked(lessonId) {
  const lesson = getLesson(lessonId);
  if (!lesson) return false;
  const mod = getModule(lesson.moduleId);
  if (!mod) return false;
  const li = mod.lessons.findIndex((l) => l.id === lessonId);
  if (li <= 0) return isModuleVisuallyLocked(mod.id);
  const prev = mod.lessons[li - 1];
  return !isLessonCompleted(prev.id) || isModuleVisuallyLocked(mod.id);
}

/** W trybie visual-only kliknięcie i tak dozwolone. */
export function canNavigateToLesson(lessonId) {
  if (LOCKS_MODE === "visual-only") return true;
  return !isLessonVisuallyLocked(lessonId);
}

export function canNavigateToModule(moduleId) {
  if (LOCKS_MODE === "visual-only") return true;
  return !isModuleVisuallyLocked(moduleId);
}

export function lockBadge(locked) {
  if (!locked) return "";
  return `<span class="chip chip--lock" title="Krok 2 — wizualnie; pełne locki w kroku 3">🔒 Podgląd</span>`;
}
