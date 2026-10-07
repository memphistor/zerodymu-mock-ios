/**
 * Mini-helper do budowy DOM bez `innerHTML`.
 *
 * h('div', { class: 'karta', onClick: fn }, 'tekst', h('span', …))
 * - drugi argument jest opcjonalny: jeśli jest tekstem/węzłem/tablicą, to dzieci
 * - `class` i `className` są równoważne; `dataset` ustawia data-*
 * - wartości null/undefined/false są pomijane (wygodne warunkowe dzieci)
 */

export function h(tag, props, ...children) {
  const el = document.createElement(tag);

  if (isProps(props)) {
    applyProps(el, props);
  } else {
    children.unshift(props);
  }

  append(el, children);
  return el;
}

/** Fragment jako tablica węzłów — do wstawiania wielu dzieci bez opakowania. */
export function fragment(...children) {
  return children.flat(Infinity).filter(isRenderable);
}

export function text(value) {
  return document.createTextNode(String(value));
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

/** Podmienia zawartość elementu na podany węzeł (lub węzły). */
export function mount(root, node) {
  clear(root);
  append(root, [node]);
  return root;
}

export function svg(tag, attrs = {}, ...children) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    el.setAttribute(key === 'className' ? 'class' : key, value);
  }
  append(el, children);
  return el;
}

function isProps(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Node)
  );
}

function isRenderable(value) {
  return value != null && value !== false && value !== true;
}

function applyProps(el, props) {
  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue;

    if (key === 'class' || key === 'className') {
      el.className = Array.isArray(value) ? value.filter(Boolean).join(' ') : value;
    } else if (key === 'dataset') {
      for (const [dataKey, dataValue] of Object.entries(value)) {
        if (dataValue != null) el.dataset[dataKey] = dataValue;
      }
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key === 'html') {
      el.innerHTML = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === 'ref' && typeof value === 'function') {
      value(el);
    } else if (key in el && typeof value !== 'boolean') {
      el[key] = value;
    } else if (value === true) {
      el.setAttribute(key, '');
    } else {
      el.setAttribute(key, value);
    }
  }
}

function append(el, children) {
  for (const child of children.flat(Infinity)) {
    if (!isRenderable(child)) continue;
    el.appendChild(child instanceof Node ? child : text(child));
  }
}
