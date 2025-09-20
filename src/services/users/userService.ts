import { getDataApi } from "../api";

const usersUrl = '/users';

export const getUsers = async () => {
    return await getDataApi(usersUrl);
}






