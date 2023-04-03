import React from 'react'
import './App.css'
import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import EditMovie from './pages/EditMovie'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="movie/:id" element={<Details />} />
          <Route path="editMovie/:id" element={<EditMovie />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App