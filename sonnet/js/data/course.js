/**
 * Struktura kursu — 6 modułów z treścią zastępczą.
 * Prawdziwe tytuły i opisy zastąpią placeholdery w kolejnym kroku;
 * identyfikatory (m1, m1-l1, m1-quiz) są stabilne i trafiają do localStorage.
 */

const LESSONS_PER_MODULE = 3;
const QUESTIONS_PER_QUIZ = 3;
const MODULE_COUNT = 6;

function buildModule(order) {
  const id = `m${order}`;
  return {
    id,
    order,
    title: `Moduł ${order} — tytuł wkrótce`,
    summary: 'Krótki opis modułu pojawi się tutaj. Treść w przygotowaniu.',
    lessons: Array.from({ length: LESSONS_PER_MODULE }, (_, i) => ({
      id: `${id}-l${i + 1}`,
      order: i + 1,
      title: `Lekcja ${i + 1} — tytuł wkrótce`,
      minutes: 5,
    })),
    quiz: {
      id: `${id}-quiz`,
      title: `Quiz — moduł ${order}`,
      questionCount: QUESTIONS_PER_QUIZ,
      optionsPerQuestion: 3,
    },
  };
}

export const MODULES = Array.from({ length: MODULE_COUNT }, (_, i) => buildModule(i + 1));

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

export const TOTAL_LESSONS = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
