const TAB_ROUTES = {
  kurs: /^kurs\/?$/,
  panel: /^panel\/?$/,
  ustawienia: /^ustawienia\/?$/,
};

const COURSE_ROUTES = {
  list: /^kurs\/?$/,
  module: /^kurs\/modul\/([^/]+)\/?$/,
  lesson: /^kurs\/modul\/([^/]+)\/lekcja\/(\d+)\/?$/,
  quiz: /^kurs\/modul\/([^/]+)\/quiz\/?$/,
};

function parseHash() {
  const raw = (location.hash || "#/kurs").replace(/^#\/?/, "");
  return raw || "kurs";
}

export function getRoute() {
  const path = parseHash();
  for (const [name, re] of Object.entries(TAB_ROUTES)) {
    if (re.test(path)) return { tab: name, path, course: null };
  }
  const mod = path.match(COURSE_ROUTES.module);
  if (mod) return { tab: "kurs", path, course: { screen: "module", moduleId: mod[1] } };
  const lesson = path.match(COURSE_ROUTES.lesson);
  if (lesson) {
    return {
      tab: "kurs",
      path,
      course: { screen: "lesson", moduleId: lesson[1], lessonIndex: Number(lesson[2], 10) },
    };
  }
  const quiz = path.match(COURSE_ROUTES.quiz);
  if (quiz) return { tab: "kurs", path, course: { screen: "quiz", moduleId: quiz[1] } };
  return { tab: "kurs", path: "kurs", course: null };
}

export function navigate(path) {
  const clean = path.replace(/^#\/?/, "");
  location.hash = `#/${clean}`;
}

export function onRouteChange(cb) {
  const handler = () => cb(getRoute());
  window.addEventListener("hashchange", handler);
  cb(getRoute());
  return () => window.removeEventListener("hashchange", handler);
}

export const paths = {
  kurs: () => "kurs",
  panel: () => "panel",
  ustawienia: () => "ustawienia",
  module: (id) => `kurs/modul/${id}`,
  lesson: (moduleId, index) => `kurs/modul/${moduleId}/lekcja/${index}`,
  quiz: (moduleId) => `kurs/modul/${moduleId}/quiz`,
};
