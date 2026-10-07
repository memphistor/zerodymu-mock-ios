const TAB_ROUTES = {
  kurs: /^kurs\/?$/,
  panel: /^panel\/?$/,
  ustawienia: /^ustawienia\/?$/,
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

  const exam = path.match(/^kurs\/egzamin\/?$/);
  if (exam) return { tab: "kurs", path, course: { screen: "exam" } };

  const lessonQuiz = path.match(/^kurs\/modul\/([^/]+)\/lekcja\/(\d+)\/quiz\/?$/);
  if (lessonQuiz) {
    return {
      tab: "kurs",
      path,
      course: {
        screen: "lessonQuiz",
        moduleId: lessonQuiz[1],
        lessonIndex: Number(lessonQuiz[2], 10),
      },
    };
  }

  const moduleQuiz = path.match(/^kurs\/modul\/([^/]+)\/quiz-modulu\/?$/);
  if (moduleQuiz) {
    return { tab: "kurs", path, course: { screen: "moduleQuiz", moduleId: moduleQuiz[1] } };
  }

  const lesson = path.match(/^kurs\/modul\/([^/]+)\/lekcja\/(\d+)\/?$/);
  if (lesson) {
    return {
      tab: "kurs",
      path,
      course: { screen: "lesson", moduleId: lesson[1], lessonIndex: Number(lesson[2], 10) },
    };
  }

  const mod = path.match(/^kurs\/modul\/([^/]+)\/?$/);
  if (mod) return { tab: "kurs", path, course: { screen: "module", moduleId: mod[1] } };

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
  lessonQuiz: (moduleId, index) => `kurs/modul/${moduleId}/lekcja/${index}/quiz`,
  moduleQuiz: (moduleId) => `kurs/modul/${moduleId}/quiz-modulu`,
  exam: () => "kurs/egzamin",
};
