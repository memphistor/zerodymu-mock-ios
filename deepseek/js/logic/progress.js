/**
 * Postęp kursu — krok 2.
 *
 * Cała logika opiera się na dwóch mapach w `state.progress`:
 *   lessons: { "m1/0": { status: "done", lastAt } }
 *   quizzes: { "lesson:m1-l1": { score, total, passed, lastAt },
 *              "module:m1": { ... }, "exam": { ... } }
 *
 * Moduł/lekcja/egzamin nie trzymają własnego stanu — wszystko liczymy
 * z tych map, więc dane są odporne na zmiany kolejności treści.
 */

import { getState, updateProgress } from "../store.js";
import { modules, getModule, getLesson, lessonKey, courseMeta } from "../data/course.js";

/* --- Lekcje --- */

export function isLessonDone(state, moduleId, index) {
  const entry = state.progress.lessons?.[lessonKey(moduleId, index)];
  return entry?.status === "done";
}

export function markLessonDone(moduleId, index) {
  const { lesson } = getLesson(moduleId, index) ?? {};
  if (!lesson) return false;

  const lessons = { ...getState().progress.lessons };
  lessons[lessonKey(moduleId, index)] = {
    status: "done",
    lastAt: new Date().toISOString(),
  };
  updateProgress({ lessons });
  return true;
}

export function markLessonOpen(moduleId, index) {
  const lessons = { ...getState().progress.lessons };
  delete lessons[lessonKey(moduleId, index)];
  updateProgress({ lessons });
}

/** Numer pierwszej nieukończonej lekcji (albo 0, gdy wszystkie gotowe). */
export function nextLessonIndex(state, moduleId) {
  const module = getModule(moduleId);
  if (!module) return 0;
  const index = module.lessons.findIndex((_, i) => !isLessonDone(state, moduleId, i));
  return index === -1 ? 0 : index;
}

/* --- Quizy / egzamin --- */

export function quizKey(kind, id) {
  return kind === "exam" ? "exam" : `${kind}:${id}`;
}

export function recordQuizResult({ kind, id, score, total }) {
  const quizzes = { ...getState().progress.quizzes };
  const passed = score >= Math.ceil(total * 0.6);
  quizzes[quizKey(kind, id)] = {
    score,
    total,
    passed,
    lastAt: new Date().toISOString(),
  };

  const patch = { quizzes };
  if (kind === "exam" && passed) patch.examPassed = true;
  updateProgress(patch);
  return passed;
}

export function getQuizResult(state, kind, id) {
  return state.progress.quizzes?.[quizKey(kind, id)] ?? null;
}

/** Czy lekcja ma quiz (3 pytania). W kroku 2 tylko moduł 1. */
export function hasLessonQuiz(moduleId, index) {
  const { lesson } = getLesson(moduleId, index) ?? {};
  if (!lesson) return false;
  return Boolean(lesson.sections?.length);
}

/* --- Postęp modułu i całego kursu --- */

export function moduleProgress(state, moduleId) {
  const module = getModule(moduleId);
  if (!module) return { done: 0, total: 0, percent: 0 };

  const total = module.lessons.length;
  const done = module.lessons.filter((_, i) => isLessonDone(state, moduleId, i)).length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

export function courseProgress(state) {
  const total = courseMeta.lessonCount;
  const done = modules.reduce(
    (sum, module) => sum + moduleProgress(state, module.id).done,
    0
  );
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

/** Kurs ukończony = wszystkie lekcje + quizy modułów + egzamin. */
export function quizStats(state) {
  const entries = Object.values(state.progress.quizzes ?? {});
  return {
    taken: entries.length,
    passed: entries.filter((q) => q?.passed).length,
    moduleQuizzesPassed: modules.filter(
      (m) => getQuizResult(state, "module", m.id)?.passed
    ).length,
    examPassed: Boolean(state.progress.examPassed),
  };
}
