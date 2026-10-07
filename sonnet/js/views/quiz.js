/**
 * Quiz — wspólny ekran dla quizu lekcji (3 pytania), modułu (5) i egzaminu (10).
 * Pytania A–D z wyjaśnieniami. Tryb 'immediate': wyjaśnienie po każdej odpowiedzi
 * (lekcja, moduł); tryb 'end': wyniki i wyjaśnienia dopiero na końcu (egzamin).
 */

import { h, mount } from '../dom.js';
import { getState } from '../store.js';
import { resolveQuiz, passCount } from '../data/course.js';
import { recordQuizResult, visit, bestCorrect } from '../logic/progress.js';
import { moduleQuizLock, examLock } from '../logic/locks.js';
import {
  screen, screenHead, backLink, progressBar, notice, plural,
} from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { emptyState } from '../ui/states.js';

const LETTERS = ['A', 'B', 'C', 'D'];

const INTRO_TITLES = {
  lesson: 'Sprawdź, co zostaje w głowie',
  module: 'Sprawdź cały moduł',
  exam: 'Egzamin z całego kursu',
};

export default function quizView(params) {
  const ctx = resolveQuiz(params);
  if (!ctx) return missingQuiz();

  const { quiz, module, lesson, back, eyebrow } = ctx;
  const questions = quiz.questions;
  const total = questions.length;
  const needed = passCount(quiz);
  const immediate = quiz.feedback === 'immediate';

  if (module) visit(module.id, lesson ? lesson.id : null);

  let phase = 'intro'; // 'intro' | 'question' | 'result'
  let step = 0;
  let answers = [];
  let checked = false; // tryb 'immediate': czy bieżące pytanie zostało sprawdzone
  let result = null;

  const body = h('div', null);
  const root = screen(
    backLink(back.href, back.label),
    screenHead({ eyebrow, title: quiz.title }),
    body);

  function draw(focusSelector = '[data-focus]') {
    mount(body, phase === 'intro' ? intro() : phase === 'question' ? question() : resultView());
    const target = body.querySelector(focusSelector);
    if (target) {
      target.focus({ preventScroll: true });
      if (focusSelector !== '[data-focus]') target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function startAttempt() {
    step = 0;
    answers = [];
    checked = false;
    result = null;
    phase = 'question';
    draw();
  }

  // ---------- intro ----------

  function intro() {
    const state = getState();
    const lock = quiz.kind === 'module'
      ? moduleQuizLock(state, module)
      : quiz.kind === 'exam' ? examLock(state) : { locked: false };
    const best = bestCorrect(state, quiz);

    return h('div', { class: 'stack' },
      lock.locked && notice(`${lock.reason} Na razie możesz go swobodnie wypróbować.`, 'lock'),
      h('section', { class: 'card' },
        h('h2', { class: 'card__title', tabindex: '-1', 'data-focus': '' }, INTRO_TITLES[quiz.kind]),
        h('p', { class: 'screen-lead' },
          `${total} ${plural(total, 'pytanie', 'pytania', 'pytań')} · zaliczenie od ${needed}/${total}`),
        h('p', { class: 'screen-lead' },
          immediate
            ? 'Po każdej odpowiedzi zobaczysz wyjaśnienie.'
            : 'Wyniki i wyjaśnienia zobaczysz po zakończeniu egzaminu.'),
        best != null && h('p', { class: 'quiz-best' }, `Najlepszy wynik: ${best}/${total}`),
        h('button', { class: 'btn btn--block', type: 'button', onClick: startAttempt },
          best != null ? 'Spróbuj jeszcze raz' : 'Zacznij')));
  }

  // ---------- pytanie ----------

  function question() {
    const item = questions[step];
    const selected = answers[step];
    const isLast = step === total - 1;
    const revealed = immediate && checked;
    const correct = selected === item.correct;

    const primary = h('button', {
      class: 'btn', type: 'button', disabled: selected === undefined,
      onClick: () => {
        if (immediate && !checked) {
          checked = true;
          draw('[data-feedback]');
          return;
        }
        if (isLast) finish();
        else {
          step += 1;
          checked = false;
          draw();
        }
      },
    }, primaryLabel(isLast, revealed));

    const options = h('fieldset', { class: 'option-list' },
      h('legend', { class: 'sr-only' }, `Odpowiedzi do pytania ${step + 1}`),
      item.options.map((text, i) => {
        const isRight = revealed && i === item.correct;
        const isWrong = revealed && selected === i && i !== item.correct;
        return h('label', { class: `option${isRight ? ' is-correct' : ''}${isWrong ? ' is-wrong' : ''}` },
          h('input', {
            type: 'radio', name: `q${step}`, value: String(i), checked: selected === i, disabled: revealed,
            onChange: () => { answers[step] = i; primary.disabled = false; },
          }),
          h('span', { class: 'option__letter', 'aria-hidden': 'true' }, LETTERS[i]),
          h('span', { class: 'option__text' }, text),
          isRight && h('span', { class: 'option__flag' }, icon('check', 18), h('span', { class: 'sr-only' }, 'Poprawna odpowiedź')),
          isWrong && h('span', { class: 'option__flag' }, icon('x', 18), h('span', { class: 'sr-only' }, 'Twoja odpowiedź, niepoprawna')));
      }));

    const feedback = revealed && h('div', {
      class: `feedback ${correct ? 'feedback--ok' : 'feedback--bad'}`,
      role: 'status', tabindex: '-1', 'data-feedback': '',
    },
    h('p', { class: 'feedback__title' },
      icon(correct ? 'check' : 'info', 18),
      correct ? 'Dobrze.' : `Jeszcze nie. Poprawna odpowiedź: ${LETTERS[item.correct]}.`),
    h('p', null, item.why));

    const backButton = !immediate && step > 0 && h('button', {
      class: 'btn btn--secondary', type: 'button',
      onClick: () => { step -= 1; draw(); },
    }, 'Wstecz');

    return h('div', { class: 'stack' },
      h('div', { class: 'quiz-progress' },
        h('p', { class: 'quiz-progress__label' }, `Pytanie ${step + 1} z ${total}`),
        progressBar(((step + 1) / total) * 100, 'Postęp quizu')),
      h('section', { class: 'card' },
        h('h2', { class: 'quiz-question', tabindex: '-1', 'data-focus': '' }, item.text)),
      options,
      feedback,
      h('div', { class: 'quiz-actions' }, backButton, primary));
  }

  function primaryLabel(isLast, revealed) {
    if (immediate) {
      if (!revealed) return 'Sprawdź';
      return isLast ? 'Zobacz wynik' : 'Dalej';
    }
    return isLast ? 'Zakończ egzamin' : 'Dalej';
  }

  function finish() {
    const correctCount = answers.reduce((n, a, i) => n + (a === questions[i].correct ? 1 : 0), 0);
    const ratio = correctCount / total;
    const { passed } = recordQuizResult({ quiz, lesson }, ratio);
    result = { correct: correctCount, ratio, passed };
    phase = 'result';
    draw();
  }

  // ---------- wynik ----------

  function resultView() {
    const { correct, ratio, passed } = result;

    const headline = passed ? 'Zaliczone' : 'Jeszcze nie zaliczone';
    let message;
    if (passed) {
      message = quiz.kind === 'lesson'
        ? 'Dobra robota. Lekcja jest oznaczona jako ukończona.'
        : quiz.kind === 'module'
          ? 'Dobra robota. Quiz modułu zaliczony.'
          : 'Gratulacje! Egzamin końcowy zaliczony.';
    } else {
      message = `Do zaliczenia potrzeba ${needed}/${total}. Wyjaśnienia poniżej pomogą — spróbuj jeszcze raz, kiedy będziesz gotowy.`;
    }

    const review = h('ol', { class: 'review' },
      questions.map((item, i) => {
        const chosen = answers[i];
        const ok = chosen === item.correct;
        return h('li', null,
          h('details', { class: `review__item${ok ? ' is-ok' : ' is-bad'}`, open: !ok },
            h('summary', null,
              h('span', { class: 'review__flag' }, icon(ok ? 'check' : 'x', 16),
                h('span', { class: 'sr-only' }, ok ? 'Poprawnie' : 'Niepoprawnie')),
              h('span', { class: 'review__q' }, `${i + 1}. ${item.text}`)),
            h('div', { class: 'review__body' },
              h('p', null, h('strong', null, 'Twoja odpowiedź: '),
                chosen == null ? 'brak' : `${LETTERS[chosen]}. ${item.options[chosen]}`),
              !ok && h('p', null, h('strong', null, 'Poprawna odpowiedź: '),
                `${LETTERS[item.correct]}. ${item.options[item.correct]}`),
              h('p', { class: 'review__why' }, item.why))));
      }));

    return h('div', { class: 'stack' },
      h('section', { class: `card result${passed ? ' result--pass' : ''}`, 'aria-label': 'Wynik' },
        h('h2', { class: 'result__title', tabindex: '-1', 'data-focus': '' }, headline),
        h('p', { class: 'result__score' }, `${correct} / ${total}`),
        progressBar(ratio * 100, 'Wynik quizu'),
        h('p', { class: 'screen-lead' }, message)),
      h('section', { 'aria-label': 'Przegląd odpowiedzi' },
        h('h2', { class: 'section-title' }, 'Przegląd odpowiedzi'),
        review),
      h('div', { class: 'quiz-actions' },
        h('button', { class: 'btn btn--secondary', type: 'button', onClick: startAttempt }, 'Spróbuj ponownie'),
        h('a', { class: 'btn', href: back.href }, `Wróć: ${back.label.toLowerCase()}`, icon('chevronRight', 20))));
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
