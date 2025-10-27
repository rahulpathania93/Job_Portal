// src/screens/provider/PostJobForm.jsx
import { useContext, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import InputField from '../../components/ui/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { Colors } from '../../constants/colors';
import { AppContext } from '../../context/AppContext';

export default function PostJobForm({ navigation }) {
  const { postJob, user } = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(user?.name || '');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-time');
  const [skillsText, setSkillsText] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');

  function handlePost() {
    if (!title.trim() || !company.trim()) {
      Alert.alert('Validation', 'Please enter job title and company.');
      return;
    }

    const newJob = {
      title: title.trim(),
      company: company.trim(),
      location: location.trim() || 'Remote',
      type: type || 'Full-time',
      skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
      salary: salary.trim(),
      description: description.trim(),
      postedBy: user?.email || 'unknown',
      applicants: [],
    };

    postJob(newJob);

    Alert.alert('Posted', 'Job posted (mock).');
    navigation.navigate('ProviderJobs'); // go back to provider jobs list
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Post a Job</Text>
        <Text style={styles.subtitle}>Create a new job listing to attract candidates</Text>

        <InputField
          label="Job Title"
          placeholder="e.g. Senior React Developer"
          value={title}
          onChangeText={setTitle}
          leftIcon={<Text style={styles.inputIcon}>💼</Text>}
        />

        <InputField
          label="Company Name"
          placeholder="Your company name"
          value={company}
          onChangeText={setCompany}
          leftIcon={<Text style={styles.inputIcon}>🏢</Text>}
        />

        <InputField
          label="Location"
          placeholder="City, State or Remote"
          value={location}
          onChangeText={setLocation}
          leftIcon={<Text style={styles.inputIcon}>📍</Text>}
        />

        <InputField
          label="Job Type"
          placeholder="Full-time, Part-time, Contract"
          value={type}
          onChangeText={setType}
          leftIcon={<Text style={styles.inputIcon}>⏰</Text>}
        />

        <InputField
          label="Required Skills"
          placeholder="React, Node.js, CSS (comma separated)"
          value={skillsText}
          onChangeText={setSkillsText}
          leftIcon={<Text style={styles.inputIcon}>🛠️</Text>}
        />

        <InputField
          label="Salary Range"
          placeholder="e.g. ₹10L - ₹15L"
          value={salary}
          onChangeText={setSalary}
          leftIcon={<Text style={styles.inputIcon}>💰</Text>}
        />

        <InputField
          label="Job Description"
          placeholder="Describe the role, responsibilities, and requirements..."
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          leftIcon={<Text style={styles.inputIcon}>📝</Text>}
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton 
            title="Post Job" 
            onPress={handlePost}
            style={styles.postButton}
          />
          <PrimaryButton 
            title="Cancel" 
            onPress={() => navigation.goBack()}
            variant="outline"
            style={styles.cancelButton}
          />
        </View>
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
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
  },
  inputIcon: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  postButton: {
    width: '100%',
  },
  cancelButton: {
    width: '100%',
  },
});
