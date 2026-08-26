import { useState } from 'react'
import './App.css'
import PrivateDetails from './components/privateDetails'
import Education from './components/education'
import Experience from './components/experience'

function App() {
  const [details, setDetails] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);

  return (
    <>
      <PrivateDetails onSave={setDetails} />
      <Education onSave={setEducation} />
      <Experience onSave={setExperience} />

      {details && education && experience && (
        <section className="cv-preview">
          <h2>Your CV</h2>
          <p>{details.name} — {details.email} — {details.phone}</p>
          <p>{education.schoolName}, {education.major}</p>
          <p>{experience.companyName} — {experience.position}</p>
        </section>
      )}
    </>
  );
}

export default App