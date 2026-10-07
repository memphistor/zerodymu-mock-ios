/** Elementy wspólne widoków: karta modułu, wiersz lekcji, pasek, pigułka. */

import { escapeHtml } from "../dom.js";
import { iconMarkup } from "./icons.js";
import { moduleStatus, lessonStatus } from "../logic/locks.js";
import { hasLessonQuiz } from "../logic/progress.js";

export function progressBar(percent, { empty = false, label = "" } = {}) {
  const value = Math.max(0, Math.min(100, Math.round(percent)));
  return `
    <div class="progress" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"${
      label ? ` aria-label="${escapeHtml(label)}"` : ""
    }>
      <div class="progress__bar ${empty ? "progress__bar--empty" : ""}" style="width:${value}%"></div>
    </div>`;
}

export function badge(text, variant = "") {
  return `<span class="badge ${variant ? `badge--${variant}` : ""}">${
    variant ? '<span class="badge-dot" aria-hidden="true"></span>' : ""
  }${escapeHtml(text)}</span>`;
}

export function statCard({ label, value, unit = "", muted = false, icon = "" }) {
  return `
    <div class="stat">
      <span class="stat__label">${
        icon ? `<span class="stat__icon" aria-hidden="true">${iconMarkup(icon, { size: 14 })}</span>` : ""
      }${escapeHtml(label)}</span>
      <span class="stat__value ${muted ? "stat__value--muted" : ""}">${escapeHtml(value)}${
        unit ? `<span class="stat__unit">${escapeHtml(unit)}</span>` : ""
      }</span>
    </div>`;
}

export function placeholderBlock(label, value, hint = "", icon = "") {
  return `
    <div class="placeholder-block">
      <span class="placeholder-block__label">${
        icon ? `${iconMarkup(icon, { size: 14 })} ` : ""
      }${escapeHtml(label)}</span>
      <span class="placeholder-block__value">${escapeHtml(value)}</span>
      ${hint ? `<span class="card__desc">${escapeHtml(hint)}</span>` : ""}
    </div>`;
}

/** Pigułka: najważniejsze zdanie lekcji. */
export function pill(text) {
  return `
    <div class="pill">
      <span class="pill__icon" aria-hidden="true">${iconMarkup("pill", { size: 20 })}</span>
      <span>
        <span class="pill__label">Pigułka</span>
        <span class="pill__text">${escapeHtml(text)}</span>
      </span>
    </div>`;
}

/** Status modułu jako plakietka na liście. */
export function statusBadge(state, moduleId) {
  const status = moduleStatus(state, moduleId);
  const map = {
    done: "ok",
    progress: "accent",
    locked: "warn",
    open: "",
  };

  if (status.key === "locked") {
    return {
      html: `<span class="badge badge--warn"><span aria-hidden="true">${iconMarkup("lock", {
        size: 12,
      })}</span>Kolejny krok</span>`,
      status,
    };
  }

  return { html: badge(status.label, map[status.key] ?? ""), status };
}

/**
 * Karta modułu na liście kursu. Zawsze klikalna (locki są wizualne w kroku 2),
 * ze wskaźnikiem postępu i plakietką statusu.
 */
export function moduleCard(state, mod) {
  const { html: statusHtml, status } = statusBadge(state, mod.id);
  const locked = status.key === "locked";

  return `
    <button type="button" class="card card--link ${locked ? "module-card--locked" : ""}"
            data-path="kurs/modul/${mod.id}">
      <div class="card__head">
        <div>
          <div class="module-card__index">Moduł ${mod.index}</div>
          <h3 class="card__title module-card__title">${escapeHtml(mod.title)}</h3>
        </div>
        <div class="card__aside">${statusHtml}</div>
      </div>
      <p class="module-card__sub">${escapeHtml(mod.description)}</p>
      <div class="module-card__footer">
        ${progressBar(status.percent, { empty: status.percent === 0, label: `Postęp modułu ${mod.index}` })}
        <div class="module-card__meta">
          <span>${mod.lessons.length} lekcje${mod.hasContent ? "" : " · treść w kroku 3"}</span>
          <span>${status.done}/${status.total} · ${status.percent}%</span>
        </div>
      </div>
    </button>`;
}

/** Wiersz lekcji na ekranie modułu. */
export function lessonRow(state, mod, lesson, index) {
  const status = lessonStatus(state, mod.id, index);
  const done = status === "done";
  const marks = {
    done: `<span class="badge badge--ok"><span class="badge-dot" aria-hidden="true"></span>Gotowe</span>`,
    current: `<span class="lesson-row__aside" aria-hidden="true">${iconMarkup("play", { size: 18 })}</span>`,
    upcoming: `<span class="lesson-row__aside" aria-hidden="true">${iconMarkup("forward", { size: 18 })}</span>`,
  };

  return `
    <button type="button" class="lesson-row" data-path="kurs/modul/${mod.id}/lekcja/${index}">
      <span class="lesson-row__num ${done ? "lesson-row__num--done" : ""}" aria-hidden="true">${
        done ? iconMarkup("check", { size: 14 }) : index + 1
      }</span>
      <span class="lesson-row__body">
        <span class="lesson-row__title">${escapeHtml(lesson.title)}</span>
        <span class="lesson-row__sub">${lesson.durationMin} min${
          hasLessonQuiz(mod.id, index) ? " · quiz" : ""
        } · ${escapeHtml(lesson.summary)}</span>
      </span>
      ${marks[status] ?? marks.upcoming}
    </button>`;
}
