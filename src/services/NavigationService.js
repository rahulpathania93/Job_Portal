// src/services/NavigationService.js
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  console.log('NavigationService: navigate called with', name, params);
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
    console.log('NavigationService: navigate successful');
  } else {
    console.log('NavigationService: navigation not ready');
  }
}

export function reset(routeName) {
  console.log('NavigationService: reset called with', routeName);
  if (navigationRef.isReady()) {
    console.log('NavigationService: navigation is ready, performing reset');
    navigationRef.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
    console.log('NavigationService: reset successful');
  } else {
    console.log('NavigationService: navigation not ready for reset');
  }
}
