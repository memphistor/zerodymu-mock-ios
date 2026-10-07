/**
 * Router oparty o hash (#/kurs, #/panel, …) — działa w podkatalogu GitHub Pages
 * bez żadnej konfiguracji serwera. Ekrany są ładowane leniwie przez import(),
 * dzięki czemu stan ładowania i błąd sieci są prawdziwe, a nie udawane.
 *
 * Moduł widoku eksportuje `default (params) => Node | Promise<Node>`.
 */

import { mount } from './dom.js';
import { loadingState, errorState } from './ui/states.js';

// Kolejność ma znaczenie: segmenty stałe muszą być przed wzorcami z parametrem.
const ROUTES = [
  { pattern: '/kurs', tab: 'kurs', load: () => import('./views/course.js') },
  { pattern: '/kurs/egzamin', tab: 'kurs', props: { kind: 'exam' }, load: () => import('./views/quiz.js') },
  { pattern: '/kurs/:moduleId', tab: 'kurs', load: () => import('./views/module.js') },
  { pattern: '/kurs/:moduleId/lekcja/:lessonId', tab: 'kurs', load: () => import('./views/lesson.js') },
  { pattern: '/kurs/:moduleId/lekcja/:lessonId/quiz', tab: 'kurs', props: { kind: 'lesson' }, load: () => import('./views/quiz.js') },
  { pattern: '/kurs/:moduleId/quiz', tab: 'kurs', props: { kind: 'module' }, load: () => import('./views/quiz.js') },
  { pattern: '/panel', tab: 'panel', load: () => import('./views/panel.js') },
  { pattern: '/ustawienia', tab: 'ustawienia', load: () => import('./views/settings.js') },
  { pattern: '/ustawienia/stany', tab: 'ustawienia', load: () => import('./views/states-demo.js') },
];

const DEFAULT_PATH = '/kurs';
const LOADING_DELAY_MS = 120;

let root = null;
let renderToken = 0;

export function startRouter(rootElement) {
  root = rootElement;
  window.addEventListener('hashchange', () => render({ moveFocus: true }));
  const tabbar = document.querySelector('.tabbar');
  if (tabbar) tabbar.addEventListener('click', onTabClick);
  render({ moveFocus: false });
}

/** Ponownie renderuje bieżący ekran (np. po resecie danych w Ustawieniach). */
export function refresh({ keepScroll = true } = {}) {
  return render({ moveFocus: false, keepScroll });
}

export function go(path) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`;
}

function currentPath() {
  const hash = window.location.hash.replace(/^#/, '');
  const path = hash.split('?')[0].replace(/\/+$/, '');
  if (path === '') return '';
  return path.startsWith('/') ? path : `/${path}`;
}

function match(path) {
  const segments = path.split('/').filter(Boolean);
  for (const route of ROUTES) {
    const pattern = route.pattern.split('/').filter(Boolean);
    if (pattern.length !== segments.length) continue;
    const params = {};
    const ok = pattern.every((part, i) => {
      if (part.startsWith(':')) {
        try {
          params[part.slice(1)] = decodeURIComponent(segments[i]);
        } catch {
          return false;
        }
        return true;
      }
      return part === segments[i];
    });
    if (ok) return { route, params: { ...route.props, ...params } };
  }
  return null;
}

function setActiveTab(tab) {
  for (const link of document.querySelectorAll('.tab')) {
    const active = link.dataset.tab === tab;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
}

/** Klik w zakładkę, w której już jesteśmy, przewija na górę zamiast przeładowywać. */
function onTabClick(event) {
  const link = event.target.closest('.tab');
  if (link && link.getAttribute('href') === window.location.hash) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

async function render({ moveFocus, keepScroll = false }) {
  let path = currentPath();
  if (path === '') {
    window.history.replaceState(null, '', `#${DEFAULT_PATH}`);
    path = DEFAULT_PATH;
  }

  const token = ++renderToken;
  const found = match(path);
  setActiveTab(found ? found.route.tab : null);

  const loadingTimer = window.setTimeout(() => {
    if (token === renderToken) mount(root, loadingState());
  }, LOADING_DELAY_MS);

  let node;
  try {
    if (found) {
      const view = await found.route.load();
      node = await view.default(found.params);
    } else {
      node = notFound();
    }
  } catch (error) {
    console.error(error);
    node = errorState({
      title: 'Nie udało się wczytać ekranu',
      text: 'Sprawdź połączenie z internetem i spróbuj ponownie.',
      detail: error && error.message,
      // Przeglądarki cache'ują nieudany import() do końca życia strony, więc samo
      // ponowne wywołanie nic nie da. Przeładowanie zachowuje trasę (hash) i dane (localStorage).
      onRetry: () => window.location.reload(),
    });
  } finally {
    window.clearTimeout(loadingTimer);
  }

  if (token !== renderToken) return; // użytkownik zdążył przejść gdzie indziej

  const scrollY = keepScroll ? window.scrollY : 0;
  mount(root, node);
  window.scrollTo(0, scrollY);
  syncDocument(moveFocus);
}

function syncDocument(moveFocus) {
  const heading = root.querySelector('h1');
  const title = heading ? heading.textContent.trim() : '';
  document.title = title && title !== 'ZeroDymu' ? `${title} · ZeroDymu` : 'ZeroDymu';
  if (moveFocus) (heading || root).focus({ preventScroll: true });
}

function notFound() {
  return errorState({
    title: 'Nie znaleziono ekranu',
    text: 'Ten adres nie prowadzi do żadnego miejsca w aplikacji.',
    retryLabel: 'Wróć do kursu',
    onRetry: () => go('/kurs'),
  });
}
