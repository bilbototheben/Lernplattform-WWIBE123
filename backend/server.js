const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// GET-Endpoint für alle Kurse
app.get('/api/courses', async (req, res) => {
  try {
    // Hole alle Kurse aus der Datenbank, aber nur die Felder _id und title
    const courses = await Course.find({}, '_id title');
    res.json(courses); // Sende die Kurse als JSON zurück
  } catch (err) {
    res.status(500).json({ message: 'Serverfehler', error: err });
  }
});

// Verbinde MongoDB Atlas
const mongoURI = 'mongodb+srv://bilbototheben:bene13und@cluster0.a5baq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Ersetze mit deiner MongoDB-URI
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
      videoIndex: Number, // Index des Videos
      text: String, // Notiztext
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);

// GET-Endpoint für Kursdaten
app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Kurs nicht gefunden' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Serverfehler', error: err });
  }
});

// Startet den Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
// POST-Endpunkt zum Erstellen eines Kurses
app.post('/api/courses', async (req, res) => {
  const { title, videos, materials } = req.body;
  try {
    const newCourse = new Course({ title, videos, materials });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Kurses', error: err });
  }
});
// PUT-Endpunkt zum Aktualisieren eines Kurses
app.put('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { title, videos, materials } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, videos, materials },
      { new: true } // Gibt das aktualisierte Dokument zurück
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Kurs nicht gefunden' });
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Aktualisieren des Kurses', error: err });
  }
});
app.put('/api/courses/:id/notes', async (req, res) => {
  const { id } = req.params;
  const { videoIndex, text } = req.body;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Kurs nicht gefunden' });
    }

    // Überprüfe, ob bereits eine Notiz für dieses Video existiert
    const existingNoteIndex = course.notes.findIndex(
      (note) => note.videoIndex === videoIndex
    );

    if (existingNoteIndex !== -1) {
      // Aktualisiere die vorhandene Notiz
      course.notes[existingNoteIndex].text = text;
    } else {
      // Füge eine neue Notiz hinzu
      course.notes.push({ videoIndex, text });
    }

    await course.save();
    res.json(course.notes);
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Speichern der Notiz', error: err });
  }
});

// DELETE-Endpunkt zum Löschen eines Kurses
app.delete('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Kurs nicht gefunden' });
    }
    res.json({ message: 'Kurs erfolgreich gelöscht' });
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Löschen des Kurses', error: err });
  }
});