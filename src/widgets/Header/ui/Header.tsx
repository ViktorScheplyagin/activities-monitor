"use client";

import { Navigation } from "@/features/navigation";
import { ThemeSwitcher } from "@/features/theme";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "w-full sticky top-0 right-0 p-4 z-10 lg:p-8 flex justify-between items-center bg-background transition-shadow duration-200",
                {
                    "shadow-box": isScrolled,
                }
            )}
        >
            <div className="flex items-center gap-4">
                <Navigation />
            </div>
            <ThemeSwitcher />
        </header>
    );
};
