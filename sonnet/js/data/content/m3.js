import { q } from '../helpers.js';

export default {
  id: 'm3',
  title: 'Pierwsze dni bez dymu',
  summary: 'Przygotowanie do dnia zero, radzenie sobie z głodem i dobre wsparcie.',
  goals: [
    'Przygotujesz się do dnia zero krok po kroku.',
    'Zrozumiesz, że głód to fala, która mija.',
    'Dowiesz się, gdzie szukać wsparcia i jak o nie poprosić.',
  ],
  lessons: [
    {
      id: 'm3-l1',
      title: 'Dzień zero: przygotowanie',
      minutes: 5,
      pill: 'Najtrudniejsze decyzje podejmij dzień wcześniej, gdy jesteś spokojny.',
      sections: [
        {
          title: 'Dzień przed',
          body: [
            { ul: [
              'Usuń papierosy, zapalniczki i popielniczki z domu, auta i torby.',
              'Przewietrz mieszkanie i wypierz rzeczy pachnące dymem.',
              'Przygotuj wodę i przekąski (warzywa, owoce, orzechy).',
              'Zaplanuj zajęcia na najtrudniejsze pory.',
              'Powiedz bliskim, że jutro jest Twoja data zero.',
            ] },
          ],
        },
        {
          title: 'W dzień zero',
          body: [
            'Rano wróć do swojego „po co” z lekcji o Ikigai. Nie musisz niczego udowadniać całemu światu: celem jest przejście przez ten jeden dzień.',
            { tip: 'Podziel dzień na małe odcinki: do obiadu, do popołudnia, do wieczora. Po każdym zrób krótki znak „udało się”.' },
          ],
        },
        {
          title: 'Plan na trudną godzinę',
          body: [
            'Zapisz porę, która w notatkach była dla Ciebie najtrudniejsza, i przygotuj na nią plan „jeśli–to”. Możesz w tym czasie zaplanować spacer, rozmowę lub zadanie wymagające rąk.',
            { try: 'Zapisz trzy rzeczy, które usuniesz dzień przed datą zero.' },
          ],
        },
      ],
      quiz: [
        q('Co warto zrobić dzień przed datą zero?',
          ['Kupić zapas na wszelki wypadek', 'Zapalić ostatniego, najdłuższego', 'Nie robić nic, żeby się nie stresować', 'Usunąć papierosy i przybory oraz zaplanować trudne pory'],
          3, 'Im mniej bodźców i im więcej planu, tym mniej decyzji do podjęcia w chwili głodu.'),
        q('Jak podejść do dnia zero?',
          ['Jak do egzaminu na cały rok', 'Dzielić dzień na małe odcinki i wracać do swojego „po co”', 'Unikać wszystkich ludzi', 'Nie planować niczego'],
          1, 'Mały odcinek jest osiągalny. Powrót do „po co” pomaga, gdy robi się trudno.'),
        q('Po co przygotować plan na najtrudniejszą porę?',
          ['Żeby o niej zapomnieć', 'Żeby uniknąć snu', 'Bo decyzja podjęta wcześniej łatwiej wygrywa z głodem', 'Bo wtedy głód nie występuje'],
          2, 'Plan oszczędza energię w chwili, gdy najtrudniej myśleć.'),
      ],
    },
    {
      id: 'm3-l2',
      title: 'Głód i odstawienie: fala, która mija',
      minutes: 6,
      pill: 'Głód nikotynowy to fala. Zwykle trwa kilka minut i opada — nawet jeśli nic nie zrobisz.',
      sections: [
        {
          title: 'Co możesz poczuć',
          body: [
            'Odstawienie nikotyny może dawać drażliwość, niepokój, trudności z koncentracją, większy apetyt i kłopoty ze snem. Objawy są zwykle **najsilniejsze w pierwszych dniach** i słabną w ciągu kilku tygodni. To znak, że organizm przyzwyczaja się do życia bez nikotyny.',
            { note: 'Jeśli objawy są bardzo silne, nie ustępują albo mocno obniża się nastrój, skontaktuj się z lekarzem.' },
          ],
        },
        {
          title: 'Głód to fala',
          body: [
            'Pojedynczy napad głodu trwa zwykle **kilka minut**, a potem słabnie. Nie musisz z nim walczyć. Wystarczy go przeczekać i powiedzieć sobie: „to minie za kilka minut”.',
          ],
        },
        {
          title: 'Technika 4D',
          body: [
            'Znana pod angielskimi nazwami, łatwa do zapamiętania:',
            { ol: [
              '**Delay** — odłóż decyzję o kilka minut.',
              '**Deep breath** — kilka głębokich oddechów.',
              '**Drink water** — wypij wodę powoli.',
              '**Do something else** — zajmij ręce i głowę czymś innym.',
            ] },
            { try: 'Zapisz „4D” w telefonie i ustaw jako notatkę na ekranie blokady na pierwszy tydzień.' },
          ],
        },
      ],
      quiz: [
        q('Kiedy objawy odstawienia są zwykle najsilniejsze?',
          ['W pierwszych dniach, potem słabną w ciągu kilku tygodni', 'Dopiero po roku', 'Zawsze tak samo przez całe życie', 'Tylko w nocy'],
          0, 'Początek bywa najtrudniejszy, ale objawy stopniowo słabną.'),
        q('Jak długo trwa pojedyncza „fala” głodu?',
          ['Kilka godzin', 'Cały dzień', 'Do następnego posiłku', 'Zwykle kilka minut'],
          3, 'Głód nasila się i opada w ciągu kilku minut. Dlatego warto go przeczekać.'),
        q('Co oznacza „Delay” w technice 4D?',
          ['Zapalić dopiero po południu', 'Odłożyć decyzję o kilka minut', 'Wyjść z domu na cały dzień', 'Oddychać szybciej'],
          1, 'Odłożenie decyzji daje czas, by fala głodu opadła.'),
      ],
    },
    {
      id: 'm3-l3',
      title: 'Wsparcie: leki, poradnie, ludzie',
      minutes: 6,
      pill: 'Wsparcie zwiększa szanse. Prośba o pomoc to element planu, a nie słabość.',
      sections: [
        {
          title: 'Nie musisz robić tego sam',
          body: [
            'Rzucanie jest łatwiejsze ze wsparciem. Możesz skorzystać z lekarza rodzinnego, farmaceuty, telefonicznych poradni dla osób rzucających palenie (np. Telefonicznej Poradni Pomocy Palącym), grup wsparcia oraz bliskich, którzy wiedzą, jak Cię wspierać.',
          ],
        },
        {
          title: 'Preparaty i leki — co warto wiedzieć',
          body: [
            'Istnieją preparaty nikotynowe (plastry, gumy, pastylki, inhalatory) oraz leki dostępne na receptę. Mogą zmniejszać objawy odstawienia i zwiększać szansę powodzenia. Dobór, dawkowanie i przeciwwskazania (np. ciąża, choroby serca) ustala się ze specjalistą.',
            { note: 'To materiał edukacyjny i nie zastępuje porady lekarza lub farmaceuty.' },
          ],
        },
        {
          title: 'Jak poprosić o pomoc',
          body: [
            'Konkretna prośba działa lepiej niż ogólne „wesprzyj mnie”. Przykłady:',
            { ul: [
              '„Rzucam palenie od [data]. Czy możesz zapytać mnie wieczorem, jak poszło?”',
              '„Proszę, nie proponuj mi papierosa i nie pal przy mnie przez pierwszy tydzień.”',
              '„Chcę porozmawiać z lekarzem o wsparciu. Czy możesz przypomnieć mi o wizycie?”',
            ] },
            { try: 'Napisz do jednej osoby jedną konkretną prośbę o wsparcie.' },
          ],
        },
      ],
      quiz: [
        q('Z kim warto porozmawiać o wsparciu w rzucaniu?',
          ['Tylko z samym sobą', 'Z nikim — to wstyd', 'Z lekarzem, farmaceutą, poradnią lub bliskimi', 'Wyłącznie z osobami, które same palą'],
          2, 'Specjaliści i bliscy mogą realnie pomóc. Wsparcie to element skutecznego planu.'),
        q('Kto ustala dobór i dawkowanie preparatów lub leków wspierających?',
          ['Lekarz lub farmaceuta razem z Tobą', 'Przypadkowa osoba w internecie', 'Nikt — wszystkie są jednakowe', 'Sprzedawca w sklepie ogólnym'],
          0, 'Dobór zależy od zdrowia, ciąży, chorób przewlekłych i innych leków, więc potrzebna jest rozmowa ze specjalistą.'),
        q('Która prośba o wsparcie jest najbardziej konkretna?',
          ['„Wesprzyj mnie jakoś”', '„Nie pytaj o nic”', '„Zrób coś”', '„Zapytaj mnie wieczorem, jak mi poszło”'],
          3, 'Konkretna prośba mówi, co dokładnie ma zrobić druga osoba, więc łatwiej ją spełnić.'),
      ],
    },
  ],
  quiz: [
    q('Co należy do dobrego przygotowania do dnia zero?',
      ['Zostawić zapasowe papierosy', 'Wyjechać bez planu', 'Usunąć papierosy i przybory oraz zaplanować trudne pory', 'Zapalić wszystkie dzień wcześniej'],
      2, 'Mniej bodźców i gotowy plan oznaczają mniej decyzji w chwili głodu.'),
    q('Napad głodu nikotynowego zwykle…',
      ['Trwa kilka minut i słabnie', 'Trwa kilka dni bez przerwy', 'Nasila się, jeśli mu nie ulegniesz', 'Oznacza porażkę'],
      0, 'Fala głodu opada w ciągu kilku minut, bez względu na to, czy ulegniesz.'),
    q('Co oznacza „Drink water” w 4D?',
      ['Pić wyłącznie kawę', 'Wypić wodę powoli — zajmuje usta i ręce', 'Pić alkohol, by się uspokoić', 'Nie pić nic'],
      1, 'Woda zajmuje usta i ręce, a czas picia pomaga przeczekać falę.'),
    q('Kiedy warto skontaktować się z lekarzem w trakcie odstawienia?',
      ['Nigdy', 'Tylko po kilku miesiącach', 'Gdy minie pierwszy dzień', 'Gdy objawy są bardzo silne, nie ustępują lub mocno spada nastrój'],
      3, 'Jeśli coś Cię niepokoi, warto zapytać specjalistę. Nie trzeba czekać.'),
    q('Dlaczego warto prosić o wsparcie konkretnie?',
      ['Bo ludzie nie lubią pomagać', 'Bo to oszczędza czas lekarzowi', 'Bo bliscy wiedzą wtedy, co dokładnie mogą zrobić', 'Bo to zastępuje plan'],
      2, 'Konkretna prośba jest łatwiejsza do spełnienia niż ogólne „pomóż mi”.'),
  ],
};
