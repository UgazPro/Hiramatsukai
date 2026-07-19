import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import './App.css';
import Home from './pages/Home/Home';
import AppLayout from './layouts/AppLayout';
import Login from './pages/Login/Login';
import KaratedoInfo from './pages/KaratedoInfo/KaratedoInfo';
import KobudoInfo from './pages/KobudoInfo/KobudoInfo';
import KendoIaidoInfo from './pages/KendoIaidoInfo/KendoIaidoInfo';
import AdminPanel from './pages/Admin/AdminPanel/AdminPanel';
import AdminLayout from './layouts/AdminLayout';
import Students from './pages/Admin/Students/Students';
import MyselfView from './pages/Admin/Yo/MyselfView';
import Activities from './pages/Admin/Activities/Activities';
import Training from './pages/Admin/Training/Training';
import Applications from './pages/Admin/Applications/Applications';
import Payments from './pages/Admin/Payments/Payments';
import Settings from './pages/Admin/Settings/Settings';
import Profile from './pages/Admin/Profile/Profile';
import AboutUsInfo from './pages/AboutUsInfo/AboutUsInfo';
import DojosInfo from './pages/DojosInfo/DojosInfo';
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
import RouteSeo from './components/seo/RouteSeo';
import { Toaster } from 'react-hot-toast';
import { useAxiosInterceptor } from './services/interceptor';
import { useUserData } from './helpers/token';

function AxiosInterceptorProvider() {
  useAxiosInterceptor();
  return null;
};

function AdminGuard() {
  const userData = useUserData();
  if (userData?.rol.rol === "Estudiante" || userData?.rol.rol === "Representante") {
    return <Navigate to="/admin/yo" replace />;
  }
  return <AdminPanel />;
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            removeDelay: 200,
          }}
        />
        <AxiosInterceptorProvider />
        <RouteSeo />
        <Routes>

          {/* Users */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<AboutUsInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/karatedo" element={<KaratedoInfo />} />
            <Route path="/kobudo" element={<KobudoInfo />} />
            <Route path="/kendoIaido" element={<KendoIaidoInfo />} />
            <Route path="/dojos/dojo/:id" element={<DojosInfo />} />
          </Route>

          {/* Admin */}
          <Route element={
            <ProtectedRoute><AdminLayout /></ProtectedRoute>
          }>
            <Route path="/admin" element={<AdminGuard />} />
            <Route path="/admin/yo" element={<MyselfView />} />
            <Route path="/admin/alumnos" element={
              <RoleProtectedRoute allowedRoles={["Administrador", "Líder Instructor", "Instructor"]}>
                <Students />
              </RoleProtectedRoute>
            } />
            {/* <Route path="/admin/horario" element={<Schedule />} /> */}
            <Route path="/admin/actividades" element={<Activities />} />
            <Route path="/admin/entrenamientos" element={<Training />} />
            <Route path="/admin/postulaciones" element={<Applications />} />
            <Route path="/admin/pagos" element={
              <RoleProtectedRoute allowedRoles={["Administrador", "Líder Instructor", "Instructor"]}>
                <Payments />
              </RoleProtectedRoute>
            } />
            <Route path="/admin/configuracion" element={
              <RoleProtectedRoute allowedRoles={["Administrador", "Líder Instructor", "Instructor"]}>
                <Settings />
              </RoleProtectedRoute>
            } />
            <Route path="/admin/perfil" element={<Profile />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
