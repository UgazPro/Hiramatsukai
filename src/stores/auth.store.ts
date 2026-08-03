import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProfile } from "@/services/profile/profile.interface";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: IProfile | null;
  setToken: (token: string) => void;
  setUser: (user: IProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: null,

      setToken: (token) =>
        set({
          token,
          isAuthenticated: true,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      logout: () => {
        localStorage.clear();
        set({
          token: null,
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
      version: 1,
    },
  ),
);
