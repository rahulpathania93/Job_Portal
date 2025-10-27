// src/navigation/AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { navigationRef } from '../services/NavigationService';

import HomePlaceholder from '../screens/Auth/HomePlaceholder';
import ProviderAuthOptions from '../screens/Auth/ProviderAuthOptions';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import RoleSelect from '../screens/RoleSelect';
import TabNavigator from './TabNavigator';

// Individual screens for stack navigation
import JobProviderProfile from '../screens/provider/JobProviderProfile';
import EditProfile from '../screens/seeker/EditProfile';
import JobDetail from '../screens/seeker/JobDetail';
import JobList from '../screens/seeker/JobList';
import SearchJobs from '../screens/seeker/SearchJobs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AppContext);

  return (
    <Stack.Navigator 
      initialRouteName="RoleSelect" 
      screenOptions={{ headerShown: false }}
      ref={navigationRef}
    >
      {/* Auth Flow */}
      <Stack.Screen name="RoleSelect" component={RoleSelect} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ProviderAuthOptions" component={ProviderAuthOptions} />
      
      {/* Main App with Tabs */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      
      {/* Individual Screens (for stack navigation) */}
      <Stack.Screen name="JobDetail" component={JobDetail} />
      <Stack.Screen name="JobProviderProfile" component={JobProviderProfile} />
      <Stack.Screen name="SearchJobs" component={SearchJobs} />
      <Stack.Screen name="JobList" component={JobList} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="HomePlaceholder" component={HomePlaceholder} />
    </Stack.Navigator>
  );
}
