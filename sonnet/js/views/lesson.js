import { h, mount } from '../dom.js';
import { getState } from '../store.js';
import { getLesson } from '../data/course.js';
import { isLessonDone, setLessonDone, visit } from '../logic/progress.js';
import { screen, screenHead, backLink, badge, placeholderLines } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { emptyState } from '../ui/states.js';

export default function lessonView({ moduleId, lessonId }) {
  const found = getLesson(moduleId, lessonId);
  if (!found) return missingLesson(moduleId);

  const { module, lesson, prev, next } = found;
  visit(module.id, lesson.id);

  const statusBadge = h('span', null);
  const doneButton = h('button', { class: 'btn btn--block', type: 'button', onClick: toggle });

  function sync() {
    const done = isLessonDone(getState(), lesson.id);
    mount(statusBadge, done ? badge('Ukończona', { accent: true }) : badge('Do zrobienia'));
    doneButton.className = `btn btn--block${done ? ' btn--secondary' : ''}`;
    mount(
      doneButton,
      done ? icon('check', 20) : null,
      done ? 'Ukończona — cofnij' : 'Oznacz jako ukończoną',
    );
  }

  function toggle() {
    setLessonDone(lesson.id, !isLessonDone(getState(), lesson.id));
    sync();
  }

  sync();

  const content = h('article', { class: 'card', 'aria-label': 'Treść lekcji' },
    placeholderLines('title'),
    placeholderLines('paragraph'),
    placeholderLines('paragraph'),
    h('p', { class: 'ph-note' }, 'Treść lekcji pojawi się tutaj.'));

  const pager = h('nav', { class: 'lesson-pager', 'aria-label': 'Nawigacja między lekcjami' },
    prev && h('a', { class: 'btn btn--secondary', href: `#/kurs/${module.id}/lekcja/${prev.id}` },
      icon('chevronLeft', 20), 'Poprzednia'),
    next
      ? h('a', { class: 'btn btn--secondary', href: `#/kurs/${module.id}/lekcja/${next.id}` },
          'Następna', icon('chevronRight', 20))
      : h('a', { class: 'btn btn--soft', href: `#/kurs/${module.id}/quiz` },
          'Przejdź do quizu', icon('chevronRight', 20)));

  return screen(
    backLink(`#/kurs/${module.id}`, `Moduł ${module.order}`),
    screenHead({ eyebrow: `Lekcja ${lesson.order} z ${module.lessons.length}`, title: lesson.title }),
    h('div', { class: 'lesson-meta' }, statusBadge, badge(`ok. ${lesson.minutes} min`)),
    content,
    doneButton,
    pager);
}

function missingLesson(moduleId) {
  return screen(
    backLink(moduleId ? `#/kurs/${moduleId}` : '#/kurs', 'Wróć'),
    emptyState({
      icon: 'alert',
      heading: 'h1',
      title: 'Nie ma takiej lekcji',
      text: 'Wróć do modułu i wybierz lekcję jeszcze raz.',
      action: { label: 'Wszystkie moduły', href: '#/kurs' },
    }));
}
