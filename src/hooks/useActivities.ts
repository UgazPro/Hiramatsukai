import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getActivities,
  ActivitiesFilter,
  getUpcomingExams,
  getAppliedStudents,
  getAppliedStudentSuggestions,
  createAppliedStudent,
  getPastExams,
  getExamsByActivity,
} from "@/services/activities/activity.service";
import { useActivitiesStore } from "@/stores/activities.store";
import { IActivity, IExam } from "@/services/activities/activity.interface";

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

// Exams
export const useUpcomingExams = () => {
  const { data, isLoading } = useQuery<IActivity[]>({
    queryKey: ["upcomingExams"],
    queryFn: getUpcomingExams,
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


