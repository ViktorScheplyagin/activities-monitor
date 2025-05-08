"use client";
import { Moon, Sun, Monitor } from "lucide-react";
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

    const handleThemeChange = () => {
        const themes: ("light" | "dark" | "system")[] = [
            "light",
            "dark",
            "system",
        ];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    return (
        <Button
            onClick={handleThemeChange}
            className={cn(
                "w-10 h-10 rounded-full p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 relative",
                className
            )}
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-3 left-3 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
            <Monitor className="absolute top-3 left-3 h-5 w-5 rotate-90 scale-0 transition-all system:rotate-0 system:scale-100 text-zinc-500" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};
