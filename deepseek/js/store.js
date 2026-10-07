/**
 * Stan aplikacji: odczyt z localStorage, subskrypcje i zapis.
 * Adapter (storage) jest wstrzykiwany, więc tryb awarii pamięci
 * (np. Safari prywatne) daje ten sam interfejs API.
 */

import { readJson, writeJson, removeKey, isPersistent, STORAGE_KEY } from "./storage.js";
import { createDefaultState, migrate, patchState } from "./model.js";

// Re-eksport klucza zapisu — widoki korzystają wyłącznie z tego modułu.
export { STORAGE_KEY };

let state = createDefaultState();
let persistent = true;
let adapterError = null;
const listeners = new Set();

function buildAdapter() {
  persistent = isPersistent();
  return { readJson, writeJson, removeKey, persistent };
}

export const storage = buildAdapter();

/* --- Odczyt --- */

export function getState() {
  return state;
}

export function getAdapterInfo() {
  return { persistent, error: adapterError };
}

/* --- Subskrypcje --- */

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  for (const fn of listeners) fn(state);
}

/* --- Zapis --- */

function persist() {
  const result = storage.writeJson(STORAGE_KEY, state);
  if (!result.ok) adapterError = result.error ?? new Error("Zapis nie powiódł się.");
  notify();
}

/** Ładuje stan z pamięci; zwraca false, jeśli musiał użyć domyślnego. */
export function load() {
  storage.persistent = isPersistent();
  const result = storage.readJson(STORAGE_KEY);
  if (result.ok && result.value) {
    state = migrate(result.value);
    adapterError = null;
    return true;
  }
  if (!result.ok) adapterError = result.error ?? null;
  state = migrate(createDefaultState());
  return false;
}

/** Pierwsze uruchomienie: stemplujemy createdAt i start kursu. */
export function ensureStarted() {
  if (!state.progress.startedAt) {
    patch({ progress: { startedAt: new Date().toISOString() } });
  }
}

/** Częściowa aktualizacja całego drzewa stanu. Scala z bieżącym stanem,
 *  więc zagnieżdżone obiekty nie są resetowane do wartości domyślnych. */
export function patch(partial) {
  state = patchState(state, partial);
  persist();
}

/** Wygodne skróty dla konkretnych sekcji. */
export function updateSettings(partial) {
  patch({ settings: { ...state.settings, ...partial } });
}

export function updatePanel(partial) {
  patch({ panel: { ...state.panel, ...partial } });
}

export function updateProgress(partial) {
  patch({ progress: { ...state.progress, ...partial } });
}

export function rememberVisit(path) {
  if (state.progress.lastVisited === path) return;
  patch({ progress: { lastVisited: path } });
}

export function resetDemo() {
  state = migrate(createDefaultState());
  storage.removeKey(STORAGE_KEY);
  persist();
}
