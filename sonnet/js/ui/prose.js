/**
 * Renderowanie treści lekcji z bloków danych (patrz js/data/helpers.js).
 * Wszystko przez DOM i textContent — bez innerHTML.
 */

import { h } from '../dom.js';
import { icon } from './icons.js';

/** Tekst z **pogrubieniem** → węzły DOM. */
export function inline(text) {
  return text.split('**').map((part, i) => (i % 2 === 1 ? h('strong', null, part) : part));
}

const CALLOUTS = {
  tip: { label: 'Wskazówka', iconName: 'bulb' },
  note: { label: 'Warto wiedzieć', iconName: 'info' },
  try: { label: 'Spróbuj dziś', iconName: 'steps' },
};

function callout(kind, text) {
  const { label, iconName } = CALLOUTS[kind];
  return h('aside', { class: `callout callout--${kind}` },
    h('span', { class: 'callout__icon' }, icon(iconName, 20)),
    h('div', { class: 'callout__body' },
      h('p', { class: 'callout__label' }, label),
      h('p', null, inline(text))));
}

export function renderBlock(block) {
  if (typeof block === 'string') return h('p', null, inline(block));
  if (block.ul) return h('ul', { class: 'prose__list' }, block.ul.map((item) => h('li', null, inline(item))));
  if (block.ol) return h('ol', { class: 'prose__list prose__list--ordered' }, block.ol.map((item) => h('li', null, inline(item))));
  const kind = ['tip', 'note', 'try'].find((k) => block[k]);
  return kind ? callout(kind, block[kind]) : null;
}

/** Sekcja lekcji: <section id> + nagłówek + bloki. */
export function renderSection(section, id) {
  return h('section', { class: 'prose__section', id },
    h('h2', { class: 'prose__title', tabindex: '-1' }, section.title),
    section.body.map(renderBlock));
}
