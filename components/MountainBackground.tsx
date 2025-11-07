import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, ImageSourcePropType, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

let MountainImg: ImageSourcePropType | null = null;

try {
  MountainImg = require('../assets/images/mountains.png');
} catch (error) {
  try {
    MountainImg = require('../../assets/images/mountains.png');
  } catch (error2) {
    console.warn('Mountain image not found, using gradient only');
    MountainImg = null;
  }
}

export default function MountainBackground() {
  const { isDarkTheme } = useTheme();

  const gradientColors: [ColorValue, ColorValue] = isDarkTheme
    ? ['#5596FF', '#AC2DEB'] 
    : ['#3710BD', '#A42395']; 

  if (MountainImg) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={MountainImg}
          resizeMode="cover"
          style={styles.image}
        >
          <LinearGradient
            colors={gradientColors}
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradientFull}
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
    height: isMobile ? 200 : 300,
    width: '100%',
    zIndex: -1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  gradientFull: {
    width: '100%',
    height: '100%',
  },
});