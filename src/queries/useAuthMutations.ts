import { useMutation } from "@tanstack/react-query";
import { authLogin, authGoogle } from "@/services/auth/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router";
import { getDataApi } from "@/services/api";
import { transformProfile } from "@/utils/transformProfile";

async function fetchProfile() {
  const data = await getDataApi("/users/info");
  if (!data || data.success === false) {
    throw new Error(data?.message || "No se pudo obtener la información del usuario");
  }
  return transformProfile(data);
}

export function useLoginMutation() {
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authLogin,
    onSuccess: async (response) => {
      if (response.success) {
        setToken(response.token);
        try {
          const profile = await fetchProfile();
          setUser(profile);
          navigate("/admin");
        } catch {
          logout();
          navigate("/login");
        }
      } else {
        throw new Error(response.message);
      }
    },
  });
}

export function useGoogleLoginMutation() {
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authGoogle,
    onSuccess: async (response) => {
      if (response.success) {
        setToken(response.token);
        try {
          const profile = await fetchProfile();
          setUser(profile);
          navigate("/admin");
        } catch {
          logout();
          navigate("/login");
        }
      } else {
        throw new Error(response.message);
      }
    },
  });
}
