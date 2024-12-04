import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TimerDisplay } from "./TimerDisplay";

describe("Timer", () => {
  it("formats timer correctly", () => {
    render(<TimerDisplay timeLeft={65} mode="work" />);
    expect(screen.getByText("01:05")).toBeInTheDocument();
  });

  it("shows red color in work mode", () => {
    render(<TimerDisplay timeLeft={60} mode="work" />);
    expect(screen.getByText("01:00")).toHaveClass("text-red-500");
  });

  it("shows green color in break mode", () => {
    render(<TimerDisplay timeLeft={60} mode="break" />);
    expect(screen.getByText("01:00")).toHaveClass("text-green-500");
  });
});
