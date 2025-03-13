const mongoose = require('mongoose');

// Verbinde MongoDB Atlas
const mongoURI = 'mongodb+srv://bilbototheben:bene13und@cluster0.a5baq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('MongoDB Verbindungsfehler:', err));

// Kurs-Schema
const courseSchema = new mongoose.Schema({
  title: String,
  videos: [String],
  materials: [String],
  notes: [
    {
      videoIndex: Number,
      text: String,
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);

// Funktion zum Hinzufügen des notes-Felds
async function addNotesField() {
  try {
    // Finde alle Kurse, die kein notes-Feld haben
    const coursesWithoutNotes = await Course.find({ notes: { $exists: false } });

    // Füge das notes-Feld hinzu
    for (const course of coursesWithoutNotes) {
      course.notes = []; // Initialisiere das notes-Feld als leeres Array
      await course.save();
      console.log(`Kurs "${course.title}" aktualisiert: notes-Feld hinzugefügt.`);
    }

    console.log('Alle Kurse wurden aktualisiert.');
  } catch (err) {
    console.error('Fehler beim Aktualisieren der Kurse:', err);
  } finally {
    mongoose.connection.close(); // Schließe die Verbindung zur Datenbank
  }
}

// Führe die Funktion aus
addNotesField();