# ZeroDymu — mock iOS (HTML)

Mobilna mock-aplikacja kursu ZeroDymu: kurs z odblokowaniami, quizy, panel (papierosy, streak, nawyki, zdrowie, zniżka). Dane w `localStorage`.

## Uruchomienie

### Chrome (widok telefonu)

1. Otwórz folder `Composer` w terminalu.
2. `python3 -m http.server 8080`
3. Wejdź na `http://localhost:8080`
4. DevTools → urządzenie mobilne (np. iPhone 15 Pro).

> Przy samym `file://` część funkcji może działać, ale **zalecany jest prosty serwer HTTP** (ścieżki skryptów, clipboard).

### iPhone (iCloud / pliki)

Wrzuć cały folder `Composer` do iCloud Drive i otwórz `index.html` w Safari, albo opublikuj na **GitHub Pages** (patrz niżej).

### GitHub Pages

1. Utwórz repo z zawartością folderu `Composer` w katalogu głównym (wraz z `index.html`).
2. Settings → Pages → Source: branch `main`, folder `/ (root)`.
3. Adres: `https://<user>.github.io/<repo>/`

Plik `.nojekyll` jest już w projekcie (Jekyll off).

## Zakładki

- **Kurs** — moduły, lekcje, quizy, egzamin
- **Panel** — statystyki, tracker, streak, nawyki, zdrowie, osiągnięcia, zniżka
- **Ustawienia** — motyw, reset demo

## Reset

Ustawienia → „Reset danych demo” lub usuń klucz `zerodymu-mock-v1` w localStorage.
