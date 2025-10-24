// src/screens/RoleSelect.jsx
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { AppContext } from '../context/AppContext';

export default function RoleSelect({ navigation }) {
  const { setRole } = useContext(AppContext);

  function choose(r) {
    setRole(r);
    navigation.navigate('SignIn'); // navigate to SignIn after setting role
  }

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
      <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 20 }}>I am a</Text>

      <PrimaryButton title="Job Seeker" onPress={() => choose('seeker')} style={{ width: '100%', marginBottom: 12 }} />
      <PrimaryButton title="Job Provider" onPress={() => choose('provider')} style={{ width: '100%' }} />
    </View>
  );
}
