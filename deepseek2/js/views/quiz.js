/**
 * Ekran quizu (lekcji / modułu / egzaminu) — wspólny dla trzech wariantów.
 *
 * Przepływ: intro → pytania (jedno na ekran) → wynik z przeglądem odpowiedzi.
 * Pytania są na razie placeholderami, ale wyniki zapisują się prawdziwie do
 * localStorage, a zaliczenie quizu lekcji oznacza lekcję jako ukończoną.
 */

import { h, mount } from '../dom.js';
import { quizSpec } from '../data/course.js';
import { recordQuiz } from '../logic/progress.js';
import { screenHeader, card, section, button, progressBar, badge, placeholderNote } from '../ui/components.js';
import { emptyState } from '../ui/states.js';
import { icon } from '../ui/icons.js';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function quizView(params) {
  const spec = quizSpec(params);

  if (!spec) {
    return emptyState({
      icon: 'alert',
      heading: 'h1',
      title: 'Nie ma takiego quizu',
      text: 'Ten adres nie prowadzi do żadnego quizu.',
      action: { href: '#/kurs', label: 'Wróć do kursu' },
    });
  }

  const root = h('div', { class: 'stack stack--lg' });
  const answers = [];
  let phase = 'intro';
  let index = 0;
  let result = null;

  function draw() {
    const content = phase === 'intro' ? introScreen()
      : phase === 'question' ? questionScreen()
      : resultScreen();
    mount(root, content);
  }

  function introScreen() {
    return h('div', { class: 'stack stack--lg' },
      header(),
      card({ tone: 'soft' },
        h('p', { class: 'card__title' }, 'Jak to działa'),
        h('p', { class: 'card__text' },
          `${spec.questions.length} pytań, zawsze 4 odpowiedzi (A–D). Zaliczenie od ` +
          `${Math.round(spec.passedRatio * 100)}%. Wynik zapisuje się na tym urządzeniu i możesz go powtórzyć.`)),
      spec.placeholder
        ? placeholderNote('Pytania w tym kroku są przykładowe — prawdziwe dojdą razem z treścią tego modułu.')
        : (spec.partial
            ? placeholderNote('Pytania 1–5 dotyczą modułu 1. Pytania 6–10 są na razie przykładowe.')
            : null),
      h('div', { class: 'lesson-actions' },
        button({
          label: 'Zaczynamy',
          variant: 'primary',
          icon: 'play',
          block: true,
          onClick: () => {
            phase = 'question';
            index = 0;
            draw();
          },
        })));
  }

  function questionScreen() {
    const question = spec.questions[index];
    const chosen = answers[index];

    return h('div', { class: 'stack stack--lg' },
      header(),
      h('div', { class: 'quiz-progress' },
        progressBar((index + (chosen != null ? 1 : 0)) / spec.questions.length),
        h('span', { class: 'quiz-progress__count' }, `${index + 1}/${spec.questions.length}`)),
      h('h2', { class: 'quiz-question' }, question.question),
      question.placeholder && badge('Przykładowe pytanie', 'muted'),
      h('div', { class: 'quiz-options' }, question.options.map((option, optionIndex) => h('button', {
        class: `quiz-option${chosen === optionIndex ? ' is-selected' : ''}`,
        type: 'button',
        onClick: () => {
          answers[index] = optionIndex;
          draw();
        },
      },
        h('span', { class: 'quiz-option__letter' }, LETTERS[optionIndex]),
        h('span', { class: 'quiz-option__text' }, option)))),
      h('div', { class: 'lesson-actions' },
        button({
          label: index === spec.questions.length - 1 ? 'Zakończ i pokaż wynik' : 'Dalej',
          variant: 'primary',
          icon: 'arrow',
          block: true,
          disabled: chosen == null,
          onClick: () => {
            if (index === spec.questions.length - 1) finish();
            else {
              index += 1;
              draw();
            }
          },
        }),
        index > 0 && button({
          label: 'Wróć',
          variant: 'ghost',
          icon: 'back',
          block: true,
          onClick: () => {
            index -= 1;
            draw();
          },
        })));
  }

  function finish() {
    const correct = spec.questions.reduce(
      (sum, question, questionIndex) => sum + (answers[questionIndex] === question.correct ? 1 : 0),
      0,
    );
    const ratio = correct / spec.questions.length;
    const saved = recordQuiz(spec.id, ratio, spec.passedRatio);
    result = { correct, ratio, passed: saved.passed };
    phase = 'result';
    draw();
  }

  function resultScreen() {
    return h('div', { class: 'stack stack--lg' },
      header(),
      h('div', { class: 'quiz-result' },
        h('p', { class: 'quiz-result__score' }, `${result.correct}/${spec.questions.length}`),
        h('p', { class: 'quiz-result__label' },
          `${Math.round(result.ratio * 100)}% · zaliczenie od ${Math.round(spec.passedRatio * 100)}%`),
        result.passed
          ? badge('Zaliczone', 'success', 'check')
          : badge('Spróbuj jeszcze raz', 'soon', 'refresh'),
        h('p', { class: 'state__text' },
          result.passed
            ? 'Dobry wynik. Spokojnie idź dalej.'
            : 'Bez presji — to informacja, nie ocena.')),
      !result.passed && hintForRetry(),

      section({ title: 'Przegląd odpowiedzi' },
        h('div', { class: 'quiz-review' }, spec.questions.map((question, questionIndex) => h('div', { class: 'card' },
          h('p', { class: 'card__title' }, `${questionIndex + 1}. ${question.question}`),
          h('p', { class: 'card__text' },
            `Twoja odpowiedź: ${labelFor(question, answers[questionIndex])} · ` +
            `Poprawna: ${labelFor(question, question.correct)}`),
          h('p', { class: 'quiz-explanation' }, question.explanation))))),

      h('div', { class: 'lesson-actions' },
        button({
          label: 'Powtórz quiz',
          variant: 'primary',
          icon: 'refresh',
          block: true,
          onClick: () => {
            answers.length = 0;
            index = 0;
            result = null;
            phase = 'intro';
            draw();
          },
        }),
        button({ label: spec.kind === 'exam' ? 'Wróć do kursu' : 'Wróć', variant: 'soft', icon: 'back', block: true, href: spec.back.href })));
  }

  function hintForRetry() {
    if (spec.kind !== 'lesson') return null;
    return h('p', { class: 'quiz-hint' },
      icon('info', 15), ' Wskazówka: wróć do lekcji i przejrzyj sekcję „Spróbuj dziś".');
  }

  function header() {
    return screenHeader({
      back: spec.back,
      eyebrow: spec.kind === 'exam' ? 'Egzamin' : spec.kind === 'module' ? 'Quiz modułu' : 'Quiz lekcji',
      title: spec.title,
      subtitle: phase === 'intro' ? spec.lead : null,
      aside: phase === 'result' && result.passed ? badge('Zaliczone', 'success', 'check') : null,
    });
  }

  function labelFor(question, answerIndex) {
    if (answerIndex == null) return 'brak';
    return `${LETTERS[answerIndex]} — ${question.options[answerIndex]}`;
  }

  draw();
  return root;
}
