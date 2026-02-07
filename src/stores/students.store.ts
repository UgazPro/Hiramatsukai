import { FilterStatus, IStudent, ViewMode } from "@/services/students/student.interface";
import { create } from "zustand";

type StudentScreen = "list" | "detail" | "edit";

interface StudentsStore {

  mode: "create" | "edit";

  viewMode: ViewMode;
  setViewMode: (view: ViewMode) => void;

  screen: StudentScreen;
  setScreen: (screen: StudentScreen) => void;

  selectedStudent: IStudent | null;
  selectStudent: (student: IStudent) => void;
  clearSelectedStudent: () => void;

  startCreate: () => void;
  startEdit: (student: IStudent) => void;
  finishForm: () => void;

  searchTerm: string;
  setSearchTerm: (v: string) => void;

  filterDojo: string;
  setFilterDojo: (v: string) => void;

  filterRol: string;
  setFilterRol: (v: string) => void;

  filterActivo: FilterStatus;
  setFilterActivo: (v: FilterStatus) => void;

  showFilters: boolean;
  toggleFilters: () => void;
  resetFilters: () => void;

  usingForm: boolean;
  openForm: () => void;
  closeForm: () => void;
}

export const useStudentsStore = create<StudentsStore>((set) => ({

  mode: "create",
  
  viewMode: "list",
  setViewMode: (view) => set({ viewMode: view }),

  screen: "list",
  setScreen: (screen) => set({ screen }),

  selectedStudent: null,
  selectStudent: (student) => set({ selectedStudent: student, screen: "detail" }),
  clearSelectedStudent: () => set({ selectedStudent: null, screen: "list" }),

  startCreate: () => set({
    mode: "create",
    selectedStudent: null,
    usingForm: true,
  }),

  startEdit: (student) => set({
    mode: "edit",
    selectedStudent: student,
    usingForm: true,
  }),

  finishForm: () => set({
    usingForm: false,
    selectedStudent: null,
    mode: "create",
  }),

  searchTerm: "",
  setSearchTerm: (v) => set({ searchTerm: v }),

  filterDojo: "all",
  setFilterDojo: (v) => set({ filterDojo: v }),

  filterRol: "all",
  setFilterRol: (v) => set({ filterRol: v }),

  filterActivo: "all",
  setFilterActivo: (v) => set({ filterActivo: v }),

  showFilters: false,
  toggleFilters: () => set((state) => ({ showFilters: !state.showFilters })),

  resetFilters: () => set({ searchTerm: "", filterDojo: "all", filterRol: "all", filterActivo: "all", }),

  usingForm: false,
  openForm: () => set({ usingForm: true }),
  closeForm: () => set({ usingForm: false }),

}));
