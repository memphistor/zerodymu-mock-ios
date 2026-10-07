/**
 * Treść modułu 1 „Poznaj swój nawyk” — krok 2.
 *
 * Kształt lekcji jest docelowy: pigułka (najważniejsze zdanie), sekcje
 * z nagłówkami (budują spis treści) i ćwiczenie. Kolejne moduły mają na razie
 * tylko metadane (tytuł, opis, pigułka) — treść w kroku 3.
 */

export const m1Lessons = [
  {
    id: "m1-l1",
    title: "Mapa dnia",
    summary: "Kiedy, gdzie i po czym sięgasz po papierosa.",
    durationMin: 6,
    pill: "Nawyk to rytm, który Twój dzień już zna. Najpierw go zobacz — potem zmieniaj.",
    sections: [
      {
        id: "po-co-mapa",
        heading: "Po co mapa dnia",
        paragraphs: [
          "Papieros rzadko pojawia się przypadkiem. Wraca w tych samych momentach: po kawie, po obiedzie, w drodze do pracy, przy telefonie. To nie brak silnej woli — to rytm, który zdążył wrosnąć w dzień.",
          "Zanim cokolwiek zmienisz, zobacz ten rytm. Nie po to, żeby się oceniać, ale żeby wiedzieć, gdzie w ogóle warto zaczynać.",
        ],
      },
      {
        id: "jak-czytac",
        heading: "Jak czytać własny dzień",
        paragraphs: [
          "Interesują Cię fakty, nie oceny. „Znowu się nie udało” nic nie wnosi. „Zapaliłem po trzeciej kawie, w kuchni” — owszem.",
        ],
        list: [
          "Kiedy: pora dnia i okoliczność (po przebudzeniu, po posiłku, przed snem).",
          "Gdzie: kuchnia, balkon, samochód, okno w biurze.",
          "Po czym: kawa, stres, telefon, wyjście z budynku.",
        ],
      },
      {
        id: "kaizen-jeden-punkt",
        heading: "Kaizen: jeden punkt na raz",
        paragraphs: [
          "Kaizen to japońska zasada ciągłego, drobnego ulepszania. Nie przebudowujesz całego dnia naraz — wybierasz jedno powtarzalne miejsce i pracujesz nad nim.",
          "Dlatego mapa dnia nie kończy się listą dwudziestu punktów. Kończy się jednym zdaniem: „Od tego zaczynam”.",
        ],
      },
    ],
    practice: {
      title: "Ćwiczenie: pięć kresek",
      steps: [
        "Przez jeden dzień zaznaczaj kreskę za każdym razem, gdy sięgasz po papierosa.",
        "Nie zapisuj nic więcej — sama liczba i moment.",
        "Wieczorem spójrz na kartkę i zaznacz dwa momenty, które powtarzają się najbardziej.",
      ],
    },
  },
  {
    id: "m1-l2",
    title: "Wyzwalacze",
    summary: "Co uruchamia automatyzm, zanim zdążysz pomyśleć.",
    durationMin: 7,
    pill: "Wyzwalacz to sygnał, po którym ręka sama sięga po papierosa. Nazwany traci część władzy.",
    sections: [
      {
        id: "sygnal-nie-slabosc",
        heading: "Sygnał, nie słabość",
        paragraphs: [
          "Większość papierosów nie jest decyzją. Jest odpowiedzią na sygnał: skończyła się rozmowa, zaparzyłeś kawę, wyszedłeś z budynku. Mózg nauczył się, że po tym sygnale następuje papieros.",
          "To dobra wiadomość. Skoro coś jest sygnałem, można je rozpoznać i przygotować odpowiedź — zamiast walczyć z sobą w ostatniej sekundzie.",
        ],
      },
      {
        id: "trzy-rodziny",
        heading: "Trzy rodziny wyzwalaczy",
        paragraphs: ["Większość wyzwalaczy wpada w jedną z trzech rodzin. Warto znać swoją."],
        list: [
          "Fizyczne: kawa, alkohol, jedzenie, zapach dymu.",
          "Emocjonalne: stres, nuda, złość, potrzeba nagrody po trudnym dniu.",
          "Społeczne: przerwa w pracy, towarzystwo palących, rozmowa na balkonie.",
        ],
      },
      {
        id: "ikigai",
        heading: "Ikigai: powód zamiast zakazu",
        paragraphs: [
          "Ikigai to japońskie słowo na to, co nadaje dniu sens — powód, dla którego warto wstać. W praktyce działa jak przeciwwaga dla wyzwalacza: zamiast pytać „czy mogę?”, pytasz „po co mi to?”.",
          "Zakaz mówi „nie wolno”. Powód mówi „idę w inną stronę”. W trudnym momencie łatwiej wykonać drugie zdanie.",
        ],
      },
    ],
    practice: {
      title: "Ćwiczenie: nazwij trzy",
      steps: [
        "Z wczorajszej mapy dnia wybierz trzy najczęstsze wyzwalacze.",
        "Przy każdym dopisz jedną rzecz, którą możesz zrobić zamiast papierosa.",
        "Zapisz je na telefonie — będą potrzebne w module 4.",
      ],
    },
  },
  {
    id: "m1-l3",
    title: "Dziennik obserwacji",
    summary: "Trzy kolumny, które zamieniają nawyk w dane.",
    durationMin: 5,
    pill: "Trzy kolumny i dwadzieścia sekund dziennie — tyle wystarczy, żeby nawyk stał się widoczny.",
    sections: [
      {
        id: "minimalny-dziennik",
        heading: "Minimalny dziennik",
        paragraphs: [
          "Nie potrzebujesz aplikacji ani tabel. Trzy kolumny w notatniku w zupełności wystarczą: moment, wyzwalacz, co czułeś przed i po.",
        ],
        list: [
          "Moment: godzina i miejsce.",
          "Wyzwalacz: co wydarzyło się bezpośrednio przed.",
          "Stan: napięcie przed i uczucie po (krótko, jednym słowem).",
        ],
      },
      {
        id: "bez-oceniania",
        heading: "Bez oceniania",
        paragraphs: [
          "Dziennik, w którym się karzesz, przestaje być dziennikiem — staje się dowodem winy i po trzech dniach ląduje w szufladzie.",
          "Zapisuj tak, jakbyś opisywał czyjś dzień: spokojnie i rzeczowo. Celem jest wzorzec, nie wyrok.",
        ],
      },
      {
        id: "co-dalej",
        heading: "Co dalej",
        paragraphs: [
          "Po trzech–czterech dniach zobaczysz powtarzalny wzorzec: najczęstszy moment, najczęstszy wyzwalacz i porę, w której jest najtrudniej.",
          "To jest Twój punkt startowy. W module 2 zamienisz go w jeden konkretny powód, a w module 3 — w pierwszy mikro-krok.",
        ],
      },
    ],
    practice: {
      title: "Ćwiczenie: trzy dni",
      steps: [
        "Prowadź dziennik przez trzy dni, po około dwadzieścia sekund dziennie.",
        "Czwartego dnia podkreśl wzorzec: moment, wyzwalacz, pora.",
        "Zapisz jedno zdanie: „Od tego zaczynam”.",
      ],
    },
  },
];
