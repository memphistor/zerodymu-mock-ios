/**
 * Locki — krok 2: tylko wizualne i minimalne.
 *
 * Funkcje mówią, czy element WYGLĄDA na zablokowany (kłódka, przyciemnienie, powód).
 * Niczego nie blokują: wszystko da się otworzyć i przejrzeć. Pełna logika
 * (egzekwowanie kolejności, zasady odblokowania) dojdzie w kroku 3.
 */

import { MODULES, EXAM } from '../data/course.js';
import { moduleStats, hasQuizResult } from './progress.js';

const OPEN = { locked: false, reason: '' };

/** Moduł N wygląda na zamknięty, dopóki nie ukończysz N−1 (chyba że już go zacząłeś). */
export function moduleLock(state, module) {
  if (module.order === 1) return OPEN;
  if (moduleStats(state, module).started) return OPEN;
  const prev = MODULES[module.order - 2];
  if (moduleStats(state, prev).complete) return OPEN;
  return { locked: true, reason: `Odblokuje się po ukończeniu modułu ${prev.order}.` };
}

/** Quiz modułu wygląda na zamknięty do czasu ukończenia wszystkich lekcji. */
export function moduleQuizLock(state, module) {
  const stats = moduleStats(state, module);
  if (stats.lessonsDone === stats.lessonsTotal || hasQuizResult(state, module.quiz)) return OPEN;
  return { locked: true, reason: 'Odblokuje się po ukończeniu wszystkich lekcji modułu.' };
}

/** Egzamin wygląda na zamknięty do czasu ukończenia wszystkich modułów. */
export function examLock(state) {
  if (hasQuizResult(state, EXAM)) return OPEN;
  if (MODULES.every((m) => moduleStats(state, m).complete)) return OPEN;
  return { locked: true, reason: 'Odblokuje się po ukończeniu wszystkich modułów.' };
}

/** 'locked' | 'new' | 'progress' | 'done' — do plakietek statusu na liście modułów. */
export function moduleStatus(state, module) {
  const stats = moduleStats(state, module);
  if (stats.complete) return 'done';
  if (stats.started) return 'progress';
  return moduleLock(state, module).locked ? 'locked' : 'new';
}
