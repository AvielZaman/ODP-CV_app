import { useState, useImperativeHandle, forwardRef } from 'react';
import { translations } from '../i18n';
import '../styles/details.css';

function emptyDetails() {
  return { name: '', email: '', phone: '' };
}

const PrivateDetails = forwardRef(function PrivateDetails({ onSave, lang = 'en' }, ref) {
  const [details, setDetails] = useState(emptyDetails());
  const [isEditing, setIsEditing] = useState(true);
  const t = translations[lang];
  const d = t.details;

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
    onSave?.(details);
  }

  useImperativeHandle(ref, () => ({
    fillDummy() {
      const data = translations[lang].dummy.details;
      setDetails(data);
      setIsEditing(false);
      onSave?.(data);
    },
    clear() {
      setDetails(emptyDetails());
      setIsEditing(true);
      onSave?.(null);
    },
  }));

  if (!isEditing) {
    return (
      <div className="detailsEdit form-card">
        <div className='heading'>
          <span className='number'>1</span>
          <div className='headers'>
            <h2>{d.title}</h2>
          </div>
          <button className='edit-btn' onClick={() => setIsEditing(true)}>
            &#9998; {t.editBtn}
          </button>
        </div>

        <div className='details-summary'>
          <h3 className='detailsName'>{details.name}</h3>
          <div className='two-col contact-row'>
            <p>&#9993; {details.email}</p>
            <p>&#9742; {details.phone}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="detailsEdit form-card" onSubmit={handleSubmit}>
      <div className='heading'>
        <span className='number'>1</span>
        <div className='headers'>
          <h2>{d.title}</h2>
          <p>{d.subtitle}</p>
        </div>
      </div>

      <div className='inputDiv'>
        <label>{d.fullName}</label>
        <input required type="text" name="name" value={details.name} onChange={handleChange}
          placeholder={d.fullNamePh} />
      </div>

      <div className='two-col'>
        <div className='inputDiv'>
          <label>{d.email}</label>
          <input required type="email" name="email" value={details.email} onChange={handleChange}
            placeholder={d.emailPh} />
        </div>

        <div className='inputDiv'>
          <label>{d.phone}</label>
          <input required type="tel" name="phone" value={details.phone} onChange={handleChange}
            placeholder={d.phonePh} />
        </div>
      </div>

      <hr className="form-divider" />

      <button type="submit">&#10003; {t.submitSection}</button>
    </form>
  );
});

export default PrivateDetails;