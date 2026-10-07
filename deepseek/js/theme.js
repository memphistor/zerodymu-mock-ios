/**
 * Motyw jasny / ciemny / systemowy. Wybór zapisujemy w stanie,
 * a `data-theme` na <html> przełącza tokeny CSS. W trybie
 * systemowym nasłuchujemy zmiany ustawień telefonu.
 */

import { getState, subscribe, updateSettings } from "./store.js";

const LIGHT_COLOR = "#f6f6f4";
const DARK_COLOR = "#0f1211";

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolveTheme(theme) {
  if (theme === "light" || theme === "dark") return theme;
  return systemPrefersDark() ? "dark" : "light";
}

export function applyTheme(theme) {
  const resolved = resolveTheme(theme);
  document.documentElement.setAttribute("data-theme", resolved);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", resolved === "dark" ? DARK_COLOR : LIGHT_COLOR);
}

export function initTheme() {
  applyTheme(getState().settings.theme);

  subscribe((state) => applyTheme(state.settings.theme));

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    if (getState().settings.theme === "system") applyTheme("system");
  };
  if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
  else if (typeof mq.addListener === "function") mq.addListener(onChange);
}

export function setTheme(theme) {
  updateSettings({ theme });
}
