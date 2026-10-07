import { MODULES, findLesson, findModule, moduleIndex } from "./catalog.js";
import { EXAM, lessonQuiz, moduleQuiz, passMark } from "./quizzes.js";
import { loadState, resetState, saveState } from "./store.js";
import { backLink, emptyView, errorView, escapeHtml, shell } from "./ui.js";

const app = document.querySelector("#app");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

let state = null;
let loadError = false;
let resetArmed = false;
let quizSession = null;

function lessonKey(moduleId, lessonId) {
  return `${moduleId}/${lessonId}`;
}

function lessonQuizKey(moduleId, lessonId) {
  return `lekcja:${moduleId}/${lessonId}`;
}

function moduleQuizKey(moduleId) {
  return `modul:${moduleId}`;
}

function quizRecord(key) {
  return state.progress.quizzes[key] || null;
}

function isPassed(key) {
  return Boolean(quizRecord(key)?.passed);
}

function isOpened(moduleId, lessonId) {
  return Boolean(state.progress.lessons[lessonKey(moduleId, lessonId)]);
}

function lessonPassed(moduleId, lessonId) {
  return isPassed(lessonQuizKey(moduleId, lessonId));
}

function moduleQuizPassed(moduleId) {
  return isPassed(moduleQuizKey(moduleId));
}

function passedInModule(moduleId) {
  const module = findModule(moduleId);
  if (!module) return 0;
  return module.lessons.filter((lesson) => lessonPassed(moduleId, lesson.id)).length;
}

function lessonLooksLocked(moduleId, lessonIndex) {
  const index = moduleIndex(moduleId);
  if (index < 0) return false;
  if (lessonIndex === 0) {
    if (index === 0) return false;
    return !moduleQuizPassed(MODULES[index - 1].id);
  }
  const module = MODULES[index];
  return !lessonPassed(module.id, module.lessons[lessonIndex - 1].id);
}

function moduleLooksLocked(moduleId) {
  const index = moduleIndex(moduleId);
  if (index <= 0) return false;
  return !moduleQuizPassed(MODULES[index - 1].id);
}

function moduleQuizLooksLocked(moduleId) {
  const module = findModule(moduleId);
  if (!module) return false;
  return module.lessons.some((lesson) => !lessonPassed(moduleId, lesson.id));
}

function examLooksLocked() {
  return MODULES.some((module) => !moduleQuizPassed(module.id));
}

function chip(locked, label) {
  const cls = locked ? "chip chip-lock" : "chip";
  return `<span class="${cls}">${escapeHtml(label)}</span>`;
}

function lessonStatus(moduleId, lesson, lessonIndex) {
  if (lessonPassed(moduleId, lesson.id)) return { locked: false, label: "Zaliczona" };
  if (lessonLooksLocked(moduleId, lessonIndex)) return { locked: true, label: "Podgląd blokady" };
  if (isOpened(moduleId, lesson.id)) return { locked: false, label: "W toku" };
  return { locked: false, label: "Dostępna" };
}

function moduleStatus(module) {
  if (moduleQuizPassed(module.id)) return { locked: false, label: "Quiz zaliczony" };
  if (moduleLooksLocked(module.id)) return { locked: true, label: "Podgląd blokady" };
  if (module.lessons.some((lesson) => isOpened(module.id, lesson.id) || lessonPassed(module.id, lesson.id))) {
    return { locked: false, label: "W toku" };
  }
  return { locked: false, label: "Dostępny" };
}

function progressBar(done, total, label) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return `<div class="bar" role="progressbar" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${total}" aria-label="${escapeHtml(label)}">
    <span style="width:${pct}%"></span>
  </div>`;
}

function parseRoute() {
  const parts = (location.hash || "#/kurs").replace(/^#/, "").split("/").filter(Boolean);
  const name = parts[0] || "kurs";
  if (name === "modul" && parts[1]) return { name, moduleId: parts[1] };
  if (name === "lekcja" && parts[1] && parts[2]) {
    return { name, moduleId: parts[1], lessonId: parts[2] };
  }
  if (name === "quiz" && parts[1] === "lekcja" && parts[2] && parts[3]) {
    return { name: "quiz-lekcji", moduleId: parts[2], lessonId: parts[3] };
  }
  if (name === "quiz" && parts[1] === "modul" && parts[2]) {
    return { name: "quiz-modulu", moduleId: parts[2] };
  }
  if (name === "quiz" && parts[1]) return { name: "quiz-modulu", moduleId: parts[1] };
  if (name === "egzamin") return { name: "egzamin" };
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
    egzamin: "Egzamin",
  };
  if (names[route.name]) return names[route.name];
  if (route.name === "modul") return findModule(route.moduleId)?.title || "Moduł";
  if (route.name === "lekcja") return findLesson(route.moduleId, route.lessonId)?.lesson.title || "Lekcja";
  if (route.name === "quiz-lekcji" || route.name === "quiz-modulu") return "Quiz";
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
    const status = moduleStatus(module);
    const done = passedInModule(module.id);
    const number = String(index + 1).padStart(2, "0");
    return `<li>
      <a class="card" href="#/modul/${module.id}">
        <span class="index">${number}</span>
        <span class="card-copy">
          <span class="card-title">${escapeHtml(module.title)}</span>
          <span class="card-text">${escapeHtml(module.summary)}</span>
          ${progressBar(done, module.lessons.length, `Postęp modułu ${module.title}`)}
          <span class="meta">${chip(status.locked, status.label)} ${done} / ${module.lessons.length} ${lessonWord(module.lessons.length)}</span>
        </span>
      </a>
    </li>`;
  }).join("");

  const exam = examLooksLocked();
  const examRecord = quizRecord("egzamin");
  const examLabel = examRecord?.passed ? "Zaliczony" : exam ? "Podgląd blokady" : "Dostępny";

  return `<header class="top">
      <p class="brand">ZeroDymu</p>
      <h1>Kurs</h1>
      <p class="lede">Sześć modułów o małych krokach, Ikigai i dniu bez dymu. Jesteś kursantem od pierwszej lekcji.</p>
      <p class="fine">Kłódka to podgląd. Wejście zostaje otwarte — pełna logika blokad dojdzie w kroku 3.</p>
    </header>
    <ol class="modules">${items}</ol>
    <a class="row quiz-row" href="#/egzamin">
      <span class="row-copy">
        <span class="row-title">Egzamin kursu</span>
        <span class="row-text">10 pytań z sześciu modułów.</span>
        <span class="meta">${chip(exam && !examRecord?.passed, examLabel)}</span>
      </span>
    </a>`;
}

function moduleView(moduleId) {
  const module = findModule(moduleId);
  if (!module) {
    return missing("Nie ma takiego modułu", "Wróć do listy. Sześć modułów jest na miejscu.", "#/kurs", "Wróć do kursu");
  }
  const done = passedInModule(module.id);
  const moduleLocked = moduleLooksLocked(module.id);
  const lessons = module.lessons
    .map((lesson, index) => {
      const status = lessonStatus(module.id, lesson, index);
      return `<li>
        <a class="row" href="#/lekcja/${module.id}/${lesson.id}">
          <span class="row-index">${index + 1}</span>
          <span class="row-copy">
            <span class="row-title">${escapeHtml(lesson.title)}</span>
            <span class="row-text">${escapeHtml(lesson.blurb)}</span>
            <span class="meta">${chip(status.locked, status.label)}</span>
          </span>
        </a>
      </li>`;
    })
    .join("");

  const quizLocked = moduleQuizLooksLocked(module.id);
  const quizDone = moduleQuizPassed(module.id);
  const quizLabel = quizDone ? "Zaliczony" : quizLocked ? "Podgląd blokady" : "Dostępny";

  return `${backLink("#/kurs", "Kurs")}
    <header class="top tight">
      <p class="kicker">Moduł ${moduleIndex(module.id) + 1}</p>
      <h1>${escapeHtml(module.title)}</h1>
      <p class="lede">${escapeHtml(module.summary)}</p>
      ${progressBar(done, module.lessons.length, "Zaliczone lekcje")}
      <p class="fine">${done} / ${module.lessons.length} ${lessonWord(module.lessons.length)} z zaliczonym quizem</p>
      ${moduleLocked ? `<p class="fine">Podgląd blokady: poprzedni quiz modułowy jeszcze nie jest zaliczony. Da się wejść.</p>` : ""}
    </header>
    <h2 class="section-label">Lekcje</h2>
    <ol class="rows">${lessons}</ol>
    <a class="row quiz-row" href="#/quiz/modul/${module.id}">
      <span class="row-copy">
        <span class="row-title">Quiz modułu</span>
        <span class="row-text">5 pytań z całego modułu.</span>
        <span class="meta">${chip(quizLocked && !quizDone, quizLabel)}</span>
      </span>
    </a>`;
}

function lessonView(moduleId, lessonId) {
  const found = findLesson(moduleId, lessonId);
  if (!found) {
    return missing("Nie ma takiej lekcji", "Ten adres nie prowadzi do lekcji kursu.", "#/kurs", "Wróć do kursu");
  }
  const { module, lesson, index } = found;
  const status = lessonStatus(module.id, lesson, index);
  const toc = lesson.sections
    .map(
      (section) =>
        `<li><button type="button" data-action="toc" data-target="s-${section.id}">${escapeHtml(section.title)}</button></li>`,
    )
    .join("");
  const sections = lesson.sections
    .map(
      (section) => `<section class="prose" id="s-${section.id}">
        <h2>${escapeHtml(section.title)}</h2>
        ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </section>`,
    )
    .join("");

  return `${backLink(`#/modul/${module.id}`, module.title)}
    <header class="top tight">
      <p class="kicker">Lekcja ${index + 1} z ${module.lessons.length}</p>
      <h1>${escapeHtml(lesson.title)}</h1>
      <p class="lede">${escapeHtml(lesson.blurb)}</p>
      <p class="meta">${chip(status.locked, status.label)}</p>
    </header>
    <nav class="toc" aria-label="Spis treści">
      <p class="kicker">Spis</p>
      <ol>${toc}</ol>
    </nav>
    <aside class="pill">
      <p class="kicker">Pigułka</p>
      <p>${escapeHtml(lesson.pill)}</p>
    </aside>
    ${sections}
    <a class="button quiz-entry" href="#/quiz/lekcja/${module.id}/${lesson.id}">Quiz lekcji · 3 pytania</a>`;
}

function questionsFor(route) {
  if (route.name === "quiz-lekcji") {
    const found = findLesson(route.moduleId, route.lessonId);
    const questions = lessonQuiz(route.moduleId, route.lessonId);
    if (!found || !questions) return null;
    return {
      key: lessonQuizKey(route.moduleId, route.lessonId),
      kind: "lekcja",
      title: found.lesson.title,
      kicker: "Quiz lekcji",
      backHref: `#/lekcja/${route.moduleId}/${route.lessonId}`,
      backLabel: found.lesson.title,
      locked: lessonLooksLocked(route.moduleId, found.index),
      questions,
    };
  }
  if (route.name === "quiz-modulu") {
    const module = findModule(route.moduleId);
    const questions = moduleQuiz(route.moduleId);
    if (!module || !questions) return null;
    return {
      key: moduleQuizKey(route.moduleId),
      kind: "modul",
      title: module.title,
      kicker: "Quiz modułu",
      backHref: `#/modul/${route.moduleId}`,
      backLabel: module.title,
      locked: moduleQuizLooksLocked(route.moduleId),
      questions,
    };
  }
  return {
    key: "egzamin",
    kind: "egzamin",
    title: "Egzamin kursu",
    kicker: "Egzamin",
    backHref: "#/kurs",
    backLabel: "Kurs",
    locked: examLooksLocked(),
    questions: EXAM,
  };
}

function ensureSession(spec) {
  if (!quizSession || quizSession.key !== spec.key) {
    quizSession = {
      key: spec.key,
      kind: spec.kind,
      index: 0,
      choice: null,
      revealed: false,
      answers: [],
      hint: "",
      finished: false,
    };
  }
  return quizSession;
}

function optionButtons(question, session) {
  return question.options
    .map((option) => {
      const chosen = session.choice === option.id;
      let cls = "option";
      if (session.revealed && option.id === question.answer) cls += " good";
      else if (session.revealed && chosen) cls += " bad";
      const pressed = !session.revealed && chosen ? "true" : "false";
      const disabled = session.revealed ? " disabled" : "";
      return `<button type="button" class="${cls}" data-action="pick" data-choice="${option.id}" aria-pressed="${pressed}"${disabled}>
        <span class="letter">${option.id}</span>
        <span>${escapeHtml(option.text)}</span>
      </button>`;
    })
    .join("");
}

function quizBody(spec) {
  const session = ensureSession(spec);
  const mark = passMark(spec.kind);
  if (session.finished) {
    const correct = session.answers.filter((item) => item.ok).length;
    const passed = correct >= mark;
    const saved = quizRecord(spec.key);
    return `${backLink(spec.backHref, spec.backLabel)}
      <header class="top tight">
        <p class="kicker">Wynik</p>
        <h1>${correct} z ${spec.questions.length}</h1>
        <p class="lede">${passed ? "Zaliczone. Kolejna kłódka na liście może zgasnąć." : `Jeszcze nie. Próg to ${mark} z ${spec.questions.length}.`}</p>
      </header>
      <p class="fine">${saved ? "Wynik jest zapisany na tym telefonie." : ""}</p>
      <div class="actions">
        <button type="button" class="button" data-action="retake">Spróbuj jeszcze raz</button>
        <a class="button ghost" href="${spec.backHref}">Wróć</a>
      </div>`;
  }

  const question = spec.questions[session.index];
  const explain = session.revealed
    ? `<div class="explain" role="status">
        <p class="kicker">${session.choice === question.answer ? "Trafione" : "Inaczej"}</p>
        <p>${escapeHtml(question.why)}</p>
      </div>`
    : "";
  const nextLabel = session.index === spec.questions.length - 1 ? "Zobacz wynik" : "Następne pytanie";
  const action = session.revealed
    ? `<button type="button" class="button" data-action="next">${nextLabel}</button>`
    : `<button type="button" class="button" data-action="check">Sprawdź</button>`;

  return `${backLink(spec.backHref, spec.backLabel)}
    <header class="top tight">
      <p class="kicker">${escapeHtml(spec.kicker)} · ${session.index + 1} z ${spec.questions.length}</p>
      <h1>${escapeHtml(spec.title)}</h1>
      ${spec.locked ? `<p class="fine">Podgląd blokady. Quiz i tak się otwiera.</p>` : ""}
    </header>
    <p class="question">${escapeHtml(question.prompt)}</p>
    <div class="options" data-options>${optionButtons(question, session)}</div>
    ${session.hint ? `<p class="fine">${escapeHtml(session.hint)}</p>` : ""}
    ${explain}
    <div class="actions">${action}</div>`;
}

function quizView(route) {
  const spec = questionsFor(route);
  if (!spec) {
    return missing("Nie ma takiego quizu", "Wróć do kursu i wybierz lekcję albo moduł.", "#/kurs", "Wróć do kursu");
  }
  return quizBody(spec);
}

function formatStat(value, suffix) {
  if (value === null || value === undefined) return "—";
  return suffix ? `${value} ${suffix}` : String(value);
}

function passedLessonTotal() {
  return Object.keys(state.progress.quizzes).filter((key) => key.startsWith("lekcja:") && state.progress.quizzes[key].passed)
    .length;
}

function lessonTotal() {
  return MODULES.reduce((sum, module) => sum + module.lessons.length, 0);
}

function lessonWord(count) {
  if (count === 1) return "lekcja";
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "lekcje";
  return "lekcji";
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
      <p class="lede quiet">Zaliczone lekcje: ${passedLessonTotal()} / ${lessonTotal()} ${lessonWord(lessonTotal())}</p>
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
      <p class="lede quiet">Lekcje, wyniki quizów i motyw są zapisane lokalnie. Zaliczone lekcje: ${passedLessonTotal()} / ${lessonTotal()}.</p>
      ${confirm}
      <a class="text-link" href="#/blad">Podgląd błędu odczytu</a>
    </section>
    <p class="fine">ZeroDymu · krok 2, treść kursu. Locki wizualne, pełna logika w kroku 3.</p>`;
}

function viewFor(route) {
  switch (route.name) {
    case "modul":
      return moduleView(route.moduleId);
    case "lekcja":
      return lessonView(route.moduleId, route.lessonId);
    case "quiz-lekcji":
    case "quiz-modulu":
    case "egzamin":
      return quizView(route);
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

function routeQuizKey(route) {
  if (route.name === "quiz-lekcji") return lessonQuizKey(route.moduleId, route.lessonId);
  if (route.name === "quiz-modulu") return moduleQuizKey(route.moduleId);
  if (route.name === "egzamin") return "egzamin";
  return null;
}

function show() {
  resetArmed = false;
  const route = parseRoute();
  const key = state ? routeQuizKey(route) : null;
  if (quizSession && quizSession.key !== key) quizSession = null;
  if (state && route.name === "lekcja") markOpened(route.moduleId, route.lessonId);
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

function currentSpec() {
  return questionsFor(parseRoute());
}

function finishQuiz() {
  const spec = currentSpec();
  if (!spec || !quizSession) return;
  const correct = quizSession.answers.filter((item) => item.ok).length;
  const passed = correct >= passMark(spec.kind);
  state.progress.quizzes[spec.key] = {
    correct,
    total: spec.questions.length,
    passed,
    at: new Date().toISOString(),
  };
  state.progress.updatedAt = state.progress.quizzes[spec.key].at;
  saveState(state);
  quizSession.finished = true;
}

function onClick(event) {
  const themeButton = event.target.closest("[data-theme-value]");
  if (themeButton) {
    setTheme(themeButton.dataset.themeValue);
    return;
  }

  const action = event.target.closest("[data-action]");
  if (!action) return;
  const name = action.dataset.action;

  if (name === "pick") {
    if (!quizSession || quizSession.revealed || quizSession.finished) return;
    quizSession.choice = action.dataset.choice;
    quizSession.hint = "";
    const group = action.closest("[data-options]");
    group.querySelectorAll("[data-action='pick']").forEach((button) => {
      button.setAttribute("aria-pressed", button === action ? "true" : "false");
    });
    return;
  }

  if (name === "check") {
    if (!quizSession || quizSession.revealed) return;
    if (!quizSession.choice) {
      quizSession.hint = "Wybierz jedną odpowiedź.";
      render({ focus: false });
      return;
    }
    quizSession.revealed = true;
    render({ focus: false });
    return;
  }

  if (name === "next") {
    const spec = currentSpec();
    if (!spec || !quizSession?.revealed) return;
    const question = spec.questions[quizSession.index];
    quizSession.answers.push({ choice: quizSession.choice, ok: quizSession.choice === question.answer });
    quizSession.index += 1;
    quizSession.choice = null;
    quizSession.revealed = false;
    quizSession.hint = "";
    if (quizSession.index >= spec.questions.length) finishQuiz();
    render({ focus: false });
    window.scrollTo(0, 0);
    return;
  }

  if (name === "retake") {
    const spec = currentSpec();
    if (!spec) return;
    quizSession = null;
    ensureSession(spec);
    render({ focus: false });
    return;
  }

  if (name === "toc") {
    const target = document.getElementById(action.dataset.target);
    target?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    return;
  }

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
    quizSession = null;
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
      quizSession = null;
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
