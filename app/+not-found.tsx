import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: '#FAFAFA' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>404</Text>
      <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>
        The page you're looking for doesn't exist.
      </Text>
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={{ 
          backgroundColor: '#ff6347', 
          paddingHorizontal: 20, 
          paddingVertical: 12, 
          borderRadius: 8,
          marginBottom: 10
        }}
      >
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => router.replace('/')} 
        style={{ 
          backgroundColor: '#007AFF', 
          paddingHorizontal: 20, 
          paddingVertical: 12, 
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}