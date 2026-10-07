/**
 * Placeholdery kursu — krok 1.
 *
 * 6 modułów z tytułami i opisami oraz listą 3 lekcji w każdym.
 * Treść lekcji i pytania quizu to placeholdery: struktura i nawigacja
 * są gotowe, a prawdziwa treść przyjdzie w kolejnych krokach.
 *
 * Kształt lekcji jest docelowy (id, title, summary), żeby podmiana
 * placeholderów na treść nie wymagała zmian w widokach.
 */

const LOREM =
  "Placeholder treści — w tym kroku sprawdzamy tylko układ ekranu. " +
  "Właściwa lekcja pojawi się tutaj wraz z nagraniem i ćwiczeniem.";

function lessons(moduleId, titles) {
  return titles.map((title, index) => ({
    id: `${moduleId}-l${index + 1}`,
    title,
    summary: "Krótki opis lekcji (placeholder).",
    durationMin: index % 2 === 0 ? 5 : 7,
    body: [LOREM, LOREM],
  }));
}

export const modules = [
  {
    id: "m1",
    index: 1,
    title: "Poznaj swój nawyk",
    description:
      "Czym jest dym, kiedy sięgasz po papierosa i co uruchamia automatyzm.",
    lessons: lessons("m1", ["Mapa dnia", "Wyzwalacze", "Dziennik obserwacji"]),
    quiz: { questionCount: 3 },
  },
  {
    id: "m2",
    index: 2,
    title: "Decyzja i powód",
    description: "Jeden konkretny powód, do którego wracasz w trudnym momencie.",
    lessons: lessons("m2", ["Twój powód", "Koszt i zysk", "Zobowiązanie"]),
    quiz: { questionCount: 3 },
  },
  {
    id: "m3",
    index: 3,
    title: "Mikro-kroki",
    description: "Małe, powtarzalne ruchy zamiast wielkiej deklaracji „od jutra”.",
    lessons: lessons("m3", ["Zasada 2 minut", "Jedna zmiana", "Plan na kryzys"]),
    quiz: { questionCount: 3 },
  },
  {
    id: "m4",
    index: 4,
    title: "Trudne momenty",
    description: "Głód nikotynowy, stres, kawa i towarzystwo — gotowe scenariusze.",
    lessons: lessons("m4", ["Fala głodu", "Stres", "Sytuacje społeczne"]),
    quiz: { questionCount: 3 },
  },
  {
    id: "m5",
    index: 5,
    title: "Nowa rutyna",
    description: "Czym zapełniasz miejsce po papierosie, żeby nie wracało z nudów.",
    lessons: lessons("m5", ["Zamienniki", "Ruch i oddech", "Nagroda"]),
    quiz: { questionCount: 3 },
  },
  {
    id: "m6",
    index: 6,
    title: "Trwałość",
    description: "Jak nie wrócić po jednym potknięciu i utrzymać zmianę na dłużej.",
    lessons: lessons("m6", ["Potknięcie to nie porażka", "Otoczenie", "Podsumowanie"]),
    quiz: { questionCount: 3 },
  },
];

export const courseMeta = {
  title: "ZeroDymu",
  tagline: "Kurs rzucania palenia w małych krokach",
  moduleCount: modules.length,
  lessonCount: modules.reduce((sum, m) => sum + m.lessons.length, 0),
};

export function getModule(moduleId) {
  return modules.find((m) => m.id === moduleId) ?? null;
}

export function getLesson(moduleId, index) {
  const mod = getModule(moduleId);
  if (!mod) return null;
  const lesson = mod.lessons[index];
  if (!lesson) return null;
  return { module: mod, lesson, index };
}

export function getQuiz(moduleId, lessonIndex) {
  const mod = getModule(moduleId);
  if (!mod) return null;
  if (lessonIndex === null || lessonIndex === undefined) {
    return {
      kind: "module",
      module: mod,
      title: `Quiz modułu ${mod.index}`,
      questions: buildQuestions(mod, mod.quiz.questionCount),
    };
  }
  const lesson = mod.lessons[lessonIndex];
  if (!lesson) return null;
  return {
    kind: "lesson",
    module: mod,
    lesson,
    lessonIndex,
    title: `Quiz: ${lesson.title}`,
    questions: buildQuestions(mod, 3),
  };
}

/** Pytania-placeholdery: prawdziwe treści w kolejnym kroku. */
function buildQuestions(mod, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${mod.id}-q${i + 1}`,
    prompt: `Pytanie ${i + 1} — placeholder (moduł ${mod.index}).`,
    options: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"],
    answerIndex: i % 4,
  }));
}
