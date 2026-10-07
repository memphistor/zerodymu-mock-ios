/**
 * Pomocnik do pisania treści kursu.
 *
 * q(pytanie, [A, B, C, D], indeksPoprawnej, wyjaśnienie)
 *
 * Bloki treści w sekcjach lekcji (patrz js/ui/prose.js):
 *   'tekst'            akapit (obsługuje **pogrubienie**)
 *   { ul: [...] }      lista punktowana
 *   { ol: [...] }      lista numerowana
 *   { tip: '...' }     „Wskazówka”
 *   { note: '...' }    „Warto wiedzieć”
 *   { try: '...' }     „Spróbuj dziś” (mały krok do wykonania)
 */
export function q(text, options, correct, why) {
  return { text, options, correct, why };
}
