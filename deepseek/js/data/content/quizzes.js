/**
 * Quizy i egzamin — krok 2.
 *
 * Struktura pytania jest docelowa: 4 odpowiedzi (A–D), indeks poprawnej
 * i wyjaśnienie pokazywane po wyborze. Ocena i zapis wyniku dzieją się
 * w widoku quizu (`views/quiz.js`).
 *
 * Zasięg treści:
 *  - quizy lekcji — tylko moduł 1 (moduły 2–6 nie mają jeszcze treści lekcji),
 *  - quizy modułów — wszystkie 6, po 5 pytań, na bazie pigułek lekcji,
 *  - egzamin — 10 pytań z całego kursu.
 *
 * Tematyka: Kaizen, Ikigai, rzucanie palenia małymi krokami.
 */

/** Skrót do budowy pytania: (id, treść, [A, B, C, D], indeks poprawnej, wyjaśnienie). */
function q(id, prompt, options, answerIndex, explanation) {
  return { id, prompt, options, answerIndex, explanation };
}

/* --- Quizy lekcji (moduł 1) --- */

export const lessonQuizzes = {
  "m1-l1": [
    q(
      "m1-l1-q1",
      "Po co w module 1 robimy mapę dnia?",
      [
        "Żeby policzyć, ile pieniędzy tracimy na papierosy",
        "Żeby zobaczyć rytm, w który papieros wrósł w codzienność",
        "Żeby udowodnić sobie, że brakuje nam silnej woli",
        "Żeby od razu rzucić palenie z dnia na dzień",
      ],
      1,
      "Mapa dnia pokazuje powtarzalny rytm, a nie ocenia. Dopiero widząc wzorzec, można go świadomie zmieniać."
    ),
    q(
      "m1-l1-q2",
      "Który zapis z dziennika jest najbardziej użyteczny?",
      [
        "„Znowu się nie udało”",
        "„Jestem słaby, to bez sensu”",
        "„Zapaliłem po trzeciej kawie, w kuchni”",
        "„Wszyscy wokół palą, więc trudno”",
      ],
      2,
      "Liczą się fakty: moment, miejsce i okoliczność. Oceny nie niosą informacji o wyzwalaczu."
    ),
    q(
      "m1-l1-q3",
      "Na czym polega zasada Kaizen w pracy nad nawykiem?",
      [
        "Na jednej dużej, zdecydowanej zmianie od zaraz",
        "Na drobnym, powtarzalnym ulepszaniu jednego punktu naraz",
        "Na całkowitym unikaniu sytuacji z papierosem",
        "Na nagradzaniu się po każdym dniu bez papierosa",
      ],
      1,
      "Kaizen to ciągłe, małe ulepszenia. Wybierasz jeden powtarzalny punkt zamiast przebudowywać cały dzień."
    ),
  ],

  "m1-l2": [
    q(
      "m1-l2-q1",
      "Czym jest wyzwalacz?",
      [
        "Karą za zapalenie papierosa",
        "Sygnałem, po którym ręka sama sięga po papierosa",
        "Rodzajem nikotyny w organizmie",
        "Ustawieniem w aplikacji przypominającym o celu",
      ],
      1,
      "Wyzwalacz to sygnał — sytuacja, emocja albo osoba — po którym następuje automatyczna reakcja. Nazwany, traci część władzy."
    ),
    q(
      "m1-l2-q2",
      "Do której rodziny wyzwalaczy należy „przerwa w pracy z palącym kolegą”?",
      ["Fizycznych", "Emocjonalnych", "Społecznych", "Losowych — to nie jest wyzwalacz"],
      2,
      "Społeczne wyzwalacze to ludzie i wspólne rytuały: przerwa, towarzystwo palących, rozmowa na balkonie."
    ),
    q(
      "m1-l2-q3",
      "Jak działa powód w duchu Ikigai, gdy pojawia się wyzwalacz?",
      [
        "Zastępuje zakaz pytaniem „po co mi to?”",
        "Każe unikać wszystkich sytuacji z papierosem",
        "Jest karą za każde zapalenie papierosa",
        "Wymaga natychmiastowego rzucenia palenia",
      ],
      0,
      "Ikigai działa jak przeciwwaga dla wyzwalacza: zamiast zakazu masz powód. „Idę w inną stronę” jest łatwiejsze do wykonania niż „nie wolno”."
    ),
  ],

  "m1-l3": [
    q(
      "m1-l3-q1",
      "Które trzy kolumny wystarczą w minimalnym dzienniku?",
      [
        "Data, koszt, nastrój",
        "Moment, wyzwalacz, stan przed i po",
        "Godzina, liczba papierosów, kara",
        "Miejsce, marka papierosów, pora roku",
      ],
      1,
      "Trzy potrzebne kolumny to moment, wyzwalacz oraz krótki stan przed i po. Reszta to nadmiar na tym etapie."
    ),
    q(
      "m1-l3-q2",
      "Dlaczego dziennik nie powinien zawierać oceniania siebie?",
      [
        "Bo oceny zajmują za dużo miejsca",
        "Bo dziennik z ocenami traci funkcję obserwacji i szybko się kończy",
        "Bo oceny są niepotrzebne, jeśli i tak rzucamy palenie",
        "Bo oceny psują statystyki w aplikacji",
      ],
      1,
      "Dziennik, w którym się karzesz, staje się dowodem winy — po kilku dniach ląduje w szufladzie zamiast pokazać wzorzec."
    ),
    q(
      "m1-l3-q3",
      "Co robisz po trzech–czterech dniach obserwacji?",
      [
        "Od razu rzucasz palenie na zawsze",
        "Zwiększasz liczbę zapisywanych kolumn",
        "Podkreślasz wzorzec i zapisujesz zdanie „od tego zaczynam”",
        "Zaczynasz od nowa, bo jeden dzień był słabszy",
      ],
      2,
      "Po kilku dniach widzisz powtarzalny wzorzec: moment, wyzwalacz i najtrudniejszą porę. To jest Twój punkt startowy."
    ),
  ],
};

/* --- Quizy modułów (5 pytań każdy) --- */

export const moduleQuizzes = {
  m1: [
    q(
      "m1-mq1",
      "Czym jest mapa dnia?",
      [
        "Rozkładem jazdy komunikacji miejskiej",
        "Notatką z momentów, w których sięgasz po papierosa",
        "Listą kar za zapalone papierosy",
        "Planem rzucenia palenia z dokładną datą",
      ],
      1,
      "Mapa dnia to zapis momentów, miejsc i okoliczności, w których pojawia się papieros."
    ),
    q(
      "m1-mq2",
      "Które z poniższych NIE jest wyzwalaczem z rodziny fizycznej?",
      ["Kawa", "Alkohol", "Zapach dymu", "Nuda po południu"],
      3,
      "Fizyczne wyzwalacze to bodźce ciała: kawa, alkohol, jedzenie, zapach dymu. Nuda należy do emocjonalnych."
    ),
    q(
      "m1-mq3",
      "Najważniejsza różnica między zakazem a powodem w duchu Ikigai to:",
      [
        "Zakaz jest skuteczniejszy, bo brzmi twardo",
        "Powód daje kierunek, zakaz tylko ogranicza",
        "Nie ma różnicy, oba działają tak samo",
        "Zakaz jest potrzebny tylko pierwszego dnia",
      ],
      1,
      "Powód wskazuje kierunek („idę w inną stronę”), a zakaz tylko odbiera. Kierunek łatwiej wykonać w trudnym momencie."
    ),
    q(
      "m1-mq4",
      "Co jest celem pierwszego wpisu w dzienniku?",
      [
        "Zapisanie tysiąca szczegółów",
        "Ustalenie, ile papierosów wypalasz w ciągu roku",
        "Zapisanie faktu: moment, wyzwalacz, stan",
        "Obiecanie sobie, że to ostatni papieros",
      ],
      2,
      "Zapisujemy fakt, krótko i rzeczowo. Szczegóły i obietnice to nie zadanie dziennika obserwacji."
    ),
    q(
      "m1-mq5",
      "Jaką rolę pełni zasada Kaizen przy zmianie nawyku palenia?",
      [
        "Skłania do jednego dużego postanowienia",
        "Pozwala na drobne kroki, które utrzymują się w czasie",
        "Zastępuje potrzebę wyznaczenia wyzwalaczy",
        "Działa tylko wtedy, gdy pali się mniej niż pięć papierosów dziennie",
      ],
      1,
      "Kaizen polega na drobnych, powtarzalnych krokach. Dzięki temu zmiana jest realna i utrzymuje się w trudniejsze dni."
    ),
  ],

  m2: [
    q(
      "m2-mq1",
      "Kiedy osobisty powód działa najlepiej?",
      [
        "Gdy jest modny i brzmi dobrze",
        "Gdy jest konkretny i naprawdę Twój",
        "Gdy jest bardzo ogólny, np. „chcę być zdrowszy”",
        "Gdy powtarzasz go tylko w myślach",
      ],
      1,
      "Powód działa, gdy jest konkretny i Twój — a nie cudzy ani modny. Wtedy wytrzymuje trudny wieczór."
    ),
    q(
      "m2-mq2",
      "Co pokazuje bilans kosztów i zysków palenia?",
      [
        "Wyłącznie to, czego się wyrzekasz",
        "Co palenie daje i czego Cię pozbawia — razem",
        "Tylko wydatki na papierosy",
        "Liczbę papierosów wypalanych w roku",
      ],
      1,
      "Uczciwy bilans pokazuje obie strony: co zyskujesz i czego się wyrzekasz. Dopiero razem tworzą obraz."
    ),
    q(
      "m2-mq3",
      "Czym różni się zobowiązanie od zamiaru?",
      [
        "Zobowiązanie ma konkretną datę",
        "Zamiar jest silniejszy",
        "Nie ma różnicy",
        "Zobowiązanie nie wymaga planu",
      ],
      0,
      "Zobowiązanie z datą waży więcej niż najlepsze chęci. Data zamienia zamiar w plan."
    ),
    q(
      "m2-mq4",
      "Co zrobić, gdy Twój powód brzmi jak cudze motto?",
      [
        "Zostawić go — ważne, że brzmi mądrze",
        "Zamienić go na własny, konkretny powód",
        "Powtarzać go częściej",
        "Dodać do niego więcej słów",
      ],
      1,
      "Powód z cudzych słów nie przetrwa trudnego momentu. Trzeba go zamienić na własny i konkretny."
    ),
    q(
      "m2-mq5",
      "Po co łączyć powód z konkretnym kosztem i zyskiem?",
      [
        "Żeby powód miał oparcie w faktach z Twojego życia",
        "Żeby lista była dłuższa",
        "Żeby uniknąć planu na kryzys",
        "Żeby policzyć oszczędności",
      ],
      0,
      "Powód oparty na realnym koszcie i zysku jest mocniejszy niż samo hasło — ma oparcie w Twoim życiu."
    ),
  ],

  m3: [
    q(
      "m3-mq1",
      "Czym jest zasada 2 minut?",
      [
        "Krokiem tak małym, że nie da się go nie zrobić",
        "Dwiema minutami ćwiczeń oddechowych",
        "Limit czasu na jeden papieros",
        "Sposobem na odłożenie decyzji o dwie minuty",
      ],
      0,
      "Zaczynasz od wersji kroku tak małej, że wykonasz ją nawet w najgorszy dzień. Wtedy krok faktycznie się powtarza."
    ),
    q(
      "m3-mq2",
      "Dlaczego „jedna zmiana naraz” wygrywa z długą listą postanowień?",
      [
        "Bo jest mniej ambitna",
        "Bo jedna zmiana ma szansę przetrwać",
        "Bo lista postanowień jest niepotrzebna",
        "Bo zmiany trzeba robić po kolei według kolejności listy",
      ],
      1,
      "Jedna zmiana naraz to nie brak ambicji — to sposób, żeby zmiana przetrwała pierwsze tygodnie."
    ),
    q(
      "m3-mq3",
      "Kiedy pisze się plan na kryzys?",
      [
        "W środku najtrudniejszej fali",
        "W spokojnym dniu, z wyprzedzeniem",
        "Dopiero po pierwszym potknięciu",
        "W dniu, w którym rzucasz palenie",
      ],
      1,
      "Plan na kryzys pisze się w spokojnym dniu. W środku fali trudno wymyślać działania."
    ),
    q(
      "m3-mq4",
      "Po czym poznać dobrze dobrany mikro-krok?",
      [
        "Jest wymagający i ambitny",
        "Jest wykonalny nawet w najgorszy dzień",
        "Wymaga skupienia przez godzinę",
        "Zależy od nastroju",
      ],
      1,
      "Dobrze dobrany krok wykonasz nawet w słabszy dzień — dlatego nie przerywa się serii."
    ),
    q(
      "m3-mq5",
      "Czego unikać zaczynając od mikro-kroków?",
      [
        "Wybierania jednego punktu",
        "Listy wielu postanowień naraz",
        "Planowania z wyprzedzeniem",
        "Zapisywania kroku",
      ],
      1,
      "Wiele zmian naraz rozprasza uwagę i zwiększa ryzyko, że żadna się nie utrzyma."
    ),
  ],

  m4: [
    q(
      "m4-mq1",
      "Jak długo zwykle trwa pojedyncza fala głodu nikotynowego?",
      [
        "Kilka sekund i nie da się jej przetrwać bez papierosa",
        "Kilka minut — potem słabnie, jeśli jej nie dokarmiasz",
        "Kilka godzin bez przerwy",
        "Cały dzień, aż do wypalenia papierosa",
      ],
      1,
      "Fala mija w kilka minut, nawet gdy nic nie zrobisz. Działania przyspieszają jej opadanie."
    ),
    q(
      "m4-mq2",
      "Co wygrywa w stresie, gdy pojawia się wyzwalacz?",
      [
        "Długa rozmowa z sobą samym",
        "Przygotowana wcześniej lista trzech działań",
        "Ignorowanie napięcia",
        "Odłożenie decyzji na wieczór",
      ],
      1,
      "W stresie rzadko wygrywa wola, a prawie zawsze przygotowany wcześniej plan: krótkie, jasne działania."
    ),
    q(
      "m4-mq3",
      "Jak najlepiej przygotować odmowę w towarzystwie palących?",
      [
        "Wymyślać ją w danej chwili",
        "Powiedzieć swoje jedno zdanie wcześniej na głos",
        "Unikać wszystkich przerw w pracy",
        "Nie tłumaczyć się nikomu nigdy",
      ],
      1,
      "Jedno zdanie odmowy, powiedziane wcześniej na głos, wystarcza w większości sytuacji — potem nie trzeba improwizować."
    ),
    q(
      "m4-mq4",
      "Co robić, gdy fala głodu nie mija od razu?",
      [
        "Nie dokarmiać jej i przeczekać, wspierając się działaniem",
        "Zapalić połówkę papierosa",
        "Zająć się pracą i udawać, że jej nie ma",
        "Wyznaczyć sobie karę za każdą falę",
      ],
      0,
      "Fali nie dokarmia się myślami o papierosie. Pomaga przeczekanie i działanie, które odwraca uwagę."
    ),
    q(
      "m4-mq5",
      "Które wyzwalacze należą do społecznych?",
      [
        "Kawa i alkohol",
        "Nuda i złość",
        "Przerwa w pracy i towarzystwo palących",
        "Zapach dymu i jedzenie",
      ],
      2,
      "Społeczne wyzwalacze to ludzie i wspólne rytuały: przerwa, impreza, grupa palących."
    ),
  ],

  m5: [
    q(
      "m5-mq1",
      "Czym jest dobry zamiennik po papierosie?",
      [
        "Zawsze zdrowszą i lepszą wersją papierosa",
        "Czymś, co daje podobną pauzę w rytmie dnia",
        "Kolejnym obowiązkiem do odhaczenia",
        "Czymś, co wymaga dużego wysiłku",
      ],
      1,
      "Zamiennik nie musi być lepszy — musi dawać podobną pauzę, którą dotąd dawał papieros."
    ),
    q(
      "m5-mq2",
      "Co działa szybciej niż tłumaczenie sobie „nie palę”?",
      [
        "Krótki ruch i kilka spokojnych oddechów",
        "Długa analiza przyczyn nawyku",
        "Rozmowa z kimś palącym",
        "Odłożenie decyzji na jutro",
      ],
      0,
      "Kilka minut ruchu lub spokojnych oddechów obniża napięcie szybciej niż wewnętrzne tłumaczenie."
    ),
    q(
      "m5-mq3",
      "Po co planować nagrodę przy nowym nawyku?",
      [
        "Bo to, co nagradzane, ma większą szansę się powtarzać",
        "Bo nagroda zastępuje plan",
        "Bo bez nagrody nie wolno zaczynać",
        "Bo nagroda musi być finansowa",
      ],
      0,
      "Nagroda wzmacnia powtarzanie. Zaplanuj ją tak samo świadomie jak sam krok."
    ),
    q(
      "m5-mq4",
      "Po co wypełniać miejsce, które zostawił papieros?",
      [
        "Żeby dzień nie zamienił się w pustkę, z której nawyk wraca z nudów",
        "Żeby mieć więcej obowiązków",
        "Żeby uniknąć planu na kryzys",
        "Żeby liczyć wypalone papierosy",
      ],
      0,
      "Puste miejsce po papierosie szybko wypełnia nuda. Nowa rutyna zajmuje je czymś innym."
    ),
    q(
      "m5-mq5",
      "Który zamiennik najlepiej pasuje do przerwy w pracy?",
      [
        "Kolejna kawa wypita w pośpiechu przy biurku",
        "Krótkie wyjście na zewnątrz i kilka oddechów",
        "Dłuższa praca bez przerwy",
        "Zostanie w miejscu i przeglądanie telefonu",
      ],
      1,
      "Chodzi o podobną pauzę: wyjście, zmiana otoczenia, kilka oddechów — a nie kolejny bodziec w tym samym miejscu."
    ),
  ],

  m6: [
    q(
      "m6-mq1",
      "Czym jest pojedyncze potknięcie?",
      [
        "Dowodem, że plan się nie udał",
        "Informacją o wyzwalaczu",
        "Powodem, żeby zacząć od nowa za miesiąc",
        "Czymś, o czym nie należy myśleć",
      ],
      1,
      "Potknięcie to informacja o wyzwalaczu, a nie wyrok na cały plan."
    ),
    q(
      "m6-mq2",
      "Dlaczego warto zmieniać otoczenie, a nie tylko walczyć siłą woli?",
      [
        "Bo łatwiej zmienić otoczenie niż codziennie opierać się wyzwalaczom",
        "Bo siła woli nie istnieje",
        "Bo otoczenie nie ma znaczenia",
        "Bo wtedy nie trzeba planu",
      ],
      0,
      "Otoczenie dostarcza wyzwalaczy. Zmieniając je, zmniejszasz liczbę okazji do automatyzmu."
    ),
    q(
      "m6-mq3",
      "Co przede wszystkim utrzymuje zmianę na dłużej?",
      [
        "Jeden silny zryw na starcie",
        "Powtarzalność małych kroków",
        "Unikanie wszystkich ludzi",
        "Brak jakichkolwiek błędów",
      ],
      1,
      "Trwałość buduje powtarzalność, a nie jednorazowy zryw."
    ),
    q(
      "m6-mq4",
      "Co zrobić bezpośrednio po potknięciu?",
      [
        "Wrócić do planu tego samego dnia",
        "Odczekać kilka tygodni",
        "Zacząć cały kurs od nowa",
        "Zapomnieć o zdarzeniu",
      ],
      0,
      "Najważniejszy jest szybki powrót — tego samego dnia, bez karencji i bez zaczynania od zera."
    ),
    q(
      "m6-mq5",
      "Który zestaw najlepiej opisuje trwałą zmianę?",
      [
        "Zryw, kara, unikanie",
        "Powtarzalność, szybki powrót, wspierające otoczenie",
        "Zakaz, presja, cisza",
        "Plan, kara, nagroda",
      ],
      1,
      "Trwałą zmianę tworzą: powtarzalne małe kroki, szybki powrót po potknięciu i otoczenie, które pomaga."
    ),
  ],
};

/* --- Egzamin (10 pytań z całego kursu) --- */

export const examQuestions = [
  q(
    "ex-q1",
    "Który element dnia warto wybrać jako punkt startowy zmiany?",
    [
      "Ten, którego najbardziej nie lubisz",
      "Jeden powtarzalny moment, w którym papieros wraca najczęściej",
      "Wszystkie momenty naraz",
      "Ten, który zdarza się najrzadziej",
    ],
    1,
    "Zasada Kaizen: jeden powtarzalny punkt naraz daje zmianę, która się utrzymuje."
  ),
  q(
    "ex-q2",
    "Zasada mikro-kroku („zasada 2 minut”) mówi, żeby zacząć od wersji:",
    [
      "Najtrudniejszej, dla prawdziwego wyzwania",
      "Tak małej, że wykonasz ją nawet w najgorszy dzień",
      "Którą wykonasz tylko w dni wolne",
      "Zależnej od nastroju",
    ],
    1,
    "Krok ma być tak mały, żeby nie dało się go nie zrobić — wtedy faktycznie się powtarza."
  ),
  q(
    "ex-q3",
    "Czym jest Ikigai w praktyce tego kursu?",
    [
      "Techniką liczenia wypalonych papierosów",
      "Powodem, który nadaje kierunek i zastępuje zakaz",
      "Nazwą japońskiej marki papierosów",
      "Zestawem ćwiczeń oddechowych",
    ],
    1,
    "Ikigai to powód, dla którego warto wstać. W praktyce działa jako przeciwwaga dla wyzwalacza."
  ),
  q(
    "ex-q4",
    "Jak długo zwykle trwa pojedyncza fala głodu nikotynowego?",
    [
      "Kilka sekund i nie da się jej przetrwać bez papierosa",
      "Kilka minut — potem słabnie, jeśli jej nie dokarmiasz",
      "Kilka godzin bez przerwy",
      "Cały dzień, aż do wypalenia papierosa",
    ],
    1,
    "Fala mija w kilka minut, nawet gdy nic nie zrobisz. Działania przyspieszają jej opadanie."
  ),
  q(
    "ex-q5",
    "Co pomaga najbardziej, gdy wyzwalaczem jest stres?",
    [
      "Tłumaczenie sobie długo, że „nie palę”",
      "Krótka, przygotowana wcześniej lista trzech działań",
      "Ignorowanie napięcia i zajęcie się pracą",
      "Zapalenie połowy papierosa",
    ],
    1,
    "W stresie wola rzadko wygrywa. Wygrywa przygotowany wcześniej plan: szybkie, jasne działania."
  ),
  q(
    "ex-q6",
    "Dlaczego zamiennik po papierosie nie musi być „lepszy”?",
    [
      "Bo liczy się wyłącznie zakaz palenia",
      "Bo wystarczy, że daje podobną pauzę i przerwę w rytmie dnia",
      "Bo zamienniki są nieskuteczne",
      "Bo lepszy zamiennik wymaga większego wysiłku",
    ],
    1,
    "Zamiennik ma wypełnić pauzę, którą dawał papieros. Ma dawać podobny rytm, nie być idealny."
  ),
  q(
    "ex-q7",
    "Po co planować nagrodę w nowym nawyku?",
    [
      "Bo to, co nagradzane, ma większą szansę się powtarzać",
      "Bo nagroda zastępuje potrzebę planu",
      "Bo bez nagrody nie wolno zaczynać",
      "Bo nagroda działa tylko finansowo",
    ],
    0,
    "Nagroda wzmacnia powtarzanie. Planuj ją tak samo świadomie jak sam mikro-krok."
  ),
  q(
    "ex-q8",
    "Jak traktować pojedyncze potknięcie w trakcie kursu?",
    [
      "Jako dowód, że cały plan się nie udał",
      "Jako informację o wyzwalaczu, do którego trzeba wrócić tego samego dnia",
      "Jako powód, żeby zacząć od nowa za miesiąc",
      "Jako coś, o czym nie należy myśleć",
    ],
    1,
    "Potknięcie to dana o wyzwalaczu, nie wyrok. Najważniejszy jest powrót do planu tego samego dnia."
  ),
  q(
    "ex-q9",
    "Dlaczego warto zmieniać otoczenie, a nie tylko walczyć siłą woli?",
    [
      "Bo siła woli nie istnieje",
      "Bo łatwiej zmienić otoczenie niż codziennie opierać się wyzwalaczom",
      "Bo otoczenie nie ma znaczenia dla nawyku",
      "Bo wtedy nie trzeba planu na kryzys",
    ],
    1,
    "Otoczenie dostarcza wyzwalaczy. Zmieniając je, zmniejszasz liczbę okazji do automatyzmu."
  ),
  q(
    "ex-q10",
    "Co w tym kursie decyduje o utrzymaniu zmiany na dłużej?",
    [
      "Jeden silny zryw na starcie",
      "Powtarzalność małych kroków i szybki powrót po potknięciu",
      "Unikanie wszystkich ludzi, którzy palą",
      "Niepopełnianie żadnego błędu",
    ],
    1,
    "Trwałość buduje powtarzalność, a nie jednorazowy zryw. Ważny jest też szybki powrót po potknięciu."
  ),
];
