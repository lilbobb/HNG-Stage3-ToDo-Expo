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
      paddingTop: 48,
      paddingBottom: 24,
      width: isMobile ? '100%' : 540, 
      alignSelf: 'center', 
      paddingHorizontal: isMobile ? 24 : 0, 
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: isMobile ? 0 : 20, 
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 12,
      color: '#FFFFFF',
    },
    mainContent: {
      flex: 1,
      paddingHorizontal: isMobile ? 24 : 0,
      marginTop: -40,
      alignItems: 'center', 
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
      width: isMobile ? '100%' : 540,
    },
    todoList: {
      maxHeight: 400,
      flex: 1,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      marginTop: 'auto',
    },
    mobileFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: theme.todoBackground,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
    mobileFilterSection: {
      backgroundColor: theme.todoBackground,
      borderRadius: 5,
      marginTop: 16,
      width: isMobile ? '100%' : 540,
      alignSelf: 'center',
    },
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
    clearButtonDisabled: {
      padding: 8,
      opacity: 0.5,
    },
    clearText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    clearTextDisabled: {
      fontSize: 14,
      color: theme.textMuted,
    },
    emptyState: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
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
      width: isMobile ? '100%' : 540,
      alignSelf: 'center',
    },
  });
};