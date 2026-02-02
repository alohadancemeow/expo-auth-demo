import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.replace("/(auth)/sign-in");
  };

  if (isPending) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome Home</Text>
      </View>

      <View style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            {/* Placeholder Avatar or User Image */}
            <Image
              source={{ uri: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name?.slice(0, 2) || 'UN'}&background=FDBA74&color=fff&size=128` }}
              style={styles.avatar}
            />
            {/* Overwrite with a nice illustration style if we had one, but using simple avatar for now */}
            {/* Green Check Badge */}
            <View style={styles.badge}>
              <Ionicons name="checkmark-circle" size={28} color="#22C55E" style={{ backgroundColor: 'white', borderRadius: 14 }} />
            </View>
          </View>

          <Text style={styles.welcomeBack}>Welcome Back!</Text>
          <Text style={styles.username}>@{session?.user?.name || session?.user?.email?.split('@')[0] || 'username'}</Text>
        </View>

        {/* Status Pill */}
        <View style={styles.statusPill}>
          <FontAwesome5 name="lock" size={14} color="#666" style={{ marginRight: 8 }} />
          <Text style={styles.statusText}>You are securely logged in.</Text>
        </View>

        <View style={{ flex: 1 }} />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <SimpleLineIcons name="logout" size={18} color="black" style={{ marginRight: 10 }} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F5', // Matching light/beige bg
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginVertical: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 60, // Push content down a bit
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 24,
    shadowColor: '#F59E0B', // Orange shadow/glow for the ring effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#FDBA74', // Fallback color
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 14,
    backgroundColor: 'white', // White border/bg for correct icon look
    padding: 2,
    elevation: 2,
  },
  welcomeBack: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    color: '#888',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statusText: {
    color: '#444',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FFEE00',
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFEE00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

