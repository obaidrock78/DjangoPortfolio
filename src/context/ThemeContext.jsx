import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext({
  isLight: false,
  toggleTheme: () => {},
});

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }) {
  const [isLight, setIsLight] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === "light";
      return window.matchMedia("(prefers-color-scheme: light)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isLight) {
      document.body.classList.add("light");
      root.setAttribute("data-theme", "light");
    } else {
      document.body.classList.remove("light");
      root.setAttribute("data-theme", "dark");
    }
    try {
      localStorage.setItem(STORAGE_KEY, isLight ? "light" : "dark");
    } catch (_) {}
  }, [isLight]);

  const toggleTheme = () => setIsLight((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
