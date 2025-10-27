// src/screens/seeker/JobDetail.jsx
import { useContext, useMemo, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function JobDetail({ route, navigation }) {
  const { jobId } = route.params || {};
  const { jobs, applyToJob, appliedJobIds, role } = useContext(AppContext);

  const job = useMemo(() => jobs.find(j => j.id === jobId), [jobs, jobId]);
  const applied = appliedJobIds.includes(jobId);
  const [localApplied, setLocalApplied] = useState(applied);

  if (!job) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>No job found</Text>
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

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this job: ${job.title} at ${job.company} - ${job.location}`,
        title: 'Job Opportunity',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    Alert.alert('Saved', 'Job saved to your favorites');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Text style={styles.actionIcon}>💾</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Job Header */}
        <View style={styles.jobHeader}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>
          <View style={styles.jobMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{job.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>💰</Text>
              <Text style={styles.metaText}>{job.salary}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏰</Text>
              <Text style={styles.metaText}>{job.type}</Text>
            </View>
          </View>
        </View>

        {/* Job Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.sectionContent}>{job.description}</Text>
        </View>

        {/* Required Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Skills</Text>
          <View style={styles.skillsContainer}>
            {job.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Company Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Company</Text>
          <View style={styles.companyInfo}>
            <View style={styles.companyLogo}>
              <Text style={styles.companyLogoText}>
                {job.company.charAt(0)}
              </Text>
            </View>
            <View style={styles.companyDetails}>
              <Text style={styles.companyName}>{job.company}</Text>
              <Text style={styles.companyLocation}>{job.location}</Text>
              <Text style={styles.companyDescription}>
                A leading company in the industry, committed to innovation and excellence.
              </Text>
            </View>
          </View>
        </View>

        {/* Job Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.requirementsList}>
            <Text style={styles.requirementItem}>• 2+ years of experience in relevant field</Text>
            <Text style={styles.requirementItem}>• Strong problem-solving skills</Text>
            <Text style={styles.requirementItem}>• Excellent communication skills</Text>
            <Text style={styles.requirementItem}>• Ability to work in a team environment</Text>
            <Text style={styles.requirementItem}>• Bachelor's degree preferred</Text>
          </View>
        </View>

        {/* Applicants (for providers) */}
        {role === 'provider' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Applicants ({job.applicants?.length || 0})
            </Text>
            {job.applicants && job.applicants.length > 0 ? (
              job.applicants.map(applicant => (
                <View key={applicant.id} style={styles.applicantCard}>
                  <View style={styles.applicantAvatar}>
                    <Text style={styles.applicantAvatarText}>
                      {applicant.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.applicantInfo}>
                    <Text style={styles.applicantName}>{applicant.name}</Text>
                    <Text style={styles.applicantExperience}>{applicant.experience}</Text>
                    <Text style={styles.applicantEmail}>{applicant.email}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewProfileButton}>
                    <Text style={styles.viewProfileText}>View Profile</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noApplicantsText}>No applicants yet</Text>
            )}
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Apply Button */}
      {role === 'seeker' && (
        <View style={styles.applyContainer}>
          <PrimaryButton
            title={localApplied ? 'Applied ✓' : 'Apply Now'}
            onPress={handleApply}
            style={styles.applyButton}
            variant={localApplied ? 'secondary' : 'primary'}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
  actionIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  jobHeader: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 16,
  },
  jobMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaIcon: {
    fontSize: 16,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  companyInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyLogoText: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  companyDetails: {
    flex: 1,
  },
  companyLocation: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
  },
  companyDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  requirementsList: {
    gap: 8,
  },
  requirementItem: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  applicantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.jobCardBackground,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.jobCardBorder,
  },
  applicantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  applicantAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  applicantExperience: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  applicantEmail: {
    fontSize: 12,
    color: Colors.textLight,
  },
  viewProfileButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewProfileText: {
    color: Colors.buttonPrimaryText,
    fontSize: 12,
    fontWeight: '600',
  },
  noApplicantsText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
  bottomSpacing: {
    height: 100,
  },
  applyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  applyButton: {
    width: '100%',
    paddingVertical: 16,
  },
});
