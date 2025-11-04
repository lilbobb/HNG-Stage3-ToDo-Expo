import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function NotFound() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Page Not Found
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20, textAlign: "center" }}>
        The page you're looking for doesn't exist.
      </Text>
      <Link href="/" style={{ padding: 12, backgroundColor: '#007AFF', borderRadius: 8 }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          Go back to Home
        </Text>
      </Link>
    </View>
  );
}
