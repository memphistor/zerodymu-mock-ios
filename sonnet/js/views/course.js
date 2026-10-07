import { MODULES, getModule } from "../data/modules.js";
import { renderEmpty } from "../ui/states.js";
import { navigate, paths } from "../router.js";

export function renderCourseList() {
  if (!MODULES.length) {
    return renderEmpty({
      icon: "📚",
      title: "Brak modułów",
      text: "Lista kursu pojawi się wkrótce.",
    });
  }

  const cards = MODULES.map(
    (m, i) => `
    <button type="button" class="card card--interactive" data-module="${m.id}">
      <span class="chip">Moduł ${i + 1}</span>
      <h3 class="card__title">${m.title}</h3>
      <p class="card__desc">${m.description}</p>
      <div class="course-module-meta">
        <span class="chip">${m.lessonCount} lekcje · placeholder</span>
      </div>
    </button>
  `
  ).join("");

  return `
    <header class="screen-header">
      <h1>Kurs</h1>
      <p>Pełny dostęp od startu — bez paywalla. Treść lekcji w kolejnych wersjach.</p>
    </header>
    <div class="card-list">${cards}</div>
  `;
}

export function renderModuleScreen(moduleId) {
  const mod = getModule(moduleId);
  if (!mod) {
    return renderEmpty({
      icon: "🔍",
      title: "Nie znaleziono modułu",
      text: "Wróć do listy kursu.",
      actionHtml: `<button type="button" class="btn btn--primary" data-nav="kurs">Lista modułów</button>`,
    });
  }

  const lessons = Array.from({ length: mod.lessonCount }, (_, i) => i + 1)
    .map(
      (n) => `
      <button type="button" class="card card--interactive" data-lesson="${n}">
        <h3 class="card__title">Lekcja ${n}</h3>
        <p class="card__desc">Placeholder — układ lekcji bez pełnej treści.</p>
      </button>
    `
    )
    .join("");

  return `
    <div class="toolbar">
      <button type="button" class="back-link" data-nav="kurs">← Kurs</button>
    </div>
    <header class="screen-header">
      <h1>${mod.title}</h1>
      <p>${mod.description}</p>
    </header>
    <div class="card-list">${lessons}</div>
    <div class="btn-row">
      <button type="button" class="btn btn--ghost" data-quiz="1">Quiz modułu (szkic)</button>
    </div>
  `;
}

export function renderLessonScreen(moduleId, lessonIndex) {
  const mod = getModule(moduleId);
  if (!mod) return renderModuleScreen(moduleId);

  return `
    <div class="toolbar">
      <button type="button" class="back-link" data-nav-module="${moduleId}">← Moduł</button>
    </div>
    <article class="lesson-layout card">
      <h2>Lekcja ${lessonIndex}</h2>
      <p>${mod.title} — miejsce na treść edukacyjną.</p>
      <div class="placeholder-body" aria-hidden="true"></div>
      <p class="card__desc">Sekcje: wprowadzenie, ćwiczenie, podsumowanie (placeholder).</p>
    </article>
  `;
}

export function renderQuizScreen(moduleId) {
  const mod = getModule(moduleId);
  if (!mod) return renderModuleScreen(moduleId);

  return `
    <div class="toolbar">
      <button type="button" class="back-link" data-nav-module="${moduleId}">← Moduł</button>
    </div>
    <article class="quiz-layout card">
      <h2>Quiz — ${mod.title}</h2>
      <p>Layout pytań bez pełnej bazy (krok szkicu).</p>
      <div class="placeholder-body" aria-hidden="true"></div>
      <div class="btn-row">
        <button type="button" class="btn btn--primary" disabled>Oznacz jako ukończone (wkrótce)</button>
      </div>
    </article>
  `;
}

export function bindCourseEvents(root, route) {
  root.querySelectorAll("[data-module]").forEach((el) => {
    el.addEventListener("click", () => navigate(paths.module(el.dataset.module)));
  });
  root.querySelectorAll("[data-lesson]").forEach((el) => {
    el.addEventListener("click", () => {
      const moduleId = route.course?.moduleId;
      if (moduleId) navigate(paths.lesson(moduleId, el.dataset.lesson));
    });
  });
  root.querySelectorAll("[data-quiz]").forEach((el) => {
    el.addEventListener("click", () => {
      const moduleId = route.course?.moduleId;
      if (moduleId) navigate(paths.quiz(moduleId));
    });
  });
  root.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => navigate(el.dataset.nav));
  });
  root.querySelectorAll("[data-nav-module]").forEach((el) => {
    el.addEventListener("click", () => navigate(paths.module(el.dataset.navModule)));
  });
}

export function renderCourse(route) {
  const c = route.course;
  if (!c) return renderCourseList();
  if (c.screen === "module") return renderModuleScreen(c.moduleId);
  if (c.screen === "lesson") return renderLessonScreen(c.moduleId, c.lessonIndex);
  if (c.screen === "quiz") return renderQuizScreen(c.moduleId);
  return renderCourseList();
}
