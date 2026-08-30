import { translations } from '../i18n';
import '../styles/header.css';

function Header({ submitted, onEdit, onSwitchLanguage, lang = 'en' }) {
  const t = translations[lang];

  return (
    <div className='head'>
      <header>
        <div className="left">
          <img id="icon" src='src\assets\cv.png' alt='cv icon' />
          <h1> {t.appTitle} </h1>
        </div>

        <div className='headerRight'>
          {onEdit ? (
            <button type='button' className='edit-btn header-edit-btn' onClick={onEdit}>
              &#9998; {t.backToEdit}
            </button>
          ) : submitted ? (
            <div className="statusRow statusRow--done">
              <span className="statusCheck">&#10003;</span>
              {t.statusDone}
            </div>
          ) : (
            <div className="statusRow">
              <span className="statusDot" />
              {t.statusDraft}
            </div>
          )}

          {onSwitchLanguage && (
            <button type='button' className='lang-switch-btn' onClick={onSwitchLanguage}>
              &#127760; {t.switchLanguage}
            </button>
          )}
        </div>
      </header>
      <hr />
    </div>
  )
}

export default Header;