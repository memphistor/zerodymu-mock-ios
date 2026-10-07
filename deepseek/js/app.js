/**
 * Punkt wejścia aplikacji.
 *
 * Boot: odczyt z localStorage → router → pierwszy render.
 * Render jest pełny (innerHTML) przy zmianie trasy lub stanu, ale
 * sceny rozgrywają się w jednym miejscu, więc łatwo je wymienić.
 */

import { load, ensureStarted, subscribe, rememberVisit, updateSettings } from "./store.js";
import { initTheme } from "./theme.js";
import { startRouter, navigate, currentRoute, TABS } from "./router.js";
import { $, $$, escapeHtml } from "./dom.js";
import { iconMarkup } from "./ui/icons.js";
import { loadingState, errorState, retryButton } from "./ui/states.js";
import { courseListScreen, moduleScreen } from "./views/course.js";
import { lessonScreen } from "./views/lesson.js";
import { quizScreen } from "./views/quiz.js";
import { panelScreen, addHabit, removeHabit } from "./views/panel.js";
import { settingsScreen, confirmReset } from "./views/settings.js";
import { statesScreen, setStatesDemo, triggerDemoError } from "./views/states-demo.js";

const appbar = $("#appbar");
const main = $("#main");
const tabbar = $("#tabbar");

/** Faza startu: "boot" → "ready" (widok) lub "error". */
let phase = "boot";
let bootError = null;
let toast = null;

/* --- Górny pasek --- */

function brandBar(title, aside = "") {
  return `
    <span class="bar__brand">
      <span class="bar__brand-mark" aria-hidden="true">Z</span>
      <span>${escapeHtml(title)}</span>
    </span>
    ${aside ? `<span class="bar__aside">${escapeHtml(aside)}</span>` : ""}`;
}

function renderAppbar(route) {
  if (!route || route.tab === "kurs" || route.screen === "list") {
    const lessonCount = route?.screen === "list" ? "Krok 1" : "";
    appbar.innerHTML = brandBar("ZeroDymu", lessonCount);
    return;
  }
  const labels = { panel: "Panel", ustawienia: "Ustawienia" };
  appbar.innerHTML = brandBar(labels[route.tab] ?? "ZeroDymu");
}

/* --- Dolna nawigacja --- */

function renderTabbar(activeTab) {
  tabbar.innerHTML = TABS.map(
    (tab) => `
    <button type="button" class="tabbar__btn" data-tab="${tab.id}"
            aria-current="${activeTab === tab.id ? "page" : "false"}">
      <span class="tabbar__icon" aria-hidden="true">${iconMarkup(tab.icon, { size: 22 })}</span>
      <span>${escapeHtml(tab.label)}</span>
    </button>`
  ).join("");
}

/* --- Render ekranu --- */

function screenHtml(route) {
  if (route.screen === "panel") return panelScreen();
  if (route.screen === "settings") return settingsScreen();
  if (route.screen === "states") return statesScreen();
  if (route.screen === "module") return moduleScreen(route.moduleId);
  if (route.screen === "lesson") return lessonScreen(route.moduleId, route.lessonIndex);
  if (route.screen === "quiz") return quizScreen(route.moduleId, route.lessonIndex);
  return courseListScreen();
}

function render(route = currentRoute(), { resetScroll = false } = {}) {
  renderTabbar(route.tab);

  if (phase === "boot") {
    appbar.innerHTML = brandBar("ZeroDymu");
    main.innerHTML = loadingState("Przygotowuję kurs…", { skeletons: 4 });
    return;
  }

  if (phase === "error") {
    renderAppbar(null);
    main.innerHTML = errorState(bootError, { actionHtml: retryButton("retry") });
    return;
  }

  renderAppbar(route);
  const html = screenHtml(route);
  const previousScroll = main.scrollTop;
  main.innerHTML = toast
    ? `<div class="banner" role="status"><div><div class="banner__title">${escapeHtml(toast.title)}</div><span>${escapeHtml(toast.text)}</span></div></div>${html}`
    : html;

  // Zmiana treści resetuje scroll — przywracamy go, gdy nie zmieniamy trasy.
  main.scrollTop = resetScroll ? 0 : previousScroll;
}

/** Krótki komunikat nad treścią (np. walidacja formularza nawyków). */
function showToast(title, text) {
  toast = { title, text };
  render();
  window.setTimeout(() => {
    toast = null;
    render();
  }, 3200);
}
/* --- Delegacja zdarzeń --- */

function bindGlobalEvents() {
  tabbar.addEventListener("click", (event) => {
    const btn = event.target.closest(".tabbar__btn");
    if (!btn) return;
    const tab = TABS.find((t) => t.id === btn.dataset.tab);
    if (tab) navigate(tab.id);
  });

  main.addEventListener("click", (event) => {
    const pathEl = event.target.closest("[data-path]");
    if (pathEl && !pathEl.disabled) {
      navigate(pathEl.dataset.path);
      return;
    }

    const actionEl = event.target.closest("[data-action]");
    if (!actionEl) return;

    switch (actionEl.dataset.action) {
      case "retry":
        boot();
        break;
      case "nav":
        navigate(actionEl.dataset.path ?? "kurs");
        break;
      case "reset":
        confirmReset();
        break;
      case "theme":
        // Motyw: zapis do stanu; podmianę tokenów robi subskrypcja w theme.js.
        updateSettings({ theme: actionEl.dataset.theme });
        break;
      case "demo-state":
        setStatesDemo(actionEl.dataset.kind);
        render();
        break;
      case "demo-retry":
        triggerDemoError();
        render();
        break;
      case "remove-habit":
        removeHabit(Number(actionEl.dataset.index));
        break;
      default:
        break;
    }
  });

  // Quiz: zaznaczanie odpowiedzi (bez oceny — to placeholder kroku 1).
  main.addEventListener("click", (event) => {
    const option = event.target.closest('.option[data-action="answer"]');
    if (!option) return;
    const block = option.closest("[data-question-block]");
    $$('.option[data-action="answer"]', block).forEach((el) => el.setAttribute("aria-pressed", "false"));
    option.setAttribute("aria-pressed", "true");
  });

  main.addEventListener("submit", (event) => {
    const form = event.target;
    if (!form.matches("#habit-form")) return;
    event.preventDefault();
    const input = form.querySelector('input[name="habit"]');
    const result = addHabit(input?.value ?? "");
    if (result.ok) {
      input.value = "";
      showToast("Dodano nawyk", "Zapisano w pamięci lokalnej telefonu.");
    } else if (result.reason === "duplicate") {
      showToast("Taki nawyk już jest", "Wpisz inną nazwę mikronawyku.");
    } else if (result.reason === "limit") {
      showToast("Limit demo", "W kroku 1 zapisujemy maksymalnie 20 nawyków.");
    } else {
      showToast("Puste pole", "Wpisz nazwę nawyku przed dodaniem.");
    }
  });

  // Enter/Spacja na kartach z role="button"
  main.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const el = event.target.closest('[role="button"][data-path]');
    if (!el) return;
    event.preventDefault();
    navigate(el.dataset.path);
  });
}

/* --- Start --- */

function boot() {
  phase = "boot";
  bootError = null;
  render();

  try {
    const restored = load();
    ensureStarted();
    phase = "ready";
    if (!restored) {
      // Pierwsze uruchomienie: krótka pauza, żeby ładowanie było widoczne.
      window.setTimeout(() => render(), 380);
      return;
    }
  } catch (error) {
    phase = "error";
    bootError = error?.message ?? "Nie udało się wczytać danych aplikacji.";
  }
  render();
}

initTheme();
bindGlobalEvents();
subscribe(() => render());
startRouter((route) => {
  render(route, { resetScroll: true });
  if (phase === "ready" && route.tab) rememberVisit(route.path);
});
boot();

export { render, showToast };
