/**
 * Render treści lekcji: zamienia bloki tekstu na węzły DOM.
 *
 * Obsługiwane bloki:
 *   'akapit'                          → <p>
 *   { ul: [...] } / { ol: [...] }      → lista
 *   { tip: '…' }                       → wskazówka
 *   { note: '…' }                      → „Warto wiedzieć"
 *   { try: '…' }                       → zadanie „Spróbuj dziś"
 *
 * W tekście działa proste **pogrubienie** (podwójne gwiazdki).
 */

import { h } from '../dom.js';
import { icon } from './icons.js';

const BLOCK_META = {
  tip: { className: 'prose-block prose-block--tip', icon: 'sparkle', label: 'Wskazówka' },
  note: { className: 'prose-block prose-block--note', icon: 'info', label: 'Warto wiedzieć' },
  try: { className: 'prose-block prose-block--try', icon: 'target', label: 'Spróbuj dziś' },
};

/**
 * @param {Array<string | Record<string, unknown>>} body
 * @returns {DocumentFragment}
 */
export function renderBody(body) {
  return h('div', { class: 'prose' }, body.map(renderBlock));
}

function renderBlock(block) {
  if (typeof block === 'string') return h('p', {}, inline(block));

  const [key] = Object.keys(block);
  const value = block[key];

  if (key === 'ul' || key === 'ol') {
    const Tag = key === 'ul' ? 'ul' : 'ol';
    return h(Tag, { class: 'prose-list' }, value.map((item) => h('li', {}, inline(item))));
  }

  const meta = BLOCK_META[key];
  if (meta) {
    return h('aside', { class: meta.className },
      h('span', { class: 'prose-block__head' }, icon(meta.icon, 17), meta.label),
      h('span', { class: 'prose-block__text' }, inline(value)));
  }

  return h('p', {}, inline(String(value)));
}

/** Zamienia **pogrubienie** na elementy <strong>. */
function inline(text) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.map((part, index) => (index % 2 === 1 ? h('strong', {}, part) : part));
}

/** Czy lekcja ma prawdziwą treść (a nie placeholder)? */
export function isLessonReady(lesson) {
  return Boolean(lesson) && !lesson.placeholder && Array.isArray(lesson.sections) && lesson.sections.length > 0;
}
