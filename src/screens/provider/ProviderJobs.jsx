// src/screens/provider/ProviderJobs.jsx
import { useContext, useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

function JobRow({ job, onView }) {
  return (
    <View style={styles.jobCard}>
      <View style={styles.jobContent}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.jobMeta}>{job.company} · {job.location}</Text>
          <Text style={styles.jobDescription} numberOfLines={3}>{job.description}</Text>
        </View>
        <View style={styles.jobActions}>
          <Text style={styles.jobType}>{job.type}</Text>
          <PrimaryButton 
            title="View" 
            onPress={() => onView(job)} 
            style={styles.viewButton} 
          />
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Jobs</Text>
        <Text style={styles.subtitle}>
          Jobs you have posted. If you don't see any, read the message below.
        </Text>

        <PrimaryButton 
          title="Post a Job" 
          onPress={() => navigation.navigate('PostJob')} 
          style={styles.postButton}
        />

        {/* Helpful diagnostics for dev */}
        {!user?.email && (
          <Text style={styles.errorText}>
            No user email detected. Please ensure you signed in as a provider.
          </Text>
        )}

        {myJobs.length === 0 ? (
          <>
            <Text style={styles.infoText}>
              You don't have any jobs with postedBy === {user?.email ? `"${user.email}"` : 'your email'}.
            </Text>

            <Text style={styles.tipText}>
              Tip: Sign in with a provider email that matches postedBy in src/mock/jobs.js.
            </Text>

            <Text style={styles.fallbackTitle}>Showing all jobs (fallback)</Text>
            {jobs.map(job => <JobRow key={job.id} job={job} onView={openJob} />)}
          </>
        ) : (
          myJobs.map(job => <JobRow key={job.id} job={job} onView={openJob} />)
        )}

        <PrimaryButton 
          title="View Analytics" 
          onPress={() => navigation.navigate('Analytics')} 
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
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  postButton: {
    marginBottom: 20,
  },
  errorText: {
    color: Colors.error,
    marginBottom: 12,
    padding: 12,
    backgroundColor: Colors.error + '10',
    borderRadius: 8,
  },
  infoText: {
    marginTop: 16,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tipText: {
    marginTop: 8,
    color: Colors.textLight,
    fontSize: 14,
    lineHeight: 18,
  },
  fallbackTitle: {
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    color: Colors.textPrimary,
  },
  analyticsButton: {
    marginTop: 24,
  },
  jobCard: {
    backgroundColor: Colors.jobCardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.jobCardBorder,
    elevation: 2,
    shadowColor: Colors.jobCardShadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  jobContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobInfo: {
    flex: 1,
    paddingRight: 12,
  },
  jobTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
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
  },
  jobActions: {
    alignItems: 'flex-end',
  },
  jobType: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
