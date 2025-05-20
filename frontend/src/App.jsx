import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Create from './pages/Create'
import Note from './pages/Note'

const App = () => {
  return (
    <div data-theme="forest" className='relative h-full w-full bg-base-200'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/note/:id' element={<Note />} />
      </Routes>
    </div>
  )
}

export default App