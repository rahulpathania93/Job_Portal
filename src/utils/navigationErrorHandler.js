// src/utils/navigationErrorHandler.js
export const handleNavigationError = (error, navigation) => {
  console.log('Navigation error caught:', error);
  
  // Try to navigate to a safe screen
  try {
    if (navigation && navigation.navigate) {
      navigation.navigate('MainTabs');
    }
  } catch (fallbackError) {
    console.log('Fallback navigation failed:', fallbackError);
    // Last resort: try to go back
    try {
      if (navigation && navigation.goBack) {
        navigation.goBack();
      }
    } catch (finalError) {
      console.log('All navigation attempts failed:', finalError);
    }
  }
};

export const safeNavigation = (navigation, screenName, params = {}) => {
  try {
    navigation.navigate(screenName, params);
  } catch (error) {
    handleNavigationError(error, navigation);
  }
};
