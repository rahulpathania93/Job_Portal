// src/screens/seeker/JobDetail.jsx
import { useContext, useMemo, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { AppContext } from '../../context/AppContext';

export default function JobDetail({ route, navigation }) {
  const { jobId } = route.params || {};
  const { jobs, applyToJob, appliedJobIds } = useContext(AppContext);

  const job = useMemo(() => jobs.find(j => j.id === jobId), [jobs, jobId]);
  const applied = appliedJobIds.includes(jobId);
  const [localApplied, setLocalApplied] = useState(applied);

  if (!job) {
    return (
      <SafeAreaView style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>No job found</Text>
      </SafeAreaView>
    );
  }

  function handleApply() {
    if (applied || localApplied) {
      Alert.alert('Already applied', 'You have already applied for this job.');
      return;
    }
    applyToJob(jobId);
    setLocalApplied(true);
    Alert.alert('Applied', `You applied to ${job.title}`);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>{job.title}</Text>
        <Text style={{ color: '#6b7280', marginTop: 6 }}>{job.company} • {job.location}</Text>

        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: '600' }}>Description</Text>
          <Text style={{ marginTop: 6, color: '#374151' }}>{job.description}</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: '600' }}>Skills</Text>
          <Text style={{ marginTop: 6, color: '#374151' }}>{job.skills.join(', ')}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <PrimaryButton title={localApplied ? 'Applied' : 'Apply Now'} onPress={handleApply} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: '600' }}>Applicants</Text>
          {job.applicants && job.applicants.length ? (
            job.applicants.map(a => (
              <View key={a.id} style={{ marginTop: 8, padding: 10, backgroundColor: '#f8fafc', borderRadius: 8 }}>
                <Text style={{ fontWeight: '600' }}>{a.name}</Text>
                <Text style={{ color: '#6b7280' }}>{a.experience}</Text>
              </View>
            ))
          ) : (
            <Text style={{ marginTop: 8, color: '#6b7280' }}>No applicants yet</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
