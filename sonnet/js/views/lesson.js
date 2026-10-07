import { h, mount } from '../dom.js';
import { getState } from '../store.js';
import { getLesson, passCount } from '../data/course.js';
import {
  isLessonDone, setLessonDone, visit, hasQuizResult, isQuizPassed, bestCorrect,
} from '../logic/progress.js';
import {
  screen, screenHead, backLink, badge, plural,
} from '../ui/components.js';
import { renderSection } from '../ui/prose.js';
import { icon } from '../ui/icons.js';
import { emptyState } from '../ui/states.js';

export default function lessonView({ moduleId, lessonId }) {
  const found = getLesson(moduleId, lessonId);
  if (!found) return missingLesson(moduleId);

  const { module, lesson, prev, next } = found;
  visit(module.id, lesson.id);

  const sectionIds = lesson.sections.map((_, i) => `sekcja-${i + 1}`);

  const statusBadge = h('span', null);
  const doneButton = h('button', { class: 'btn btn--block btn--soft', type: 'button', onClick: toggle });

  function sync() {
    const done = isLessonDone(getState(), lesson.id);
    mount(statusBadge, done ? badge('Ukończona', { accent: true }) : badge('Do zrobienia'));
    doneButton.className = `btn btn--block ${done ? 'btn--secondary' : 'btn--soft'}`;
    mount(
      doneButton,
      done ? icon('check', 20) : null,
      done ? 'Ukończona — cofnij' : 'Oznacz jako ukończoną',
    );
  }

  function toggle() {
    setLessonDone(lesson.id, !isLessonDone(getState(), lesson.id));
    sync();
  }

  sync();

  const pill = h('aside', { class: 'pill-card', 'aria-label': 'Pigułka wiedzy' },
    h('span', { class: 'pill-card__icon' }, icon('pill', 22)),
    h('div', null,
      h('p', { class: 'pill-card__label' }, 'Pigułka wiedzy'),
      h('p', { class: 'pill-card__text' }, lesson.pill)));

  const toc = h('nav', { class: 'toc', 'aria-label': 'Spis treści lekcji' },
    h('details', { open: true },
      h('summary', null,
        icon('list', 20),
        h('span', null, 'Spis treści'),
        h('span', { class: 'toc__count' }, String(lesson.sections.length))),
      h('ol', { class: 'toc__list' },
        lesson.sections.map((section, i) => h('li', null,
          h('button', { class: 'toc__link', type: 'button', onClick: () => scrollToSection(sectionIds[i]) },
            h('span', { class: 'toc__num', 'aria-hidden': 'true' }, String(i + 1)),
            section.title))))));

  const article = h('article', { class: 'prose', 'aria-label': 'Treść lekcji' },
    lesson.sections.map((section, i) => renderSection(section, sectionIds[i])));

  const pager = h('nav', { class: 'lesson-pager', 'aria-label': 'Nawigacja między lekcjami' },
    prev && h('a', { class: 'btn btn--secondary', href: `#/kurs/${module.id}/lekcja/${prev.id}` },
      icon('chevronLeft', 20), 'Poprzednia'),
    next
      ? h('a', { class: 'btn btn--secondary', href: `#/kurs/${module.id}/lekcja/${next.id}` },
          'Następna', icon('chevronRight', 20))
      : h('a', { class: 'btn btn--soft', href: `#/kurs/${module.id}/quiz` },
          'Quiz modułu', icon('chevronRight', 20)));

  return screen(
    backLink(`#/kurs/${module.id}`, `Moduł ${module.order}`),
    screenHead({
      eyebrow: `Lekcja ${lesson.order} z ${module.lessons.length} · Moduł ${module.order}`,
      title: lesson.title,
    }),
    h('div', { class: 'lesson-meta' },
      statusBadge,
      h('span', { class: 'badge' }, icon('clock', 12), `ok. ${lesson.minutes} min`)),
    pill,
    toc,
    article,
    quizCard(module, lesson),
    doneButton,
    pager);
}

function quizCard(module, lesson) {
  const state = getState();
  const quiz = lesson.quiz;
  const total = quiz.questions.length;
  const answered = hasQuizResult(state, quiz);
  const passed = isQuizPassed(state, quiz);

  return h('section', { class: 'card quiz-cta', 'aria-label': 'Quiz do lekcji' },
    h('div', { class: 'card__head' },
      h('h2', { class: 'card__title' }, 'Sprawdź się'),
      passed
        ? badge(`Zaliczony · ${bestCorrect(state, quiz)}/${total}`, { accent: true })
        : answered ? badge(`Najlepszy wynik ${bestCorrect(state, quiz)}/${total}`) : null),
    h('p', { class: 'screen-lead' },
      `${total} ${plural(total, 'pytanie', 'pytania', 'pytań')} z wyjaśnieniami. `
      + `Zaliczenie od ${passCount(quiz)}/${total} oznacza lekcję jako ukończoną.`),
    h('a', { class: 'btn btn--block', href: `#/kurs/${module.id}/lekcja/${lesson.id}/quiz` },
      icon('quiz', 20), answered ? 'Powtórz quiz' : 'Zacznij quiz'));
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  const heading = target.querySelector('h2');
  if (heading) heading.focus({ preventScroll: true });
}

function missingLesson(moduleId) {
  return screen(
    backLink(moduleId ? `#/kurs/${moduleId}` : '#/kurs', 'Wróć'),
    emptyState({
      icon: 'alert',
      heading: 'h1',
      title: 'Nie ma takiej lekcji',
      text: 'Wróć do modułu i wybierz lekcję jeszcze raz.',
      action: { label: 'Wszystkie moduły', href: '#/kurs' },
    }));
}
