/**
 * Podstawowe stany interfejsu: ładowanie / błąd / pusto.
 * Każda funkcja zwraca gotowy węzeł DOM.
 */

import { h } from '../dom.js';
import { icon } from './icons.js';

/** Szkielet ładowania. variant: 'page' (tytuł + karty) | 'inline' (kilka linii). */
export function loadingState({ label = 'Ładowanie…', variant = 'page' } = {}) {
  const blocks = variant === 'inline'
    ? [
        h('div', { class: 'skeleton skeleton--line skeleton--w70' }),
        h('div', { class: 'skeleton skeleton--line' }),
        h('div', { class: 'skeleton skeleton--line skeleton--w85' }),
      ]
    : [
        h('div', { class: 'skeleton skeleton--title' }),
        h('div', { class: 'skeleton skeleton--card' }),
        h('div', { class: 'skeleton skeleton--card' }),
      ];
  return h('div', { class: 'state state--loading', role: 'status' },
    h('span', { class: 'sr-only' }, label),
    blocks);
}

/**
 * Stan pusty.
 * action: { label, href } lub { label, onClick }
 */
export function emptyState({ icon: iconName = 'leaf', title, text, action, compact = false, heading = 'h2' }) {
  return h('div', { class: `state state--empty${compact ? ' state--compact' : ''}` },
    h('div', { class: 'state__icon' }, icon(iconName, compact ? 24 : 28)),
    h(heading, { class: 'state__title' }, title),
    text && h('p', { class: 'state__text' }, text),
    action && actionButton(action));
}

/** Stan błędu z opcjonalnym „Spróbuj ponownie” i szczegółem technicznym. */
export function errorState({ title = 'Coś poszło nie tak', text = 'Nie udało się wczytać tego ekranu.', onRetry, detail, heading = 'h1' } = {}) {
  return h('div', { class: 'state state--error', role: 'alert' },
    h('div', { class: 'state__icon' }, icon('alert', 28)),
    h(heading, { class: 'state__title' }, title),
    h('p', { class: 'state__text' }, text),
    detail && h('p', { class: 'state__detail' }, String(detail)),
    onRetry && actionButton({ label: 'Spróbuj ponownie', onClick: onRetry, icon: 'refresh' }));
}

function actionButton({ label, href, onClick, icon: iconName }) {
  const content = [iconName && icon(iconName, 20), label];
  return href
    ? h('a', { class: 'btn btn--soft', href }, content)
    : h('button', { class: 'btn btn--soft', type: 'button', onClick }, content);
}
