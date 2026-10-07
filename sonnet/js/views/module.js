import { h } from '../dom.js';
import { getState } from '../store.js';
import { getModule } from '../data/course.js';
import { isLessonDone, isQuizDone, moduleStats, visit } from '../logic/progress.js';
import { screen, screenHead, backLink, listRow, progressBar, badge } from '../ui/components.js';
import { emptyState } from '../ui/states.js';

export default function moduleView({ moduleId }) {
  const module = getModule(moduleId);
  if (!module) return missingModule();

  visit(module.id);
  const state = getState();
  const stats = moduleStats(state, module);

  const progress = h('section', { class: 'card summary-card', 'aria-label': 'Postęp modułu' },
    h('div', { class: 'summary-card__top' },
      h('div', null,
        h('p', { class: 'summary-card__value' }, `${stats.done} / ${stats.total}`),
        h('p', { class: 'summary-card__label' }, 'ukończonych lekcji')),
      stats.complete && badge('Moduł ukończony', { accent: true })),
    progressBar(stats.percent, `Postęp modułu ${module.order}`));

  const lessons = h('section', { class: 'section' },
    h('h2', { class: 'section-title' }, 'Lekcje'),
    h('ul', { class: 'row-list' },
      module.lessons.map((lesson) => h('li', null, listRow({
        href: `#/kurs/${module.id}/lekcja/${lesson.id}`,
        title: lesson.title,
        meta: `ok. ${lesson.minutes} min`,
        iconName: 'lesson',
        done: isLessonDone(state, lesson.id),
      })))));

  const quizDone = isQuizDone(state, module.quiz.id);
  const quiz = h('section', { class: 'section' },
    h('h2', { class: 'section-title' }, 'Sprawdź wiedzę'),
    listRow({
      href: `#/kurs/${module.id}/quiz`,
      title: module.quiz.title,
      meta: quizDone ? 'Ukończony' : `${module.quiz.questionCount} pytania`,
      iconName: 'quiz',
      done: quizDone,
    }));

  return screen(
    backLink('#/kurs', 'Kurs'),
    screenHead({ eyebrow: `Moduł ${module.order}`, title: module.title, lead: module.summary }),
    progress,
    lessons,
    quiz);
}

function missingModule() {
  return screen(
    backLink('#/kurs', 'Kurs'),
    emptyState({
      icon: 'alert',
      heading: 'h1',
      title: 'Nie ma takiego modułu',
      text: 'Wróć do listy i wybierz moduł jeszcze raz.',
      action: { label: 'Wszystkie moduły', href: '#/kurs' },
    }));
}
