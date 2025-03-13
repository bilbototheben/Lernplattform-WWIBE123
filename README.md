
## Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 16 oder höher)
- [MongoDB](https://www.mongodb.com/) (lokal oder MongoDB Atlas)

## Installation

1. **Backend einrichten**:

   - Navigiere in das `backend`-Verzeichnis:

     ```bash
     cd backend
     ```

   - Installiere die Abhängigkeiten:

     ```bash
     npm install
     ```

   - Erstelle eine `.env`-Datei im `backend`-Verzeichnis und füge deine MongoDB-Verbindungs-URI hinzu:

     ```env
     MONGO_URI=mongodb+srv://<BENUTZERNAME>:<PASSWORT>@cluster0.a5baq.mongodb.net/?retryWrites=true&w=majority
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
