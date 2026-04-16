import { useMemo } from "react";
import { IActivity } from "@/services/activities/activity.interface";
import { useActivitiesStore } from "@/stores/activities.store";

export const useFilteredActivities = (activities: IActivity[] = []) => {
  const { searchTerm, filters } = useActivitiesStore();

  return useMemo(() => {
    const searchLower = searchTerm.trim().toLowerCase();

    return activities.filter((activity) => {
      // Filter by search term (name or place)
      const matchesSearch =
        !searchLower ||
        activity.name.toLowerCase().includes(searchLower) ||
        activity.place.toLowerCase().includes(searchLower);

      // Filter by type
      const matchesType =
        !filters.type ||
        activity.type.toLowerCase().trim() ===
          filters.type.toLowerCase().trim();

      return matchesSearch && matchesType;
    });
  }, [activities, searchTerm, filters.type]);
};
