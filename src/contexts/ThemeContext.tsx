import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { baseTheme } from '../assets/global/Theme-variable';
import modernTheme from '../assets/global/Theme-modern';
import darkTheme from '../assets/global/Theme-dark';
import artoTheme from '../assets/global/ArtoTheme';

const THEME_KEY = 'app_theme';

type ThemeName = 'arto' | 'modern' | 'dark';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  unsavedChanges: boolean;
  saveTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return (savedTheme as ThemeName) || 'arto';
  });
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  const getTheme = (themeName: ThemeName): Theme => {
    switch (themeName) {
      case 'arto':
        return artoTheme;
      case 'modern':
        return modernTheme;
      case 'dark':
        return darkTheme;
      default:
        return artoTheme;
    }
  };

  const handleThemeChange = (newTheme: ThemeName): void => {
    setCurrentTheme(newTheme);
    setUnsavedChanges(true);
  };

  const saveTheme = (): void => {
    localStorage.setItem(THEME_KEY, currentTheme);
    setUnsavedChanges(false);
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme: handleThemeChange,
    unsavedChanges,
    saveTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={getTheme(currentTheme)}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
