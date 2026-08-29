import { useState } from 'react';
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

function Education({ onSave }) {
  // Now a LIST of entries instead of one object, so "Add another
  // school" can add a second/third/etc. entry, each with its own
  // independent fields.
  const [entries, setEntries] = useState([emptyEntry()]);
  const [isEditing, setIsEditing] = useState(true);

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

  if (!isEditing) {
    return (
      <div className='education form-card'>
        <h2> Your education</h2>
        {entries.map((entry) => (
          <div key={entry.id}>
            <p> {entry.schoolName}</p>
            <p> {entry.degree}{entry.degree && entry.major ? ', ' : ''}{entry.major}</p>
            <p> {entry.startDate} - {entry.endDate || 'Present'}</p>
          </div>
        ))}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    )
  }

  return (
    <form className="educationEdit form-card" onSubmit={handleSubmit}>
      <div className='heading'>
        <span className='number'>2</span>
        <div className='headers'>
          <h2> Education</h2>
          <p>Add your most recent studies first</p>
        </div>
      </div>

      {entries.map((entry, index) => (
        <div className='fields-group' key={entry.id}>
          {entries.length > 1 && (
            <div className='entry-row'>
              <label style={{ margin: 0 }}>School {index + 1}</label>
              <button
                type='button'
                className='remove-entry-btn'
                onClick={() => removeEntry(entry.id)}
              >
                Remove
              </button>
            </div>
          )}

          <div className='inputDiv'>
            <label> School name</label>
            <input type="text" name="schoolName" value={entry.schoolName}
              onChange={(e) => handleChange(entry.id, e)}
              placeholder='Tel Aviv University' />
          </div>

          <div className='two-col'>
            <div className='inputDiv'>
              <label> Degree</label>
              <input type="text" name="degree" value={entry.degree}
                onChange={(e) => handleChange(entry.id, e)}
                placeholder='B.Sc.' />
            </div>

            <div className='inputDiv'>
              <label> Field of study</label>
              <input type="text" name="major" value={entry.major}
                onChange={(e) => handleChange(entry.id, e)}
                placeholder='Computer Science' />
            </div>
          </div>

          <div className='two-col'>
            <div className='inputDiv'>
              <label> Start date</label>
              <input type="date" name="startDate" value={entry.startDate}
                onChange={(e) => handleChange(entry.id, e)} />
            </div>

            <div className='inputDiv'>
              <label> End date (if finished)</label>
              <input type="date" name="endDate" value={entry.endDate}
                onChange={(e) => handleChange(entry.id, e)} />
            </div>
          </div>
        </div>
      ))}

      <button type='button' className='add-entry-btn' onClick={addEntry}>
        + Add another school
      </button>

      <hr className="form-divider" />

      <button type="submit">&#10003; Submit section</button>
    </form>
  )
}

export default Education;