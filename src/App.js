import React from 'react'
import MainLayout from './components/MainLayout'
import { Route, Routes } from 'react-router-dom'
import CryptoDetailItem from './components/CryptoDetailItem'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayout />} />
        <Route path='/:id' element={<CryptoDetailItem />} />
      </Routes>
    </div>
  )
}

export default App
