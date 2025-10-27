// src/screens/seeker/EditProfile.jsx - Job Portal Edit Profile Screen
import { useContext, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function EditProfile({ navigation }) {
  const { user, profile, setProfile } = useContext(AppContext);

  // Mock data states
  const [basicDetails, setBasicDetails] = useState({
    experience: '5 Years',
    location: 'Kondapur, Hyderabad',
    salary: '',
    noticePeriod: '15 days or less',
    email: user?.email || 'ryangosling@yahoo.com',
    phone: user?.mobile || '9876543210',
  });

  const [profileSummary, setProfileSummary] = useState(
    user?.summary || 'I am a Full Stack Software Developer with expertise in Node.js, Express, MongoDB, and modern frontend frameworks - Reactjs, html, css, skilled at building scalable web applications, APIs, and end-to-end solutions that bridge user experience with robust backend architecture.'
  );

  const [professionalDetails, setProfessionalDetails] = useState({
    currentIndustry: 'IT Services & Consulting',
    currentDepartment: 'IT & Information Security',
    currentRoleCategory: 'IT & Information Security - Other',
    currentJobRole: 'IT & Information Security - Other',
  });

  const [keySkills, setKeySkills] = useState([
    'Javascript', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Microservices',
    'Backend', 'Problem Solving', 'Docker', 'HTML', 'CSS', 'Python',
    'Beautiful Soup', 'Scrapy', 'Fast API', 'Ci/Cd', 'GIT', 'PLSQL',
    'Postgresql', 'Flask', 'Axios', 'React.js', 'Data Structures', 'Kubernetes'
  ]);

  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      basicDetails,
      profileSummary,
      professionalDetails,
      keySkills,
    };
    setProfile(updatedProfile);
    Alert.alert('Success', 'Profile updated successfully!');
    navigation.goBack();
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setKeySkills([...keySkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setKeySkills(keySkills.filter(s => s !== skill));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Basic Details Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Basic details</Text>
          <Text style={styles.requiredLabel}>(All fields required)</Text>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>💼 Experience</Text>
          <TextInput
            style={styles.input}
            value={basicDetails.experience}
            onChangeText={(text) => setBasicDetails({...basicDetails, experience: text})}
            placeholder="e.g. 5 Years"
            placeholderTextColor={Colors.inputPlaceholder}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>📍 Location</Text>
          <TextInput
            style={styles.input}
            value={basicDetails.location}
            onChangeText={(text) => setBasicDetails({...basicDetails, location: text})}
            placeholder="e.g. Kondapur, Hyderabad"
            placeholderTextColor={Colors.inputPlaceholder}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>💰 Salary</Text>
          <TextInput
            style={styles.input}
            value={basicDetails.salary}
            onChangeText={(text) => setBasicDetails({...basicDetails, salary: text})}
            placeholder="Add salary"
            placeholderTextColor={Colors.primary}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>📅 Notice Period</Text>
          <TextInput
            style={styles.input}
            value={basicDetails.noticePeriod}
            onChangeText={(text) => setBasicDetails({...basicDetails, noticePeriod: text})}
            placeholder="e.g. 15 days or less"
            placeholderTextColor={Colors.inputPlaceholder}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>📧 Email</Text>
          <TextInput
            style={styles.input}
            value={basicDetails.email}
            onChangeText={(text) => setBasicDetails({...basicDetails, email: text})}
            placeholder="your@email.com"
            placeholderTextColor={Colors.inputPlaceholder}
          />
          <Text style={styles.verifiedCheck}>✓ Verified</Text>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>📱 Phone</Text>
          <TextInput
            style={styles.input}
            value={basicDetails.phone}
            onChangeText={(text) => setBasicDetails({...basicDetails, phone: text})}
            placeholder="+91 1234567890"
            placeholderTextColor={Colors.inputPlaceholder}
          />
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
        
        <TouchableOpacity style={styles.resumeCard}>
          <Text style={styles.resumeIcon}>📄</Text>
          <View style={styles.resumeInfo}>
            <Text style={styles.resumeFileName}>Resume.pdf</Text>
            <Text style={styles.resumeDate}>Oct 26 2025</Text>
          </View>
          <Text style={styles.uploadText}>Tap to upload new resume</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Summary Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Profile summary</Text>
          <Text style={styles.wordCount}>{profileSummary.length}/500</Text>
        </View>
        
        <TextInput
          style={[styles.textArea, styles.summaryText]}
          value={profileSummary}
          onChangeText={setProfileSummary}
          multiline={true}
          numberOfLines={8}
          placeholder="Write a brief summary about yourself..."
          placeholderTextColor={Colors.inputPlaceholder}
          maxLength={500}
        />
      </View>

      {/* Professional Details Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Professional details</Text>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Current industry</Text>
          <TextInput
            style={styles.input}
            value={professionalDetails.currentIndustry}
            onChangeText={(text) => setProfessionalDetails({...professionalDetails, currentIndustry: text})}
            placeholderTextColor={Colors.inputPlaceholder}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Current department</Text>
          <TextInput
            style={styles.input}
            value={professionalDetails.currentDepartment}
            onChangeText={(text) => setProfessionalDetails({...professionalDetails, currentDepartment: text})}
            placeholderTextColor={Colors.inputPlaceholder}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Current role category</Text>
          <TextInput
            style={styles.input}
            value={professionalDetails.currentRoleCategory}
            onChangeText={(text) => setProfessionalDetails({...professionalDetails, currentRoleCategory: text})}
            placeholderTextColor={Colors.inputPlaceholder}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Current job role</Text>
          <TextInput
            style={styles.input}
            value={professionalDetails.currentJobRole}
            onChangeText={(text) => setProfessionalDetails({...professionalDetails, currentJobRole: text})}
            placeholderTextColor={Colors.inputPlaceholder}
          />
        </View>
      </View>

      {/* Key Skills Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Key skills</Text>
        </View>

        <View style={styles.skillsContainer}>
          {keySkills.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
              <TouchableOpacity onPress={() => removeSkill(skill)}>
                <Text style={styles.removeSkillIcon}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.addSkillContainer}>
          <TextInput
            style={styles.addSkillInput}
            value={newSkill}
            onChangeText={setNewSkill}
            placeholder="Add a skill"
            placeholderTextColor={Colors.inputPlaceholder}
          />
          <TouchableOpacity style={styles.addSkillButton} onPress={addSkill}>
            <Text style={styles.addSkillButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Employment Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Employment</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobIcon}>🏢</Text>
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>Fullstack Software Developer</Text>
              <Text style={styles.jobCompany}>Gamavis softech llp</Text>
              <Text style={styles.jobDuration}>Full time • Jun 2024 - Present</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editJobButton}>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobIcon}>🏢</Text>
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>Nodejs Developer</Text>
              <Text style={styles.jobCompany}>Novagems Inc</Text>
              <Text style={styles.jobDuration}>Full time • Jul 2022 - May 2024</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editJobButton}>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobIcon}>🏢</Text>
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>Data Miner</Text>
              <Text style={styles.jobCompany}>Novagems Inc</Text>
              <Text style={styles.jobDuration}>Full time • Dec 2020 - Jun 2022</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editJobButton}>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>Library and Book Subscription Service</Text>
          <Text style={styles.projectCompany}>XYZ</Text>
          <Text style={styles.projectDuration}>May 2024 - Jan 2025 • Full Time</Text>
          <TouchableOpacity style={styles.editProjectButton}>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>Guard & Clean Aggregator</Text>
          <Text style={styles.projectCompany}>Novagems</Text>
          <Text style={styles.projectDuration}>Jan 2021 - Jan 2021 • Full Time</Text>
          <TouchableOpacity style={styles.editProjectButton}>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Education</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.educationCard}>
          <Text style={styles.educationDegree}>B.Tech/B.E. Electronics/Telecommunication</Text>
          <Text style={styles.educationUniversity}>Punjab Technical University (PTU)</Text>
          <Text style={styles.educationYear}>2010-2014 • Full Time</Text>
          <TouchableOpacity style={styles.editEducationButton}>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.educationCard}>
          <Text style={styles.educationDegree}>Class XII</Text>
          <Text style={styles.educationUniversity}>Himachal Pradesh</Text>
          <Text style={styles.educationYear}>2010</Text>
          <TouchableOpacity style={styles.editEducationButton}>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Languages Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <TouchableOpacity>
            <Text style={styles.addLink}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.languageEditRow}>
          <Text style={styles.languageName}>English</Text>
          <Text style={styles.languageProficiency}>Read, Write, Speak</Text>
          <TouchableOpacity>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.languageEditRow}>
          <Text style={styles.languageName}>Hindi</Text>
          <Text style={styles.languageProficiency}>Read, Write, Speak</Text>
          <TouchableOpacity>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.languageEditRow}>
          <Text style={styles.languageName}>Punjabi</Text>
          <Text style={styles.languageProficiency}>Speak</Text>
          <TouchableOpacity>
            <Text style={styles.editJobIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.surface,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  saveButton: {
    color: Colors.primary,
    fontSize: 16,
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
  requiredLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    width: 100,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    paddingVertical: 8,
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
  uploadText: {
    fontSize: 12,
    color: Colors.primary,
  },
  textArea: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
  },
  wordCount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  skillText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  removeSkillIcon: {
    color: Colors.error,
    fontSize: 18,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  addSkillContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  addSkillInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  addSkillButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addSkillButtonText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  jobCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  jobHeader: {
    flexDirection: 'row',
    flex: 1,
  },
  jobIcon: {
    fontSize: 20,
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
  editJobButton: {
    padding: 8,
  },
  editJobIcon: {
    fontSize: 16,
  },
  projectCard: {
    marginBottom: 16,
    paddingBottom: 16,
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
  editProjectButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  educationCard: {
    marginBottom: 16,
    paddingBottom: 16,
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
  editEducationButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  languageEditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 40,
  },
});

