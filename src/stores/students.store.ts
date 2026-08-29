import { IStudent, ViewMode } from "@/services/students/student.interface";
import { SortState } from "@/helpers/sort";
import { create } from "zustand";

type StudentScreen = "list" | "detail" | "edit" | "form";

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

  dojoFilter: number | null;
  setDojoFilter: (id: number | null) => void;

  sort: SortState;
  setSort: (sort: SortState) => void;
  resetSort: () => void;
}

export const useStudentsStore = create<StudentsStore>((set) => ({

  mode: "create",
  
  viewMode: "grid",
  setViewMode: (view) => set({ viewMode: view }),

  screen: "list",
  setScreen: (screen) => set({ screen }),

  selectedStudent: null,
  selectStudent: (student) => set({ selectedStudent: student, screen: "detail" }),
  clearSelectedStudent: () => set({ selectedStudent: null, screen: "list" }),

  startCreate: () => set({
    mode: "create",
    selectedStudent: null,
    screen: "form",
  }),

  startEdit: (student) => set({
    mode: "edit",
    selectedStudent: student,
    screen: "form",
  }),

  finishForm: () => set({
    screen: "list",
    selectedStudent: null,
    mode: "create",
  }),

  searchTerm: "",
  setSearchTerm: (v) => set({ searchTerm: v }),

  dojoFilter: null,
  setDojoFilter: (id) => set({ dojoFilter: id }),

  sort: { field: null, direction: null },
  setSort: (sort) => set({ sort }),
  resetSort: () => set({ sort: { field: null, direction: null } }),

}));
