import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { styles as themeStyles, themes } from '../theme/themes';

type FilterType = 'all' | 'active' | 'completed';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterButtons({ currentFilter, onFilterChange }: FilterButtonsProps) {
  const { isDarkTheme } = useTheme();
  const styles = themeStyles(isDarkTheme);
  const theme = isDarkTheme ? themes.dark : themes.light;

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <View style={{ flexDirection: 'row' }}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          onPress={() => onFilterChange(filter.key)}
          style={{ marginHorizontal: 8 }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: currentFilter === filter.key ? 'bold' : 'normal',
              color: currentFilter === filter.key ? theme.gradient[1] : theme.textSecondary,
            }}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}