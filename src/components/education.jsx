import { useState, useImperativeHandle, forwardRef } from 'react';
import { translations, formatDayFirst } from '../i18n';
import '../styles/education.css';

function emptyEntry() {
  return {
    id: crypto.randomUUID?.() ?? Date.now() + Math.random(),
    schoolName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
  };
}

const Education = forwardRef(function Education({ onSave, lang = 'en' }, ref) {
  const [entries, setEntries] = useState([emptyEntry()]);
  const [isEditing, setIsEditing] = useState(true);
  const t = translations[lang];
  const ed = t.education;

  function handleChange(id, e) {
    const { name, value } = e.target;
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, [name]: value } : entry))
    );
  }

  function addEntry() {
    setEntries((prev) => [...prev, emptyEntry()]);
  }

  function removeEntry(id) {
    setEntries((prev) => (prev.length > 1 ? prev.filter((entry) => entry.id !== id) : prev));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
    onSave?.(entries);
  }

  useImperativeHandle(ref, () => ({
    fillDummy() {
      const dummy = translations[lang].dummy.education;
      const data = [{ id: crypto.randomUUID?.() ?? Date.now() + Math.random(), ...dummy }];
      setEntries(data);
      setIsEditing(false);
      onSave?.(data);
    },
    clear() {
      setEntries([emptyEntry()]);
      setIsEditing(true);
      onSave?.(null);
    },
  }));

  if (!isEditing) {
    return (
      <div className='educationEdit form-card'>
        <div className='heading'>
          <span className='number'>2</span>
          <div className='headers'>
            <h2>{ed.title}</h2>
          </div>
          <button className='edit-btn' onClick={() => setIsEditing(true)}>
            &#9998; {t.editBtn}
          </button>
        </div>

        <div className='education-summary'>
          {entries.map((entry) => (
            <div className='entry-summary' key={entry.id}>
              <div className='name-date'>
                <h3 className='schoolName'>{entry.schoolName}</h3>
                <p>{formatDayFirst(entry.startDate)} - {entry.endDate ? formatDayFirst(entry.endDate) : ed.present}</p>
              </div>
              <p className='degreeLine'>{entry.degree} · {entry.major}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <form className="educationEdit form-card" onSubmit={handleSubmit}>
      <div className='heading'>
        <span className='number'>2</span>
        <div className='headers'>
          <h2>{ed.title}</h2>
          <p>{ed.subtitle}</p>
        </div>
      </div>

      {entries.map((entry, index) => (
        <div className='fields-group' key={entry.id}>
          {entries.length > 1 && (
            <div className='entry-row'>
              <label style={{ margin: 0 }}>{ed.schoolLabel} {index + 1}</label>
              <button
                type='button'
                className='remove-entry-btn'
                onClick={() => removeEntry(entry.id)}
              >
                {ed.remove}
              </button>
            </div>
          )}

          <div className='inputDiv'>
            <label>{ed.schoolName}</label>
            <input type="text" name="schoolName" value={entry.schoolName}
              onChange={(e) => handleChange(entry.id, e)}
              placeholder={ed.schoolNamePh} />
          </div>

          <div className='two-col'>
            <div className='inputDiv'>
              <label>{ed.degree}</label>
              <input type="text" name="degree" value={entry.degree}
                onChange={(e) => handleChange(entry.id, e)}
                placeholder={ed.degreePh} />
            </div>

            <div className='inputDiv'>
              <label>{ed.major}</label>
              <input type="text" name="major" value={entry.major}
                onChange={(e) => handleChange(entry.id, e)}
                placeholder={ed.majorPh} />
            </div>
          </div>

          <div className='two-col'>
            <div className='inputDiv'>
              <label>{ed.startDate}</label>
              <input type="date" name="startDate" value={entry.startDate}
                onChange={(e) => handleChange(entry.id, e)} />
            </div>

            <div className='inputDiv'>
              <label>{ed.endDate}</label>
              <input type="date" name="endDate" value={entry.endDate}
                onChange={(e) => handleChange(entry.id, e)} />
            </div>
          </div>
        </div>
      ))}

      <button type='button' className='add-entry-btn' onClick={addEntry}>
        {ed.addAnother}
      </button>

      <hr className="form-divider" />

      <button type="submit">&#10003; {t.submitSection}</button>
    </form>
  )
});

export default Education;