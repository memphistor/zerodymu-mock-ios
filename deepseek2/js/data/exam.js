/**
 * Egzamin końcowy — 10 pytań z całego kursu (krok 2).
 *
 * Pytania 1–5 dotyczą modułu 1 (jedyny moduł z pełną treścią).
 * Pytania 6–10 są na razie placeholderami — dotyczą modułów 2–6, które czekają
 * na treść w kolejnym kroku. Gdy moduły dostaną treść, wymienimy je na pytania
 * merytoryczne i zaktualizujemy `placeholder`.
 */

import { q, placeholderQuestion } from './helpers.js';

export const EXAM = {
  id: 'exam',
  title: 'Egzamin końcowy',
  lead: 'Krótkie podsumowanie całego kursu. Do powtórzenia w każdej chwili, bez presji.',
  passedRatio: 0.7,
  questions: [
    q('Czym jest Kaizen?',
      [
        'Metodą szybkiego osiągania wielkich celów',
        'Drobnymi usprawnieniami powtarzanymi regularnie',
        'Systemem nagród za każdy dzień bez papierosa',
        'Planem opartym wyłącznie na sile woli',
      ], 1, 'Kaizen to małe, regularne usprawnienia — nie jedna wielka zmiana.'),
    q('Po co w kursie pojawia się ikigai?',
      [
        'Żeby uporządkować listę zakupów',
        'Żeby zastąpić papierosa innym nawykiem',
        'Żeby mieć osobisty powód, gdy jest trudniej',
        'Żeby policzyć dni bez dymu',
      ], 2, 'Ikigai daje osobisty sens, który podtrzymuje działanie w trudniejsze dni.'),
    q('Od czego zaczyna się zmianę w duchu Kaizen?',
      [
        'Od spokojnej obserwacji własnego dnia',
        'Od wyrzucenia wszystkich papierosów',
        'Od wyznaczenia sztywnej daty',
        'Od zmiany diety i snu',
      ], 0, 'Punktem wyjścia jest obserwacja, nie duża deklaracja.'),
    q('Ile kroków wybierasz na pierwszy tydzień?',
      [
        'Wszystkie naraz, żeby mieć to za sobą',
        'Dwa: jeden na dzień, drugi na wieczór',
        'Tyle, ile wytrzyma siła woli',
        'Jeden, mały i możliwy do powtórzenia',
      ], 3, 'Jeden mały krok łatwiej powtórzyć, a powtarzanie tworzy zmianę.'),
    q('Co zrobić, gdy zaplanowany krok okazał się za duży?',
      [
        'Podzielić go na mniejszy',
        'Zwiększyć motywację i próbować dalej to samo',
        'Odłożyć zmianę na przyszły rok',
        'Dodać drugi krok jako wsparcie',
      ], 0, 'Za duży krok dzieli się na mniejsze — to sedno małych kroków.'),
    placeholderQuestion(6),
    placeholderQuestion(7),
    placeholderQuestion(8),
    placeholderQuestion(9),
    placeholderQuestion(10),
  ],
};
