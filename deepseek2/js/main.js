/**
 * Punkt startowy aplikacji: stan → motyw → router.
 * Kolejność jest istotna: motyw ustawiamy, zanim router wyrenderuje pierwszy ekran
 * (żeby nie było mignięcia), a baner pokazuje dyskretne ostrzeżenia o danych.
 */

import * as store from './store.js';
import { applyTheme, watchSystemTheme } from './theme.js';
import { startRouter } from './router.js';
import { h } from './dom.js';

function boot() {
  store.init();

  applyTheme(store.getState().settings.theme);
  watchSystemTheme(() => store.getState().settings.theme);

  renderBanner();

  const view = document.getElementById('view');
  startRouter(view);
}

/**
 * Baner: brak localStorage (praca bez zapisu) albo odzyskanie uszkodzonych danych.
 * Oba komunikaty da się zamknąć; ustawienia nie są przez to blokowane.
 */
function renderBanner() {
  const banner = document.getElementById('banner');
  if (!banner) return;

  const status = store.getStatus();
  const messages = [];

  if (!status.persistent) {
    messages.push(h('p', { class: 'banner__line' },
      'Nie mogę zapisać danych w tej przeglądarce (tryb prywatny?). Postęp będzie widoczny tylko do zamknięcia karty.'));
  }
  if (status.recovered) {
    messages.push(h('p', { class: 'banner__line' },
      'Zapisane dane były uszkodzone — zaczynamy od zera. Kopia jest w localStorage pod kluczem „…:backup”.'));
  }

  if (messages.length === 0) {
    banner.hidden = true;
    return;
  }

  banner.hidden = false;
  while (banner.firstChild) banner.removeChild(banner.firstChild);
  for (const message of messages) banner.appendChild(message);
  const close = h('button', {
    class: 'banner__close',
    type: 'button',
    'aria-label': 'Zamknij komunikat',
    onClick: () => {
      store.dismissRecovered();
      banner.hidden = true;
    },
  }, '×');
  banner.appendChild(close);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
