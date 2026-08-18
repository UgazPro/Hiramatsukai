import { Navigate } from "react-router";
import { useUserData } from "@/helpers/token";
import { userRolesNames } from "@/services/students/student.interface";

interface RoleProtectedRouteProps {
  allowedRoles: userRolesNames[];
  children: React.ReactNode;
}

export default function RoleProtectedRoute({ allowedRoles, children }: RoleProtectedRouteProps) {
  const user = useUserData();

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user.roles.some((rol) => {
    return allowedRoles.includes('Administrador') || allowedRoles.includes('Líder Instructor') || allowedRoles.includes('Instructor') || allowedRoles.includes('Representante') || allowedRoles.includes('Estudiante');
  })) {
    console.log(user.roles)
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
