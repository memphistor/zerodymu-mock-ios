import { q } from '../helpers.js';

export default {
  id: 'm2',
  title: 'Nawyk pod lupą',
  summary: 'Jak działa pętla nawyku i jak zmienić jej ogniwa bez walki na siłę.',
  goals: [
    'Rozpoznasz bodziec, rutynę i nagrodę w swoim paleniu.',
    'Ułożysz plany „jeśli–to” na swoje wyzwalacze.',
    'Dobierzesz zamienniki, które trafiają w tę samą potrzebę.',
  ],
  lessons: [
    {
      id: 'm2-l1',
      title: 'Pętla nawyku: bodziec, rutyna, nagroda',
      minutes: 5,
      pill: 'Nawyk to pętla. Nie musisz jej łamać — wystarczy zmienić jedno ogniwo.',
      sections: [
        {
          title: 'Trzy ogniwa',
          body: [
            'Nawyk składa się z trzech ogniw:',
            { ul: [
              '**Bodziec** — coś, co uruchamia chęć (kawa, stres, koniec posiłku).',
              '**Rutyna** — to, co robisz (zapalasz papierosa).',
              '**Nagroda** — to, co dostajesz: ulgę, przerwę, odprężenie, a przy nikotynie także złagodzenie głodu.',
            ] },
          ],
        },
        {
          title: 'Nikotyna wzmacnia pętlę',
          body: [
            'Nikotyna dociera do mózgu bardzo szybko po zaciągnięciu się i wzmacnia powtarzanie zachowania. Z czasem sama sytuacja, np. poranna kawa, wywołuje chęć, zanim poczujesz fizyczny głód.',
            { note: 'Po rzuceniu przez jakiś czas możesz czuć ciąg w „starych” miejscach i porach. To normalne i z czasem słabnie.' },
          ],
        },
        {
          title: 'Które ogniwo zmienić',
          body: [
            'Nie musisz „złamać” całej pętli. Wystarczy zmienić jedno ogniwo. Najłatwiej zwykle zmienić **rutynę**, zachowując **nagrodę**: jeśli papieros daje Ci przerwę i oddech, daj sobie przerwę i oddech w inny sposób.',
            { try: 'Wybierz jeden papieros z notatek i zapisz jego bodziec, rutynę i nagrodę.' },
          ],
        },
      ],
      quiz: [
        q('Z jakich ogniw składa się pętla nawyku?',
          ['Plan, wysiłek, efekt', 'Czas, miejsce, osoba', 'Bodziec, rutyna, nagroda', 'Cel, pokusa, kara'],
          2, 'Bodziec uruchamia, rutyna to działanie, nagroda je utrwala. Zmiana jednego ogniwa zmienia całą pętlę.'),
        q('Które ogniwo zwykle najłatwiej zmienić?',
          ['Rutynę, zachowując nagrodę', 'Bodziec, całkowicie usuwając go z życia', 'Nagrodę, rezygnując z jakiejkolwiek ulgi', 'Żadne — nawyków nie da się zmienić'],
          0, 'Jeśli potrzeba (przerwa, ulga) zostaje zaspokojona, łatwiej zmienić samo działanie.'),
        q('Dlaczego po rzuceniu ciąg w „starych” miejscach bywa silny?',
          ['Bo to znak, że rzucanie się nie uda', 'Bo organizm nie poradzi sobie bez nikotyny', 'Bo to wina słabej woli', 'Bo sytuacje kojarzone z paleniem same wywołują chęć — z czasem słabnie'],
          3, 'Skojarzenia z miejscem i porą są silne, ale gasną, gdy nie są wzmacniane.'),
      ],
    },
    {
      id: 'm2-l2',
      title: 'Wyzwalacze i plan „jeśli–to”',
      minutes: 5,
      pill: 'Zdecyduj wcześniej: „jeśli pojawi się wyzwalacz, to zrobię mały krok”.',
      sections: [
        {
          title: 'Typowe wyzwalacze',
          body: [
            { ul: [
              'kawa lub herbata,',
              'alkohol,',
              'stres i napięcie,',
              'koniec posiłku,',
              'przerwa w pracy,',
              'towarzystwo osób palących,',
              'nuda,',
              'rozmowa telefoniczna.',
            ] },
            'Twoja lista z notatek jest ważniejsza niż ta ogólna. Wybierz z niej dwa najczęstsze wyzwalacze.',
          ],
        },
        {
          title: 'Plan „jeśli–to”',
          body: [
            'To prosty sposób, by decyzję podjąć wcześniej, a nie w chwili głodu. Formuła: **Jeśli** [wyzwalacz], **to** [mały krok]. Przykłady:',
            { ul: [
              'Jeśli po obiedzie poczuję chęć, to wypiję szklankę wody i pójdę na 5-minutowy spacer.',
              'Jeśli zadzwoni telefon, to wstanę i będę rozmawiać, chodząc po mieszkaniu.',
            ] },
            { tip: 'Badania nad tzw. intencjami wdrożeniowymi pokazują, że takie konkretne plany pomagają realizować zamiary skuteczniej niż samo postanowienie.' },
          ],
        },
        {
          title: 'Jeden plan na jeden wyzwalacz',
          body: [
            'Nie buduj dziesięciu planów naraz. Zacznij od dwóch, a gdy zaczną działać automatycznie, dodaj kolejne.',
            { try: 'Napisz dwa plany „jeśli–to” dla swoich najczęstszych wyzwalaczy.' },
          ],
        },
      ],
      quiz: [
        q('Jak brzmi formuła planu „jeśli–to”?',
          ['Jeśli się uda, to się nagrodzę', 'Jeśli [wyzwalacz], to [mały krok]', 'Jeśli zapalę, to przestanę jutro', 'Jeśli będę silny, to nie zapalę'],
          1, 'Plan łączy konkretny wyzwalacz z konkretnym, małym działaniem.'),
        q('Ile planów „jeśli–to” zacząć budować na początku?',
          ['Dziesięć naraz', 'Żadnego — to niepotrzebne', 'Jeden na każdy dzień roku', 'Dwa — dla najczęstszych wyzwalaczy'],
          3, 'Kaizen: mało, ale porządnie. Dwa plany łatwo wprowadzić i sprawdzić.'),
        q('Dlaczego plan „jeśli–to” pomaga?',
          ['Bo decyzja zapada wcześniej, a nie w chwili głodu', 'Bo usuwa nikotynę z organizmu', 'Bo zastępuje sen', 'Bo gwarantuje, że głód nie wystąpi'],
          0, 'W chwili głodu trudno myśleć. Gotowy plan oszczędza energię i zmniejsza pole do negocjacji z samym sobą.'),
      ],
    },
    {
      id: 'm2-l3',
      title: 'Zamienniki i nowe rytuały',
      minutes: 4,
      pill: 'Zamiennik działa wtedy, gdy zaspokaja tę samą potrzebę, którą zaspokajał papieros.',
      sections: [
        {
          title: 'Zaspokój tę samą potrzebę',
          body: [
            'Papieros zwykle zaspokaja kilka potrzeb naraz. Dobierz zamiennik do każdej z nich:',
            { ul: [
              '**Przerwa** → krótki spacer, rozciąganie.',
              '**Ręce** → piłeczka antystresowa, długopis, drobne zajęcie.',
              '**Usta** → woda, guma bez cukru, marchewka.',
              '**Napięcie** → kilka głębokich oddechów.',
              '**Towarzystwo** → krótka rozmowa z kimś niepalącym.',
            ] },
          ],
        },
        {
          title: 'Nowy rytuał zamiast pustego miejsca',
          body: [
            'Wolny moment po usunięciu papierosa warto wypełnić czymś konkretnym, bo pustka zaprasza stary nawyk. Np. przy porannej kawie: nowe miejsce, inny kubek i 3 minuty widoku z okna.',
            { try: 'Wybierz jeden rytuał i zaplanuj nowy sposób na jutro.' },
          ],
        },
        {
          title: 'Uwaga na zamienniki z nikotyną',
          body: [
            { note: 'Preparaty nikotynowe to osobna sprawa: są częścią metod wspierających rzucanie i warto je omówić z lekarzem lub farmaceutą. Zamiana papierosów na inny produkt z nikotyną bez planu zakończenia nie jest rzuceniem palenia.' },
          ],
        },
      ],
      quiz: [
        q('Zamiennik działa najlepiej, gdy…',
          ['Odpowiada na tę samą potrzebę, którą zaspokajał papieros', 'Jest jak najtrudniejszy', 'Jest wymyślony przez kogoś innego', 'Nie wymaga żadnej zmiany w dniu'],
          0, 'Zamiennik musi coś realnie dawać: przerwę, ruch, ulgę lub kontakt.'),
        q('Papieros dawał Ci przede wszystkim przerwę. Co może go zastąpić?',
          ['Kolejna kawa', 'Praca bez przerw', 'Krótki spacer lub rozciąganie', 'Telefon w tym samym miejscu'],
          2, 'Przerwa zostaje, zmienia się tylko jej forma. Ruch dodatkowo pomaga w napięciu.'),
        q('Zamiana papierosów na inny produkt z nikotyną bez planu zakończenia to…',
          ['Rzucenie palenia', 'Nie jest rzuceniem — wsparcie warto omówić z lekarzem lub farmaceutą', 'Zawsze najlepszy plan', 'Niezależna od nikotyny zmiana nawyku'],
          1, 'Rzucenie oznacza życie bez nikotyny. Wsparcie nikotynowe bywa pomocne, ale najlepiej z planem i ze specjalistą.'),
      ],
    },
  ],
  quiz: [
    q('Bodziec w pętli nawyku to…',
      ['Nagroda po papierosie', 'Sytuacja lub sygnał, który uruchamia chęć', 'Sam papieros', 'Decyzja o rzuceniu'],
      1, 'Bodziec to to, co uruchamia pętlę, np. kawa, stres albo koniec posiłku.'),
    q('Który plan jest poprawnym „jeśli–to”?',
      ['„Spróbuję nie palić”', '„Będę silniejszy”', '„Jeśli po obiedzie poczuję chęć, to wypiję wodę i wyjdę na 5 minut”', '„Palę mniej od jutra”'],
      2, 'Dobry plan ma konkretny wyzwalacz i konkretne działanie.'),
    q('Papieros dawał Ci ruch rąk. Co robisz?',
      ['Dam rękom zajęcie, np. piłeczka lub długopis', 'Zacznę palić częściej', 'Wykreślę wyzwalacz z notatek', 'Nie robię nic'],
      0, 'Zamiennik ma trafić w potrzebę. Rękom trzeba dać inne zajęcie.'),
    q('Ile zmian w pętli nawyku wystarczy, by ją zmienić?',
      ['Wszystkie ogniwa naraz', 'Żadnej — liczy się tylko silna wola', 'Co najmniej trzy', 'Jedna — zmiana jednego ogniwa już zmienia pętlę'],
      3, 'Wystarczy zmienić jedno ogniwo, najlepiej rutynę, przy zachowaniu nagrody.'),
    q('Od czego zacząć plany „jeśli–to”?',
      ['Od wszystkich wyzwalaczy naraz', 'Od dwóch najczęstszych wyzwalaczy z notatek', 'Od najrzadszych sytuacji', 'Od planów innych osób'],
      1, 'Najczęstsze wyzwalacze dają największy efekt w najkrótszym czasie.'),
  ],
};
