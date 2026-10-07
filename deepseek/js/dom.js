/** Drobne helpery DOM + escapowanie, żeby widoki były czytelne. */

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Delegacja zdarzeń: jeden listener na kontenerze. */
export function delegate(root, selector, eventName, handler) {
  const listener = (event) => {
    const target = event.target.closest(selector);
    if (target && root.contains(target)) handler(event, target);
  };
  root.addEventListener(eventName, listener);
  return () => root.removeEventListener(eventName, listener);
}

/** Bezpieczne pobranie elementu trasy z atrybutu data-path. */
export function pathFromEvent(event) {
  const el = event.target.closest("[data-path]");
  return el ? el.dataset.path : null;
}
