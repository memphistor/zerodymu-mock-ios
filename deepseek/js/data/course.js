/**
 * Kurs ZeroDymu — 6 modułów po 3 lekcje (18 lekcji) + quizy i egzamin.
 *
 * Moduł 1 ma pełną treść (`content/m1.js`). Pozostałe moduły mają metadane
 * lekcji (tytuł, opis, pigułka) i pokazują stan „treść w kroku 3”.
 *
 * Quizy i egzamin żyją w `content/quizzes.js` — ten plik tylko je udostępnia
 * w jednolitym API używanym przez widoki.
 */

import { m1Lessons } from "./content/m1.js";
import {
  lessonQuizzes,
  moduleQuizzes,
  examQuestions,
} from "./content/quizzes.js";

/** Lekcja bez rozwiniętej treści — tytuł, opis i pigułka. */
function outlineLesson(moduleId, index, def) {
  return {
    id: `${moduleId}-l${index + 1}`,
    title: def.title,
    summary: def.summary,
    pill: def.pill,
    durationMin: def.durationMin,
    sections: [],
    practice: null,
  };
}

function outlineLessons(moduleId, defs) {
  return defs.map((def, index) => outlineLesson(moduleId, index, def));
}

export const modules = [
  {
    id: "m1",
    index: 1,
    title: "Poznaj swój nawyk",
    description:
      "Czym jest dym, kiedy sięgasz po papierosa i co uruchamia automatyzm.",
    hasContent: true,
    lessons: m1Lessons,
  },
  {
    id: "m2",
    index: 2,
    title: "Decyzja i powód",
    description: "Jeden konkretny powód, do którego wracasz w trudnym momencie.",
    hasContent: false,
    lessons: outlineLessons("m2", [
      {
        title: "Twój powód",
        summary: "Osobisty powód, który przetrwa trudny wieczór.",
        pill: "Powód działa wtedy, gdy jest konkretny i Twój — nie modny ani cudzy.",
        durationMin: 6,
      },
      {
        title: "Koszt i zysk",
        summary: "Uczciwe porównanie: co palenie daje i czego Cię pozbawia.",
        pill: "Bilans pokazuje, co naprawdę zyskujesz — a nie tylko czego się wyrzekasz.",
        durationMin: 7,
      },
      {
        title: "Zobowiązanie",
        summary: "Małe zobowiązanie z datą, które zamienia zamiar w plan.",
        pill: "Zobowiązanie z datą waży więcej niż najlepsze chęci.",
        durationMin: 5,
      },
    ]),
  },
  {
    id: "m3",
    index: 3,
    title: "Mikro-kroki",
    description: "Małe, powtarzalne ruchy zamiast wielkiej deklaracji „od jutra”.",
    hasContent: false,
    lessons: outlineLessons("m3", [
      {
        title: "Zasada 2 minut",
        summary: "Wersja kroku tak mała, że nie da się jej nie zrobić.",
        pill: "Zacznij od wersji, którą zrobisz nawet w najgorszy dzień.",
        durationMin: 6,
      },
      {
        title: "Jedna zmiana",
        summary: "Dlaczego jedna zmiana naraz wygrywa z listą postanowień.",
        pill: "Jedna zmiana naraz to nie brak ambicji, a sposób, żeby zmiana przetrwała.",
        durationMin: 5,
      },
      {
        title: "Plan na kryzys",
        summary: "Gotowy scenariusz na moment, w którym zabraknie sił.",
        pill: "Plan na kryzys pisze się w spokojnym dniu, nie w środku fali.",
        durationMin: 7,
      },
    ]),
  },
  {
    id: "m4",
    index: 4,
    title: "Trudne momenty",
    description: "Głód nikotynowy, stres, kawa i towarzystwo — gotowe scenariusze.",
    hasContent: false,
    lessons: outlineLessons("m4", [
      {
        title: "Fala głodu",
        summary: "Czym jest głód nikotynowy i ile naprawdę trwa.",
        pill: "Fala mija nawet wtedy, gdy nic nie zrobisz — a szybciej, gdy jej nie dokarmiasz.",
        durationMin: 7,
      },
      {
        title: "Stres",
        summary: "Jak stres uruchamia automatyzm i co zrobić w pierwszych sekundach.",
        pill: "W stresie nie wygrywa wola, tylko przygotowana wcześniej lista trzech działań.",
        durationMin: 6,
      },
      {
        title: "Sytuacje społeczne",
        summary: "Przerwy, imprezy i towarzystwo palących.",
        pill: "Jedno zdanie odmowy, powiedziane wcześniej na głos, wystarcza w większości sytuacji.",
        durationMin: 5,
      },
    ]),
  },
  {
    id: "m5",
    index: 5,
    title: "Nowa rutyna",
    description: "Czym zapełniasz miejsce po papierosie, żeby nie wracało z nudów.",
    hasContent: false,
    lessons: outlineLessons("m5", [
      {
        title: "Zamienniki",
        summary: "Czym zapełnić miejsce, które zostawił papieros.",
        pill: "Zamiennik nie musi być lepszy — musi dawać podobną pauzę.",
        durationMin: 6,
      },
      {
        title: "Ruch i oddech",
        summary: "Najkrótsze narzędzia do obniżenia napięcia.",
        pill: "Kilka minut ruchu działa szybciej niż tłumaczenie sobie „nie palę”.",
        durationMin: 5,
      },
      {
        title: "Nagroda",
        summary: "Dlaczego nowy nawyk potrzebuje nagrody, a nie tylko zakazu.",
        pill: "To, co nagradzane, się powtarza — zaplanuj nagrodę tak samo jak krok.",
        durationMin: 5,
      },
    ]),
  },
  {
    id: "m6",
    index: 6,
    title: "Trwałość",
    description: "Jak nie wrócić po jednym potknięciu i utrzymać zmianę na dłużej.",
    hasContent: false,
    lessons: outlineLessons("m6", [
      {
        title: "Potknięcie to nie porażka",
        summary: "Jak wrócić do planu tego samego dnia.",
        pill: "Potknięcie to informacja o wyzwalaczu, nie wyrok na cały plan.",
        durationMin: 6,
      },
      {
        title: "Otoczenie",
        summary: "Ludzie, miejsca i przedmioty, które ułatwiają albo utrudniają.",
        pill: "Łatwiej zmienić otoczenie niż codziennie walczyć z nim siłą woli.",
        durationMin: 5,
      },
      {
        title: "Podsumowanie",
        summary: "Cała droga w skrócie i co dalej.",
        pill: "Zmiana utrzymuje się dzięki powtarzalności, nie dzięki jednorazowemu zrywowi.",
        durationMin: 6,
      },
    ]),
  },
];

export const courseMeta = {
  title: "ZeroDymu",
  tagline: "Kurs rzucania palenia w małych krokach",
  moduleCount: modules.length,
  lessonCount: modules.reduce((sum, m) => sum + m.lessons.length, 0),
  exam: { questionCount: examQuestions.length, passScore: 8 },
};

/* --- Wyszukiwanie --- */

export function getModule(moduleId) {
  return modules.find((m) => m.id === moduleId) ?? null;
}

export function getModuleIndex(moduleId) {
  return modules.findIndex((m) => m.id === moduleId);
}

export function getLesson(moduleId, index) {
  const module = getModule(moduleId);
  if (!module) return null;
  const lesson = module.lessons[index];
  if (!lesson) return null;
  return { module, lesson, index };
}

export function lessonKey(moduleId, index) {
  return `${moduleId}/${index}`;
}

/* --- Quizy / egzamin --- */

/** Quiz lekcji: 3 pytania. Zwraca null dla modułów bez treści w kroku 2. */
export function getLessonQuiz(moduleId, index) {
  const lesson = getLesson(moduleId, index);
  if (!lesson) return null;
  const questions = lessonQuizzes[lesson.lesson.id];
  if (!questions?.length) return null;
  return {
    kind: "lesson",
    module: lesson.module,
    lesson: lesson.lesson,
    lessonIndex: index,
    questions,
  };
}

/** Quiz modułu: 5 pytań, dostępny dla wszystkich 6 modułów. */
export function getModuleQuiz(moduleId) {
  const module = getModule(moduleId);
  if (!module) return null;
  const questions = moduleQuizzes[moduleId];
  if (!questions?.length) return null;
  return { kind: "module", module, questions: questions.slice(0, 5) };
}

/** Egzamin: 10 pytań z całego kursu. */
export function getExam() {
  return {
    kind: "exam",
    title: "Egzamin końcowy",
    questions: examQuestions,
    passScore: courseMeta.exam.passScore,
  };
}

/** Ujednolicony dostęp dla widoku quizu (lekcja / moduł / egzamin). */
export function getQuiz(moduleId, lessonIndex) {
  if (moduleId === "exam") return getExam();
  if (lessonIndex === null || lessonIndex === undefined) return getModuleQuiz(moduleId);
  return getLessonQuiz(moduleId, lessonIndex);
}
