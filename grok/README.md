# ZeroDymu — prototyp Grok

Statyczny mock kursu ZeroDymu (mobile-first, UI po polsku). Kod tylko w tym folderze. Kursant od pierwszej lekcji, bez paywalla.

## Uruchomienie lokalne

1. Terminal w folderze `Grok/`:
   ```bash
   python3 -m http.server 8777
   ```
2. Otwórz `http://localhost:8777/` (nie `file://` — moduły ES i `localStorage`).
3. DevTools → tryb urządzenia (np. iPhone).

## Zakładki

- **Kurs** — 6 modułów (placeholdery), ekrany modułu / lekcji / quizu (sam układ)
- **Panel** — szkic liczb (puste wartości) i pusty stan nawyków
- **Ustawienia** — motyw jasny / ciemny / systemowy, reset danych, podgląd błędu odczytu

Dane: `localStorage` pod kluczem `zerodymu-grok-v1`.

Szkic modelu:

- `settings.theme` — `light` | `dark` | `system`
- `progress.lessons` — mapa `modul/lekcja` → `{ openedAt }`
- `panel` — `habits` (pusta lista), `streakDays`, `cigarettesAvoided`, `savedPln` (na razie `null`)

Wejście w lekcję zapisuje ją jako otwartą. Reset w Ustawieniach wraca do pustego szkicu.

## Publikacja (GitHub Pages)

**Repo:** [memphistor/zerodymu-mock-ios](https://github.com/memphistor/zerodymu-mock-ios)

Strategia ustalona przy pierwszym deployu (Sonnet) — bez zmiany:

| Element | Wartość |
|--------|---------|
| Branch | `main` |
| Źródło Pages | Settings → Pages → **Deploy from a branch** → `main` → folder **`/ (root)`** |
| Workflow Actions | Brak. Statyczny HTML, bez bundlera — osobny workflow nic nie buduje. |
| Warianty | Podkatalogi `composer/`, `sonnet/`, `grok/` |
| Wariant Grok | Katalog **`grok/`** |
| Jekyll | `.nojekyll` w `grok/` oraz w korzeniu repo Pages |
| Wejście z głównego URL | `index.html` w korzeniu dalej otwiera `sonnet/` |

**Link live (Grok):**  
https://memphistor.github.io/zerodymu-mock-ios/grok/

**Sync po zmianach w `Grok/`:** skopiuj zawartość tego folderu do `grok/` w repo Pages, commit + push na `main`. Pages odświeża się zwykle w 1–2 minuty.

Ścieżki assetów są względne (`./css/...`, `./js/...`), żeby działały pod podkatalogiem `/grok/`.
