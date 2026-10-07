import { h, mount } from '../dom.js';
import { getState, getStatus, update, reset } from '../store.js';
import { APP_VERSION, SCHEMA_VERSION } from '../model.js';
import { applyTheme } from '../theme.js';
import { refresh } from '../router.js';
import { screen, screenHead, listRow, formatDate } from '../ui/components.js';

const THEMES = [
  { value: 'system', label: 'Systemowy' },
  { value: 'light', label: 'Jasny' },
  { value: 'dark', label: 'Ciemny' },
];

export default function settingsView() {
  const state = getState();
  const status = getStatus();

  return screen(
    screenHead({ eyebrow: 'ZeroDymu', title: 'Ustawienia', lead: 'Wszystko zostaje na Twoim urządzeniu.' }),
    themeCard(state.settings.theme),
    accountCard(state),
    dataCard(status),
    aboutCard(state));
}

function themeCard(current) {
  const group = h('fieldset', { class: 'segmented' },
    h('legend', { class: 'sr-only' }, 'Motyw aplikacji'),
    THEMES.map(({ value, label }) => h('label', { class: 'segmented__item' },
      h('input', {
        type: 'radio', name: 'theme', value, checked: value === current,
        onChange: () => {
          update((draft) => { draft.settings.theme = value; });
          applyTheme(value);
        },
      }),
      h('span', { class: 'segmented__label' }, label))));

  return h('section', { class: 'card setting' },
    h('h2', { class: 'setting__label' }, 'Wygląd'),
    group,
    h('p', { class: 'setting__help' }, 'Systemowy motyw podąża za ustawieniem telefonu.'));
}

const ROLE_LABELS = { kursant: 'Kursant' };

function accountCard(state) {
  return h('section', { class: 'card setting' },
    h('h2', { class: 'setting__label' }, 'Twoje konto'),
    h('dl', { class: 'kv' },
      kvRow('Rola', ROLE_LABELS[state.profile.role] ?? 'Kursant'),
      kvRow('Dostęp', 'Pełny, bez opłat'),
      kvRow('Zapis danych', 'Tylko na tym urządzeniu')));
}

function dataCard(status) {
  const actions = h('div', { class: 'button-stack' });
  let armed = false;

  function draw() {
    mount(
      actions,
      armed
        ? h('button', { class: 'btn btn--danger btn--block', type: 'button', onClick: confirmReset },
            'Tak, wyczyść wszystko')
        : h('button', { class: 'btn btn--secondary btn--block', type: 'button', onClick: arm },
            'Wyczyść dane aplikacji'),
      armed && h('button', { class: 'btn btn--secondary btn--block', type: 'button', onClick: cancel }, 'Anuluj'),
    );
  }

  function arm() { armed = true; draw(); actions.querySelector('.btn--danger').focus(); }
  function cancel() { armed = false; draw(); actions.querySelector('.btn').focus(); }
  function confirmReset() {
    reset();
    applyTheme(getState().settings.theme);
    refresh();
  }

  draw();

  return h('section', { class: 'card setting' },
    h('h2', { class: 'setting__label' }, 'Dane'),
    h('p', { class: 'setting__help' },
      status.persistent
        ? 'Postęp i ustawienia zapisują się w pamięci przeglądarki. Wyczyszczenie usuwa je bezpowrotnie.'
        : 'Pamięć przeglądarki jest niedostępna — zmiany zostaną utracone po zamknięciu karty.'),
    actions);
}

function aboutCard(state) {
  return h('section', { class: 'card setting' },
    h('h2', { class: 'setting__label' }, 'O prototypie'),
    h('dl', { class: 'kv' },
      kvRow('Wersja', APP_VERSION),
      kvRow('Schemat danych', `v${SCHEMA_VERSION}`),
      kvRow('Dane utworzono', formatDate(state.createdAt))),
    listRow({
      href: '#/ustawienia/stany',
      title: 'Podgląd stanów',
      meta: 'Ładowanie, błąd, pusto',
      iconName: 'alert',
    }));
}

function kvRow(term, value) {
  return h('div', { class: 'kv__row' }, h('dt', null, term), h('dd', null, value));
}
