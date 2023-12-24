import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
          <Route exact path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
