/**
 * Cienka, bezpieczna warstwa nad localStorage.
 * Nigdy nie rzuca wyjątków — w trybie prywatnym lub przy pełnej pamięci
 * zwraca `{ ok: false }`, a aplikacja dalej działa (bez trwałego zapisu).
 */

const PREFIX = "zerodymu-deepseek-v1:";

export const STORAGE_KEY = `${PREFIX}state`;

export function readJson(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return { ok: true, value: null };
    return { ok: true, value: JSON.parse(raw) };
  } catch (error) {
    return { ok: false, value: null, error };
  }
}

export function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

export function removeKey(key) {
  try {
    window.localStorage.removeItem(key);
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

export function clearAll() {
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(PREFIX)) keys.push(key);
    }
    keys.forEach((key) => window.localStorage.removeItem(key));
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

/** Czy localStorage jest w ogóle dostępny (np. tryb prywatny Safari). */
export function isPersistent() {
  try {
    const probe = `${PREFIX}probe`;
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}
