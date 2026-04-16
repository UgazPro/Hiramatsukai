import { useQuery } from "@tanstack/react-query";
import { getActivities, ActivitiesFilter } from "@/services/activities/activity.service";
import { useActivitiesStore } from "@/stores/activities.store";
import { IActivity } from "@/services/activities/activity.interface";

export const useActivities = () => {
  const { filters } = useActivitiesStore();

  const { data, isLoading, refetch } = useQuery<IActivity[]>({
    queryKey: [
      "activities",
      filters.includePast,
      filters.startDate?.toISOString(),
      filters.endDate?.toISOString(),
    ],
    queryFn: async () => {
      const apiFilters: ActivitiesFilter = {
        includePast: filters.includePast,
        dateRange:
          filters.startDate && filters.endDate
            ? {
                startDate: filters.startDate,
                endDate: filters.endDate,
              }
            : null,
      };

      return await getActivities(apiFilters);
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    activitiesData: data ?? [],
    isLoading,
    refetch,
  };
};