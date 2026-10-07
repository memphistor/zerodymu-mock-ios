/**
 * Moduł 1 — PEŁNA TREŚĆ (krok 2).
 *
 * Tematyka: Kaizen (małe, regularne usprawnienia) i Ikigai (własne „po co"),
 * w kontekście rzucania palenia małymi krokami.
 *
 * Format sekcji: `body` to tablica bloków.
 *   'akapit'                        → zwykły akapit
 *   { ul: ['…'] } / { ol: ['…'] }   → lista punktowana lub numerowana
 *   { tip: '…' }                    → wyróżniona wskazówka
 *   { note: '…' }                   → „Warto wiedzieć"
 *   { try: '…' }                    → zadanie „Spróbuj dziś"
 */

import { q } from '../helpers.js';

export default {
  id: 'm1',
  number: 1,
  title: 'Pierwsze kroki',
  lead: 'Spokojny start: gdzie jesteś, po co to robisz i od czego zacząć.',
  goals: [
    'Zauważyć swoją sytuację bez oceniania',
    'Znaleźć własny powód (ikigai) na spokojniejsze dni',
    'Wybrać jeden mały krok na najbliższy dzień',
  ],
  lessons: [
    {
      id: 'm1-l1',
      title: 'Gdzie jesteś teraz',
      minutes: 6,
      pill: 'Zamiast oceniać, najpierw zauważ — Kaizen zaczyna się od spokojnej obserwacji.',
      sections: [
        {
          title: 'Spokojny start',
          body: [
            'Nie musisz niczego obiecywać ani podpisywać deklaracji. Pierwszy krok to zauważenie, jak dziś wygląda Twój dzień — bez oceniania siebie i bez planu na całe życie.',
            { ul: [
              'Ile razy w ciągu dnia sięgasz po papierosa?',
              'W których momentach zdarza się to najczęściej?',
              'Co dzieje się tuż przed — i tuż po?',
            ] },
            { note: 'To nie test ani ocena. Chodzi tylko o zdjęcie sytuacji, które pomoże wybrać jeden mały krok.' },
          ],
        },
        {
          title: 'Czym jest Kaizen',
          body: [
            'Kaizen to japońska idea drobnych, regularnych usprawnień. W praktyce oznacza, że lepiej zmieniać coś o jeden procent każdego dnia niż obiecywać rewolucję od poniedziałku.',
            'Duże postanowienia rzadko wytrzymują pierwszy trudniejszy tydzień. Małe kroki łatwiej powtórzyć, a to właśnie powtarzanie — nie siła woli — tworzy trwałą zmianę.',
            { tip: 'Dobry krok jest tak mały, że aż trochę niepoważny. Właśnie dlatego ma szansę się utrzymać.' },
          ],
        },
        {
          title: 'Spróbuj dziś',
          body: [
            { try: 'Zapisz w notatce telefonu trzy momenty, w których wczoraj sięgnąłeś po papierosa. Tylko zapisz — nic z tym nie rób ani nie zmieniaj.' },
            'Sama obserwacja jest już działaniem. W kolejnych lekcjach wybierzesz z tej listy jeden punkt, przy którym wprowadzisz niewielką zmianę.',
          ],
        },
      ],
      quiz: [
        q('Czym jest Kaizen?',
          [
            'Jednorazowym postanowieniem zmiany całego życia',
            'Dietą oczyszczającą na dwa tygodnie',
            'Drobnymi, regularnymi usprawnieniami',
            'Metodą liczenia wypalonych papierosów',
          ], 2, 'Kaizen to małe usprawnienia powtarzane regularnie — nie jedna wielka deklaracja.'),
        q('Co proponuje pierwsza lekcja?',
          [
            'Zmienić od razu całe otoczenie i wszystkie nawyki',
            'Zauważyć, jak obecnie wygląda dzień, bez oceniania',
            'Zapisać się na grupę wsparcia',
            'Wyznaczyć datę rzucenia i trzymać się jej',
          ], 1, 'Punktem wyjścia jest spokojna obserwacja własnej sytuacji, a nie duża deklaracja.'),
        q('Dlaczego mały krok bywa skuteczniejszy od dużego postanowienia?',
          [
            'Bo od razu widać spektakularny efekt',
            'Bo nie wymaga żadnej decyzji',
            'Bo można go zrobić bez wysiłku',
            'Bo łatwiej go powtarzać w trudnym tygodniu',
          ], 3, 'Mały krok jest lżejszy do powtórzenia, a powtarzanie tworzy zmianę.'),
      ],
    },
    {
      id: 'm1-l2',
      title: 'Twoje „po co"',
      minutes: 7,
      pill: 'Ikigai to nie wielki cel, ale codzienne „po co" — bez niego małe kroki nie mają kierunku.',
      sections: [
        {
          title: 'Ikigai — po co wstajesz rano',
          body: [
            'Ikigai to japońskie określenie na sens, który popycha Cię do działania. Nie chodzi o misję na całe życie, ale o codzienny powód, dla którego chce Ci się wstać.',
            'W zmianie nawyku sens pełni tę samą rolę co cel: mówi, w którą stronę iść, gdy pojawia się trudność. Siła woli bywa kapryśna — powód zostaje.',
          ],
        },
        {
          title: 'Twoje „po co" bez dymu',
          body: [
            'Powód nie musi być wielki ani medyczny. Wystarczy prawdziwy.',
            { ul: [
              '„Chcę w spokoju wejść po schodach bez zadyszki" — oddech i forma.',
              '„Chcę zostawać na spotkaniu, zamiast wychodzić na dziesięć minut" — swoboda w towarzystwie.',
              '„Chcę mieć dzień, którego nie planuję wokół przerwy na papierosa" — czas dla siebie.',
            ] },
            { note: 'Cudze powody („bo tak wypada") rzadko wytrzymują. Wybierz swój, nawet jeśli brzmi zwyczajnie.' },
          ],
        },
        {
          title: 'Spróbuj dziś',
          body: [
            { try: 'Dokończ w notatce zdanie: „Chcę mniej palić, bo…". Napisz trzy odpowiedzi i zaznacz tę, która najbardziej Cię porusza.' },
            'Jedno zdanie, które jest Twoje, jest warte więcej niż lista argumentów, których nie czujesz.',
          ],
        },
      ],
      quiz: [
        q('Czym jest ikigai w tym kursie?',
          [
            'Codzienny, osobisty powód, dla którego warto działać',
            'Celebracją, którą urządzasz po rzuceniu palenia',
            'Techniką relaksacyjną przed snem',
            'Rodzajem diety wspierającej rzucanie',
          ], 0, 'Ikigai to osobisty sens, który nadaje kierunek codziennym krokom.'),
        q('Dlaczego warto mieć własny powód, a nie cudzy?',
          [
            'Bo cudze powody są nieprawdziwe',
            'Bo własny wytrzymuje trudniejsze dni',
            'Bo tylko własny da się zapisać',
            'Bo cudze powody należą do innych osób',
          ], 1, 'Powód, który naprawdę czujesz, podtrzymuje działanie, gdy siła woli słabnie.'),
        q('Co jest zadaniem „Spróbuj dziś" w tej lekcji?',
          [
            'Zmiana miejsca palenia',
            'Zapisanie dziesięciu powodów rzucenia',
            'Dokończenie zdania „Chcę mniej palić, bo…"',
            'Powiedzenie o planach bliskiej osobie',
          ], 2, 'Wystarczy jedno zdanie o własnych powodach — konkretne i osobiste.'),
      ],
    },
    {
      id: 'm1-l3',
      title: 'Pierwszy mały krok',
      minutes: 7,
      pill: 'Jedna zmiana, jedna sytuacja, jeden dzień — tyle wystarczy na początek.',
      sections: [
        {
          title: 'Jak wybrać krok',
          body: [
            'Masz już listę momentów i własny powód. Teraz wybierz z niej jeden punkt — nie wszystkie naraz.',
            { ul: [
              'Najłatwiejszy do zmiany: sytuacja, którą realnie kontrolujesz.',
              'Możliwy do powtórzenia codziennie przez najbliższy tydzień.',
              'Tak mały, że dasz radę nawet w gorszym dniu.',
            ] },
            { tip: 'Jeśli krok wydaje się zbyt duży, znaczy że trzeba go jeszcze podzielić.' },
          ],
        },
        {
          title: 'Przykłady małych kroków',
          body: [
            'Poniższe propozycje są tylko inspiracją — Twój krok nie musi być na tej liście.',
            { ul: [
              'Pierwszy papieros dnia o pół godziny później niż zwykle.',
              'Kubek wody zamiast papierosa w jednej konkretnej przerwie.',
              'Telefon i zapalniczka poza sypialnią.',
              'Krótki spacer w miejscu zwykłej przerwy na balkonie.',
            ] },
            { note: 'Liczba papierosów nie jest na tym etapie najważniejsza. Ważniejsze jest to, że regularnie coś powtarzasz.' },
          ],
        },
        {
          title: 'Spróbuj dziś',
          body: [
            { try: 'Wybierz jeden krok i zaplanuj, kiedy dokładnie go wykonasz: „W poniedziałek o 10:00, zamiast…".' },
            'Zapisana godzina i sytuacja działa lepiej niż samo postanowienie „będę się starać".',
          ],
        },
      ],
      quiz: [
        q('Ile kroków wybierasz na najbliższy tydzień?',
          [
            'Wszystkie z listy, żeby zmiana była szybka',
            'Dokładnie jeden',
            'Tyle, ile udźwignie siła woli',
            'Dwa: jeden na dzień, drugi na noc',
          ], 1, 'Jeden krok łatwiej powtórzyć i utrzymać — kolejne dojdą później.'),
        q('Co robić, gdy wybrany krok wydaje się za duży?',
          [
            'Odłożyć go na miesiąc',
            'Zmienić na krok jeszcze mniejszy',
            'Dodać drugi krok jako wsparcie',
            'Zostawić bez zmian i zmuszać się mocniej',
          ], 1, 'Za duży krok dzieli się na mniejsze — to jest właśnie myślenie w duchu Kaizen.'),
        q('Dlaczego w planie warto zapisać godzinę i sytuację?',
          [
            'Żeby mieć dowód dla lekarza',
            'Żeby trudniej było cofnąć decyzję',
            'Żeby plan działał w konkretnym momencie, a nie „ogólnie"',
            'Żeby policzyć, ile kroków wykonałeś',
          ], 2, 'Konkretna godzina i sytuacja dają zaczepienie w realnym dniu, siła woli sama z siebie nie wystarcza.'),
      ],
    },
  ],
  quiz: [
    q('Które zdanie najlepiej opisuje Kaizen?',
      [
        'Małe usprawnienia powtarzane regularnie',
        'Jednorazowy wielki wysiłek',
        'Metoda nagród i kar',
        'Plan oparty wyłącznie na sile woli',
      ], 0, 'Kaizen to drobne zmiany powtarzane codziennie.'),
    q('Po co w tym kursie pojawia się ikigai?',
      [
        'Żeby uporządkować plan dnia',
        'Żeby liczyć dni bez papierosa',
        'Żeby zastąpić nawyk innym nawykiem',
        'Żeby mieć osobisty powód na trudniejsze dni',
      ], 3, 'Ikigai daje kierunek i podtrzymuje działanie, gdy pojawia się trudność.'),
    q('Od czego zaczyna się praca w module 1?',
      [
        'Od wyznaczenia daty rzucenia',
        'Od spokojnej obserwacji własnego dnia',
        'Od wyrzucenia wszystkich papierosów',
        'Od zmiany diety',
      ], 1, 'Startem jest obserwacja, nie deklaracja ani rewolucja.'),
    q('Jaki krok warto wybrać na pierwszy tydzień?',
      [
        'Ten, który jest najbardziej ambitny',
        'Ten, który wybrał ktoś, komu się udało',
        'Jeden, mały i możliwy do powtórzenia',
        'Wszystkie zmiany naraz, żeby skończyć temat',
      ], 2, 'Jeden mały, powtarzalny krok daje podstawę do kolejnych zmian.'),
    q('Co zrobić, jeśli krok okazał się zbyt trudny?',
      [
        'Podzielić go na mniejszy i spróbować ponownie',
        'Uznać, że metoda nie działa',
        'Wrócić do punktu wyjścia na dłuższy czas',
        'Zwiększyć motywację i próbować dalej to samo',
      ], 3, 'Trudny krok to informacja, że trzeba go zmniejszyć — nie powód, żeby się poddać.'),
  ],
};
