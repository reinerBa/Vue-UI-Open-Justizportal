# Ein vue3-Frontend für das Open-Justizportal

Ein Frontend Fork mit Hilfe des EUPL-1.2 Codes des Open-Justizportal zum Wechsel des Progressive Javascript Frameworks von Angular auf Vue3. 

Der verwendete Original Quellcode stammt vom Oberverwaltungsgericht Rheinland-Pfalz, siehe unten.

Um dieses Frontend produktiv nutzen zu können werden auch die anderen Komponenten des Open-Justizportal benötigt.



## Entwicklung

1. Repository clonen

2. Abhängigkeiten laden: `cd jupo-webui && npm i`

3. vite global installieren falls noch nicht vorhanden, [link zur Anleitung](https://vitejs.dev/guide/) 

4. Entwicklungsserver starten `vite`

5. Um das Projekt zu bilden `npm run build`

6. Eigene Konfigurationsdateien und API-URLs müssen angepasst werden, siehe **Individualisierung**
   
   

# Individualisierung

Das Justizportal kann je nach betreibendem Bundesland angepasst werden. Hierfür sind folgende Anpassungen notwendig:

* Die Icon-Datei `src\jp-suite\apps\portal\src\favicon.ico` wird im Browser im Tab der Anwendung angezeigt, sie muss ausgetauscht werden gegen eine eigene favicon-Datei, dar sonst das Logo des Bundeslandes Rheinland-Pfalz gezeigt wird. 

* Die Bilddatei `src\jp-suite\apps\portal\src\assets\img\logo.png` enthält jenes Bild, welches links oben in der Anwendungen angezeigt wird. In Rheinland-Pfalz ist dies das Landeswappen. Dieses muss durch ein eigenes Bild ersetzet werden, welches 150x184 Pixel groß ist.

* Das Stylesheet zur Realisierung des Corporate Designs befindet sich unter `src\jp-suite\apps\portal\src\css\color-scheme.css` . Ohne Änderung der Datei-Inhalte wird das Corporate Design der Justiz Rheinland-Pfalz verwendet. 

* In der Konfigurationsdatei `src\jp-suite\apps\portal\src\assets\operator-config.json` werden die landesspezifischen Kontaktdaten, eine Begrüßungsformel und ein Pfad zum Inhalt der Datenschutzerklärung hinterlegt.

* Die Textdatei `src\jp-suite\apps\portal\src\assets\Datenschutzerklärung.html.txt` enthält den inneren HTML-Content der Datenschutzerklärung der Anwendung, er wird zur Laufzeigt nachgeladen. Fügen sie dort ihre Datenschutzerklärung, formatiert mit HTML-Tags, ein. Es können alle HTML-Tags verwendet werden aber keine Skript-Tags. Beispiel: 
  
  ```html
    <h2>Datenschutzerklärung</h2>
    <p>
      Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen. In diesen Datenschutzinformationen informieren wir Sie gemäß Artikel 13 und 14 der Datenschutz-Grundverordnung über Datenverarbeitung.
    </p>
    <strong>
      Identität des Verantwortlichen: Michael Müller
    </strong>
  ```



## Kontakt

**Für den Original Quellcode:**

Oberverwaltungsgericht Rheinland-Pfalz, Deinhardpassage 1, 56068 Koblenz 
poststelle(at)ovg.jm.rlp.de

# Lizenz

Copyright © 2019-2021 Oberverwaltungsgericht Rheinland-Pfalz 

Copyright © 2021 - present Reiner Bamberger
Lizenziert unter der EUPL, version 1.2 oder höher
Für weitere Details siehe Lizenz.txt oder EUPL-1.2 EN.txt
oder online unter https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
