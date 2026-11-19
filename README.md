# Adventskalender 2026 – Wichtelschule

Der neue Kalender liegt direkt in der Repository-Wurzel. Die Tagesrätsel sind übersichtlich getrennt:

```text
index.html                 Kalenderübersicht
style.css                  gemeinsames Design
app.js                     gemeinsame Wichtel- und Fortschrittsfunktionen
qr-codes.html              QR-Codes zum Ausdrucken
 day1.html … day24.html    Weiterleitungen für kurze/alte Tages-URLs
days/
  01/
    index.html              Seite für Tag 1
    puzzle.js               Rätsel und Verhalten nur für Tag 1
  02/
    index.html
    puzzle.js
  …
  24/
    index.html
    puzzle.js
```

### Einen Tag bearbeiten

Öffne zum Beispiel `days/08/puzzle.js`, um nur das Rätsel für den 8. Dezember zu bearbeiten. `days/08/index.html` enthält die Seitenstruktur. Gemeinsame Gestaltung und Funktionen liegen in `style.css` und `app.js`.

Die Wurzel-Adressen `day1.html` bis `day24.html` leiten auf die jeweiligen Tagesordner weiter. So bleiben QR-Codes, die auf diese URLs zeigen, weiterhin verwendbar.

### Hinweis zum Stand

Tag 1 enthält die Wichtel-Ankleide. Die Rätsel für die übrigen Tage sind als einzeln editierbare Entwürfe/Platzhalter vorbereitet und können nach und nach mit den gemeinsam festgelegten Aufgaben gefüllt werden.

Die persönliche Wichtel-Auswahl und der Fortschritt werden lokal im Browser gespeichert. GitHub Pages kann unter **Settings → Pages** veröffentlicht werden.
