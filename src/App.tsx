import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home/Home'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login/Login'
import KaratedoInfo from './pages/KaratedoInfo/KaratedoInfo'
import KobudoInfo from './pages/KobudoInfo/KobudoInfo'
import KendoIaidoInfo from './pages/KendoIaidoInfo/KendoIaidoInfo'
import DojosInfo from './pages/DojosInfo/DojosInfo'
import AdminPanel from './pages/Admin/AdminPanel/AdminPanel'
import AdminLayout from './layouts/AdminLayout'
import Students from './pages/Admin/Students/Students'
import Schedule from './pages/Admin/Schedule/Schedule'
import Activities from './pages/Admin/Activities/Activities'
import Training from './pages/Admin/Training/Training'
import Applications from './pages/Admin/Applications/Applications'
import Payments from './pages/Admin/Payments/Payments'
import Settings from './pages/Admin/Settings/Settings'
import Profile from './pages/Admin/Profile/Profile'
import NuevoEstudiantePage from './pages/Admin/Students/StudentsForm/FormTest'

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
            <Route path="/admin/alumnos" element={<Students />} />
            <Route path="/admin/horario" element={<Schedule />} />
            <Route path="/admin/actividades" element={<Activities />} />
            <Route path="/admin/entrenamientos" element={<Training />} />
            <Route path="/admin/postulaciones" element={<Applications />} />
            <Route path="/admin/pagos" element={<Payments />} />
            <Route path="/admin/configuracion" element={<Settings />} />
            <Route path="/admin/perfil" element={<Profile />} />
            <Route path="/nuevoE" element={<NuevoEstudiantePage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
