import { useContext } from "react";
import { ThemeContext } from "../api/themeContext";

export const ThemeSwitcher: React.FC = () => {
  const context = useContext(ThemeContext);

  const toggleTheme = () => {
    context?.setTheme(context.theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      {context?.theme}
    </button>
  );
};
