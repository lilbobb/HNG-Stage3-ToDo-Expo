import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useTheme();

  // Fallback to emoji if images don't work
  const FallbackIcon = () => (
    <Text style={{ fontSize: 20, color: isDarkTheme ? '#FFF' : '#000' }}>
      {isDarkTheme ? '☀️' : '🌙'}
    </Text>
  );

  try {
    return (
      <TouchableOpacity onPress={toggleTheme}>
        {isDarkTheme ? (
          // Use your existing icon.png for light mode
          <Image
            source={require('../assets/images/icon.png')}
            style={{ width: 24, height: 24 }}
            onError={() => <FallbackIcon />}
          />
        ) : (
          // Use favicon.png for dark mode
          <Image
            source={require('../assets/images/favicon.png')}
            style={{ width: 24, height: 24 }}
            onError={() => <FallbackIcon />}
          />
        )}
      </TouchableOpacity>
    );
  } catch (error) {
    return (
      <TouchableOpacity onPress={toggleTheme}>
        <FallbackIcon />
      </TouchableOpacity>
    );
  }
}