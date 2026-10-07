/**
 * Ekran lekcji: pigułka, spis treści, sekcje i wejście w quiz.
 * Moduły bez treści pokazują pigułkę i zapowiedź („treść w kroku 3”).
 */

import { escapeHtml } from "../dom.js";
import { getLesson, getModule, courseMeta } from "../data/course.js";
import { getState } from "../store.js";
import { hasLessonQuiz, isLessonDone, getQuizResult } from "../logic/progress.js";
import { lessonStatus } from "../logic/locks.js";
import { badge, pill } from "../ui/components.js";import { emptyState, primaryAction } from "../ui/states.js";
import { iconMarkup } from "../ui/icons.js";
import { backButton } from "./course.js";

/** Spis treści zbudowany z nagłówków sekcji. */
function tableOfContents(lesson) {
  if (!lesson.sections.length) return "";
  const items = lesson.sections
    .map(
      (section, i) => `
      <button type="button" class="toc__item" data-action="jump" data-target="section-${section.id}">
        <span class="toc__num">${i + 1}</span>
        <span>${escapeHtml(section.heading)}</span>
      </button>`
    )
    .join("");

  return `
    <section class="card">
      <div class="card__head">
        <div class="card__title">Spis treści</div>
        <span class="note">${lesson.sections.length} sekcje</span>
      </div>
      <nav class="toc" aria-label="Spis treści lekcji" style="margin-top:8px">${items}</nav>
    </section>`;
}

function sections(lesson) {
  if (!lesson.sections.length) {
    return `
      <section class="card">
        <div class="card__head">
          <div class="card__title">Treść lekcji</div>
          ${badge("W kroku 3", "warn")}
        </div>
        <p class="card__text" style="margin-top:12px">
          Ta lekcja ma na razie pigułkę i układ ekranu. Pełna treść pojawi się w kroku 3 —
          quiz modułu jest już dostępny.
        </p>
      </section>`;
  }

  const blocks = lesson.sections
    .map(
      (section) => `
      <section class="card section" id="section-${section.id}">
        <h2 class="section__heading">${escapeHtml(section.heading)}</h2>
        ${section.paragraphs.map((p) => `<p class="card__text">${escapeHtml(p)}</p>`).join("")}
        ${
          section.list
            ? `<ul class="section__list">${section.list
                .map((item) => `<li>${escapeHtml(item)}</li>`)
                .join("")}</ul>`
            : ""
        }
      </section>`
    )
    .join("");

  return blocks;
}

function practiceCard(lesson) {
  if (!lesson.practice) return "";
  return `
    <section class="card card--flat">
      <div class="card__head">
        <div class="card__title">${escapeHtml(lesson.practice.title)}</div>
        ${badge("Ćwiczenie", "accent")}
      </div>
      <ol class="section__list" style="margin-top:12px">
        ${lesson.practice.steps
          .map((step, i) => `<li><strong>${i + 1}.</strong><span>${escapeHtml(step)}</span></li>`)
          .join("")}
      </ol>
    </section>`;
}

export function lessonScreen(moduleId, lessonIndex) {
  const found = getLesson(moduleId, lessonIndex);
  if (!found) return lessonNotFound();

  const { lesson, index } = found;
  const mod = getModule(moduleId);
  const state = getState();
  const done = isLessonDone(state, moduleId, index);
  const status = lessonStatus(state, moduleId, index);
  const quiz = hasLessonQuiz(moduleId, index);
  const quizResult = getQuizResult(state, "lesson", lesson.id);
  const isLast = index === mod.lessons.length - 1;

  const nextPath = isLast
    ? `kurs/modul/${mod.id}/quiz-modulu`
    : `kurs/modul/${mod.id}/lekcja/${index + 1}`;

  return `
    <header class="screen-header">
      ${backButton(`kurs/modul/${mod.id}`, `Moduł ${mod.index}`)}
      <div class="lesson-hero">
        <div class="module-card__index">Lekcja ${index + 1} z ${mod.lessons.length}</div>
        <h1>${escapeHtml(lesson.title)}</h1>
        <p>${escapeHtml(lesson.summary)}</p>
      </div>
      ${pill(lesson.pill)}
      <div class="quiz-progress" style="margin-top:4px">
        <span class="quiz-progress__text">${lesson.durationMin} min</span>
        ${badge(status === "done" ? "Przeczytane" : status === "current" ? "Teraz" : "Do przodu", 
          status === "done" ? "ok" : status === "current" ? "accent" : "")}
      </div>
    </header>

    ${tableOfContents(lesson)}
    ${sections(lesson)}
    ${practiceCard(lesson)}

    ${
      quiz
        ? `<section class="card">
            <div class="card__head">
              <div>
                <div class="card__title">Quiz lekcji</div>
                <p class="card__desc" style="margin-top:4px">3 pytania z wyjaśnieniami po każdej odpowiedzi.</p>
              </div>
              ${
                quizResult
                  ? badge(`${quizResult.score}/${quizResult.total}`, quizResult.passed ? "ok" : "warn")
                  : badge("3 pytania", "accent")
              }
            </div>
            <button type="button" class="btn btn--primary btn--block" style="margin-top:12px"
                    data-path="kurs/modul/${mod.id}/lekcja/${index}/quiz">
              ${iconMarkup("cap", { size: 18 })}<span>${quizResult ? "Powtórz quiz" : "Rozpocznij quiz"}</span>
            </button>
          </section>`
        : `<section class="card card--flat">
            <div class="card__title">Quiz lekcji</div>
            <p class="card__desc" style="margin-top:6px">
              Quiz lekcji pojawi się razem z pełną treścią w kroku 3. Quiz modułu działa już teraz.
            </p>
          </section>`
    }

    <div class="lesson-footer">
      <button type="button" class="btn ${done ? "btn--ghost" : "btn--primary"} btn--sm" data-action="mark-done"
              data-module="${mod.id}" data-index="${index}">
        ${iconMarkup("check", { size: 16 })}<span>${done ? "Oznacz jako nieprzeczytane" : "Oznacz jako przeczytane"}</span>
      </button>
      <button type="button" class="btn btn--quiet btn--sm" data-path="kurs/modul/${mod.id}/quiz-modulu">
        Quiz modułu
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
      text: "Lekcja mogła zostać zmieniona lub usunięta.",
      actionHtml: primaryAction("Wróć do kursu", "nav", "kurs"),
    })}`;
}
