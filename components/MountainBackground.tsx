import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

export default function MountainBackground() {
  const { isDarkTheme } = useTheme();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDarkTheme ? ['#2D3748', '#4A5568'] : ['#667eea', '#764ba2']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  gradient: {
    flex: 1,
  },
});