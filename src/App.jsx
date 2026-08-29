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

  const allSubmitted = Boolean(details && education && experience);

  return (
    <>
      <Header submitted={allSubmitted} />
      <main className='container'>
        <div className='prolog'>
          {allSubmitted ? (
            <>
              <h3>REVIEW</h3>
              <h1>Your résumé sections</h1>
              <div className='description'>
                <p>Everything below has been submitted. Click Edit on any section to bring back its form and make changes.</p>
              </div>
            </>
          ) : (
            <>
              <h3>STEP-BY-STEP</h3>
              <h1>Build your résumé</h1>
              <div className='description'>
                <p>Fill in each section below, then submit it to lock the details in. </p>
                <p>Every section can be edited again later on its own.</p>
              </div>
            </>
          )}
        </div>
        <PrivateDetails onSave={setDetails} />
        <Education onSave={setEducation} />
        <Experience onSave={setExperience} />

        {allSubmitted && (
          <button className='finish'>Finish editing</button>
        )}
      </main>
    </>
  );
}

export default App