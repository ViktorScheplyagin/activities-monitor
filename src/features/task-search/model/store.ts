import { SearchFilter, SearchParams } from "@/entities/task";
import { create } from "zustand";

interface TaskSearchState extends Required<SearchParams> {
  setQuery: (query: string) => void;
  toggleFilter: (param: SearchFilter) => void;
}

export const useTaskSearchStore = create<TaskSearchState>((set) => ({
  query: "",
  filters: ["name", "description"],
  setQuery: (query) => set({ query }),

  toggleFilter: (param) =>
    set((state) => {
      const isFilterActive = state.filters.includes(param);
      const isLastActiveFilter = state.filters.length === 1;

      if (isFilterActive && isLastActiveFilter) {
        return state;
      }

      return {
        filters: isFilterActive
          ? state.filters.filter((p) => p !== param)
          : [...state.filters, param],
      };
    }),
}));
