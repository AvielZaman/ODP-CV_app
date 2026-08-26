import { useState } from 'react';
import '../styles/details.css';

function PrivateDetails({ onSave }) {
  const [details, setDetails] = useState({ name: '', email: '', phone: '' });
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
      <div className="detailsSubmit">
        <h2>Your details</h2>
        <p><strong>{details.name}</strong></p>
        <p>{details.email}</p>
        <p>{details.phone}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
  }

  return (
    <form className="detailsEdit" onSubmit={handleSubmit}>
      <legend>Enter your details:</legend>

      <div className='inputDiv'>
        <label>Full Name*:</label>
        <input required type="text" name="name" value={details.name} onChange={handleChange} />
      </div>

      <div className='inputDiv'>
        <label>Email*:</label>
        <input required type="email" name="email" value={details.email} onChange={handleChange} />
      </div>

      <div className='inputDiv'>
        <label>Phone*:</label>
        <input required type="tel" name="phone" value={details.phone} onChange={handleChange} />
      </div>


      <button type="submit">Submit</button>
    </form>
  );
}

export default PrivateDetails;