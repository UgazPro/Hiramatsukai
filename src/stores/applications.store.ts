import { create } from "zustand";

export type AppScreen = "list" | "postulationForm" | "examDetail" | "studentDetail";

interface ApplicationsStore {
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  selectedActivityId: number | null;
  setSelectedActivityId: (id: number | null) => void;
  openPostulationForm: (activityId?: number) => void;
  closeForm: () => void;
  selectedExamActivityId: number | null;
  openExamDetail: (activityId: number) => void;
  closeExamDetail: () => void;
  selectedStudentId: number | null;
  openStudentDetail: (studentId: number) => void;
  closeStudentDetail: () => void;
}

export const useApplicationsStore = create<ApplicationsStore>((set) => ({
  screen: "list",
  setScreen: (screen) => set({ screen }),

  selectedActivityId: null,
  setSelectedActivityId: (id) => set({ selectedActivityId: id }),

  openPostulationForm: (activityId) =>
    set({
      screen: "postulationForm",
      selectedActivityId: activityId ?? null,
    }),

  closeForm: () =>
    set({
      screen: "list",
      selectedActivityId: null,
    }),

  selectedExamActivityId: null,
  openExamDetail: (activityId) =>
    set({
      screen: "examDetail",
      selectedExamActivityId: activityId,
    }),
  closeExamDetail: () =>
    set({
      screen: "list",
      selectedExamActivityId: null,
    }),

  selectedStudentId: null,
  openStudentDetail: (studentId) =>
    set({
      screen: "studentDetail",
      selectedStudentId: studentId,
    }),
  closeStudentDetail: () =>
    set({
      screen: "list",
      selectedStudentId: null,
    }),
}));
