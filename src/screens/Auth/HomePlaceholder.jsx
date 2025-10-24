// src/screens/Auth/HomePlaceholder.jsx
import React, { useContext } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { AppContext } from '../../context/AppContext';

export default function HomePlaceholder({ navigation }) {
  const { user, role, logout } = useContext(AppContext);
  const activeRole = user?.role || role || 'seeker';

  const handleLogout = () => {
    logout();
    navigation.replace('RoleSelect');
  };

  if (activeRole === 'provider') {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>Welcome Provider</Text>
        <Text style={{ color: '#6b7280', marginBottom: 20 }}>{user?.email}</Text>
        <PrimaryButton title="View My Jobs" onPress={() => navigation.navigate('ProviderJobs')} />
        <View style={{ height: 12 }} />
        <PrimaryButton title="Post a Job" onPress={() => navigation.navigate('PostJob')} />
        <View style={{ height: 12 }} />
        <PrimaryButton title="View Analytics" onPress={() => navigation.navigate('Analytics')} />
        <View style={{ height: 12 }} />
        <PrimaryButton title="Logout" onPress={handleLogout} />
      </SafeAreaView>
    );
  }

  // seeker
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>Welcome Seeker</Text>
      <Text style={{ color: '#6b7280', marginBottom: 20 }}>{user?.email}</Text>
      <PrimaryButton title="Open Profile" onPress={() => navigation.navigate('Profile')} />
      <View style={{ height: 12 }} />
      <PrimaryButton title="Open Job List" onPress={() => navigation.navigate('JobList')} />
      <View style={{ height: 12 }} />
      <PrimaryButton title="Logout" onPress={handleLogout} />
      <View style={{ height: 12 }} />
      <PrimaryButton title="Change Role" onPress={() => { /* optional: clear role and go to RoleSelect */ navigation.replace('RoleSelect'); }} />
    </SafeAreaView>
  );
}
