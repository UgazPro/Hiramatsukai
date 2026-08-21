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

  const hasAllowedRole = user.roles.some((rol) => allowedRoles.includes(rol.rol));

  if (!hasAllowedRole) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
