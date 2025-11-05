import { TouchableOpacity, Image, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useTheme();

  const FallbackIcon = () => (
    <Text style={{ fontSize: 20, color: isDarkTheme ? '#FFF' : '#000' }}>
      {isDarkTheme ? '☀️' : '🌙'}
    </Text>
  );

  try {
    return (
      <TouchableOpacity onPress={toggleTheme}>
        {isDarkTheme ? (
          <Image
            source={require('../assets/images/splash-icon.png')}
            style={{ width: 24, height: 24, shadowColor: '#fff'  }}
            onError={() => <FallbackIcon />}
          />
        ) : (
          <Image
            source={require('../assets/images/partial-react-logo.png')}
            style={{ width: 24, height: 24}}
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