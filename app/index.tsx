import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import FilterButtons from '../components/FilterButtons';
import ThemeToggle from '../components/ThemeToggle';
import MountainBackground from '../components/MountainBackground';
import { useTheme } from '../contexts/ThemeContext';
import { styles as themeStyles } from '../theme/themes';

type FilterType = 'all' | 'active' | 'completed';

export default function TodoApp() {
  const { isDarkTheme } = useTheme();
  const styles = themeStyles(isDarkTheme);
  const [filter, setFilter] = useState<FilterType>('all');

  const todos = useQuery(api.todos.getTodos) || [];
  const clearCompleted = useMutation(api.todos.clearCompleted);
  const updateTodoOrder = useMutation(api.todos.updateTodoOrder);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    if (todos.some(todo => todo.completed)) {
      Alert.alert(
        'Clear Completed',
        'Are you sure you want to clear all completed todos?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Clear', 
            style: 'destructive',
            onPress: () => clearCompleted()
          }
        ]
      );
    }
  };

  const handleDragEnd = async ({ data }: { data: typeof filteredTodos }) => {
    try {
      const orderedIds = data.map(item => item._id);
      await updateTodoOrder({ orderedIds });
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<typeof filteredTodos[0]>) => {
    return (
      <ScaleDecorator>
        <TodoItem 
          todo={item} 
          onLongPress={drag}
          isActive={isActive}
        />
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <MountainBackground />
        
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>TODO</Text>
            <ThemeToggle />
          </View>
        </View>

        <View style={styles.mainContent}>
          <TodoInput />
          
          <View style={styles.todoContainer}>
            <DraggableFlatList
              data={filteredTodos}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              onDragEnd={handleDragEnd}
              style={styles.todoList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              activationDistance={Platform.OS === 'web' ? 10 : 20}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {todos.length === 0 
                      ? 'No todos yet. Add one above!'
                      : `No ${filter} todos`
                    }
                  </Text>
                </View>
              }
            />
            
            {Platform.OS === 'web' && (
              <View style={styles.footer}>
                <Text style={styles.itemsLeft}>
                  {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                </Text>
                
                <FilterButtons 
                  currentFilter={filter}
                  onFilterChange={setFilter}
                />
                
                <TouchableOpacity 
                  onPress={handleClearCompleted}
                  style={styles.clearButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.clearText}>Clear Completed</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {Platform.OS !== 'web' && (
              <View style={styles.mobileFooter}>
                <Text style={styles.itemsLeft}>
                  {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                </Text>
                
                <TouchableOpacity 
                  onPress={handleClearCompleted}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearText}>Clear Completed</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {Platform.OS !== 'web' && (
            <View style={styles.mobileFilterSection}>
              <View style={styles.filterButtonsContainer}>
                <FilterButtons 
                  currentFilter={filter}
                  onFilterChange={setFilter}
                />
              </View>
            </View>
          )}

          <Text style={styles.dragHint}>
            drag and drop to reorder list
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}