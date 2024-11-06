"use client";
import { ThemeProvider } from "@/features/theme";
import { Header } from "@/widgets/Header";
import { PomodoroTimer } from "@/widgets/PomodoroTimer";

export const HomePage: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Header />
        <PomodoroTimer />
      </div>
    </ThemeProvider>
  );
};
