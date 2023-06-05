import React, {useEffect} from 'react'
import MainLayout from './components/MainLayout'
import { Route, Routes } from 'react-router-dom'
import CryptoDetailItem from './components/CryptoDetailItem'
import {useDispatch} from 'react-redux'
import DoesNotExist from './components/DoesNotExist'
import {fetchData} from './store/ui-actions'
import {uiActions} from './store/ui-slice'

function App () {
  const dispatch = useDispatch()
  

  useEffect(()=>{
    const getData = (async () => {
      const data = await fetchData()
      dispatch(uiActions.updateItems(data))
    })
    try{
      getData()
    }catch(e){
      console.log(e)
    }
  },[dispatch])

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
