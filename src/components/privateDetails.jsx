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
      <div className="detailsSubmit form-card">
        <h2>Your details</h2>
        <p><strong>{details.name}</strong></p>
        <p>{details.email}</p>
        <p>{details.phone}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
  }

  return (
    <form className="detailsEdit form-card" onSubmit={handleSubmit}>
      <div className='heading'>
        <span className='number'>1</span>
        <div className='headers'>
          <h2> General information</h2>
          <p>How employers can reach you</p>
        </div>
      </div>

      <div className='inputDiv'>
        <label>Full Name*</label>
        <input required type="text" name="name" value={details.name} onChange={handleChange}
          placeholder='John Doe' />
      </div>

      <div className='two-col'>
        <div className='inputDiv'>
          <label>Email*</label>
          <input required type="email" name="email" value={details.email} onChange={handleChange}
            placeholder='example@gmail.com' />
        </div>

        <div className='inputDiv'>
          <label>Phone*</label>
          <input required type="tel" name="phone" value={details.phone} onChange={handleChange}
            placeholder='05X-XXXXXXX' />
        </div>
      </div>

      <hr className="form-divider" />

      <button type="submit">&#10003; Submit section</button>
    </form>
  );
}

export default PrivateDetails;