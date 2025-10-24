// src/components/ui/InputField.jsx
import { Text, TextInput, View } from 'react-native';

export default function InputField({ label, value, onChangeText, placeholder, secure }) {
  return (
    <View style={{ marginBottom: 12 }}>
      {label ? <Text style={{ marginBottom: 6, fontWeight: '600' }}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        style={{
          borderWidth: 1,
          borderColor: '#e5e7eb',
          padding: 12,
          borderRadius: 8,
          backgroundColor: '#fff'
        }}
        autoCapitalize="none"
      />
    </View>
  );
}
