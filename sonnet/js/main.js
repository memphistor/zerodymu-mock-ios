import { ensureStarted, subscribe } from "./store.js";
import { initTheme } from "./theme.js";
import { getRoute, onRouteChange, navigate, paths } from "./router.js";
import { renderCourse, bindCourseEvents } from "./views/course.js";
import { renderPanel } from "./views/panel.js";
import { renderSettings, bindSettingsEvents } from "./views/settings.js";
import { renderLoading, renderError } from "./ui/states.js";

const root = document.getElementById("root");
const tabbar = document.getElementById("tabbar");

const TABS = [
  { id: "kurs", label: "Kurs", icon: "📖", path: paths.kurs() },
  { id: "panel", label: "Panel", icon: "📊", path: paths.panel() },
  { id: "ustawienia", label: "Ustawienia", icon: "⚙️", path: paths.ustawienia() },
];

let bootError = null;
let isBooting = true;

function renderTabbar(activeTab) {
  tabbar.innerHTML = TABS.map(
    (t) => `
    <button type="button" class="tabbar__btn" data-tab="${t.id}" aria-current="${activeTab === t.id ? "page" : "false"}">
      <span class="tabbar__icon" aria-hidden="true">${t.icon}</span>
      <span>${t.label}</span>
    </button>
  `
  ).join("");

  tabbar.querySelectorAll(".tabbar__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = TABS.find((x) => x.id === btn.dataset.tab);
      if (tab) navigate(tab.path);
    });
  });
}

function renderScreen(route) {
  if (bootError) {
    root.innerHTML = renderError(bootError);
    root.querySelector("[data-action=retry]")?.addEventListener("click", () => {
      bootError = null;
      boot();
    });
    return;
  }

  if (isBooting) {
    root.innerHTML = renderLoading("Przygotowuję kurs…");
    return;
  }

  renderTabbar(route.tab);

  let html = "";
  if (route.tab === "kurs") html = renderCourse(route);
  else if (route.tab === "panel") html = renderPanel();
  else html = renderSettings();

  root.innerHTML = html;

  if (route.tab === "kurs") bindCourseEvents(root, route);
  if (route.tab === "ustawienia") bindSettingsEvents(root);
}

async function boot() {
  isBooting = true;
  renderScreen(getRoute());
  try {
    await new Promise((r) => setTimeout(r, 420));
    if (!localStorage) throw new Error("Brak dostępu do pamięci lokalnej w tej przeglądarce.");
    ensureStarted();
    bootError = null;
  } catch (e) {
    bootError = e.message || "Nie udało się uruchomić aplikacji.";
  } finally {
    isBooting = false;
    renderScreen(getRoute());
  }
}

initTheme();
onRouteChange(renderScreen);
subscribe(() => renderScreen(getRoute()));
boot();

if (!location.hash) navigate(paths.kurs());
