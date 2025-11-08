import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { FlatList } from 'react-native';

import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import FilterButtons from '../components/FilterButtons';
import ThemeToggle from '../components/ThemeToggle';
import MountainBackground from '../components/MountainBackground';
import { useTheme } from '../contexts/ThemeContext';
import { styles as themeStyles, themes } from '../theme/themes';

type FilterType = 'all' | 'active' | 'completed';

export default function TodoApp() {
  const { isDarkTheme } = useTheme();
  const styles = themeStyles(isDarkTheme);
  const theme = isDarkTheme ? themes.dark : themes.light;
  const [filter, setFilter] = useState<FilterType>('all');
  const [isClearing, setIsClearing] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const todos = useQuery(api.todos.getTodos) || [];
  const clearCompleted = useMutation(api.todos.clearCompleted);

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
    if (completedCount === 0) {
      if (Platform.OS === 'web') {
        setShowClearModal(true);
      } else {
        Alert.alert('No completed todos', 'There are no completed todos to clear.');
      }
      return;
    }
    if (isClearing) return;

    if (Platform.OS === 'web') {
      setShowClearModal(true);
    } else {
      Alert.alert(
        'Clear Completed',
        `Are you sure you want to clear ${completedCount} completed ${completedCount === 1 ? 'todo' : 'todos'}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear',
            style: 'destructive',
            onPress: async () => {
              await executeClearCompleted();
            }
          }
        ]
      );
    }
  };

  const executeClearCompleted = async () => {
    setIsClearing(true);
    setShowClearModal(false);

    try {
      await clearCompleted();
    } catch (error) {
      Alert.alert('Error', 'Failed to clear completed todos.');
    } finally {
      setIsClearing(false);
    }
  };

  const handleCancelClear = () => {
    setShowClearModal(false);
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
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TodoInput />
            </View>
          </View>

          <View style={styles.todoContainer}>
            <FlatList
              data={filteredTodos}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <TodoItem todo={item} />}
              style={styles.todoList}
              showsVerticalScrollIndicator={false}
              extraData={filteredTodos.length}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: todos.length > 0 ? (Platform.OS === 'web' ? 50 : 40) : 0,
              }}
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

            {todos.length > 0 && Platform.OS === 'web' && (
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

            {todos.length > 0 && Platform.OS !== 'web' && (
              <View style={styles.mobileFooter}>
                <Text style={styles.itemsLeft}>
                  {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                </Text>

                <TouchableOpacity
                  onPress={handleClearCompleted}
                  style={isClearDisabled ? styles.clearButtonDisabled : styles.clearButton}
                  disabled={isClearDisabled}
                >
                  <Text style={isClearDisabled ? styles.mobileClearTextDisabled : styles.mobileClearText}>
                    {isClearing ? 'Clearing...' : 'Clear Completed'}
                  </Text>
                </TouchableOpacity>
              </View>
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
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={showClearModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelClear}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <View style={{
            backgroundColor: theme.surface,
            padding: 24,
            borderRadius: 12,
            minWidth: 300,
            maxWidth: 400,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.text,
              marginBottom: 8,
            }}>
              Clear Completed
            </Text>

            <Text style={{
              fontSize: 14,
              color: theme.textSecondary,
              marginBottom: 20,
              lineHeight: 20,
            }}>
              Are you sure you want to clear {completedCount} completed {completedCount === 1 ? 'todo' : 'todos'}?
            </Text>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 12,
            }}>
              <TouchableOpacity
                onPress={handleCancelClear}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 6,
                }}
              >
                <Text style={{
                  color: theme.textSecondary,
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={executeClearCompleted}
                disabled={isClearing}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 6,
                  backgroundColor: '#ff4444',
                }}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  {isClearing ? 'Clearing...' : 'Clear'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}