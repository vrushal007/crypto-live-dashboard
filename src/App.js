import React from 'react'
import MainLayout from './components/MainLayout'
import { Route, Routes } from 'react-router-dom'
import CryptoDetailItem from './components/CryptoDetailItem'
import DoesNotExist from './components/DoesNotExist'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayout />} />
        <Route path='/:id' element={<CryptoDetailItem />} />
        <Route path='*' element={<DoesNotExist />} />
      </Routes>
    </div>
  )
}

export default App
