"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "markethub-theme";
const ThemeContext = createContext(null);

function resolveTheme(preference) {
  if (preference === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return preference;
}

function applyTheme(preference) {
  const resolvedTheme = resolveTheme(preference);
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("system");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    const initialTheme = ["light", "dark", "system"].includes(savedTheme)
      ? savedTheme
      : "system";
    applyTheme(initialTheme);
    const updateTask = window.setTimeout(() => setThemeState(initialTheme), 0);
    return () => window.clearTimeout(updateTask);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "system") applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme(nextTheme) {
        if (!["light", "dark", "system"].includes(nextTheme)) return;
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
        setThemeState(nextTheme);
        applyTheme(nextTheme);
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
