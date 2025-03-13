# Lernplattform

## Projektbeschreibung

Dieses Projekt ist eine Lernplattform, die es Benutzern ermöglicht, Kurse zu erstellen, Videos anzusehen, ihren Fortschritt zu verfolgen, Notizen zu speichern und Tests durchzuführen. Das Backend wurde mit Node.js und Express erstellt, während das Frontend mit React umgesetzt wurde. Die Daten werden in einer MongoDB-Datenbank gespeichert.

## Features

- **Kursverwaltung**: Erstelle und verwalte Kurse mit Videos und Materialien.
- **Fortschrittsverfolgung**: Verfolge den Fortschritt der abgeschlossenen Videos.
- **Notizen**: Speichere Notizen zu jedem Video.
- **Selbsttests**: Beantworte Testfragen und erhalte Feedback.
- **Responsive Design**: Die Anwendung ist für verschiedene Bildschirmgrößen optimiert.

## Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 16 oder höher)
- [MongoDB](https://www.mongodb.com/) (lokal oder MongoDB Atlas)

## Installation

1. **Repository klonen**:

   Klone das Repository auf deinen lokalen Rechner:

   ```bash
   git clone https://github.com/WWIBE23/portfolio-wwibe123-lernplattform.git
   cd portfolio-wwibe123-lernplattform

1. **Backend einrichten**:

   - Navigiere in das `backend`-Verzeichnis:

     ```bash
     cd backend
     ```

   - Installiere die Abhängigkeiten:

     ```bash
     npm install
     ```

   - Starte das Backend:

     ```bash
     npm start
     ```

2. **Frontend einrichten**:

   - Navigiere in das `frontend`-Verzeichnis:

     ```bash
     cd ../frontend
     ```

   - Installiere die Abhängigkeiten:

     ```bash
     npm install
     ```

   - Starte das Frontend:

     ```bash
     npm run dev
     ```

3. **Anwendung öffnen**:

   - Öffne deinen Browser und gehe zu `http://localhost:5173`.

4. **Über Komponente und ACD**:
 Meine Komponente ist der Kursplayer, der das Herzstück der Lernplattform darstellt. Er ermöglicht es Nutzern, Kurse zu durchsuchen, Videos abzuspielen, ihren Lernfortschritt zu verfolgen und Notizen zu speichern. Die Komponente ist als React-basierte Webanwendung implementiert und interagiert mit einem Node.js-Backend, um Kursdaten abzurufen und zu verwalten. Der Kursplayer ist für eine optimale Benutzererfahrung auf verschiedenen Geräten (Desktop, Tablet, Smartphone) entwickelt und bietet eine intuitive Benutzeroberfläche.

- Hauptfunktionen:
Videoabspielung: Nutzer können Kursvideos über den integrierten Videoplayer abspielen.

Fortschrittsverfolgung: Der Fortschritt wird basierend auf den abgeschlossenen Videos berechnet und in einer Fortschrittsleiste angezeigt.

Notizen:Nutzer können Notizen zu jedem Video speichern, die lokal oder im Backend gespeichert werden.

Responsive Design: Die Benutzeroberfläche ist für verschiedene Bildschirmgrößen optimiert.

- Abweichungen vom Architecture Concept Document (ACD)

- Backend-Technologie: Node.js statt Spring Boot (Java)
Im ACD wurde Spring Boot (Java) als Backend-Technologie empfohlen. Ich habe mich jedoch für Node.js mit Express.js entschieden, und zwar aus folgenden Gründen:

Entwicklungsgeschwindigkeit: Node.js ermöglicht eine schnellere Entwicklung, da es asynchron und nicht-blockierend arbeitet. Das ist besonders wichtig für eine Plattform, die viele gleichzeitige Nutzer bedienen muss.

Einheitliche Sprache: Da das Frontend mit React (JavaScript) entwickelt wurde, bietet Node.js die Möglichkeit, eine einheitliche Sprache (JavaScript) im gesamten Stack zu verwenden. Das vereinfacht die Wartung und reduziert den Kontextwechsel für Entwickler.

- Keine Speicherung von Nutzerdaten
Im ACD wurde die Speicherung von Nutzerdaten in einer Datenbank (z. B. PostgreSQL oder MongoDB) vorgesehen. In meiner Implementierung werden jedoch keine Nutzerdaten gespeichert. Hier sind die Gründe:

Einfachheit: Da die Plattform derzeit keine Benutzerkonten oder Authentifizierung erfordert, wurde auf die Speicherung von Nutzerdaten verzichtet, um die Komplexität zu reduzieren.

Datenschutz: Durch den Verzicht auf die Speicherung von Nutzerdaten wird das Risiko von Datenschutzverletzungen minimiert, was besonders in der Anfangsphase der Plattform wichtig ist.

Fokus auf Kernfunktionen: Die Plattform konzentriert sich zunächst auf die Bereitstellung von Kursinhalten und die Verfolgung des Lernfortschritts, ohne die Notwendigkeit einer Benutzerverwaltung.

- Keine Implementierung von Stripe oder PayPal
Im ACD wurde die Integration eines Zahlungsdienstleisters wie Stripe oder PayPal empfohlen. In meiner Implementierung wurde jedoch keine Zahlungsabwicklung integriert. Hier sind die Gründe:

Fokus auf kostenlose Kurse: Die Plattform konzentriert sich derzeit auf die Bereitstellung von kostenlosen Kursen, sodass keine Zahlungsabwicklung erforderlich ist.

Reduzierte Komplexität: Durch den Verzicht auf die Integration eines Zahlungsdienstleisters wird die Komplexität der Plattform reduziert, was die Entwicklung und Wartung vereinfacht.

Zukünftige Erweiterung: Die Integration eines Zahlungsdienstleisters kann zu einem späteren Zeitpunkt erfolgen, wenn die Plattform um kostenpflichtige Kurse erweitert wird.

Konsequenz: Die Plattform ist einfacher zu entwickeln und zu warten, bietet jedoch derzeit keine Monetarisierungsmöglichkeiten.

Interaktion mit anderen Komponenten
Meine Komponente (Kursplayer) interagiert mit mehreren anderen Teilen des Systems. Hier ist eine Übersicht:

- 1. Kursdaten in MongoDB
Interaktion: Die Kursinhalte (z. B. Videos, Texte, Aufgaben) werden in MongoDB gespeichert und über das Backend abgerufen.

Gründe: MongoDB bietet eine flexible Schema-Definition, die es ermöglicht, verschiedene Arten von Kursinhalten effizient zu speichern.

Herausforderungen: Es muss sichergestellt werden, dass die Kursdaten schnell abgerufen werden können, insbesondere bei einer großen Anzahl von Nutzern.

2. Video-Hosting mit AWS S3
Interaktion: Die Videoinhalte werden in AWS S3 gespeichert und über ein Content Delivery Network (CDN) bereitgestellt.

Gründe: AWS S3 bietet eine zuverlässige und skalierbare Lösung für die Speicherung und Bereitstellung von großen Medieninhalten.

Herausforderungen: Es muss sichergestellt werden, dass die Videos schnell und zuverlässig geladen werden, insbesondere bei Nutzern mit langsamer Internetverbindung.

3. Frontend-Kommunikation über REST-API
Interaktion: Das Frontend (React) kommuniziert mit dem Backend (Node.js) über eine REST-API, um Kursdaten abzurufen und den Lernfortschritt zu verfolgen.

Gründe: REST-APIs sind einfach zu implementieren und bieten eine klare Trennung zwischen Frontend und Backend.

Herausforderungen: Es muss sichergestellt werden, dass die API sicher und effizient ist, insbesondere bei einer großen Anzahl von Anfragen.
