// src/screens/seeker/Dashboard.jsx
import { useContext, useMemo } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import JobCard from '../../components/ui/JobCard';
import { AppContext } from '../../context/AppContext';

export default function Dashboard({ navigation }) {
  const { jobs, appliedJobIds } = useContext(AppContext);

  const appliedJobs = useMemo(
    () => jobs.filter(j => appliedJobIds.includes(j.id)),
    [jobs, appliedJobIds]
  );

  const availableJobs = useMemo(
    () => jobs.filter(j => !appliedJobIds.includes(j.id)),
    [jobs, appliedJobIds]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 8 }}>Dashboard</Text>
        <Text style={{ color: '#6b7280', marginBottom: 12 }}>Your activities</Text>

        <Text style={{ fontWeight: '600', marginBottom: 8 }}>Applied Jobs</Text>
        {appliedJobs.length ? (
          <FlatList
            data={appliedJobs}
            keyExtractor={i => i.id}
            renderItem={({ item }) => (
              <JobCard job={item} onPress={() => navigation.navigate('JobDetail', { jobId: item.id })} />
            )}
            style={{ marginBottom: 16 }}
          />
        ) : (
          <Text style={{ color: '#6b7280', marginBottom: 12 }}>You have not applied to any jobs yet.</Text>
        )}

        <Text style={{ fontWeight: '600', marginBottom: 8 }}>Available Jobs</Text>
        <FlatList
          data={availableJobs}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <JobCard job={item} onPress={() => navigation.navigate('JobDetail', { jobId: item.id })} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
