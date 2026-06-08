import { IStudent, ViewMode } from "@/services/students/student.interface";
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

}));
