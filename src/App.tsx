import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home/Home'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login/Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
