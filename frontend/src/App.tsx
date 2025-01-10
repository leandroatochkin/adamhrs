import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainForm from './views/main_form/MainForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainForm />
    </>
  )
}

export default App
