/** Zakładka Ustawienia: motyw, informacje o danych, reset demo. */

import { escapeHtml } from "../dom.js";
import { getState, getAdapterInfo, resetDemo, storage, STORAGE_KEY } from "../store.js";
import { badge } from "../ui/components.js";
import { emptyState } from "../ui/states.js";
import { iconMarkup } from "../ui/icons.js";

const THEMES = [
  { value: "system", label: "Systemowy", icon: "phone" },
  { value: "light", label: "Jasny", icon: "sun" },
  { value: "dark", label: "Ciemny", icon: "moon" },
];

export function settingsScreen() {
  const { settings } = getState();
  const { persistent } = getAdapterInfo();

  const themeOptions = THEMES.map(
    (t) => `
      <button type="button" class="option" data-action="theme" data-theme="${t.value}"
              aria-pressed="${settings.theme === t.value}">
        <span class="option__key" aria-hidden="true">${iconMarkup(t.icon, { size: 16 })}</span>
        <span>${escapeHtml(t.label)}</span>
      </button>`
  ).join("");

  return `
    <header class="screen-header">
      <h1>Ustawienia</h1>
      <p>Wygląd, dane lokalne i informacje o prototypie.</p>
    </header>

    <section class="card">
      <div class="card__head">
        <div>
          <div class="card__title">Motyw</div>
          <p class="card__desc">Jasny, ciemny lub zgodny z systemem telefonu.</p>
        </div>
        ${badge(settings.theme, "accent")}
      </div>
      <div class="options" style="margin-top:12px">${themeOptions}</div>
    </section>

    <section class="card">
      <div class="card__title">Dane na tym urządzeniu</div>
      <div class="setting-row" style="margin-top:12px">
        <div class="setting-row__body">
          <div class="card__title">Pamięć lokalna</div>
          <p class="card__desc">
            ${
              persistent
                ? "Działa — postęp zostanie zapisany w tej przeglądarce."
                : "Niedostępna (np. tryb prywatny). Aplikacja działa, ale bez trwałego zapisu."
            }
          </p>
        </div>
        ${badge(persistent ? "OK" : "Brak", persistent ? "ok" : "warn")}
      </div>
      <div class="setting-row">
        <div class="setting-row__body">
          <div class="card__title">Klucz zapisu</div>
          <p class="card__desc"><code>${escapeHtml(STORAGE_KEY)}</code></p>
        </div>
      </div>
      <div class="setting-row">
        <div class="setting-row__body">
          <div class="card__title">Reset demo</div>
          <p class="card__desc">Usuwa zapis i przywraca stan z pierwszego uruchomienia.</p>
        </div>
        <button type="button" class="btn btn--danger btn--sm" data-action="reset">Reset</button>
      </div>
    </section>

    <section class="card card--flat">
      <div class="card__title">O prototypie</div>
      <p class="card__desc" style="margin-top:6px">
        ZeroDymu · krok 1 (szkielet). Kurs odblokowany od startu, bez opłat.
        Wersja statyczna — działa w przeglądarce telefonu.
      </p>
      <p class="note" style="margin-top:8px">Zapis: localStorage · brak konta i serwera</p>
    </section>

    ${
      storage.persistent
        ? ""
        : emptyState({
            icon: "warn",
            title: "Tryb prywatny",
            text: "Postęp nie będzie zapisany po zamknięciu karty.",
          })
    }
  `;
}

export function confirmReset() {
  const ok = window.confirm("Usunąć dane demo i przywrócić stan początkowy?");
  if (ok) resetDemo();
  return ok;
}
