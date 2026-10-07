import { q } from '../helpers.js';

export default {
  id: 'm5',
  title: 'Potknięcie to dane, nie porażka',
  summary: 'Co robić po wpadce, jak uczyć się metodą Kaizen i które mity warto odrzucić.',
  goals: [
    'Odróżnisz potknięcie od powrotu do palenia.',
    'Zrobisz mini-retrospektywę metodą PDCA.',
    'Rozpoznasz najczęstsze mity o rzucaniu.',
  ],
  lessons: [
    {
      id: 'm5-l1',
      title: 'Potknięcie czy powrót?',
      minutes: 5,
      pill: 'Jedno potknięcie to nie koniec drogi. Ważne, co zrobisz w następnej godzinie.',
      sections: [
        {
          title: 'Dwa różne zdarzenia',
          body: [
            '**Potknięcie** (ang. lapse) to jeden lub kilka papierosów. **Powrót** (ang. relapse) to powrót do regularnego palenia. Potknięcie nie musi prowadzić do powrotu.',
          ],
        },
        {
          title: 'Pułapka „a niech to”',
          body: [
            'Po potknięciu często pojawia się myśl: „skoro już zapaliłem, to wszystko stracone”. To myśl, nie fakt. Wiele osób przechodzi przez potknięcia w drodze do trwałego rzucenia.',
            { note: 'Wstyd jest zrozumiały, ale nie pomaga. Najbardziej pomaga ciekawość: co się stało i co mogę zmienić.' },
          ],
        },
        {
          title: 'Pierwsza godzina po potknięciu',
          body: [
            { ol: [
              '**Zatrzymaj się** — nie zapalaj kolejnego.',
              '**Zapisz** — co się stało i w jakiej sytuacji.',
              '**Wróć do planu** — wybierz krok, który zadziała dziś.',
              '**Powiedz komuś** — jedno zdanie do osoby, która Cię wspiera.',
            ] },
            { try: 'Zapisz teraz krótki plan „na wypadek potknięcia”. Oby nie był potrzebny, ale jeśli się zdarzy, uratuje dzień.' },
          ],
        },
      ],
      quiz: [
        q('Czym różni się potknięcie od powrotu?',
          ['To to samo', 'Potknięcie jest zawsze gorsze', 'Potknięcie to jeden lub kilka papierosów, powrót to regularne palenie', 'Powrót trwa dzień'],
          2, 'Potknięcie to krótkie zdarzenie, powrót to powrót do nawyku. Pierwsze nie musi prowadzić do drugiego.'),
        q('Myśl „skoro zapaliłem jednego, wszystko stracone” to…',
          ['Fakt', 'Pewne przewidywanie', 'Wiedza medyczna', 'Myśl, którą można zakwestionować — to nie fakt'],
          3, 'To popularne zniekształcenie. Pomaga zamienić je na: „Zapaliłem, więc wracam do planu”.'),
        q('Pierwszy krok po potknięciu to…',
          ['Zapalić resztę paczki', 'Zatrzymać się i nie zapalać kolejnego', 'Ukryć to przed wszystkimi', 'Zrezygnować z planu'],
          1, 'Zatrzymanie się po pierwszym papierosie zwykle decyduje o tym, czy potknięcie pozostanie potknięciem.'),
      ],
    },
    {
      id: 'm5-l2',
      title: 'Kaizen po potknięciu: mini-retrospektywa',
      minutes: 5,
      pill: 'Po potknięciu zadaj cztery pytania i zmień jedną rzecz. To całe Kaizen.',
      sections: [
        {
          title: 'Cykl PDCA',
          body: [
            'W Kaizen często używa się cyklu **PDCA**: Plan, Do, Check, Act, czyli **zaplanuj, zrób, sprawdź, popraw**. To pętla uczenia się: po każdym potknięciu sprawdzasz, co poszło inaczej niż plan, i poprawiasz jedną rzecz.',
          ],
        },
        {
          title: 'Cztery pytania retrospektywy',
          body: [
            { ol: [
              'Co się stało?',
              'Co było wyzwalaczem?',
              'Co zadziałało, choćby trochę?',
              'Jedną rzecz, którą zmienię, to…',
            ] },
          ],
        },
        {
          title: 'Jedna zmiana naraz',
          body: [
            'Wybierz jedną zmianę: nowy plan „jeśli–to”, usunięcie bodźca albo prośbę o wsparcie. Nie przebudowuj całego planu po jednym potknięciu.',
            { try: 'Odpowiedz w kilku zdaniach na cztery pytania retrospektywy po najbliższym trudnym dniu.' },
          ],
        },
      ],
      quiz: [
        q('Co oznacza PDCA?',
          ['Plan–Do–Check–Act: zaplanuj, zrób, sprawdź, popraw', 'Przerwa–Dym–Cisza–Akcja', 'Pomysł–Dawka–Cel–Ambicja', 'Postanowienie–Dyscyplina–Czas–Aprobata'],
          0, 'PDCA to cykl uczenia się: planujesz, działasz, sprawdzasz efekty i poprawiasz.'),
        q('Które pytanie należy do retrospektywy?',
          ['Kto jest winny?', 'Dlaczego jestem słaby?', 'Co było wyzwalaczem i co mogę zmienić?', 'Czy to w ogóle ma sens?'],
          2, 'Retrospektywa pyta o proces: co, kiedy i jak poprawić. Ocena człowieka niczego nie zmienia.'),
        q('Ile zmian wprowadzasz po jednym potknięciu?',
          ['Wszystkie naraz', 'Żadnej', 'Pięć', 'Jedną, konkretną'],
          3, 'Jedna zmiana jest łatwa do sprawdzenia. Wiele zmian naraz przytłacza i zaciera efekt.'),
      ],
    },
    {
      id: 'm5-l3',
      title: 'Mity: „jeden nie zaszkodzi”',
      minutes: 4,
      pill: 'Trzy mity, które najczęściej prowadzą z powrotem do palenia, i krótkie odpowiedzi na nie.',
      sections: [
        {
          title: 'Mit 1: „jeden nie zaszkodzi”',
          body: [
            'Dla osoby uzależnionej jeden papieros często uruchamia powrót do regularnego palenia. Nie znaczy to, że po jednym wszystko przepadło, ale lepiej nie zakładać, że „jeden” jest bezpieczny.',
          ],
        },
        {
          title: 'Mit 2: „po latach palenia jest za późno”',
          body: [
            'Rzucenie przynosi korzyści zdrowotne w każdym wieku, także po wielu latach palenia.',
          ],
        },
        {
          title: 'Mit 3: „wystarczy silna wola”',
          body: [
            'Silna wola pomaga, ale najlepiej działa razem z planem, zmianą otoczenia i wsparciem. Prośba o pomoc nie oznacza słabości, tylko korzystanie z dostępnych narzędzi.',
            { try: 'Zapisz jeden mit, w który sam wierzysz, i jedno zdanie, które mu przeciwstawisz.' },
          ],
        },
      ],
      quiz: [
        q('Dlaczego „jeden papieros” bywa ryzykowny?',
          ['Bo nigdy nic nie zmienia', 'U osoby uzależnionej często uruchamia powrót do regularnego palenia', 'Bo jest droższy', 'Bo smakuje gorzej'],
          1, 'Jeden papieros łatwo uruchamia dawny nawyk i silne skojarzenia.'),
        q('Czy po latach palenia rzucanie ma sens?',
          ['Tak — korzyści zdrowotne pojawiają się w każdym wieku', 'Nie — jest za późno', 'Tylko przed 30. rokiem życia', 'Tylko przy lekach'],
          0, 'Rzucenie przynosi korzyści niezależnie od wieku i stażu palenia.'),
        q('Silna wola najlepiej działa…',
          ['Sama, bez planu', 'Wyłącznie w nocy', 'Razem z planem, zmianą otoczenia i wsparciem', 'Gdy nikt o niczym nie wie'],
          2, 'Silna wola szybko się wyczerpuje, więc potrzebuje oparcia w planie i ludziach.'),
      ],
    },
  ],
  quiz: [
    q('Potknięcie to…',
      ['Krótki powrót do papierosa, który nie musi oznaczać powrotu do nałogu', 'Pewny dowód, że się nie da', 'Koniec drogi', 'Znak, że potrzebna jest większa kara'],
      0, 'Potknięcie jest informacją, nie wyrokiem. To, co robisz dalej, ma największe znaczenie.'),
    q('Co robisz w pierwszej godzinie po potknięciu?',
      ['Kupuję nową paczkę', 'Oceniam siebie', 'Przekreślam plan', 'Zatrzymuję się, zapisuję i wracam do planu'],
      3, 'Zatrzymanie, zapis i powrót do planu zwykle zapobiegają powrotowi do regularnego palenia.'),
    q('Co wybierzesz po potknięciu?',
      ['Cały plan od zera', 'Rezygnację z kroku', 'Jedną konkretną zmianę, np. nowy plan „jeśli–to”', 'Brak zmian'],
      2, 'Kaizen to jedna mała poprawka na raz, a nie przebudowa wszystkiego.'),
    q('Mit „po latach palenia jest za późno na rzucanie” jest…',
      ['Nieprawdziwy — korzyści zdrowotne są w każdym wieku', 'Prawdziwy', 'Prawdziwy tylko dla osób starszych', 'Zależny od marki papierosów'],
      0, 'Korzyści zdrowotne z rzucenia pojawiają się w każdym wieku i po wielu latach palenia.'),
    q('Cykl PDCA służy do…',
      ['Liczenia papierosów', 'Uczenia się z doświadczeń i poprawiania planu', 'Leczenia uzależnienia', 'Mierzenia głodu'],
      1, 'PDCA to sposób na systematyczne uczenie się: zaplanuj, zrób, sprawdź, popraw.'),
  ],
};
