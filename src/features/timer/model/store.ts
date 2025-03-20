import { create } from "zustand";
import { TimerMode } from "./types";
import { TIMER_OPTIONS } from "../constants/timerOptions";

interface TimerState {
    timeLeft: number;
    mode: TimerMode;
    isRunning: boolean;
    workDuration: number;
    breakDuration: number;
    longBreakDuration: number;
    sessionsCount: number;
    setTimeLeft: (time: number) => void;
    setMode: (mode: TimerMode) => void;
    setIsRunning: (isRunning: boolean) => void;
    setWorkDuration: (duration: number) => void;
    setBreakDuration: (duration: number) => void;
    setLongBreakDuration: (duration: number) => void;
    incrementSession: () => void;
    resetSession: () => void;
    resetTimer: () => void;
    skipTimer: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
    mode: "work",
    isRunning: false,
    workDuration: TIMER_OPTIONS.work[0].value,
    breakDuration: TIMER_OPTIONS.break[0].value,
    longBreakDuration: TIMER_OPTIONS.longBreak[0].value,
    timeLeft: TIMER_OPTIONS.work[0].value,
    sessionsCount: 0,
    setTimeLeft: (time) => set({ timeLeft: time }),
    setMode: (mode) => set({ mode }),
    setIsRunning: (isRunning) => set({ isRunning }),
    setWorkDuration: (duration) => set({ workDuration: duration }),
    setBreakDuration: (duration) => set({ breakDuration: duration }),
    setLongBreakDuration: (duration) => set({ longBreakDuration: duration }),
    incrementSession: () => {
        set((state) => ({ sessionsCount: state.sessionsCount + 1 }));
    },
    resetSession: () => set({ sessionsCount: 0 }),
    resetTimer: () =>
        set((state) => {
            let timeLeft;
            switch (state.mode) {
                case "work":
                    timeLeft = state.workDuration;
                    break;
                case "break":
                    timeLeft = state.breakDuration;
                    break;
                case "longBreak":
                    timeLeft = state.longBreakDuration;
                    break;
            }
            return {
                ...state,
                timeLeft,
                isRunning: false,
            };
        }),
    skipTimer: () =>
        set((state) => {
            let nextMode: TimerMode;
            let nextTimeLeft: number;

            // Determine next mode based on current mode
            switch (state.mode) {
                case "work":
                    if (state.sessionsCount % 4 === 3) {
                        // Next would be the 4th session
                        nextMode = "longBreak";
                        nextTimeLeft = state.longBreakDuration;
                    } else {
                        nextMode = "break";
                        nextTimeLeft = state.breakDuration;
                    }
                    // Increment session count when skipping work mode
                    set((s) => ({ sessionsCount: s.sessionsCount + 1 }));
                    break;
                case "break":
                case "longBreak":
                    nextMode = "work";
                    nextTimeLeft = state.workDuration;
                    break;
                default:
                    nextMode = state.mode;
                    nextTimeLeft = state.timeLeft;
            }

            return {
                mode: nextMode,
                timeLeft: nextTimeLeft,
                isRunning: false,
            };
        }),
}));
