import { createContext, useContext, useState } from "react";

// Create Theme Context.
const ThemeContext = createContext(null);

// Theme Provider.
export function ThemeProvider({ children }) {
  // Default theme.
  const [theme, setTheme] = useState("light");

  // Toggle between light and dark.
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom theme hook.
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
