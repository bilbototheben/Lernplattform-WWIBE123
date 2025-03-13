import React, { useState } from 'react';
import axios from 'axios';

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [videos, setVideos] = useState(['']);
  const [materials, setMaterials] = useState(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/courses', {
        title,
        videos,
        materials,
      });
      alert('Kurs erfolgreich erstellt!');
      console.log(response.data);
    } catch (err) {
      console.error('Fehler beim Erstellen des Kurses:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Neuen Kurs erstellen</h2>
      <div>
        <label>Titel:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Videos (YouTube-Links):</label>
        {videos.map((video, index) => (
          <input
            key={index}
            type="text"
            value={video}
            onChange={(e) => {
              const newVideos = [...videos];
              newVideos[index] = e.target.value;
              setVideos(newVideos);
            }}
            required
          />
        ))}
        <button type="button" onClick={() => setVideos([...videos, ''])}>
          Video hinzufügen
        </button>
      </div>
      <div>
        <label>Materialien (PDF-Links):</label>
        {materials.map((material, index) => (
          <input
            key={index}
            type="text"
            value={material}
            onChange={(e) => {
              const newMaterials = [...materials];
              newMaterials[index] = e.target.value;
              setMaterials(newMaterials);
            }}
            required
          />
        ))}
        <button type="button" onClick={() => setMaterials([...materials, ''])}>
          Material hinzufügen
        </button>
      </div>
      <button type="submit">Kurs erstellen</button>
    </form>
  );
}

export default CreateCourse;