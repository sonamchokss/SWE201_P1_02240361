import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import MainStackNavigator from './navigation/MainStackNavigator';
import { StatusBar } from 'react-native';

const AppContent = () => {
  const { colors, theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={colors.statusBar as any}
        backgroundColor={colors.primary}
      />
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;