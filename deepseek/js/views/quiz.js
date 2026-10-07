/**
 * Ekran quizu (lekcyjny i modułowy). W kroku 1 pokazujemy układ:
 * pytania-placeholdery, wybór odpowiedzi i ekran wyniku bez zapisu ocen.
 */

import { escapeHtml } from "../dom.js";
import { getQuiz } from "../data/course.js";
import { badge, progressBar } from "../ui/components.js";
import { emptyState, primaryAction } from "../ui/states.js";
import { backButton } from "./course.js";

const KEYS = ["A", "B", "C", "D"];

export function quizScreen(moduleId, lessonIndex) {
  const quiz = getQuiz(moduleId, lessonIndex);
  if (!quiz) return quizNotFound();

  const mod = quiz.module;
  const backLabel = quiz.kind === "lesson" ? `Lekcja ${quiz.lessonIndex + 1}` : `Moduł ${mod.index}`;
  const backPath =
    quiz.kind === "lesson"
      ? `kurs/modul/${mod.id}/lekcja/${quiz.lessonIndex}`
      : `kurs/modul/${mod.id}`;

  const questions = quiz.questions
    .map((question, i) => {
      const options = question.options
        .map(
          (option, oi) => `
        <button type="button" class="option" data-action="answer" data-question="${i}" data-option="${oi}" aria-pressed="false">
          <span class="option__key" aria-hidden="true">${KEYS[oi] ?? oi + 1}</span>
          <span>${escapeHtml(option)}</span>
        </button>`
        )
        .join("");

      return `
      <section class="card quiz-question" data-question-block="${i}">
        <div class="card__head">
          <div class="quiz-question__prompt">${escapeHtml(question.prompt)}</div>
          ${badge(`${i + 1}/${quiz.questions.length}`, "")}
        </div>
        <div class="options">${options}</div>
      </section>`;
    })
    .join("");

  return `
    <header class="screen-header">
      ${backButton(backPath, backLabel)}
      <div class="lesson-hero">
        <div class="module-card__index">${quiz.kind === "lesson" ? "Quiz lekcji" : "Quiz modułu"}</div>
        <h1>${escapeHtml(quiz.title)}</h1>
        <p>${quiz.questions.length} pytania · wersja demonstracyjna (bez zapisu wyniku)</p>
      </div>
      ${progressBar(0, { empty: true })}
    </header>

    ${questions}

    <div class="lesson-footer">
      <button type="button" class="btn btn--primary btn--block" data-action="finish-quiz">
        Zakończ quiz (placeholder)
      </button>
    </div>

    <p class="note">Ocena i zapis odpowiedzi pojawią się w kolejnym kroku.</p>

    <template id="quiz-result-template">
      ${emptyState({
        icon: "check",
        title: "Wynik quizu (placeholder)",
        text: "Tu pojawi się podsumowanie odpowiedzi i przycisk powrotu do modułu.",
        actionHtml: primaryAction("Wróć do modułu", "nav", `kurs/modul/${mod.id}`),
      })}
    </template>
  `;
}

function quizNotFound() {
  return `
    <header class="screen-header">
      ${backButton()}
      <h1>Nie znaleziono quizu</h1>
    </header>
    ${emptyState({
      icon: "warn",
      title: "Brak quizu pod tym odnośnikiem",
      text: "Sprawdź moduł i numer lekcji albo wróć do listy kursu.",
      actionHtml: primaryAction("Wróć do kursu", "nav", "kurs"),
    })}`;
}
