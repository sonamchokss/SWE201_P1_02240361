import React, { createContext, useContext, useState, ReactNode } from 'react';

export const themes = {
  light: {
    primary: '#151B54', // Night Blue
    background: '#F8F9FF',
    card: '#FFFFFF',
    text: '#2D2D2D',
    textSecondary: '#666666',
    border: '#E0E0E0',
    accent: '#EEEEFF',
    statusBar: 'dark-content',
  },
  dark: {
    primary: '#2A3170', // Lighter night blue for dark mode
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#333333',
    accent: '#2A2A3A',
    statusBar: 'light-content',
  },
};

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof themes.light;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};