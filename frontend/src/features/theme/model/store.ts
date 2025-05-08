import { create } from "zustand";

export type Theme = "dark" | "light" | "system";

interface ThemeStore {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const getSystemTheme = () => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export const useThemeStore = create<ThemeStore>((set) => ({
    theme:
        (typeof window !== "undefined" &&
            (localStorage.getItem("theme") as Theme)) ||
        "system",
    setTheme: (theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = getSystemTheme();
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }

        localStorage.setItem("theme", theme);
        set({ theme });
    },
}));

// Initialize theme on store creation
if (typeof window !== "undefined") {
    const store = useThemeStore.getState();
    store.setTheme(store.theme);

    // Listen for system theme changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            const store = useThemeStore.getState();
            if (store.theme === "system") {
                store.setTheme("system");
            }
        });
}
