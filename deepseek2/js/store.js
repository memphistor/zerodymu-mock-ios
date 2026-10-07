/**
 * Magazyn stanu aplikacji: jedno źródło prawdy w pamięci, zapis do localStorage
 * po każdej zmianie.
 *
 * status.persistent — false, gdy localStorage jest niedostępny (zmiany żyją do
 *                     zamknięcia karty); aplikacja pokazuje wtedy dyskretny baner
 * status.recovered  — true, gdy zapisane dane były uszkodzone i zaczęliśmy od
 *                     zera (surowa kopia trafia do klucza `<STORAGE_KEY>:backup`)
 */

import { STORAGE_KEY, createDefaultState, normalizeState } from './model.js';
import { readItem, writeItem, removeItem } from './storage.js';

const BACKUP_KEY = `${STORAGE_KEY}:backup`;

let state = createDefaultState();
const status = { persistent: true, recovered: false };
const listeners = new Set();

export function init() {
  const result = readItem(STORAGE_KEY);

  if (!result.ok) {
    // Brak dostępu do localStorage — pracujemy w pamięci.
    status.persistent = false;
    state = createDefaultState();
    return;
  }

  if (result.value == null) {
    state = createDefaultState();
    persist();
    return;
  }

  try {
    const parsed = JSON.parse(result.value);
    state = normalizeState(parsed);
    // Zapisz zmigrowany/normalny stan (np. po podniesieniu wersji schematu).
    if (!parsed || parsed.schemaVersion !== state.schemaVersion) persist();
  } catch {
    writeItem(BACKUP_KEY, result.value);
    status.recovered = true;
    state = createDefaultState();
    persist();
  }
}

export const getState = () => state;
export const getStatus = () => ({ ...status });

/** Zmienia stan przez mutację kopii, normalizuje, zapisuje i powiadamia subskrybentów. */
export function update(mutator) {
  const draft = JSON.parse(JSON.stringify(state));
  mutator(draft);
  state = normalizeState(draft);
  persist();
  notify();
  return state;
}

/** Czyści wszystkie dane aplikacji i wraca do ustawień początkowych. */
export function reset() {
  removeItem(STORAGE_KEY);
  removeItem(BACKUP_KEY);
  status.recovered = false;
  state = createDefaultState();
  persist();
  notify();
}

export function dismissRecovered() {
  status.recovered = false;
  notify();
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function persist() {
  const result = writeItem(STORAGE_KEY, JSON.stringify(state));
  status.persistent = result.ok;
}

function notify() {
  for (const listener of listeners) listener(state);
}
