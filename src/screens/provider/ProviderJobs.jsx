// src/screens/provider/ProviderJobs.jsx
import React, { useContext, useMemo } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { AppContext } from '../../context/AppContext';

function JobRow({ job, onView }) {
  return (
    <View style={{ backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 12, shadowOpacity: 0.03 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ fontWeight: '700' }}>{job.title}</Text>
          <Text style={{ color: '#6b7280', marginTop: 4 }}>{job.company} · {job.location}</Text>
          <Text style={{ marginTop: 8, color: '#374151' }} numberOfLines={3}>{job.description}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: '#6b7280' }}>{job.type}</Text>
          <PrimaryButton title="View" onPress={() => onView(job)} style={{ paddingVertical: 6, paddingHorizontal: 10, marginTop: 8 }} />
        </View>
      </View>
    </View>
  );
}

export default function ProviderJobs({ navigation }) {
  const { jobs = [], user } = useContext(AppContext);

  // Debug logs (check Metro/console)
  console.log('ProviderJobs: user =>', user);
  console.log('ProviderJobs: jobs count =>', jobs.length, jobs);

  const myJobs = useMemo(() => {
    if (!user?.email) return [];
    return jobs.filter(j => j.postedBy === user.email);
  }, [jobs, user?.email]);

  function openJob(job) {
    navigation.navigate('JobDetail', { jobId: job.id });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>My Jobs</Text>
        <Text style={{ color: '#6b7280', marginBottom: 12 }}>
          Jobs you have posted (mock). If you dont see any, read the message below.
        </Text>

        <PrimaryButton title="Post a Job" onPress={() => navigation.navigate('PostJob')} />
        <View style={{ height: 12 }} />

        {/* Helpful diagnostics for dev */}
        {!user?.email && (
          <Text style={{ color: '#b91c1c', marginBottom: 12 }}>
            No user email detected. Please ensure you signed in as a provider. Current user: {JSON.stringify(user)}
          </Text>
        )}

        {myJobs.length === 0 ? (
          <>
            <Text style={{ marginTop: 10, color: '#6b7280' }}>
              You dont have any jobs with postedBy === {user?.email ? `"${user.email}"` : 'your email'}.
            </Text>

            <Text style={{ marginTop: 8, color: '#6b7280' }}>
              Tip: Sign in with a provider email that matches postedBy in src/mock/jobs.js (e.g. provider1@company.com).
            </Text>

            <View style={{ height: 12 }} />

            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Showing all jobs (fallback)</Text>
            {jobs.map(job => <JobRow key={job.id} job={job} onView={openJob} />)}
          </>
        ) : (
          myJobs.map(job => <JobRow key={job.id} job={job} onView={openJob} />)
        )}

        <View style={{ height: 24 }} />
        <PrimaryButton title="View Analytics" onPress={() => navigation.navigate('Analytics')} />
      </ScrollView>
    </SafeAreaView>
  );
}
