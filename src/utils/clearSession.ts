import { useAuthStore } from "@/stores/auth.store";
import { useStudentsStore } from "@/stores/students.store";
import { useActivitiesStore } from "@/stores/activities.store";
import { useApplicationsStore } from "@/stores/applications.store";
import { queryClient } from "@/main";

export function clearSession() {
  localStorage.clear();

  useAuthStore.setState({
    token: null,
    isAuthenticated: false,
    user: null,
  });

  useStudentsStore.setState({
    selectedStudent: null,
    screen: "list",
  });

  useActivitiesStore.setState({
    selectedActivity: null,
    screen: "main",
    cSelectedActivity: null,
  });

  useApplicationsStore.setState({
    screen: "list",
    selectedActivityId: null,
    selectedExamActivityId: null,
    selectedStudentId: null,
    selectedNextExamId: null,
    selectedNextExamData: null,
  });

  queryClient.clear();
}
