/**
 * Ekran „Kurs": pasek podsumowania, lista 6 modułów i karta egzaminu.
 * Krok 2: moduł 1 ma pełną treść, moduły 2–6 są oznaczone jako placeholdery,
 * a kolejność podpowiadają wizualne locki (bez blokowania).
 */

import { h } from '../dom.js';
import { MODULES, EXAM, TOTAL_MODULES, isModuleReady } from '../data/course.js';
import { courseProgress, moduleProgress, isQuizPassed } from '../logic/progress.js';
import { moduleLock, examLock } from '../logic/locks.js';
import {
  screenHeader, section, card, cardLink, progressBar, badge, button, lockBadge,
} from '../ui/components.js';
import { icon } from '../ui/icons.js';

export default function courseView() {
  const progress = courseProgress();
  const exam = examLock();

  return h('div', { class: 'stack stack--lg' },
    screenHeader({
      eyebrow: 'ZeroDymu',
      title: 'Twój kurs',
      subtitle: 'Każda zmiana zaczyna się od małego kroku.',
    }),

    h('div', { class: 'course-summary' },
      summaryItem('Moduły', `${progress.completedModules}/${progress.totalModules}`),
      summaryItem('Lekcje', `${progress.doneLessons}/${progress.totalLessons}`),
      summaryItem('Postęp', `${Math.round(progress.ratio * 100)}%`)),

    card({ tone: 'accent' },
      h('div', { class: 'row row--between' },
        h('div', {},
          h('p', { class: 'card__title' }, 'Pełny dostęp'),
          h('p', { class: 'card__text' }, 'Jesteś kursantem od pierwszego uruchomienia — bez opłat i blokad.')),
        icon('sparkle', 26))),

    card({ tone: 'soft' },
      h('p', { class: 'card__title' }, 'Krok 2 — treść; locki w kroku 3'),
      h('p', { class: 'card__text' },
        'Moduł 1 ma już pełną treść i prawdziwe quizy. Moduły 2–6 to na razie zarys — ' +
        'czekają na treść w kolejnym kroku. Kłódki pokazują kolejność, ale niczego nie blokują.')),

    section({ title: 'Moduły', description: 'Kolejność podpowiadają kłódki — wszystko da się otworzyć.' },
      h('div', { class: 'module-list' }, MODULES.map(moduleCard))),

    section({ title: 'Podsumowanie' }, examCard(exam)),

    h('p', { class: 'muted' },
      'Treść ma charakter edukacyjny i nie zastępuje porady lekarza.'));
}

function summaryItem(label, value) {
  return h('div', { class: 'course-summary__item' },
    h('span', { class: 'course-summary__value' }, value),
    h('span', { class: 'course-summary__label' }, label));
}

function moduleCard(module) {
  const progress = moduleProgress(module.id);
  const lock = moduleLock(module.id);
  const minutes = module.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
  const ready = isModuleReady(module.id);

  return h('a', {
    class: `card card--interactive module-card${lock.locked && ready ? ' is-locked' : ''}`,
    href: `#/kurs/${module.id}`,
  },
    h('div', { class: 'module-card__top' },
      h('span', { class: 'module-card__num' }, String(module.number)),
      h('span', { class: 'module-card__head' },
        h('span', { class: 'module-card__title' }, module.title),
        h('span', { class: 'module-card__lead' }, module.lead)),
      moduleStatusBadge(progress, lock, ready)),

    h('div', { class: 'module-card__meta' },
      icon('doc', 15), `${module.lessons.length} lekcji`,
      icon('play', 15), `~${minutes} min`),

    progressBar(progress.ratio, { label: 'Postęp modułu' }));
}

function moduleStatusBadge(progress, lock, ready) {
  if (progress.complete) return badge('Ukończony', 'success', 'check');
  if (progress.done > 0) return badge('W toku', 'accent');
  // Brak treści jest ważniejszą informacją niż kolejność — inaczej wszystkie
  // moduły-placeholdery pokazywałyby tylko kłódkę.
  if (!ready) return badge('Wkrótce', 'soon');
  if (lock.locked) return lockBadge(lock);
  return badge('Do zrobienia', 'muted');
}

function examCard(lock) {
  const passed = isQuizPassed(EXAM.id, EXAM.passedRatio);

  return cardLink({ href: '#/kurs/egzamin', tone: 'default' },
    h('div', { class: 'module-card__top' },
      h('span', { class: 'list-item__icon' }, icon('target', 20)),
      h('span', { class: 'module-card__head' },
        h('span', { class: 'module-card__title' }, EXAM.title),
        h('span', { class: 'module-card__lead' }, EXAM.lead)),
      passed ? badge('Zaliczony', 'success', 'check') : (lock.locked ? lockBadge(lock) : badge('Gotowy', 'accent'))),
    h('div', { class: 'btn-row' },
      button({ label: 'Zobacz egzamin', variant: 'soft', icon: 'arrow' })));
}
