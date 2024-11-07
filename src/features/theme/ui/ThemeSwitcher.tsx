import { useContext, useEffect } from "react";
import { ThemeContext } from "@/features/theme";

export const ThemeSwitcher: React.FC = () => {
  const context = useContext(ThemeContext);

  const toggleTheme = () => {
    context?.setTheme(context.theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(context?.theme ?? "dark");
  }, [context?.theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      {context?.theme}
    </button>
  );
};
