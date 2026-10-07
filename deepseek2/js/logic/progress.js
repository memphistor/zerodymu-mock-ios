/**
 * Logika postępu: czytanie i zapis stanu nauki.
 *
 * Zasady (krok 1, bez egzekwowania kolejności):
 * - lekcja jest ukończona po kliknięciu „Oznacz jako ukończoną” albo po zaliczeniu quizu lekcji,
 * - moduł liczy się jako ukończony, gdy wszystkie jego lekcje są ukończone,
 * - postęp kursu to udział ukończonych lekcji.
 */

import * as store from '../store.js';
import { MODULES, TOTAL_LESSONS, getModule, EXAM } from '../data/course.js';
import { nowIso } from '../model.js';

export function isLessonComplete(lessonId) {
  return Boolean(store.getState().progress.lessons[lessonId]);
}

export function isQuizPassed(quizId, passedRatio) {
  const entry = store.getState().progress.quizzes[quizId];
  if (!entry) return false;
  const best = entry.bestScore;
  return typeof best === 'number' && best >= passedRatio;
}

export function quizEntry(quizId) {
  return store.getState().progress.quizzes[quizId] || null;
}

/** Postęp jednego modułu: 0–1 + liczby, na których opiera się interfejs. */
export function moduleProgress(moduleId) {
  const module = getModule(moduleId);
  if (!module) return { ratio: 0, done: 0, total: 0, complete: false };

  const total = module.lessons.length;
  const done = module.lessons.filter((lesson) => isLessonComplete(lesson.id)).length;
  const ratio = total === 0 ? 0 : done / total;

  return { ratio, done, total, complete: total > 0 && done === total };
}

/** Postęp całego kursu (udział ukończonych lekcji) + licznik ukończonych modułów. */
export function courseProgress() {
  const doneLessons = MODULES.reduce(
    (sum, module) => sum + module.lessons.filter((lesson) => isLessonComplete(lesson.id)).length,
    0,
  );
  const completedModules = MODULES.filter((module) => moduleProgress(module.id).complete).length;

  return {
    ratio: TOTAL_LESSONS === 0 ? 0 : doneLessons / TOTAL_LESSONS,
    doneLessons,
    totalLessons: TOTAL_LESSONS,
    completedModules,
    totalModules: MODULES.length,
  };
}

/** Pierwsza nieukończona lekcja — punkt startu „Kontynuuj”. */
export function nextLesson() {
  for (const module of MODULES) {
    for (const lesson of module.lessons) {
      if (!isLessonComplete(lesson.id)) {
        return { moduleId: module.id, lessonId: lesson.id, module, lesson };
      }
    }
  }
  return null;
}

export function completeLesson(lessonId) {
  store.update((state) => {
    state.progress.lessons[lessonId] = { completedAt: nowIso() };
  });
}

export function uncompleteLesson(lessonId) {
  store.update((state) => {
    delete state.progress.lessons[lessonId];
  });
}

export function toggleLesson(lessonId) {
  if (isLessonComplete(lessonId)) uncompleteLesson(lessonId);
  else completeLesson(lessonId);
}

/**
 * Zapisuje wynik quizu (wartość 0–1) i zwraca, czy zaliczony.
 * Zaliczenie quizu lekcji oznacza lekcję jako ukończoną (także egzaminu nie dotyczy).
 */
export function recordQuiz(quizId, ratio, passedRatio) {
  const score = Math.min(1, Math.max(0, ratio));
  const passed = score >= passedRatio;
  const lessonId = getLessonQuizBase(quizId);

  store.update((state) => {
    const previous = state.progress.quizzes[quizId] || { attempts: 0, bestScore: null };
    state.progress.quizzes[quizId] = {
      attempts: previous.attempts + 1,
      lastScore: score,
      bestScore: typeof previous.bestScore === 'number' ? Math.max(previous.bestScore, score) : score,
      completedAt: nowIso(),
    };

    if (passed && lessonId) {
      state.progress.lessons[lessonId] = { completedAt: nowIso() };
    }
  });

  return { score, passed };
}

/** Ostatnio odwiedzana lekcja (dla skrótu w panelu) — zapisywane przy wejściu. */
export function rememberVisit(moduleId, lessonId = null) {
  store.update((state) => {
    state.progress.lastVisited = { moduleId, lessonId, at: nowIso() };
  });
}

/** `m1-l1-quiz` → `m1-l1`; `m1-quiz` i `exam` → null (to nie quizy lekcji). */
function getLessonQuizBase(quizId) {
  if (quizId === EXAM.id) return null;
  return /-l\d+-quiz$/.test(quizId) ? quizId.replace(/-quiz$/, '') : null;
}
