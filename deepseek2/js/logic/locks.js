/**
 * Locki — NA RAZIE TYLKO WIZUALNE (krok 2). Pełna logika w kroku 3.
 *
 * Zasady są zdefiniowane, ale niczego nie blokują: `LOCK_MODE = 'visual-only'`
 * sprawia, że każdy moduł, lekcja i quiz pozostają otwarte i klikalne. Interfejs
 * pokazuje jedynie podpowiedź o kolejności (ikona, przyciemnienie, powód).
 *
 * Gdy w kroku 3 włączymy egzekwowanie, wystarczy zmienić LOCK_MODE na 'enforced'
 * i skorzystać z `isLocked()` w widokach — sam mechanizm jest już gotowy.
 */

import { MODULES } from '../data/course.js';
import { isLessonComplete, moduleProgress, isQuizPassed } from './progress.js';

export const LOCK_MODE = 'visual-only';

/**
 * @typedef {Object} Lock
 * @property {boolean} locked     czy pokazywać kłódkę (w trybie visual-only nie blokuje kliknięcia)
 * @property {string} reason      krótkie wyjaśnienie po polsku
 * @property {string|null} unlock co odblokowuje (do pokazania w interfejsie)
 */

/** Czy element jest „wizualnie" zamknięty. W trybie visual-only zawsze zwraca lock z powodem. */
export function isLocked(lock) {
  return LOCK_MODE === 'enforced' ? bookkeeping(lock) : lock.locked;
}

function bookkeeping(lock) {
  return lock.locked;
}

/** Lock modułu: N wygląda na zamknięty, dopóki moduł N−1 nie jest ukończony. */
export function moduleLock(moduleId) {
  const index = MODULES.findIndex((module) => module.id === moduleId);
  if (index <= 0) return unlocked();

  const previous = MODULES[index - 1];
  if (moduleProgress(previous.id).complete) return unlocked();

  return {
    locked: true,
    reason: `Najpierw ukończ moduł ${previous.number}: „${previous.title}".`,
    unlock: `${previous.lessons.length} lekcji modułu ${previous.number}`,
  };
}

/** Lock lekcji: kolejna lekcja „domyka się" dopiero po poprzedniej. */
export function lessonLock(moduleId, lessonId) {
  const module = MODULES.find((item) => item.id === moduleId);
  if (!module) return unlocked();

  const index = module.lessons.findIndex((lesson) => lesson.id === lessonId);
  if (index <= 0) return unlocked();

  const previous = module.lessons[index - 1];
  if (isLessonComplete(previous.id)) return unlocked();

  return {
    locked: true,
    reason: `Najpierw ukończ lekcję „${previous.title}".`,
    unlock: previous.title,
  };
}

/** Lock quizu modułu: wygląda na zamknięty do ukończenia lekcji modułu. */
export function moduleQuizLock(moduleId) {
  const progress = moduleProgress(moduleId);
  if (progress.complete) return unlocked();

  return {
    locked: true,
    reason: 'Najpierw ukończ wszystkie lekcje tego modułu.',
    unlock: `lekcje (${progress.done}/${progress.total})`,
  };
}

/** Lock quizu lekcji: wygląda na zamknięty do przerobienia samej lekcji. */
export function lessonQuizLock(moduleId, lessonId) {
  if (isQuizPassed(`${lessonId}-quiz`, 0.66)) return unlocked();
  if (isLessonComplete(lessonId)) return unlocked();

  const module = MODULES.find((item) => item.id === moduleId);
  const lesson = module && module.lessons.find((item) => item.id === lessonId);
  return {
    locked: true,
    reason: 'Przejrzyj najpierw lekcję — quiz jest jej podsumowaniem.',
    unlock: lesson ? lesson.title : null,
  };
}

/** Lock egzaminu: wygląda na zamknięty do ukończenia modułów z treścią. */
export function examLock() {
  const ready = MODULES.filter((module) => moduleProgress(module.id).complete);
  if (ready.length === MODULES.length) return unlocked();

  return {
    locked: true,
    reason: 'Egzamin jest podsumowaniem kursu — najpierw przejdź moduły.',
    unlock: `moduły (${ready.length}/${MODULES.length})`,
  };
}

function unlocked() {
  return { locked: false, reason: '', unlock: null };
}
