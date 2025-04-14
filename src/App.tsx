import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home/Home'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login/Login'
import KaratedoInfo from './pages/KaratedoInfo/KaratedoInfo'
import KobudoInfo from './pages/KobudoInfo/KobudoInfo'
import KendoIaidoInfo from './pages/KendoIaidoInfo/KendoIaidoInfo'
import DojosInfo from './pages/DojosInfo/DojosInfo'
import AdminPanel from './pages/Admin/AdminPanel'
import AdminLayout from './layouts/AdminLayout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          {/* Users */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/karatedo" element={<KaratedoInfo />} />
            <Route path="/kobudo" element={<KobudoInfo />} />
            <Route path="/kendoIaido" element={<KendoIaidoInfo />} />
            <Route path="/dojos" element={<DojosInfo />} />
          </Route>

          {/* Admin */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
