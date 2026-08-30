import '../styles/langSelect.css';

function LangSelect({ onSelect }) {
  return (
    <main className='container langSelect-container'>
      <div className='langSelect-card form-card'>
        <img id="icon" className='langSelect-icon' src='src\assets\cv.png' alt='cv icon' />
        <h1 className='langSelect-heading'>Choose your résumé language</h1>
        <p className='langSelect-heading-he' dir='rtl'>באיזו שפה תרצה לבנות את קורות החיים?</p>

        <div className='langSelect-options'>
          <button type='button' className='langSelect-btn' onClick={() => onSelect('en')}>
            English
          </button>
          <button type='button' className='langSelect-btn' onClick={() => onSelect('he')}>
            עברית
          </button>
        </div>
      </div>
    </main>
  );
}

export default LangSelect;