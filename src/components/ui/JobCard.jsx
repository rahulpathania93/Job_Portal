// src/components/ui/JobCard.jsx - Job Portal Job Card Design (Naukri.com Style)
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function JobCard({ job, onPress, showApplyButton = true, onSave }) {
  // Generate random rating for mock data
  const randomRating = (3.5 + Math.random() * 1.5).toFixed(1);
  const randomReviews = Math.floor(Math.random() * 50000) + 10;
  
  // Generate job level
  const jobLevels = ['Entry level', 'Associate level', 'Mid level', 'Senior level'];
  const jobLevel = jobLevels[Math.floor(Math.random() * jobLevels.length)];
  
  // Format skills display
  const skillsDisplay = job.skills.join(', ').toLowerCase();
  
  // Generate random days ago
  const daysAgo = Math.floor(Math.random() * 30) + 1;
  const timePosted = daysAgo === 1 ? '1d ago' : daysAgo > 30 ? '30+d ago' : `${daysAgo}d ago`;

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.9} 
      style={styles.container}
    >
      {/* Company Logo Placeholder */}
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>{job.company.substring(0, 2).toUpperCase()}</Text>
        </View>
      </View>

      {/* Job Info */}
      <View style={styles.jobInfo}>
        {/* Job Title */}
        <Text style={styles.jobTitle}>{job.title}</Text>
        
        {/* Company Name */}
        <Text style={styles.companyName}>{job.company}</Text>
        
        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.starIcon}>⭐</Text>
          <Text style={styles.rating}>{randomRating} ({randomReviews.toLocaleString()} Reviews)</Text>
        </View>
        
        {/* Location */}
        <View style={styles.detailsRow}>
          <Text style={styles.icon}>📍</Text>
          <Text style={styles.detailText}>{job.location}</Text>
        </View>
        
        {/* Job Level */}
        <View style={styles.detailsRow}>
          <Text style={styles.icon}>💼</Text>
          <Text style={styles.detailText}>{jobLevel}</Text>
        </View>
        
        {/* Skills */}
        <Text style={styles.skillsText}>{skillsDisplay}</Text>
        
        {/* Posted Time and Save Button */}
        <View style={styles.footerRow}>
          <Text style={styles.timePosted}>{timePosted}</Text>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => onSave && onSave(job)}
          >
            <Text style={styles.saveIcon}>🔖</Text>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
        
        {/* Apply Button */}
        {showApplyButton && (
          <TouchableOpacity style={styles.applyButton} onPress={onPress}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginBottom: 12,
    marginHorizontal: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  logoContainer: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary + '20',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  jobInfo: {
    paddingRight: 70, // Space for logo
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  companyName: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    fontSize: 12,
    marginRight: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  skillsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 6,
    marginBottom: 8,
    lineHeight: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timePosted: {
    fontSize: 12,
    color: Colors.textLight,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  saveText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    color: Colors.buttonPrimaryText,
    fontSize: 14,
    fontWeight: '600',
  },
});
