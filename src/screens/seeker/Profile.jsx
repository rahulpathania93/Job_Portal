// src/screens/seeker/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { AppContext } from '../../context/AppContext';

function RowLabel({ children }) {
  return <Text style={{ marginBottom: 6, fontWeight: '600' }}>{children}</Text>;
}

export default function Profile({ navigation }) {
  const { profile, setProfile, user } = useContext(AppContext);

  // local form state (initialize from context profile if present)
  const [editing, setEditing] = useState(!profile); // if no profile -> open in edit mode
  const [name, setName] = useState(profile?.name ?? user?.name ?? '');
  const [title, setTitle] = useState(profile?.title ?? '');
  const [location, setLocation] = useState(profile?.location ?? '');
  const [experience, setExperience] = useState(profile?.experience ?? '');
  const [skillsText, setSkillsText] = useState(profile ? (profile.skills || []).join(', ') : '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [summary, setSummary] = useState(profile?.summary ?? '');

  // if profile changes externally, update form fields
  useEffect(() => {
    if (profile) {
      setName(profile.name || user?.name || '');
      setTitle(profile.title || '');
      setLocation(profile.location || '');
      setExperience(profile.experience || '');
      setSkillsText((profile.skills || []).join(', '));
      setPhone(profile.phone || '');
      setSummary(profile.summary || '');
      setEditing(false);
    }
    // Include user?.name because the effect uses it above.
  }, [profile, user?.name]);

  function handleSave() {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter your name.');
      return;
    }
    const profileObj = {
      name: name.trim(),
      title: title.trim(),
      location: location.trim(),
      experience: experience.trim(),
      skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
      phone: phone.trim(),
      summary: summary.trim(),
    };
    setProfile(profileObj);
    setEditing(false);
    Alert.alert('Saved', 'Your profile has been saved.');
  }

  function handleEdit() {
    setEditing(true);
  }

  function handleClear() {
    setProfile(null);
    setEditing(true);
    setName(user?.name ?? '');
    setTitle('');
    setLocation('');
    setExperience('');
    setSkillsText('');
    setPhone('');
    setSummary('');
  }

  // View mode
  if (!editing && profile) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={{ padding: 18 }}>
          <Text style={{ fontSize: 22, fontWeight: '700' }}>{profile.name}</Text>
          <Text style={{ marginTop: 6, color: '#6b7280' }}>{profile.title} • {profile.location}</Text>
          <Text style={{ marginTop: 10, color: '#374151' }}>{profile.summary}</Text>

          <View style={{ marginTop: 14 }}>
            <Text style={{ fontWeight: '700' }}>Experience</Text>
            <Text style={{ marginTop: 6 }}>{profile.experience || '—'}</Text>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: '700' }}>Skills</Text>
            <Text style={{ marginTop: 6 }}>{(profile.skills || []).join(', ') || '—'}</Text>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: '700' }}>Phone</Text>
            <Text style={{ marginTop: 6 }}>{profile.phone || '—'}</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <PrimaryButton title="Edit Profile" onPress={handleEdit} />
          </View>

          <View style={{ marginTop: 12 }}>
            <PrimaryButton title="Clear Profile" onPress={handleClear} style={{ backgroundColor: '#ef4444' }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Edit mode (form)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>{profile ? 'Edit your profile' : 'Create your profile'}</Text>

        <RowLabel>Name</RowLabel>
        <TextInput value={name} onChangeText={setName} placeholder="Full name" style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 12 }} />

        <RowLabel>Title</RowLabel>
        <TextInput value={title} onChangeText={setTitle} placeholder="e.g. Frontend Developer" style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 12 }} />

        <RowLabel>Location</RowLabel>
        <TextInput value={location} onChangeText={setLocation} placeholder="City / Remote" style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 12 }} />

        <RowLabel>Experience</RowLabel>
        <TextInput value={experience} onChangeText={setExperience} placeholder="e.g. 2 yrs" style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 12 }} />

        <RowLabel>Skills (comma separated)</RowLabel>
        <TextInput value={skillsText} onChangeText={setSkillsText} placeholder="React, React Native, CSS" style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 12 }} />

        <RowLabel>Phone</RowLabel>
        <TextInput value={phone} onChangeText={setPhone} placeholder="Optional" keyboardType="phone-pad" style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, marginBottom: 12 }} />

        <RowLabel>Summary</RowLabel>
        <TextInput value={summary} onChangeText={setSummary} placeholder="Short about you" multiline style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8, minHeight: 80, marginBottom: 12 }} />

        <PrimaryButton title="Save Profile" onPress={handleSave} />
        <View style={{ marginTop: 12 }}>
          <PrimaryButton title="Cancel" onPress={() => setEditing(false)} style={{ backgroundColor: '#6b7280' }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
