import { getState, subscribe } from "./store.js";

export function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    meta.content = dark ? "#1c2420" : "#5c7c6b";
  }
}

export function initTheme() {
  applyTheme(getState().settings.theme);
  subscribe((s) => applyTheme(s.settings.theme));
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getState().settings.theme === "system") applyTheme("system");
  });
}
