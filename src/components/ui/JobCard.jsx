// src/components/ui/JobCard.jsx
import { Text, TouchableOpacity, View } from 'react-native';

export default function JobCard({ job, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={{
      backgroundColor: '#fff',
      padding: 14,
      borderRadius: 10,
      marginBottom: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    }}>
      <Text style={{ fontSize: 16, fontWeight: '700' }}>{job.title}</Text>
      <Text style={{ color: '#6b7280', marginTop: 4 }}>{job.company} • {job.location}</Text>
      <Text style={{ marginTop: 8, color: '#374151' }} numberOfLines={2}>{job.description}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        <Text style={{ color: '#6b7280' }}>{job.salary}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 12, color: '#6b7280' }}>{job.type}</Text>
          <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}>
            <Text>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
