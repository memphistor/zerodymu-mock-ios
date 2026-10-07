/**
 * Ikony SVG w stylu liniowym (stroke 1.6). Wszystkie przyjmują
 * rozmiar przez CSS, więc nie trzeba ich skalować w JS.
 */

const icon = (paths, { size = 24, extra = "" } = {}) => `
  <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none"
       stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
       stroke-linejoin="round" aria-hidden="true" focusable="false">
    ${paths}
    ${extra}
  </svg>`;

export const icons = {
  book: (o) =>
    icon(
      '<path d="M4 5.5A2 2 0 0 1 6 3.5h5v17H6a2 2 0 0 1-2-2z"/>' +
        '<path d="M20 5.5a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 0 2-2z"/>',
      o
    ),
  chart: (o) =>
    icon(
      '<path d="M4 20V6"/><path d="M10 20V10"/><path d="M16 20v-7"/><path d="M21 4l-5 6"/>',
      o
    ),
  gear: (o) =>
    icon(
      '<circle cx="12" cy="12" r="3.2"/>' +
        '<path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/>',
      o
    ),
  back: (o) => icon('<path d="M15 5l-7 7 7 7"/>', o),
  forward: (o) => icon('<path d="M9 5l7 7-7 7"/>', o),
  check: (o) => icon('<path d="M4.5 12.5l5 5 10-11"/>', o),
  leaf: (o) =>
    icon('<path d="M5 19c0-7 5-12 14-12 0 9-5 13-11 13H5z"/><path d="M5 19c3-4 6-6 10-8"/>', o),
  cap: (o) =>
    icon('<path d="M3 9l9-4 9 4-9 4z"/><path d="M7 11.5V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5"/>', o),
  warn: (o) => icon('<path d="M12 4l8.5 15H3.5z"/><path d="M12 10v4.2"/><path d="M12 17.2h.01"/>', o),
  inbox: (o) =>
    icon('<path d="M4 13.5V6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v7"/><path d="M4 13.5h4l1 2.5h6l1-2.5h4V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18z"/>', o),
  refresh: (o) =>
    icon('<path d="M20 11a8 8 0 0 0-13.7-4.6L4 8.7"/><path d="M4 4.5v4.2h4.2"/><path d="M4 13a8 8 0 0 0 13.7 4.6L20 15.3"/><path d="M20 19.5v-4.2h-4.2"/>', o),
  play: (o) => icon('<path d="M8 5.5l11 6.5-11 6.5z"/>', o),
  plus: (o) => icon('<path d="M12 5v14"/><path d="M5 12h14"/>', o),
  smoke: (o) =>
    icon('<path d="M3 16h14v3H3z"/><path d="M4 16v-3h9v3"/><path d="M17 15h3v4h-3"/><path d="M15 6c1.6.6 2 2 1.2 3.1-.6.8-.6 1.6 0 2.4"/>', o),
  flame: (o) =>
    icon('<path d="M12 3c3 3.5 5 6 5 9a5 5 0 0 1-10 0c0-1.2.4-2.2 1.1-3.2.5 1.1 1.2 1.8 2.2 2.1-.6-3 .2-5.4 1.7-7.9z"/>', o),
  piggy: (o) =>
    icon('<path d="M5 12a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v3a2 2 0 0 1-2 2h-1l-1 2h-2l-.6-2H9l-.6 2h-2l-1-2H5z"/><path d="M8 12h.01"/>', o),
  moon: (o) => icon('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>', o),
  sun: (o) =>
    icon('<circle cx="12" cy="12" r="3.6"/><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>', o),
  phone: (o) =>
    icon('<rect x="7" y="3" width="10" height="18" rx="2.2"/><path d="M11 18.5h2"/>', o),
};

export function iconMarkup(name, options) {
  const fn = icons[name] ?? icons.inbox;
  return fn(options);
}
