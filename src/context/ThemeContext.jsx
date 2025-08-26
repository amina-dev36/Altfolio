// context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setLightMode(theme === "light");
  }, []);

  // Apply class to <html> and save to localStorage
  useEffect(() => {
    if (lightMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [lightMode]);

  const toggleTheme = () => setLightMode(!lightMode);

  return (
    <ThemeContext.Provider value={{ lightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
