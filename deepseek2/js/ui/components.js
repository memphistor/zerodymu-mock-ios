/**
 * Elementy wielokrotnego użytku: nagłówki, karty, listy, pasek postępu, badge,
 * przyciski, pigułka wiedzy. Wszystko budowane przez `h()` (bez innerHTML).
 */

import { h } from '../dom.js';
import { icon } from './icons.js';

/** Nagłówek ekranu: opcjonalny „wstecz”, nadtytuł, tytuł, podtytuł. */
export function screenHeader({ back, eyebrow, title, subtitle, heading = 'h1', aside }) {
  return h('header', { class: 'screen-header' },
    back && h('a', { class: 'link-back', href: back.href, onClick: back.onClick },
      icon('back', 20), back.label || 'Wróć'),
    h('div', { class: 'screen-header__row' },
      h('div', { class: 'screen-header__text' },
        eyebrow && h('p', { class: 'eyebrow' }, eyebrow),
        h(heading, { class: 'screen-title' }, title),
        subtitle && h('p', { class: 'screen-subtitle' }, subtitle)),
      aside));
}

/** Karta: `tone` zmienia tło (default | soft | accent). */
export function card({ tone = 'default', interactive = false, padded = true, class: extraClass = '' } = {}, ...children) {
  const Tag = interactive ? 'a' : 'section';
  return h(Tag, {
    class: `card card--${tone}${interactive ? ' card--interactive' : ''}${padded ? '' : ' card--flush'}${extraClass ? ` ${extraClass}` : ''}`,
  }, children);
}

/** Karta-link (lista modułów, kafelki) — cała powierzchnia klikalna. */
export function cardLink({ href, onClick, tone = 'default', ...rest }, ...children) {
  return h('a', { class: `card card--${tone} card--interactive`, href, onClick, ...rest }, children);
}

/** Pozycja listy: ikona/emoji, tytuł, opis, meta po prawej. */
export function listItem({ icon: iconName, leading, title, description, trailing, href, onClick, disabled = false }) {
  const Tag = href ? 'a' : onClick ? 'button' : 'div';
  return h(Tag, {
    class: `list-item${href || onClick ? ' list-item--interactive' : ''}${disabled ? ' is-disabled' : ''}`,
    href,
    onClick,
    type: Tag === 'button' ? 'button' : null,
  },
    leading || (iconName && h('span', { class: 'list-item__icon' }, icon(iconName, 20))),
    h('span', { class: 'list-item__body' },
      h('span', { class: 'list-item__title' }, title),
      description && h('span', { class: 'list-item__desc' }, description)),
    trailing && h('span', { class: 'list-item__trailing' }, trailing));
}

/** Pasek postępu z etykietą (0–1). */
export function progressBar(value, { label, showPercent = true } = {}) {
  const clamped = Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
  const percent = Math.round(clamped * 100);
  return h('div', { class: 'progress' },
    (label || showPercent) && h('div', { class: 'progress__meta' },
      label && h('span', {}, label),
      showPercent && h('span', { class: 'progress__value' }, `${percent}%`)),
    h('div', {
      class: 'progress__track',
      role: 'progressbar',
      'aria-valuenow': percent,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      'aria-label': label || 'Postęp',
    }, h('div', { class: 'progress__fill', style: { width: `${percent}%` } })));
}

/** Niewielki znacznik stanu (np. „Gotowe”, „Wkrótce”, „W toku”). */
export function badge(label, tone = 'neutral', iconName) {
  return h('span', { class: `badge badge--${tone}` }, iconName && icon(iconName, 14), label);
}

/** Pigułka wiedzy — jedno zdanie sedna lekcji. */
export function pill(text) {
  return h('p', { class: 'pill' }, icon('sparkle', 18), h('span', {}, text));
}

/** Sekcja z tytułem i opcjonalnym opisem. */
export function section({ title, description, action }, ...children) {
  return h('section', { class: 'section' },
    (title || action) && h('div', { class: 'section__head' },
      h('div', {},
        title && h('h2', { class: 'section__title' }, title),
        description && h('p', { class: 'section__desc' }, description)),
      action),
    ...children);
}

/** Przycisk: warianty primary | soft | ghost | danger. */
export function button({ label, variant = 'primary', icon: iconName, onClick, href, type = 'button', disabled = false, block = false, ...rest }) {
  const content = [iconName && icon(iconName, 19), label];
  const className = `btn btn--${variant}${block ? ' btn--block' : ''}`;
  return href
    ? h('a', { class: className, href, onClick, ...rest }, content)
    : h('button', { class: className, type, onClick, disabled, ...rest }, content);
}

/** Wiersz ustawienia: etykieta + kontrolka po prawej (np. przełącznik). */
export function settingRow({ label, hint, control }) {
  return h('div', { class: 'setting-row' },
    h('div', { class: 'setting-row__text' },
      h('span', { class: 'setting-row__label' }, label),
      hint && h('span', { class: 'setting-row__hint' }, hint)),
    h('div', { class: 'setting-row__control' }, control));
}

/** Grupa opcji (segmentowany wybór) — np. motyw. */
export function optionGroup({ name, options, value, onChange }) {
  return h('div', { class: 'option-group', role: 'radiogroup', 'aria-label': name },
    options.map((option) => h('button', {
      class: `option${option.value === value ? ' is-selected' : ''}`,
      type: 'button',
      role: 'radio',
      'aria-checked': option.value === value ? 'true' : 'false',
      onClick: () => onChange(option.value),
    },
      h('span', { class: 'option__label' }, option.label),
      option.hint && h('span', { class: 'option__hint' }, option.hint))));
}

/** Znacznik „placeholder / wkrótce” dla treści, która dopiero powstanie. */
export function placeholderNote(text = 'Treść tego ekranu pojawi się w kolejnym kroku.') {
  return h('p', { class: 'placeholder-note' }, icon('doc', 18), h('span', {}, text));
}

/**
 * Wizualny znacznik zamknięcia (krok 2 — locki są tylko wizualne).
 * Nic nie blokuje: pokazuje kolejność i powód. `lock` pochodzi z js/logic/locks.js.
 */
export function lockBadge(lock, { label = 'Podgląd' } = {}) {
  if (!lock || !lock.locked) return null;
  const title = lock.unlock ? `${lock.reason} Odblokuje: ${lock.unlock}.` : lock.reason;
  return h('span', { class: 'badge badge--lock', title },
    icon('lock', 13), label);
}

/** Karta z informacją, że treść jest jeszcze placeholderem. */
export function comingSoonCard(text) {
  return h('div', { class: 'coming-soon' },
    icon('doc', 18),
    h('span', {}, text || 'Treść tego modułu pojawi się w kolejnym kroku.'));
}
