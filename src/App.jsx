import React from 'react';
import CoursePlayer from './Courseplayer';
import CreateCourse from './Createcourse';


function App() {
  const courseId = '654321abcdef123456789012'; // Beispiel-ID

  return (
    <div>
      <CoursePlayer courseId={courseId} />
      <CreateCourse />
    </div>
  );
}

export default App;