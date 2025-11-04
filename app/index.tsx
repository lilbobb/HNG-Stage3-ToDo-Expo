import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

// Your components
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

  // Fetch todos from Convex
  const todos = useQuery(api.todos.getTodos) || [];
  const clearCompleted = useMutation(api.todos.clearCompleted);

  // Filter todos based on current filter
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

  return (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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

          <View style={[styles.todoContainer, { flex: 1 }]}>
            <FlatList
              data={filteredTodos}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <TodoItem todo={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {todos.length === 0 ? 'No todos yet. Add one above!' : `No ${filter} todos`}
                  </Text>
                </View>
              }
              ListFooterComponent={
                <>
                  <View style={styles.footer}>
                    <Text style={styles.itemsLeft}>
                      {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                    </Text>
                    <FilterButtons currentFilter={filter} onFilterChange={setFilter}/>
                    <TouchableOpacity onPress={handleClearCompleted} style={styles.clearButton}>
                      <Text style={styles.clearText}>Clear Completed</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.mobileFooter}>
                    <Text style={styles.itemsLeft}>
                      {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                    </Text>
                    <TouchableOpacity onPress={handleClearCompleted} style={styles.clearButton}>
                      <Text style={styles.clearText}>Clear Completed</Text>
                    </TouchableOpacity>
                  </View>
                </>
              }
            />
          </View>

          <View style={styles.mobileFilterSection}>
            <View style={styles.filterButtonsContainer}>
              <FilterButtons currentFilter={filter} onFilterChange={setFilter}/>
            </View>
          </View>

          <Text style={styles.dragHint}>Drag and drop to reorder list</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </TouchableWithoutFeedback>
);
}