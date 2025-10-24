// src/navigation/AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomePlaceholder from '../screens/Auth/HomePlaceholder';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import RoleSelect from '../screens/RoleSelect';

// seeker screens
import AnalyticsDashboard from '../screens/provider/AnalyticsDashboard';
import PostJobForm from '../screens/provider/PostJobForm';
import ProviderJobs from '../screens/provider/ProviderJobs';
import Dashboard from '../screens/seeker/Dashboard';
import JobDetail from '../screens/seeker/JobDetail';
import JobList from '../screens/seeker/JobList';
import Profile from '../screens/seeker/Profile';

  
// (provider screens can remain or be added later)
// import ProviderJobs from '../screens/provider/ProviderJobs'; // optional

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="RoleSelect" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleSelect" component={RoleSelect} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="JobList" component={JobList} />
      <Stack.Screen name="JobDetail" component={JobDetail} />
      <Stack.Screen name="ProviderJobs" component={ProviderJobs} />
      <Stack.Screen name="PostJob" component={PostJobForm} />
      <Stack.Screen name="Analytics" component={AnalyticsDashboard} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      {/* <Stack.Screen name="ProviderJobs" component={ProviderJobs} /> */}
      <Stack.Screen name="HomePlaceholder" component={HomePlaceholder} />
    </Stack.Navigator>
  );
}
