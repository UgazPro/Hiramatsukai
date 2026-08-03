import { getDataApi } from "../api";
import { IRoles, IStudent } from "./student.interface";

const usersUrl = '/users';
const rolesUrl = 'users/roles';

export const getUsers = async (dojoId?: number | null) : Promise<IStudent[]> => {
    const url = dojoId != null ? `${usersUrl}?dojoId=${dojoId}` : usersUrl;
    return await getDataApi(url);
};

export const getRoles = async () : Promise<IRoles[]> => {
    return await getDataApi(rolesUrl);
}

export const getUserAllInfo = async (userId: number) => {
    return await getDataApi(`${usersUrl}/detail/${userId}`);
}

export const getMe = async () : Promise<IStudent> => {
    return await getDataApi(`${usersUrl}/info`);
}


