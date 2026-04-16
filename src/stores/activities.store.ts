import { IActivity } from "@/services/activities/activity.interface";
import { create } from "zustand";

export type activityScreen = "main" | "detail";

interface ActivitiesFilters {
  type: string;
  place: string;
  includePast: boolean;
  startDate: Date | null;
  endDate: Date | null;
}

interface ActivitiesStore {
  mode: "create" | "edit";

  screen: activityScreen;
  setScreen: (screen: activityScreen) => void;

  startCreate: () => void;
  startEdit: (activity: IActivity) => void;
  finishForm: () => void;

  usingForm: boolean;
  openForm: () => void;
  closeForm: () => void;

  currentDate: Date;
  setCurrentDate: (date: Date) => void;

  selectedActivity: IActivity | null;
  setSelectedActivity: (activity: IActivity) => void;

  cSelectedActivity: IActivity | null;
  setCSelectedActivity: (activity: IActivity) => void;

  showCalendar: boolean;
  toggleCalendar: (state: boolean) => void;

  // Filters
  filters: ActivitiesFilters;
  setFilters: (filters: Partial<ActivitiesFilters>) => void;
  resetFilters: () => void;
  removeFilter: (key: keyof ActivitiesFilters) => void;

  searchTerm: string;
  setSearchTerm: (v: string) => void;
}

export const useActivitiesStore = create<ActivitiesStore>((set) => ({
  mode: "create",

  screen: "main",
  setScreen: (newScreen) => set({ screen: newScreen }),

  startCreate: () =>
    set({
      mode: "create",
      selectedActivity: null,
      usingForm: true,
    }),
  startEdit: (activity) =>
    set({
      mode: "edit",
      selectedActivity: activity,
      usingForm: true,
    }),
  finishForm: () =>
    set({
      usingForm: false,
      selectedActivity: null,
      mode: "create",
    }),

  usingForm: false,
  openForm: () =>
    set({
      usingForm: true,
      mode: "create",
      selectedActivity: null,
    }),
  closeForm: () => set({ usingForm: false }),

  currentDate: new Date(),
  setCurrentDate: (date) => set({ currentDate: date }),

  selectedActivity: null,
  setSelectedActivity: (activity) => set({ selectedActivity: activity }),

  cSelectedActivity: null,
  setCSelectedActivity: (activity) => set({ cSelectedActivity: activity }),

  showCalendar: true,
  toggleCalendar: (state: boolean) => set({ showCalendar: !state }),

  // Filters
  filters: {
    type: "",
    place: "",
    includePast: false,
    startDate: null,
    endDate: null,
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  removeFilter: (key) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]:
          key === "includePast"
            ? false
            : key === "startDate" || key === "endDate"
              ? null
              : "",
      },
    })),

  resetFilters: () =>
    set({
      filters: {
        type: "",
        place: "",
        includePast: false,
        startDate: null,
        endDate: null,
      },
    }),

  searchTerm: "",
  setSearchTerm: (v) => set({ searchTerm: v }),
}));
