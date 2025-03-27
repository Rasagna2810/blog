import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    console.log("Theme changed from", theme, "to", theme === "light" ? "dark" : "light");
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  

  useEffect(() => {
    document.body.className = theme; // Apply theme to body
    localStorage.setItem("theme", theme); // Store theme in localStorage
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
