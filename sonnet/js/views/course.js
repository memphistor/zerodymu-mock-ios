import { h } from '../dom.js';
import { getState } from '../store.js';
import { MODULES } from '../data/course.js';
import { courseStats, moduleStats } from '../logic/progress.js';
import { screen, screenHead, progressBar, badge, plural } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { emptyState } from '../ui/states.js';

export default function courseView() {
  const state = getState();
  const stats = courseStats(state);

  const head = screenHead({
    eyebrow: 'ZeroDymu',
    title: 'Kurs',
    lead: 'Sześć modułów we własnym tempie. Masz pełny dostęp do wszystkich.',
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
    progressBar(stats.percent, 'Postęp lekcji w całym kursie'));

  const list = h('ul', { class: 'module-list' },
    MODULES.map((module) => h('li', null, moduleCard(module, moduleStats(state, module)))));

  return screen(head, summary, h('section', { 'aria-label': 'Moduły kursu' }, list));
}

function moduleCard(module, stats) {
  return h('a', { class: 'card card--link', href: `#/kurs/${module.id}` },
    h('span', { class: 'module-card__num', 'aria-hidden': 'true' }, String(module.order)),
    h('span', { class: 'module-card__body' },
      h('span', { class: 'module-card__title' }, module.title),
      h('span', { class: 'module-card__summary' }, module.summary),
      h('span', { class: 'module-card__meta' },
        progressBar(stats.percent, `Postęp modułu ${module.order}`),
        stats.complete
          ? badge('Ukończony', { accent: true })
          : h('span', null, `${stats.done}/${stats.total} ${plural(stats.total, 'lekcja', 'lekcje', 'lekcji')}`))),
    h('span', { class: 'module-card__chevron' }, icon('chevronRight', 20)));
}
