import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getActivities,
  ActivitiesFilter,
  getAppliedStudents,
  getAppliedStudentSuggestions,
  createAppliedStudent,
  getPastExams,
  getExamsByActivity,
  getExamsByUser,
  saveExam,
  formatDateOnly,
} from "@/services/activities/activity.service";
import { useActivitiesStore } from "@/stores/activities.store";
import { IActivity, IExam } from "@/services/activities/activity.interface";

const getActivitiesQueryKey = (filters: ActivitiesFilter) => [
  "activities",
  Boolean(filters.includePast),
  filters.dateRange?.startDate ? formatDateOnly(filters.dateRange.startDate) : null,
  filters.dateRange?.endDate ? formatDateOnly(filters.dateRange.endDate) : null,
];

export const useActivities = () => {
  const { filters } = useActivitiesStore();

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

  const { data, isLoading, refetch } = useQuery<IActivity[]>({
    queryKey: getActivitiesQueryKey(apiFilters),
    queryFn: () => getActivities(apiFilters),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    activitiesData: data ?? [],
    isLoading,
    refetch,
  };
};

// Exams
export const useUpcomingExams = () => {
  const baseFilters: ActivitiesFilter = {
    includePast: false,
    dateRange: null,
  };

  const { data, isLoading } = useQuery<IActivity[]>({
    queryKey: getActivitiesQueryKey(baseFilters),
    queryFn: () => getActivities(baseFilters),
    select: (activities) => activities.filter((a: IActivity) => a.type === "Examen"),
    staleTime: 1000 * 60 * 5,
  });

  return {
    upcomingExams: data ?? [],
    isLoading,
  };
};

// Applied Students
export const useAppliedStudents = (activityId?: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["appliedStudents", activityId],
    queryFn: () => getAppliedStudents(activityId),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30,
    refetchIntervalInBackground: false,
  });

  return {
    appliedStudents: data ?? [],
    isLoading,
  };
};

export const useAppliedStudentSuggestions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["appliedStudentSuggestions"],
    queryFn: getAppliedStudentSuggestions,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30,
    refetchIntervalInBackground: false,
  });

  return {
    suggestions: data ?? [],
    isLoading,
  };
};

export const useCreateAppliedStudent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createAppliedStudent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appliedStudents"] });
      qc.invalidateQueries({ queryKey: ["appliedStudentSuggestions"] });
    },
  });
};

// Exams History
export const useExamsHistory = () => {
  const { data, isLoading } = useQuery<IActivity[]>({
    queryKey: ["examsHistory"],
    queryFn: getPastExams,
    staleTime: 1000 * 60 * 5,
  });

  return {
    pastExams: data ?? [],
    isLoading,
  };
};

export const useExamsByActivity = (activityId: number | null) => {
  const { data, isLoading } = useQuery<IExam[]>({
    queryKey: ["examsByActivity", activityId],
    queryFn: () => getExamsByActivity(activityId!),
    enabled: Boolean(activityId),
    staleTime: 1000 * 60 * 5,
  });

  return {
    exams: data ?? [],
    isLoading,
  };
};

export const useExamsByUser = (userId: number | null) => {
  const { data, isLoading } = useQuery<IExam[]>({
    queryKey: ["examsByUser", userId],
    queryFn: () => getExamsByUser(userId!),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });

  return {
    exams: data ?? [],
    isLoading,
  };
};

export const useSaveExam = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: saveExam,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appliedStudents"] });
      qc.invalidateQueries({ queryKey: ["examsByActivity"] });
      qc.invalidateQueries({ queryKey: ["examsByUser"] });
    },
  });
};


