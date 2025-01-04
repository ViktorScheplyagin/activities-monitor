"use client";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../model/store";
import { cn } from "@/shared/lib/utils";
import { useEffect } from "react";
import { Button } from "@/shared/ui/neomorphic";

interface Props {
    className?: string;
}

export const ThemeSwitcher = ({ className }: Props) => {
    const { theme, setTheme } = useThemeStore();

    useEffect(() => {
        setTheme(theme);
    }, []);

    return (
        <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
                "w-10 h-10 rounded-full p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 relative",
                className
            )}
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-3 left-3 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};
