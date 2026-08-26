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
            <legend> Enter your practical experience :</legend>

            <label> Company name:</label>
            <input type="text" name="companyName" value={details.companyName} onChange={handleChange} />

            <label> Position Title:</label>
            <input type="text" name="position" value={details.position} onChange={handleChange} />

            <label> Main responsibilities:</label>
            <input type="text" name="respons" value={details.respons} onChange={handleChange} />

            <label> Start date:</label>
            <input type="date" name="start" value={details.start} onChange={handleChange} />

            <label> End date:</label>
            <input type="date" name="end" value={details.end} onChange={handleChange} />

            <button type="submit">Submit</button>
        </form>
    )
}

export default Experience;