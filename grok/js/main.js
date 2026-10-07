import { MODULES, findLesson, findModule } from "./catalog.js";
import { loadState, resetState, saveState } from "./store.js";
import { backLink, emptyView, errorView, escapeHtml, loadingView, shell } from "./ui.js";

const app = document.querySelector("#app");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

let state = null;
let loadError = false;
let resetArmed = false;

function lessonKey(moduleId, lessonId) {
  return `${moduleId}/${lessonId}`;
}

function isOpened(moduleId, lessonId) {
  return Boolean(state.progress.lessons[lessonKey(moduleId, lessonId)]);
}

function openedInModule(moduleId) {
  return Object.keys(state.progress.lessons).filter((key) => key.startsWith(`${moduleId}/`)).length;
}

function openedTotal() {
  return Object.keys(state.progress.lessons).length;
}

function parseRoute() {
  const parts = (location.hash || "#/kurs").replace(/^#/, "").split("/").filter(Boolean);
  const name = parts[0] || "kurs";
  if (name === "modul" && parts[1]) return { name, moduleId: parts[1] };
  if (name === "lekcja" && parts[1] && parts[2]) {
    return { name, moduleId: parts[1], lessonId: parts[2] };
  }
  if (name === "quiz" && parts[1]) return { name, moduleId: parts[1] };
  if (name === "panel" || name === "ustawienia" || name === "blad") return { name };
  return { name: "kurs" };
}

function tabFor(route) {
  if (route.name === "panel") return "panel";
  if (route.name === "ustawienia" || route.name === "blad") return "ustawienia";
  return "kurs";
}

function titleFor(route) {
  const names = {
    kurs: "Kurs",
    panel: "Panel",
    ustawienia: "Ustawienia",
    blad: "Błąd odczytu",
  };
  if (names[route.name]) return names[route.name];
  if (route.name === "modul") return findModule(route.moduleId)?.title || "Moduł";
  if (route.name === "lekcja") return findLesson(route.moduleId, route.lessonId)?.lesson.title || "Lekcja";
  if (route.name === "quiz") return "Quiz";
  return "Kurs";
}

function applyTheme(theme) {
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }
  const dark =
    document.documentElement.dataset.theme === "dark" ||
    (!document.documentElement.dataset.theme && colorScheme.matches);
  if (themeMeta) themeMeta.content = dark ? "#141311" : "#f6f4ef";
}

function missing(title, text, href, label) {
  return `${backLink("#/kurs", "Kurs")}
    <section class="state state-error" role="alert">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(text)}</p>
      <a class="button" href="${href}">${escapeHtml(label)}</a>
    </section>`;
}

function courseView() {
  const items = MODULES.map((module, index) => {
    const opened = openedInModule(module.id);
    const status = opened > 0 ? "Rozpoczęty" : "Dostępny";
    const number = String(index + 1).padStart(2, "0");
    return `<li>
      <a class="card" href="#/modul/${module.id}">
        <span class="index">${number}</span>
        <span class="card-copy">
          <span class="card-title">${escapeHtml(module.title)}</span>
          <span class="card-text">${escapeHtml(module.summary)}</span>
          <span class="meta">${status} · ${opened} / ${module.lessons.length}</span>
        </span>
      </a>
    </li>`;
  }).join("");

  return `<header class="top">
      <p class="brand">ZeroDymu</p>
      <h1>Kurs</h1>
      <p class="lede">Sześć modułów. Jesteś kursantem od pierwszej lekcji — bez progu wejścia.</p>
    </header>
    <ol class="modules">${items}</ol>`;
}

function moduleView(moduleId) {
  const module = findModule(moduleId);
  if (!module) {
    return missing("Nie ma takiego modułu", "Wróć do listy. Sześć modułów jest na miejscu.", "#/kurs", "Wróć do kursu");
  }
  const lessons = module.lessons
    .map((lesson, index) => {
      const status = isOpened(module.id, lesson.id) ? "Otwarta" : "Jeszcze nieotwarta";
      return `<li>
        <a class="row" href="#/lekcja/${module.id}/${lesson.id}">
          <span class="row-index">${index + 1}</span>
          <span class="row-copy">
            <span class="row-title">${escapeHtml(lesson.title)}</span>
            <span class="row-text">${escapeHtml(lesson.blurb)}</span>
            <span class="meta">${status}</span>
          </span>
        </a>
      </li>`;
    })
    .join("");

  return `${backLink("#/kurs", "Kurs")}
    <header class="top tight">
      <p class="kicker">Moduł</p>
      <h1>${escapeHtml(module.title)}</h1>
      <p class="lede">${escapeHtml(module.summary)}</p>
    </header>
    <h2 class="section-label">Lekcje</h2>
    <ol class="rows">${lessons}</ol>
    <a class="row quiz-row" href="#/quiz/${module.id}">
      <span class="row-copy">
        <span class="row-title">Quiz modułu</span>
        <span class="row-text">Układ pytań, jeszcze bez treści i bez oceny.</span>
      </span>
    </a>`;
}

function lessonView(moduleId, lessonId) {
  const found = findLesson(moduleId, lessonId);
  if (!found) {
    return missing("Nie ma takiej lekcji", "Ten adres nie prowadzi do lekcji w szkicu kursu.", "#/kurs", "Wróć do kursu");
  }
  const { module, lesson, index } = found;
  return `${backLink(`#/modul/${module.id}`, module.title)}
    <header class="top tight">
      <p class="kicker">Lekcja ${index + 1} z ${module.lessons.length}</p>
      <h1>${escapeHtml(lesson.title)}</h1>
      <p class="lede">${escapeHtml(lesson.blurb)}</p>
    </header>
    <article class="sheet">
      <p>Tu będzie treść lekcji.</p>
      <div class="ghost-copy" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="ghost-copy" aria-hidden="true"><span></span><span></span></div>
    </article>
    <a class="button" href="#/quiz/${module.id}">Układ quizu</a>`;
}

function quizView(moduleId) {
  const module = findModule(moduleId);
  if (!module) {
    return missing("Nie ma takiego quizu", "Quiz jest przypisany do jednego z sześciu modułów.", "#/kurs", "Wróć do kursu");
  }
  const options = ["Pierwsza odpowiedź", "Druga odpowiedź", "Trzecia odpowiedź"]
    .map(
      (label) =>
        `<button type="button" class="option" data-action="pick" aria-pressed="false">${escapeHtml(label)}</button>`,
    )
    .join("");

  return `${backLink(`#/modul/${module.id}`, module.title)}
    <header class="top tight">
      <p class="kicker">Pytanie 1 z 3</p>
      <h1>Quiz</h1>
      <p class="lede">Treść pytania pojawi się razem z lekcją. Na razie widać sam układ.</p>
    </header>
    <div class="options" data-options>${options}</div>
    <button type="button" class="button" disabled>Sprawdź</button>
    <p class="fine">Bez właściwej odpowiedzi i bez punktacji.</p>`;
}

function formatStat(value, suffix) {
  if (value === null || value === undefined) return "—";
  return suffix ? `${value} ${suffix}` : String(value);
}

function panelView() {
  const habits = state.panel.habits;
  const habitBlock =
    habits.length === 0
      ? emptyView({
          title: "Brak nawyków",
          text: "Lista jest pusta. Dodawanie nawyków pojawi się w kolejnym kroku.",
        })
      : `<ul class="rows">${habits
          .map((habit) => `<li class="row"><span class="row-title">${escapeHtml(habit.name || habit.id)}</span></li>`)
          .join("")}</ul>`;

  return `<header class="top">
      <p class="brand">ZeroDymu</p>
      <h1>Panel</h1>
      <p class="lede">Szkic liczb. Nic jeszcze nie liczymy — miejsca czekają na dane.</p>
    </header>
    <dl class="stats">
      <div>
        <dt>Dni z rzędu</dt>
        <dd>${escapeHtml(formatStat(state.panel.streakDays))}</dd>
      </div>
      <div>
        <dt>Uniknięte</dt>
        <dd>${escapeHtml(formatStat(state.panel.cigarettesAvoided))}</dd>
      </div>
      <div>
        <dt>Zniżka</dt>
        <dd>${escapeHtml(formatStat(state.panel.savedPln))}</dd>
      </div>
    </dl>
    <p class="fine stat-note">Liczby jeszcze puste. Wejdą, gdy panel zacznie liczyć dni, papierosy i złotówki.</p>
    <section class="block">
      <h2>Postęp kursu</h2>
      <p class="lede quiet">Otwarte lekcje: ${openedTotal()}</p>
    </section>
    <section class="block">
      <h2>Nawyki</h2>
      ${habitBlock}
    </section>`;
}

function settingsView() {
  const theme = state.settings.theme;
  const option = (value, label) => {
    const checked = theme === value ? "true" : "false";
    return `<button type="button" role="radio" aria-checked="${checked}" data-theme-value="${value}">${label}</button>`;
  };
  const confirm = resetArmed
    ? `<div class="confirm">
        <p>Wyczyścić postęp i motyw na tym telefonie?</p>
        <div class="confirm-actions">
          <button type="button" class="button" data-action="reset-yes">Wyczyść</button>
          <button type="button" class="button ghost" data-action="reset-no">Zostaw</button>
        </div>
      </div>`
    : `<button type="button" class="button ghost" data-action="reset-ask">Reset danych</button>`;

  return `<header class="top">
      <p class="brand">ZeroDymu</p>
      <h1>Ustawienia</h1>
      <p class="lede">Wygląd i zapis, który zostaje w tym telefonie.</p>
    </header>
    <section class="block">
      <h2>Motyw</h2>
      <div class="segment" role="radiogroup" aria-label="Motyw">
        ${option("light", "Jasny")}
        ${option("dark", "Ciemny")}
        ${option("system", "System")}
      </div>
    </section>
    <section class="block">
      <h2>Dane</h2>
      <p class="lede quiet">Postęp lekcji, motyw i pusty szkic panelu są zapisane lokalnie. Otwarte lekcje: ${openedTotal()}.</p>
      ${confirm}
      <a class="text-link" href="#/blad">Podgląd błędu odczytu</a>
    </section>
    <p class="fine">ZeroDymu · prototyp kursu</p>`;
}

function viewFor(route) {
  switch (route.name) {
    case "modul":
      return moduleView(route.moduleId);
    case "lekcja":
      return lessonView(route.moduleId, route.lessonId);
    case "quiz":
      return quizView(route.moduleId);
    case "panel":
      return panelView();
    case "ustawienia":
      return settingsView();
    case "blad":
      return errorView({
        title: "Nie udało się odczytać danych",
        text: "To podgląd stanu błędu. Zapis na tym telefonie został na miejscu.",
        actionHtml: `<button type="button" class="button" data-action="retry-preview">Spróbuj ponownie</button>`,
      });
    default:
      return courseView();
  }
}

function render({ focus = true } = {}) {
  if (loadError || !state) {
    document.title = "Błąd odczytu · ZeroDymu";
    app.innerHTML = errorView({
      title: "Nie udało się odczytać danych",
      text: "Zapis na tym telefonie jest nieczytelny. Możesz zacząć od pustego szkicu.",
      actionHtml: `<button type="button" class="button" data-action="retry-fatal">Wyczyść i spróbuj ponownie</button>`,
    });
    return;
  }

  const route = parseRoute();
  document.title = `${titleFor(route)} · ZeroDymu`;
  app.innerHTML = shell({ tab: tabFor(route), body: viewFor(route) });
  if (!focus) return;
  const heading = app.querySelector("h1");
  if (!heading) return;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}

function markOpened(moduleId, lessonId) {
  if (!findLesson(moduleId, lessonId)) return;
  const key = lessonKey(moduleId, lessonId);
  if (state.progress.lessons[key]) return;
  const now = new Date().toISOString();
  state.progress.lessons[key] = { openedAt: now };
  state.progress.updatedAt = now;
  saveState(state);
}

function show() {
  resetArmed = false;
  if (state) {
    const route = parseRoute();
    if (route.name === "lekcja") markOpened(route.moduleId, route.lessonId);
  }
  render();
}

function setTheme(theme) {
  state.settings.theme = theme;
  saveState(state);
  applyTheme(theme);
  app.querySelectorAll("[data-theme-value]").forEach((button) => {
    button.setAttribute("aria-checked", button.dataset.themeValue === theme ? "true" : "false");
  });
}

function onClick(event) {
  const themeButton = event.target.closest("[data-theme-value]");
  if (themeButton) {
    setTheme(themeButton.dataset.themeValue);
    return;
  }

  const pick = event.target.closest("[data-action='pick']");
  if (pick) {
    const group = pick.closest("[data-options]");
    group.querySelectorAll("[data-action='pick']").forEach((button) => {
      button.setAttribute("aria-pressed", button === pick ? "true" : "false");
    });
    return;
  }

  const action = event.target.closest("[data-action]");
  if (!action) return;
  const name = action.dataset.action;

  if (name === "reset-ask") {
    resetArmed = true;
    render({ focus: false });
    return;
  }
  if (name === "reset-no") {
    resetArmed = false;
    render({ focus: false });
    return;
  }
  if (name === "reset-yes") {
    state = resetState();
    loadError = false;
    resetArmed = false;
    applyTheme(state.settings.theme);
    history.replaceState(null, "", "#/kurs");
    render();
    return;
  }
  if (name === "retry-preview") {
    location.hash = "#/ustawienia";
    return;
  }
  if (name === "retry-fatal") {
    try {
      state = resetState();
      loadError = false;
      applyTheme(state.settings.theme);
      history.replaceState(null, "", "#/kurs");
      render();
    } catch {
      loadError = true;
      state = null;
      render();
    }
  }
}

function start() {
  const loaded = loadState();
  state = loaded.state;
  loadError = loaded.loadError;
  if (state) applyTheme(state.settings.theme);
  if (!location.hash) history.replaceState(null, "", "#/kurs");
  app.addEventListener("click", onClick);
  window.addEventListener("hashchange", show);
  colorScheme.addEventListener("change", () => {
    if (state && state.settings.theme === "system") applyTheme("system");
  });
  show();
}

const wait = reducedMotion.matches ? 0 : 650;
window.setTimeout(start, wait);
