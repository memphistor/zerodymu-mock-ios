/**
 * Ekran quizu: quiz lekcji (3 pytania), quiz modułu (5), egzamin (10).
 *
 * Widok jest w pełni wyprowadzany ze stanu: odpowiedzi trzymamy w sesji
 * (klucz = ścieżka trasy), a wynik w `progress.quizzes`. Dzięki temu każdy
 * ponowny render odtwarza dokładnie ten sam obraz — bez ręcznej manipulacji
 * DOM-em i bez gubienia odpowiedzi.
 *
 * Przebieg: wybór jest oceniany od razu (poprawna / błędna) i pokazuje
 * wyjaśnienie. „Zakończ” pokazuje wynik i zapisuje go w postępie.
 */

import { escapeHtml } from "../dom.js";
import { getQuiz } from "../data/course.js";
import { getState } from "../store.js";
import { recordQuizResult, getQuizResult } from "../logic/progress.js";
import { badge } from "../ui/components.js";
import { emptyState, primaryAction } from "../ui/states.js";
import { iconMarkup } from "../ui/icons.js";
import { backButton } from "./course.js";

const KEYS = ["A", "B", "C", "D"];

/** Sesje quizu trzymane poza DOM-em; klucz = ścieżka trasy. */
const sessions = new Map();

export function getSession(routeKey) {
  if (!sessions.has(routeKey)) sessions.set(routeKey, { answers: {}, finished: false });
  return sessions.get(routeKey);
}

export function resetSession(routeKey) {
  sessions.delete(routeKey);
}

/** Trasa → deskryptor quizu (lekcja / moduł / egzamin). */
export function resolveQuiz(route) {
  if (!route || route.screen !== "quiz") return null;

  if (route.exam) {
    const quiz = getQuiz("exam", null);
    return quiz ? { quiz, id: "exam", backPath: "kurs", backLabel: "Kurs" } : null;
  }

  const quiz = getQuiz(route.moduleId, route.lessonIndex);
  if (!quiz) return null;

  if (quiz.kind === "lesson") {
    return {
      quiz,
      id: quiz.lesson.id,
      backPath: `kurs/modul/${quiz.module.id}/lekcja/${quiz.lessonIndex}`,
      backLabel: `Lekcja ${quiz.lessonIndex + 1}`,
    };
  }

  return {
    quiz,
    id: quiz.module.id,
    backPath: `kurs/modul/${quiz.module.id}`,
    backLabel: `Moduł ${quiz.module.index}`,
  };
}

export function quizScreen(route) {
  const resolved = resolveQuiz(route);
  if (!resolved) return quizNotFound();

  const { quiz, id, backPath, backLabel } = resolved;
  const total = quiz.questions.length;
  const session = getSession(route.path);
  const answeredCount = Object.keys(session.answers).length;
  const allAnswered = answeredCount === total;
  const score = quiz.questions.reduce(
    (sum, question, index) => sum + (session.answers[index] === question.answerIndex ? 1 : 0),
    0
  );
  const locked = session.finished;
  const percent = Math.round((answeredCount / total) * 100);

  const title =
    quiz.kind === "exam"
      ? "Egzamin końcowy"
      : quiz.kind === "lesson"
        ? `Quiz: ${quiz.lesson.title}`
        : `Quiz modułu ${quiz.module.index}`;
  const subtitle =
    quiz.kind === "exam"
      ? `${total} pytań z całego kursu · zaliczenie od ${quiz.passScore}/${total}`
      : quiz.kind === "lesson"
        ? `${total} pytania z tej lekcji, z wyjaśnieniami`
        : `${total} pytań z materiału modułu, z wyjaśnieniami`;

  const questions = quiz.questions
    .map((question, qi) => {
      const picked = session.answers[qi];
      const isAnswered = picked !== undefined;

      const options = question.options
        .map((option, oi) => {
          const isPicked = picked === oi;
          const isCorrect = oi === question.answerIndex;
          let cls = "option";
          if (isAnswered && isCorrect) cls += " option--correct";
          else if (isAnswered && isPicked) cls += " option--wrong";

          const mark = isAnswered && isCorrect ? "Poprawna" : isAnswered && isPicked ? "Twój wybór" : "";

          return `
        <button type="button" class="${cls}" data-action="answer"
                data-question="${qi}" data-option="${oi}"
                aria-pressed="${isPicked}"${locked ? " disabled" : ""}>
          <span class="option__key" aria-hidden="true">${KEYS[oi] ?? oi + 1}</span>
          <span>${escapeHtml(option)}</span>
          <span class="option__mark" aria-hidden="true">${mark}</span>
        </button>`;
        })
        .join("");

      return `
      <section class="card quiz-question" data-question-block="${qi}">
        <div class="card__head">
          <div class="quiz-question__prompt">${escapeHtml(question.prompt)}</div>
          ${badge(`${qi + 1}/${total}`, "")}
        </div>
        <div class="options">${options}</div>
        <p class="explanation"${isAnswered ? "" : " hidden"}>
          <span class="explanation__label">Wyjaśnienie</span>${escapeHtml(question.explanation)}
        </p>
      </section>`;
    })
    .join("");

  const previous = getQuizResult(getState(), quiz.kind, id);
  const showPrevious = previous && !session.finished;
  const resultText = passedText(quiz, score, total);

  return `
    <header class="screen-header">
      ${backButton(backPath, backLabel)}
      <div class="lesson-hero">
        <div class="module-card__index">${
          quiz.kind === "exam" ? "Egzamin" : quiz.kind === "lesson" ? "Quiz lekcji" : "Quiz modułu"
        }</div>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(subtitle)}</p>
      </div>
      <div class="quiz-progress">
        <span class="quiz-progress__text">${answeredCount}/${total}</span>
        <div class="progress" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress__bar" style="width:${percent}%"></div>
        </div>
      </div>
    </header>

    ${
      showPrevious
        ? `<div class="banner" role="status">
             <span aria-hidden="true">${iconMarkup("check", { size: 18 })}</span>
             <div>
               <div class="banner__title">Poprzedni wynik: ${previous.score}/${previous.total}</div>
               <span>Nowy wynik zastąpi poprzedni.</span>
             </div>
           </div>`
        : ""
    }

    ${questions}

    ${
      session.finished
        ? `<section class="card">
             <div class="card__head">
               <div class="card__title">Twój wynik</div>
               ${badge(score >= Math.ceil(total * 0.6) ? "Zaliczone" : "Do powtórki", score >= Math.ceil(total * 0.6) ? "ok" : "warn")}
             </div>
             <p style="margin-top:12px">
               <span class="result-score">${score}</span><span class="result-score__unit">/${total}</span>
             </p>
             <p class="card__desc" style="margin-top:4px">${escapeHtml(resultText)}</p>
             <div class="lesson-footer" style="margin-top:16px">
               <button type="button" class="btn btn--ghost btn--sm" data-action="retry-quiz">
                 ${iconMarkup("refresh", { size: 16 })}<span>Spróbuj jeszcze raz</span>
               </button>
               <button type="button" class="btn btn--quiet btn--sm" data-path="${backPath}">Wróć</button>
             </div>
           </section>`
        : `<div class="lesson-footer">
             <button type="button" class="btn btn--primary btn--block" data-action="finish-quiz"
                     ${allAnswered ? "" : 'disabled aria-disabled="true"'}>
               Zakończ i pokaż wynik
             </button>
           </div>
           <p class="note">${
             allAnswered
               ? "Gotowe — zakończ, żeby zapisać wynik."
               : `Odpowiedz na wszystkie pytania (${answeredCount}/${total}). Wybór można zmienić.`
           }</p>`
    }
  `;
}

function passedText(quiz, score, total) {
  const threshold = quiz.kind === "exam" ? quiz.passScore : Math.ceil(total * 0.6);
  if (score >= threshold) {
    return quiz.kind === "exam"
      ? "Egzamin zaliczony. Cały kurs masz zamknięty — dobra robota."
      : "Dobry wynik. Możesz przejść dalej albo powtórzyć quiz później.";
  }
  return quiz.kind === "exam"
    ? `Do zaliczenia potrzebujesz ${threshold}/${total}. Wróć do modułów i spróbuj ponownie.`
    : "Warto wrócić do lekcji i powtórzyć materiał — ten quiz możesz zrobić jeszcze raz.";
}

/* --- Akcje quizu (wołane z app.js) --- */

export function answerQuestion(routeKey, questionIndex, optionIndex) {
  const session = getSession(routeKey);
  if (session.finished) return;
  session.answers[questionIndex] = optionIndex;
}

export function finishQuiz(routeKey, quiz, id) {
  const session = getSession(routeKey);
  const total = quiz.questions.length;
  const score = quiz.questions.reduce(
    (sum, question, index) => sum + (session.answers[index] === question.answerIndex ? 1 : 0),
    0
  );
  session.finished = true;
  recordQuizResult({ kind: quiz.kind, id, score, total });
  return { score, total };
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
