import "@testing-library/jest-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Controls } from "./Controls";
import { useTimerStore } from "../model/store";

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = function () {};

describe("Controls", () => {
  const mockSetIsRunning = jest.fn();
  const mockResetTimer = jest.fn();
  const mockSetWorkDuration = jest.fn();
  const mockSetBreakDuration = jest.fn();
  const mockSetLongBreakDuration = jest.fn();

  beforeEach(() => {
    useTimerStore.setState({
      workDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,
      isRunning: false,
      mode: "work",
      timeLeft: 1500,
      sessionsCount: 0,
      setIsRunning: mockSetIsRunning,
      resetTimer: mockResetTimer,
      setWorkDuration: mockSetWorkDuration,
      setBreakDuration: mockSetBreakDuration,
      setLongBreakDuration: mockSetLongBreakDuration,
    });
  });

  it("should render a start/pause button and a reset button", () => {
    render(<Controls />);
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("should show 'Pause' text when timer is running", () => {
    useTimerStore.setState({ isRunning: true });
    render(<Controls />);
    expect(screen.getByText("Pause")).toBeInTheDocument();
  });

  it("should toggle isRunning when start/pause button is clicked", async () => {
    render(<Controls />);
    await userEvent.click(screen.getByText("Start"));
    expect(mockSetIsRunning).toHaveBeenCalledWith(true);
  });

  it("should call resetTimer when reset button is clicked", async () => {
    render(<Controls />);
    await userEvent.click(screen.getByText("Reset"));
    expect(mockResetTimer).toHaveBeenCalled();
  });

  it("should update work duration when changed", async () => {
    render(<Controls />);
    fireEvent.click(screen.getByTestId("work-duration"));
    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "25 min" })
      ).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("option", { name: "25 min" }));
    expect(mockSetWorkDuration).toHaveBeenCalledWith(25);
  });

  it("should update break duration when changed", async () => {
    render(<Controls />);
    fireEvent.click(screen.getByTestId("break-duration"));
    await waitFor(() => {
      expect(screen.getByText("5 min")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("5 min"));
    expect(mockSetBreakDuration).toHaveBeenCalledWith(5);
  });

  it("should update long break duration when changed", async () => {
    render(<Controls />);
    fireEvent.click(screen.getByTestId("long-break-duration"));
    await waitFor(() => {
      expect(screen.getByText("15 min")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("15 min"));
    expect(mockSetLongBreakDuration).toHaveBeenCalledWith(15);
  });
});
