// src/screens/Auth/SignUp.jsx
import React, { useContext, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { AppContext } from '../../context/AppContext';

export default function SignUp({ navigation }) {
  const { role, signupMock, setUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function signUp() {
    const newUser = signupMock(email, password);
    if (!newUser) return;

    setUser({ ...newUser, role });

    if (role === 'provider') navigation.replace('ProviderJobs');
    else navigation.replace('JobList');
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Create account ({role || '...'})</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@company.com"
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 }}
      />

      <PrimaryButton title="Sign Up (mock)" onPress={signUp} />
    </View>
  );
}
