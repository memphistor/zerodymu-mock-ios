/** Elementy wspólne widoków: karta modułu, wiersz lekcji, pasek postępu. */

import { escapeHtml } from "../dom.js";
import { iconMarkup } from "./icons.js";

export function progressBar(percent, { empty = false } = {}) {
  const value = Math.max(0, Math.min(100, Math.round(percent)));
  return `
    <div class="progress" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100">
      <div class="progress__bar ${empty ? "progress__bar--empty" : ""}" style="width:${value}%"></div>
    </div>`;
}

export function badge(text, variant = "") {
  return `<span class="badge ${variant ? `badge--${variant}` : ""}">${
    variant ? '<span class="badge-dot" aria-hidden="true"></span>' : ""
  }${escapeHtml(text)}</span>`;
}

export function statCard({ label, value, unit = "", muted = false }) {
  return `
    <div class="stat">
      <span class="stat__label">${escapeHtml(label)}</span>
      <span class="stat__value ${muted ? "stat__value--muted" : ""}">${escapeHtml(value)}${
        unit ? `<span class="stat__unit">${escapeHtml(unit)}</span>` : ""
      }</span>
    </div>`;
}

export function placeholderBlock(label, value, hint = "") {
  return `
    <div class="placeholder-block">
      <span class="placeholder-block__label">${escapeHtml(label)}</span>
      <span class="placeholder-block__value">${escapeHtml(value)}</span>
      ${hint ? `<span class="card__desc">${escapeHtml(hint)}</span>` : ""}
    </div>`;
}

/** Karta modułu na liście kursu. Klikalna w całości (data-path). */
export function moduleCard(mod) {
  return `
    <button type="button" class="card card--link" data-path="kurs/modul/${mod.id}">
      <div class="card__head">
        <div>
          <div class="module-card__index">Moduł ${mod.index}</div>
          <h3 class="card__title module-card__title">${escapeHtml(mod.title)}</h3>
        </div>
        <span class="lesson-row__aside" aria-hidden="true">${iconMarkup("forward", { size: 18 })}</span>
      </div>
      <p class="card__desc" style="margin-top:6px">${escapeHtml(mod.description)}</p>
      <div class="module-card__footer">
        ${progressBar(0, { empty: true })}
        <div class="module-card__meta">
          <span>${mod.lessons.length} lekcje</span>
          <span>0%</span>
        </div>
      </div>
    </button>`;
}

/** Wiersz lekcji na ekranie modułu. */
export function lessonRow(mod, lesson, index) {
  return `
    <button type="button" class="lesson-row" data-path="kurs/modul/${mod.id}/lekcja/${index}">
      <span class="lesson-row__num" aria-hidden="true">${index + 1}</span>
      <span class="lesson-row__body">
        <span class="lesson-row__title">${escapeHtml(lesson.title)}</span>
        <span class="lesson-row__sub">${lesson.durationMin} min · ${escapeHtml(lesson.summary)}</span>
      </span>
      <span class="lesson-row__aside" aria-hidden="true">${iconMarkup("forward", { size: 18 })}</span>
    </button>`;
}
