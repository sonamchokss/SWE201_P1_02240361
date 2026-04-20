import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import MainStackNavigator from './navigation/MainStackNavigator';

const AppContent = () => {
  const { colors } = useTheme();

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