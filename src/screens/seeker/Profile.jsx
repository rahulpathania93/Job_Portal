// src/screens/seeker/Profile.jsx - Job Portal Profile Screen
import { useContext, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function Profile({ navigation }) {
  // const { user, profile, setProfile } = useContext(AppContext);
  const { user } = useContext(AppContext);

  // Mock profile data
  const [employmentData] = useState([
    {
      id: 1,
      title: 'Fullstack Software Developer',
      company: 'Gamavis softech llp',
      duration: 'Full time • Jun 2024 - Present',
      description: 'I design and develop scalable web applications and APIs using Node.js, Express, MongoDB, and modern frontend frameworks - Reactjs, html, css, skilled at building scalable web applications, APIs, and end-to-end solutions that bridge user experience with robust backend architecture.',
    },
    {
      id: 2,
      title: 'Nodejs Developer',
      company: 'Novagems Inc',
      duration: 'Full time • Jul 2022 - May 2024',
      description: 'Recently worked on a new feature called "Learning On-boarding Video Tutorials." This feature puts educational content at users fingertips.',
    },
    {
      id: 3,
      title: 'Data Miner',
      company: 'Novagems Inc',
      duration: 'Full time • Dec 2020 - Jun 2022',
      description: 'In the current job profile, I am responsible for extracting and procuring data from various online sources to support business intelligence and analytics.',
    },
  ]);

  const [projectsData] = useState([
    {
      id: 1,
      title: 'Library and Book Subscription Service',
      company: 'XYZ',
      duration: 'May 2024 - Jan 2025 • Full Time',
    },
    {
      id: 2,
      title: 'Guard & Clean Aggregator',
      company: 'Novagems',
      duration: 'Jan 2021 - Jan 2021 • Full Time',
    },
  ]);

  const [educationData] = useState([
    {
      id: 1,
      degree: 'B.Tech/B.E. Electronics/Telecommunication',
      university: 'Punjab Technical University (PTU)',
      year: '2010-2014 • Full Time',
    },
    {
      id: 2,
      degree: 'Class XII',
      university: 'Himachal Pradesh',
      year: '2010',
    },
  ]);

  const [skillsData] = useState([
    { skill: 'Javascript', experience: '6 Months', lastUsed: 'Last used 2014' },
    { skill: 'ASP.NET', experience: '6 Months', lastUsed: 'Last used 2014' },
    { skill: 'MS Office', experience: '6 Months', lastUsed: 'Last used 2016' },
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'R'}
            </Text>
          </View>
          <TouchableOpacity style={styles.pencilButton}>
            <Text style={styles.pencilIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name}>{user?.name?.toUpperCase() || 'RYAN GOSLING'}</Text>
        <Text style={styles.designation}>
          {user?.designation || 'Senior Software Engineer'}, {user?.currentCompany || 'Tech Corp'}
        </Text>
        
        <TouchableOpacity style={styles.takeTestButton}>
          <Text style={styles.takeTestText}>Take test</Text>
        </TouchableOpacity>
      </View>

      {/* Basic Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Basic details</Text>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>💼</Text>
          <Text style={styles.detailText}>{user?.experience || '5 Years'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📍</Text>
          <Text style={styles.detailText}>{user?.location || 'Kondapur, Hyderabad'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>💰</Text>
          <Text style={[styles.detailText, styles.addLink]}>Add salary</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📅</Text>
          <Text style={styles.detailText}>15 days or less notice period</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📧</Text>
          <Text style={styles.detailText}>{user?.email || 'ryangosling@yahoo.com'}</Text>
          <Text style={styles.verifiedCheck}>✓ Verified</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📱</Text>
          <Text style={styles.detailText}>{user?.mobile || '9876543210'}</Text>
          <Text style={styles.verifiedCheck}>✓ Verified</Text>
        </View>
      </View>

      {/* Resume Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Resume</Text>
          <TouchableOpacity>
            <Text style={styles.updateLink}>Update</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.resumeCard}>
          <Text style={styles.resumeIcon}>📄</Text>
          <View style={styles.resumeInfo}>
            <Text style={styles.resumeFileName}>Resume.pdf</Text>
            <Text style={styles.resumeDate}>Oct 26 2025</Text>
          </View>
        </View>
      </View>

      {/* Profile Summary */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Profile summary</Text>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.summaryText}>
          {user?.summary || 'I am a Full Stack Software Developer with expertise in Node.js, Express, MongoDB, and modern frontend frameworks - Reactjs, html, css. Skilled at building scalable web applications, APIs, and end-to-end solutions that bridge user experience with robust backend architecture.'}
        </Text>
      </View>

      {/* Professional Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Professional details</Text>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Current industry:</Text>
          <Text style={styles.detailValue}>IT Services & Consulting</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Current department:</Text>
          <Text style={styles.detailValue}>IT & Information Security</Text>
        </View>
      </View>

      {/* Employment Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Employment</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>Add</Text>
          </TouchableOpacity>
        </View>
        
        {employmentData.map((job) => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobIcon}>🏢</Text>
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCompany}>{job.company}</Text>
                <Text style={styles.jobDuration}>{job.duration}</Text>
              </View>
            </View>
            <Text style={styles.jobDescription}>{job.description} Read more</Text>
          </View>
        ))}
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>Add</Text>
          </TouchableOpacity>
        </View>
        
        {projectsData.map((project) => (
          <View key={project.id} style={styles.projectCard}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectCompany}>{project.company}</Text>
            <Text style={styles.projectDuration}>{project.duration}</Text>
          </View>
        ))}
        <TouchableOpacity>
          <Text style={styles.moreLink}>+ 1 more</Text>
        </TouchableOpacity>
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Education</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>Add</Text>
          </TouchableOpacity>
        </View>
        
        {educationData.map((edu) => (
          <View key={edu.id} style={styles.educationCard}>
            <Text style={styles.educationDegree}>{edu.degree}</Text>
            <Text style={styles.educationUniversity}>{edu.university}</Text>
            <Text style={styles.educationYear}>{edu.year}</Text>
          </View>
        ))}
      </View>

      {/* IT Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>IT skills</Text>
        
        {skillsData.map((skill, index) => (
          <View key={index} style={styles.skillCard}>
            <Text style={styles.skillName}>{skill.skill}</Text>
            <Text style={styles.skillExperience}>{skill.experience}</Text>
            <Text style={styles.skillLastUsed}>{skill.lastUsed}</Text>
            <TouchableOpacity style={styles.editSkillButton}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Online Profile */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Online profile</Text>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.onlineProfileName}>{user?.name?.toUpperCase() || 'RYAN GOSLING'}</Text>
        <Text style={styles.onlineProfileEmail}>{user?.email || 'ryangosling@yahoo.com'}</Text>
        <Text style={styles.onlineProfileDesc}>
          I MENTIONED MY Linkdin, Gmail and Facebook Accounts
        </Text>
      </View>

      {/* Personal Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal details</Text>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.personalDetailRow}>
          <Text style={styles.personalDetailLabel}>Personal:</Text>
          <Text style={styles.personalDetailValue}>Male, Single / unmarried</Text>
        </View>
        
        <View style={styles.personalDetailRow}>
          <Text style={styles.personalDetailLabel}>Date of birth:</Text>
          <Text style={styles.personalDetailValue}>09 Aug 1993</Text>
        </View>
        
        <View style={styles.personalDetailRow}>
          <Text style={styles.personalDetailLabel}>Category:</Text>
          <Text style={styles.personalDetailValue}>General</Text>
        </View>
        
        <View style={styles.personalDetailRow}>
          <Text style={styles.personalDetailLabel}>Work permit:</Text>
          <Text style={styles.personalDetailValue}>Need US H1 Visa, India</Text>
        </View>
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>Add</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.languageItem}>
          <Text style={styles.languageName}>English</Text>
          <Text style={styles.languageProficiency}>Read, Write, Speak</Text>
        </View>
        
        <View style={styles.languageItem}>
          <Text style={styles.languageName}>Hindi</Text>
          <Text style={styles.languageProficiency}>Read, Write, Speak</Text>
        </View>
        
        <View style={styles.languageItem}>
          <Text style={styles.languageName}>Punjabi</Text>
          <Text style={styles.languageProficiency}>Speak</Text>
        </View>
      </View>

      {/* Disability Status */}
      <View style={styles.section}>
        <Text style={styles.diversityTitle}>
          Share details to attract recruiters who value people from different backgrounds
        </Text>
        <Text style={styles.sectionLabel}>Disability status</Text>
        <Text style={styles.disabilityStatus}>Do not have disability</Text>
        
        <TouchableOpacity style={styles.addLinkButton}>
          <Text style={styles.addLinkText}>Add military experience</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.addLinkButton}>
          <Text style={styles.addLinkText}>Add career break</Text>
        </TouchableOpacity>
      </View>

      {/* Video Profile */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Video profile</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>Add now</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.videoCard}>
          <TouchableOpacity style={styles.addVideoButton}>
            <Text style={styles.videoIcon}>📹</Text>
            <Text style={styles.addVideoText}>Add video</Text>
          </TouchableOpacity>
          
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>
              Improve your hiring chances by 30% by adding a video
            </Text>
            <Text style={styles.videoSubtitle}>
              Recruiters prefer candidates with a video profile
            </Text>
            <TouchableOpacity>
              <Text style={styles.helpLink}>How it helps</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Accomplishments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accomplishments</Text>
        
        <View style={styles.accomplishmentsContainer}>
          <TouchableOpacity style={styles.accomplishmentButton}>
            <Text style={styles.accomplishmentText}>Research publication </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.accomplishmentButton}>
            <Text style={styles.accomplishmentText}>Patent </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.accomplishmentButton}>
            <Text style={styles.accomplishmentText}>Certification</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.surface,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  pencilButton: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  pencilIcon: {
    fontSize: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  designation: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  takeTestButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  takeTestText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  editIcon: {
    fontSize: 16,
  },
  addLink: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    width: 120,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
  },
  verifiedCheck: {
    fontSize: 12,
    color: '#00FF41',
    fontWeight: '600',
    marginLeft: 8,
  },
  updateLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  resumeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  resumeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  resumeInfo: {
    flex: 1,
  },
  resumeFileName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  resumeDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  jobCard: {
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  jobIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  jobDuration: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  jobDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginLeft: 28,
  },
  projectCard: {
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  projectCompany: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  projectDuration: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  moreLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  educationCard: {
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  educationDegree: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  educationUniversity: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  educationYear: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  skillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  skillName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    width: 100,
  },
  skillExperience: {
    fontSize: 12,
    color: Colors.textSecondary,
    width: 80,
  },
  skillLastUsed: {
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
  },
  editSkillButton: {
    padding: 4,
  },
  onlineProfileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  onlineProfileEmail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  onlineProfileDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  personalDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  personalDetailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  personalDetailValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  languageName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  languageProficiency: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  diversityTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  disabilityStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  addLinkButton: {
    paddingVertical: 8,
  },
  addLinkText: {
    color: Colors.primary,
    fontSize: 14,
  },
  videoCard: {
    flexDirection: 'row',
    marginTop: 12,
  },
  addVideoButton: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginRight: 16,
    minWidth: 100,
  },
  videoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  addVideoText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  videoSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  helpLink: {
    color: Colors.primary,
    fontSize: 14,
  },
  accomplishmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  accomplishmentButton: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  accomplishmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  bottomSpacing: {
    height: 40,
  },
});
