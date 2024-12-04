import { TIMER_OPTIONS } from "../constants/timerOptions";
import { useStore } from "./store";

describe("Timer Store", () => {
  beforeEach(() => {
    useStore.setState({
      mode: "work",
      isRunning: false,
      timeLeft: TIMER_OPTIONS.work[0].value,
      workDuration: TIMER_OPTIONS.work[0].value,
      breakDuration: TIMER_OPTIONS.break[0].value,
    });
  });

  describe("initial state", () => {
    const state = useStore.getState();
    expect(state.mode).toBe("work");
    expect(state.isRunning).toBe(false);
    expect(state.timeLeft).toBe(TIMER_OPTIONS.work[0].value);
    expect(state.workDuration).toBe(TIMER_OPTIONS.work[0].value);
    expect(state.breakDuration).toBe(TIMER_OPTIONS.break[0].value);
  });

  describe("setMode", () => {
    it("should set the mode to break", () => {
      useStore.setState({ mode: "break" });
      const state = useStore.getState();
      expect(state.mode).toBe("break");
    });
  });

  describe("setIsRunning", () => {
    it("should set the isRunning to true", () => {
      useStore.setState({ isRunning: true });
      const state = useStore.getState();
      expect(state.isRunning).toBe(true);
    });
  });

  describe("setTimeLeft", () => {
    it("should set the timeLeft to the given value", () => {
      useStore.setState({ timeLeft: 10 });
      const state = useStore.getState();
      expect(state.timeLeft).toBe(10);
    });
  });

  describe("toggleTimer", () => {
    it("should toggle isRunning state", () => {
      const initialValue = useStore.getState().isRunning;
      useStore.getState().toggleTimer();
      expect(useStore.getState().isRunning).toBe(!initialValue);
      useStore.getState().toggleTimer();
      expect(useStore.getState().isRunning).toBe(initialValue);
    });
  });

  describe("resetTimer", () => {
    it("should reset the timer to the initial state", () => {
      useStore.setState({
        mode: "break",
        isRunning: true,
        timeLeft: 100,
      });
      useStore.getState().resetTimer();
      const state = useStore.getState();
      expect(state.mode).toBe("work");
      expect(state.isRunning).toBe(false);
      expect(state.timeLeft).toBe(TIMER_OPTIONS.work[0].value);
    });
  });

  describe("changeWorkDuration", () => {
    it("should change the work duration and reset timer", () => {
      const newDuration = 1800; // 30 minutes
      useStore.setState({ isRunning: true });
      useStore.getState().changeWorkDuration(newDuration);
      const state = useStore.getState();
      expect(state.workDuration).toBe(newDuration);
      expect(state.timeLeft).toBe(newDuration);
      expect(state.isRunning).toBe(false);
    });
  });

  describe("changeBreakDuration", () => {
    const newDuration = 6 * 60; // 6 minutes
    useStore.setState({ isRunning: true });
    useStore.getState().setMode("break");
    useStore.getState().changeBreakDuration(newDuration);
    const state = useStore.getState();
    expect(state.breakDuration).toBe(newDuration);
    expect(state.timeLeft).toBe(newDuration);
    expect(state.isRunning).toBe(false);
  });

  describe("complex scenarios", () => {
    it("should handle work-break cycle correctly", () => {
      const store = useStore.getState();

      // Start work timer
      store.toggleTimer();
      expect(useStore.getState().isRunning).toBe(true);
      expect(useStore.getState().mode).toBe("work");

      // Switch to break
      store.setMode("break");
      expect(useStore.getState().mode).toBe("break");

      // Reset timer should switch back to work
      store.resetTimer();
      expect(useStore.getState().mode).toBe("work");
      expect(useStore.getState().isRunning).toBe(false);
      expect(useStore.getState().timeLeft).toBe(TIMER_OPTIONS.work[0].value);
    });

    it("should maintain correct duration when switching modes", () => {
      const store = useStore.getState();
      const newWorkDuration = 3000; // 50 minutes
      const newBreakDuration = 420; // 7 minutes

      store.changeWorkDuration(newWorkDuration);
      store.changeBreakDuration(newBreakDuration);

      expect(useStore.getState().workDuration).toBe(newWorkDuration);
      expect(useStore.getState().breakDuration).toBe(newBreakDuration);
    });
  });
});
