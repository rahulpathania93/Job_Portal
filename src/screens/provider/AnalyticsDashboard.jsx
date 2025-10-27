// src/screens/provider/AnalyticsDashboard.jsx
import { useContext, useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Analytics Dashboard</Text>
        <Text style={styles.subtitle}>Overview of your posted jobs and performance</Text>

        <View style={styles.statsContainer}>
          <StatCard title="Jobs Posted" value={String(totalJobs)} />
          <StatCard title="Total Applicants" value={String(totalApplicants)} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Skills in Demand</Text>
          {topSkills.length ? (
            <View style={styles.skillsContainer}>
              {topSkills.map(([skill, cnt]) => (
                <View key={skill} style={styles.skillCard}>
                  <Text style={styles.skillName}>{skill}</Text>
                  <Text style={styles.skillCount}>{cnt} job(s)</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No skill data yet</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Applicants per Job</Text>
          {applicantsPerJob.length ? (
            <FlatList
              data={applicantsPerJob}
              keyExtractor={i => i.id}
              renderItem={({ item }) => (
                <View style={styles.jobCard}>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <Text style={styles.jobApplicants}>{item.applicants} applicants</Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.emptyText}>No applicant data yet</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function StatCard({ title, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.jobCardBackground,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.jobCardBorder,
    elevation: 2,
    shadowColor: Colors.jobCardShadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontWeight: '800',
    fontSize: 20,
    color: Colors.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillCard: {
    padding: 12,
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  skillName: {
    fontWeight: '600',
    color: Colors.primary,
    fontSize: 14,
    marginBottom: 2,
  },
  skillCount: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  jobCard: {
    padding: 16,
    backgroundColor: Colors.jobCardBackground,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.jobCardBorder,
  },
  jobTitle: {
    fontWeight: '600',
    color: Colors.textPrimary,
    fontSize: 14,
    marginBottom: 4,
  },
  jobApplicants: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
