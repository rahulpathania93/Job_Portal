// src/screens/seeker/JobList.jsx
import { useContext } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import JobCard from '../../components/ui/JobCard';
import { AppContext } from '../../context/AppContext';

export default function JobList({ navigation }) {
  const { jobs } = useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 8 }}>Jobs for you</Text>
        <Text style={{ color: '#6b7280', marginBottom: 12 }}>Explore latest jobs matching your profile</Text>

        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard job={item} onPress={() => navigation.navigate('JobDetail', { jobId: item.id })} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
