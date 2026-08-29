import { useState } from 'react';
import '../styles/experience.css';

function emptyEntry() {
  return {
    id: crypto.randomUUID?.() ?? Date.now() + Math.random(),
    companyName: '',
    position: '',
    respons: '',
    startDate: '',
    endDate: '',
    current: false,
  };
}

function formatDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

function Experience({ onSave }) {
  const [entries, setEntries] = useState([emptyEntry()]);
  const [isEditing, setIsEditing] = useState(true);

  function handleChange(id, e) {
    const { name, value } = e.target;
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, [name]: value } : entry))
    );
  }

  function handleCurrentToggle(id, e) {
    const checked = e.target.checked;
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, current: checked, endDate: checked ? '' : entry.endDate }
          : entry
      )
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

  if (!isEditing) {
    return (
      <div className='experience form-card'>
        <div className='heading'>
          <span className='number'>3</span>
          <div className='headers'>
            <h2>Work Experience</h2>
          </div>
          <button className='edit-btn' onClick={() => setIsEditing(true)}>
            &#9998; Edit
          </button>
        </div>

        <div className='experience-summary'>
          {entries.map((entry) => {
            const responsibilities = entry.respons
              .split('.')
              .map((line) => line.trim())
              .filter(Boolean);

            return (
              <div className='entry-summary' key={entry.id}>
                <div className='name-date'>
                  <h3 className='companyName'>{entry.companyName}</h3>
                  <p>
                    {formatDate(entry.startDate)} -{' '}
                    {entry.current || !entry.endDate ? 'Present' : formatDate(entry.endDate)}
                  </p>
                </div>
                
                <p className='positionLine'>{entry.position}</p>

                <div className='responsibilities'>
                  <ul>
                    {responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <form className='experienceEdit form-card' onSubmit={handleSubmit}>
      <div className='heading'>
        <span className='number'>3</span>
        <div className='headers'>
          <h2>Work Experience</h2>
          <p>List your responsibilities for each role</p>
        </div>
      </div>

      {entries.map((entry, index) => (
        <div className='fields-group' key={entry.id}>
          {entries.length > 1 && (
            <div className='entry-row'>
              <label style={{ margin: 0 }}>Company {index + 1}</label>
              <button type='button' className='remove-entry-btn' onClick={() => removeEntry(entry.id)}>
                Remove
              </button>
            </div>
          )}

          <div className='two-col'>
            <div className='inputDiv'>
              <label>Company name</label>
              <input
                type='text'
                name='companyName'
                value={entry.companyName}
                onChange={(e) => handleChange(entry.id, e)}
              />
            </div>

            <div className='inputDiv'>
              <label>Position Title</label>
              <input
                type='text'
                name='position'
                value={entry.position}
                onChange={(e) => handleChange(entry.id, e)}
              />
            </div>
          </div>

          <div className='inputDiv'>
            <label>Main responsibilities</label>
            <textarea
              name='respons'
              value={entry.respons}
              onChange={(e) => handleChange(entry.id, e)}
              placeholder='Built and maintained React components for core product features...'
            />
          </div>

          <div className='two-col'>
            <div className='inputDiv'>
              <label>Start date</label>
              <input
                type='date'
                name='startDate'
                value={entry.startDate}
                onChange={(e) => handleChange(entry.id, e)}
              />
            </div>

            <div className='inputDiv'>
              <label>End date</label>
              <input
                type='date'
                name='endDate'
                value={entry.endDate}
                onChange={(e) => handleChange(entry.id, e)}
                disabled={entry.current}
              />

              <label className='checkbox-label'>
                <input
                  type='checkbox'
                  checked={entry.current}
                  onChange={(e) => handleCurrentToggle(entry.id, e)}
                />
                I currently work here
              </label>
            </div>
          </div>
        </div>
      ))}

      <button type='button' className='add-entry-btn' onClick={addEntry}>
        + Add another company
      </button>

      <hr className='form-divider' />

      <button type='submit'>&#10003; Submit section</button>
    </form>
  );
}

export default Experience;