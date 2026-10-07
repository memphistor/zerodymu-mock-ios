import { h } from '../dom.js';
import { getState } from '../store.js';
import { getModule, passCount } from '../data/course.js';
import {
  isLessonDone, moduleStats, visit, hasQuizResult, isQuizPassed, bestCorrect,
} from '../logic/progress.js';
import { moduleLock, moduleQuizLock, moduleStatus } from '../logic/locks.js';
import {
  screen, screenHead, backLink, listRow, progressBar, statusBadge, notice, plural,
} from '../ui/components.js';
import { emptyState } from '../ui/states.js';

export default function moduleView({ moduleId }) {
  const module = getModule(moduleId);
  if (!module) return missingModule();

  visit(module.id);
  const state = getState();
  const stats = moduleStats(state, module);
  const lock = moduleLock(state, module);

  const progress = h('section', { class: 'card summary-card', 'aria-label': 'Postęp modułu' },
    h('div', { class: 'summary-card__top' },
      h('div', null,
        h('p', { class: 'summary-card__value' }, `${stats.stepsDone} / ${stats.stepsTotal}`),
        h('p', { class: 'summary-card__label' }, 'kroków: lekcje i quiz modułu')),
      statusBadge(moduleStatus(state, module))),
    progressBar(stats.percent, `Postęp modułu ${module.order}`),
    h('p', { class: 'summary-card__label' },
      `${stats.lessonsTotal} ${plural(stats.lessonsTotal, 'lekcja', 'lekcje', 'lekcji')} · ok. ${module.minutes} min`));

  const goals = h('section', { class: 'card', 'aria-label': 'Czego się nauczysz' },
    h('h2', { class: 'card__title' }, 'Czego się nauczysz'),
    h('ul', { class: 'prose__list' }, module.goals.map((goal) => h('li', null, goal))));

  const lessons = h('section', { class: 'section' },
    h('h2', { class: 'section-title' }, 'Lekcje'),
    h('ul', { class: 'row-list' },
      module.lessons.map((lesson) => h('li', null, listRow({
        href: `#/kurs/${module.id}/lekcja/${lesson.id}`,
        title: `${lesson.order}. ${lesson.title}`,
        meta: lessonMeta(state, lesson),
        iconName: 'lesson',
        done: isLessonDone(state, lesson.id),
      })))));

  return screen(
    backLink('#/kurs', 'Kurs'),
    screenHead({ eyebrow: `Moduł ${module.order}`, title: module.title, lead: module.summary }),
    lock.locked && notice(`${lock.reason} Na razie możesz go swobodnie przejrzeć.`, 'lock'),
    progress,
    goals,
    lessons,
    quizSection(state, module));
}

function lessonMeta(state, lesson) {
  const parts = [`ok. ${lesson.minutes} min`];
  if (hasQuizResult(state, lesson.quiz)) {
    parts.push(`quiz ${bestCorrect(state, lesson.quiz)}/${lesson.quiz.questions.length}`);
  }
  return parts.join(' · ');
}

function quizSection(state, module) {
  const quiz = module.quiz;
  const total = quiz.questions.length;
  const lock = moduleQuizLock(state, module);
  const passed = isQuizPassed(state, quiz);

  let meta;
  if (passed) meta = `Zaliczony · ${bestCorrect(state, quiz)}/${total}`;
  else if (hasQuizResult(state, quiz)) meta = `Najlepszy wynik ${bestCorrect(state, quiz)}/${total} · wymagane ${passCount(quiz)}/${total}`;
  else meta = `${total} pytań · zaliczenie od ${passCount(quiz)}/${total}`;
  if (lock.locked) meta = `${meta} · ${lock.reason}`;

  return h('section', { class: 'section' },
    h('h2', { class: 'section-title' }, 'Sprawdź wiedzę'),
    listRow({
      href: `#/kurs/${module.id}/quiz`,
      title: quiz.title,
      meta,
      iconName: 'quiz',
      done: passed,
      locked: lock.locked,
    }));
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
