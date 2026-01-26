import { FilterStatus, ViewMode } from "@/services/users/user.interface";
import { create } from "zustand";

interface StudentsStore {

  viewMode: ViewMode;
  setViewMode: (view: ViewMode) => void;

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

  isCreateStudentOpen: boolean;
  openCreateStudent: () => void;
  closeCreateStudent: () => void;
  toggleCreateStudent: () => void;
}

export const useStudentsStore = create<StudentsStore>((set) => ({
  

  viewMode: "list",
  setViewMode: (view) => set({ viewMode: view }),

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

  isCreateStudentOpen: false,
  openCreateStudent: () => set({ isCreateStudentOpen: true }),
  closeCreateStudent: () => set({ isCreateStudentOpen: false }),
  toggleCreateStudent: () => set((state) => ({ isCreateStudentOpen: !state.isCreateStudentOpen })),

}));
