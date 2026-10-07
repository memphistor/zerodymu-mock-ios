/**
 * Router oparty na hashu (#/...). Trasy kursu żyją pod `kurs/...`,
 * więc zakładka "Kurs" pozostaje aktywna także na ekranach modułu,
 * lekcji i quizu. Deep-linki i przycisk "wstecz" w Safari działają
 * bez dodatkowej konfiguracji serwera.
 */

export const TABS = [
  { id: "kurs", label: "Kurs", icon: "book" },
  { id: "panel", label: "Panel", icon: "chart" },
  { id: "ustawienia", label: "Ustawienia", icon: "gear" },
];

export const paths = {
  kurs: () => "kurs",
  panel: () => "panel",
  ustawienia: () => "ustawienia",
  states: () => "ustawienia/stany",
  module: (id) => `kurs/modul/${id}`,
  lesson: (moduleId, index) => `kurs/modul/${moduleId}/lekcja/${index}`,
  quiz: (moduleId, index) => `kurs/modul/${moduleId}/lekcja/${index}/quiz`,
  moduleQuiz: (moduleId) => `kurs/modul/${moduleId}/quiz-modulu`,
};

function readHash() {
  return (window.location.hash || "").replace(/^#\/?/, "").replace(/\/+$/, "");
}

/** Zamienia ścieżkę na ustrukturyzowaną trasę. */
export function parsePath(path) {
  const clean = path.replace(/^\/+/, "");

  if (clean === "" || clean === "kurs") return { tab: "kurs", path: "kurs", screen: "list" };
  if (clean === "panel") return { tab: "panel", path: clean, screen: "panel" };
  if (clean === "ustawienia") return { tab: "ustawienia", path: clean, screen: "settings" };
  if (clean === "ustawienia/stany") {
    return { tab: "ustawienia", path: clean, screen: "states" };
  }

  let m = clean.match(/^kurs\/modul\/([^/]+)\/lekcja\/(\d+)\/quiz$/);
  if (m) {
    return {
      tab: "kurs",
      path: clean,
      screen: "quiz",
      moduleId: m[1],
      lessonIndex: Number(m[2]),
    };
  }

  m = clean.match(/^kurs\/modul\/([^/]+)\/quiz-modulu$/);
  if (m) return { tab: "kurs", path: clean, screen: "quiz", moduleId: m[1], lessonIndex: null };

  m = clean.match(/^kurs\/modul\/([^/]+)\/lekcja\/(\d+)$/);
  if (m) {
    return {
      tab: "kurs",
      path: clean,
      screen: "lesson",
      moduleId: m[1],
      lessonIndex: Number(m[2]),
    };
  }

  m = clean.match(/^kurs\/modul\/([^/]+)$/);
  if (m) return { tab: "kurs", path: clean, screen: "module", moduleId: m[1] };

  return { tab: "kurs", path: "kurs", screen: "list", notFound: clean };
}

export function currentRoute() {
  return parsePath(readHash());
}

/** Nawigacja programowa — zmienia hash i emituje zdarzenie. */
export function navigate(path) {
  const target = `#/${String(path).replace(/^#\/?/, "").replace(/^\/+/, "")}`;
  if (window.location.hash === target) {
    emit();
    return;
  }
  window.location.hash = target;
}

export function back(fallback = "kurs") {
  if (window.history.length > 1) window.history.back();
  else navigate(fallback);
}

let listeners = new Set();

function emit() {
  const route = currentRoute();
  for (const fn of listeners) fn(route);
}

export function onRouteChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function startRouter(fn) {
  onRouteChange(fn);
  window.addEventListener("hashchange", emit);
  if (!window.location.hash) {
    window.location.replace(`#/${paths.kurs()}`);
  } else {
    emit();
  }
}
