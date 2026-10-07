/**
 * Ekran modułu: cele, lista lekcji, wejście w quiz modułu.
 * Krok 2: moduł 1 pokazuje prawdziwe lekcje, moduły 2–6 — zarys z notką „wkrótce".
 */

import { h } from '../dom.js';
import { getModule, isModuleReady, moduleQuizId } from '../data/course.js';
import { moduleProgress, isLessonComplete, isQuizPassed, rememberVisit } from '../logic/progress.js';
import { moduleQuizLock, lessonLock } from '../logic/locks.js';
import {
  screenHeader, section, card, listItem, progressBar, badge, button, lockBadge, comingSoonCard,
} from '../ui/components.js';
import { emptyState } from '../ui/states.js';
import { icon } from '../ui/icons.js';

export default function moduleView({ moduleId }) {
  const module = getModule(moduleId);

  if (!module) {
    return emptyState({
      icon: 'alert',
      heading: 'h1',
      title: 'Nie ma takiego modułu',
      text: 'Ten adres nie prowadzi do żadnego modułu w kursie.',
      action: { label: 'Wróć do kursu', href: '#/kurs' },
    });
  }

  const progress = moduleProgress(module.id);
  const ready = isModuleReady(module.id);
  rememberVisit(module.id);

  const minutes = module.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
  const firstLesson = module.lessons.find((lesson) => !isLessonComplete(lesson.id)) || module.lessons[0];
  const quizLock = moduleQuizLock(module.id);
  const quizPassed = isQuizPassed(moduleQuizId(module.id), 0.6);

  return h('div', { class: 'stack stack--lg' },
    screenHeader({
      back: { href: '#/kurs' },
      eyebrow: `Moduł ${module.number} z 6`,
      title: module.title,
      subtitle: module.lead,
      aside: progress.complete
        ? badge('Ukończony', 'success', 'check')
        : (!ready ? badge('Wkrótce', 'soon') : null),
    }),

    h('div', { class: 'module-card__meta' },
      icon('doc', 15), `${module.lessons.length} lekcji`,
      icon('play', 15), `~${minutes} min`,
      !ready && h('span', {}, badge('Treść w kroku 3', 'muted'))),

    progressBar(progress.ratio, { label: `Postęp modułu (${progress.done}/${progress.total})` }),

    section({ title: 'Czego się nauczysz' },
      card({ tone: 'soft' },
        h('ul', { class: 'goal-list' },
          module.goals.map((goal) => h('li', {}, icon('check', 16), h('span', {}, goal)))))),

    !ready && comingSoonCard('Ten moduł ma na razie tylko tytuły lekcji. Pełna treść pojawi się w kolejnym kroku — możesz go spokojnie przejrzeć.'),

    section({ title: 'Lekcje' },
      h('div', { class: 'list' }, module.lessons.map((lesson, index) => lessonRow(module, lesson, index)))),

    section({ title: 'Sprawdzenie wiedzy' },
      card({ class: quizLock.locked ? 'is-locked' : '' },
        h('div', { class: 'module-card__top' },
          h('span', { class: 'list-item__icon' }, icon('target', 20)),
          h('span', { class: 'module-card__head' },
            h('span', { class: 'module-card__title' }, `Quiz modułu ${module.number}`),
            h('span', { class: 'module-card__lead' },
              ready
                ? '5 pytań, zaliczenie od 3. Wynik zapisuje się na tym urządzeniu.'
                : '5 pytań-placeholderów — prawdziwe dojdą razem z treścią modułu.')),
          quizPassed ? badge('Zaliczony', 'success', 'check') : lockBadge(quizLock)),
        h('div', { class: 'btn-row' },
          button({ label: 'Otwórz quiz', variant: 'soft', icon: 'arrow', href: `#/kurs/${module.id}/quiz` })))),

    h('div', { class: 'lesson-actions' },
      button({
        label: progress.done > 0 && !progress.complete ? 'Kontynuuj moduł' : 'Zacznij pierwszą lekcję',
        variant: 'primary',
        icon: 'play',
        block: true,
        href: `#/kurs/${module.id}/lekcja/${firstLesson.id}`,
      })));
}

function lessonRow(module, lesson, index) {
  const done = isLessonComplete(lesson.id);
  const lock = lessonLock(module.id, lesson.id);
  const ready = !lesson.placeholder;

  return listItem({
    leading: h('span', { class: 'list-item__icon' }, done ? icon('check', 20) : String(index + 1)),
    title: lesson.title,
    description: ready
      ? `${lesson.minutes} min · ${lesson.sections.length} sekcje`
      : `${lesson.minutes} min · treść wkrótce`,
    href: `#/kurs/${module.id}/lekcja/${lesson.id}`,
    disabled: false,
    trailing: done
      ? badge('Gotowe', 'success')
      : (lock.locked ? lockBadge(lock) : (ready ? h('span', {}, icon('arrow', 18)) : badge('Wkrótce', 'soon'))),
  });
}
