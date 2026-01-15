import { getDataApi } from "../api";

const dojosUrl = '/dojos';

export const getDojos = async () => {
    return await getDataApi(dojosUrl);
}
