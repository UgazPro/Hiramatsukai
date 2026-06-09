import { useMemo } from "react";
import { IActivity } from "@/services/activities/activity.interface";
import { useActivitiesStore } from "@/stores/activities.store";
import { isSameDay } from "date-fns";

export const useFilteredActivities = (activities: IActivity[] = []) => {
  const { searchTerm, filters } = useActivitiesStore();

  return useMemo(() => {
    const searchLower = searchTerm.trim().toLowerCase();

    const pad = (n: number) => String(n).padStart(2, "0");
    const fmtDate = (d: Date) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    return activities.filter((activity) => {
      const matchesSearch =
        !searchLower ||
        activity.name.toLowerCase().includes(searchLower) ||
        activity.place.toLowerCase().includes(searchLower);

      const matchesType =
        !filters.type ||
        activity.type.toLowerCase().trim() ===
          filters.type.toLowerCase().trim();

      let matchesDate = true;
      if (filters.startDate) {
        const isRange =
          filters.endDate && !isSameDay(filters.startDate, filters.endDate);

        if (isRange) {
          const aStr = fmtDate(new Date(activity.date));
          matchesDate =
            aStr >= fmtDate(filters.startDate) &&
            aStr <= fmtDate(filters.endDate as Date);
        } else {
          matchesDate = isSameDay(new Date(activity.date), filters.startDate);
        }
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [activities, searchTerm, filters.type, filters.startDate, filters.endDate]);
};
