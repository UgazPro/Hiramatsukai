import { getDataApi } from "../api";
import { IStudent } from "./user.interface";

const usersUrl = '/users';

export const getUsers = async () : Promise<IStudent[]> => {
    return await getDataApi(usersUrl);
};






