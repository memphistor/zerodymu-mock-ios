/** Statyczna lista 6 modułów — treść lekcji w kolejnych krokach. */
export const MODULES = [
  {
    id: "m1",
    title: "Start bez presji",
    description: "Placeholder: pierwsze kroki i bezpieczne tempo.",
    lessonCount: 3,
  },
  {
    id: "m2",
    title: "Zrozumieć nawyk",
    description: "Placeholder: jak działa palenie w codzienności.",
    lessonCount: 4,
  },
  {
    id: "m3",
    title: "Plan na trudne chwile",
    description: "Placeholder: strategie na stres i rutynę.",
    lessonCount: 3,
  },
  {
    id: "m4",
    title: "Ciało i oddech",
    description: "Placeholder: regeneracja i sygnały organizmu.",
    lessonCount: 3,
  },
  {
    id: "m5",
    title: "Środowisko i ludzie",
    description: "Placeholder: wsparcie i granice.",
    lessonCount: 2,
  },
  {
    id: "m6",
    title: "Utrwalenie zmiany",
    description: "Placeholder: długoterminowy plan bez presji.",
    lessonCount: 3,
  },
];

export function getModule(id) {
  return MODULES.find((m) => m.id === id) ?? null;
}
