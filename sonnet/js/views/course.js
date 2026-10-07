import { h } from '../dom.js';
import { getState } from '../store.js';
import { MODULES, EXAM, TOTAL_MINUTES, passCount } from '../data/course.js';
import { courseStats, moduleStats, bestCorrect, hasQuizResult, isQuizPassed } from '../logic/progress.js';
import { moduleStatus, moduleLock, examLock } from '../logic/locks.js';
import { screen, screenHead, progressBar, badge, statusBadge, plural } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { emptyState } from '../ui/states.js';

export default function courseView() {
  const state = getState();
  const stats = courseStats(state);

  const head = screenHead({
    eyebrow: 'ZeroDymu',
    title: 'Kurs',
    lead: 'Rzucanie palenia małymi krokami: Kaizen, Ikigai i konkretny plan. Masz dostęp do wszystkiego.',
  });

  if (MODULES.length === 0) {
    return screen(head, emptyState({
      icon: 'book',
      title: 'Kurs jest w przygotowaniu',
      text: 'Moduły pojawią się tutaj, gdy będą gotowe.',
    }));
  }

  const summary = h('section', { class: 'card summary-card', 'aria-label': 'Twój postęp w kursie' },
    h('div', { class: 'summary-card__top' },
      h('div', null,
        h('p', { class: 'summary-card__value' }, `${stats.modulesComplete} / ${stats.modulesTotal}`),
        h('p', { class: 'summary-card__label' }, 'ukończonych modułów')),
      badge(`${stats.lessonsDone} z ${stats.lessonsTotal} lekcji`, { accent: true })),
    progressBar(stats.percent, 'Postęp w całym kursie'),
    h('p', { class: 'summary-card__label' }, `Łącznie około ${TOTAL_MINUTES} minut czytania i quizy.`));

  const list = h('ul', { class: 'module-list' },
    MODULES.map((module) => h('li', null, moduleCard(state, module))));

  return screen(
    head,
    summary,
    h('section', { 'aria-label': 'Moduły kursu' }, list),
    examCard(state),
    h('p', { class: 'fineprint' }, 'Kurs ma charakter edukacyjny i nie zastępuje porady lekarza.'));
}

function moduleCard(state, module) {
  const stats = moduleStats(state, module);
  const status = moduleStatus(state, module);
  const lock = moduleLock(state, module);
  const locked = status === 'locked';

  return h('a', { class: `card card--link${locked ? ' card--locked' : ''}`, href: `#/kurs/${module.id}` },
    h('span', { class: 'module-card__num', 'aria-hidden': 'true' },
      locked ? icon('lock', 20) : String(module.order)),
    h('span', { class: 'module-card__body' },
      h('span', { class: 'module-card__title' }, `${module.order}. ${module.title}`),
      h('span', { class: 'module-card__summary' }, module.summary),
      h('span', { class: 'module-card__meta' },
        statusBadge(status),
        h('span', null,
          `${stats.lessonsDone}/${stats.lessonsTotal} ${plural(stats.lessonsTotal, 'lekcja', 'lekcje', 'lekcji')} · ok. ${module.minutes} min`)),
      locked && h('span', { class: 'module-card__reason' }, lock.reason),
      progressBar(stats.percent, `Postęp modułu ${module.order}`)),
    h('span', { class: 'module-card__chevron' }, icon('chevronRight', 20)));
}

function examCard(state) {
  const lock = examLock(state);
  const total = EXAM.questions.length;
  const passed = isQuizPassed(state, EXAM);
  const best = bestCorrect(state, EXAM);

  let status;
  if (lock.locked) status = statusBadge('locked');
  else if (passed) status = badge(`Zaliczony · ${best}/${total}`, { accent: true });
  else if (hasQuizResult(state, EXAM)) status = badge(`Najlepszy wynik ${best}/${total}`);
  else status = badge('Do rozwiązania');

  return h('a', { class: `card card--link${lock.locked ? ' card--locked' : ''}`, href: '#/kurs/egzamin' },
    h('span', { class: 'module-card__num module-card__num--exam', 'aria-hidden': 'true' },
      icon(lock.locked ? 'lock' : 'trophy', 22)),
    h('span', { class: 'module-card__body' },
      h('span', { class: 'module-card__title' }, EXAM.title),
      h('span', { class: 'module-card__summary' },
        `${total} pytań z całego kursu. Zaliczenie od ${passCount(EXAM)}/${total}.`),
      h('span', { class: 'module-card__meta' }, status),
      lock.locked && h('span', { class: 'module-card__reason' }, lock.reason)),
    h('span', { class: 'module-card__chevron' }, icon('chevronRight', 20)));
}
