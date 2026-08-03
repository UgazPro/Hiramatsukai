import { IDojo } from "@/services/dojos/dojo.interface";
import { userRolesNames } from "@/services/students/student.interface";
import { useAuthStore } from "@/stores/auth.store";
import { jwtDecode } from "jwt-decode";

export interface IToken {
  id:             number;
  identification: string;
  name:           string;
  lastName:       string;
  email:          string;
  username:       string;
  address:        string;
  phone:          string;
  sex:            string;
  dojoId:         number;
  roles:          Role[];
  birthday:       Date;
  profileImg:     string;
  active:         boolean;
  deleted:        boolean;
  createdAt:      Date;
  enrollmentDate: Date;
  dojo:           IDojo;
  iat:            number;
  exp:            number;
}

export interface Role {
  id: number;
  rol: userRolesNames;
}

export const getAuthToken = () => {
  return useAuthStore.getState().token;
}

export const getUserDataFromToken = (token: string | null) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode<IToken>(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export function useUserData() {
  const token = useAuthStore((s) => s.token);
  return getUserDataFromToken(token);
}

export function getUserDataSafe() {
  const token = useAuthStore.getState().token;
  return getUserDataFromToken(token);
}

