export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const ICONS = {
  kurs: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5v-16z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 18.5A2.5 2.5 0 0 1 7.5 16H19" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
  panel: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 19V10M12 19V5M19 19v-7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  ustawienia: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="9" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="15" cy="16" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
};

export function loadingView() {
  return `<section class="state" aria-live="polite">
    <p class="state-kicker">ZeroDymu</p>
    <h1>Wczytuję kurs</h1>
    <p>Chwila.</p>
    <div class="loading-bar" aria-hidden="true"></div>
  </section>`;
}

export function errorView({ title, text, actionHtml }) {
  return `<section class="state state-error" role="alert">
    <p class="state-kicker">ZeroDymu</p>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(text)}</p>
    ${actionHtml}
  </section>`;
}

export function emptyView({ title, text }) {
  return `<div class="empty">
    <p class="empty-mark" aria-hidden="true"></p>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(text)}</p>
  </div>`;
}

export function shell({ tab, body }) {
  const tabs = [
    ["kurs", "Kurs", "#/kurs"],
    ["panel", "Panel", "#/panel"],
    ["ustawienia", "Ustawienia", "#/ustawienia"],
  ];
  const nav = tabs
    .map(([id, label, href]) => {
      const current = id === tab ? ' aria-current="page"' : "";
      return `<a class="tab" href="${href}"${current}>${ICONS[id]}<span>${label}</span></a>`;
    })
    .join("");

  return `<main class="view" id="tresc">${body}</main>
    <nav class="tabbar" aria-label="Sekcje">${nav}</nav>`;
}

export function backLink(href, label) {
  return `<a class="back" href="${href}">${escapeHtml(label)}</a>`;
}
