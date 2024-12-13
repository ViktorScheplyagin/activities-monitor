import { create } from "zustand";
import { tasksApi } from "@/entities/task";

interface TimeAccumulatorState {
  totalTime: number;
  setTotalTime: (time: number) => void;
  updateAccumulatedTime: (taskId: string, time: number) => Promise<void>;
}

export const useTimeAccumulatorStore = create<TimeAccumulatorState>((set) => ({
  totalTime: 0,
  setTotalTime: (time: number) => set({ totalTime: time }),
  updateAccumulatedTime: async (taskId: string, time: number) => {
    try {
      set({ totalTime: time });
      await tasksApi.update(taskId, { time });
    } catch (error) {
      console.error("Failed to save accumulated time:", error);
    }
  },
}));
