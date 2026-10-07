/**
 * Pomocnik do zapisu pytań quizowych.
 *
 * `correct` to INDEKS poprawnej odpowiedzi (0 = A, 1 = B, 2 = C, 3 = D).
 * Każde pytanie ma dokładnie 4 odpowiedzi i wyjaśnienie pokazywane po wyniku.
 * Poprawność danych sprawdza `scripts/check-content.mjs`.
 *
 * @param {string} question
 * @param {[string, string, string, string]} options
 * @param {0|1|2|3} correct
 * @param {string} explanation
 */
export function q(question, options, correct, explanation) {
  return { question, options, correct, explanation };
}

/** Pytanie-placeholder, gdy treść modułu jeszcze nie powstała. */
export function placeholderQuestion(index) {
  return {
    question: `Przykładowe pytanie ${index} (placeholder)`,
    options: ['Odpowiedź A (placeholder)', 'Odpowiedź B (placeholder)', 'Odpowiedź C (placeholder)', 'Odpowiedź D (placeholder)'],
    // Poprawna odpowiedź wędruje po literach, żeby klikanie „zawsze A" nie wyglądało na działającą naukę.
    correct: (index - 1) % 4,
    explanation: 'Prawdziwe wyjaśnienie pojawi się razem z treścią tego modułu.',
    placeholder: true,
  };
}

/** Lista pytań-placeholderów dla modułu bez treści. */
export function placeholderQuestions(count) {
  return Array.from({ length: count }, (_, i) => placeholderQuestion(i + 1));
}
