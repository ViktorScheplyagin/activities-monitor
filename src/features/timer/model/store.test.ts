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

  describe("the state initialised with default values", () => {
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
      expect(useStore.getState().mode).toBe("break");
    });
  });

  describe("setIsRunning", () => {
    it("should set the isRunning to true", () => {
      useStore.setState({ isRunning: true });
      expect(useStore.getState().isRunning).toBe(true);
    });
  });

  describe("setTimeLeft", () => {
    it("should set the timeLeft to the given value", () => {
      useStore.setState({ timeLeft: 10 });
      expect(useStore.getState().timeLeft).toBe(10);
    });
  });

  describe("toggleTimer", () => {
    it("should toggle isRunning state", () => {
      const getState = useStore.getState;
      const { isRunning: initialValue, toggleTimer } = getState();

      toggleTimer();
      expect(getState().isRunning).toBe(!initialValue);
      toggleTimer();
      expect(getState().isRunning).toBe(initialValue);
    });
  });

  describe("resetTimer", () => {
    it("should reset the timer to the initial state", () => {
      const { getState, setState } = useStore;
      setState({
        mode: "break",
        isRunning: true,
        timeLeft: 100,
      });
      getState().resetTimer();

      const { mode, isRunning, timeLeft } = getState();
      expect(mode).toBe("work");
      expect(isRunning).toBe(false);
      expect(timeLeft).toBe(TIMER_OPTIONS.work[0].value);
    });
  });

  describe("changeWorkDuration", () => {
    it("should change the work duration and reset timer", () => {
      const newDuration = 30 * 60; // 30 minutes
      const { getState, setState } = useStore;
      setState({ isRunning: true });
      getState().changeWorkDuration(newDuration);

      const { workDuration, timeLeft, isRunning } = getState();
      expect(workDuration).toBe(newDuration);
      expect(timeLeft).toBe(newDuration);
      expect(isRunning).toBe(false);
    });
  });

  describe("changeBreakDuration while timer is running", () => {
    const newDuration = 6 * 60; // 6 minutes
    const { getState, setState } = useStore;
    setState({ isRunning: true });
    getState().setMode("break");
    getState().changeBreakDuration(newDuration);

    const { breakDuration, timeLeft, isRunning } = getState();
    expect(breakDuration).toBe(newDuration);
    expect(timeLeft).toBe(newDuration);
    expect(isRunning).toBe(false);
  });

  describe("complex scenarios", () => {
    it("should handle work-break cycle correctly", () => {
      const { getState } = useStore;
      const { toggleTimer, setMode, resetTimer } = getState();

      // Start work timer
      toggleTimer();
      expect(getState().isRunning).toBe(true);
      expect(getState().mode).toBe("work");

      // Switch to break
      setMode("break");
      expect(getState().mode).toBe("break");

      // Reset timer should switch back to work
      resetTimer();
      expect(getState().mode).toBe("work");
      expect(getState().isRunning).toBe(false);
      expect(getState().timeLeft).toBe(TIMER_OPTIONS.work[0].value);
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
