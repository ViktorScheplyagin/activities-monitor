import { TIMER_OPTIONS } from "../constants/timerOptions";
import { create } from "zustand";

export type TimerMode = "work" | "break";

interface TimerStore {
  mode: TimerMode;
  isRunning: boolean;
  timeLeft: number;
  workDuration: number;
  breakDuration: number;
  setMode: (mode: TimerMode) => void;
  setIsRunning: (isRunning: boolean) => void;
  setTimeLeft: (timeLeft: number) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  changeWorkDuration: (duration: number) => void;
  changeBreakDuration: (duration: number) => void;
}

export const useStore = create<TimerStore>((set, get) => ({
  mode: "work",
  isRunning: false,
  timeLeft: TIMER_OPTIONS.work[0].value,
  workDuration: TIMER_OPTIONS.work[0].value,
  breakDuration: TIMER_OPTIONS.break[0].value,
  setMode: (mode) => set({ mode }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  toggleTimer: () => set((state) => ({ isRunning: !state.isRunning })),
  resetTimer: () =>
    set({
      isRunning: false,
      mode: "work",
      timeLeft: get().workDuration,
    }),
  changeWorkDuration: (duration) => {
    const { mode, timeLeft } = get();
    set({
      workDuration: duration,
      timeLeft: mode === "work" ? duration : timeLeft,
      isRunning: false,
    });
  },
  changeBreakDuration: (duration) => {
    const { mode, timeLeft } = get();
    set({
      breakDuration: duration,
      timeLeft: mode === "break" ? duration : timeLeft,
      isRunning: false,
    });
  },
}));
