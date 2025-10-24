// src/screens/Auth/SignIn.jsx
import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { AppContext } from '../../context/AppContext';

export default function SignIn({ navigation, route }) {
  const { role: ctxRole, setRole, loginMock, setUser } = useContext(AppContext);
  const routeRole = route?.params?.role;
  const activeRole = ctxRole || routeRole || 'seeker';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function signIn() {
    const userObj = loginMock(email, password);
    if (!userObj) return;
    // ensure context role stored
    setRole(userObj.role || activeRole);
    setUser(userObj);
    // go to HomePlaceholder so user sees the post-login menu
    navigation.replace('HomePlaceholder');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Sign in as {activeRole}</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="you@company.com" style={{ borderWidth: 1, borderColor: '#eee', padding: 12, borderRadius: 8, marginBottom: 12 }} keyboardType="email-address" autoCapitalize="none" />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={{ borderWidth: 1, borderColor: '#eee', padding: 12, borderRadius: 8, marginBottom: 12 }} />
        <PrimaryButton title="Sign In (mock)" onPress={signIn} />
        <Text style={{ textAlign: 'center', color: '#9ca3af', marginVertical: 12 }}>or sign in with</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity onPress={() => alert('Google (UI only)')} style={{ flex: 1, padding: 12, borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 8, alignItems: 'center' }}><Text>Google</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => alert('LinkedIn (UI only)')} style={{ flex: 1, padding: 12, borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 8, alignItems: 'center' }}><Text>LinkedIn</Text></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 18, alignSelf: 'center' }}>
          <Text style={{ color: '#2563eb' }}>Create an account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
