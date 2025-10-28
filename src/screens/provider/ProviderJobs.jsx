// src/screens/provider/ProviderJobs.jsx
import { useContext, useMemo } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

function JobRow({ job, onView }) {
  const postedDate = new Date(job.postedDate || Date.now());
  const isExpired = (Date.now() - postedDate.getTime()) > (30 * 24 * 60 * 60 * 1000); // 30 days

  return (
    <View style={[styles.jobCard, isExpired && styles.expiredJobCard]}>
      <View style={styles.jobContent}>
        <View style={styles.jobInfo}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            {isExpired && <Text style={styles.expiredBadge}>EXPIRED</Text>}
          </View>
          <Text style={styles.jobMeta}>{job.company} · {job.location}</Text>
          <Text style={styles.jobDescription} numberOfLines={2}>{job.description}</Text>
          <View style={styles.jobFooter}>
            <Text style={styles.jobType}>{job.type}</Text>
            <Text style={styles.jobSalary}>{job.salary}</Text>
            <Text style={styles.jobDate}>
              Posted: {postedDate.toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.jobActions}>
          <Text style={styles.applicantCount}>
            {job.applicants?.length || 0} applicants
          </Text>
          <PrimaryButton 
            title="View Details" 
            onPress={() => onView(job)} 
            style={styles.viewButton} 
          />
        </View>
      </View>
    </View>
  );
}

export default function ProviderJobs({ navigation }) {
  const { jobs = [], user, logout } = useContext(AppContext);

  const myJobs = useMemo(() => {
    if (!user?.email) return [];
    return jobs.filter(j => j.postedBy === user.email);
  }, [jobs, user?.email]);

  function openJob(job) {
    // Navigate to JobDetail screen
    navigation.navigate('JobDetail', { jobId: job.id });
  }

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

  // Safe navigation helper
  const safeNavigate = (screenName, params = {}) => {
    try {
      navigation.navigate(screenName, params);
    } catch (error) {
      console.log('Navigation error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Jobs</Text>
            <Text style={styles.subtitle}>
              Manage your job postings and track applications
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton 
          title="Post a New Job" 
          onPress={() => safeNavigate('PostJobTab')} 
          style={styles.postButton}
        />

        {myJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💼</Text>
            <Text style={styles.emptyTitle}>No Jobs Posted Yet</Text>
            <Text style={styles.emptyText}>
              Start by posting your first job to attract candidates
            </Text>
            <PrimaryButton 
              title="Post Your First Job" 
              onPress={() => safeNavigate('PostJobTab')} 
              style={styles.emptyButton}
            />
          </View>
        ) : (
          <>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{myJobs.length}</Text>
                <Text style={styles.statLabel}>Total Jobs</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {myJobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0)}
                </Text>
                <Text style={styles.statLabel}>Total Applicants</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Your Job Postings</Text>
            {myJobs.map(job => <JobRow key={job.id} job={job} onView={openJob} />)}
          </>
        )}

        <PrimaryButton 
          title="View Analytics" 
          onPress={() => safeNavigate('AnalyticsTab')} 
          style={styles.analyticsButton}
        />
      </ScrollView>
    </SafeAreaView>
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
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
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
  postButton: {
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyButton: {
    width: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  analyticsButton: {
    marginTop: 24,
  },
  jobCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  expiredJobCard: {
    backgroundColor: Colors.surface + '80',
    borderColor: Colors.error,
  },
  jobContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobInfo: {
    flex: 1,
    paddingRight: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  jobTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  expiredBadge: {
    backgroundColor: Colors.error,
    color: Colors.textPrimary,
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  jobMeta: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  jobDescription: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 12,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobType: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  jobSalary: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  jobDate: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  jobActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  applicantCount: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
