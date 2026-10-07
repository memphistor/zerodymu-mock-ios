/**
 * Składa kurs z osobnych plików:
 *   modules/m1.js   — moduł 1 z pełną treścią (krok 2)
 *   modules/rest.js — moduły 2–6 jako placeholdery
 *   exam.js         — egzamin końcowy (10 pytań)
 *
 * Ten plik jest jedynym źródłem prawdy o strukturze kursu dla widoków.
 * Identyfikatory (`m1`, `m1-l1`, `m1-l1-quiz`, `m1-quiz`, `exam`) trafiają do
 * localStorage — nie zmieniaj ich po publikacji.
 */

import module1 from './modules/m1.js';
import { MODULES_2_6 } from './modules/rest.js';
import { EXAM } from './exam.js';
import { placeholderQuestions } from './helpers.js';

export { EXAM };

export const MODULES = [module1, ...MODULES_2_6];

export const TOTAL_MODULES = MODULES.length;
export const TOTAL_LESSONS = MODULES.reduce((sum, module) => sum + module.lessons.length, 0);
export const TOTAL_MINUTES = MODULES.reduce(
  (sum, module) => sum + module.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.minutes, 0),
  0,
);

/** Moduły z pełną treścią — w kroku 2 tylko moduł 1. */
export const CONTENT_READY_MODULES = MODULES.filter(
  (module) => module.lessons.some((lesson) => !lesson.placeholder),
).map((module) => module.id);

export function isModuleReady(moduleId) {
  return CONTENT_READY_MODULES.includes(moduleId);
}

export function getModule(moduleId) {
  return MODULES.find((module) => module.id === moduleId) || null;
}

export function getLesson(moduleId, lessonId) {
  const module = getModule(moduleId);
  if (!module) return null;
  return module.lessons.find((lesson) => lesson.id === lessonId) || null;
}

/** Pozycja modułu w kursie (1-based) — do numeracji w interfejsie. */
export function moduleIndex(moduleId) {
  return MODULES.findIndex((module) => module.id === moduleId) + 1;
}

export const lessonQuizId = (lessonId) => `${lessonId}-quiz`;
export const moduleQuizId = (moduleId) => `${moduleId}-quiz`;

/** Pytania quizu lekcji (albo placeholdery, gdy lekcja nie ma jeszcze treści). */
export function lessonQuestions(moduleId, lessonId) {
  const lesson = getLesson(moduleId, lessonId);
  if (!lesson) return [];
  if (Array.isArray(lesson.quiz) && lesson.quiz.length > 0) return lesson.quiz;
  return placeholderQuestions(3);
}

/** Pytania quizu modułu (albo placeholdery). */
export function moduleQuestions(moduleId) {
  const module = getModule(moduleId);
  if (!module) return [];
  if (Array.isArray(module.quiz.questions) && module.quiz.questions.length > 0) return module.quiz.questions;
  return Array.isArray(module.quiz.data) ? module.quiz.data : placeholderQuestions(5);
}

/**
 * Pełny opis quizu dla widoku: tytuł, pytania, próg zaliczenia, powrót.
 * @param {{ kind: 'lesson'|'module'|'exam', moduleId?: string, lessonId?: string }} params
 */
export function quizSpec({ kind, moduleId, lessonId }) {
  if (kind === 'exam') {
    return {
      id: EXAM.id,
      kind,
      title: EXAM.title,
      lead: EXAM.lead,
      passedRatio: EXAM.passedRatio,
      back: { href: '#/kurs', label: 'Kurs' },
      questions: EXAM.questions,
      placeholder: false,
      partial: true, // część pytań to jeszcze placeholdery
    };
  }

  const module = getModule(moduleId);
  if (!module) return null;

  if (kind === 'module') {
    const questions = moduleQuestions(module.id);
    return {
      id: moduleQuizId(module.id),
      kind,
      title: `Quiz modułu ${module.number}`,
      lead: `Sprawdzenie najważniejszych rzeczy z modułu „${module.title}".`,
      passedRatio: 0.6,
      back: { href: `#/kurs/${module.id}`, label: module.title },
      questions,
      placeholder: questions.every((question) => question.placeholder),
    };
  }

  const lesson = getLesson(moduleId, lessonId);
  if (!lesson) return null;

  const questions = lessonQuestions(module.id, lesson.id);
  return {
    id: lessonQuizId(lesson.id),
    kind: 'lesson',
    title: `Quiz lekcji: ${lesson.title}`,
    lead: 'Trzy krótkie pytania podsumowujące lekcję.',
    passedRatio: 0.66,
    back: { href: `#/kurs/${module.id}/lekcja/${lesson.id}`, label: lesson.title },
    questions,
    placeholder: questions.every((question) => question.placeholder),
  };
}
