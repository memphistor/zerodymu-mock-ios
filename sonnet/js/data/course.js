/**
 * Struktura kursu: 6 modułów (treść w js/data/content/), egzamin (js/data/exam.js).
 *
 * Identyfikatory są stabilne i trafiają do localStorage:
 *   moduł m1, lekcja m1-l1, quiz lekcji m1-l1-quiz, quiz modułu m1-quiz, egzamin exam.
 */

import m1 from './content/m1.js';
import m2 from './content/m2.js';
import m3 from './content/m3.js';
import m4 from './content/m4.js';
import m5 from './content/m5.js';
import m6 from './content/m6.js';
import { EXAM_QUESTIONS } from './exam.js';

export const LESSON_PASS_RATIO = 0.6;
export const MODULE_PASS_RATIO = 0.6;
export const EXAM_PASS_RATIO = 0.7;

/**
 * Quiz: { id, kind: 'lesson'|'module'|'exam', title, questions, passRatio, feedback }
 * feedback: 'immediate' (wyjaśnienie po każdym pytaniu) | 'end' (wyniki na końcu).
 */
function buildQuiz({ id, kind, title, questions, passRatio, feedback }) {
  return { id, kind, title, questions, passRatio, feedback };
}

function buildModule(raw, index) {
  const order = index + 1;
  const lessons = raw.lessons.map((lesson, i) => ({
    ...lesson,
    order: i + 1,
    moduleId: raw.id,
    quiz: buildQuiz({
      id: `${lesson.id}-quiz`,
      kind: 'lesson',
      title: `Quiz do lekcji ${i + 1}`,
      questions: lesson.quiz,
      passRatio: LESSON_PASS_RATIO,
      feedback: 'immediate',
    }),
  }));

  return {
    id: raw.id,
    order,
    title: raw.title,
    summary: raw.summary,
    goals: raw.goals,
    lessons,
    minutes: lessons.reduce((sum, l) => sum + l.minutes, 0),
    quiz: buildQuiz({
      id: `${raw.id}-quiz`,
      kind: 'module',
      title: `Quiz modułu ${order}`,
      questions: raw.quiz,
      passRatio: MODULE_PASS_RATIO,
      feedback: 'immediate',
    }),
  };
}

export const MODULES = [m1, m2, m3, m4, m5, m6].map(buildModule);

export const EXAM = buildQuiz({
  id: 'exam',
  kind: 'exam',
  title: 'Egzamin końcowy',
  questions: EXAM_QUESTIONS,
  passRatio: EXAM_PASS_RATIO,
  feedback: 'end',
});

export const TOTAL_LESSONS = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
export const TOTAL_MINUTES = MODULES.reduce((sum, m) => sum + m.minutes, 0);

export const getModule = (moduleId) => MODULES.find((m) => m.id === moduleId) ?? null;

export function getLesson(moduleId, lessonId) {
  const module = getModule(moduleId);
  if (!module) return null;
  const index = module.lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return null;
  return {
    module,
    lesson: module.lessons[index],
    prev: module.lessons[index - 1] ?? null,
    next: module.lessons[index + 1] ?? null,
  };
}

/** Wszystkie lekcje kursu w kolejności (do „następnej lekcji”). */
export const ALL_LESSONS = MODULES.flatMap((m) => m.lessons.map((lesson) => ({ module: m, lesson })));

/** Liczba poprawnych odpowiedzi potrzebna do zaliczenia. */
export const passCount = (quiz) => Math.ceil(quiz.passRatio * quiz.questions.length - 1e-9);

/**
 * Rozwiązuje quiz na podstawie trasy.
 * kind 'lesson' → { moduleId, lessonId }, 'module' → { moduleId }, 'exam' → {}
 */
export function resolveQuiz({ kind, moduleId, lessonId }) {
  if (kind === 'exam') {
    return { quiz: EXAM, module: null, lesson: null, back: { href: '#/kurs', label: 'Kurs' }, eyebrow: 'Egzamin końcowy' };
  }
  const module = getModule(moduleId);
  if (!module) return null;
  if (kind === 'module') {
    return {
      quiz: module.quiz,
      module,
      lesson: null,
      back: { href: `#/kurs/${module.id}`, label: `Moduł ${module.order}` },
      eyebrow: `Moduł ${module.order}`,
    };
  }
  const found = getLesson(moduleId, lessonId);
  if (!found) return null;
  return {
    quiz: found.lesson.quiz,
    module,
    lesson: found.lesson,
    back: { href: `#/kurs/${module.id}/lekcja/${found.lesson.id}`, label: 'Lekcja' },
    eyebrow: `Moduł ${module.order} · Lekcja ${found.lesson.order}`,
  };
}
