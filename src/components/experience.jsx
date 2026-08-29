import { useState } from 'react';
import '../styles/experience.css';

function Experience({ onSave }) {
  const [details, setDetails] = useState({ companyName: '', position: '', respons: '', start: '', end: '', current: false });
  const [isEditing, setIsEditing] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleCurrentToggle(e) {
    const checked = e.target.checked;
    setDetails((prev) => ({ ...prev, current: checked, end: checked ? '' : prev.end }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
    onSave?.(details);
  }

  if (!isEditing) {
    return (
      <div className='experience form-card'>
        <h2> Your experience</h2>
        <p> {details.companyName}</p>
        <p> {details.position}</p>
        <p> {details.respons}</p>
        <p> {details.start} - {details.current ? 'Present' : details.end}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
  }

  return (
    <form className="experienceEdit form-card" onSubmit={handleSubmit}>
      <div className='heading'>
        <span className='number'>3</span>
        <div className='headers'>
          <h2> Work Experience</h2>
          <p>List your responsibilities for each role</p>
        </div>
      </div>

      <div className='fields-group'>
        <div className='two-col'>
          <div className='inputDiv'>
            <label> Company name:</label>
            <input type="text" name="companyName" value={details.companyName} onChange={handleChange} />
          </div>

          <div className='inputDiv'>
            <label> Position Title:</label>
            <input type="text" name="position" value={details.position} onChange={handleChange} />
          </div>
        </div>

        <div className='inputDiv'>
          <label> Main responsibilities:</label>
          <textarea name="respons" value={details.respons} onChange={handleChange}
            placeholder='Built and maintained React components for core product features...' />
        </div>

        <div className='two-col'>
          <div className='inputDiv'>
            <label> Start date</label>
            <input type="date" name="start" value={details.start} onChange={handleChange} />
          </div>

          <div className='inputDiv'>
            <label> End date</label>
            <input type="date" name="end" value={details.end} onChange={handleChange}
              disabled={details.current} />
            <label className='checkbox-label'>
              <input type="checkbox" checked={details.current} onChange={handleCurrentToggle} />
              I currently work here
            </label>
          </div>
        </div>
      </div>

      <hr className="form-divider" />

      <button type="submit">&#10003; Submit section</button>
    </form>
  )
}

export default Experience;