import { getState } from "../store.js";
import { renderEmpty } from "../ui/states.js";

export function renderPanel() {
  const { panel } = getState();

  const habitsBlock =
    panel.habits.length === 0
      ? renderEmpty({
          icon: "🌱",
          title: "Brak nawyków",
          text: "Tutaj pojawią się Twoje mikronawyki. Na razie lista jest pusta — to oczekiwany stan demo.",
        })
      : `<ul class="card-list">${panel.habits.map((h) => `<li class="card">${h}</li>`).join("")}</ul>`;

  return `
    <header class="screen-header">
      <h1>Panel</h1>
      <p>Podgląd postępu i trackerów — dane zapisane lokalnie.</p>
    </header>
    <div class="panel-grid">
      <section class="card">
        <h2 class="card__title">Dziś</h2>
        <div class="panel-stat">
          <span class="card__desc">Papierosy (placeholder)</span>
          <strong>${panel.cigarettesToday}</strong>
        </div>
        <div class="panel-stat">
          <span class="card__desc">Seria dni</span>
          <strong>${panel.streakDays}</strong>
        </div>
      </section>
      <section class="card">
        <h2 class="card__title">Zdrowie i oszczędności</h2>
        <p class="card__desc">${panel.healthNotes || "Placeholder — notatki i szacowane oszczędności w kolejnych krokach."}</p>
        <div class="panel-stat">
          <span class="card__desc">Oszczędności (szkic)</span>
          <strong>${panel.savingsPlaceholder} zł</strong>
        </div>
      </section>
      <section>
        <h2 class="card__title" style="margin-bottom:12px">Nawyki</h2>
        ${habitsBlock}
      </section>
    </div>
  `;
}
