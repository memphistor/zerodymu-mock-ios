import { q } from '../helpers.js';

export default {
  id: 'm1',
  title: 'Zacznij od małego kroku',
  summary: 'Kaizen i Ikigai jako fundament: dlaczego małe kroki działają i po co Ci życie bez dymu.',
  goals: [
    'Zrozumiesz ideę Kaizen i zasadę małych kroków.',
    'Sformułujesz własne „po co” w duchu Ikigai.',
    'Poznasz swój punkt startu i ustalisz datę zero.',
  ],
  lessons: [
    {
      id: 'm1-l1',
      title: 'Dlaczego „od jutra” zwykle nie działa',
      minutes: 6,
      pill: 'Duża decyzja bez planu rzadko wytrzymuje pierwszy trudny dzień. Mały, powtarzalny krok — tak.',
      sections: [
        {
          title: 'Pułapka wielkiego skoku',
          body: [
            'Wiele osób próbuje rzucić palenie z dnia na dzień, na samej sile woli. Czasem to działa. Częściej nie, bo silna wola to zasób, który słabnie przy stresie, zmęczeniu i głodzie nikotynowym.',
            'Palenie to jednocześnie **uzależnienie od nikotyny** i **zestaw nawyków**: poranna kawa, przerwa w pracy, papieros po obiedzie. Postanowienie „od jutra” zwykle nie dotyka większości z nich.',
            { note: 'To nie kwestia charakteru. Wiele osób rzuca palenie dopiero po kilku podejściach — każde zostawia wiedzę o tym, co działa, a co nie.' },
          ],
        },
        {
          title: 'Czym jest Kaizen',
          body: [
            'Kaizen (jap. „zmiana na lepsze”) to podejście wywodzące się z japońskiego przemysłu, m.in. z Toyoty. Zamiast jednej wielkiej rewolucji wprowadzasz **ciągłe, drobne usprawnienia**, na bieżąco i z udziałem każdego.',
            'Trzy cechy, które przeniesiemy na rzucanie palenia:',
            { ul: [
              '**Małe** — krok tak niewielki, że trudno go nie wykonać.',
              '**Regularne** — codziennie albo w stałym rytmie.',
              '**Poprawiane** — patrzysz, co zadziałało, i zmieniasz resztę.',
            ] },
          ],
        },
        {
          title: 'Kaizen a rzucanie palenia',
          body: [
            'Zamiast „od jutra nie palę” budujesz serię drobnych zmian, które prowadzą do dnia zero: obserwujesz swoje nawyki, opóźniasz papierosy, zamieniasz rytuały, przygotowujesz otoczenie.',
            'Gdy dzień zero nadchodzi, masz już mniej automatycznych sytuacji do pokonania i konkretne doświadczenia: to działa, tamto nie.',
            { tip: 'Stopniowe ograniczanie liczby papierosów może być równie skuteczne jak rzucenie z dnia na dzień, **pod warunkiem że prowadzi do konkretnej daty końca**. Samo „palę trochę mniej” bez daty zwykle nie wystarcza.' },
          ],
        },
        {
          title: 'Zrób to dziś',
          body: [
            { try: 'Zapisz jednym zdaniem najmniejszy krok, jaki możesz zrobić jeszcze dziś, np. „odłożę pierwszego papierosa o 10 minut”.' },
          ],
        },
      ],
      quiz: [
        q('Co oznacza Kaizen?',
          ['Jednorazową rewolucję w życiu', 'Ciągłe, drobne usprawnienia', 'Surową dyscyplinę bez wyjątków', 'Nagrodę za każdy sukces'],
          1, 'Kaizen to „zmiana na lepsze”: wiele małych, regularnych usprawnień zamiast jednego wielkiego skoku.'),
        q('Dlaczego samo „od jutra nie palę” bywa za mało?',
          ['Bo nikotyna wcale nie uzależnia', 'Bo to zawsze kończy się porażką', 'Bo trzeba najpierw zmienić pracę', 'Bo nie dotyka nawyków i wyzwalaczy, a silna wola słabnie przy stresie'],
          3, 'Palenie to uzależnienie i nawyki naraz. Sama decyzja nie zmienia sytuacji, w których sięgasz po papierosa, a silna wola szybko się wyczerpuje.'),
        q('Kiedy stopniowe ograniczanie liczby papierosów ma największy sens?',
          ['Gdy prowadzi do konkretnej daty rzucenia', 'Gdy nie ma żadnej daty końca', 'Tylko gdy palisz mniej niż 5 papierosów dziennie', 'Nigdy — zawsze jest mniej skuteczne'],
          0, 'Ograniczanie działa wtedy, gdy ma wyznaczony koniec. Bez daty łatwo utknąć na „trochę mniej”.'),
      ],
    },
    {
      id: 'm1-l2',
      title: 'Mikro-kroki: zasada jednej minuty',
      minutes: 6,
      pill: 'Krok ma być tak mały, żeby wykonanie go było łatwiejsze niż wymówka.',
      sections: [
        {
          title: 'Dlaczego mały krok działa',
          body: [
            'Duży cel budzi opór: wymaga wysiłku, odwagi i dobrego humoru. Mały krok prawie go nie budzi. Każdy wykonany krok jest dowodem: **potrafię to zrobić**. To buduje poczucie sprawczości, a ono pomaga w kolejnych krokach.',
            'Powtarzane czynności z czasem stają się automatyczne. Dlatego lepiej zrobić coś malutkiego codziennie niż rzadko coś wielkiego.',
          ],
        },
        {
          title: 'Zasada jednej minuty',
          body: [
            'Jeśli planowany krok zajmuje więcej niż minutę albo wymaga zbierania się w sobie, **zmniejsz go**. Przykłady:',
            { ul: [
              'Zamiast „nie palę rano” → „pierwszego papierosa odkładam o 10 minut”.',
              'Zamiast „rzucam kawę” → „kawę piję przy oknie, bez papierosa”.',
              'Zamiast „nie palę w pracy” → „na przerwę wychodzę bez zapalniczki, na 2 minuty spaceru”.',
            ] },
            { tip: 'Jeśli krok nie wychodzi trzy dni z rzędu, nie „przykładaj się bardziej”. Zmniejsz go i spróbuj ponownie.' },
          ],
        },
        {
          title: 'Drabinka kroków',
          body: [
            'Poniższa kolejność to propozycja. Na każdym stopniu możesz zostać tak długo, jak potrzebujesz.',
            { ol: [
              '**Obserwuj** — zapisuj papierosy i okoliczności.',
              '**Opóźniaj** — każdego papierosa odkładaj o kilka minut.',
              '**Zamieniaj** — jeden rytuał zastąp innym.',
              '**Usuwaj** — wybierz jedno miejsce lub porę bez palenia.',
              '**Dzień zero** — przestajesz palić.',
            ] },
            { try: 'Wybierz stopień drabinki, na którym jesteś, i zapisz, kiedy zrobisz swój pierwszy mały krok (godzina i miejsce).' },
          ],
        },
      ],
      quiz: [
        q('Jak wygląda dobry mikro-krok?',
          ['Wymaga dużego wysiłku, by dawał satysfakcję', 'Dotyczy całego dnia naraz', 'Jest tak mały, że łatwiej go wykonać niż odpuścić', 'Musi być ukryty przed bliskimi'],
          2, 'Mikro-krok ma być łatwy. Jeśli budzi opór, jest za duży — zmniejsz go.'),
        q('Krok nie wychodzi trzy dni z rzędu. Co robisz według Kaizen?',
          ['Zmniejszam krok', 'Rezygnuję z planu', 'Zwiększam presję na siebie', 'Czekam na większą motywację'],
          0, 'Kaizen koryguje proces, a nie człowieka. Gdy coś nie działa, zmniejszasz krok, zamiast dokładać presji.'),
        q('Który krok należy do etapu „obserwuj”?',
          ['Wyrzucam wszystkie papierosy', 'Zapisuję każdego papierosa i okoliczność', 'Kupuję zapas na tydzień', 'Rzucam z dnia na dzień'],
          1, 'Obserwacja to zbieranie informacji bez zmieniania czegokolwiek. Zmiany przychodzą na kolejnych stopniach drabinki.'),
      ],
    },
    {
      id: 'm1-l3',
      title: 'Ikigai: Twoje „po co”',
      minutes: 7,
      pill: 'Powód, który dotyczy Twojego życia, a nie tylko zdrowia, jest paliwem na trudniejsze dni.',
      sections: [
        {
          title: 'Czym jest ikigai',
          body: [
            'Ikigai to japońskie słowo, najczęściej tłumaczone jako „powód, dla którego warto wstawać rano”. W Japonii nie musi to być wielki życiowy cel. Często to **drobne radości i sensy dnia codziennego**: poranna herbata, ogródek, rozmowa z wnukami.',
            { note: 'Popularny w świecie diagram czterech kręgów (co kochasz, w czym jesteś dobry, czego potrzebuje świat, za co możesz dostać zapłatę) to późniejsza, zachodnia adaptacja. Przydaje się do refleksji, ale nie jest „japońską definicją”.' },
          ],
        },
        {
          title: 'Dlaczego to ważne przy rzucaniu',
          body: [
            'Wiedza, że palenie szkodzi, rzadko wystarcza. Konkretne „po co” działa mocniej: bieganie bez zadyszki, spokojniejsze poranki, więcej pieniędzy na coś, co lubisz, czas z bliskimi.',
            'Gdy przyjdzie głód nikotynowy, taki powód jest czymś, do czego możesz wrócić.',
            { tip: 'Powód musi być Twój. „Bo lekarz kazał” albo „bo wypada” zwykle nie niesie przez trudniejsze dni.' },
          ],
        },
        {
          title: 'Cztery pytania do Twojego „po co”',
          body: [
            { ol: [
              'Co chcę robić częściej lub lepiej, kiedy nie palę?',
              'Dla kogo chcę mieć więcej energii i czasu?',
              'Co dziś ogranicza mnie przez palenie?',
              'Jaka mała radość dnia codziennego byłaby wtedy łatwiejsza?',
            ] },
            { try: 'Dokończ jedno zdanie: „Rzucam, żeby…”. Zapisz je w telefonie albo na karteczce i włóż pod folię paczki papierosów.' },
          ],
        },
      ],
      quiz: [
        q('Czym jest ikigai w japońskim rozumieniu?',
          ['Planem kariery', 'Metodą liczenia papierosów', 'Rodzajem diety', 'Powodem, dla którego warto wstawać rano — często drobną radością dnia'],
          3, 'W Japonii ikigai to najczęściej codzienny sens i drobne radości, a nie wielki życiowy cel.'),
        q('Czym jest popularny diagram czterech kręgów ikigai?',
          ['Starożytną japońską regułą', 'Późniejszą, zachodnią adaptacją — przydatną do refleksji', 'Testem medycznym', 'Planem treningowym'],
          1, 'Diagram pojawił się później, w świecie zachodnim. Jako narzędzie refleksji jest użyteczny, ale to nie klasyczna definicja.'),
        q('Które „po co” zwykle działa najmocniej?',
          ['„Bo wypada”', '„Bo ktoś mi kazał”', '„Chcę bez zadyszki wejść z wnukiem na wzgórze”', '„Bo tak trzeba”'],
          2, 'Najlepiej działa powód konkretny, osobisty i związany z codziennym życiem. Ogólniki i cudze oczekiwania szybko tracą moc.'),
      ],
    },
    {
      id: 'm1-l4',
      title: 'Twój punkt startu',
      minutes: 6,
      pill: 'Najpierw obserwuj, nie oceniaj: kilka dni notatek da Ci mapę, której nie ma żaden poradnik.',
      sections: [
        {
          title: 'Po co zapisywać',
          body: [
            'W Kaizen zanim cokolwiek poprawisz, **przyglądasz się procesowi**. U Ciebie procesem jest palenie: kiedy, gdzie i dlaczego sięgasz po papierosa. Wiele z tych momentów jest automatycznych.',
            'Notatki nie służą do wyrzutów sumienia. To dane, na których zbudujesz kolejne kroki.',
          ],
        },
        {
          title: 'Co notować przy każdym papierosie',
          body: [
            { ul: [
              'godzinę i miejsce,',
              'co robisz przed i w trakcie (kawa, rozmowa, telefon, praca),',
              'jak silny jest głód w skali 0–10,',
              'czy to był „automat” (bez głodu), czy faktyczna potrzeba.',
            ] },
            { try: 'Przez najbliższe 3 dni zapisuj każdego papierosa w telefonie albo na karteczce.' },
          ],
        },
        {
          title: 'Jak czytać notatki po 3 dniach',
          body: [
            'Szukaj powtarzalności: stałych godzin, sytuacji, osób, emocji. Zaznacz 2–3 wzorce, które pojawiają się najczęściej. To będą pierwsze cele małych kroków.',
            { note: 'Jeśli pierwszy papieros pojawia się w ciągu pół godziny od przebudzenia, zależność od nikotyny bywa wyższa. Przy wyborze wsparcia warto wtedy porozmawiać z lekarzem lub farmaceutą.' },
          ],
        },
      ],
      quiz: [
        q('Po co zapisywać papierosy w pierwszych dniach?',
          ['Żeby zebrać dane o wzorcach, bez oceniania', 'Żeby się ukarać', 'Żeby natychmiast palić mniej', 'Żeby pokazać innym'],
          0, 'Notatki to dane o procesie. Bez nich trudno wybrać, od czego zacząć.'),
        q('Czym jest „papieros-automat”?',
          ['Papierosem z automatu', 'Pierwszym papierosem dnia', 'Papierosem zapalonym z przyzwyczajenia, bez realnego głodu', 'Papierosem po posiłku'],
          2, 'To papieros z przyzwyczajenia. Takie papierosy są zwykle najłatwiejsze do zamiany lub usunięcia.'),
        q('Pierwszy papieros w ciągu 30 minut od przebudzenia bywa sygnałem…',
          ['Że nie ma zależności', 'Że rzucanie jest niemożliwe', 'Że wystarczy silna wola', 'Wyższej zależności od nikotyny — warto omówić wsparcie ze specjalistą'],
          3, 'To częsty wskaźnik silniejszej zależności. Nie przesądza o niczym, ale dobrze to wiedzieć przy planowaniu wsparcia.'),
      ],
    },
    {
      id: 'm1-l5',
      title: 'Data zero i plan 14 dni',
      minutes: 7,
      pill: 'Data zero to punkt w kalendarzu, do którego prowadzą małe kroki — a nie nagła decyzja.',
      sections: [
        {
          title: 'Wybierz datę zero',
          body: [
            'Najlepiej taką, która jest **bliska, ale nie pośpieszna**: za 2–4 tygodnie. Wybierz dzień w miarę spokojny, a nie środek największego stresu w pracy czy w domu.',
            'Wpisz datę do kalendarza i powiedz o niej choć jednej osobie. Dzięki temu staje się faktem, nie planem „kiedyś”.',
            { try: 'Wybierz datę zero i ustaw przypomnienie na tydzień przed nią.' },
          ],
        },
        {
          title: 'Plan 14 dni — przykładowy rytm',
          body: [
            { ul: [
              '**Dni 1–3:** obserwacja, czyli notatki o każdym papierosie.',
              '**Dni 4–7:** opóźnianie papierosów i jedno miejsce lub pora bez palenia.',
              '**Dni 8–11:** zamiana jednego rytuału i usunięcie jednego „automatu”.',
              '**Dni 12–13:** przygotowanie: wyrzucenie zapasów, plan na trudne godziny, wsparcie.',
              '**Dzień 14:** data zero.',
            ] },
            { tip: 'To szkic, nie rozkaz. Jeśli potrzebujesz więcej czasu na jakimś etapie, przesuń datę zero. Ważne, żeby data nadal istniała.' },
          ],
        },
        {
          title: 'Wsparcie od początku',
          body: [
            'Powiedz o planie 1–2 osobom, które będą Cię wspierać, a nie oceniać. Rozważ też rozmowę z lekarzem lub farmaceutą o dostępnym wsparciu, np. preparatach nikotynowych lub lekach.',
            'Połączenie wsparcia farmakologicznego z rozmową o planie zwykle zwiększa szanse powodzenia. Wybór i dawkowanie zawsze ustal ze specjalistą.',
            { note: 'Kurs ma charakter edukacyjny i nie zastępuje porady lekarza.' },
          ],
        },
      ],
      quiz: [
        q('Jaka data zero jest rozsądna?',
          ['Za rok', 'Za 2–4 tygodnie, w stosunkowo spokojnym dniu', 'Dziś, bez przygotowania', 'W dniu największego stresu'],
          1, 'Za blisko — brak przygotowania, za daleko — motywacja się rozmywa. Spokojny dzień ułatwia start.'),
        q('Co dzieje się w dniach 4–7 przykładowego planu?',
          ['Opóźnianie papierosów i pierwsze miejsce lub pora bez palenia', 'Dzień zero', 'Rezygnacja z planu', 'Zakup zapasów'],
          0, 'Po obserwacji zaczynasz drobne zmiany: opóźniasz papierosy i wyłączasz jedno miejsce lub porę.'),
        q('Wsparcie farmakologiczne i rozmowa ze specjalistą…',
          ['Zawsze są zbędne', 'Są obowiązkowe dla każdego', 'Mogą zwiększyć szanse powodzenia — warto zapytać lekarza lub farmaceutę', 'Są zakazane przy rzucaniu'],
          2, 'Wsparcie nie jest obowiązkowe, ale dla wielu osób znacząco pomaga. O wyborze decyduje się razem ze specjalistą.'),
      ],
    },
  ],
  quiz: [
    q('Które zdanie najlepiej oddaje ideę Kaizen?',
      ['Raz a dobrze, bez poprawek', 'Liczy się tylko efekt końcowy', 'Wielkie decyzje wymagają wielkich kroków', 'Małe, regularne usprawnienia, poprawiane na podstawie doświadczeń'],
      3, 'Kaizen to małe, regularne zmiany i uczenie się na bieżąco.'),
    q('Krok jest za trudny. Co robisz?',
      ['Zmniejszam go, aż będzie łatwy', 'Czekam na lepszy nastrój', 'Rezygnuję na tydzień', 'Dokładam drugi krok obok'],
      0, 'Zmniejszenie kroku to podstawowy ruch w Kaizen. Łatwy krok łatwo powtórzyć.'),
    q('Dobre „po co” w duchu ikigai to…',
      ['Cudzy powód, który dobrze brzmi', 'Ogólnik: „bo zdrowie”', 'Konkretny, własny powód związany z codziennym życiem', 'Wyłącznie koszt papierosów'],
      2, 'Najmocniejszy jest powód konkretny, osobisty i związany z tym, co robisz na co dzień.'),
    q('Co dają notatki z pierwszych dni?',
      ['Dowód, że się nie da', 'Mapę wzorców, wyzwalaczy i „automatów”', 'Gotowy plan leczenia', 'Wynik testu zależności'],
      1, 'Notatki pokazują, od czego zacząć małe kroki. Nie służą do oceniania ani diagnozy.'),
    q('Czym jest data zero?',
      ['Dniem, w którym zaczynasz obserwację', 'Dniem wizyty u lekarza', 'Dniem, w którym wyrzucasz notatki', 'Punktem w kalendarzu, do którego prowadzą małe kroki'],
      3, 'Data zero to dzień, w którym przestajesz palić. Małe kroki wcześniej zmniejszają jej ciężar.'),
  ],
};
