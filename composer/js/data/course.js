/* global ZD */
(function (global) {
  "use strict";

  function q(id, text, opts, correct, explanation) {
    return {
      id: id,
      question_text: text,
      option_a: opts[0],
      option_b: opts[1],
      option_c: opts[2],
      option_d: opts[3],
      correct: correct,
      explanation: explanation,
    };
  }

  function lessonQuiz(prefix, topic) {
    return [
      q(prefix + "-1", "Co jest główną ideą metody małych kroków w ZeroDymu?", [
        "Jednorazowa decyzja i silna wola",
        "Codzienne mikro-zmiany i powtarzalność",
        "Całkowity zakaz myślenia o papierosach",
        "Zastąpienie papierosów energizującymi napojami",
      ], "b", "Kaizen zakłada małe, możliwe do utrzymania kroki zamiast heroicznych skoków."),
      q(prefix + "-2", "Kiedy warto świętować postęp w kursie?", [
        "Tylko po egzaminie końcowym",
        "Po każdej ukończonej lekcji i quizie",
        "Nigdy — motywacja powinna być wewnętrzna",
        "Wyłącznie gdy liczba papierosów = 0 przez rok",
      ], "b", "Krótkie celebracje wzmacniają nowe tożsamościowe nawyki."),
      q(prefix + "-3", "Ikigai w kontekście rzucania palenia oznacza przede wszystkim:", [
        "Znalezienie powodu, dla którego chcesz żyć bez dymu",
        "Kupienie droższych papierosów",
        "Palenie tylko w weekendy",
        "Ignorowanie emocji",
      ], "a", "Sens i wartości pomagają utrzymać kierunek, gdy motywacja spada."),
    ];
  }

  function moduleQuiz(prefix, n) {
    var out = [];
    for (var i = 1; i <= 5; i++) {
      out.push(
        q(
          prefix + "-" + i,
          "Pytanie modułowe " + n + "." + i + ": Które stwierdzenie najlepiej opisuje podejście ZeroDymu?",
          [
            "Zmiana od razu, bez planu",
            "Plan, trening umiejętności i śledzenie postępu",
            "Unikanie trudnych sytuacji przez izolację",
            "Poleganie wyłącznie na plastrach",
          ],
          "b",
          "Kurs łączy wiedzę, ćwiczenia i narzędzia panelu."
        )
      );
    }
    return out;
  }

  var finalExam = [];
  for (var fi = 1; fi <= 10; fi++) {
    finalExam.push(
      q(
        "final-" + fi,
        "Egzamin końcowy — pytanie " + fi + ": Co jest kluczem trwałej zmiany?",
        [
          "Perfekcjonizm i zero porażek",
          "Małe kroki, nauka z błędów i wsparcie nawyków",
          "Ukrywanie relapsu przed sobą",
          "Palenie tylko „okazjonalnie” bez limitu",
        ],
        "b",
        "Trwałość buduje się przez proces, nie jednorazowy sprint."
      )
    );
  }

  var modules = [
    {
      id: "m1",
      module_number: 1,
      title: "Mindset i małe kroki",
      description: "Zrozum, dlaczego małe kroki działają lepiej niż heroiczne postanowienia.",
    },
    {
      id: "m2",
      module_number: 2,
      title: "Nikotyna bez mitów",
      description: "Jak działa uzależnienie i co naprawdę czujesz, gdy „potrzebujesz” papierosa.",
    },
    {
      id: "m3",
      module_number: 3,
      title: "Nowe nawyki",
      description: "Buduj rytuały, które zastępują moment z papierosem.",
    },
    {
      id: "m4",
      module_number: 4,
      title: "Stres i emocje",
      description: "Radzenie sobie z napięciem bez sięgania po papierosa.",
    },
    {
      id: "m5",
      module_number: 5,
      title: "Środowisko i ludzie",
      description: "Otaczaj się wsparciem i usuń pułapki z codzienności.",
    },
    {
      id: "m6",
      module_number: 6,
      title: "Trwała zmiana",
      description: "Utrwal sukces i zaplanuj życie bez dymu na lata.",
    },
  ];

  var lesson1Sections = [
    { id: "wprowadzenie", title: "Wprowadzenie" },
    { id: "kaizen", title: "Czym jest Kaizen?" },
    { id: "ikigai", title: "Ikigai i sens" },
    { id: "plan", title: "Twój plan na ten tydzień" },
  ];

  var lessons = [
    {
      id: "l1-1",
      module_id: "m1",
      lesson_number: 1,
      title: "Dlaczego małe kroki wygrywają",
      description: "Pierwsza lekcja o metodzie ZeroDymu.",
      nutshell: "Nie musisz być idealny od jutra. Wybierz jeden mały krok dziennie — mózg szybciej zaakceptuje zmianę.",
      toc: lesson1Sections,
      sections: [
        {
          id: "wprowadzenie",
          title: "Wprowadzenie",
          body:
            "<p>Witaj w ZeroDymu. Ten kurs nie zakłada, że masz nieograniczoną siłę woli. Zakłada coś prostszego: <strong>możesz uczyć się żyć bez papierosa krok po kroku</strong>, tak jak uczysz się języka czy gry na instrumencie.</p><p>Wielu ludzi zaczyna od „od jutra nie palę”. Niestety mózg odbiera to jak zagrożenie i szuka szybkiej ulgi — często właśnie w papierosie. Dlatego stawiamy na <em>małe, powtarzalne działania</em>.</p>",
        },
        {
          id: "kaizen",
          title: "Czym jest Kaizen?",
          body:
            "<p>Kaizen to japońska idea ciągłego doskonalenia przez <strong>mikro-kroki</strong>. Zamiast rzucać wszystko naraz:</p><ul><li>Zmniejszasz liczbę papierosów o 1–2 dziennie, gdy jesteś gotowy.</li><li>Ćwiczysz nowy rytuał w momencie, w którym zwykle sięgasz po papierosa.</li><li>Notujesz postęp w panelu — bez oceniania się.</li></ul><p>Każda lekcja kończy się krótkim quizem, żeby utrwalić najważniejsze idee.</p>",
        },
        {
          id: "ikigai",
          title: "Ikigai i sens",
          body:
            "<p>Ikigai to „powód, dla którego wstajesz rano”. W kontekście rzucania palenia może to być:</p><ol><li>Więcej energii dla dzieci lub partnera.</li><li>Spokojniejszy sen i lepszy smak jedzenia.</li><li>Poczucie sprawczości — jesteś autorem swojej zmiany.</li></ol><p>Wypisz jeden powód w notatniku. Wrócisz do niego w trudniejszych dniach.</p>",
        },
        {
          id: "plan",
          title: "Twój plan na ten tydzień",
          body:
            "<p>Na najbliższe 7 dni wybierz <strong>jeden</strong> nawyk zastępczy (np. 3 głębokie oddechy, szklanka wody, 2-minutowy spacer). Nie musi być idealny — musi być <strong>wykonalny</strong>.</p>",
          task: "Zadanie: Zapisz w panelu (sekcja Nawyki) jeden nawyk, który wykonasz zamiast pierwszego papierosa dnia.",
        },
      ],
    },
    {
      id: "l1-2",
      module_id: "m1",
      lesson_number: 2,
      title: "Mapa Twojego dnia",
      description: "Znajdź momenty ryzyka.",
      nutshell: "Palenie to nawyk powiązany z czasem, miejscem i emocją — zmapuj swoje wyzwalacze.",
      sections: [
        {
          id: "s1",
          title: "Rytuały palenia",
          body: "<p>Większość papierosów nie jest „przypadkiem” — to <strong>scenariusz</strong>: kawa, dojazd, przerwa w pracy. Przez jeden dzień zapisuj tylko <em>kiedy</em> sięgasz po papierosa, bez oceniania.</p>",
        },
      ],
    },
    {
      id: "l1-3",
      module_id: "m1",
      lesson_number: 3,
      title: "Język, który pomaga",
      description: "Jak mówić do siebie w trakcie zmiany.",
      nutshell: "Zamiast „nie mogę” spróbuj „wybieram coś innego” — język kształtuje emocje.",
      sections: [
        {
          id: "s1",
          title: "Afirmacje procesowe",
          body: "<p>Używaj zdań opisujących proces: „Uczę się radzić sobie ze stresem bez dymu”. Unikaj absolutów typu „nigdy już” — one często wywołują rebound.</p>",
        },
      ],
    },
    {
      id: "l1-4",
      module_id: "m1",
      lesson_number: 4,
      title: "Podsumowanie modułu 1",
      description: "Przygotowanie do quizu modułowego.",
      nutshell: "Masz fundament: małe kroki, mapa dnia, wspierający język.",
      sections: [
        {
          id: "s1",
          title: "Co dalej?",
          body: "<p>Po quizie lekcyjnym zdaj <strong>quiz modułowy</strong>. Dopiero wtedy odblokuje się moduł 2. To celowe — chcemy, żebyś naprawdę przyswoił podstawy.</p>",
        },
      ],
    },
    {
      id: "l2-1",
      module_id: "m2",
      lesson_number: 1,
      title: "Nikotyna w 5 minut",
      description: "Krótki mechanizm uzależnienia.",
      sections: [{ id: "s1", title: "Dopamina", body: "<p>Nikotyna szybko podnosi dopaminę, ale efekt krótko trwa — stąd poczucie „głodu” chwilę później.</p>" }],
    },
    {
      id: "l2-2",
      module_id: "m2",
      lesson_number: 2,
      title: "Głód vs nawyk",
      description: "Rozróżnij fizyczne i psychiczne sygnały.",
      sections: [{ id: "s1", title: "Sygnalizacja", body: "<p>Napięcie w klatce i myśl „muszę” często to nawyk, nie kryzys medyczny. Oddech 4-7-8 może pomóc odczekać 3 minuty.</p>" }],
    },
    {
      id: "l2-3",
      module_id: "m2",
      lesson_number: 3,
      title: "Mit natychmiastowej ulgi",
      description: "Co naprawdę daje papieros.",
      sections: [{ id: "s1", title: "Ulga", body: "<p>Papieros głównie redukuje dyskomfort odstawienia, a nie stres życiowy. Uczymy się innych narzędzi w kolejnych modułach.</p>" }],
    },
    {
      id: "l3-1",
      module_id: "m3",
      lesson_number: 1,
      title: "Pętla nawyku",
      description: "Wyzwalacz — rutyna — nagroda.",
      sections: [{ id: "s1", title: "Model", body: "<p>Zidentyfikuj wyzwalacz i wymień rutynę na krótszą, pozytywną. Nagroda może być symboliczna — check w aplikacji też działa.</p>" }],
    },
    {
      id: "l3-2",
      module_id: "m3",
      lesson_number: 2,
      title: "Stacking nawyków",
      description: "Łączenie nowych z istniejącymi.",
      sections: [{ id: "s1", title: "Przykład", body: "<p>Po szklance wody rano — 1 minuta rozciągania. Po obiedzie — krótki spacer zamiast balkonu.</p>" }],
    },
    {
      id: "l3-3",
      module_id: "m3",
      lesson_number: 3,
      title: "Nawyki w panelu",
      description: "Jak używać trackera.",
      sections: [{ id: "s1", title: "Panel", body: "<p>Dodaj 2–3 nawyki. Codzienne odhaczenie buduje wizualny łańcuch — nie przerywaj serii bez powodu.</p>" }],
    },
    {
      id: "l4-1",
      module_id: "m4",
      lesson_number: 1,
      title: "Stres bez dymu",
      description: "Regulacja układu nerwowego.",
      sections: [{ id: "s1", title: "Techniki", body: "<p>Box breathing, krótki ruch, kontakt z ziemią (5-4-3-2-1). Ćwicz wtedy, gdy stres jest mały — łatwiej przenieść na duży.</p>" }],
    },
    {
      id: "l4-2",
      module_id: "m4",
      lesson_number: 2,
      title: "Emocje bez tłumienia",
      description: "Akceptacja fal.",
      sections: [{ id: "s1", title: "Fale", body: "<p>Smutek czy złość nie są porażką. Nazwij emocję na głos — to obniża intensywność impulsu.</p>" }],
    },
    {
      id: "l4-3",
      module_id: "m4",
      lesson_number: 3,
      title: "Plan na trudny dzień",
      description: "Karta ratunkowa.",
      sections: [{ id: "s1", title: "Karta", body: "<p>Zapisz 3 osoby do kontaktu, 2 miejsca bez palenia i 1 aktywność, która Cię uspokaja.</p>" }],
    },
    {
      id: "l5-1",
      module_id: "m5",
      lesson_number: 1,
      title: "Granice z bliskimi",
      description: "Jak poprosić o wsparcie.",
      sections: [{ id: "s1", title: "Rozmowa", body: "<p>„Jestem w trakcie zmiany — proszę, nie oferuj mi papierosów” to wystarczająca prośba.</p>" }],
    },
    {
      id: "l5-2",
      module_id: "m5",
      lesson_number: 2,
      title: "Środowisko domowe",
      description: "Usuń wyzwalacze.",
      sections: [{ id: "s1", title: "Porządki", body: "<p>Popielniczki, zapasowe paczki i zapach dymu na ubraniach — usuń lub schowaj poza zasięg wzroku.</p>" }],
    },
    {
      id: "l5-3",
      module_id: "m5",
      lesson_number: 3,
      title: "Sytuacje społeczne",
      description: "Imprezy i presja.",
      sections: [{ id: "s1", title: "Strategia", body: "<p>Miej napój w ręku, ustal limit czasu, zaplanuj wyjście. Jedno „nie” wystarczy — nie musisz tłumaczyć się długo.</p>" }],
    },
    {
      id: "l6-1",
      module_id: "m6",
      lesson_number: 1,
      title: "Życie po kursie",
      description: "Utrzymanie bez presji.",
      sections: [{ id: "s1", title: "Rytm", body: "<p>Panel zostaje z Tobą — loguj papierosy uczciwie, śledź streak i regenerację zdrowia.</p>" }],
    },
    {
      id: "l6-2",
      module_id: "m6",
      lesson_number: 2,
      title: "Relaps bez dramatu",
      description: "Co po potknięciu.",
      sections: [{ id: "s1", title: "Powrót", body: "<p>Jeden papieros nie kasuje całej podróży. Zanotuj, czego się nauczyłeś, i wróć do planu następnego dnia.</p>" }],
    },
    {
      id: "l6-3",
      module_id: "m6",
      lesson_number: 3,
      title: "Twoja przyszłość bez dymu",
      description: "Wizja na 12 miesięcy.",
      sections: [{ id: "s1", title: "Wizja", body: "<p>Opisz, co robisz za rok, gdy nie palisz. Użyj tej wizji jako kotwicy podczas egzaminu końcowego.</p>" }],
    },
  ];

  var lessonQuizzes = {};
  lessons.forEach(function (les) {
    lessonQuizzes[les.id] = lessonQuiz(les.id, les.title);
  });

  var moduleQuizzes = {
    m1: moduleQuiz("mq1", 1),
    m2: moduleQuiz("mq2", 2),
    m3: moduleQuiz("mq3", 3),
    m4: moduleQuiz("mq4", 4),
    m5: moduleQuiz("mq5", 5),
    m6: moduleQuiz("mq6", 6),
  };

  var HEALTH_MILESTONES = [
    { days: 1, title: "Po 24 godzinach", description: "Poziom CO w krwi spada, serce zaczyna pracować lżej." },
    { days: 3, title: "Po 3 dniach", description: "Nikotyna opuszcza organizm — smak i węch się poprawiają." },
    { days: 7, title: "Po tygodniu", description: "Oddychanie jest łatwiejsze, energia stabilniejsza." },
    { days: 14, title: "Po 2 tygodniach", description: "Krążenie krwi zyskuje — marsz bez zadyszki." },
    { days: 30, title: "Po miesiącu", description: "Kaszel może wyraźnie się zmniejszyć." },
    { days: 90, title: "Po 3 miesiącach", description: "Funkcje płuc zaczynają się regenerować." },
    { days: 180, title: "Po 6 miesiącach", description: "Mniej infekcji dróg oddechowych." },
    { days: 365, title: "Po roku", description: "Ryzyko chorób serca spada o około połowę." },
  ];

  global.ZD = global.ZD || {};
  global.ZD.course = {
    modules: modules,
    lessons: lessons,
    lessonQuizzes: lessonQuizzes,
    moduleQuizzes: moduleQuizzes,
    finalExam: finalExam,
    HEALTH_MILESTONES: HEALTH_MILESTONES,
    getLesson: function (id) {
      for (var i = 0; i < lessons.length; i++) {
        if (lessons[i].id === id) return lessons[i];
      }
      return null;
    },
    getModule: function (id) {
      for (var i = 0; i < modules.length; i++) {
        if (modules[i].id === id) return modules[i];
      }
      return null;
    },
    getModuleByNumber: function (num) {
      for (var i = 0; i < modules.length; i++) {
        if (modules[i].module_number === num) return modules[i];
      }
      return null;
    },
  };
})(typeof window !== "undefined" ? window : this);
