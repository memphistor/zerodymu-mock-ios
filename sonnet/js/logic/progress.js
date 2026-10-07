/** Operacje i selektory postępu kursu (czyste funkcje na AppState + zapis przez store). */

import { MODULES, TOTAL_LESSONS } from '../data/course.js';
import { update } from '../store.js';

export const isLessonDone = (state, lessonId) => Boolean(state.progress.lessons[lessonId]);

export const isQuizDone = (state, quizId) => Boolean(state.progress.quizzes[quizId]?.completedAt);

export function moduleStats(state, module) {
  const done = module.lessons.filter((l) => isLessonDone(state, l.id)).length;
  const total = module.lessons.length;
  return {
    done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    complete: done === total && isQuizDone(state, module.quiz.id),
  };
}

export function courseStats(state) {
  const lessonsDone = MODULES.reduce(
    (sum, m) => sum + m.lessons.filter((l) => isLessonDone(state, l.id)).length,
    0,
  );
  const modulesComplete = MODULES.filter((m) => moduleStats(state, m).complete).length;
  return {
    lessonsDone,
    lessonsTotal: TOTAL_LESSONS,
    percent: TOTAL_LESSONS === 0 ? 0 : Math.round((lessonsDone / TOTAL_LESSONS) * 100),
    modulesComplete,
    modulesTotal: MODULES.length,
  };
}

export function setLessonDone(lessonId, done) {
  update((draft) => {
    if (done) draft.progress.lessons[lessonId] = { completedAt: new Date().toISOString() };
    else delete draft.progress.lessons[lessonId];
  });
}

export function recordQuizAttempt(quizId) {
  update((draft) => {
    const prev = draft.progress.quizzes[quizId];
    draft.progress.quizzes[quizId] = {
      attempts: (prev?.attempts ?? 0) + 1,
      lastScore: null,
      completedAt: new Date().toISOString(),
    };
  });
}

export function visit(moduleId, lessonId = null) {
  update((draft) => {
    draft.progress.lastVisited = { moduleId, lessonId, at: new Date().toISOString() };
  });
}
