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

- **Kurs** — 6 modułów (Kaizen, Ikigai, rzucanie palenia małymi krokami). Moduł 1 ma cztery bogatsze lekcje, moduły 2–6 po trzy krótsze, kompletne. Na liście widać status i pasek postępu.
- **Lekcja** — spis treści, pigułka, sekcje, wejście w quiz.
- **Quiz lekcji** — 3 pytania A–D i wyjaśnienie. **Quiz modułu** — 5 pytań. **Egzamin** — 10 pytań, z listy kursu.
- **Panel** — szkic liczb i pusty stan nawyków; widać liczbę zaliczonych lekcji.
- **Ustawienia** — motyw jasny / ciemny / systemowy, reset danych.

Krok 2 — treść. Locki są wizualne (kłódka „Podgląd blokady” na liście, gdy poprzedni quiz nie jest zaliczony). Wejście zostaje otwarte. Pełna logika blokad w kroku 3.

Próg zaliczenia: lekcja 2/3, moduł 4/5, egzamin 7/10. Wynik zapisuje się lokalnie i gasi kłódkę następnego elementu.

Dane: `localStorage` pod kluczem `zerodymu-grok-v1`.

- `settings.theme` — `light` | `dark` | `system`
- `progress.lessons` — `modul/lekcja` → `{ openedAt }`
- `progress.quizzes` — `lekcja:…`, `modul:…`, `egzamin` → `{ correct, total, passed, at }`
- `panel` — `habits` (pusta lista), `streakDays`, `cigarettesAvoided`, `savedPln` (na razie `null`)

Reset w Ustawieniach wraca do pustego szkicu.

## Publikacja (GitHub Pages)

**Repo:** [memphistor/zerodymu-mock-ios](https://github.com/memphistor/zerodymu-mock-ios)

| Element | Wartość |
|--------|---------|
| Branch | `main` |
| Źródło Pages | Settings → Pages → **Deploy from a branch** → `main` → folder **`/ (root)`** |
| Workflow Actions | Brak. Statyczny HTML, bez bundlera. |
| Korzeń | Stara wersja (mock Composer) serwowana wprost. **Bez przekierowania.** |
| Ten prototyp | Katalog **`grok/`** |
| Jekyll | `.nojekyll` w korzeniu i w `grok/` |

**Stara wersja:**  
https://memphistor.github.io/zerodymu-mock-ios/

**Ten prototyp:**  
https://memphistor.github.io/zerodymu-mock-ios/grok/

**Sync po zmianach w `Grok/`:** skopiuj zawartość tego folderu do `grok/` w repo Pages, commit + push na `main`. Pages odświeża się zwykle w 1–2 minuty.

Ścieżki assetów są względne (`./css/...`, `./js/...`), żeby działały pod `/grok/`.
