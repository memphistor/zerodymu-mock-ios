import { getQuiz } from "../data/quizzes.js";
import {
  markLessonQuizPassed,
  markModuleQuizPassed,
  markExamPassed,
  isLessonQuizPassed,
  isModuleQuizPassed,
  isExamPassed,
} from "../logic/progress.js";
import { navigate, paths } from "../router.js";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderQuizScreen(quizId, context = {}) {
  const quiz = getQuiz(quizId);
  if (!quiz) {
    return `<p class="card__desc">Nie znaleziono quizu.</p>`;
  }

  const passed =
    context.type === "lesson"
      ? isLessonQuizPassed(context.lessonId)
      : context.type === "module"
        ? isModuleQuizPassed(context.moduleId)
        : context.type === "exam"
          ? isExamPassed()
          : false;

  const questionsHtml = quiz.questions
    .map((q, qi) => {
      const choices = q.choices
        .map(
          (c, ci) => `
        <label class="quiz-choice">
          <input type="radio" name="q${qi}" value="${ci}" />
          <span><strong>${"ABCD"[ci]}.</strong> ${escapeHtml(c)}</span>
        </label>
      `
        )
        .join("");
      return `
      <div class="quiz-question card" data-qindex="${qi}" data-correct="${q.correct}">
        <p class="quiz-question__prompt">${qi + 1}. ${escapeHtml(q.prompt)}</p>
        <div class="quiz-choices">${choices}</div>
        <div class="quiz-feedback" hidden></div>
      </div>
    `;
    })
    .join("");

  return `
    <div class="toolbar">
      <button type="button" class="back-link" data-quiz-back>Wstecz</button>
    </div>
    <header class="screen-header">
      <h1>${escapeHtml(quiz.title)}</h1>
      <p>${quiz.type === "lesson" ? "3 pytania · A–D" : quiz.type === "module" ? "5 pytań · A–D" : "10 pytań · egzamin"}</p>
      ${passed ? '<span class="chip">Ukończony</span>' : ""}
    </header>
    <form class="quiz-form" data-quiz-id="${quizId}" data-quiz-type="${context.type || ""}">
      ${questionsHtml}
      <div class="btn-row">
        <button type="submit" class="btn btn--primary">Sprawdź odpowiedzi</button>
      </div>
      <p class="card__desc quiz-hint">Po sprawdzeniu zobaczysz wyjaśnienia pod każdym pytaniem.</p>
    </form>
  `;
}

export function bindQuizEvents(root, context) {
  root.querySelector("[data-quiz-back]")?.addEventListener("click", () => {
    if (context.type === "lesson" && context.moduleId && context.lessonIndex) {
      navigate(paths.lesson(context.moduleId, context.lessonIndex));
    } else if (context.type === "module" && context.moduleId) {
      navigate(paths.module(context.moduleId));
    } else if (context.type === "exam") {
      navigate(paths.kurs());
    } else {
      navigate(paths.kurs());
    }
  });

  const form = root.querySelector(".quiz-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const blocks = form.querySelectorAll(".quiz-question");
    let allAnswered = true;
    let allCorrect = true;

    blocks.forEach((block) => {
      const qi = block.dataset.qindex;
      const correct = Number(block.dataset.correct, 10);
      const selected = form.querySelector(`input[name="q${qi}"]:checked`);
      const feedback = block.querySelector(".quiz-feedback");
      if (!selected) {
        allAnswered = false;
        return;
      }
      const val = Number(selected.value, 10);
      const ok = val === correct;
      if (!ok) allCorrect = false;
      const q = getQuiz(form.dataset.quizId)?.questions[qi];
      feedback.hidden = false;
      feedback.className = `quiz-feedback ${ok ? "quiz-feedback--ok" : "quiz-feedback--bad"}`;
      feedback.innerHTML = `<strong>${ok ? "Dobrze." : "Inna odpowiedź była trafniejsza."}</strong> ${escapeHtml(q?.explain || "")}`;
    });

    if (!allAnswered) {
      alert("Zaznacz odpowiedź przy każdym pytaniu.");
      return;
    }

    if (allCorrect) {
      const type = form.dataset.quizType;
      const quizId = form.dataset.quizId;
      if (type === "lesson" && context.lessonId) markLessonQuizPassed(context.lessonId);
      if (type === "module" && context.moduleId) markModuleQuizPassed(context.moduleId);
      if (type === "exam") markExamPassed();
    }
  });
}
