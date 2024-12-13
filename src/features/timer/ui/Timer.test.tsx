jest.mock("../model/timer", () => ({
  useTimerLogicSetup: jest.fn(),
}));

import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Timer } from "./Timer";
import { useTimerStore } from "../model/store";

// Mock Web Worker
class WorkerMock implements Worker {
  onmessage: ((this: Worker, ev: MessageEvent) => void) | null = null;
  onmessageerror: ((this: Worker, ev: MessageEvent) => void) | null = null;
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => any) | null = null;

  postMessage(): void {
    this.onmessage?.({ data: "tick" } as MessageEvent);
  }

  terminate(): void {}
  addEventListener(): void {}
  removeEventListener(): void {}
  dispatchEvent(): boolean {
    return true;
  }
}
global.Worker = WorkerMock as unknown as typeof Worker;

jest.useFakeTimers();

describe("Timer", () => {
  beforeEach(() => {
    useTimerStore.setState({
      timeLeft: 25 * 60,
      mode: "work",
      isRunning: false,
      workDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,
      sessionsCount: 0,
    });
  });

  it("should display work mode initially", () => {
    render(<Timer />);
    expect(screen.getByText("work")).toBeInTheDocument();
  });

  it("should switch to short break after work session", () => {
    render(<Timer />);
    useTimerStore.setState({ timeLeft: 0, mode: "work" });
    act(() => {
      jest.advanceTimersByTime(1000);
      useTimerStore.setState({ mode: "break" });
    });
    expect(screen.getByText(/^break$/i)).toBeInTheDocument();
  });

  it("should switch to long break after 4 work sessions", () => {
    render(<Timer />);
    useTimerStore.setState({ timeLeft: 0, mode: "work", sessionsCount: 3 });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Long Break")).toBeInTheDocument();
  });

  it("should allow changing long break duration", async () => {
    render(<Timer />);
    const select = screen.getByTestId("long-break-select");
    await userEvent.click(select);
    await userEvent.click(screen.getByText("30 minutes"));
    expect(useTimerStore.getState().longBreakDuration).toBe(30);
  });

  it("should display session count", () => {
    render(<Timer />);
    useTimerStore.setState({ sessionsCount: 2 });
    expect(screen.getByText("Session 2")).toBeInTheDocument();
  });

  it("should not display session count when it's 0", () => {
    render(<Timer />);
    expect(screen.queryByText("Session 0")).not.toBeInTheDocument();
  });
});
