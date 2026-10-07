/** Selektory i operacje postępu kursu (lekcje, quizy, moduły, egzamin). */

import { MODULES, EXAM, TOTAL_LESSONS, ALL_LESSONS } from '../data/course.js';
import { update } from '../store.js';

const EPSILON = 1e-9;

export const isLessonDone = (state, lessonId) => Boolean(state.progress.lessons[lessonId]);

export const quizEntry = (state, quizId) => state.progress.quizzes[quizId] ?? null;

/** Quiz ma zapisany wynik (podejście z v1 bez wyniku się nie liczy). */
export const hasQuizResult = (state, quiz) => quizEntry(state, quiz.id)?.bestScore != null;

export function isQuizPassed(state, quiz) {
  const best = quizEntry(state, quiz.id)?.bestScore;
  return best != null && best >= quiz.passRatio - EPSILON;
}

/** Najlepszy wynik jako liczba poprawnych odpowiedzi, albo null. */
export function bestCorrect(state, quiz) {
  const best = quizEntry(state, quiz.id)?.bestScore;
  return best == null ? null : Math.round(best * quiz.questions.length);
}

export function moduleStats(state, module) {
  const lessonsDone = module.lessons.filter((l) => isLessonDone(state, l.id)).length;
  const lessonsTotal = module.lessons.length;
  const quizPassed = isQuizPassed(state, module.quiz);
  const stepsTotal = lessonsTotal + 1; // lekcje + quiz modułu
  const stepsDone = lessonsDone + (quizPassed ? 1 : 0);
  return {
    lessonsDone,
    lessonsTotal,
    quizPassed,
    stepsDone,
    stepsTotal,
    percent: Math.round((stepsDone / stepsTotal) * 100),
    complete: stepsDone === stepsTotal,
    started: lessonsDone > 0 || hasQuizResult(state, module.quiz),
  };
}

export function courseStats(state) {
  let stepsDone = 0;
  let stepsTotal = 0;
  let lessonsDone = 0;
  let modulesComplete = 0;
  for (const module of MODULES) {
    const stats = moduleStats(state, module);
    stepsDone += stats.stepsDone;
    stepsTotal += stats.stepsTotal;
    lessonsDone += stats.lessonsDone;
    if (stats.complete) modulesComplete += 1;
  }
  return {
    lessonsDone,
    lessonsTotal: TOTAL_LESSONS,
    modulesComplete,
    modulesTotal: MODULES.length,
    percent: stepsTotal === 0 ? 0 : Math.round((stepsDone / stepsTotal) * 100),
    examPassed: isQuizPassed(state, EXAM),
  };
}

/** Następny sensowny krok: pierwsza niezaliczona lekcja/quiz modułu, potem egzamin. */
export function nextUp(state) {
  for (const module of MODULES) {
    const lesson = module.lessons.find((l) => !isLessonDone(state, l.id));
    if (lesson) return { kind: 'lesson', module, lesson };
    if (!isQuizPassed(state, module.quiz)) return { kind: 'module-quiz', module };
  }
  if (!isQuizPassed(state, EXAM)) return { kind: 'exam' };
  return null;
}

/** Następna lekcja w całym kursie (także w kolejnym module), albo null. */
export function nextLessonAfter(lessonId) {
  const index = ALL_LESSONS.findIndex((item) => item.lesson.id === lessonId);
  return index === -1 ? null : (ALL_LESSONS[index + 1] ?? null);
}

export function setLessonDone(lessonId, done) {
  update((draft) => {
    if (done) draft.progress.lessons[lessonId] = { completedAt: new Date().toISOString() };
    else delete draft.progress.lessons[lessonId];
  });
}

/**
 * Zapisuje wynik quizu (ratio 0–1). Zaliczony quiz lekcji oznacza lekcję jako ukończoną.
 * Zwraca { passed }.
 */
export function recordQuizResult({ quiz, lesson }, ratio) {
  const passed = ratio >= quiz.passRatio - EPSILON;
  update((draft) => {
    const prev = draft.progress.quizzes[quiz.id];
    const prevBest = prev?.bestScore ?? null;
    draft.progress.quizzes[quiz.id] = {
      attempts: (prev?.attempts ?? 0) + 1,
      lastScore: ratio,
      bestScore: prevBest == null ? ratio : Math.max(prevBest, ratio),
      completedAt: new Date().toISOString(),
    };
    if (passed && lesson && !draft.progress.lessons[lesson.id]) {
      draft.progress.lessons[lesson.id] = { completedAt: new Date().toISOString() };
    }
  });
  return { passed };
}

export function visit(moduleId, lessonId = null) {
  update((draft) => {
    draft.progress.lastVisited = { moduleId, lessonId, at: new Date().toISOString() };
  });
}
