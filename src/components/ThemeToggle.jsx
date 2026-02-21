import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { isLight, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle-v4"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
    >
      <span className="theme-toggle-icon theme-toggle-sun" aria-hidden="true">
        <i className="bx bx-sun" />
      </span>
      <span className="theme-toggle-icon theme-toggle-moon" aria-hidden="true">
        <i className="bx bx-moon" />
      </span>
      <span className="theme-toggle-thumb" data-light={isLight} />
    </button>
  );
}
