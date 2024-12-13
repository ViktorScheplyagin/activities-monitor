"use client";

import { Navigation } from "@/features/navigation/ui/Navigation";
import { ThemeSwitcher } from "@/features/theme/ui/ThemeSwitcher";
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
        "w-full sticky top-0 right-0 p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-900 transition-shadow duration-200",
        {
          "shadow-lg": isScrolled,
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
