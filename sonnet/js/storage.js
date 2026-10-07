/**
 * Cienka warstwa nad localStorage. Nigdy nie rzuca wyjątków:
 * w trybie prywatnym / przy pełnej pamięci zwraca { ok: false }.
 */

export function readItem(key) {
  try {
    return { ok: true, value: window.localStorage.getItem(key) };
  } catch (error) {
    return { ok: false, value: null, error };
  }
}

export function writeItem(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

export function removeItem(key) {
  try {
    window.localStorage.removeItem(key);
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}
