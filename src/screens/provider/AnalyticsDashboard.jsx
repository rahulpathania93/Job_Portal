// src/screens/provider/AnalyticsDashboard.jsx
import { useContext, useMemo } from 'react';
import { Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function AnalyticsDashboard({ navigation }) {
  const { jobs, user, logout } = useContext(AppContext);

  // provider-specific analytics
  const myJobs = useMemo(() => jobs.filter(j => j.postedBy === user?.email), [jobs, user?.email]);

  const totalJobs = myJobs.length;
  const totalApplicants = myJobs.reduce((sum, j) => sum + (j.applicants ? j.applicants.length : 0), 0);
  
  // Calculate rejected applicants (mock data - in real app this would come from application status)
  const rejectedApplicants = Math.floor(totalApplicants * 0.3); // 30% rejection rate
  const acceptedApplicants = Math.floor(totalApplicants * 0.2); // 20% acceptance rate
  const pendingApplicants = totalApplicants - rejectedApplicants - acceptedApplicants;
  
  // Calculate expired jobs (jobs older than 30 days)
  const expiredJobs = myJobs.filter(job => {
    const postedDate = new Date(job.postedDate || Date.now());
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return postedDate < thirtyDaysAgo;
  }).length;

  const applicantsPerJob = myJobs.map(j => ({ 
    id: j.id, 
    title: j.title, 
    applicants: j.applicants?.length || 0,
    postedDate: j.postedDate || new Date().toISOString()
  }));

  // top skills across posted jobs
  const skillCounts = myJobs.reduce((acc, j) => {
    (j.skills || []).forEach(s => {
      acc[s] = (acc[s] || 0) + 1;
    });
    return acc;
  }, {});
  const topSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'RoleSelect' }],
              });
            }, 100);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics Dashboard</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Overview of your posted jobs and performance</Text>

        {/* Main Stats */}
        <View style={styles.statsContainer}>
          <StatCard title="Total Jobs Posted" value={String(totalJobs)} icon="📊" />
          <StatCard title="Total Applicants" value={String(totalApplicants)} icon="👥" />
        </View>

        {/* Application Status Stats */}
        <View style={styles.statsContainer}>
          <StatCard title="Accepted" value={String(acceptedApplicants)} icon="✅" color="#4CAF50" />
          <StatCard title="Rejected" value={String(rejectedApplicants)} icon="❌" color="#F44336" />
          <StatCard title="Pending" value={String(pendingApplicants)} icon="⏳" color="#FF9800" />
        </View>

        {/* Additional Stats */}
        <View style={styles.statsContainer}>
          <StatCard title="Expired Jobs" value={String(expiredJobs)} icon="⏰" color="#9E9E9E" />
          <StatCard title="Active Jobs" value={String(totalJobs - expiredJobs)} icon="🟢" color="#4CAF50" />
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
                  <View style={styles.jobCardHeader}>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <Text style={styles.jobApplicants}>{item.applicants} applicants</Text>
                  </View>
                  <Text style={styles.jobDate}>
                    Posted: {new Date(item.postedDate).toLocaleDateString()}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.emptyText}>No applicant data yet</Text>
          )}
        </View>

        {/* Performance Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Insights</Text>
          <View style={styles.insightsContainer}>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>📈</Text>
              <Text style={styles.insightText}>
                Average {totalJobs > 0 ? Math.round(totalApplicants / totalJobs) : 0} applicants per job
              </Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>🎯</Text>
              <Text style={styles.insightText}>
                {totalApplicants > 0 ? Math.round((acceptedApplicants / totalApplicants) * 100) : 0}% acceptance rate
              </Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightIcon}>⏰</Text>
              <Text style={styles.insightText}>
                {expiredJobs} jobs need renewal
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ title, value, icon, color = Colors.primary }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
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
    backgroundColor: Colors.surface,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  jobCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontWeight: '600',
    color: Colors.textPrimary,
    fontSize: 14,
    flex: 1,
  },
  jobApplicants: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  jobDate: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  insightIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  insightText: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
