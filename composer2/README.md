# ZeroDymu — prototyp Composer v2

Statyczny mock kursu ZeroDymu (mobile-first, UI po polsku). Kod tylko w tym folderze.

## Uruchomienie lokalne

1. Terminal w folderze `Composer v2/`:
   ```bash
   python3 -m http.server 8765
   ```
2. Otwórz `http://localhost:8765/` (nie `file://` — moduły ES i storage).
3. DevTools → tryb urządzenia (np. iPhone).

## Zakładki

- **Kurs** — 6 modułów (Kaizen, Ikigai, małe kroki), 20 lekcji z treścią; quiz lekcyjny (3× A–D), quiz modułowy (5), egzamin (10)
- **Panel** — szkic danych + pusty stan nawyków
- **Ustawienia** — motyw jasny / ciemny / systemowy, reset demo

Dane: `localStorage` pod kluczem `zerodymu-sonnet-v1` (nazwa historyczna).

### Krok 2 — treść; locki w kroku 3

Moduły i lekcje mogą pokazywać **🔒 Podgląd** (wizualna informacja o kolejności). W kroku 2 **wszystko jest klikalne** — pełna logika blokowania przyjdzie w kroku 3 (`js/logic/locks.js`, tryb `visual-only`).

## Publikacja (GitHub Pages)

**Repo:** [memphistor/zerodymu-mock-ios](https://github.com/memphistor/zerodymu-mock-ios)

| Element | Wartość |
|--------|---------|
| Branch | `main`, folder `/ (root)` |
| **Stary mock (v1)** | Korzeń: `https://memphistor.github.io/zerodymu-mock-ios/` — sync z `Testy/Composer/` |
| **Composer v2 (ten folder)** | `https://memphistor.github.io/zerodymu-mock-ios/composer2/` — sync z `Testy/Composer v2/` → `composer2/` w repo Pages |
| Jekyll | `.nojekyll` w korzeniu i w `composer2/` |

**Link live (Composer v2):**  
https://memphistor.github.io/zerodymu-mock-ios/composer2/

**Sync:** skopiuj zawartość **`Composer v2/`** do `composer2/` w repo Pages, commit + push, odczekaj ~1–2 min.

## Reset demo

Ustawienia → **Reset** lub usuń klucz `zerodymu-sonnet-v1` w localStorage.
