/**
 * Ekran „Panel”: szkic danych kursanta i placeholdery funkcji panelu.
 * Nawyki i dziennik są celowo puste — pokazują stan pusty z jasnym komunikatem,
 * że dodawanie wpisów dojdzie w kolejnym kroku.
 */

import { h } from '../dom.js';
import * as store from '../store.js';
import { MODULES } from '../data/course.js';
import { courseProgress, moduleProgress, nextLesson } from '../logic/progress.js';
import { screenHeader, section, card, cardLink, listItem, button, badge, placeholderNote } from '../ui/components.js';
import { emptyState } from '../ui/states.js';
import { icon } from '../ui/icons.js';

export default function panelView() {
  const state = store.getState();
  const progress = courseProgress();
  const next = nextLesson();

  return h('div', { class: 'stack stack--lg' },
    screenHeader({
      eyebrow: 'Twój dzień',
      title: 'Panel',
      subtitle: 'Krótki podgląd tego, co się dzieje — bez liczenia i oceniania.',
    }),

    h('div', { class: 'stat-grid' },
      stat('Bez dymu od', state.panel.smokeFreeSince ? formatDate(state.panel.smokeFreeSince) : '—', 'calendar'),
      stat('Ukończone lekcje', `${progress.doneLessons}/${progress.totalLessons}`, 'check'),
      stat('Moduły', `${progress.completedModules}/${progress.totalModules}`, 'grid'),
      stat('Nawyki', String(state.panel.habits.length), 'paw')),

    section({ title: 'Następny krok' },
      next
        ? cardLink({ href: `#/kurs/${next.moduleId}/lekcja/${next.lessonId}` },
            h('div', { class: 'module-card__top' },
              h('span', { class: 'list-item__icon' }, icon('play', 20)),
              h('span', { class: 'module-card__head' },
                h('span', { class: 'module-card__title' }, next.lesson.title),
                h('span', { class: 'module-card__lead' },
                  `Moduł ${next.module.number}: ${next.module.title} · ${next.lesson.minutes} min`)),
              h('span', { class: 'list-item__trailing' }, icon('arrow', 18))))
        : card({ tone: 'accent' },
            h('p', { class: 'card__title' }, 'Wszystkie lekcje ukończone'),
            h('p', { class: 'card__text' }, 'Możesz powtórzyć dowolny moduł albo rozwiązać egzamin końcowy.'))),

    section({ title: 'Moje moduły' },
      h('div', { class: 'list' }, MODULES.map((module) => {
        const value = moduleProgress(module.id);
        return listItem({
          leading: h('span', { class: 'list-item__icon' }, String(module.number)),
          title: module.title,
          description: `${value.done}/${value.total} lekcji`,
          href: `#/kurs/${module.id}`,
          trailing: value.complete ? icon('check', 18) : icon('arrow', 18),
        });
      }))),

    section({ title: 'Nawyki' },
      emptyState({
        icon: 'paw',
        heading: 'h3',
        compact: true,
        title: 'Nie masz jeszcze nawyków',
        text: 'Nawyki to małe rzeczy, które robisz regularnie. Dodawanie pojawi się w kolejnym kroku.',
        action: { label: 'Dodaj nawyk', onClick: () => {} },
      })),

    section({ title: 'Dziennik' },
      emptyState({
        icon: 'doc',
        heading: 'h3',
        compact: true,
        title: 'Dziennik jest pusty',
        text: 'Zapiski pomagają zauważyć, co się zmienia. Wpisy dojdą w kolejnym kroku.',
        action: { label: 'Dodaj wpis', onClick: () => {} },
      })),

    placeholderNote('Panel pokazuje na razie dane z kursu i puste stany nawyków oraz dziennika. Pełna edycja danych pojawi się w kolejnym kroku.'),

    h('div', { class: 'btn-row' },
      button({ label: 'Ustawienia', variant: 'soft', icon: 'sliders', href: '#/ustawienia' }),
      badge('Bez opłat', 'accent', 'sparkle')));
}

function stat(label, value, iconName) {
  return h('div', { class: 'stat' },
    h('span', { class: 'stat__icon' }, icon(iconName, 18)),
    h('span', { class: 'stat__value' }, value),
    h('span', { class: 'stat__label' }, label));
}

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long' }).format(new Date(iso));
  } catch {
    return '—';
  }
}
