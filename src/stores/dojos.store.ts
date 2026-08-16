import { IDojo } from "@/services/dojos/dojo.interface";
import { create } from "zustand";

export type DojoScreen = "main" | "detail" | "form";
export type DojoViewMode = "table" | "cards";

interface DojosStore {
  mode: "create" | "edit";

  screen: DojoScreen;
  setScreen: (screen: DojoScreen) => void;

  viewMode: DojoViewMode;
  setViewMode: (view: DojoViewMode) => void;

  startCreate: () => void;
  startEdit: (dojo: IDojo) => void;
  finishForm: () => void;

  selectedDojo: IDojo | null;
  setSelectedDojo: (dojo: IDojo | null) => void;

  searchTerm: string;
  setSearchTerm: (v: string) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}

export const useDojosStore = create<DojosStore>((set) => ({
  mode: "create",

  screen: "main",
  setScreen: (newScreen) => set({ screen: newScreen }),

  viewMode: "table",
  setViewMode: (view) => set({ viewMode: view }),

  startCreate: () =>
    set({
      mode: "create",
      selectedDojo: null,
      screen: "form",
    }),
  startEdit: (dojo) =>
    set({
      mode: "edit",
      selectedDojo: dojo,
      screen: "form",
    }),
  finishForm: () =>
    set({
      screen: "main",
      selectedDojo: null,
      mode: "create",
    }),

  selectedDojo: null,
  setSelectedDojo: (dojo) => set({ selectedDojo: dojo }),

  searchTerm: "",
  setSearchTerm: (v) => set({ searchTerm: v }),

  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  itemsPerPage: 6,
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
}));
