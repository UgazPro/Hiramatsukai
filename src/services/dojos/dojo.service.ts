import { getDataApi } from "../api";
import { IDojo, IDojoMartialArts, IDojoRanks } from "./dojo.interface";

const dojosUrl = '/dojos';

export const getDojos = async () : Promise<IDojo[]> => {
    return await getDataApi(dojosUrl);
}

export const getDojoMartialArts = async () : Promise<IDojoMartialArts[]> => {
    return await getDataApi(`${dojosUrl}/martial-arts`);
}

export const getDojoRanks = async () : Promise<IDojoRanks[]> => {
    return await getDataApi(`${dojosUrl}/ranks`);
}


