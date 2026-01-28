import { getDataApi } from "../api";
import { IRol, IStudent } from "./user.interface";

const usersUrl = '/users';
const rolesUrl = 'users/roles';

export const getUsers = async () : Promise<IStudent[]> => {
    return await getDataApi(usersUrl);
};

export const getRoles = async () : Promise<IRol[]> => {
    return await getDataApi(rolesUrl);
}






