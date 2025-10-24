// app/index.tsx
import React from 'react';
import MainApp from '../MainApp';

// expo-router already provides a NavigationContainer, so do NOT include one here
export default function Index() {
  return <MainApp skipNavigationContainer />;
}
