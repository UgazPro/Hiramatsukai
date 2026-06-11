import { IActivity } from "@/services/activities/activity.interface";
import { create } from "zustand";

export type activityScreen = "main" | "detail" | "form";
export type ActivityViewMode = "table" | "cards";

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

  viewMode: ActivityViewMode;
  setViewMode: (view: ActivityViewMode) => void;

  startCreate: () => void;
  startEdit: (activity: IActivity) => void;
  finishForm: () => void;

  usingForm: boolean;
  openForm: () => void;
  closeForm: () => void;

  currentDate: Date;
  setCurrentDate: (date: Date) => void;

  selectedActivity: IActivity | null;
  setSelectedActivity: (activity: IActivity | null) => void;

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

  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}

export const useActivitiesStore = create<ActivitiesStore>((set) => ({
  mode: "create",

  screen: "main",
  setScreen: (newScreen) => set({ screen: newScreen }),

  viewMode: "table",
  setViewMode: (view) => set({ viewMode: view }),

  startCreate: () =>
    set({
      mode: "create",
      selectedActivity: null,
      screen: "form",
    }),
  startEdit: (activity) =>
    set({
      mode: "edit",
      selectedActivity: activity,
      screen: "form",
    }),
  finishForm: () =>
    set({
      screen: "main",
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

  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  itemsPerPage: 6,
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
}));
