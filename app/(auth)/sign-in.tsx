import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { Link, useRouter } from "expo-router";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await authClient.signIn.email({
        email,
        password,
      });

      router.replace("/");
    } catch (error) {
      setError((error as unknown as any).message || "An error occurred during sign in");
    }
  };

  // social login 
  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      const res = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
      console.log("Social sign in response:", res);
    } catch (err) {
      console.error("Social login error:", err);
      setError("Failed to initiate social login");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Icon */}
        <View style={styles.headerIconContainer}>
          <View style={styles.yellowCircle}>
            <FontAwesome5 name="lock" size={24} color="black" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Let's sign you in.</Text>
        <Text style={styles.subtitle}>Welcome back, you've been missed!</Text>

        {/* Form */}
        <View style={styles.formContainer}>
          {error ?
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
            : null
          }
          <Text style={styles.label}>Email address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              inputMode="email"
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={() => handleLogin()}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("google")}>
              <AntDesign name="google" size={24} color="black" style={{ marginRight: 10 }} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("github")}>
              <AntDesign name="github" size={24} color="black" style={{ marginRight: 10 }} />
              <Text style={styles.socialButtonText}>GitHub</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/(auth)/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Or a very light off-white if checking the image closely
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerIconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  yellowCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFEE00', // Bright yellow
    alignItems: 'center',
    justifyContent: 'center',
    // Add subtle shadow/glow if needed
    shadowColor: '#FFEE00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'left', // Or center? Image shows left aligned title actually? No, looks center or slight left vs form. Let's stick to left for "Header" usually, but image shows centered icon, then text left aligned? 
    // Looking at the image again: Icon is centered. Text "Let's sign you in" is left aligned (or maybe just long enough). "Welcome back" is left.
    // Wait, the image shows "Let's sign you in." aligned left relative to the text block, but the whole block seems centered? 
    // Actually, looking at margins, it seems Left Aligned.
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'left',
  },
  formContainer: {
    //
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25, // Pill shape
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#666',
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#FFEE00',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#FFEE00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#888',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  socialButton: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    height: 50,
    backgroundColor: '#fff',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  signUpText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFCCCC',
  },
  errorText: {
    color: '#D8000C',
    fontSize: 14,
    textAlign: 'center',
  },
});

