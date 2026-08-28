import { useState } from 'react'
import './App.css'
import PrivateDetails from './components/privateDetails'
import Education from './components/education'
import Experience from './components/experience'
import Header from './components/header'

function App() {
  const [details, setDetails] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);

  return (
    <>
      <Header />
      <main className='container'>
        <div className='prolog'>
          <h3> STEP-BY-STEP</h3>
          <h1>Build your résumé</h1>
          <div className='description'>
          <p>Fill in each section below, then submit it to lock the details in. </p>
          <p>Every section can be edited again later on its own.</p>
          </div>
        </div>
        <PrivateDetails onSave={setDetails} />
        <Education onSave={setEducation} />
        <Experience onSave={setExperience} />

        {details && education && experience && (
          <section className="cv-preview">
            <h2>Your CV</h2>
            <p><i>name:</i> {details.name}, <i>email: </i>{details.email}, <i>phone:</i> {details.phone}</p>
            <p><i>school:</i> {education.schoolName}, <i>major:</i> {education.major}</p>
            <p><i>company:</i> {experience.companyName} <i>position:</i> {experience.position}</p>
          </section>
        )}
      </main>
    </>
  );
}

export default App