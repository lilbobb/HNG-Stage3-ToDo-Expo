import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useTheme } from '../contexts/ThemeContext';
import { styles as themeStyles } from '../theme/themes';
import { themes } from '../theme/themes';

export default function TodoInput() {
  const { isDarkTheme } = useTheme();
  const styles = themeStyles(isDarkTheme);
  const theme = isDarkTheme ? themes.dark : themes.light;
  const [text, setText] = useState('');
  
  const addTodo = useMutation(api.todos.addTodo);

  const handleSubmit = async () => {
    if (text.trim()) {
      await addTodo({ text: text.trim() });
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={[styles.todoContainer, { marginBottom: 24, marginTop: 32}]}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20,
        paddingVertical: 16 
      }}>
        <TouchableOpacity
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
          value={text}
          onChangeText={setText}
          placeholder="Create a new todo..."
          placeholderTextColor={theme.textSecondary}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          style={{
            flex: 1,
            fontSize: 16,
            color: theme.text,
            paddingVertical: 4,
          }}
        />
      </View>
    </View>
  );
}