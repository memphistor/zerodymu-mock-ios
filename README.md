# zerodymu-mock-ios

Hosting statycznych mocków ZeroDymu na **GitHub Pages**.

## GitHub Pages

| Ustawienie | Wartość |
|------------|---------|
| Branch | `main` |
| Folder | `/ (root)` |
| Przekierowanie | Brak |

| Adres | Co widać |
|--------|----------|
| https://memphistor.github.io/zerodymu-mock-ios/ | Stara wersja (mock Composer), serwowana wprost z korzenia |
| https://memphistor.github.io/zerodymu-mock-ios/sonnet/ | Bieżący prototyp z folderu `Grok/` w repo Testy |
| https://memphistor.github.io/zerodymu-mock-ios/composer/ | Ta sama stara wersja, kopia w podkatalogu |
| https://memphistor.github.io/zerodymu-mock-ios/grok/ | Ta sama treść co `sonnet/` |

Źródło: Settings → Pages → **Deploy from a branch** → `main` → `/ (root)`. Bez workflow Actions. Pliki `.nojekyll` wyłączają Jekyll.

## Deploy

- Stara wersja w korzeniu to kopia `composer/` (`index.html`, `css/`, `js/`).
- Po zmianach w `Grok/` (repo Testy) skopiuj ten folder do `sonnet/` (i `grok/`), commit + push na `main`.
