import { getDataApi } from "../api";
import { IDojo } from "./dojo.interface";

const dojosUrl = '/dojos';

export const getDojos = async () : Promise<IDojo[]> => {
    return await getDataApi(dojosUrl);
}
