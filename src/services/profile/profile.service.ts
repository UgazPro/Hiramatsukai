import { getDataApi, putDataApi } from "../api";
import { IProfile } from "./profile.interface";

const profileUrl = '/users/info';

export const getProfile = async (): Promise<IProfile> => {
  return await getDataApi(profileUrl);
};

interface ChangePasswordBody {
  oldPassword: string;
  password: string;
}

export const changePassword = async (data: ChangePasswordBody) => {
  return await putDataApi('/users/change-password', data);
};
