import { q } from '../helpers.js';

export default {
  id: 'm4',
  title: 'Emocje, stres i ciało',
  summary: 'Stres, sen, apetyt, ruch i sytuacje towarzyskie — bez sięgania po papierosa.',
  goals: [
    'Poznasz kilka szybkich narzędzi na napięcie.',
    'Zadbasz o sen, jedzenie i ruch w pierwszych tygodniach.',
    'Przygotujesz się na kawę, alkohol i towarzystwo.',
  ],
  lessons: [
    {
      id: 'm4-l1',
      title: 'Stres bez papierosa',
      minutes: 5,
      pill: 'Papieros częściowo uspokaja, bo łagodzi głód, który sam wywołuje napięcie. Są inne drogi do spokoju.',
      sections: [
        {
          title: 'Co naprawdę dzieje się ze stresem',
          body: [
            'Wielu palących czuje, że papieros ich uspokaja. Częściowo to złagodzenie głodu nikotynowego, który sam wywołuje napięcie. Badania sugerują, że po rzuceniu poziom stresu i lęku w dłuższej perspektywie często spada, nawet jeśli pierwsze tygodnie bywają trudne.',
          ],
        },
        {
          title: 'Cztery szybkie narzędzia',
          body: [
            { ul: [
              '**Oddech 4–6** — wdech nosem przez 4 sekundy, wydech ustami przez 6; powtórz 5 razy.',
              '**Ruch** — 5 minut szybkiego spaceru lub schody.',
              '**Zmiana miejsca** — wyjdź do innego pomieszczenia albo na zewnątrz.',
              '**Zapisz** — jedno zdanie o tym, co czujesz.',
            ] },
          ],
        },
        {
          title: 'Mikro-przerwa zamiast papierosa',
          body: [
            'Dla wielu osób „przerwa na papierosa” to jedyna oficjalna przerwa w ciągu dnia. Zachowaj przerwę, usuń papierosa: 5 minut na zewnątrz z wodą albo krótką rozmową.',
            { try: 'Wybierz jedno narzędzie i zaplanuj, o której godzinie wypróbujesz je dziś.' },
          ],
        },
      ],
      quiz: [
        q('Dlaczego papieros może wydawać się uspokajający?',
          ['Bo nikotyna usuwa stres na stałe', 'Częściowo dlatego, że łagodzi głód nikotynowy, który sam wywołuje napięcie', 'Bo to obowiązkowy rytuał', 'Bo zastępuje sen'],
          1, 'Część „odprężenia” to ustąpienie głodu nikotynowego, a nie realne zmniejszenie stresu.'),
        q('Jak wygląda oddech 4–6?',
          ['Wdech 6 s, wydech 4 s', 'Wstrzymanie oddechu na minutę', 'Wdech nosem 4 s, wydech ustami 6 s', 'Szybkie oddechy przez 10 s'],
          2, 'Dłuższy wydech pomaga się wyciszyć. Powtórz około pięciu razy.'),
        q('Co zachować, gdy usuwasz papierosa z przerwy w pracy?',
          ['Samą przerwę', 'Wyłącznie papierosa', 'Dwa papierosy', 'Pracę bez przerw'],
          0, 'Przerwa to potrzeba, którą warto zachować. Zmienia się jedynie sposób jej spędzenia.'),
      ],
    },
    {
      id: 'm4-l2',
      title: 'Sen, jedzenie i ruch',
      minutes: 5,
      pill: 'Zadbaj o podstawy: sen, przekąski pod ręką i choćby minutę ruchu. Reszta będzie łatwiejsza.',
      sections: [
        {
          title: 'Sen',
          body: [
            'W pierwszych dniach sen może być płytszy lub trudniejszy. Pomaga stała pora kładzenia się, ograniczenie kawy po południu i wyciszenie wieczorem. Zwykle jest to przejściowe.',
          ],
        },
        {
          title: 'Apetyt i waga',
          body: [
            'Apetyt często rośnie, a niewielki przyrost masy ciała po rzuceniu zdarza się wielu osobom. To nie powód, by wracać do palenia: korzyści zdrowotne z rzucenia przewyższają skutki kilku kilogramów.',
            { tip: 'Miej pod ręką wodę, owoce, warzywa i orzechy. Łatwiej sięgnąć po nie, gdy są gotowe i widoczne.' },
          ],
        },
        {
          title: 'Ruch',
          body: [
            'Nawet krótki ruch często zmniejsza chęć zapalenia. Spacer 10 minut, kilka przysiadów, schody. Nie musisz zaczynać od treningu: Kaizen mówi, by zacząć od jednej minuty.',
            { try: 'Dziś zrób minutę ruchu w chwili, gdy zwykle sięgałbyś po papierosa.' },
          ],
        },
      ],
      quiz: [
        q('Jak postępować z gorszym snem w pierwszych dniach?',
          ['Pić więcej kawy po południu', 'Zrezygnować z rzucania', 'Ignorować sen przez tydzień', 'Trzymać stałą porę snu i ograniczyć kawę po południu'],
          3, 'Stała pora snu i mniej kofeiny po południu pomagają. Problemy ze snem zwykle mijają.'),
        q('Niewielki przyrost masy ciała po rzuceniu…',
          ['Zdarza się i nie jest powodem do powrotu do palenia', 'Oznacza, że rzucanie szkodzi', 'Zawsze jest duży', 'Nigdy nie występuje'],
          0, 'Korzyści zdrowotne z rzucenia przewyższają skutki kilku kilogramów więcej.'),
        q('Według Kaizen ruch zaczynamy od…',
          ['Godziny treningu', 'Maratonu', 'Jednej minuty lub krótkiego spaceru', 'Karnetu na cały rok'],
          2, 'Mały krok łatwo powtórzyć, a o to chodzi w Kaizen.'),
      ],
    },
    {
      id: 'm4-l3',
      title: 'Kawa, alkohol, towarzystwo',
      minutes: 5,
      pill: 'Zaplanuj sytuacje towarzyskie z wyprzedzeniem: prosta odpowiedź i wsparcie robią różnicę.',
      sections: [
        {
          title: 'Alkohol i kawa',
          body: [
            'Alkohol obniża czujność i często łączy się z paleniem, więc w pierwszych tygodniach to jedna z częstszych sytuacji powrotu. Rozważ ograniczenie alkoholu lub unikanie go na początku.',
            'Kawa: zmień rytuał. Inne miejsce, inny kubek, spacer z kawą.',
          ],
        },
        {
          title: 'Odmawianie w towarzystwie',
          body: [
            'Prosta, spokojna odpowiedź: „Nie, dzięki, nie palę.” Mówienie „nie palę” zamiast „próbuję rzucić” zamyka temat i wzmacnia nową tożsamość. Nie musisz się tłumaczyć.',
          ],
        },
        {
          title: 'Plan na wyjście',
          body: [
            { ul: [
              'Powiedz znajomym wcześniej, że rzucasz.',
              'Zajmij ręce napojem.',
              'Ustal godzinę wyjścia.',
              'Stań z osobami niepalącymi.',
            ] },
            { try: 'Wybierz najbliższą sytuację towarzyską i zapisz jedno zdanie, które powiesz, gdy ktoś zaproponuje papierosa.' },
          ],
        },
      ],
      quiz: [
        q('Dlaczego alkohol jest ryzykowny na początku rzucania?',
          ['Obniża czujność i często wiąże się z paleniem', 'Zawsze uspokaja', 'Nie ma żadnego wpływu', 'Zwiększa motywację'],
          0, 'Mniejsza czujność i silne skojarzenia z paleniem to częsty powód potknięć.'),
        q('Jaka odpowiedź na propozycję papierosa wzmacnia nową tożsamość?',
          ['„Może później”', '„Nie, dzięki, nie palę”', '„Spróbuję jednego”', '„Rzucam, ale…”'],
          1, '„Nie palę” zamyka temat, a „rzucam, ale…” zostawia drzwi otwarte.'),
        q('Co pomaga w towarzystwie palących?',
          ['Stanie obok palących', 'Zostawanie do samego końca', 'Zapalenie jednego dla spokoju', 'Stanie z osobami niepalącymi i zajęcie rąk napojem'],
          3, 'Mniej bodźców i zajęte ręce zmniejszają ryzyko sięgnięcia po papierosa.'),
      ],
    },
  ],
  quiz: [
    q('Co jest częścią tego, że papieros „uspokaja”?',
      ['Całkowite usunięcie stresu', 'Poprawa snu', 'Brak głodu w ogóle', 'Złagodzenie głodu nikotynowego'],
      3, 'Część ulgi to ustąpienie głodu nikotynowego, który sam wywołuje napięcie.'),
    q('Które narzędzie jest szybkim sposobem na napięcie?',
      ['Dodatkowa kawa', 'Oddech 4–6 lub krótki spacer', 'Słodycze przez cały dzień', 'Praca bez przerw'],
      1, 'Oddech i ruch działają szybko i nie wymagają niczego poza chwilą.'),
    q('Jak postępować z apetytem po rzuceniu?',
      ['Mieć pod ręką wodę, owoce i warzywa', 'Głodzić się', 'Jeść wyłącznie słodycze', 'Pomijać posiłki'],
      0, 'Zdrowe przekąski pod ręką ułatwiają przejście przez zwiększony apetyt.'),
    q('Jak odmówić papierosa w towarzystwie?',
      ['Długo się tłumaczyć', 'Milczeć', 'Spokojnie: „Nie, dzięki, nie palę”', 'Wziąć jednego i nie zapalać'],
      2, 'Krótka, spokojna odpowiedź wystarcza i wzmacnia nową tożsamość.'),
    q('Który krok jest zgodny z Kaizen przy ruchu?',
      ['Od razu 1,5 godziny ćwiczeń', 'Zacząć od minuty lub krótkiego spaceru', 'Poczekać na idealną pogodę', 'Zapisać się na maraton'],
      1, 'Mały krok łatwo powtórzyć. Z czasem możesz go wydłużać.'),
  ],
};
