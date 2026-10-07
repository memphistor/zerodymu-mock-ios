import { MODULES, getModule, getLessonByIndex, EXAM_QUIZ_ID } from "../data/course.js";
import { renderEmpty } from "../ui/states.js";
import { navigate, paths } from "../router.js";
import {
  getModuleProgress,
  getCourseProgress,
  moduleStatusLabel,
  isLessonCompleted,
  isLessonQuizPassed,
  isModuleQuizPassed,
  isExamPassed,
} from "../logic/progress.js";
import {
  isModuleVisuallyLocked,
  isLessonVisuallyLocked,
  canNavigateToModule,
  canNavigateToLesson,
  lockBadge,
} from "../logic/locks.js";
import { renderQuizScreen, bindQuizEvents } from "./quiz.js";

function lessonIndexInModule(moduleId, lessonId) {
  const mod = getModule(moduleId);
  if (!mod) return 1;
  const i = mod.lessons.findIndex((l) => l.id === lessonId);
  return i >= 0 ? i + 1 : 1;
}

export function renderCourseList() {
  const course = getCourseProgress();

  const cards = MODULES.map((m, i) => {
    const p = getModuleProgress(m.id);
    const locked = isModuleVisuallyLocked(m.id);
    const status = moduleStatusLabel(m.id);
    return `
    <button type="button" class="card card--interactive ${locked ? "card--locked" : ""}" data-module="${m.id}" ${!canNavigateToModule(m.id) ? "disabled" : ""}>
      <div class="course-module-meta">
        <span class="chip">Moduł ${i + 1}</span>
        ${lockBadge(locked)}
        <span class="chip chip--muted">${status}</span>
      </div>
      <h3 class="card__title">${m.title}</h3>
      <p class="card__desc">${m.description}</p>
      <div class="progress-bar" aria-label="Postęp modułu ${p.pct}%">
        <div class="progress-bar__fill" style="width:${p.pct}%"></div>
      </div>
      <p class="card__desc">${p.done}/${p.total} lekcji</p>
    </button>
  `;
  }).join("");

  const examChip = isExamPassed()
    ? '<span class="chip">Egzamin zaliczony</span>'
    : '<span class="chip">10 pytań</span>';

  return `
    <header class="screen-header">
      <h1>Kurs</h1>
      <p>Kaizen, Ikigai i rzucanie palenia małymi krokami — pełny dostęp, bez paywalla.</p>
      <p class="card__desc">Postęp kursu: ${course.done}/${course.total} lekcji (${course.pct}%)</p>
    </header>
    <div class="card-list">${cards}</div>
    <section class="card" style="margin-top:16px">
      <h2 class="card__title">Egzamin końcowy</h2>
      <p class="card__desc">Podsumowanie całej ścieżki — 10 pytań z wyjaśnieniami.</p>
      <div class="course-module-meta">${examChip}</div>
      <div class="btn-row">
        <button type="button" class="btn btn--primary" data-exam="1">Rozpocznij egzamin</button>
      </div>
    </section>
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

  const p = getModuleProgress(moduleId);
  const modQuizDone = isModuleQuizPassed(moduleId);

  const lessons = mod.lessons
    .map((lesson, idx) => {
      const locked = isLessonVisuallyLocked(lesson.id);
      const done = isLessonCompleted(lesson.id);
      const quizOk = isLessonQuizPassed(lesson.id);
      return `
      <button type="button" class="card card--interactive ${locked ? "card--locked" : ""}" data-lesson="${idx + 1}" data-lesson-id="${lesson.id}">
        <div class="course-module-meta">
          <span class="chip">Lekcja ${idx + 1}</span>
          ${lockBadge(locked)}
          ${done ? '<span class="chip">Przeczytana</span>' : ""}
          ${quizOk ? '<span class="chip">Quiz ✓</span>' : ""}
        </div>
        <h3 class="card__title">${lesson.title}</h3>
        <p class="card__desc">${lesson.pill} · ${lesson.sections.length} sekcji</p>
      </button>
    `;
    })
    .join("");

  return `
    <div class="toolbar">
      <button type="button" class="back-link" data-nav="kurs">← Kurs</button>
    </div>
    <header class="screen-header">
      <h1>${mod.title}</h1>
      <p>${mod.description}</p>
      <div class="progress-bar" aria-label="Postęp ${p.pct}%">
        <div class="progress-bar__fill" style="width:${p.pct}%"></div>
      </div>
      <p class="card__desc">${p.done}/${p.total} lekcji ukończonych</p>
    </header>
    <div class="card-list">${lessons}</div>
    <div class="btn-row">
      <button type="button" class="btn btn--ghost" data-module-quiz="1">
        Quiz modułowy (5 pytań) ${modQuizDone ? "✓" : ""}
      </button>
    </div>
  `;
}

export function renderLessonScreen(moduleId, lessonIndex) {
  const lesson = getLessonByIndex(moduleId, lessonIndex);
  const mod = getModule(moduleId);
  if (!lesson || !mod) return renderModuleScreen(moduleId);

  const toc = lesson.sections
    .map(
      (s) =>
        `<li><a href="#section-${s.id}" class="toc-link">${s.title}</a></li>`
    )
    .join("");

  const sections = lesson.sections
    .map(
      (s) => `
    <section id="section-${s.id}" class="lesson-section">
      <h3>${s.title}</h3>
      <p>${s.body}</p>
    </section>
  `
    )
    .join("");

  const quizDone = isLessonQuizPassed(lesson.id);

  return `
    <div class="toolbar">
      <button type="button" class="back-link" data-nav-module="${moduleId}">← Moduł</button>
      <span class="chip lesson-pill">${lesson.pill}</span>
    </div>
    <article class="lesson-layout card">
      <h2>${lesson.title}</h2>
      <p class="card__desc">${mod.title}</p>
      <nav class="lesson-toc" aria-label="Spis treści">
        <p class="card__title">Spis treści</p>
        <ol>${toc}</ol>
      </nav>
      <div class="lesson-sections">${sections}</div>
      <div class="btn-row">
        <button type="button" class="btn btn--primary" data-lesson-quiz="1">
          Quiz lekcyjny (3 pytania) ${quizDone ? "✓" : ""}
        </button>
        <button type="button" class="btn btn--ghost" data-mark-read="1">Oznacz jako przeczytaną</button>
      </div>
    </article>
  `;
}

export function bindCourseEvents(root, route) {
  root.querySelectorAll("[data-module]").forEach((el) => {
    el.addEventListener("click", () => {
      if (!canNavigateToModule(el.dataset.module) && isModuleVisuallyLocked(el.dataset.module)) return;
      navigate(paths.module(el.dataset.module));
    });
  });

  root.querySelectorAll("[data-lesson]").forEach((el) => {
    el.addEventListener("click", () => {
      const moduleId = route.course?.moduleId;
      const lessonId = el.dataset.lessonId;
      if (lessonId && !canNavigateToLesson(lessonId) && isLessonVisuallyLocked(lessonId)) return;
      if (moduleId) navigate(paths.lesson(moduleId, el.dataset.lesson));
    });
  });

  root.querySelectorAll("[data-module-quiz]").forEach((el) => {
    el.addEventListener("click", () => {
      const moduleId = route.course?.moduleId;
      if (moduleId) navigate(paths.moduleQuiz(moduleId));
    });
  });

  root.querySelectorAll("[data-lesson-quiz]").forEach((el) => {
    el.addEventListener("click", () => {
      const moduleId = route.course?.moduleId;
      const lessonIndex = route.course?.lessonIndex;
      if (moduleId && lessonIndex) navigate(paths.lessonQuiz(moduleId, lessonIndex));
    });
  });

  root.querySelectorAll("[data-mark-read]").forEach((el) => {
    el.addEventListener("click", () => {
      const lesson = getLessonByIndex(route.course?.moduleId, route.course?.lessonIndex);
      if (lesson) {
        import("../logic/progress.js").then(({ markLessonCompleted }) => markLessonCompleted(lesson.id));
      }
    });
  });

  root.querySelectorAll("[data-exam]").forEach((el) => {
    el.addEventListener("click", () => navigate(paths.exam()));
  });

  root.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => navigate(el.dataset.nav));
  });

  root.querySelectorAll("[data-nav-module]").forEach((el) => {
    el.addEventListener("click", () => navigate(paths.module(el.dataset.navModule)));
  });

  root.querySelectorAll(".toc-link").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.getAttribute("href")?.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

export function renderCourse(route) {
  const c = route.course;
  if (!c) return renderCourseList();
  if (c.screen === "module") return renderModuleScreen(c.moduleId);
  if (c.screen === "lesson") return renderLessonScreen(c.moduleId, c.lessonIndex);
  if (c.screen === "lessonQuiz") {
    const lesson = getLessonByIndex(c.moduleId, c.lessonIndex);
    const html = renderQuizScreen(lesson?.lessonQuizId, {
      type: "lesson",
      moduleId: c.moduleId,
      lessonIndex: c.lessonIndex,
      lessonId: lesson?.id,
    });
    return html;
  }
  if (c.screen === "moduleQuiz") {
    const mod = getModule(c.moduleId);
    return renderQuizScreen(mod?.moduleQuizId, { type: "module", moduleId: c.moduleId });
  }
  if (c.screen === "exam") {
    return renderQuizScreen(EXAM_QUIZ_ID, { type: "exam" });
  }
  return renderCourseList();
}

export function bindCourseQuizEvents(root, route) {
  const c = route.course;
  if (!c || !["lessonQuiz", "moduleQuiz", "exam"].includes(c.screen)) return;
  const lesson = c.lessonIndex ? getLessonByIndex(c.moduleId, c.lessonIndex) : null;
  bindQuizEvents(root, {
    type: c.screen === "exam" ? "exam" : c.screen === "moduleQuiz" ? "module" : "lesson",
    moduleId: c.moduleId,
    lessonIndex: c.lessonIndex,
    lessonId: lesson?.id,
  });
}
