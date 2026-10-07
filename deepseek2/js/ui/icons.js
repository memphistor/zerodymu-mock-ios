/**
 * Ikony jako inline SVG (bez zewnętrznych plików i zależności).
 * Każda ikona dziedziczy kolor (`currentColor`) i rozmiar z atrybutu `size`.
 */

import { svg } from '../dom.js';

const PATHS = {
  book: [
    { tag: 'path', attrs: { d: 'M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z' } },
    { tag: 'path', attrs: { d: 'M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5A1.5 1.5 0 0 0 20 18.5z' } },
  ],
  grid: [
    { tag: 'rect', attrs: { x: 3.5, y: 3.5, width: 7, height: 7.5, rx: 2 } },
    { tag: 'rect', attrs: { x: 13.5, y: 3.5, width: 7, height: 4.5, rx: 2 } },
    { tag: 'rect', attrs: { x: 13.5, y: 11.5, width: 7, height: 9, rx: 2 } },
    { tag: 'rect', attrs: { x: 3.5, y: 14.5, width: 7, height: 6, rx: 2 } },
  ],
  sliders: [
    { tag: 'path', attrs: { d: 'M4 7h6M14 7h6M4 17h3M11 17h9' } },
    { tag: 'circle', attrs: { cx: 12, cy: 7, r: 2 } },
    { tag: 'circle', attrs: { cx: 9, cy: 17, r: 2 } },
  ],
  leaf: [
    { tag: 'path', attrs: { d: 'M20 4c-8 0-13 3.5-13 9.5A5.5 5.5 0 0 0 12.5 19C18.5 19 20 12 20 4z' } },
    { tag: 'path', attrs: { d: 'M7 18c2-3.5 4.5-6 9-9' } },
  ],
  alert: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'path', attrs: { d: 'M12 7.5v5.5' } },
    { tag: 'path', attrs: { d: 'M12 16.3h.01' } },
  ],
  refresh: [
    { tag: 'path', attrs: { d: 'M20 12a8 8 0 1 1-2.5-5.8' } },
    { tag: 'path', attrs: { d: 'M20 4v4h-4' } },
  ],
  check: [{ tag: 'path', attrs: { d: 'M5 12.5l4.5 4.5L19 7' } }],
  lock: [
    { tag: 'rect', attrs: { x: 4.5, y: 10.5, width: 15, height: 9.5, rx: 2.5 } },
    { tag: 'path', attrs: { d: 'M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5' } },
  ],
  arrow: [{ tag: 'path', attrs: { d: 'M5 12h13M13 6.5l5.5 5.5L13 17.5' } }],
  back: [{ tag: 'path', attrs: { d: 'M19 12H6M11 6.5L5.5 12 11 17.5' } }],
  play: [{ tag: 'path', attrs: { d: 'M8 5.5v13l11-6.5z' } }],
  doc: [
    { tag: 'path', attrs: { d: 'M6 4h7l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z' } },
    { tag: 'path', attrs: { d: 'M13 4v5h5' } },
    { tag: 'path', attrs: { d: 'M8.5 13.5h7M8.5 16.5h4.5' } },
  ],
  flame: [
    { tag: 'path', attrs: { d: 'M12 3.5c3.5 4 5.5 6.3 5.5 9.3A5.5 5.5 0 0 1 6.5 13c0-1.3.6-2.5 1.8-3.9' } },
    { tag: 'path', attrs: { d: 'M12 20a2.6 2.6 0 0 0 2.6-2.6c0-1.6-1.4-2.6-2.6-4.4-1.2 1.8-2.6 2.8-2.6 4.4A2.6 2.6 0 0 0 12 20z' } },
  ],
  calendar: [
    { tag: 'rect', attrs: { x: 4, y: 5.5, width: 16, height: 15, rx: 2.5 } },
    { tag: 'path', attrs: { d: 'M4 10h16M8.5 3.5v4M15.5 3.5v4' } },
  ],
  sparkle: [
    { tag: 'path', attrs: { d: 'M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z' } },
    { tag: 'path', attrs: { d: 'M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z' } },
  ],
  heart: [
    { tag: 'path', attrs: { d: 'M12 19.5S4.5 15.2 4.5 9.9A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 7.5 2.9c0 5.3-7.5 9.6-7.5 9.6z' } },
  ],
  plus: [{ tag: 'path', attrs: { d: 'M12 6v12M6 12h12' } }],
  sun: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 4 } },
    { tag: 'path', attrs: { d: 'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4' } },
  ],
  moon: [{ tag: 'path', attrs: { d: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z' } }],
  target: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 8 } },
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 3.5 } },
  ],
  paw: [
    { tag: 'circle', attrs: { cx: 7.5, cy: 9.5, r: 2 } },
    { tag: 'circle', attrs: { cx: 12, cy: 7.5, r: 2 } },
    { tag: 'circle', attrs: { cx: 16.5, cy: 9.5, r: 2 } },
    { tag: 'path', attrs: { d: 'M12 12.5c3 0 5.5 2 5.5 4.2A2.3 2.3 0 0 1 15.2 19c-1 0-1.7-.4-3.2-.4s-2.2.4-3.2.4a2.3 2.3 0 0 1-2.3-2.3c0-2.2 2.5-4.2 5.5-4.2z' } },
  ],
  info: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'path', attrs: { d: 'M12 11v5.5' } },
    { tag: 'path', attrs: { d: 'M12 7.7h.01' } },
  ],
};

/**
 * @param {keyof typeof PATHS} name
 * @param {number} size
 * @returns {SVGElement}
 */
export function icon(name, size = 24) {
  const shapes = PATHS[name] || PATHS.leaf;
  return svg(
    'svg',
    {
      viewBox: '0 0 24 24',
      width: size,
      height: size,
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': name === 'play' || name === 'flame' || name === 'leaf' ? 1.6 : 1.7,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true',
      focusable: 'false',
      class: 'icon',
    },
    ...shapes.map((shape) => svg(shape.tag, shape.attrs)),
  );
}
