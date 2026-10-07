/** Zakładka Kurs: lista modułów, karta egzaminu i ekran modułu. */

import { escapeHtml } from "../dom.js";
import { courseMeta, modules, getModule } from "../data/course.js";
import { getState } from "../store.js";
import { courseProgress } from "../logic/progress.js";
import { moduleStatus } from "../logic/locks.js";
import { badge, moduleCard, lessonRow, progressBar, statusBadge } from "../ui/components.js";
import { emptyState, primaryAction } from "../ui/states.js";
import { iconMarkup } from "../ui/icons.js";

/* --- Lista modułów --- */

export function courseListScreen() {
  const state = getState();
  const progress = courseProgress(state);

  const list = modules.length
    ? `<div class="module-list">${modules.map((mod) => moduleCard(state, mod)).join("")}</div>`
    : emptyState({
        icon: "book",
        title: "Brak modułów",
        text: "Treść kursu pojawi się tutaj po dodaniu modułów.",
      });

  const examStatus = state.progress.examPassed
    ? badge("Zdany", "ok")
    : badge(`${courseMeta.exam.questionCount} pytań`, "");

  return `
    <header class="screen-header">
      <h1>${escapeHtml(courseMeta.title)}</h1>
      <p>${escapeHtml(courseMeta.tagline)}</p>
    </header>

    <section class="card card--flat">
      <div class="card__head">
        <div>
          <div class="card__title">
            <span class="stat__icon" aria-hidden="true">${iconMarkup("spark", { size: 14 })}</span>Twój postęp
          </div>
          <p class="card__desc">Cały kurs jest odblokowany od startu — bez opłat.</p>
        </div>
        ${badge("Dostęp pełny", "ok")}
      </div>
      <div class="module-card__footer">
        ${progressBar(progress.percent, { empty: progress.percent === 0, label: "Postęp kursu" })}
        <div class="module-card__meta">
          <span>${progress.done} z ${progress.total} lekcji</span>
          <span>${progress.percent}%</span>
        </div>
      </div>
    </section>

    <div class="module-head">
      <h2>Moduły</h2>
      <span class="note">6 modułów · ${courseMeta.lessonCount} lekcji</span>
    </div>
    ${list}

    <section class="card card--link" data-path="kurs/egzamin" role="button" tabindex="0">
      <div class="exam-card">
        <span class="exam-card__icon" aria-hidden="true">${iconMarkup("trophy", { size: 20 })}</span>
        <div class="exam-card__body">
          <div class="card__head">
            <div class="card__title">Egzamin końcowy</div>
            ${examStatus}
          </div>
          <p class="card__desc" style="margin-top:6px">
            ${courseMeta.exam.questionCount} pytań z całego kursu. Wynik ${courseMeta.exam.passScore}/${courseMeta.exam.questionCount} oznacza zaliczenie.
          </p>
        </div>
      </div>
    </section>
  `;
}

/* --- Ekran modułu --- */

export function moduleScreen(moduleId) {
  const mod = getModule(moduleId);
  if (!mod) return moduleNotFound(moduleId);

  const state = getState();
  const status = moduleStatus(state, moduleId);
  const lessons = mod.lessons.map((lesson, i) => lessonRow(state, mod, lesson, i)).join("");
  const quizAvailable = Boolean(status.key === "done" || status.done > 0);

  return `
    <header class="screen-header">
      ${backButton()}
      <div class="module-card__index">Moduł ${mod.index} z ${courseMeta.moduleCount}</div>
      <h1>${escapeHtml(mod.title)}</h1>
      <p>${escapeHtml(mod.description)}</p>
    </header>

    <section class="card card--flat">
      <div class="card__head">
        <div>
          <div class="card__title">Postęp modułu</div>
          <p class="card__desc">${status.reason || "Zacznij od pierwszej lekcji — kolejność dowolna."}</p>
        </div>
        ${statusBadge(state, moduleId).html}
      </div>
      <div class="module-card__footer">
        ${progressBar(status.percent, { empty: status.percent === 0, label: `Postęp modułu ${mod.index}` })}
        <div class="module-card__meta">
          <span>${status.done} z ${status.total} lekcji</span>
          <span>${status.percent}%</span>
        </div>
      </div>
    </section>

    ${mod.hasContent ? "" : contentNotice()}

    <div class="module-head">
      <h2>Lekcje</h2>
      <span class="note">${mod.lessons.length} pozycji</span>
    </div>
    <div class="lesson-list">${lessons}</div>

    <section class="card card--link" data-path="kurs/modul/${mod.id}/quiz-modulu" role="button" tabindex="0">
      <div class="card__head">
        <div>
          <div class="card__title">Quiz modułu ${mod.index}</div>
          <p class="card__desc" style="margin-top:4px">5 pytań z wyjaśnieniami po każdej odpowiedzi.</p>
        </div>
        ${quizAvailable ? badge("5 pytań", "accent") : badge("Dostępny", "")}
      </div>
      <div class="card__meta">
        ${iconMarkup("cap", { size: 16 })}<span>Krótkie sprawdzenie materiału po lekcjach.</span>
      </div>
    </section>
  `;
}

function contentNotice() {
  return `
    <div class="banner">
        ${iconMarkup("heart", { size: 18 })}
        <div>
          <div class="banner__title">Treść lekcji w kroku 3</div>
          <span>Na razie pokazujemy pigułkę i układ ekranu. Quiz modułu już działa.</span>
        </div>
    </div>`;
}

export function backButton(path = "kurs", label = "Kurs") {
  return `
    <button type="button" class="bar__back" data-path="${path}">
      ${iconMarkup("back", { size: 18 })}<span>${escapeHtml(label)}</span>
    </button>`;
}

function moduleNotFound(moduleId) {
  return `
    <header class="screen-header">
      ${backButton()}
      <h1>Nie znaleziono modułu</h1>
      <p>Odnośnik <code>${escapeHtml(moduleId)}</code> nie pasuje do żadnego modułu.</p>
    </header>
    ${emptyState({
      icon: "warn",
      title: "Pusty odnośnik",
      text: "Wróć do listy modułów i wybierz pozycję z listy.",
      actionHtml: primaryAction("Wróć do kursu", "nav", "kurs"),
    })}`;
}
