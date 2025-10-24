// MainApp.js
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function MainApp({ skipNavigationContainer }) {
  const content = (
    <AppProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </AppProvider>
  );

  return skipNavigationContainer ? content : <NavigationContainer>{content}</NavigationContainer>;
}
