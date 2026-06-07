import { getDataApi } from "../api";
import { IRol, IStudent } from "./student.interface";

const usersUrl = '/users';
const rolesUrl = 'users/roles';

export const getUsers = async (dojoId?: number) : Promise<IStudent[]> => {
    const url = dojoId ? `${usersUrl}?dojoId=${dojoId}` : usersUrl;
    return await getDataApi(url);
};

export const getRoles = async () : Promise<IRol[]> => {
    return await getDataApi(rolesUrl);
}

export const getUserAllInfo = async (userId: number) => {
    return await getDataApi(`${usersUrl}/detail/${userId}`);
}






