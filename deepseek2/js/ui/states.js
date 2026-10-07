/**
 * Podstawowe stany interfejsu: ładowanie / błąd / pusto.
 * To nie atrapy — ekrany ładują się leniwie (import()), więc stan ładowania
 * pojawia się naprawdę, a błąd sieci ma prawdziwy komunikat i „Spróbuj ponownie”.
 */

import { h } from '../dom.js';
import { icon } from './icons.js';

/**
 * Szkielet ładowania.
 * @param {{ label?: string, variant?: 'page'|'inline'|'list' }} options
 */
export function loadingState({ label = 'Ładowanie…', variant = 'page' } = {}) {
  const blocks = {
    inline: [
      h('div', { class: 'skeleton skeleton--line skeleton--w70' }),
      h('div', { class: 'skeleton skeleton--line' }),
      h('div', { class: 'skeleton skeleton--line skeleton--w85' }),
    ],
    list: [
      h('div', { class: 'skeleton skeleton--card skeleton--sm' }),
      h('div', { class: 'skeleton skeleton--card skeleton--sm' }),
      h('div', { class: 'skeleton skeleton--card skeleton--sm' }),
      h('div', { class: 'skeleton skeleton--card skeleton--sm' }),
    ],
    page: [
      h('div', { class: 'skeleton skeleton--title' }),
      h('div', { class: 'skeleton skeleton--card' }),
      h('div', { class: 'skeleton skeleton--card' }),
    ],
  }[variant] || [];

  return h('div', { class: `state state--loading state--loading-${variant}`, role: 'status', 'aria-live': 'polite' },
    h('span', { class: 'sr-only' }, label),
    blocks);
}

/**
 * Stan pusty (np. brak nawyków).
 * @param {{ icon?: string, title: string, text?: string, action?: { label: string, href?: string, onClick?: Function }, heading?: 'h1'|'h2'|'h3', compact?: boolean }} options
 */
export function emptyState({ icon: iconName = 'leaf', title, text, action, heading = 'h2', compact = false }) {
  return h('div', { class: `state state--empty${compact ? ' state--compact' : ''}` },
    h('div', { class: 'state__icon' }, icon(iconName, compact ? 22 : 28)),
    h(heading, { class: 'state__title' }, title),
    text && h('p', { class: 'state__text' }, text),
    action && actionButton(action));
}

/** Stan błędu z opcjonalnym „Spróbuj ponownie” i szczegółem technicznym. */
export function errorState({
  title = 'Coś poszło nie tak',
  text = 'Nie udało się wczytać tego ekranu.',
  onRetry,
  retryLabel = 'Spróbuj ponownie',
  detail,
  heading = 'h1',
} = {}) {
  return h('div', { class: 'state state--error', role: 'alert' },
    h('div', { class: 'state__icon' }, icon('alert', 28)),
    h(heading, { class: 'state__title' }, title),
    h('p', { class: 'state__text' }, text),
    detail && h('p', { class: 'state__detail' }, String(detail)),
    onRetry && actionButton({ label: retryLabel, onClick: onRetry, icon: 'refresh' }));
}

/** Dyskretny baner informacyjny (np. praca bez zapisu). */
export function notice(kind, content) {
  return h('div', { class: `notice notice--${kind}` }, icon('info', 18), h('span', {}, content));
}

function actionButton({ label, href, onClick, icon: iconName }) {
  const content = [iconName && icon(iconName, 19), label];
  return href
    ? h('a', { class: 'btn btn--soft', href }, content)
    : h('button', { class: 'btn btn--soft', type: 'button', onClick }, content);
}
