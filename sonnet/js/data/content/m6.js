import { q } from '../helpers.js';

export default {
  id: 'm6',
  title: 'Życie bez dymu na dłużej',
  summary: 'Ikigai po rzuceniu, rytuały utrzymania i wiedza, kiedy sięgnąć po pomoc.',
  goals: [
    'Zamienisz odzyskany czas i pieniądze na coś, co ma dla Ciebie sens.',
    'Zbudujesz proste rytuały utrzymania.',
    'Będziesz wiedzieć, kiedy i gdzie szukać pomocy.',
  ],
  lessons: [
    {
      id: 'm6-l1',
      title: 'Ikigai po rzuceniu: co z odzyskanym czasem',
      minutes: 5,
      pill: 'Nowe życie potrzebuje treści. Wróć do swojego „po co” i wybierz jedną małą aktywność.',
      sections: [
        {
          title: 'Odzyskany czas i pieniądze',
          body: [
            'Palenie zajmuje dziennie więcej czasu, niż się wydaje: przerwy, wyjścia, szukanie miejsca. Policz swoje: ile papierosów dziennie, ile minut każdy, ile kosztuje paczka. Te liczby są Twoje i zwykle zaskakują.',
            { try: 'Policz, ile czasu i pieniędzy miesięcznie wychodziło na palenie. Zapisz jedną rzecz, na którą je przeznaczysz.' },
          ],
        },
        {
          title: 'Nowa tożsamość',
          body: [
            'Z czasem zmienia się język: od „próbuję nie palić” do „jestem osobą niepalącą”. Pomaga w tym zauważanie dobrych chwil: pierwszy spokojny poranek bez papierosa, pierwszy dłuższy spacer, pierwszy wieczór bez zapachu dymu.',
          ],
        },
        {
          title: 'Wróć do Ikigai',
          body: [
            'Wróć do czterech pytań z Modułu 1. Zadaj je teraz, gdy masz więcej energii i czasu. Wybierz jedną małą aktywność, która pasuje do Twojego „po co”, i zaplanuj ją na ten tydzień.',
          ],
        },
      ],
      quiz: [
        q('Co warto policzyć na początku życia bez dymu?',
          ['Liczbę znajomych palących', 'Liczbę kaw dziennie', 'Liczbę kroków', 'Czas i pieniądze, które wcześniej szły na palenie'],
          3, 'Konkretne liczby pokazują, ile zyskujesz. To dobry punkt wyjścia do planowania nowych zajęć.'),
        q('Jaka zmiana języka wzmacnia nową tożsamość?',
          ['Od „próbuję nie palić” do „jestem osobą niepalącą”', 'Od „nie palę” do „palę po kryjomu”', 'Od „rzucam” do „może”', 'Od „dumny” do „znudzony”'],
          0, 'Język kształtuje tożsamość. „Jestem osobą niepalącą” opisuje to, kim jesteś, a nie to, z czym walczysz.'),
        q('Jak wrócić do Ikigai po rzuceniu?',
          ['Zapomnieć o nim', 'Zadać cztery pytania ponownie i zaplanować jedną małą aktywność', 'Zrezygnować z planów', 'Poczekać na idealny moment'],
          1, 'Ikigai to praktyka. Cztery pytania i jedna mała aktywność to Kaizen w wersji sensu.'),
      ],
    },
    {
      id: 'm6-l2',
      title: 'Rytuały utrzymania',
      minutes: 4,
      pill: 'Dziesięć minut tygodniowo i kilka małych świętowań wystarczy, by utrzymać kierunek.',
      sections: [
        {
          title: 'Tygodniowy przegląd (10 minut)',
          body: [
            'Raz w tygodniu usiądź na 10 minut: Co poszło dobrze? Gdzie było trudno? Jaka jedna rzecz będzie inna w przyszłym tygodniu? To Kaizen w wersji na długo.',
          ],
        },
        {
          title: 'Kamienie milowe',
          body: [
            'Świętuj konkretne punkty: tydzień, miesiąc, trzy miesiące. Nagroda może być mała i niezwiązana z jedzeniem lub alkoholem: wyjście, książka albo rzecz, na którą odkładasz pieniądze z paczek.',
          ],
        },
        {
          title: 'Sytuacje podwyższonego ryzyka',
          body: [
            'Urlop, wesele, stresujące wydarzenia, utrata pracy, kłótnia — to częste momenty, gdy wraca ochota. Zaplanuj je jak dzień zero: plan „jeśli–to”, wsparcie, zajęcie dla rąk.',
            { try: 'Wpisz do kalendarza cotygodniowy przegląd i jeden najbliższy kamień milowy.' },
          ],
        },
      ],
      quiz: [
        q('Ile trwa tygodniowy przegląd?',
          ['Cały dzień', 'Godzinę', 'Około 10 minut', 'Nie ma takiej potrzeby'],
          2, 'Krótki przegląd łatwo wykonać regularnie, a regularność jest ważniejsza niż długość.'),
        q('Jaka nagroda za kamień milowy jest dobrym pomysłem?',
          ['Papieros na uczczenie', 'Mała, konkretna nagroda niezwiązana z paleniem', 'Brak nagród', 'Duży alkohol'],
          1, 'Nagroda utrwala poczucie postępu, a niezwiązana z paleniem nie podważa celu.'),
        q('Jak przygotować się do sytuacji wysokiego ryzyka, np. wesela?',
          ['Zaplanować „jeśli–to”, wsparcie i zajęcie dla rąk', 'Nie planować niczego', 'Unikać życia towarzyskiego na zawsze', 'Palić tylko tam'],
          0, 'Plan i wsparcie przed wydarzeniem znacząco zmniejszają ryzyko potknięcia.'),
      ],
    },
    {
      id: 'm6-l3',
      title: 'Kiedy i gdzie szukać pomocy',
      minutes: 4,
      pill: 'Prośba o pomoc to kolejny mały krok, a nie przyznanie się do porażki.',
      sections: [
        {
          title: 'Sygnały, że warto poprosić o pomoc',
          body: [
            { ul: [
              'długo utrzymujący się spadek nastroju,',
              'nawracające potknięcia mimo planów,',
              'objawy zdrowotne, które Cię niepokoją,',
              'poczucie, że sam sobie nie radzisz.',
            ] },
          ],
        },
        {
          title: 'Gdzie szukać wsparcia',
          body: [
            'Lekarz rodzinny, farmaceuta, poradnie dla osób rzucających palenie (telefoniczne i stacjonarne), grupy wsparcia. Wizyta nie jest oznaką słabości, tylko kolejnym narzędziem.',
            { note: 'Jeśli czujesz silne pogorszenie nastroju lub myśli o skrzywdzeniu siebie, jak najszybciej skontaktuj się z lekarzem lub służbami pomocy w swoim kraju.' },
          ],
        },
        {
          title: 'Gdy chcesz pomóc innym',
          body: [
            'Nie moralizuj, nie strasz. Zapytaj: „Jak mogę Cię wspierać?” i szanuj tempo drugiej osoby. Jeśli ktoś o to poprosi, podziel się tym, co zadziałało u Ciebie.',
            { try: 'Zapisz jedno miejsce lub osobę, do której zwrócisz się, gdy będzie trudniej.' },
          ],
        },
      ],
      quiz: [
        q('Który sygnał sugeruje, że warto poprosić o pomoc?',
          ['Dobry nastrój', 'Długo utrzymujący się spadek nastroju lub nawracające potknięcia', 'Poranna kawa', 'Dobry sen'],
          1, 'Długotrwałe pogorszenie nastroju i powtarzające się potknięcia to sygnał, by poszukać wsparcia.'),
        q('Wizyta u lekarza lub w poradni to…',
          ['Oznaka słabości', 'Obowiązek', 'Strata czasu', 'Kolejne narzędzie, z którego warto skorzystać'],
          3, 'Specjalista może dobrać wsparcie, którego sam nie zaplanujesz. To rozsądny krok, a nie słabość.'),
        q('Jak wspierać osobę, która rzuca palenie?',
          ['Moralizować', 'Straszyć konsekwencjami', 'Zapytać, jak może pomóc, i szanować jej tempo', 'Obserwować i kontrolować'],
          2, 'Pytanie o potrzeby i szacunek dla tempa wspierają skuteczniej niż presja.'),
      ],
    },
  ],
  quiz: [
    q('Jaki jest dobry pierwszy krok w rytuałach utrzymania?',
      ['Nie mieć żadnych rytuałów', 'Krótki przegląd tygodnia — około 10 minut', 'Codzienny, godzinny dziennik', 'Raz w roku wielki plan'],
      1, 'Krótki, regularny przegląd jest łatwy do utrzymania i daje poczucie kierunku.'),
    q('Jak działa nagroda za kamień milowy?',
      ['Utrwala poczucie postępu, gdy nie wiąże się z paleniem', 'Zastępuje plan', 'Zawsze musi być droga', 'Jest zbędna'],
      0, 'Nagroda wzmacnia zachowanie. Ważne, żeby była dla Ciebie przyjemna i niezwiązana z paleniem.'),
    q('Co wzmacnia tożsamość osoby niepalącej?',
      ['Ukrywanie rzucenia', 'Zmiana tematu', 'Przemilczanie', 'Zmiana języka na „jestem osobą niepalącą”'],
      3, 'To, jak o sobie mówisz, kształtuje to, jak się zachowujesz.'),
    q('Gdzie szukać wsparcia, gdy jest trudniej?',
      ['Nigdzie', 'Wyłącznie w internecie', 'U lekarza, farmaceuty, w poradni lub u bliskich', 'Wyłącznie w sklepie'],
      2, 'Wsparcie ludzi i specjalistów jest zwykle skuteczniejsze niż radzenie sobie w pojedynkę.'),
    q('Co jest sednem Kaizen w utrzymaniu życia bez palenia?',
      ['Jednorazowy wysiłek', 'Perfekcja bez potknięć', 'Duże zmiany raz na rok', 'Małe, regularne kroki i poprawianie planu na podstawie doświadczeń'],
      3, 'Utrzymanie to proces: małe kroki i regularne poprawki.'),
  ],
};
