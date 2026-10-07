/** Zakładka Kurs: lista modułów oraz ekran modułu. */

import { escapeHtml } from "../dom.js";
import { courseMeta, modules, getModule } from "../data/course.js";
import { badge, moduleCard, lessonRow, progressBar } from "../ui/components.js";
import { emptyState, primaryAction } from "../ui/states.js";
import { iconMarkup } from "../ui/icons.js";

/** Lista 6 modułów (placeholdery tytułów i opisów). */
export function courseListScreen() {
  const list = modules.length
    ? `<div class="module-list">${modules.map(moduleCard).join("")}</div>`
    : emptyState({
        icon: "book",
        title: "Brak modułów",
        text: "Treść kursu pojawi się w kolejnym kroku.",
      });

  return `
    <header class="screen-header">
      <h1>${escapeHtml(courseMeta.title)}</h1>
      <p>${escapeHtml(courseMeta.tagline)}</p>
    </header>

    <section class="card card--flat">
      <div class="card__head">
        <div>
          <div class="card__title">Twój start</div>
          <p class="card__desc">Kurs jest odblokowany od pierwszego uruchomienia — bez opłat.</p>
        </div>
        ${badge("Dostęp pełny", "ok")}
      </div>
      <div class="module-card__footer">
        ${progressBar(0)}
        <div class="module-card__meta">
          <span>${modules.length} modułów · ${courseMeta.lessonCount} lekcji</span>
          <span>0%</span>
        </div>
      </div>
    </section>

    <div class="module-head">
      <h2>Moduły</h2>
      <span class="note">Placeholdery kroku 1</span>
    </div>
    ${list}
  `;
}

/** Ekran pojedynczego modułu: opis + lista lekcji + quiz modułu. */
export function moduleScreen(moduleId) {
  const mod = getModule(moduleId);
  if (!mod) return moduleNotFound(moduleId);

  const lessons = mod.lessons.map((lesson, i) => lessonRow(mod, lesson, i)).join("");

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
          <p class="card__desc">Zacznij od pierwszej lekcji — kolejność dowolna w tym kroku.</p>
        </div>
        ${badge("0 / " + mod.lessons.length, "")}
      </div>
      <div class="module-card__footer">${progressBar(0, { empty: true })}</div>
    </section>

    <div class="module-head">
      <h2>Lekcje</h2>
      <span class="note">${mod.lessons.length} pozycji</span>
    </div>
    <div class="lesson-list">${lessons}</div>

    <section class="card card--link" data-path="kurs/modul/${mod.id}/quiz-modulu" role="button" tabindex="0">
      <div class="card__head">
        <div>
          <div class="card__title">Quiz modułu ${mod.index}</div>
          <p class="card__desc"></p>
        </div>
        ${badge("Placeholder", "warn")}
      </div>
      <div class="card__meta">
        ${iconMarkup("cap", { size: 16 })}<span>Krótkie sprawdzenie po lekcjach — treść w kolejnym kroku.</span>
      </div>
    </section>
  `;
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
      <p>Odnośnik <code>${escapeHtml(moduleId)}</code> nie pasuje do żadnego modułu w tym kroku.</p>
    </header>
    ${emptyState({
      icon: "warn",
      title: "Pusty odnośnik",
      text: "Wróć do listy modułów i wybierz pozycję z listy.",
      actionHtml: primaryAction("Wróć do kursu", "nav", "kurs"),
    })}`;
}
