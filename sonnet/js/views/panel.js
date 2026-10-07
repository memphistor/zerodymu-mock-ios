import { h } from '../dom.js';
import { getState } from '../store.js';
import { EXAM } from '../data/course.js';
import { courseStats, nextUp } from '../logic/progress.js';
import { screen, screenHead, badge, plural } from '../ui/components.js';
import { icon } from '../ui/icons.js';
import { emptyState } from '../ui/states.js';

const DAY_MS = 24 * 60 * 60 * 1000;

export default function panelView() {
  const state = getState();
  const stats = courseStats(state);
  const { panel, profile } = state;

  const greeting = profile.displayName ? `Cześć, ${profile.displayName}!` : 'Cześć!';

  const days = panel.smokeFreeSince
    ? Math.max(0, Math.floor((Date.now() - Date.parse(panel.smokeFreeSince)) / DAY_MS))
    : null;

  const statGrid = h('div', { class: 'stat-grid' },
    h('section', { class: 'card stat', 'aria-label': 'Dni bez dymu' },
      h('p', { class: 'stat__label' }, 'Dni bez dymu'),
      h('p', { class: 'stat__value' }, days === null ? '—' : String(days)),
      h('p', { class: 'stat__hint' },
        days === null ? 'Licznik pojawi się wkrótce' : plural(days, 'dzień', 'dni', 'dni'))),
    h('section', { class: 'card stat', 'aria-label': 'Postęp kursu' },
      h('p', { class: 'stat__label' }, 'Postęp kursu'),
      h('p', { class: 'stat__value' }, `${stats.percent}%`),
      h('p', { class: 'stat__hint' }, `${stats.lessonsDone} z ${stats.lessonsTotal} lekcji`)));

  return screen(
    screenHead({ eyebrow: greeting, title: 'Panel', lead: 'Twoje liczby i nawyki w jednym miejscu.' }),
    statGrid,
    continueCard(state),
    habitsCard(panel.habits),
    journalCard(panel.journal));
}

/** Karta „następny krok” — prowadzi do pierwszej niezaliczonej lekcji, quizu modułu lub egzaminu. */
function continueCard(state) {
  const next = nextUp(state);
  const started = courseStats(state).lessonsDone > 0 || state.progress.lastVisited !== null;

  let href = '#/kurs';
  let eyebrow = 'Kurs';
  let title = 'Kurs ukończony';
  let meta = 'Gratulacje! Do lekcji możesz wracać, kiedy chcesz.';
  let iconName = 'trophy';

  if (next && next.kind === 'lesson') {
    href = `#/kurs/${next.module.id}/lekcja/${next.lesson.id}`;
    eyebrow = started ? 'Następna lekcja' : 'Start';
    title = next.lesson.title;
    meta = `Moduł ${next.module.order} · ok. ${next.lesson.minutes} min`;
    iconName = 'book';
  } else if (next && next.kind === 'module-quiz') {
    href = `#/kurs/${next.module.id}/quiz`;
    eyebrow = 'Następny krok';
    title = next.module.quiz.title;
    meta = `Moduł ${next.module.order} · ${next.module.quiz.questions.length} pytań`;
    iconName = 'quiz';
  } else if (next && next.kind === 'exam') {
    href = '#/kurs/egzamin';
    eyebrow = 'Następny krok';
    title = EXAM.title;
    meta = `${EXAM.questions.length} pytań z całego kursu`;
    iconName = 'trophy';
  }

  return h('a', { class: 'card card--link', href },
    h('span', { class: 'module-card__num', 'aria-hidden': 'true' }, icon(iconName, 22)),
    h('span', { class: 'module-card__body' },
      h('span', { class: 'eyebrow' }, eyebrow),
      h('span', { class: 'module-card__title' }, title),
      h('span', { class: 'module-card__summary' }, meta)),
    h('span', { class: 'module-card__chevron' }, icon('chevronRight', 20)));
}

function habitsCard(habits) {
  const body = habits.length === 0
    ? emptyState({
        compact: true,
        icon: 'leaf',
        title: 'Brak nawyków',
        text: 'Tu pojawią się Twoje codzienne nawyki. Dodawanie będzie dostępne wkrótce.',
        action: { label: 'Przejdź do kursu', href: '#/kurs' },
      })
    : h('ul', { class: 'row-list' },
        habits.map((habit) => h('li', { class: 'row' }, h('span', { class: 'row__title' }, habit.name))));

  return h('section', { class: 'card', 'aria-label': 'Nawyki' },
    h('div', { class: 'card__head' },
      h('h2', { class: 'card__title' }, 'Nawyki'),
      badge(String(habits.length))),
    body);
}

function journalCard(entries) {
  const body = entries.length === 0
    ? emptyState({
        compact: true,
        icon: 'journal',
        title: 'Brak wpisów',
        text: 'Krótkie notatki o tym, jak się czujesz, zapiszą się tutaj.',
      })
    : h('p', { class: 'screen-lead' },
        `${entries.length} ${plural(entries.length, 'wpis', 'wpisy', 'wpisów')}`);

  return h('section', { class: 'card', 'aria-label': 'Dziennik' },
    h('div', { class: 'card__head' },
      h('h2', { class: 'card__title' }, 'Dziennik'),
      badge(String(entries.length))),
    body);
}
