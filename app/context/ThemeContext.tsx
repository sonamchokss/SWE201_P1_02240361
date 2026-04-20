import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Appearance } from 'react-native';

export const themes = {
  light: {
    primary: '#667EEA',
    secondary: '#764BA2',
    gradientStart: '#667EEA',
    gradientEnd: '#764BA2',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    tabBar: '#FFFFFFE6',
    text: '#0F172A',
    textSecondary: '#475569',
    border: '#E2E8F0',
    accent: '#EEF2FF',
    success: '#10B981',
    danger: '#EF4444',
    shadow: '#1E293B',
    glass: 'rgba(255, 255, 255, 0.65)',
    statusBar: 'dark-content',
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
  },
  dark: {
    primary: '#7C93F6',
    secondary: '#A78BFA',
    gradientStart: '#334155',
    gradientEnd: '#0F172A',
    background: '#0F172A',
    surface: '#111C31',
    card: '#1E293B',
    tabBar: '#1E293BE8',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    border: '#334155',
    accent: '#24354F',
    success: '#34D399',
    danger: '#F87171',
    shadow: '#020617',
    glass: 'rgba(30, 41, 59, 0.7)',
    statusBar: 'light-content',
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
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
  const systemScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = useMemo(() => themes[theme], [theme]);

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