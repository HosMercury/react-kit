import { create } from "zustand";

// Define the theme type
export type ThemeType = "light" | "dark" | "system";

interface ThemeStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
  const systemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const applyTheme = (theme: ThemeType) => {
    const resolvedTheme = theme === "system" ? systemTheme() : theme;
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const initializeTheme = () => {
    const storedTheme = (localStorage.getItem("theme") as ThemeType) || "light";
    // const initialTheme = storedTheme === "system" ? systemTheme() : storedTheme;
    applyTheme(storedTheme);
    return storedTheme;
  };

  return {
    theme: initializeTheme(),
    setTheme: (theme: ThemeType) => {
      set({ theme });
      localStorage.setItem("theme", theme);
      applyTheme(theme);

      // Watch for system theme changes if "system" is selected
      if (theme === "system") {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => applyTheme("system");

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      }
    },
  };
});

export const applyThemeToDocument = (theme: ThemeType) => {
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  if (resolvedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
