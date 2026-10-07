# zerodymu-mock-ios

Hosting statycznych mocków ZeroDymu na **GitHub Pages**.

## GitHub Pages

| Ustawienie | Wartość |
|------------|---------|
| Branch | `main` |
| Folder | `/ (root)` |
| URL | https://memphistor.github.io/zerodymu-mock-ios/ |

Korzeń (`index.html`) przekierowuje do aktywnego wariantu **Sonnet**.

## Warianty

| Folder | Opis | URL |
|--------|------|-----|
| `sonnet/` | Prototyp z repo Testy (`Sonnet/`) | [/sonnet/](https://memphistor.github.io/zerodymu-mock-ios/sonnet/) |
| `composer/` | Wcześniejszy mock (archiwum w repo) | [/composer/](https://memphistor.github.io/zerodymu-mock-ios/composer/) |

Pliki `.nojekyll` wyłączają Jekyll.

## Deploy

Po zmianach w lokalnym folderze `Sonnet/` (repo Testy): skopiuj zawartość do `sonnet/` tutaj, commit + push na `main`. Pages odświeża się zwykle w 1–2 minuty.

Szczegóły uruchomienia lokalnego: `sonnet/README.md` (kopia z Testy).
