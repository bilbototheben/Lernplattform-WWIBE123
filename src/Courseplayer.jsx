import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

function CoursePlayer() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [coursesList, setCoursesList] = useState([]);
  const [notes, setNotes] = useState({});
  const [testAnswers, setTestAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const testQuestions = [
    {
      type: 'multiple-choice',
      question: 'Wie deklariert man eine Ganzzahl-Variable in Java?',
      options: ['int zahl = 10', 'int zahl ist 10', 'int zahl equals 10;'],
      correctAnswer: 'int zahl = 10',
    },
    {
      type: 'multiple-choice',
      question: 'Wie deklariert man eine Variable vom Typ String in Java?',
      options: ['String = "Hallo"', 'text = "Hallo"', 'String text = "Hallo"'],
      correctAnswer: 'String text = "Hallo"',
    },
    {
      type: 'text',
      question: 'Wie gibt man in Java "Hallo, Welt!" auf der Konsole aus?',
      correctAnswer: 'System.out.println("Hallo, Welt!")',
    },
    {
      type: 'text',
      question: 'Wann wurde Java Veröffentlicht?',
      correctAnswer: '1996',
    },
  ];

  // Lade die Liste der Kurse beim ersten Rendern
  useEffect(() => {
    axios.get('http://localhost:3000/api/courses')
      .then((response) => {
        setCoursesList(response.data);
        if (response.data.length > 0) {
          setSelectedCourseId(response.data[0]._id); // Wähle den ersten Kurs aus
        }
      })
      .catch((err) => {
        console.error('Fehler beim Laden der Kursliste:', err);
      });
  }, []);

  // Funktion zum Abrufen der Kursdaten
  const fetchCourseData = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/courses/${courseId}`);
      if (!response.data) {
        throw new Error('Keine Daten vom Server erhalten');
      }
      setCourse(response.data);

      // Initialisiere Notizen aus den Kursdaten
      const initialNotes = {};
      if (response.data.notes) {
        response.data.notes.forEach((note) => {
          initialNotes[note.videoIndex] = note.text;
        });
      }
      setNotes(initialNotes);
    } catch (err) {
      if (err.response) {
        setError(`Serverfehler: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        setError('Netzwerkfehler: Keine Verbindung zum Server');
      } else {
        setError(`Fehler: ${err.message}`);
      }
      console.error('Fehlerdetails:', err);
    } finally {
      setLoading(false);
    }
  };

  // Hole die Kursdaten, wenn sich die selectedCourseId ändert
  useEffect(() => {
    if (selectedCourseId) {
      fetchCourseData(selectedCourseId);
    }
  }, [selectedCourseId]);

  // Funktion zum Aktualisieren des Fortschritts
  const handleVideoCompletion = (index) => {
    if (completedVideos.includes(index)) {
      setCompletedVideos(completedVideos.filter((i) => i !== index));
    } else {
      setCompletedVideos([...completedVideos, index]);
    }
  };

  // Funktion zum Speichern der Notizen
  const handleNoteChange = async (index, value) => {
    try {
      // Aktualisiere den lokalen State
      setNotes((prevNotes) => ({
        ...prevNotes,
        [index]: value,
      }));

      // Speichere die Notiz im Backend
      await axios.put(`http://localhost:3000/api/courses/${selectedCourseId}/notes`, {
        videoIndex: index,
        text: value,
      });
    } catch (err) {
      console.error('Fehler beim Speichern der Notiz:', err);
    }
  };

  // Funktion zum Beantworten der Testfragen
  const handleTestAnswer = (index, answer) => {
    setTestAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: answer,
    }));
  };

  // Funktion zum Überprüfen der Testantworten
  const handleSubmitTest = () => {
    setTestSubmitted(true);
  };

  // Ladezustand anzeigen
  if (loading) {
    return <div>Lade Kursdaten...</div>;
  }

  // Fehlerzustand anzeigen
  if (error) {
    return <div style={styles.errorMessage}>{error}</div>;
  }

  // Fortschritt berechnen
  const progress = (completedVideos.length / course.videos.length) * 100;

  return (
    <div style={styles.container}>
      {/* Dropdown zur Kursauswahl */}
      <div style={styles.courseSelector}>
        <label htmlFor="course-select">Wähle einen Kurs: </label>
        <select
          id="course-select"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          style={styles.select}
        >
          {coursesList.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <h1 style={styles.title}>{course.title}</h1>

      {/* Hauptinhalt (Videos und Fortschrittsanzeige) */}
      <div style={styles.content}>
        {/* Videos anzeigen */}
        <div style={styles.videoSection}>
          {course.videos.map((video, index) => (
            <div key={index} style={styles.videoContainer}>
              <ReactPlayer
                url={video}
                controls={true}
                width="800px"
                height="450px"
                style={styles.videoPlayer}
              />
              {/* Checkmark für Video-Abschluss */}
              <div
                style={{
                  ...styles.checkmark,
                  backgroundColor: completedVideos.includes(index) ? '#4caf50' : '#ccc',
                }}
                onClick={() => handleVideoCompletion(index)}
              >
                {completedVideos.includes(index) ? '✓' : ''}
              </div>
              {/* Textbox für Notizen oder Beschreibungen */}
              <textarea
                placeholder="Notizen oder Beschreibungen hier eingeben..."
                style={styles.textbox}
                value={notes[index] || ''}
                onChange={(e) => handleNoteChange(index, e.target.value)}
                rows={5}
              />
            </div>
          ))}
        </div>

        {/* Fortschrittsanzeige */}
        <div style={styles.progressContainer}>
          <h3 style={styles.progressTitle}>Fortschrittsanzeige</h3>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                height: `${progress}%`,
              }}
            ></div>
            <div style={styles.progressText}>{Math.round(progress)}%</div>
          </div>
          <p style={styles.progressCount}>
            {completedVideos.length} / {course.videos.length} Videos abgeschlossen
          </p>
        </div>
      </div>

      {/* Selbsttest */}
      <div style={styles.testSection}>
        <h2 style={styles.testTitle}>Selbsttest</h2>
        {testQuestions.map((question, index) => (
          <div key={index} style={styles.testQuestion}>
            <p style={styles.questionText}>{question.question}</p>
            {question.type === 'multiple-choice' ? (
              question.options.map((option, optionIndex) => (
                <div key={optionIndex} style={styles.option}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleTestAnswer(index, option)}
                    disabled={testSubmitted}
                  />
                  <label>{option}</label>
                </div>
              ))
            ) : (
              <input
                type="text"
                value={testAnswers[index] || ''}
                onChange={(e) => handleTestAnswer(index, e.target.value)}
                disabled={testSubmitted}
                style={styles.textInput}
              />
            )}
            {testSubmitted && (
              <p style={styles.answerFeedback}>
                {question.correctAnswer === testAnswers[index]
                  ? 'Richtig!'
                  : `Falsch. Die richtige Antwort ist: ${question.correctAnswer}`}
              </p>
            )}
          </div>
        ))}
        <button onClick={handleSubmitTest} style={styles.submitButton}>
          Test abschließen
        </button>
      </div>

      {/* Materialien anzeigen */}
      <div style={styles.materialsSection}>
        <h2 style={styles.materialsTitle}>Materialien</h2>
        <ul style={styles.materialsList}>
          {course.materials.map((material, index) => (
            <li key={index} style={styles.materialItem}>
              <a
                href={material}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.materialLink}
              >
                Material {index + 1} (PDF)
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Stile für die Komponente
const styles = {
  container: {
    maxWidth: '1200px',
    width: '100%',
    padding: '500px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundImage: 'linear-gradient(90deg, rgba(200, 200, 200, 0.1) 1px, transparent 1px), linear-gradient(rgba(200, 200, 200, 0.1) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
  courseSelector: {
    marginBottom: '20px',
  },
  select: {
    padding: '5px',
    fontSize: '1rem',
    borderRadius: '4px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    width: '100%',
    gap: '20px',
  },
  videoSection: {
    flex: 3,
  },
  videoContainer: {
    marginBottom: '30px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  videoPlayer: {
    marginBottom: '10px',
  },
  checkmark: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '1.2rem',
    color: '#fff',
  },
  textbox: {
    width: '800px',
    height: '150px',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
    marginTop: '10px',
  },
  progressContainer: {
    flex: 1,
    textAlign: 'center',
    padding: '20px',
    borderLeft: '1px solid #ccc',
  },
  progressTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  progressBar: {
    width: '50px',
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto',
  },
  progressFill: {
    width: '100%',
    backgroundColor: '#4caf50',
    position: 'absolute',
    top: '0',
    transition: 'height 0.3s ease',
  },
  progressText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1rem',
    color: '#000',
  },
  progressCount: {
    marginTop: '10px',
    fontSize: '1rem',
  },
  testSection: {
    marginTop: '40px',
    textAlign: 'left',
    width: '100%',
  },
  testTitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  testQuestion: {
    marginBottom: '20px',
  },
  questionText: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  option: {
    marginBottom: '10px',
  },
  textInput: {
    width: '100%',
    padding: '5px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  answerFeedback: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  materialsSection: {
    borderTop: '1px solid #ccc',
    paddingTop: '20px',
    marginTop: '40px',
    textAlign: 'center',
    width: '100%',
  },
  materialsTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  materialsList: {
    listStyleType: 'none',
    padding: '0',
  },
  materialItem: {
    marginBottom: '10px',
  },
  materialLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default CoursePlayer;