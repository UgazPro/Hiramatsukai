import { getDataApi } from "../api";
import { IActivity } from "./activity.interface";

const activitiesUrl = '/activities';

export const getActivities = async () : Promise<IActivity[]> => {
    return await getDataApi(activitiesUrl);
}






