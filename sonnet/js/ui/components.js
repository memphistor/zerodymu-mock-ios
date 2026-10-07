/** Małe, powtarzalne elementy UI współdzielone między ekranami. */

import { h } from '../dom.js';
import { icon } from './icons.js';

/** Korzeń ekranu: pionowy stos z równymi odstępami. */
export function screen(...children) {
  return h('div', { class: 'stack' }, children);
}

export function screenHead({ eyebrow, title, lead }) {
  return h('header', { class: 'screen-head' },
    eyebrow && h('p', { class: 'eyebrow' }, eyebrow),
    h('h1', { class: 'screen-title', tabindex: '-1' }, title),
    lead && h('p', { class: 'screen-lead' }, lead));
}

export function backLink(href, label) {
  return h('a', { class: 'back-link', href }, icon('chevronLeft', 20), label);
}

export function progressBar(percent, label) {
  const value = Math.max(0, Math.min(100, percent));
  const bar = h('span', { class: 'progress__bar' });
  bar.style.width = `${value}%`;
  return h('div', {
    class: 'progress',
    role: 'progressbar',
    'aria-label': label,
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    'aria-valuenow': String(value),
  }, bar);
}

export function badge(text, { accent = false } = {}) {
  return h('span', { class: `badge${accent ? ' badge--accent' : ''}` }, text);
}

/**
 * Wiersz listy: status (kółko) + tytuł/meta + chevron.
 * locked: wizualna kłódka i przyciemnienie (wiersz nadal jest klikalny — locki są w kroku 2 tylko wizualne).
 */
export function listRow({ href, title, meta, iconName, done = false, locked = false }) {
  const statusIcon = done ? 'check' : locked ? 'lock' : iconName;
  const content = [
    h('span', { class: `row__status${done ? ' is-done' : ''}`, 'aria-hidden': 'true' }, icon(statusIcon, 18)),
    h('span', { class: 'row__body' },
      h('span', { class: 'row__title' }, title),
      meta && h('span', { class: 'row__meta' }, meta)),
    h('span', { class: 'row__chevron' }, icon('chevronRight', 20)),
  ];
  return h('a', { class: `row${locked ? ' row--locked' : ''}`, href }, content);
}

const STATUS_LABELS = {
  locked: 'Zablokowany',
  new: 'Do rozpoczęcia',
  progress: 'W trakcie',
  done: 'Ukończony',
};

/** Plakietka statusu modułu: locked | new | progress | done. */
export function statusBadge(status) {
  const withIcon = status === 'locked' || status === 'done';
  return h('span', { class: `badge badge--status badge--${status}` },
    withIcon && icon(status === 'locked' ? 'lock' : 'check', 12),
    STATUS_LABELS[status]);
}

/** Spokojna informacja w treści ekranu (np. wizualny lock). */
export function notice(text, iconName = 'info') {
  return h('div', { class: 'notice', role: 'note' },
    h('span', { class: 'notice__icon' }, icon(iconName, 20)),
    h('p', null, text));
}

export function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
      .format(new Date(iso));
  } catch {
    return iso;
  }
}

export function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (n === 1) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}
