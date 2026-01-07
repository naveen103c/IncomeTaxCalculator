import React from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';
import { getStyles } from '../src/styles/common.styles';

export default function Settings() {
  const { toggleTheme, colors, isDark } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure your app preferences</Text>
        
        <View style={styles.card}>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Dark Mode</Text>
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