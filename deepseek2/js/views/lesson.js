/**
 * Ekran lekcji: pigułka wiedzy, spis treści, sekcje z treścią (albo placeholder),
 * oznaczenie ukończenia i wejście w quiz lekcji.
 *
 * Krok 2: moduł 1 renderuje prawdziwe sekcje (js/ui/prose.js), moduły 2–6 pokazują
 * szkic struktury z notką „treść wkrótce".
 */

import { h } from '../dom.js';
import { getModule, getLesson, lessonQuizId } from '../data/course.js';
import { isLessonComplete, isQuizPassed, toggleLesson, rememberVisit } from '../logic/progress.js';
import { lessonQuizLock, lessonLock } from '../logic/locks.js';
import { refresh } from '../router.js';
import { renderBody } from '../ui/prose.js';
import {
  screenHeader, card, button, pill, badge, lockBadge, comingSoonCard,
} from '../ui/components.js';
import { emptyState } from '../ui/states.js';
import { icon } from '../ui/icons.js';

const QUIZ_PASSED_RATIO = 0.66;

export default function lessonView({ moduleId, lessonId }) {
  const module = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);

  if (!module || !lesson) {
    return emptyState({
      icon: 'alert',
      heading: 'h1',
      title: 'Nie ma takiej lekcji',
      text: 'Ten adres nie prowadzi do żadnej lekcji.',
      action: { href: '#/kurs', label: 'Wróć do kursu' },
    });
  }

  const index = module.lessons.indexOf(lesson) + 1;
  const done = isLessonComplete(lesson.id);
  const ready = !lesson.placeholder;
  const quizPassed = isQuizPassed(lessonQuizId(lesson.id), QUIZ_PASSED_RATIO);
  const nextLesson = module.lessons[index] || null;
  const lock = lessonLock(module.id, lesson.id);
  const quizLock = lessonQuizLock(module.id, lesson.id);

  rememberVisit(module.id, lesson.id);

  return h('div', { class: 'stack stack--lg' },
    screenHeader({
      back: { href: `#/kurs/${module.id}`, label: `Moduł ${module.number}: ${module.title}` },
      eyebrow: `Lekcja ${index} z ${module.lessons.length}`,
      title: lesson.title,
      aside: done ? badge('Ukończona', 'success', 'check') : (!ready ? badge('Wkrótce', 'soon') : lockBadge(lock)),
    }),

    h('div', { class: 'lesson-meta' },
      badge(`${lesson.minutes} min`, 'neutral', 'play'),
      ready && badge(`${lesson.sections.length} sekcje`, 'neutral', 'doc'),
      done && badge('Zrobione', 'success', 'check')),

    pill(lesson.pill),

    ready && toc(lesson),

    ready
      ? h('div', { class: 'prose-stack' }, lesson.sections.map(lessonSection))
      : comingSoonCard('Ta lekcja ma na razie tylko tytuł i pigułkę. Pełna treść pojawi się w kolejnym kroku.'),

    h('div', { class: 'lesson-actions' },
      done
        ? h('div', { class: 'lesson-done' }, icon('check', 20), 'Oznaczono jako ukończoną')
        : button({
            label: 'Oznacz jako ukończoną',
            variant: 'primary',
            icon: 'check',
            block: true,
            onClick: () => {
              toggleLesson(lesson.id);
              refresh({ keepScroll: true });
            },
          }),
      done && button({
        label: 'Cofnij ukończenie',
        variant: 'ghost',
        block: true,
        onClick: () => {
          toggleLesson(lesson.id);
          refresh({ keepScroll: true });
        },
      }),
      h('div', { class: `lesson-quiz-entry${quizLock.locked ? ' is-locked' : ''}` },
        button({
          label: quizPassed ? 'Powtórz quiz lekcji' : 'Rozwiąż quiz lekcji',
          variant: 'soft',
          icon: 'target',
          block: true,
          href: `#/kurs/${module.id}/lekcja/${lesson.id}/quiz`,
        }),
        quizLock.locked && h('p', { class: 'lesson-quiz-entry__hint' },
          icon('lock', 14), ` ${quizLock.reason} (krok 2: quiz i tak się otworzy)`)),
      nextLesson && button({
        label: `Następna: ${nextLesson.title}`,
        variant: 'ghost',
        icon: 'arrow',
        block: true,
        href: `#/kurs/${module.id}/lekcja/${nextLesson.id}`,
      })));
}

function toc(lesson) {
  return card({ tone: 'soft' },
    h('p', { class: 'eyebrow', style: { marginBottom: '0.5rem' } }, 'W tej lekcji'),
    h('ul', { class: 'toc' }, lesson.sections.map((sectionData, i) => h('li', {},
      h('span', { class: 'row' },
        h('span', { class: 'lesson-section__num' }, String(i + 1)),
        sectionData.title)))));
}

function lessonSection(sectionData, index) {
  return h('article', { class: 'lesson-section' },
    h('h2', { class: 'lesson-section__title' },
      h('span', { class: 'lesson-section__num' }, String(index + 1)),
      sectionData.title),
    renderBody(sectionData.body || []));
}
