import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Appearance } from 'react-native';

// Define the structure of our themes
export interface ThemeColors {
  background: string;
  text: string;
  note: string;
  primary: string;
  card: string;
  border: string;
  primaryButton: string;
  primaryButtonText: string;
  secondaryButton: string;
  secondaryButtonText: string;
  cancelButton: string;
  cancelButtonText: string;
  placeholderTextColor: string;
  // Add other colors as needed
}

// Define our light and dark themes
export const lightTheme: ThemeColors = {
  background: '#f8f9fa', // A very light, clean off-white
  text: '#212529', // A standard dark color for high readability
  note: '#dbeafe', // A medium gray for secondary text and notes
  primary: '#2563eb', // A vibrant, modern blue for primary actions
  card: '#ffffff', // Clean white for card backgrounds
  border: '#E5E7EB', // A subtle gray for borders
  primaryButton: '#007BFF', // Matching the primary color
  primaryButtonText: '#ffffff', // White text for high contrast on the primary button
  secondaryButton: '#E9ECEF', // A light gray for secondary actions
  secondaryButtonText: '#212529', // Dark text for readability on the light gray button
  cancelButton: '#DC3545', // A standard, clear red for destructive actions
  cancelButtonText: '#ffffff', // White text for high contrast on the cancel button
  placeholderTextColor: '#6C757D', // A medium gray for placeholder text
};

export const darkTheme: ThemeColors = {
  background: '#111827', // Darker background
  text: '#f9fafb',
  note: '#9ca3af', // Lighter gray for secondary text and notes
  primary: '#3b82f6',
  card: '#1f2937', // Dark card background
  border: '#4b5563',
  primaryButton: '#3b82f6',
  primaryButtonText: '#f9fafb',
  secondaryButton: '#4b5563',
  secondaryButtonText: '#f9fafb',
  cancelButton: '#111827',
  cancelButtonText: '#f9fafb',
  placeholderTextColor: '#9ca3af',
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
