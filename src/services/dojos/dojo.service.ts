import { getDataApi, getImagesApi } from "../api";
import { IDojo, IDojoInfo, IDojoMartialArts, IDojoRanks } from "./dojo.interface";

const dojosUrl = '/dojos';

export const getDojos = async () : Promise<IDojo[]> => {
    return await getDataApi(dojosUrl);
}
export const getDojosInfoApi = async (code: string) : Promise<IDojoInfo> => {
    return await getDataApi(`${dojosUrl}/info/${code}`);
}
export const getDojoLogo = async (logo: string) => {
    return await getImagesApi(logo);
}
export const getDojoImages = async (code: string) : Promise<IDojo[]> => {
    return await getDataApi(`${dojosUrl}/${code}/images`);
}

export const getDojoMartialArts = async () : Promise<IDojoMartialArts[]> => {
    return await getDataApi(`${dojosUrl}/martial-arts`);
}

export const getDojoRanks = async () : Promise<IDojoRanks[]> => {
    return await getDataApi(`${dojosUrl}/ranks`);
}


