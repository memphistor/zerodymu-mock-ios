/**
 * Zakładka Panel: placeholdery trackerów + szkic danych (krok 1).
 * Zapisujemy tylko to, co ma sens na tym etapie (nawyki, notatka).
 */

import { escapeHtml } from "../dom.js";
import { getState, updatePanel } from "../store.js";
import { courseProgress, quizStats, moduleProgress } from "../logic/progress.js";
import { modules, courseMeta } from "../data/course.js";
import { badge, placeholderBlock, statCard, progressBar } from "../ui/components.js";
import { emptyState } from "../ui/states.js";
import { iconMarkup } from "../ui/icons.js";

export function panelScreen() {
  const state = getState();
  const { panel } = state;
  const progress = courseProgress(state);
  const quizzes = quizStats(state);

  const habits = Array.isArray(panel.habits) ? panel.habits : [];
  const habitsBlock = habits.length
    ? `<ul class="draft-list">${habits
        .map(
          (habit, i) => `
        <li class="draft-row">
          <span class="draft-row__label">${iconMarkup("leaf", { size: 16 })} ${escapeHtml(habit)}</span>
          <button type="button" class="icon-btn" data-action="remove-habit" data-index="${i}"
                  aria-label="Usuń nawyk: ${escapeHtml(habit)}">Usuń</button>
        </li>`
        )
        .join("")}</ul>`
    : emptyState({
        icon: "leaf",
        title: "Brak nawyków",
        text: "Dodaj pierwszy mikronawyk poniżej — zapisze się w pamięci telefonu.",
      });

  return `
    <header class="screen-header">
      <h1>Panel</h1>
      <p>Podgląd postępu i trackerów. Dane zapisują się lokalnie na tym urządzeniu.</p>
    </header>

    <section class="card">
      <div class="card__head">
        <div>
          <div class="card__title">Dziś</div>
          <p class="card__desc">Trackery w wersji roboczej — wartości to placeholdery.</p>
        </div>
        ${badge("Szkic", "warn")}
      </div>
      <div class="stat-grid" style="margin-top:12px">
        ${statCard({ label: "Lekcje kursu", value: `${progress.done} / ${progress.total}`, icon: "book" })}
        ${statCard({ label: "Postęp", value: progress.percent, unit: "%", icon: "chart" })}
        ${statCard({ label: "Quizy zdane", value: `${quizzes.moduleQuizzesPassed} / ${courseMeta.moduleCount}`, icon: "cap" })}
        ${statCard({ label: "Egzamin", value: quizzes.examPassed ? "Zdany" : "—", muted: !quizzes.examPassed, icon: "trophy" })}
      </div>
      <div class="module-card__footer">
        ${progressBar(progress.percent, { empty: progress.percent === 0, label: "Postęp kursu" })}
      </div>
    </section>

    <section class="card">
      <div class="card__title">Postęp modułów</div>
      <p class="card__desc" style="margin-top:6px">Odhaczaj lekcje i zdawaj quizy — pasek rośnie tutaj i na liście kursu.</p>
      <div class="draft-list" style="margin-top:12px">
        ${modules
          .map((mod) => {
            const moduleState = moduleProgress(state, mod.id);
            return `
          <div class="draft-row">
            <span class="draft-row__label">${escapeHtml(mod.title)}</span>
            <span class="note">${moduleState.done}/${moduleState.total} · ${moduleState.percent}%</span>
          </div>`;
          })
          .join("")}
      </div>
    </section>

    <section class="card">
      <div class="card__title">Zdrowie i oszczędności</div>
      <p class="card__desc" style="margin-top:6px">Trackery dzienne — do dopięcia po kroku treści.</p>
      <div class="panel-grid" style="margin-top:12px">
        ${placeholderBlock("Papierosy dziś", String(panel.smoking?.cigsToday ?? 0), "Wymaga trackera dziennego", "smoke")}
        ${placeholderBlock("Seria dni", String(panel.streakDays ?? 0), "Liczona od dnia startu", "flame")}
        ${placeholderBlock(
          "Szacowane oszczędności",
          `${panel.savings?.savedTotal ?? 0} ${panel.savings?.currency ?? "PLN"}`,
          "Wymaga ceny paczki i liczby papierosów",
          "piggy"
        )}
      </div>
    </section>

    <section class="card card--flat">
      <div class="card__head">
        <div class="card__title">Dziennik samopoczucia</div>
        ${badge("W kroku 3", "warn")}
      </div>
      <p class="card__desc" style="margin-top:6px">
        Miejsce na notatki o nastroju, snie i napięciu — pojawi się razem z pełną treścią.
      </p>
    </section>

    <section>
      <div class="module-head" style="margin-bottom:12px">
        <h2>Nawyki</h2>
        <span class="note">${habits.length} zapisanych</span>
      </div>
      ${habitsBlock}
      <form class="inline-form" id="habit-form" style="margin-top:12px">
        <label class="field" style="flex:1 1 auto">
          <span class="field__label">Nowy mikronawyk</span>
          <input class="input" type="text" name="habit" maxlength="60" placeholder="np. Spacer po obiedzie" autocomplete="off" />
        </label>
        <button type="submit" class="btn btn--primary" style="align-self:flex-end">
          ${iconMarkup("plus", { size: 18 })}<span>Dodaj</span>
        </button>
      </form>
    </section>

    <section class="card card--flat">
      <div class="card__title">Dziennik i kamienie milowe</div>
      <p class="card__desc" style="margin-top:6px">Placeholder kroku 1 — wykresy, seria dni i odznaki pojawią się później.</p>
    </section>
  `;
}

/** Obsługa formularza nawyków (delegowane zdarzenia z app.js). */
export function addHabit(name) {
  const value = String(name ?? "").trim();
  if (!value) return { ok: false, reason: "empty" };

  const { panel } = getState();
  const habits = Array.isArray(panel.habits) ? panel.habits : [];
  if (habits.some((h) => h.toLowerCase() === value.toLowerCase())) {
    return { ok: false, reason: "duplicate" };
  }
  if (habits.length >= 20) return { ok: false, reason: "limit" };

  updatePanel({ habits: [...habits, value] });
  return { ok: true };
}

export function removeHabit(index) {
  const { panel } = getState();
  const habits = Array.isArray(panel.habits) ? panel.habits : [];
  if (index < 0 || index >= habits.length) return;

  const next = habits.filter((_, i) => i !== index);
  updatePanel({ habits: next });
}
