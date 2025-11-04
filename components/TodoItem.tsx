import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  Animated
} from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useTheme } from '../contexts/ThemeContext';
import { styles as themeStyles, themes } from '../theme/themes';

interface TodoItemProps {
  todo: {
    _id: string;
    text: string;
    completed: boolean;
  };
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { isDarkTheme } = useTheme();
  const styles = themeStyles(isDarkTheme);
  const theme = isDarkTheme ? themes.dark : themes.light;
  
  const [fadeAnim] = useState(new Animated.Value(1));
  
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleToggle = () => {
    toggleTodo({ id: todo._id, completed: !todo.completed });
  };

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      deleteTodo({ id: todo._id });
    });
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={[styles.todoContainer, { 
        marginBottom: 0, 
        borderBottomWidth: 1, 
        borderBottomColor: theme.border 
      }]}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingHorizontal: 20,
          paddingVertical: 16 
        }}>
          <TouchableOpacity
            onPress={handleToggle}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: todo.completed ? theme.gradient[1] : theme.checkBorder,
              backgroundColor: todo.completed ? theme.gradient[1] : 'transparent',
              marginRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {todo.completed && (
              <Text style={{ color: '#FFFFFF', fontSize: 12 }}>✓</Text>
            )}
          </TouchableOpacity>
          
          <Text style={{
            flex: 1,
            fontSize: 16,
            color: todo.completed ? theme.completedText : theme.text,
            textDecorationLine: todo.completed ? 'line-through' : 'none',
          }}>
            {todo.text}
          </Text>
          
          <TouchableOpacity onPress={handleDelete}>
            <Text style={{ color: theme.textSecondary, fontSize: 20 }}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}