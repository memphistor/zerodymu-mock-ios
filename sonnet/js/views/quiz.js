/**
 * Quiz — sam układ ekranów (intro → pytanie → wynik), bez prawdziwych pytań.
 * Zakończenie zapisuje podejście w postępie (bez wyniku punktowego).
 */

import { h } from '../dom.js';
import { getModule } from '../data/course.js';
import { recordQuizAttempt, visit } from '../logic/progress.js';
import { screen, screenHead, backLink, progressBar, placeholderLines } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { emptyState } from '../ui/states.js';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function quizView({ moduleId }) {
  const module = getModule(moduleId);
  if (!module) return missingQuiz();

  visit(module.id);
  const { quiz } = module;
  const total = quiz.questionCount;

  let phase = 'intro'; // 'intro' | 'question' | 'result'
  let step = 0;
  let answers = [];

  const body = h('div', { class: 'quiz-body' });
  const root = screen(
    backLink(`#/kurs/${module.id}`, `Moduł ${module.order}`),
    screenHead({ eyebrow: `Moduł ${module.order}`, title: quiz.title }),
    body);

  function go(next) {
    phase = next;
    draw();
    const heading = body.querySelector('[data-focus]');
    if (heading) heading.focus({ preventScroll: true });
  }

  function draw() {
    body.replaceChildren(
      phase === 'intro' ? intro() : phase === 'question' ? question() : result());
  }

  function intro() {
    return h('section', { class: 'card' },
      h('h2', { class: 'card__title', tabindex: '-1', 'data-focus': '' }, 'Sprawdź, co zostaje w głowie'),
      h('p', { class: 'screen-lead' },
        `Quiz ma ${total} pytania. Pytania i odpowiedzi poją się razem z pełną treścią kursu.`),
      h('button', {
        class: 'btn btn--block', type: 'button',
        onClick: () => { step = 0; answers = []; go('question'); },
      }, 'Zacznij quiz'));
  }

  function question() {
    const selected = answers[step];
    const isLast = step === total - 1;

    const options = h('fieldset', { class: 'option-list' },
      h('legend', { class: 'sr-only' }, `Odpowiedzi do pytania ${step + 1}`),
      Array.from({ length: quiz.optionsPerQuestion }, (_, i) => {
        const input = h('input', {
          type: 'radio', name: `q${step}`, value: String(i), checked: selected === i,
          onChange: () => { answers[step] = i; nextButton.disabled = false; },
        });
        return h('label', { class: 'option' },
          input,
          h('span', { class: 'option__mark', 'aria-hidden': 'true' }),
          h('span', { class: 'option__body' },
            h('span', null, `Odpowiedź ${OPTION_LABELS[i]} — treść wkrótce`)));
      }));

    const nextButton = h('button', {
      class: 'btn', type: 'button', disabled: selected === undefined,
      onClick: () => {
        if (isLast) {
          recordQuizAttempt(quiz.id);
          go('result');
        } else {
          step += 1;
          go('question');
        }
      },
    }, isLast ? 'Zakończ quiz' : 'Dalej');

    const backButton = step > 0 && h('button', {
      class: 'btn btn--secondary', type: 'button',
      onClick: () => { step -= 1; go('question'); },
    }, 'Wstecz');

    return h('div', { class: 'stack' },
      h('div', { class: 'quiz-progress' },
        h('p', { class: 'quiz-progress__label' }, `Pytanie ${step + 1} z ${total}`),
        progressBar(((step + 1) / total) * 100, 'Postęp quizu')),
      h('section', { class: 'card' },
        h('h2', { class: 'card__title', tabindex: '-1', 'data-focus': '' },
          `Pytanie ${step + 1} — treść wkrótce`),
        placeholderLines('short')),
      options,
      h('div', { class: 'quiz-actions' }, backButton, nextButton));
  }

  function result() {
    const done = emptyState({
      icon: 'check',
      title: 'Quiz zakończony',
      text: 'To szkic — wynik punktowy pojawi się, gdy dodamy pełną treść pytań. Podejście zapisało się w Twoim postępie.',
    });
    const doneTitle = done.querySelector('.state__title');
    doneTitle.setAttribute('tabindex', '-1');
    doneTitle.setAttribute('data-focus', '');

    return h('div', { class: 'stack' },
      done,
      h('div', { class: 'quiz-actions' },
        h('button', { class: 'btn btn--secondary', type: 'button', onClick: () => go('intro') }, 'Spróbuj ponownie'),
        h('a', { class: 'btn', href: `#/kurs/${module.id}` }, 'Wróć do modułu', icon('chevronRight', 20))));
  }

  draw();
  return root;
}

function missingQuiz() {
  return screen(
    backLink('#/kurs', 'Kurs'),
    emptyState({
      icon: 'alert',
      heading: 'h1',
      title: 'Nie ma takiego quizu',
      text: 'Wróć do listy modułów.',
      action: { label: 'Wszystkie moduły', href: '#/kurs' },
    }));
}
