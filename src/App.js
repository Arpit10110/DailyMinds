import React from 'react'
import {HashRouter as Router, Routes,Route} from "react-router-dom"
import Home from "./components/Home.jsx"
const App = () => {
  return  ( 
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
  </Router>
    )
  
}

export default App
