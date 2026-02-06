
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type FontSize = 'normal' | 'large' | 'extra-large';

interface AccessibilityContextType {
  theme: Theme;
  fontSize: FontSize;
  toggleTheme: () => void;
  setFontSize: (size: FontSize) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
      // Fallback to system preference if no stored value
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {
      console.warn("Could not read theme from localStorage", e);
    }
    return 'light';
  });

  // Initialize font size from localStorage
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    try {
      const storedSize = localStorage.getItem('fontSize');
      if (storedSize === 'large' || storedSize === 'extra-large' || storedSize === 'normal') {
        return storedSize as FontSize;
      }
    } catch (e) {
      console.warn("Could not read fontSize from localStorage", e);
    }
    return 'normal';
  });

  useEffect(() => {
    // Apply Theme
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Persist to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    // Apply Font Size via root scaling (Tailwind uses rems)
    const root = document.documentElement;
    switch (fontSize) {
      case 'large':
        root.style.fontSize = '112.5%'; // 18px
        break;
      case 'extra-large':
        root.style.fontSize = '125%'; // 20px
        break;
      default:
        root.style.fontSize = '100%'; // 16px
    }
    // Persist to localStorage
    try {
      localStorage.setItem('fontSize', fontSize);
    } catch (e) {}
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setFontSize = (size: FontSize) => setFontSizeState(size);

  return (
    <AccessibilityContext.Provider value={{ theme, fontSize, toggleTheme, setFontSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
