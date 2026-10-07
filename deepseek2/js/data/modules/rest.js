/**
 * Moduły 2–6 — PLACEHOLDERY (krok 2).
 *
 * Struktura docelowa: tytuły, opisy i listy lekcji są już ustalone, ale lekcje
 * nie mają treści, a quizy mają pytania-placeholdery. Pełna treść tych modułów
 * dojdzie w kolejnym kroku. Identyfikatory (m2, m2-l1) są stabilne i trafiają do
 * localStorage, więc nie zmieniaj ich po publikacji.
 */

import { placeholderQuestions } from '../helpers.js';

export const MODULES_2_6 = [
  {
    id: 'm2',
    number: 2,
    title: 'Małe kroki',
    lead: 'Jak drobne zmiany zamieniają się w stały nawyk.',
    goals: [
      'Zrozumieć, jak powstaje nawyk',
      'Dzielić cel na mniejsze części',
      'Zauważać postęp, który łatwo przeoczyć',
    ],
    lessons: [
      { id: 'm2-l1', title: 'Jak działa nawyk', minutes: 6, pill: 'Nawyk to pętla: sygnał, zachowanie, nagroda.', placeholder: true, sections: [] },
      { id: 'm2-l2', title: 'Zmiana po jednym elemencie', minutes: 6, pill: 'Zmieniaj jeden element pętli naraz, nie całą pętlę.', placeholder: true, sections: [] },
      { id: 'm2-l3', title: 'Dzielenie celu na kroki', minutes: 5, pill: 'Jeśli krok wydaje się za duży, trzeba go podzielić.', placeholder: true, sections: [] },
    ],
    quiz: { data: placeholderQuestions(5), placeholder: true },
  },
  {
    id: 'm3',
    number: 3,
    title: 'Sygnały i sytuacje',
    lead: 'Kiedy i dlaczego sięgasz po papierosa.',
    goals: [
      'Rozpoznawać własne wyzwalacze',
      'Przygotować prostą odpowiedź na sygnał',
      'Zauważać sytuacje powtarzalne',
    ],
    lessons: [
      { id: 'm3-l1', title: 'Twoje wyzwalacze', minutes: 5, pill: 'Nie chodzi o silną wolę, chodzi o rozpoznanie sygnału.', placeholder: true, sections: [] },
      { id: 'm3-l2', title: 'Przerwa w pętli', minutes: 6, pill: 'Krótka przerwa między sygnałem a reakcją zmienia bardzo wiele.', placeholder: true, sections: [] },
      { id: 'm3-l3', title: 'Rutyny dnia', minutes: 5, pill: 'Nawyki czepiają się rytmu dnia — zmień rytm, zmieniasz nawyk.', placeholder: true, sections: [] },
    ],
    quiz: { data: placeholderQuestions(5), placeholder: true },
  },
  {
    id: 'm4',
    number: 4,
    title: 'Trudne momenty',
    lead: 'Co robić, gdy jest trudniej: napięcie, głód, towarzystwo.',
    goals: [
      'Nazwać trudniejsze momenty',
      'Mieć przygotowany plan B',
      'Traktować wpadkę jako informację, nie porażkę',
    ],
    lessons: [
      { id: 'm4-l1', title: 'Gdy pojawia się głód', minutes: 6, pill: 'Trudna chwila ma początek i koniec — zwykle kilka minut.', placeholder: true, sections: [] },
      { id: 'm4-l2', title: 'Napięcie i emocje', minutes: 6, pill: 'Za trudną chwilą często stoi potrzeba, nie papieros.', placeholder: true, sections: [] },
      { id: 'm4-l3', title: 'Wpadka zamiast porażki', minutes: 5, pill: 'Wpadka to dane, z których można coś wyciągnąć.', placeholder: true, sections: [] },
    ],
    quiz: { data: placeholderQuestions(5), placeholder: true },
  },
  {
    id: 'm5',
    number: 5,
    title: 'Otoczenie i wsparcie',
    lead: 'Przestrzeń wokół Ciebie pracuje razem z Tobą albo przeciwko Tobie.',
    goals: [
      'Uporządkować otoczenie wokół zmiany',
      'Poprosić o wsparcie konkretnie',
      'Zauważyć, co pomaga, a co przeszkadza',
    ],
    lessons: [
      { id: 'm5-l1', title: 'Twoja przestrzeń', minutes: 5, pill: 'Łatwiej zmienić otoczenie niż siłę woli.', placeholder: true, sections: [] },
      { id: 'm5-l2', title: 'Rozmowa o wsparciu', minutes: 6, pill: 'Wsparcie prosi się konkretnie, nie ogólnie.', placeholder: true, sections: [] },
      { id: 'm5-l3', title: 'Kiedy ktoś pali obok', minutes: 5, pill: 'Da się zostać w towarzystwie i nie palić — z przygotowanym zdaniem.', placeholder: true, sections: [] },
    ],
    quiz: { data: placeholderQuestions(5), placeholder: true },
  },
  {
    id: 'm6',
    number: 6,
    title: 'Na dłużej',
    lead: 'Utrzymanie zmiany: rytm, plan na kryzysy i małe święta.',
    goals: [
      'Ustalić swój rytm utrzymania',
      'Przygotować plan na trudniejszy czas',
      'Doceniać małe wygrane',
    ],
    lessons: [
      { id: 'm6-l1', title: 'Twój rytm', minutes: 5, pill: 'Zmiana żyje, gdy ma swoje miejsce w tygodniu.', placeholder: true, sections: [] },
      { id: 'm6-l2', title: 'Plan na kryzysy', minutes: 6, pill: 'Kryzys da się przewidzieć — i wtedy przestaje być kryzysem.', placeholder: true, sections: [] },
      { id: 'm6-l3', title: 'Małe święta', minutes: 5, pill: 'Postęp, którego nie świętujesz, łatwo przestaje być widoczny.', placeholder: true, sections: [] },
    ],
    quiz: { data: placeholderQuestions(5), placeholder: true },
  },
];
