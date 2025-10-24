// src/screens/provider/PostJobForm.jsx
import { useContext, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Post a Job</Text>

        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Title</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="e.g. Senior React Developer" style={inputStyle} />

        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Company</Text>
        <TextInput value={company} onChangeText={setCompany} placeholder="Company name" style={inputStyle} />

        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Location</Text>
        <TextInput value={location} onChangeText={setLocation} placeholder="City / Remote" style={inputStyle} />

        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Type</Text>
        <TextInput value={type} onChangeText={setType} placeholder="Full-time / Contract" style={inputStyle} />

        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Skills (comma separated)</Text>
        <TextInput value={skillsText} onChangeText={setSkillsText} placeholder="React, Node, CSS" style={inputStyle} />

        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Salary</Text>
        <TextInput value={salary} onChangeText={setSalary} placeholder="e.g. ₹10L - ₹15L" style={inputStyle} />

        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Description</Text>
        <TextInput value={description} onChangeText={setDescription} placeholder="Job description" multiline style={{ ...inputStyle, minHeight: 100 }} />

        <View style={{ marginTop: 12 }}>
          <PrimaryButton title="Post Job" onPress={handlePost} />
        </View>

        <View style={{ marginTop: 12 }}>
          <PrimaryButton title="Cancel" onPress={() => navigation.goBack()} style={{ backgroundColor: '#6b7280' }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: '#e5e7eb',
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
};
