import './App.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Root } from './pages/Root'
import { MyPhotos } from './pages/MyPhotos'
import { SearchPhoto } from './pages/SearchPhoto'
import { ThemeProvider, createTheme } from '@mui/material'


const theme = createTheme({
  typography: {
    fontFamily: 'Istok Web',
    h1: {
      fontSize: 32,
      fontWeight: 700
    },
    h2: {
      fontSize: 20,
      fontWeight: 700
    },
    h3: {
      fontSize: 16,
      fontWeight: 700
    },
    h4: {
      fontSize: 10,
      fontWeight: 700
    }
  },
  palette: {
    primary: {
      main: '#008FDC',
      light: '#00A6FF'

    },
    success: {
      main: '#76FF6A'
    },
    warning: {
      main: '#EDDD00'
    },
    error: {
      main: '#FF5656'
    }
  }
})

const router = createBrowserRouter(createRoutesFromElements(

  <Route path='/' element={<Root />}>
    <Route path='searchPhotos' element={<SearchPhoto />}/>
    <Route path='myPhotos' element={<MyPhotos />} />
    <Route path='' element={<Navigate to='/searchPhotos'/>}/>
  </Route>
))

function App() {
  

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    
  )
}

export default App
