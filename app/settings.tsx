import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from './context/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme, colors, isDark } = useTheme();

  // Create a dynamic stylesheet that depends on the theme
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 24,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    settingText: {
      fontSize: 16,
      color: colors.text,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <ScrollView contentContainerStyle={dynamicStyles.content}>
        <Text style={dynamicStyles.title}>Settings</Text>
        <Text style={dynamicStyles.subtitle}>Configure your app preferences</Text>
        
        <View style={dynamicStyles.card}>
          <View style={dynamicStyles.settingItem}>
            <Text style={dynamicStyles.settingText}>Dark Mode</Text>
            <Switch
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={isDark}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}