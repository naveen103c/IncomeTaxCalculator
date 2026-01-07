import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

// DrawerLayout component to access theme context
function DrawerLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        drawerContentStyle: {
          backgroundColor: colors.card,
        },
        drawerInactiveTintColor: colors.text,
        drawerActiveTintColor: colors.primary,
        drawerActiveBackgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: 'Tax Calculator',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <DrawerLayout />
    </ThemeProvider>
  );
}
