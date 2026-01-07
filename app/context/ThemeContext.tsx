import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Appearance } from 'react-native';

// Define the structure of our themes
export interface ThemeColors {
  background: string;
  text: string;
  card: string;
  border: string;
  primary: string;
  secondaryButton: string;
  secondaryButtonText: string;
  // Add other colors as needed
}

// Define our light and dark themes
export const lightTheme: ThemeColors = {
  background: '#f5f5f5',
  text: '#1f2937',
  card: '#ffffff',
  border: '#d1d5db',
  primary: '#2563eb',
  secondaryButton: '#e5e7eb',
  secondaryButtonText: '#374151',
};

export const darkTheme: ThemeColors = {
  background: '#111827', // Darker background
  text: '#f9fafb',
  card: '#1f2937', // Dark card background
  border: '#4b5563',
  primary: '#3b82f6',
  secondaryButton: '#4b5563',
  secondaryButtonText: '#f9fafb',
};

// Define the context shape
interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get the device's default color scheme
  const systemTheme = Appearance.getColorScheme() || 'light';
  const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook for using the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
