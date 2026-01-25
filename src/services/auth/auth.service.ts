import { postDataApi } from "../api";
import { AuthCompleteProfileData, AuthGoogleData, AuthLoginData } from "./auth.interface";

const authUrl = '/auth';

export const authLogin = async (data: AuthLoginData) => {
    return await postDataApi(`${authUrl}/login`, data);
}

export const authGoogle = async (data: AuthGoogleData) => {
    return await postDataApi(`${authUrl}/google`, data);
}

export const authCompleteProfile = async (id: string, userData: AuthCompleteProfileData) => {
    return await postDataApi(`${authUrl}/complete-profile/${id}`, userData);
}





