import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity,
  Keyboard,
  Platform,
  Dimensions
} from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useTheme } from '../contexts/ThemeContext';
import { styles as themeStyles } from '../theme/themes';
import { themes } from '../theme/themes';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function TodoInput() {
  const { isDarkTheme } = useTheme();
  const styles = themeStyles(isDarkTheme);
  const theme = isDarkTheme ? themes.dark : themes.light;
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);
  
  const addTodo = useMutation(api.todos.addTodo);

  const handleSubmit = async () => {
    if (text.trim()) {
      await addTodo({ text: text.trim() });
      setText('');
      Keyboard.dismiss();
    }
  };

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.todoContainer, { 
      marginBottom: 24, 
      marginTop: 32, 
      width: isMobile ? "100%" : 540, 
      alignSelf: 'center' 
    }]}>
      <TouchableOpacity 
        activeOpacity={1}
        onPress={handleContainerPress}
        style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingHorizontal: 20,
          paddingVertical: 16 
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.checkBorder,
            marginRight: 16,
          }}
        />
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          placeholder="Create a new todo..."
          placeholderTextColor={theme.textSecondary}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          editable={true}
          style={[
            {
              flex: 1,
              fontSize: 16,
              color: theme.text,
              paddingVertical: 4,
            },
            Platform.OS === 'web' && { outlineStyle: 'none' as any }
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}
