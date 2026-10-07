import { getState, updateSettings, resetDemo } from "../store.js";

const THEMES = [
  { value: "system", label: "Systemowy" },
  { value: "light", label: "Jasny" },
  { value: "dark", label: "Ciemny" },
];

export function renderSettings() {
  const { settings } = getState();
  const options = THEMES.map(
    (t) =>
      `<option value="${t.value}" ${settings.theme === t.value ? "selected" : ""}>${t.label}</option>`
  ).join("");

  return `
    <header class="screen-header">
      <h1>Ustawienia</h1>
      <p>Wygląd i dane demo na tym urządzeniu.</p>
    </header>
    <section class="card">
      <div class="setting-row">
        <div>
          <div class="card__title">Motyw</div>
          <p class="card__desc">Jasny, ciemny lub zgodny z systemem.</p>
        </div>
        <select id="theme-select" class="select-theme" aria-label="Motyw aplikacji">
          ${options}
        </select>
      </div>
      <div class="setting-row">
        <div>
          <div class="card__title">Dane demo</div>
          <p class="card__desc">Czyści localStorage i przywraca szkic stanu.</p>
        </div>
        <button type="button" class="btn btn--ghost" id="reset-demo">Reset</button>
      </div>
    </section>
    <p class="card__desc" style="margin-top:16px">Klucz storage: <code>zerodymu-sonnet-v1</code></p>
  `;
}

export function bindSettingsEvents(root) {
  const select = root.querySelector("#theme-select");
  select?.addEventListener("change", () => updateSettings({ theme: select.value }));

  root.querySelector("#reset-demo")?.addEventListener("click", () => {
    if (confirm("Wyczyścić dane demo na tym urządzeniu?")) resetDemo();
  });
}
