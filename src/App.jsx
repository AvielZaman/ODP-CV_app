import { useState, useRef } from 'react'
import './App.css'
import PrivateDetails from './components/privateDetails'
import Education from './components/education'
import Experience from './components/experience'
import Header from './components/header'
import Preview from './components/preview'
import LangSelect from './components/langSelect'
import { translations } from './i18n'

function App() {
  const [language, setLanguage] = useState(null);
  const [details, setDetails] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const detailsRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);

  const allSubmitted = Boolean(details && education && experience);

  if (!language) {
    return <LangSelect onSelect={setLanguage} />;
  }

  const t = translations[language];

  function fillDummyData() {
    detailsRef.current?.fillDummy();
    educationRef.current?.fillDummy();
    experienceRef.current?.fillDummy();
  }

  function clearAll() {
    detailsRef.current?.clear();
    educationRef.current?.clear();
    experienceRef.current?.clear();
    setIsFinished(false);
  }

  return (
    <div dir={t.dir} lang={language}>
      {isFinished ? (
        <>
          <Header submitted={allSubmitted} lang={language} onEdit={() => setIsFinished(false)} />
          <main className='container'>
            <Preview
              details={details}
              education={education}
              experience={experience}
              lang={language}
              onEdit={() => setIsFinished(false)}
            />
          </main>
        </>
      ) : (
        <>
          <Header
            submitted={allSubmitted}
            lang={language}
            onSwitchLanguage={() => setLanguage(null)}
          />
          <main className='container'>
            <div className='dev-tools'>
              <button type='button' className='dev-btn' onClick={fillDummyData}>
                &#9889; {t.fillTestData}
              </button>
              <button type='button' className='dev-btn dev-btn--clear' onClick={clearAll}>
                &#128465; {t.clearAll}
              </button>
            </div>

            <div className='prolog'>
              {allSubmitted ? (
                <>
                  <h3>{t.prologReviewLabel}</h3>
                  <h1>{t.prologReviewTitle}</h1>
                  <div className='description'>
                    <p>{t.prologReviewDesc}</p>
                  </div>
                </>
              ) : (
                <>
                  <h3>{t.prologStepLabel}</h3>
                  <h1>{t.prologStepTitle}</h1>
                  <div className='description'>
                    <p>{t.prologStepDesc1}</p>
                    <p>{t.prologStepDesc2}</p>
                  </div>
                </>
              )}
            </div>
            <PrivateDetails ref={detailsRef} onSave={setDetails} lang={language} />
            <Education ref={educationRef} onSave={setEducation} lang={language} />
            <Experience ref={experienceRef} onSave={setExperience} lang={language} />

            {allSubmitted && (
              <button className='finish-btn' onClick={() => setIsFinished(true)}>{t.finishBtn}</button>
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App