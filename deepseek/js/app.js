/**
 * Punkt wejścia aplikacji.
 *
 * Boot: odczyt z localStorage → router → pierwszy render.
 * Render jest pełny (innerHTML) przy zmianie trasy lub stanu — widoki są
 * funkcjami czystymi, więc każdy render odtwarza ten sam obraz ze stanu.
 */

import { load, ensureStarted, subscribe, rememberVisit, updateSettings, getState } from "./store.js";
import { initTheme } from "./theme.js";
import { startRouter, navigate, currentRoute, TABS } from "./router.js";
import { $, escapeHtml } from "./dom.js";
import { iconMarkup } from "./ui/icons.js";
import { loadingState, errorState, retryButton } from "./ui/states.js";
import { courseListScreen, moduleScreen } from "./views/course.js";
import { lessonScreen } from "./views/lesson.js";
import {
  quizScreen,
  resolveQuiz,
  answerQuestion,
  finishQuiz,
  resetSession,
} from "./views/quiz.js";
import { markLessonDone, markLessonOpen, isLessonDone } from "./logic/progress.js";
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

const BARS = {
  lists: { kurs: "ZeroDymu", panel: "Panel", ustawienia: "Ustawienia" },
  details: { kurs: "Kurs", panel: "Panel", ustawienia: "Ustawienia" },
};

function bar(title, aside = "") {
  return `
    <span class="bar__brand">
      <span class="bar__brand-mark" aria-hidden="true">Z</span>
      <span>${escapeHtml(title)}</span>
    </span>
    ${aside ? `<span class="bar__aside">${escapeHtml(aside)}</span>` : ""}`;
}

function renderAppbar(route) {
  const isRoot = route.screen === "list" || route.screen === "panel" || route.screen === "settings";
  const labels = isRoot ? BARS.lists : BARS.details;
  appbar.innerHTML = bar(labels[route.tab] ?? "ZeroDymu");
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
  if (route.screen === "quiz") return quizScreen(route);
  return courseListScreen();
}

function render(route = currentRoute(), { resetScroll = false } = {}) {
  renderTabbar(route.tab);

  if (phase === "boot") {
    appbar.innerHTML = bar("ZeroDymu");
    main.innerHTML = loadingState("Przygotowuję kurs…", { skeletons: 4 });
    return;
  }

  if (phase === "error") {
    renderAppbar({ tab: "kurs", screen: "list" });
    main.innerHTML = errorState(bootError, { actionHtml: retryButton("retry") });
    return;
  }

  renderAppbar(route);
  const html = screenHtml(route);
  const previousScroll = main.scrollTop;
  main.innerHTML = toast
    ? `<div class="banner" role="status"><div><div class="banner__title">${escapeHtml(toast.title)}</div><span>${escapeHtml(toast.text)}</span></div></div>${html}`
    : html;

  main.scrollTop = resetScroll ? 0 : previousScroll;
}

/** Krótki komunikat nad treścią (walidacja, zapis postępu). */
function showToast(title, text) {
  toast = { title, text };
  render();
  window.setTimeout(() => {
    toast = null;
    render();
  }, 3200);
}

/* --- Delegacja zdarzeń --- */

function handleQuizAnswer(route, actionEl) {
  const resolved = resolveQuiz(route);
  if (!resolved) return;
  answerQuestion(route.path, Number(actionEl.dataset.question), Number(actionEl.dataset.option));
  render(route);
}

function handleFinishQuiz(route) {
  const resolved = resolveQuiz(route);
  if (!resolved) return;
  const { score, total } = finishQuiz(route.path, resolved.quiz, resolved.id);
  render(route);
  const threshold = resolved.quiz.kind === "exam" ? resolved.quiz.passScore : Math.ceil(total * 0.6);
  showToast(
    score >= threshold ? `Zaliczone: ${score}/${total}` : `Wynik: ${score}/${total}`,
    score >= threshold ? "Postęp zapisany na tym urządzeniu." : "Możesz powtórzyć quiz w każdej chwili."
  );
}

function handleMarkDone(actionEl) {
  const moduleId = actionEl.dataset.module;
  const index = Number(actionEl.dataset.index);
  if (isLessonDone(getState(), moduleId, index)) {
    markLessonOpen(moduleId, index);
    showToast("Cofnięto oznaczenie", `Lekcja ${index + 1} nie jest już oznaczona.`);
  } else if (markLessonDone(moduleId, index)) {
    showToast("Oznaczono jako przeczytane", "Postęp zapisany lokalnie.");
  }
}

function bindGlobalEvents() {
  tabbar.addEventListener("click", (event) => {
    const btn = event.target.closest(".tabbar__btn");
    if (!btn) return;
    const tab = TABS.find((t) => t.id === btn.dataset.tab);
    if (tab) navigate(tab.id);
  });

  main.addEventListener("click", (event) => {
    const route = currentRoute();
    const actionEl = event.target.closest("[data-action]");
    const action = actionEl?.dataset.action;

    // Akcje obsługiwane w miejscu (bez zmiany trasy).
    if (action === "answer") return handleQuizAnswer(route, actionEl);
    if (action === "finish-quiz") return handleFinishQuiz(route);
    if (action === "mark-done") return handleMarkDone(actionEl);
    if (action === "retry-quiz") {
      resetSession(route.path);
      return render(route);
    }
    if (action === "jump") {
      document.getElementById(actionEl.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Nawigacja: data-path ma pierwszeństwo, potem akcje specjalne.
    const pathEl = event.target.closest("[data-path]");
    if (pathEl && !pathEl.disabled) return navigate(pathEl.dataset.path);

    switch (action) {
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
      showToast("Limit demo", "Zapisujemy maksymalnie 20 nawyków.");
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
