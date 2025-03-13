
## Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 16 oder höher)
- [MongoDB](https://www.mongodb.com/) (lokal oder MongoDB Atlas)

## Installation

1. **Klonen des Repositories**:

   ```bash
   git clone https://github.com/DEIN-BENUTZERNAME/DEIN-REPOSITORY-NAME.git
   cd DEIN-REPOSITORY-NAME
Backend einrichten:

Navigiere in das backend-Verzeichnis:

cd backend
Installiere die Abhängigkeiten:

npm install
Erstelle eine .env-Datei im backend-Verzeichnis und füge deine MongoDB-Verbindungs-URI hinzu:

env
Copy
MONGO_URI=mongodb+srv://<BENUTZERNAME>:<PASSWORT>@cluster0.a5baq.mongodb.net/?retryWrites=true&w=majority
Starte das Backend:

bash
Copy
npm start
Frontend einrichten:

Navigiere in das frontend-Verzeichnis:

bash
Copy
cd ../frontend
Installiere die Abhängigkeiten:

npm install
Starte das Frontend:

npm run dev
Anwendung öffnen:

Öffne deinen Browser und gehe zu http://localhost:5173.

Projektstruktur
backend/: Enthält den Express-Server und die MongoDB-Verbindung.

frontend/: Enthält die React-Anwendung.

