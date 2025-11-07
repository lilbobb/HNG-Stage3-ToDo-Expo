import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useTheme();

  const FallbackIcon = () => (
    <Text style={{ fontSize: 20, color: '#FFFFFF' }}>
      {isDarkTheme ? '☀️' : '🌙'}
    </Text>
  );

  try {
    return (
      <TouchableOpacity 
        onPress={toggleTheme}
        style={{
          padding: 8,
          borderRadius: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {isDarkTheme ? (
          <Image
            source={require('../assets/images/splash-icon.png')}
            style={{ width: 24, height: 24 }}
            onError={() => <FallbackIcon />}
          />
        ) : (
          <Image
            source={require('../assets/images/oval.png')}
            style={{ width: 24, height: 24 }}
            onError={() => <FallbackIcon />}
          />
        )}
      </TouchableOpacity>
    );
  } catch (error) {
    return (
      <TouchableOpacity 
        onPress={toggleTheme}
        style={{
          padding: 8,
          borderRadius: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <FallbackIcon />
      </TouchableOpacity>
    );
  }
}