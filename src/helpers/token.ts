import { useAuthStore } from "@/stores/auth.store";

export const getAuthToken = () => {
  return useAuthStore.getState().token;
}

export function useUserData() {
  return useAuthStore((s) => s.user);
}

export function getUserDataSafe() {
  return useAuthStore.getState().user;
}
