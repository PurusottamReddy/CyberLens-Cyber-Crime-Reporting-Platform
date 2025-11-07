import React, { createContext, useState, useEffect, useRef } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      if (saved === null) return false;
      const parsed = JSON.parse(saved);
      return parsed === true;
    } catch (error) {
      console.warn('Invalid darkMode in localStorage — resetting.');
      localStorage.removeItem('darkMode');
      return false;
    }
  });

  const isInitialMount = useRef(true);

  // Apply dark mode class immediately on mount
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    isInitialMount.current = false;
  }, []);

  // Apply dark mode class when darkMode state changes
  useEffect(() => {
    if (isInitialMount.current) return;
    
    const root = document.documentElement;
    
    // Remove all dark classes first to ensure clean state
    root.classList.remove('dark');
    
    // Then add if needed
    if (darkMode) {
      root.classList.add('dark');
    }
    
    // Save to localStorage
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.warn('Failed to save darkMode to localStorage:', error);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev;
      // Immediately update DOM to prevent lag
      const root = document.documentElement;
      if (newValue) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
