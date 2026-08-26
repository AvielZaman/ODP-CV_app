import { useState } from 'react'
import './App.css'
import PrivateDetails from './components/privateDetails'
import Education from './components/education'
import Experience from './components/experience'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <PrivateDetails></PrivateDetails>
    <Education></Education>
    <Experience></Experience>
    </>
  )
}

export default App
