/**
 * Podgląd stanów interfejsu (ładowanie / błąd / pusty).
 * Ekran pod `#/ustawienia/stany`, żeby dało się je sprawdzić na telefonie
 * wizualnie, zanim powstaną prawdziwe ekrany w kolejnych krokach.
 */

import { escapeHtml } from "../dom.js";
import { emptyState, errorState, loadingState, retryButton } from "../ui/states.js";
import { backButton } from "./course.js";
import { getState } from "../store.js";

const KINDS = [
  { id: "loading", label: "Ładowanie" },
  { id: "error", label: "Błąd" },
  { id: "empty", label: "Pusty" },
];

let current = "loading";
let errorMessage = "Nie udało się pobrać kursu. Sprawdź połączenie i spróbuj ponownie.";

export function setStatesDemo(kind) {
  if (KINDS.some((k) => k.id === kind)) current = kind;
}

export function getStatesDemo() {
  return current;
}

export function triggerDemoError() {
  errorMessage = "Demonstracyjny błąd z przyciskiem ponowienia — nic nie zostało zepsute.";
  current = "error";
}

function preview() {
  if (current === "error") {
    return errorState(errorMessage, { actionHtml: retryButton("demo-retry") });
  }
  if (current === "empty") {
    const habits = getState().panel?.habits?.length ?? 0;
    return emptyState({
      icon: "leaf",
      title: "Brak nawyków",
      text: `Przykład pustego stanu. W Panelu zapisanych nawyków: ${habits}.`,
    });
  }
  return loadingState("Ładowanie modułu…", { skeletons: 3 });
}

export function statesScreen() {
  const switcher = KINDS.map(
    (k) => `
      <button type="button" class="option" data-action="demo-state" data-kind="${k.id}"
              aria-pressed="${current === k.id}">
        <span>${escapeHtml(k.label)}</span>
      </button>`
  ).join("");

  return `
    <header class="screen-header">
      ${backButton("ustawienia", "Ustawienia")}
      <h1>Stany interfejsu</h1>
      <p>Trzy podstawowe komponenty używane w całej aplikacji: ładowanie, błąd, pusty.</p>
    </header>

    <section class="card">
      <div class="card__title">Wariant podglądu</div>
      <div class="options" style="margin-top:12px">${switcher}</div>
    </section>

    <div id="states-preview">${preview()}</div>

    <p class="note">
      To ekran pomocniczy prototypu — w kolejnych krokach stany pojawią się w miejscu
      prawdziwego ładowania danych.
    </p>
  `;
}
