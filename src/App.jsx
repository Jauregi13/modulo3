import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Root } from './pages/Root'
import { MyPhotos } from './pages/MyPhotos'
import { SearchPhoto } from './pages/SearchPhoto'

const router = createBrowserRouter(createRoutesFromElements(

  <Route path='/' element={<Root />}>
    <Route path='searchPhoto' element={<SearchPhoto />}/>
    <Route path='myPhotos' element={<MyPhotos />} />
    <Route path='' element={<Navigate to='/searchPhoto'/>}/>
  </Route>
))

function App() {
  

  return (
    
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
