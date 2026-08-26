import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import './App.css';
import Home from './pages/Home/Home';
import AppLayout from './layouts/AppLayout';
import Login from './pages/Login/Login';
import KaratedoInfo from './pages/KaratedoInfo/KaratedoInfo';
import KobudoInfo from './pages/KobudoInfo/KobudoInfo';
import KendoInfo from './pages/KendoInfo/KendoInfo';
import IaidoInfo from './pages/IaidoInfo/IaidoInfo';
import MasterInfo from './pages/MasterInfo/MasterInfo';
import AdminPanel from './pages/Admin/AdminPanel/AdminPanel';
import AdminLayout from './layouts/AdminLayout';
import Students from './pages/Admin/Students/Students';
import MyInformation from './pages/Admin/myInformation/myInformation';
import Activities from './pages/Admin/Activities/Activities';
import Dojos from './pages/Admin/Dojos/Dojos';
import Training from './pages/Admin/Training/Training';
import Applications from './pages/Admin/Applications/Applications';
import Payments from './pages/Admin/Payments/Payments';
import Settings from './pages/Admin/Settings/Settings';
import AboutUsInfo from './pages/AboutUsInfo/AboutUsInfo';
import DojosInfo from './pages/DojosInfo/DojosInfo';
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
import RouteSeo from './components/seo/RouteSeo';
import { Toaster } from 'react-hot-toast';
import { useAxiosInterceptor } from './services/interceptor';
import { useUserData } from './helpers/token';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function AxiosInterceptorProvider() {
  useAxiosInterceptor();
  return null;
};

function AdminGuard() {
  const userData = useUserData();
  if (userData?.roles.some(({ rol }) => rol === "Estudiante" || rol === "Representante")) {
    return <Navigate to="/admin/yo" replace />;
  }
  return <AdminPanel />;
}

function App() {

  return (
    <ErrorBoundary>
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
            <Route path="/kendo" element={<KendoInfo />} />
            <Route path="/iaido" element={<IaidoInfo />} />
            <Route path="/maestro/:slug" element={<MasterInfo />} />
            <Route path="/dojos/dojo/:id" element={<DojosInfo />} />
          </Route>

          {/* Admin */}
          <Route element={
            <ProtectedRoute><AdminLayout /></ProtectedRoute>
          }>
            <Route path="/admin" element={<AdminGuard />} />
            <Route path="/admin/yo" element={<MyInformation />} />
            <Route path="/admin/alumnos" element={
              <RoleProtectedRoute allowedRoles={["Administrador", "Líder Maestro", "Líder Instructor", "Instructor"]}>
                <Students />
              </RoleProtectedRoute>
            } />
            {/* <Route path="/admin/horario" element={<Schedule />} /> */}
            <Route path="/admin/actividades" element={<Activities />} />
            <Route path="/admin/dojos" element={
              <RoleProtectedRoute allowedRoles={["Administrador", "Líder Maestro"]}>
                <Dojos />
              </RoleProtectedRoute>
            } />
            <Route path="/admin/entrenamientos" element={<Training />} />
            <Route path="/admin/postulaciones" element={<Applications />} />
            <Route path="/admin/pagos" element={
              <RoleProtectedRoute allowedRoles={["Administrador", "Líder Maestro", "Líder Instructor", "Instructor"]}>
                <Payments />
              </RoleProtectedRoute>
            } />
            <Route path="/admin/configuracion" element={
              <RoleProtectedRoute allowedRoles={["Administrador", "Líder Maestro","Líder Instructor", "Instructor"]}>
                <Settings />
              </RoleProtectedRoute>
            } />
            <Route path="/admin/perfil" element={<Navigate to="/admin/yo" replace />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App;
