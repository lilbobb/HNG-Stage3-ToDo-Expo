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
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          onPress={() => onFilterChange(filter.key)}
          style={{ 
            paddingHorizontal: 12, 
            paddingVertical: 6,
            borderRadius: 4,
            backgroundColor: currentFilter === filter.key ? 'rgba(192, 88, 243, 0.1)' : 'transparent'
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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