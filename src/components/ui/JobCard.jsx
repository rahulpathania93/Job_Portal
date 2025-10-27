// src/components/ui/JobCard.jsx - Naukri.com Job Card Design
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function JobCard({ job, onPress, showApplyButton = true }) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.9} 
      style={styles.container}
    >
      {/* Job Header */}
      <View style={styles.header}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{job.location}</Text>
          </View>
        </View>
        <View style={styles.salaryContainer}>
          <Text style={styles.salary}>{job.salary}</Text>
          <View style={styles.jobTypeBadge}>
            <Text style={styles.jobTypeText}>{job.type}</Text>
          </View>
        </View>
      </View>

      {/* Job Description */}
      <Text style={styles.description} numberOfLines={2}>
        {job.description}
      </Text>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <View style={styles.skillsContainer}>
          {job.skills.slice(0, 3).map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          {job.skills.length > 3 && (
            <View style={styles.moreSkillsTag}>
              <Text style={styles.moreSkillsText}>+{job.skills.length - 3} more</Text>
            </View>
          )}
        </View>
      )}

      {/* Job Footer */}
      <View style={styles.footer}>
        <View style={styles.jobMeta}>
          <Text style={styles.postedTime}>Posted 2 days ago</Text>
          <Text style={styles.applicantsCount}>
            {job.applicants?.length || 0} applicants
          </Text>
        </View>
        
        {showApplyButton && (
          <TouchableOpacity style={styles.applyButton} onPress={onPress}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Job Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💾</Text>
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>🔔</Text>
          <Text style={styles.actionText}>Alert</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
    paddingRight: 12,
    flexShrink: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  companyName: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  salaryContainer: {
    alignItems: 'flex-end',
    flexShrink: 0,
    minWidth: 80,
  },
  salary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 6,
  },
  jobTypeBadge: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  jobTypeText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  skillTag: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  skillText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '500',
  },
  moreSkillsTag: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  moreSkillsText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginBottom: 12,
  },
  jobMeta: {
    flex: 1,
  },
  postedTime: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 2,
  },
  applicantsCount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  applyButtonText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});