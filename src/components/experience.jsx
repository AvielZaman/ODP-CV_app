import { useState } from 'react';
import '../styles/experience.css';

function Experience({ onSave }) {
    const [details, setDetails] = useState({ companyName: '', position: '', respons: '', start: '', end: '' });
    const [isEditing, setIsEditing] = useState(true);

    function handleChange(e) {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsEditing(false);
        onSave?.(details);
    }

    if (!isEditing) {
        return (
            <div className='experience'>
                <h2> Your experience</h2>
                <p> {details.companyName}</p>
                <p> {details.position}</p>
                <p> {details.respons}</p>
                <p> {details.start}</p>
                <p> {details.end}</p>
                <button onClick={() => setIsEditing(true)}>Edit</button>

            </div>
        );
    }

    return (
        <form className="experienceEdit" onSubmit={handleSubmit}>
             <div className='heading'>
                <span className='number'>1</span>
                <div className='headers'>
                    <h2> Work Experience</h2>
                    <p>List your responsibilities for each role</p>
                </div>
            </div>

            <div className='company-position'>
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
                <input type="text" name="respons" value={details.respons} onChange={handleChange} />
            </div>

            <div className='dates'>
                <div className='inputDiv'>
                    <label> Start of date</label>
                    <input type="date" name="start" value={details.start} onChange={handleChange}
                        placeholder='01/01/2026' />
                </div>

                <div className='inputDiv'>
                    <label> End of date</label>
                    <input type="date" name="end" value={details.end} onChange={handleChange}
                        placeholder='01/01/2026' />
                </div>
            </div>

            <button type="submit">&#10003; Submit section</button>
        </form>
    )
}

export default Experience;