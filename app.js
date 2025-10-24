// App.js
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>Hello Rahul 👋</Text>
      <Text style={{ marginTop: 8, color: '#555' }}>
        Your React Native + Expo setup is ready!
      </Text>
    </View>
  );
}
