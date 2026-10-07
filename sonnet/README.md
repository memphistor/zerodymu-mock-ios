# ZeroDymu — prototyp Sonnet

Statyczny mock kursu ZeroDymu (mobile-first, UI po polsku). Kod tylko w tym folderze.

## Uruchomienie lokalne

1. Terminal w folderze `Sonnet/`:
   ```bash
   python3 -m http.server 8765
   ```
2. Otwórz `http://localhost:8765/` (nie `file://` — moduły ES i storage).
3. DevTools → tryb urządzenia (np. iPhone).

## Zakładki

- **Kurs** — 6 modułów (placeholdery), ekrany modułu / lekcji / quizu (layout)
- **Panel** — szkic danych + pusty stan nawyków
- **Ustawienia** — motyw jasny / ciemny / systemowy, reset demo

Dane: `localStorage` pod kluczem `zerodymu-sonnet-v1`.

## Publikacja (GitHub Pages)

**Repo:** [memphistor/zerodymu-mock-ios](https://github.com/memphistor/zerodymu-mock-ios)

| Element | Strategia (krok 1 — nie zmieniać bez powodu) |
|--------|-----------------------------------------------|
| Branch | `main` |
| Źródło Pages | Settings → Pages → **Deploy from branch** → `main` → folder **`/ (root)`** |
| Wariant Sonnet | Katalog **`sonnet/`** w repo Pages (równolegle z przyszłymi `composer/`, `grok/`) |
| Wejście z głównego URL | `index.html` w korzeniu przekierowuje na `sonnet/` |
| Jekyll | `.nojekyll` w `sonnet/` (i w korzeniu) |

**Link live (Sonnet):**  
https://memphistor.github.io/zerodymu-mock-ios/sonnet/

**Sync po zmianach w `Sonnet/`:** skopiuj zawartość tego folderu do `sonnet/` w repo Pages, commit + push na `main`, odczekaj ~1–2 min.

Opcjonalnie można dodać workflow GitHub Actions — na razie deploy ręczny/sync z folderu źródłowego (prosty statyczny HTML).

## Reset demo

Ustawienia → **Reset** lub usuń klucz `zerodymu-sonnet-v1` w localStorage.
