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
            <div className='heading'>
                <span className='number'>1</span>
                <div className='headers'>
                    <h2> Education</h2>
                    <p>Add your most recent studies first</p>
                </div>
            </div>

            <div className='inputDiv'>
                <label> School name</label>
                <input type="text" name="schoolName" value={details.schoolName} onChange={handleChange}
                    placeholder='Tel Aviv University' />
            </div>

            <div className='inputDiv'>
                <label> Major</label>
                <input type="text" name="major" value={details.major} onChange={handleChange}
                    placeholder='Computer Science' />
            </div>

            <div className='inputDiv'>
                <label> Date of study</label>
                <input type="date" name="date" value={details.date} onChange={handleChange}
                    placeholder='01/01/2026' />
            </div>

            <button type="submit">Submit</button>
        </form>

    )
}

export default Education;