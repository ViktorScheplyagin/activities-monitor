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
    // Minutes and seconds state
    workMinutes: string;
    workSeconds: string;
    breakMinutes: string;
    breakSeconds: string;
    longBreakMinutes: string;
    longBreakSeconds: string;
    setWorkMinutes: (minutes: string) => void;
    setWorkSeconds: (seconds: string) => void;
    setBreakMinutes: (minutes: string) => void;
    setBreakSeconds: (seconds: string) => void;
    setLongBreakMinutes: (minutes: string) => void;
    setLongBreakSeconds: (seconds: string) => void;
    // Original methods
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
    skippedTimeSpent: number;
    setSkippedTimeSpent: (time: number) => void;
    // Helper methods for time calculations
    applyWorkTime: () => void;
    applyBreakTime: () => void;
    applyLongBreakTime: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
    mode: "work",
    isRunning: false,
    workDuration: TIMER_OPTIONS.work[0].value,
    breakDuration: TIMER_OPTIONS.break[0].value,
    longBreakDuration: TIMER_OPTIONS.longBreak[0].value,
    timeLeft: TIMER_OPTIONS.work[0].value,
    sessionsCount: 0,
    skippedTimeSpent: 0,
    // Initialize minutes and seconds
    workMinutes: Math.floor(TIMER_OPTIONS.work[0].value / 60).toString(),
    workSeconds: (TIMER_OPTIONS.work[0].value % 60).toString().padStart(2, "0"),
    breakMinutes: Math.floor(TIMER_OPTIONS.break[0].value / 60).toString(),
    breakSeconds: (TIMER_OPTIONS.break[0].value % 60)
        .toString()
        .padStart(2, "0"),
    longBreakMinutes: Math.floor(
        TIMER_OPTIONS.longBreak[0].value / 60
    ).toString(),
    longBreakSeconds: (TIMER_OPTIONS.longBreak[0].value % 60)
        .toString()
        .padStart(2, "0"),
    // Setters for minutes and seconds
    setWorkMinutes: (minutes) => set({ workMinutes: minutes }),
    setWorkSeconds: (seconds) => set({ workSeconds: seconds }),
    setBreakMinutes: (minutes) => set({ breakMinutes: minutes }),
    setBreakSeconds: (seconds) => set({ breakSeconds: seconds }),
    setLongBreakMinutes: (minutes) => set({ longBreakMinutes: minutes }),
    setLongBreakSeconds: (seconds) => set({ longBreakSeconds: seconds }),
    // Helper methods to apply time changes
    applyWorkTime: () => {
        const state = get();
        const mins = parseInt(state.workMinutes) || 0;
        const secs = parseInt(state.workSeconds) || 0;
        const totalSeconds = mins * 60 + secs;

        if (totalSeconds > 0) {
            set({ workDuration: totalSeconds });
            if (state.mode === "work") {
                set({ timeLeft: totalSeconds });
            }
        }
    },
    applyBreakTime: () => {
        const state = get();
        const mins = parseInt(state.breakMinutes) || 0;
        const secs = parseInt(state.breakSeconds) || 0;
        const totalSeconds = mins * 60 + secs;

        if (totalSeconds > 0) {
            set({ breakDuration: totalSeconds });
            if (state.mode === "break") {
                set({ timeLeft: totalSeconds });
            }
        }
    },
    applyLongBreakTime: () => {
        const state = get();
        const mins = parseInt(state.longBreakMinutes) || 0;
        const secs = parseInt(state.longBreakSeconds) || 0;
        const totalSeconds = mins * 60 + secs;

        if (totalSeconds > 0) {
            set({ longBreakDuration: totalSeconds });
            if (state.mode === "longBreak") {
                set({ timeLeft: totalSeconds });
            }
        }
    },
    // Original methods
    setTimeLeft: (time) => set({ timeLeft: time }),
    setMode: (mode) => set({ mode }),
    setIsRunning: (isRunning) => set({ isRunning }),
    setWorkDuration: (duration) => {
        set({
            workDuration: duration,
            workMinutes: Math.floor(duration / 60).toString(),
            workSeconds: (duration % 60).toString().padStart(2, "0"),
        });
    },
    setBreakDuration: (duration) => {
        set({
            breakDuration: duration,
            breakMinutes: Math.floor(duration / 60).toString(),
            breakSeconds: (duration % 60).toString().padStart(2, "0"),
        });
    },
    setLongBreakDuration: (duration) => {
        set({
            longBreakDuration: duration,
            longBreakMinutes: Math.floor(duration / 60).toString(),
            longBreakSeconds: (duration % 60).toString().padStart(2, "0"),
        });
    },
    setSkippedTimeSpent: (time) => set({ skippedTimeSpent: time }),
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
                    // Calculate time spent in current work session
                    const timeSpent = state.workDuration - state.timeLeft;

                    // Store the time spent for TimeAccumulator to use
                    set({ skippedTimeSpent: timeSpent });

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
