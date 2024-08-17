import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='min-h-[80vh] [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
