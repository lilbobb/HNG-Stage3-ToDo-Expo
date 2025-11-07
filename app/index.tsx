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
  const [isClearing, setIsClearing] = useState(false);

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
  const completedCount = todos.filter(todo => todo.completed).length;

  const handleClearCompleted = async () => {
    console.log('=== CLEAR COMPLETED DEBUG ===');
    console.log('Total todos:', todos.length);
    console.log('Completed todos:', completedCount);
    
    if (completedCount === 0) {
      Alert.alert('No completed todos', 'There are no completed todos to clear.');
      return;
    }

    if (isClearing) return;

    Alert.alert(
      'Clear Completed',
      `Are you sure you want to clear ${completedCount} completed ${completedCount === 1 ? 'todo' : 'todos'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            setIsClearing(true);
            try {
              console.log('Calling clearCompleted mutation...');
              const result = await clearCompleted();
              console.log('Mutation completed, deleted count:', result);
            } catch (error) {
              console.error('Clear completed failed:', error);
              Alert.alert('Error', 'Failed to clear completed todos. Please try again.');
            } finally {
              setIsClearing(false);
            }
          }
        }
      ]
    );
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

  const isClearDisabled = completedCount === 0 || isClearing;

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
          <View style={{ width: '100%', maxWidth: 540, alignSelf: 'center' }}>
            <TodoInput />
          </View>
          
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
            
            {todos.length > 0 && (
              <>
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
                      style={isClearDisabled ? styles.clearButtonDisabled : styles.clearButton}
                      disabled={isClearDisabled}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={isClearDisabled ? styles.clearTextDisabled : styles.clearText}>
                        {isClearing ? 'Clearing...' : 'Clear Completed'}
                      </Text>
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
                      style={isClearDisabled ? styles.clearButtonDisabled : styles.clearButton}
                      disabled={isClearDisabled}
                    >
                      <Text style={isClearDisabled ? styles.clearTextDisabled : styles.clearText}>
                        {isClearing ? 'Clearing...' : 'Clear Completed'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </View>

          {Platform.OS !== 'web' && todos.length > 0 && (
            <View style={styles.mobileFilterSection}>
              <View style={styles.filterButtonsContainer}>
                <FilterButtons 
                  currentFilter={filter}
                  onFilterChange={setFilter}
                />
              </View>
            </View>
          )}

          {todos.length > 0 && (
            <Text style={styles.dragHint}>
              drag and drop to reorder list
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}