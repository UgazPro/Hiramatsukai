import { IActivity } from "@/services/activities/activity.interface";
import {
  ActivitiesFilter,
  getActivities,
} from "@/services/activities/activity.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useActivities = () => {
    
  const [includePast, setIncludePast] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { data: activitiesData, isLoading } = useInfiniteQuery<IActivity[]>({
    queryKey: ["activities", { includePast, startDate, endDate }],
    queryFn: async () => {
      const filters: ActivitiesFilter = {
        includePast
      };
      if (startDate && endDate) {
        filters.dateRange = {
          startDate,
          endDate,
        };
      }
      return await getActivities(filters);
    },
    initialPageParam: 1,
    enabled: true,
    getNextPageParam: (lastPage) => {
      return lastPage.length > 0
        ? { page: lastPage.length / 10 + 1 }
        : undefined;
    },

    staleTime: 1000 * 60 * 5,
  });

  return {
    includePast,
    setIncludePast,
    startDate,
    setStartDate,
    endDate,
    setEndDate,

    activitiesData, 
    isLoading
  };
};
