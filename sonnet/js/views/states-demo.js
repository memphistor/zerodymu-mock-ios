/** Podgląd komponentów stanów (ładowanie / błąd / pusto) — narzędzie deweloperskie. */

import { h } from '../dom.js';
import { screen, screenHead, backLink } from '../ui/components.js';
import { loadingState, errorState, emptyState } from '../ui/states.js';

export default function statesDemoView() {
  return screen(
    backLink('#/ustawienia', 'Ustawienia'),
    screenHead({
      eyebrow: 'Narzędzia',
      title: 'Podgląd stanów',
      lead: 'Tak wyglądają podstawowe stany, które pojawią się na ekranach aplikacji.',
    }),
    section('Ładowanie', h('div', { class: 'demo-box' },
      loadingState({ variant: 'inline', label: 'Ładowanie przykładu…' }))),
    section('Błąd', errorDemo()),
    section('Pusto', h('div', { class: 'demo-box' }, emptyState({
      heading: 'h3',
      icon: 'leaf',
      title: 'Brak nawyków',
      text: 'Tu pojawią się Twoje codzienne nawyki.',
      action: { label: 'Przejdź do kursu', href: '#/kurs' },
    }))));
}

function section(title, content) {
  return h('section', { class: 'section' }, h('h2', { class: 'section-title' }, title), content);
}

/** Błąd z działającym „Spróbuj ponownie”: krótka symulacja ładowania, potem znów błąd. */
function errorDemo() {
  const box = h('div', { class: 'demo-box' });

  function showError() {
    box.replaceChildren(errorState({
      heading: 'h3',
      title: 'Nie udało się wczytać',
      text: 'To przykład komunikatu o błędzie.',
      detail: 'Przykład: Failed to fetch',
      onRetry: retry,
    }));
  }

  function retry() {
    box.replaceChildren(loadingState({ variant: 'inline', label: 'Ponawiam próbę…' }));
    window.setTimeout(showError, 900);
  }

  showError();
  return box;
}
