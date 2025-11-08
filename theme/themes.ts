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
    clearRed: '#ff4444', // Add this line
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
      alignItems: 'center',
    },
    header: {
      paddingTop: 48,
      paddingBottom: 24,
      width: '100%', 
      maxWidth: 540, 
      alignSelf: 'center', 
      paddingHorizontal: isMobile ? 20 : 0, 
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
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: isMobile ? 24 : 0,
      marginTop: isMobile ? 0 : -40,
    },
    inputWrapper: {
      width: '100%',
      maxWidth: 540,
      alignSelf: 'center',
      marginBottom: isMobile ? 16 : 24,
      marginTop: isMobile ? 20 : 60,
      zIndex: 10,
    },
    inputContainer: {
      backgroundColor: theme.surface,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: isMobile ? 16 : 0,
      marginTop: isMobile ? -20 : 0,
    },
    todoContainer: {
      backgroundColor: theme.surface,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      width: '100%',
      maxWidth: 540,
      flex: 1,
      marginBottom: isMobile ? 0 : 16,
      marginTop: isMobile ? -20 : 0,
    },
    todoList: {
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
      height: 50,
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
      height: 50,
    },
    mobileFilterSection: {
      backgroundColor: theme.todoBackground,
      borderRadius: 5,
      marginTop: 16,
      width: '100%',
      maxWidth: 540,
      marginBottom: 16,
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
      color: theme.text,
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
      color: theme.text,
    },
    clearTextDisabled: {
      fontSize: 14,
      color: theme.textMuted,
    },
    mobileClearText: {
      fontSize: 14,
      color: theme.text, 
      padding: 16,
      marginBottom: 16,
      fontWeight: '500',
    },
    mobileClearTextDisabled: {
      fontSize: 14,
      color: theme.textMuted,
      fontWeight: '500',
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
  });
};

export default { themes, styles };