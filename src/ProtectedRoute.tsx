import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/auth.store";
import SpinnerComponent from "@/components/spinner/SpinnerComponent";
import { TooltipProvider } from "./components/ui/tooltip";
import { getDataApi } from "@/services/api";
import { transformProfile } from "@/utils/transformProfile";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!user && !!token);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    if (user) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const data = await getDataApi("/users/info");
        if (!data || data.success === false) {
          logout();
          navigate("/login", { replace: true });
          return;
        }
        setUser(transformProfile(data));
      } catch {
        logout();
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token, user, setUser, logout, navigate]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <SpinnerComponent />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <SpinnerComponent />
      </div>
    );
  }

  return <>
    <TooltipProvider>{children}</TooltipProvider>
  </>;
}
