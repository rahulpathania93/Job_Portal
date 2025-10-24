// src/screens/provider/AnalyticsDashboard.jsx
import { useContext, useMemo } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { AppContext } from '../../context/AppContext';

export default function AnalyticsDashboard({ navigation }) {
  const { jobs, user } = useContext(AppContext);

  // provider-specific analytics
  const myJobs = useMemo(() => jobs.filter(j => j.postedBy === user?.email), [jobs, user?.email]);

  const totalJobs = myJobs.length;
  const totalApplicants = myJobs.reduce((sum, j) => sum + (j.applicants ? j.applicants.length : 0), 0);

  const applicantsPerJob = myJobs.map(j => ({ id: j.id, title: j.title, applicants: j.applicants?.length || 0 }));

  // top skills across posted jobs
  const skillCounts = myJobs.reduce((acc, j) => {
    (j.skills || []).forEach(s => {
      acc[s] = (acc[s] || 0) + 1;
    });
    return acc;
  }, {});
  const topSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>Analytics</Text>
        <Text style={{ color: '#6b7280', marginBottom: 12 }}>Overview for your posted jobs</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <StatCard title="Jobs Posted" value={String(totalJobs)} />
          <StatCard title="Total Applicants" value={String(totalApplicants)} />
        </View>

        <Text style={{ fontWeight: '700', marginTop: 8 }}>Top Skills</Text>
        {topSkills.length ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
            {topSkills.map(([skill, cnt]) => (
              <View key={skill} style={{ padding: 8, backgroundColor: '#f3f4f6', borderRadius: 8, marginRight: 8, marginBottom: 8 }}>
                <Text style={{ fontWeight: '600' }}>{skill}</Text>
                <Text style={{ color: '#6b7280' }}>{cnt} job(s)</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={{ color: '#6b7280', marginTop: 8 }}>No skill data yet</Text>
        )}

        <Text style={{ fontWeight: '700', marginTop: 16 }}>Applicants per Job</Text>
        {applicantsPerJob.length ? (
          <FlatList
            data={applicantsPerJob}
            keyExtractor={i => i.id}
            renderItem={({ item }) => (
              <View style={{ padding: 10, backgroundColor: '#f8fafc', borderRadius: 8, marginTop: 8 }}>
                <Text style={{ fontWeight: '600' }}>{item.title}</Text>
                <Text style={{ color: '#6b7280', marginTop: 4 }}>{item.applicants} applicants</Text>
              </View>
            )}
          />
        ) : (
          <Text style={{ color: '#6b7280', marginTop: 8 }}>No applicant data yet</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

function StatCard({ title, value }) {
  return (
    <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10, elevation: 2, width: '48%' }}>
      <Text style={{ color: '#6b7280', fontSize: 12 }}>{title}</Text>
      <Text style={{ fontWeight: '700', fontSize: 18, marginTop: 6 }}>{value}</Text>
    </View>
  );
}
