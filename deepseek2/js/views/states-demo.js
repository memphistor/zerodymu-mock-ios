/**
 * Podgląd stanów interfejsu (Ustawienia → Podgląd stanów).
 * Pozwala zobaczyć na żywo: ładowanie (strona / lista / inline), pusty stan i błąd.
 */

import { h } from '../dom.js';
import { screenHeader, section, button } from '../ui/components.js';
import { loadingState, emptyState, errorState } from '../ui/states.js';
import { go, refresh } from '../router.js';

export default function statesDemoView() {
  return h('div', { class: 'states-demo' },
    screenHeader({
      back: { href: '#/ustawienia' },
      eyebrow: 'Podgląd',
      title: 'Stany interfejsu',
      subtitle: 'Trzy podstawowe sytuacje, które widzi użytkownik.',
    }),

    section({ title: 'Ładowanie', description: 'Pojawia się przy wolniejszym wczytywaniu ekranu (import()).' },
      labeled('Wariant: strona', loadingState()),
      labeled('Wariant: lista', loadingState({ variant: 'list', label: 'Wczytywanie listy…' })),
      labeled('Wariant: inline', loadingState({ variant: 'inline', label: 'Wczytywanie treści…' }))),

    section({ title: 'Pusto', description: 'Na przykład brak nawyków w panelu.' },
      emptyState({
        icon: 'paw',
        heading: 'h3',
        title: 'Nie masz jeszcze nawyków',
        text: 'Nawyki to małe rzeczy, które robisz regularnie.',
        action: { label: 'Zobacz panel', onClick: () => go('/panel') },
      })),

    section({ title: 'Błąd', description: 'Gdy nie uda się wczytać ekranu albo danych.' },
      errorState({
        title: 'Nie udało się wczytać ekranu',
        text: 'To podglądowa wersja stanu błędu — nic się nie zepsuło.',
        detail: 'Przykładowy szczegół techniczny: TypeError: Failed to fetch',
        onRetry: () => refresh({ keepScroll: true }),
      })),

    section({ title: 'Powrót' },
      button({ label: 'Wróć do ustawień', variant: 'soft', icon: 'back', block: true, onClick: () => go('/ustawienia') })));
}

function labeled(label, node) {
  return h('div', {},
    h('p', { class: 'states-demo__label' }, label),
    node);
}
