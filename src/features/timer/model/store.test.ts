import { TIMER_OPTIONS } from "../constants/timerOptions";
import { useTimerStore } from "./store";

describe("Timer Store", () => {
  beforeEach(() => {
    useTimerStore.setState({
      timeLeft: TIMER_OPTIONS.work[0].value,
      mode: "work",
      isRunning: false,
      workDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,
      sessionsCount: 0,
    });
  });

  describe("initial state", () => {
    it("should initialize with default values", () => {
      const state = useTimerStore.getState();
      expect(state.mode).toBe("work");
      expect(state.isRunning).toBe(false);
      expect(state.timeLeft).toBe(TIMER_OPTIONS.work[0].value);
      expect(state.workDuration).toBe(25);
      expect(state.breakDuration).toBe(5);
      expect(state.longBreakDuration).toBe(15);
      expect(state.sessionsCount).toBe(0);
    });
  });

  describe("timer controls", () => {
    it("should set mode", () => {
      useTimerStore.getState().setMode("break");
      expect(useTimerStore.getState().mode).toBe("break");
    });

    it("should set isRunning", () => {
      useTimerStore.getState().setIsRunning(true);
      expect(useTimerStore.getState().isRunning).toBe(true);
    });

    it("should set timeLeft", () => {
      useTimerStore.getState().setTimeLeft(300);
      expect(useTimerStore.getState().timeLeft).toBe(300);
    });
  });

  describe("session management", () => {
    it("should increment session count", () => {
      useTimerStore.getState().incrementSession();
      expect(useTimerStore.getState().sessionsCount).toBe(1);
    });

    it("should reset session count", () => {
      useTimerStore.getState().incrementSession();
      useTimerStore.getState().incrementSession();
      useTimerStore.getState().resetSession();
      expect(useTimerStore.getState().sessionsCount).toBe(0);
    });
  });

  describe("duration settings", () => {
    it("should change work duration", () => {
      const newDuration = 30;
      useTimerStore.getState().setWorkDuration(newDuration);
      expect(useTimerStore.getState().workDuration).toBe(newDuration);
    });

    it("should change break duration", () => {
      const newDuration = 10;
      useTimerStore.getState().setBreakDuration(newDuration);
      expect(useTimerStore.getState().breakDuration).toBe(newDuration);
    });

    it("should change long break duration", () => {
      const newDuration = 20;
      useTimerStore.getState().setLongBreakDuration(newDuration);
      expect(useTimerStore.getState().longBreakDuration).toBe(newDuration);
    });
  });

  describe("reset timer", () => {
    it("should reset timer in work mode", () => {
      const state = useTimerStore.getState();
      state.setTimeLeft(10);
      state.setIsRunning(true);
      state.resetTimer();

      expect(useTimerStore.getState().timeLeft).toBe(state.workDuration * 60);
      expect(useTimerStore.getState().isRunning).toBe(false);
    });

    it("should reset timer in break mode", () => {
      const state = useTimerStore.getState();
      state.setMode("break");
      state.setTimeLeft(10);
      state.setIsRunning(true);
      state.resetTimer();

      expect(useTimerStore.getState().timeLeft).toBe(state.breakDuration * 60);
      expect(useTimerStore.getState().isRunning).toBe(false);
    });

    it("should reset timer in long break mode", () => {
      const state = useTimerStore.getState();
      state.setMode("longBreak");
      state.setTimeLeft(10);
      state.setIsRunning(true);
      state.resetTimer();

      expect(useTimerStore.getState().timeLeft).toBe(
        state.longBreakDuration * 60
      );
      expect(useTimerStore.getState().isRunning).toBe(false);
    });
  });
});
