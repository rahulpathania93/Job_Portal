// src/components/ui/PrimaryButton.jsx
import { Text, TouchableOpacity } from 'react-native';

export default function PrimaryButton({ title, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[{ backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' }, style]}>
      <Text style={{ color: '#fff', fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );
}
