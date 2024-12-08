import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Controls } from "./Controls";
import { useStore } from "../model/store";
import { faker } from "@faker-js/faker";
import { fireEvent } from "@testing-library/react"; // userEvent is having issues with Radix UI components

describe("Controls", () => {
  beforeEach(() => {
    useStore.setState({
      workDuration: faker.number.int({ min: 1, max: 60 }) * 60 * 1000,
      breakDuration: faker.number.int({ min: 1, max: 15 }) * 60 * 1000,
      isRunning: false,
      mode: "work",
      timeLeft: faker.number.int({ min: 1, max: 60 }) * 60 * 1000,
      toggleTimer: jest.fn(),
      resetTimer: jest.fn(),
      changeWorkDuration: jest.fn(),
      changeBreakDuration: jest.fn(),
      setMode: jest.fn(),
      setIsRunning: jest.fn(),
      setTimeLeft: jest.fn(),
    });
  });

  it("should render a start/pause button and a reset button", () => {
    render(<Controls />);
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("should show 'Pause' text when timer is running", () => {
    useStore.setState({ isRunning: true });
    render(<Controls />);
    expect(screen.getByText("Pause")).toBeInTheDocument();
  });

  it("should call toggleTimer when the start/pause button is clicked", async () => {
    const toggleTimer = jest.fn();
    useStore.setState({ toggleTimer });

    render(<Controls />);
    await userEvent.click(screen.getByText("Start"));
    expect(toggleTimer).toHaveBeenCalledTimes(1);
  });

  it("should call resetTimer when the reset button is clicked", async () => {
    const resetTimer = jest.fn();
    useStore.setState({ resetTimer });

    render(<Controls />);
    await userEvent.click(screen.getByText("Reset"));
    expect(resetTimer).toHaveBeenCalledTimes(1);
  });

  it("should call changeWorkDuration when work duration is changed", () => {
    const changeWorkDuration = jest.fn();
    useStore.setState({ changeWorkDuration });

    render(<Controls />);
    fireEvent.click(screen.getByTestId("work"));
    fireEvent.click(screen.getByText("25 min"));
    expect(changeWorkDuration).toHaveBeenCalledWith(25 * 60);
  });

  it("should call changeBreakDuration when break duration is changed", () => {
    const changeBreakDuration = jest.fn();
    useStore.setState({ changeBreakDuration });

    render(<Controls />);
    fireEvent.click(screen.getByTestId("break"));
    fireEvent.click(screen.getByText("10 min"));
    expect(changeBreakDuration).toHaveBeenCalledWith(10 * 60);
  });
});
