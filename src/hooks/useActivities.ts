import { IActivity } from "@/services/activities/activity.interface"
import { getActivities } from "@/services/activities/activity.service"
import { useQuery } from "@tanstack/react-query"

export const useActivities = () => {
    return useQuery<IActivity[]>({
        queryKey: ['activities'],
        queryFn: getActivities,
        staleTime: 1000 * 60 * 5
    });
}










