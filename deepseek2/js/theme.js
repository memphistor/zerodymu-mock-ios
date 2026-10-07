/** Motyw jasny/ciemny. Preferencja: 'system' | 'light' | 'dark'. */

const COLORS = { light: '#f6f5f1', dark: '#0d1312' };
const query = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

export function resolveTheme(pref) {
  if (pref === 'dark') return 'dark';
  if (pref === 'light') return 'light';
  return query && query.matches ? 'dark' : 'light';
}

export function applyTheme(pref) {
  const theme = resolveTheme(pref);
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', COLORS[theme]);
  return theme;
}

/** Reaguje na zmianę motywu systemu, gdy preferencja to 'system'. */
export function watchSystemTheme(getPref) {
  if (!query) return;
  const onChange = () => {
    if (getPref() === 'system') applyTheme('system');
  };
  if (query.addEventListener) query.addEventListener('change', onChange);
  else if (query.addListener) query.addListener(onChange);
}

/** Kolejność i etykiety opcji motywu (do ekranu Ustawienia). */
export const THEME_OPTIONS = [
  { value: 'system', label: 'Systemowy', hint: 'Zgodnie z ustawieniem telefonu' },
  { value: 'light', label: 'Jasny', hint: 'Ciepłe, jasne tło' },
  { value: 'dark', label: 'Ciemny', hint: 'Spokojny, przygaszony' },
];
