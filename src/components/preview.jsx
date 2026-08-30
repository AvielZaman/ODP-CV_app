import { useEffect } from 'react';
import { translations, formatMonthYear } from '../i18n';
import '../styles/preview.css';

function handleDownloadPdf(fileName) {
  const previousTitle = document.title;
  document.title = fileName;

  function restoreTitle() {
    document.title = previousTitle;
    window.removeEventListener('afterprint', restoreTitle);
  }
  window.addEventListener('afterprint', restoreTitle);

  window.print();
}

function Preview({ details, education, experience, lang = 'en' }) {
  const t = translations[lang];
  const p = t.preview;

  useEffect(() => {
    const root = document.documentElement;
    const prevLang = root.lang;
    const prevDir = root.dir;
    root.lang = lang;
    root.dir = t.dir;
    return () => {
      root.lang = prevLang;
      root.dir = prevDir;
    };
  }, [lang, t.dir]);

  const fileName = details?.name ? `${details.name} - CV` : 'CV';

  return (
    <div className='preview-wrap'>
      <div className='resume-page' dir={t.dir}>
        <div className='resume-header'>
          <h1 className='resume-name'>{details?.name}</h1>
          <div className='resume-contact'>
            {[details?.email, details?.phone].filter(Boolean).join(' · ')}
          </div>
        </div>
        <hr className='resume-hr' />

        {Array.isArray(education) && education.length > 0 && (
          <section className='resume-section'>
            <div className='resume-section-label'>
              <span>{p.educationTitle}</span>
              <span className='resume-section-line' />
            </div>

            {education.map((entry) => (
              <div className='resume-entry' key={entry.id}>
                <div className='resume-entry-head'>
                  <div>
                    <h3>{entry.schoolName}</h3>
                    <p className='resume-entry-sub'>
                      {[entry.degree, entry.major].filter(Boolean).join(', ')}
                    </p>
                  </div>
                  <p className='resume-entry-dates'>
                    {formatMonthYear(entry.startDate, lang)} &ndash;{' '}
                    {entry.endDate ? formatMonthYear(entry.endDate, lang) : p.present}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {Array.isArray(experience) && experience.length > 0 && (
          <section className='resume-section'>
            <div className='resume-section-label'>
              <span>{p.experienceTitle}</span>
              <span className='resume-section-line' />
            </div>

            {experience.map((entry) => {
              const responsibilities = (entry.respons || '')
                .split('.')
                .map((line) => line.trim())
                .filter(Boolean);

              return (
                <div className='resume-entry' key={entry.id}>
                  <div className='resume-entry-head'>
                    <div>
                      <h3>{entry.position}</h3>
                      <p className='resume-entry-sub'>{entry.companyName}</p>
                    </div>
                    <p className='resume-entry-dates'>
                      {formatMonthYear(entry.startDate, lang)} &ndash;{' '}
                      {entry.current || !entry.endDate ? p.present : formatMonthYear(entry.endDate, lang)}
                    </p>
                  </div>

                  {responsibilities.length > 0 && (
                    <ul className='resume-bullets'>
                      {responsibilities.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </section>
        )}
      </div>

      <div className='preview-side'>
        <button
          type='button'
          className='edit-btn preview-download-btn'
          onClick={() => handleDownloadPdf(fileName)}
        >
          &#11015; {t.downloadPdf}
        </button>
      </div>
    </div>
  );
}

export default Preview;