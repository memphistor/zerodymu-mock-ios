/**
 * Bezpieczny dostęp do localStorage.
 *
 * Aplikacja musi działać także wtedy, gdy localStorage jest zablokowany
 * (tryb prywatny, wyłączone ciasteczka). Każda funkcja zwraca wynik zamiast
 * rzucać wyjątkiem, a `store.js` zamienia brak dostępu na pracę w pamięci.
 */

/** Czy localStorage jest w ogóle dostępny (test zapisu). */
export function isAvailable() {
  try {
    const probe = '__zerodymu_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

/**
 * @returns {{ ok: true, value: string|null } | { ok: false, value: null }}
 *   `ok: false` — brak dostępu; `value: null` — brak zapisanego klucza.
 */
export function readItem(key) {
  try {
    return { ok: true, value: window.localStorage.getItem(key) };
  } catch {
    return { ok: false, value: null };
  }
}

/** @returns {{ ok: boolean }} */
export function writeItem(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

/** @returns {{ ok: boolean }} */
export function removeItem(key) {
  try {
    window.localStorage.removeItem(key);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
