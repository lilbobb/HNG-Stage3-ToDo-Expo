import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export const themes = {
  light: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#484B6A',
    textSecondary: '#9394A5',
    textMuted: '#D2D3DB',
    border: '#E4E5F1',
    checkBorder: '#E4E5F1',
    completedText: '#D2D3DB',
    gradient: ['#57DDFF', '#C058F3'],
    todoBackground: '#FFFFFF',
  },
  dark: {
    background: '#161722',
    surface: '#25273C',
    text: '#CACDE8',
    textSecondary: '#777A92',
    textMuted: '#4D5066',
    border: '#393A4C',
    checkBorder: '#4D5066',
    completedText: '#4D5066',
    gradient: ['#57DDFF', '#C058F3'],
    todoBackground: '#25273C',
  },
};

export const styles = (isDark: boolean) => {
  const theme = isDark ? themes.dark : themes.light;
  
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 24,
      paddingTop: 48,
      paddingBottom: 24,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 12,
      color: '#FFFFFF',
    },
    mainContent: {
      flex: 1,
      paddingHorizontal: 24,
      marginTop: -40,
    },
    todoContainer: {
      backgroundColor: theme.surface,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 16,
      maxHeight: isMobile ? 500 : 600,
      overflow: 'hidden',
    },
    todoList: {
      maxHeight: 400,
    },
    
    // Desktop Footer (hidden on mobile) - All three elements
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      // Hide on mobile, show on desktop
      display: isMobile ? 'none' : 'flex',
    },
    
    // Mobile Footer - Items Count + Clear Completed (INSIDE todo container)
    mobileFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: theme.todoBackground,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      // Show only on mobile
      display: isMobile ? 'flex' : 'none',
    },
    
    // Mobile Filter Section - Filter Buttons in separate section BELOW todo container
    mobileFilterSection: {
      backgroundColor: theme.todoBackground,
      borderRadius: 5,
      marginTop: 16,
      // Show only on mobile
      display: isMobile ? 'flex' : 'none',
      width: 364,
      alignSelf: 'center',
    },
    
    // Filter Buttons Container - Same styling as input
    filterButtonsContainer: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 18,
    },
    
    itemsLeft: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    clearButton: {
      padding: 8,
    },
    clearText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    emptyState: {
      padding: 40,
      alignItems: 'center',
    },
    emptyStateText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    dragHint: {
      textAlign: 'center',
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: isMobile ? 80 : 16,
    },
  });
};