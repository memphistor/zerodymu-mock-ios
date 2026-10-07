export const MODULES = [
  {
    id: "start",
    title: "Spokojny start",
    summary: "Ustalasz tempo i dowiadujesz się, jak wygląda kurs — bez testu na wejściu.",
    lessons: [
      {
        id: "tempo",
        title: "Twoje tempo",
        blurb: "Kurs nie goni. Jedna lekcja naraz wystarczy.",
      },
      {
        id: "zapis",
        title: "Co zostaje w telefonie",
        blurb: "Postęp zapisuje się lokalnie, na tym urządzeniu.",
      },
    ],
  },
  {
    id: "impuls",
    title: "Chwila impulsu",
    summary: "Przyglądasz się momentowi, w którym ręka szuka papierosa.",
    lessons: [
      {
        id: "sygnal",
        title: "Sygnał, nie rozkaz",
        blurb: "Ochota jest informacją. Nie musisz jej spełniać od razu.",
      },
      {
        id: "pauza",
        title: "Krótka pauza",
        blurb: "Kilka oddechów między impulsem a decyzją.",
      },
    ],
  },
  {
    id: "cialo",
    title: "Pierwsze dni w ciele",
    summary: "Co zwykle dzieje się z oddechem, snem i głodem nikotyny.",
    lessons: [
      {
        id: "doba",
        title: "Pierwsza doba",
        blurb: "Orientacyjny szkic zmian — bez straszenia.",
      },
      {
        id: "sen",
        title: "Sen i niepokój",
        blurb: "Czemu wieczorem bywa trudniej.",
      },
    ],
  },
  {
    id: "rytual",
    title: "Rytuały obok dymu",
    summary: "Kawa, przerwa, droga do domu — miejsca, w których dym miał swoją rolę.",
    lessons: [
      {
        id: "kawa",
        title: "Kawa bez automatyzmu",
        blurb: "Jak rozdzielić napój od papierosa.",
      },
      {
        id: "przerwa",
        title: "Przerwa, która zostaje",
        blurb: "Chwila oddechu nie musi kończyć się dymem.",
      },
    ],
  },
  {
    id: "rozmowa",
    title: "Rozmowa z ochotą",
    summary: "Słowa, które pomagają zostać przy decyzji, gdy ochota wraca.",
    lessons: [
      {
        id: "zdanie",
        title: "Jedno zdanie",
        blurb: "Krótka formułka na trudną minutę.",
      },
      {
        id: "wpadka",
        title: "Gdy wrócisz do dymu",
        blurb: "Wpadka nie kasuje kursu. Wracasz do lekcji.",
      },
    ],
  },
  {
    id: "horyzont",
    title: "Dłuższy horyzont",
    summary: "Tydzień, pieniądze i to, co później zobaczysz na panelu.",
    lessons: [
      {
        id: "tydzien",
        title: "Siedem spokojnych dni",
        blurb: "Jak patrzeć na tydzień zamiast na każdą godzinę.",
      },
      {
        id: "pieniadze",
        title: "Pieniądze z paczki",
        blurb: "Szkic zniżki — liczby dojdą, gdy podasz dane.",
      },
    ],
  },
];

export function findModule(id) {
  return MODULES.find((item) => item.id === id) || null;
}

export function findLesson(moduleId, lessonId) {
  const module = findModule(moduleId);
  if (!module) return null;
  const index = module.lessons.findIndex((item) => item.id === lessonId);
  if (index < 0) return null;
  return { module, lesson: module.lessons[index], index };
}
