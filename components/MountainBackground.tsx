import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import MountainImg from '../assets/images/mountains.png'; 

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function MountainBackground() {
  const { isDarkTheme } = useTheme();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={MountainImg}
        resizeMode="cover"         
        style={styles.image}
      >
        <LinearGradient
          colors={
            isDarkTheme
              ? ['#5596FF', '#AC2DEB']
              : ['#3710BD', '#A42395']
          }
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </ImageBackground>
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
    overflow: 'hidden',    
    width: '100%', 
  },
  image: {
    width: '100%', 
    height: '100%', 
  },
  gradient: {
    width: '100%', 
    height: '100%',
  },
});