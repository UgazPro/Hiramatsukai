import { getDataApi, postDataApi } from "../api";
import { IActivity, IExam } from "./activity.interface";
import { getUserDataSafe } from "@/helpers/token";

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
const studentsAsignedToExamUrl = "/activities/applied-students";

export const getActivities = async (
  filters?: ActivitiesFilter,
): Promise<IActivity[]> => {
  let param = "";
  if (filters) {
    const queryParams = new URLSearchParams();

    if (filters.dateRange?.startDate && filters.dateRange?.endDate) {
      queryParams.append(
        "startDate",
        formatDateOnly(filters.dateRange.startDate),
      );
      queryParams.append("endDate", formatDateOnly(filters.dateRange.endDate));
    }

    if (filters.includePast !== undefined && filters.includePast !== null) {
      queryParams.append("includePast", filters.includePast.toString());
    }

    param = queryParams.toString();
  }

  const url = `${activitiesUrl}${param ? `?${param}` : ""}`;
  return await getDataApi(url);
};

// Exams

export const getUpcomingExams = async (): Promise<IActivity[]> => {
  const apiFilters: ActivitiesFilter = {
    includePast: false,
  };
  const activities = await getActivities(apiFilters);
  return activities.filter((a: IActivity) => a.type === "Examen");
};

export const getCurrentActivity = async (dojoId?: number) => {
  const url = dojoId ? `/activities/current?dojoId=${dojoId}` : '/activities/current';
  return await getDataApi(url);
};

export const getActivityAttendance = async (activityId: number) => {
  return await getDataApi(`/activities/attendance/${activityId}`);
};

// Applied Students (postulaciones)
export const getAppliedStudents = async (activityId?: number) => {
  const url = activityId
    ? `${studentsAsignedToExamUrl}?activityId=${activityId}`
    : studentsAsignedToExamUrl;
  return await getDataApi(url);
};

export const getAppliedStudentSuggestions = async () => {
  const user = getUserDataSafe();
  const params = user?.dojoId ? `?dojoId=${user.dojoId}` : "";
  return await getDataApi(`${studentsAsignedToExamUrl}/suggestions${params}`);
};

export const createAppliedStudent = async (data: {
  activityId: number;
  appliedStudents: { userId: number; martialArtId: number }[];
}) => {
  return await postDataApi(studentsAsignedToExamUrl, data);
};

// Exams History

export const getPastExams = async (): Promise<IActivity[]> => {
  const apiFilters: ActivitiesFilter = {
    includePast: true,
  };
  const activities = await getActivities(apiFilters);
  const now = new Date();
  return activities.filter(
    (a: IActivity) => a.type === "Examen" && new Date(a.date) < now,
  );
};

export const getExamsByActivity = async (
  activityId: number,
): Promise<IExam[]> => {
  return await getDataApi(`${activitiesUrl}/exams?activityId=${activityId}`);
};

export const getExamsByUser = async (userId: number): Promise<IExam[]> => {
  return await getDataApi(`${activitiesUrl}/exams?userId=${userId}`);
};

export const saveExam = async (data: {
  exams: { martialArtId: number; userId: number; status: "Aprobado" | "Reprobado" }[];
}) => {
  return await postDataApi(`${activitiesUrl}/exams`, data);
};
