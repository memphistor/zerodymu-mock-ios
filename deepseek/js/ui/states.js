/**
 * Komponenty stanów: ładowanie, błąd, pusty.
 * Spójne wizualnie i dostępne (role/aria), używane w każdym widoku.
 */

import { escapeHtml } from "../dom.js";
import { iconMarkup } from "./icons.js";

export function stateBlock({ icon = "inbox", title, text = "", actionHtml = "", role = "" }) {
  return `
    <div class="state-block" ${role ? `role="${role}"` : ""}>
      <div class="state-block__icon" aria-hidden="true">${iconMarkup(icon, { size: 30 })}</div>
      <h2 class="state-block__title">${escapeHtml(title)}</h2>
      ${text ? `<p class="state-block__text">${escapeHtml(text)}</p>` : ""}
      ${actionHtml}
    </div>`;
}

/** Ładowanie: spinner + opcjonalne szkielety pod treść. */
export function loadingState(message = "Ładowanie…", { skeletons = 0 } = {}) {
  const skeletonHtml = skeletons
    ? `<div class="skeleton-list" aria-hidden="true">${Array.from(
        { length: skeletons },
        (_, i) => `<div class="skeleton" style="height:${i === 0 ? 96 : 72}px"></div>`
      ).join("")}</div>`
    : "";
  return `
    <div class="state-block" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <p class="state-block__title">${escapeHtml(message)}</p>
    </div>
    ${skeletonHtml}`;
}

export function errorState(message, { actionHtml = "" } = {}) {
  return stateBlock({
    icon: "warn",
    title: "Coś poszło nie tak",
    text: message,
    actionHtml,
    role: "alert",
  });
}

export function emptyState({ icon = "inbox", title, text, actionHtml = "" }) {
  return stateBlock({ icon, title, text, actionHtml });
}

/* --- Gotowe akcje stanów --- */

export const retryButton = (action = "retry") =>
  `<button type="button" class="btn btn--primary" data-action="${action}">
     ${iconMarkup("refresh", { size: 18 })}<span>Spróbuj ponownie</span>
   </button>`;

export const primaryAction = (label, action, path = "") =>
  `<button type="button" class="btn btn--primary" data-action="${action}"${
    path ? ` data-path="${path}"` : ""
  }>${escapeHtml(label)}</button>`;
