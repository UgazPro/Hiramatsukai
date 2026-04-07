import { getDataApi } from "../api";
import { IActivity } from "./activity.interface";

export interface ActivitiesFilter {
  dateRange?: DateRange | null;
  includePast?: boolean | null;
}

export interface DateRange {
  startDate: Date | string;
  endDate: Date | string;
}

export const formatDateOnly = (value: Date | string): string => {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
};

const activitiesUrl = "/activities";

export const getActivities = async (filters?: ActivitiesFilter): Promise<IActivity[]> => {
  let param = "";
  if (filters) {
    const queryParams = new URLSearchParams();
    if (filters.dateRange) {
      queryParams.append(
        "startDate",
        formatDateOnly(filters.dateRange.startDate),
      );
      queryParams.append(
        "endDate",
        formatDateOnly(filters.dateRange.endDate),
      );
    }
    if (filters.includePast) {
      queryParams.append("includePast", filters.includePast.toString());
    }
    param = queryParams.toString();
  }

  const url = `${activitiesUrl}${param ? `?${param}` : ""}`;
  return await getDataApi(url);
};
