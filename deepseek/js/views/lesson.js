/** Ekran lekcji: układ bez pełnej treści (placeholder). */

import { escapeHtml } from "../dom.js";
import { getLesson, courseMeta } from "../data/course.js";
import { badge, progressBar } from "../ui/components.js";
import { emptyState, primaryAction } from "../ui/states.js";
import { backButton } from "./course.js";

function stepDots(count, activeIndex) {
  return `<div class="step-dots" aria-hidden="true">${Array.from(
    { length: count },
    (_, i) => `<span class="step-dots__dot ${i <= activeIndex ? "step-dots__dot--done" : ""}"></span>`
  ).join("")}</div>`;
}

export function lessonScreen(moduleId, lessonIndex) {
  const found = getLesson(moduleId, lessonIndex);
  if (!found) return lessonNotFound();

  const { module: mod, lesson, index } = found;
  const isLast = index === mod.lessons.length - 1;
  const nextPath = isLast
    ? `kurs/modul/${mod.id}/quiz-modulu`
    : `kurs/modul/${mod.id}/lekcja/${index + 1}`;

  const body = lesson.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

  return `
    <header class="screen-header">
      ${backButton(`kurs/modul/${mod.id}`, `Moduł ${mod.index}`)}
      <div class="lesson-hero">
        <div class="module-card__index">Lekcja ${index + 1} z ${mod.lessons.length}</div>
        <h1>${escapeHtml(lesson.title)}</h1>
        <p>${escapeHtml(lesson.summary)}</p>
      </div>
      ${stepDots(mod.lessons.length, index)}
    </header>

    <section class="card">
      <div class="card__head">
        <div class="card__title">Treść lekcji</div>
        ${badge(`${lesson.durationMin} min`, "")}
      </div>
      <div class="lesson-body" style="margin-top:12px">${body}</div>
    </section>

    <section class="card card--flat">
      <div class="card__title">Ćwiczenie</div>
      <p class="card__desc" style="margin-top:6px">
        Miejsce na ćwiczenie z tej lekcji — w kroku 1 tylko układ i przyciski.
      </p>
      <div class="module-card__footer">${progressBar(0, { empty: true })}</div>
    </section>

    <div class="lesson-footer">
      <button type="button" class="btn btn--ghost btn--sm" data-action="quiz" data-path="kurs/modul/${mod.id}/lekcja/${index}/quiz">
        Quiz lekcji
      </button>
      <button type="button" class="btn btn--quiet btn--sm" data-action="mark-done">
        Oznacz jako przeczytane
      </button>
    </div>

    <nav class="lesson-nav" aria-label="Nawigacja lekcji">
      <button type="button" class="btn btn--ghost" data-action="prev"${
        index === 0 ? " disabled" : ` data-path="kurs/modul/${mod.id}/lekcja/${index - 1}"`
      }>
        Wstecz
      </button>
      <button type="button" class="btn btn--primary" data-action="next" data-path="${nextPath}">
        ${isLast ? "Do quizu modułu" : "Następna lekcja"}
      </button>
    </nav>

    <p class="note">Moduł ${mod.index} · ${courseMeta.lessonCount} lekcji w całym kursie</p>
  `;
}

function lessonNotFound() {
  return `
    <header class="screen-header">
      ${backButton()}
      <h1>Nie znaleziono lekcji</h1>
    </header>
    ${emptyState({
      icon: "warn",
      title: "Ten odnośnik nie istnieje",
      text: "Lekcja mogła zostać zmieniona w kolejnym kroku kursu.",
      actionHtml: primaryAction("Wróć do kursu", "nav", "kurs"),
    })}`;
}
