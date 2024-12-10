"use client";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../model/store";
import { cn } from "@/shared/lib/utils";
import { useEffect } from "react";

interface Props {
  className?: string;
}

export const ThemeSwitcher = ({ className }: Props) => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 relative",
        className
      )}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-2 left-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
