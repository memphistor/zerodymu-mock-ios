/**
 * Ekran „Ustawienia”: motyw (działający), profil, informacje o danych
 * i wejście do podglądu stanów interfejsu.
 */

import { h } from '../dom.js';
import * as store from '../store.js';
import { applyTheme, THEME_OPTIONS } from '../theme.js';
import { STORAGE_KEY, SCHEMA_VERSION, APP_VERSION } from '../model.js';
import { refresh, go } from '../router.js';
import { screenHeader, section, card, button, settingRow, optionGroup, badge, placeholderNote } from '../ui/components.js';

export default function settingsView() {
  const state = store.getState();

  return h('div', { class: 'stack stack--lg' },
    screenHeader({
      eyebrow: 'ZeroDymu',
      title: 'Ustawienia',
      subtitle: 'Kilka rzeczy, które możesz dopasować do siebie.',
    }),

    section({ title: 'Wygląd', description: 'Motyw zmienia się od razu.' },
      h('div', { class: 'settings-group' },
        optionGroup({
          name: 'Motyw',
          options: THEME_OPTIONS,
          value: state.settings.theme,
          onChange: (value) => {
            store.update((draft) => {
              draft.settings.theme = value;
            });
            applyTheme(value);
            refresh();
          },
        }))),

    section({ title: 'Profil' },
      card({},
        h('div', { class: 'stack' },
          settingRow({
            label: 'Jak się do Ciebie zwracać',
            hint: 'Opcjonalne, zostaje tylko na tym urządzeniu.',
            control: h('input', {
              class: 'input',
              type: 'text',
              maxlength: 40,
              value: state.profile.displayName,
              placeholder: 'np. Michał',
              'aria-label': 'Imię lub pseudonim',
              onInput: (event) => {
                const value = event.target.value;
                store.update((draft) => {
                  draft.profile.displayName = value;
                });
              },
            }),
          }),
          settingRow({
            label: 'Rola',
            hint: 'Pełny dostęp do kursu — bez opłat i blokad.',
            control: badge('Kursant', 'accent', 'check'),
          })))),

    section({ title: 'Podgląd stanów', description: 'Ładowanie, błąd i pusty stan — do sprawdzenia wizualnie.' },
      button({
        label: 'Otwórz podgląd stanów',
        variant: 'soft',
        icon: 'arrow',
        block: true,
        onClick: () => go('/ustawienia/stany'),
      })),

    section({ title: 'Dane na tym urządzeniu' },
      card({},
        h('div', { class: 'stack' },
          h('dl', { class: 'about-list' },
            h('div', {}, h('dt', {}, 'Klucz zapisu'), h('dd', {}, h('code', {}, STORAGE_KEY))),
            h('div', {}, h('dt', {}, 'Schemat'), h('dd', {}, String(SCHEMA_VERSION))),
            h('div', {}, h('dt', {}, 'Wersja prototypu'), h('dd', {}, APP_VERSION))),
          h('p', { class: 'card__text' }, 'Dane zostają w Twojej przeglądarce. Nic nie jest wysyłane na serwer.'),
          button({
            label: 'Wyczyść dane i zacznij od nowa',
            variant: 'danger',
            icon: 'refresh',
            block: true,
            onClick: () => {
              if (window.confirm('Wyczyścić cały postęp i ustawienia na tym urządzeniu?')) {
                store.reset();
                applyTheme(store.getState().settings.theme);
                refresh({ keepScroll: false });
              }
            },
          })))),

    placeholderNote('Kolejne opcje (przypomnienia, eksport danych, tryb offline) pojawią się w następnych krokach.'),

    h('p', { class: 'muted', style: { fontSize: '0.85rem' } },
      'ZeroDymu to prototyp. Treść edukacyjna nie zastępuje porady lekarza.'));
}
