import '../styles/header.css';

function Header({ submitted }) {
  return (
    <div className='head'>
      <header>
        <div className="left">
          <img id="icon" src='src\assets\cv.png' alt='cv icon' />
          <h1> CV Builder </h1>
        </div>
      
        {submitted ? (
          <div className="statusRow statusRow--done">
            <span className="statusCheck">&#10003;</span>
            All sections saved
          </div>
        ) : (
          <div className="statusRow">
            <span className="statusDot" />
            Draft · not yet submitted
          </div>
        )}
      </header>
      <hr />
    </div>
  )
}

export default Header;