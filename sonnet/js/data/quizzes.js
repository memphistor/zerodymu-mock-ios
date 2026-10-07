/** Pytania: lekcja = 3, moduł = 5, egzamin = 10. Odpowiedź: indeks 0–3 (A–D). */

export const QUIZZES = {
  "m1-l1-q": {
    title: "Quiz lekcyjny — Dlaczego małe kroki",
    type: "lesson",
    questions: [
      {
        prompt: "Co najlepiej opisuje podejście Kaizen w kontekście rzucania palenia?",
        choices: ["Jedna wielka decyzja od jutra", "Stałe, małe usprawnienia zamiast perfekcji", "Całkowita izolacja od bodźców", "Porównywanie się z innymi palaczami"],
        correct: 1,
        explain: "Kaizen to ciągłe, małe kroki. Mózg łatwiej je akceptuje niż skok „od jutra zero”.",
      },
      {
        prompt: "Ikigai w tym kursie traktujemy jako:",
        choices: ["Technikę oddechową", "Powód, dla którego warto dbać o zdrowie", "Rodzaj papierosów", "Test krwi"],
        correct: 1,
        explain: "Ikigai to „powód bycia” — kotwica sensu, która wspiera zmianę nawyku.",
      },
      {
        prompt: "Pierwszy sensowny krok po przeczytaniu lekcji to zwykle:",
        choices: ["Wyrzucenie wszystkiego bez planu", "Jeden konkretny mikrokrok na dziś", "Ukrycie tematu przed bliskimi", "Czekanie na idealny humor"],
        correct: 1,
        explain: "Mikrokrok musi być mały i wykonalny — to buduje zaufanie do siebie.",
      },
    ],
  },
  "m1-l2-q": {
    title: "Quiz — Mapa nawyku",
    type: "lesson",
    questions: [
      {
        prompt: "W pętli nawyku „sygnał” to:",
        choices: ["Nagroda emocjonalna", "Wyzwalacz sytuacji lub myśli", "Tylko głód", "Wyłącznie stres w pracy"],
        correct: 1,
        explain: "Sygnał uruchamia schemat — często ta sama godzina, kawa lub nuda.",
      },
      {
        prompt: "Mały krok przy mapowaniu nawyku to np.:",
        choices: ["Zastąpienie jednego momentu alternatywą 2 min", "Rzucenie wszystkiego w jeden dzień", "Ignorowanie emocji", "Palenie „tylko od świąt” bez planu"],
        correct: 0,
        explain: "Zamieniasz jeden element pętli, nie całe życie naraz.",
      },
      {
        prompt: "Po co zapisujesz mapę nawyku?",
        choices: ["Żeby oceniać się surowo", "Żeby zobaczyć wzorzec i wybrać punkt zmiany", "Żeby mieć wymówkę", "Nie ma sensu"],
        correct: 1,
        explain: "Świadomość wzorca daje wybór — bez moralizowania.",
      },
    ],
  },
  "m1-l3-q": {
    title: "Quiz — Mikrokrok dziś",
    type: "lesson",
    questions: [
      {
        prompt: "Dobry mikrokrok jest:",
        choices: ["Niemożliwy do zmierzenia", "Tak duży, że boli", "Wykonalny w &lt; 5 minut", "Zależny od humoru innych"],
        correct: 2,
        explain: "Krótki czas obniża opór — mózg nie widzi zagrożenia.",
      },
      {
        prompt: "Jeśli mikrokrok się nie udał, Kaizen sugeruje:",
        choices: ["Porzucić cały kurs", "Zmniejszyć krok i spróbować ponownie", "Ukryć porażkę", "Zwiększyć presję"],
        correct: 1,
        explain: "Iteracja: mniejszy krok, ta sama intencja.",
      },
      {
        prompt: "Ikigai pomaga, gdy mikrokrok dotyczy:",
        choices: ["Tylko papierosów", "Powodu, dla którego chcesz oddychać lżej", "Losowych zakupów", "Konkurencji z przyjaciółmi"],
        correct: 1,
        explain: "Sens wzmacnia motywację w trudniejszy dzień.",
      },
    ],
  },
  "m1-l4-q": {
    title: "Quiz — Głos wewnętrzny",
    type: "lesson",
    questions: [
      {
        prompt: "Myśl „i tak mi nie wyjdzie” to często:",
        choices: ["Fakt medyczny", "Stary schemat, nie wyrok", "Powód do palenia więcej", "Znak, że Ikigai nie działa"],
        correct: 1,
        explain: "To głos nawyku — możesz go zauważyć bez wiary w każde słowo.",
      },
      {
        prompt: "Łagodna odpowiedź sobie to:",
        choices: ["„Jestem beznadziejny”", "„Dziś jeden mały krok, reszta jutro”", "„Nikt mi nie pomoże”", "„Muszę być idealny”"],
        correct: 1,
        explain: "Współczucie wobec siebie obniża napięcie i głód papierosa.",
      },
      {
        prompt: "Małe kroki redukują lęk, bo:",
        choices: ["Eliminują wszystkie emocje", "Dają przewidywalny sukces", "Wymagają perfekcji", "Są tajne"],
        correct: 1,
        explain: "Seria małych „tak” buduje dowody, że dasz radę.",
      },
    ],
  },
  "m1-l5-q": {
    title: "Quiz — Podsumowanie M1",
    type: "lesson",
    questions: [
      {
        prompt: "Trzy filary modułu 1 to:",
        choices: ["Presja, wina, pośpiech", "Kaizen, Ikigai, małe kroki", "Dieta, siłownia, maraton", "Tylko leki"],
        correct: 1,
        explain: "To fundament kursu — reszta modułów go rozwija.",
      },
      {
        prompt: "Quiz modułowy odblokujesz najlepiej po:",
        choices: ["Pominięciu lekcji", "Przejściu lekcji i quizów lekcyjnych", "Losowym kliknięciu", "Paleniu „ostatniego”"],
        correct: 1,
        explain: "Powtórka utrwala — nie musi być idealna.",
      },
      {
        prompt: "Bez paywalla oznacza tu:",
        choices: ["Brak treści", "Cały kurs dostępny od startu", "Tylko moduł 1", "Płatne quizy"],
        correct: 1,
        explain: "Jesteś kursantem od pierwszego wejścia.",
      },
    ],
  },
  "m1-module-q": {
    title: "Quiz modułowy — Fundament Kaizen",
    type: "module",
    questions: [
      {
        prompt: "Kaizen po japońsku odnosi się do:",
        choices: ["Jednorazowej rewolucji", "Ciągłego doskonalenia", "Porównań z innymi", "Unikania zmian"],
        correct: 1,
        explain: "Małe poprawki sumują się w dużą zmianę.",
      },
      {
        prompt: "Ikigai można traktować jako:",
        choices: ["Wyłącznie hobby", "Połączenie sensu i codziennych działań", "Mit bez zastosowania", "Zamiennik snu"],
        correct: 1,
        explain: "Sens stabilizuje nawyk w kryzysie.",
      },
      {
        prompt: "Pierwszy mikrokrok przy paleniu po kawie mógłby być:",
        choices: ["Rzucenie kawy na zawsze", "2 min spaceru zamiast balkonu", "Kupno kartonu", "Wstyd przed rodziną"],
        correct: 1,
        explain: "Zmieniasz jeden element rutyny, nie całą kawę.",
      },
      {
        prompt: "Mapa nawyku pomaga zobaczyć:",
        choices: ["Tylko winę", "Sygnał → działanie → nagrodę", "Ceny papierosów", "Prognozę pogody"],
        correct: 1,
        explain: "To klasyczna pętla nawyku.",
      },
      {
        prompt: "Wizualne locki w kroku 2 oznaczają:",
        choices: ["Paywall", "Podgląd — pełna logika w kroku 3", "Usunięcie treści", "Koniec kursu"],
        correct: 1,
        explain: "Treść jest — kolejny krok dopracuje odblokowania.",
      },
    ],
  },
  "m2-l1-q": {
    title: "Quiz — Oddech zamiast papierosa",
    type: "lesson",
    questions: [
      {
        prompt: "4-7-8 wspiera:",
        choices: ["Głód papierosa", "Aktywację układu przywspółczulnego", "Bezsenność", "Ignorowanie bodźców"],
        correct: 1,
        explain: "Wolniejszy oddech obniża alarm w ciele.",
      },
      {
        prompt: "Mikrokrok oddechowy trwa zwykle:",
        choices: ["Godzinę", "Kilka cykli oddechu", "Tydzień", "Do bólu"],
        correct: 1,
        explain: "Krótko — żeby mózg się zgodził.",
      },
      {
        prompt: "Po ćwiczeniu warto:",
        choices: ["Ocenić się na 0–10", "Zanotować, czy głód lekko spadł", "Paląc „nagrodę”", "Nic"],
        correct: 1,
        explain: "Świadomość postępu wzmacnia Kaizen.",
      },
    ],
  },
  "m2-l2-q": {
    title: "Quiz — Ruch 90 sekund",
    type: "lesson",
    questions: [
      {
        prompt: "Krótki ruch działa, bo:",
        choices: ["Zastępuje terapię", "Przerywa automatyzm ręki–usta", "Wymaga sprzętu", "Jest karą"],
        correct: 1,
        explain: "Zmiana kontekstu ciała zmienia impuls.",
      },
      {
        prompt: "90 sekund to:",
        choices: ["Za długo na start", "Mikrokrok w granicach Kaizen", "Minimum tygodnia", "Tylko dla sportowców"],
        correct: 1,
        explain: "Mózg akceptuje bardzo krótkie zadania.",
      },
      {
        prompt: "Ikigai możesz połączyć z ruchem przez:",
        choices: ["Losowy bieg bez sensu", "Aktywność bliską Twoim wartościom", "Wstyd", "Porównania"],
        correct: 1,
        explain: "Sens + ruch = trwalsza alternatywa.",
      },
    ],
  },
  "m2-l3-q": {
    title: "Quiz — Ciało po głodzie",
    type: "lesson",
    questions: [
      {
        prompt: "Głód papierosa często trwa:",
        choices: ["Wiecznie bez zmian", "Kilka–kilkanaście minut falą", "Dokładnie 24 h", "Tylko w nocy"],
        correct: 1,
        explain: "Fala opada — mikrokroki pomagają ją przeżyć.",
      },
      {
        prompt: "Woda + rozciągnięcie to:",
        choices: ["Zamiennik lekarza", "Prosty pakiet regulacji", "Mit", "Powód do wstydu"],
        correct: 1,
        explain: "Ciało potrzebuje sygnału „jestem bezpieczny”.",
      },
      {
        prompt: "Po module 2 cel to:",
        choices: ["Perfekcja", "Kilka narzędzi na falę głodu", "Zero emocji", "Izolacja"],
        correct: 1,
        explain: "Toolbox, nie jedna cudowna metoda.",
      },
    ],
  },
  "m2-module-q": {
    title: "Quiz modułowy — Ciało i fala",
    type: "module",
    questions: [
      {
        prompt: "Regulacja ciała wspiera rzucanie, bo:",
        choices: ["Nikt nie czuje stresu", "Impuls ma komponent fizjologiczny", "Oddech jest modą", "Ikigai znika"],
        correct: 1,
        explain: "Praca z ciałem obniża przymus.",
      },
      {
        prompt: "Najlepszy mikrokrok fizyczny jest:",
        choices: ["Nierealny", "Taki, który zrobisz dziś", "Ukryty", "Za drogi"],
        correct: 1,
        explain: "Wykonalność &gt; heroizm.",
      },
      {
        prompt: "4-7-8 to:",
        choices: ["Wdech 4, zatrzymanie 7, wydech 8", "Liczba papierosów", "Kod paywalla", "Tylko sen"],
        correct: 0,
        explain: "Prosty rytm — możesz go skrócić na start.",
      },
      {
        prompt: "Gdy fala wraca:",
        choices: ["To porażka kursu", "To normalne — użyj narzędzia ponownie", "Trzeba rzucić Kaizen", "Ikigai jest fałszywe"],
        correct: 1,
        explain: "Powtarzalność narzędzi buduje skill.",
      },
      {
        prompt: "Moduł 2 łączy się z Ikigai przez:",
        choices: ["Karę", "Dbanie o ciało jako wartość", "Porównania", "Presję"],
        correct: 1,
        explain: "Zdrowie służy temu, co dla Ciebie ważne.",
      },
    ],
  },
  "m3-l1-q": {
    title: "Quiz — Plan na stres",
    type: "lesson",
    questions: [
      {
        prompt: "Plan „jeśli–to” brzmi np.:",
        choices: ["Jeśli pada deszcz, to palę", "Jeśli dzwoni szef, to 3 oddechy", "Jeśli jestem zmęczony, to wstyd", "Jeśli ktoś patrzy, to nic"],
        correct: 1,
        explain: "Gotowa reguła skraca decyzję w szczycie stresu.",
      },
      {
        prompt: "Mały krok w planie to:",
        choices: ["10 zasad A4", "Jedna sytuacja + jedna reakcja", "Zmiana pracy", "Milczenie"],
        correct: 1,
        explain: "Kaizen w planowaniu = jeden scenariusz.",
      },
      {
        prompt: "Ikigai w stresie przypomina:",
        choices: ["Po co wracasz do równowagi", "Że musisz być twardy", "Że palenie jest cool", "Nic"],
        correct: 0,
        explain: "Sens obniża panikę „nie dam rady”.",
      },
    ],
  },
  "m3-l2-q": {
    title: "Quiz — Wieczór i nuda",
    type: "lesson",
    questions: [
      {
        prompt: "Nuda często jest sygnałem:",
        choices: ["Braku charakteru", "Potrzeby stymulacji / przerwy", "Wyłącznie lenistwa", "Paywalla"],
        correct: 1,
        explain: "Mózg szuka „nagrody” — papieros był skrótem.",
      },
      {
        prompt: "Mikrokrok na wieczór:",
        choices: ["Serial do 4:00", "5 min aktywności z listy Ikigai", "Izolacja", "Wstyd"],
        correct: 1,
        explain: "Krótka sensowna stymulacja zastępuje dym.",
      },
      {
        prompt: "Lista „zamiast papierosa” powinna być:",
        choices: ["Długa i abstrakcyjna", "Krótka i konkretna", "Tylko dla innych", "Sekretna"],
        correct: 1,
        explain: "W kryzysie nie czytasz eseju — wybierasz punkt.",
      },
    ],
  },
  "m3-l3-q": {
    title: "Quiz — Ludzie i granice",
    type: "lesson",
    questions: [
      {
        prompt: "Granica może brzmieć:",
        choices: ["„Pal ze mną albo wypad”", "„Dziś nie palę — dzięki za zrozumienie”", "Milczenie i wstyd", "Atak"],
        correct: 1,
        explain: "Krótko, bez moralizowania innych.",
      },
      {
        prompt: "Mały krok społeczny:",
        choices: ["Ogłoszenie w radiu", "Jedna osobie: mój plan na dziś", "Ukrywanie", "Porównywanie"],
        correct: 1,
        explain: "Jedna relacja = mniejszy koszt niż „wszyscy”.",
      },
      {
        prompt: "Wsparcie bez presji to:",
        choices: ["Codzienne raporty z winą", "Prośba o konkretną pomoc", "Manipulacja", "Izolacja"],
        correct: 1,
        explain: "„Przypomnij mi o spacerze” działa lepiej niż kontrola.",
      },
    ],
  },
  "m3-module-q": {
    title: "Quiz modułowy — Trudne chwile",
    type: "module",
    questions: [
      {
        prompt: "Plan if-then redukuje:",
        choices: ["Wszystkie emocje", "Tarcie decyzyjne w szczycie", "Potrzebę snu", "Ikigai"],
        correct: 1,
        explain: "Decyzja jest już podjęta — wykonujesz.",
      },
      {
        prompt: "Nuda wieczorem to często:",
        choices: ["Brak modułu 3", "Stary sygnał nawyku", "Koniec kursu", "Błąd aplikacji"],
        correct: 1,
        explain: "Wieczorna rutyna wymaga nowej nagrody.",
      },
      {
        prompt: "Granice chronią:",
        choices: ["Tylko ego", "Twój mikrokrok i spokój", "Paywall", "Quizy"],
        correct: 1,
        explain: "Mniej tłumu = mniej impulsów.",
      },
      {
        prompt: "Kaizen w module 3 to:",
        choices: ["Jeden scenariusz na tydzień", "Wszystkie sytuacje naraz", "Zero planu", "Tylko moduł 1"],
        correct: 0,
        explain: "Dodajesz scenariusze stopniowo.",
      },
      {
        prompt: "Ikigai pomaga wybrać alternatywę, bo:",
        choices: ["Jest losowa", "Jest zgodna z wartościami", "Jest droga", "Jest zakazana"],
        correct: 1,
        explain: "Sens utrzymuje zamiennik papierosa.",
      },
    ],
  },
  "m4-l1-q": {
    title: "Quiz — Sen i regeneracja",
    type: "lesson",
    questions: [
      {
        prompt: "Sen wpływa na głód papierosa, bo:",
        choices: ["Nie wpływa", "Zmęczenie podnosi impulsywność", "Zastępuje Ikigai", "Jest paywallem"],
        correct: 1,
        explain: "Mało snu = większa pokusa skrótu.",
      },
      {
        prompt: "Mikrokrok snu:",
        choices: ["8 h natychmiast", "15 min wcześniej światła out", "Kawa o 23:00", "Telefon w łóżku"],
        correct: 1,
        explain: "Jeden element rutyny snu.",
      },
      {
        prompt: "Regeneracja wspiera Kaizen przez:",
        choices: ["Więcej presji", "Więcej zasobów na małe kroki", "Wstyd", "Porównania"],
        correct: 1,
        explain: "Wypoczęty mózg lepiej wybiera.",
      },
    ],
  },
  "m4-l2-q": {
    title: "Quiz — Odżywianie a energia",
    type: "lesson",
    questions: [
      {
        prompt: "Głód fizyczny może:",
        choices: ["Nie mieć znaczenia", "Naśladować głód papierosa", "Zastąpić lekarza", "Usunąć quizy"],
        correct: 1,
        explain: "Czasem najpierw jedzenie, potem decyzja.",
      },
      {
        prompt: "Mikrokrok żywieniowy:",
        choices: ["Dieta cud", "Jeden stabilny posiłek dziś", "Głodówka bez planu", "Słodycze jako kara"],
        correct: 1,
        explain: "Stabilna energia = mniej fal impulsu.",
      },
      {
        prompt: "Ikigai i jedzenie:",
        choices: ["Jedzenie bez sensu", "Posiłek jako dbanie o to, co ważne", "Tylko suplementy", "Wstyd"],
        correct: 1,
        explain: "„Karmię siebie, żeby…”— Twoje dlaczego.",
      },
    ],
  },
  "m4-l3-q": {
    title: "Quiz — Monitoring bez obsesji",
    type: "lesson",
    questions: [
      {
        prompt: "Dobry monitoring to:",
        choices: ["Co godzinę panika", "Jedna notatka wieczorem", "Ukrywanie danych", "Porównania w social media"],
        correct: 1,
        explain: "Kaizen: lekki ślad, nie katorga.",
      },
      {
        prompt: "Metryka „dziś bez papierosa X min” służy:",
        choices: ["Wstydowi", "Widzeniu postępu", "Paywallu", "Konkurencji"],
        correct: 1,
        explain: "Liczby mogą motywować łagodnie.",
      },
      {
        prompt: "Po slipie monitoring mówi:",
        choices: ["Koniec", "Co było sygnałem — jeden wniosek", "Ukryj wszystko", "Zwiększ palenie"],
        correct: 1,
        explain: "Uczenie się, nie wyrok.",
      },
    ],
  },
  "m4-module-q": {
    title: "Quiz modułowy — Regeneracja",
    type: "module",
    questions: [
      {
        prompt: "Moduł 4 skupia się na:",
        choices: ["Tylko papierosach", "Sennie, energii, lekkim śledzeniu", "Paywallu", "Tylko quizach"],
        correct: 1,
        explain: "Ciało potrzebuje paliwa i odpoczynku.",
      },
      {
        prompt: "Mikrokrok senny jest ważny, bo:",
        choices: ["Sen jest modą", "Zmęczenie psuje decyzje", "Ikigai znika w nocy", "Quizy są w dzień"],
        correct: 1,
        explain: "To infrastruktura nawyku.",
      },
      {
        prompt: "Monitoring Kaizen:",
        choices: ["Codziennik 50 stron", "Jedna linijka refleksji", "Brak refleksji", "Tylko wina"],
        correct: 1,
        explain: "Mało, ale regularnie.",
      },
      {
        prompt: "Posiłek stabilizuje:",
        choices: ["Tylko wagę", "Fale głodu i nastrój", "Paywall", "Locki"],
        correct: 1,
        explain: "Cukier krwi wpływa na impuls.",
      },
      {
        prompt: "Ikigai przy regeneracji:",
        choices: ["„Odpoczywam, by móc…”", "„Muszę być maszyną”", "„Sen jest dla słabych”", "Nic"],
        correct: 0,
        explain: "Sens łączy odpoczynek z celem.",
      },
    ],
  },
  "m5-l1-q": {
    title: "Quiz — Środowisko domu",
    type: "lesson",
    questions: [
      {
        prompt: "Zmiana otoczenia to:",
        choices: ["Renowacja domu", "Usunięcie jednego wyzwalacza", "Wstyd", "Paywall"],
        correct: 1,
        explain: "Mniej sygnałów = mniej automatyzmu.",
      },
      {
        prompt: "Mikrokrok domowy:",
        choices: ["Wyrzucenie wszystkiego bez planu", "Jedna szuflada / jeden kącik", "Ukrywanie u innych", "Palenie „ostatnie”"],
        correct: 1,
        explain: "Jeden obszar na raz.",
      },
      {
        prompt: "Ikigai w domu:",
        choices: ["Kąt z wartościami zamiast balkonu", "Tylko telewizor", "Izolacja", "Wstyd"],
        correct: 0,
        explain: "Przestrzeń wspiera nowy nawyk.",
      },
    ],
  },
  "m5-l2-q": {
    title: "Quiz — Praca i przerwy",
    type: "lesson",
    questions: [
      {
        prompt: "Przerwa bez papierosa może być:",
        choices: ["5 min spaceru", "Godzina scrolla", "Wstyd w toalecie", "Nic"],
        correct: 0,
        explain: "Krótko i inaczej niż dym.",
      },
      {
        prompt: "Kolega palący to:",
        choices: ["Powód do wstydu", "Sygnał — masz plan if-then", "Koniec kursu", "Paywall"],
        correct: 1,
        explain: "Przygotowanie &gt; spontaniczna walka.",
      },
      {
        prompt: "Kaizen w pracy:",
        choices: ["Jedna przerwa inaczej", "Rewolucja biurka", "Zero przerw", "Tylko kawa"],
        correct: 0,
        explain: "Mała zmiana rutyny przerwy.",
      },
    ],
  },
  "m5-l3-q": {
    title: "Quiz — Społeczność małych kroków",
    type: "lesson",
    questions: [
      {
        prompt: "Wsparcie peer:",
        choices: ["Grupa z presją", "Jedna osoba / krótka wiadomość", "Publiczne upokorzenie", "Paywall"],
        correct: 1,
        explain: "Małe kręgi — mniej wstydu.",
      },
      {
        prompt: "Dzielenie się sukcesem:",
        choices: ["„Udało się 2 min oddechu”", "„Jestem idealny”", "Milczenie", "Atak"],
        correct: 0,
        explain: "Konkret wzmacnia nawyk.",
      },
      {
        prompt: "Ikigai w społeczności:",
        choices: ["Wspólny sens lub projekt", "Porównania", "Tylko palenie", "Locki"],
        correct: 0,
        explain: "Relacje mogą być nagrodą.",
      },
    ],
  },
  "m5-module-q": {
    title: "Quiz modułowy — Środowisko",
    type: "module",
    questions: [
      {
        prompt: "Środowisko wpływa na nawyk, bo:",
        choices: ["Nie wpływa", "Sygnały są wszędzie", "Tylko w module 1", "Paywall"],
        correct: 1,
        explain: "Design otoczenia to Kaizen.",
      },
      {
        prompt: "Przerwa w pracy to:",
        choices: ["Nowy sygnał nagrody", "Koniec Ikigai", "Tylko moduł 4", "Quiz egzaminu"],
        correct: 0,
        explain: "Zastępujesz nagrodę dymu.",
      },
      {
        prompt: "Mikrokrok społeczny:",
        choices: ["100 osób", "1 wiadomość wsparcia", "Wstyd", "Ukrywanie"],
        correct: 1,
        explain: "Kaizen w relacjach.",
      },
      {
        prompt: "Dom bez wyzwalacza:",
        choices: ["Niemożliwe", "Stopniowo, jeden element", "Natychmiast idealnie", "Tylko moduł 2"],
        correct: 1,
        explain: "Iteracja, nie perfekcja.",
      },
      {
        prompt: "Moduł 5 + Ikigai:",
        choices: ["Przestrzeń i ludzie służą sensu", "Sens znika", "Tylko papierosy", "Locki"],
        correct: 0,
        explain: "Otoczenie wspiera „dlaczego”.",
      },
    ],
  },
  "m6-l1-q": {
    title: "Quiz — Utrwalenie nawyku",
    type: "lesson",
    questions: [
      {
        prompt: "Utrwalenie to:",
        choices: ["Jednorazowy sukces", "Powtarzanie małych kroków w czasie", "Wstyd po slipie", "Paywall"],
        correct: 1,
        explain: "Kaizen w długim horyzoncie.",
      },
      {
        prompt: "Rytuał poranny może być:",
        choices: ["Godzinny", "2 min Ikigai + oddech", "Tylko papieros", "Losowy"],
        correct: 1,
        explain: "Kotwica dnia bez przeciążenia.",
      },
      {
        prompt: "Po slipie:",
        choices: ["Porzucenie sensu", "Jeden wniosek + mikrokrok jutro", "Ukrywanie", "Podwójne palenie"],
        correct: 1,
        explain: "Ikigai zostaje — plan się koryguje.",
      },
    ],
  },
  "m6-l2-q": {
    title: "Quiz — Przegląd tygodnia",
    type: "lesson",
    questions: [
      {
        prompt: "Przegląd tygodnia Kaizen:",
        choices: ["Lista win", "Co zadziałało — 3 punkty", "Porównanie z innymi", "Paywall"],
        correct: 1,
        explain: "Uczysz się z danych, nie z wstydu.",
      },
      {
        prompt: "Cel przeglądu:",
        choices: ["Perfekcja", "Jeden mikrokrok na następny tydzień", "Zero zmian", "Tylko moduł 1"],
        correct: 1,
        explain: "Jeden wniosek = wystarczy.",
      },
      {
        prompt: "Ikigai w przeglądzie:",
        choices: ["Czy żyłem zgodnie z sensem?", "Czy jestem najlepszy?", "Czy paliłem najwięcej?", "Nic"],
        correct: 0,
        explain: "Sens kieruje kolejnym krokiem.",
      },
    ],
  },
  "m6-l3-q": {
    title: "Quiz — Przed egzaminem",
    type: "lesson",
    questions: [
      {
        prompt: "Egzamin kursu ma:",
        choices: ["3 pytania", "10 pytań podsumowujących", "Paywall", "Tylko moduł 6"],
        correct: 1,
        explain: "Sprawdza całą ścieżkę Kaizen + Ikigai.",
      },
      {
        prompt: "Nie musisz mieć:",
        choices: ["Perfekcji w paleniu zero", "Życzliwości do siebie", "Planu na trudny dzień", "Sensu"],
        correct: 0,
        explain: "Kurs jest o procesie, nie o wyroku.",
      },
      {
        prompt: "Po egzaminie:",
        choices: ["Koniec wsparcia", "Kontynuacja małych kroków", "Wstyd", "Usunięcie danych"],
        correct: 1,
        explain: "Ikigai żyje po certyfikacie w aplikacji.",
      },
    ],
  },
  "m6-module-q": {
    title: "Quiz modułowy — Utrwalenie",
    type: "module",
    questions: [
      {
        prompt: "Moduł 6 łączy:",
        choices: ["Tylko quizy", "Rytuały, przegląd, przygotowanie do egzaminu", "Paywall", "Locki"],
        correct: 1,
        explain: "Domknięcie ścieżki przed egzaminem.",
      },
      {
        prompt: "Rytuał poranny Kaizen:",
        choices: ["Długi i nierealny", "Krótki i powtarzalny", "Tylko w weekend", "Z karą"],
        correct: 1,
        explain: "Małe kotwice trzymają dzień.",
      },
      {
        prompt: "Przegląd tygodnia:",
        choices: ["3 działające mikrokroki", "10 strat", "Porównania", "Milczenie"],
        correct: 0,
        explain: "Wzmacniasz to, co działa.",
      },
      {
        prompt: "Slip w module 6:",
        choices: ["Reset sensu", "Korekta planu", "Koniec Ikigai", "Usunięcie kursu"],
        correct: 1,
        explain: "Utrwalenie = wracanie, nie perfekcja.",
      },
      {
        prompt: "Egzamin jest:",
        choices: ["Dostępny w aplikacji", "Za paywallem", "Tylko na desktop", "Losowy"],
        correct: 0,
        explain: "Zakładka / link z listy kursu.",
      },
    ],
  },
  "final-exam": {
    title: "Egzamin końcowy ZeroDymu",
    type: "exam",
    questions: [
      {
        prompt: "Główna idea Kaizen w kursie:",
        choices: ["Rewolucja jednego dnia", "Małe, stałe usprawnienia", "Unikanie zmian", "Wstyd"],
        correct: 1,
        explain: "Fundament całego programu.",
      },
      {
        prompt: "Ikigai najlepiej opisać jako:",
        choices: ["Powód, dla którego warto dbać o zdrowie", "Rodzaj ćwiczenia", "Paywall", "Lock modułu"],
        correct: 0,
        explain: "Sens stabilizuje zmianę.",
      },
      {
        prompt: "Pętla nawyku zawiera:",
        choices: ["Sygnał, rutynę, nagrodę", "Tylko wolę", "Tylko geny", "Tylko moduł 5"],
        correct: 0,
        explain: "Mapa z modułu 1.",
      },
      {
        prompt: "Głód papierosa jako fala:",
        choices: ["Trwa wiecznie", "Ma szczyt i opada", "Nie dotyczy ciała", "Tylko w module 6"],
        correct: 1,
        explain: "Moduł 2 — regulacja.",
      },
      {
        prompt: "Plan if-then służy:",
        choices: ["Presji", "Gotowej reakcji w stresie", "Paywallu", "Porównaniom"],
        correct: 1,
        explain: "Moduł 3.",
      },
      {
        prompt: "Mikrokrok powinien być:",
        choices: ["Niemożliwy", "Wykonalny dziś", "Ukryty", "Za drogi"],
        correct: 1,
        explain: "Kaizen w praktyce.",
      },
      {
        prompt: "Monitoring w module 4:",
        choices: ["Obsesja", "Lekka refleksja", "Wstyd", "Brak danych"],
        correct: 1,
        explain: "Jedna linijka wieczorem.",
      },
      {
        prompt: "Środowisko (moduł 5):",
        choices: ["Nie ma znaczenia", "Kształtuje sygnały", "Zastępuje Ikigai", "Tylko praca"],
        correct: 1,
        explain: "Design otoczenia.",
      },
      {
        prompt: "Po slipie:",
        choices: ["Koniec kursu", "Wniosek + mikrokrok jutro", "Podwójna kara", "Usunięcie locków"],
        correct: 1,
        explain: "Utrwalenie — moduł 6.",
      },
      {
        prompt: "Bez paywalla w ZeroDymu:",
        choices: ["Brak egzaminu", "Pełna treść od startu", "Tylko 1 moduł", "Płatne quizy"],
        correct: 1,
        explain: "Jesteś kursantem od pierwszego dnia.",
      },
    ],
  },
};

export function getQuiz(quizId) {
  return QUIZZES[quizId] ?? null;
}
