import { useState } from 'react';
import '../styles/education.css';

function Education({ onSave }) {
    const [details, setDetails] = useState({ schoolName: '', major: '', date: '' });
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
            <div className='education'>
                <h2> Your education</h2>
                <p> {details.schoolName}</p>
                <p> {details.major}</p>
                <p> {details.date}</p>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
        )
    }

    return (

        <form className="educationEdit" onSubmit={handleSubmit}>
            <legend> Enter your Education details :</legend>

            <label> School name:</label>
            <input type="text" name="schoolName" value={details.schoolName} onChange={handleChange} />

            <label> Major: </label>
            <input type="text" name="major" value={details.major} onChange={handleChange} />

            <label> Date of study :</label>
            <input type="date" name="date" value={details.date} onChange={handleChange} />

            <button type="submit">Submit</button>
        </form>

    )
}

export default Education;