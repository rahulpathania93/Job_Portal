// src/screens/Auth/HomePlaceholder.jsx
import React, { useContext, useMemo } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { AppContext } from '../../context/AppContext';

export default function HomePlaceholder({ navigation }) {
  const { user, role, logout, jobs = [], appliedJobIds = [], profile } = useContext(AppContext);

  // prefer explicit role on user (set during login/signup) otherwise selected role
  const activeRole = user?.role || role || 'seeker';
  const displayName = user?.name || user?.email || 'Guest';

  // For provider: best-effort match of jobs owned by this provider (mock jobs may use different owner keys)
  const providerJobs = useMemo(() => {
    if (!user) return [];
    const email = user.email;
    return jobs.filter(
      j =>
        j.postedBy === email ||
        j.providerEmail === email ||
        j.owner === email ||
        (j.companyEmail && j.companyEmail === email)
    );
  }, [jobs, user]);

  const providerApplicantsCount = useMemo(() => {
    return providerJobs.reduce((acc, j) => acc + ((j.applicants && j.applicants.length) || 0), 0);
  }, [providerJobs]);

  const appliedCount = Array.isArray(appliedJobIds) ? appliedJobIds.length : 0;
  const profileComplete = !!(profile && profile.name && profile.skills && profile.skills.length > 0);

  function handleLogout() {
    logout();
    navigation.replace('RoleSelect');
  }

  function handleChangeRole() {
    navigation.replace('RoleSelect');
  }

  // Provider view
  if (activeRole === 'provider') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={{ padding: 18 }}>
          <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 6 }}>Welcome, {displayName}</Text>
          <Text style={{ color: '#6b7280', marginBottom: 18 }}>Provider dashboard</Text>

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 18 }}>
            <View style={{ flex: 1, padding: 12, backgroundColor: '#F3F4F6', borderRadius: 8 }}>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>Jobs posted</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>{providerJobs.length}</Text>
            </View>
            <View style={{ flex: 1, padding: 12, backgroundColor: '#F3F4F6', borderRadius: 8 }}>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>Total applicants</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>{providerApplicantsCount}</Text>
            </View>
          </View>

          <PrimaryButton title="View My Jobs" onPress={() => navigation.navigate('ProviderJobs')} />
          <View style={{ height: 12 }} />
          <PrimaryButton title="Post a Job" onPress={() => navigation.navigate('PostJob')} />
          <View style={{ height: 12 }} />
          <PrimaryButton title="View Analytics" onPress={() => navigation.navigate('Analytics')} />
          <View style={{ height: 12 }} />
          <PrimaryButton title="Logout" onPress={handleLogout} />
          <View style={{ height: 16 }} />

          <TouchableOpacity onPress={handleChangeRole} style={{ alignItems: 'center', padding: 8 }}>
            <Text style={{ color: '#6b7280' }}>Switch role / Change account</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Seeker view
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 6 }}>Welcome, {displayName}</Text>
        <Text style={{ color: '#6b7280', marginBottom: 18 }}>What would you like to do today?</Text>

        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 18 }}>
          <View style={{ flex: 1, padding: 12, backgroundColor: '#F3F4F6', borderRadius: 8 }}>
            <Text style={{ color: '#6b7280', fontSize: 12 }}>Applied</Text>
            <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>{appliedCount}</Text>
          </View>
          <View style={{ flex: 1, padding: 12, backgroundColor: '#F3F4F6', borderRadius: 8 }}>
            <Text style={{ color: '#6b7280', fontSize: 12 }}>Profile</Text>
            <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>{profileComplete ? 'Complete' : 'Incomplete'}</Text>
          </View>
        </View>

        <PrimaryButton title="Open Profile" onPress={() => navigation.navigate('Profile')} />
        <View style={{ height: 12 }} />
        <PrimaryButton title="Open Job List" onPress={() => navigation.navigate('JobList')} />
        <View style={{ height: 12 }} />
        <PrimaryButton title="Logout" onPress={handleLogout} />
        <View style={{ height: 12 }} />
        <PrimaryButton title="Change Role" onPress={handleChangeRole} style={{ backgroundColor: '#6b7280' }} />
      </ScrollView>
    </SafeAreaView>
  );
}
