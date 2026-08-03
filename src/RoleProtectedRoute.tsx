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

  if (!user.roles.some(({ rol }) => allowedRoles.includes(rol as userRolesNames))) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
