import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { Link, useRouter } from "expo-router";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignUp = async (provider?: "google" | "github") => {
    setError("");

    if (!provider) {


      if (!email || !password || !name) {
        setError("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!agreeTerms) {
        setError("You must agree to the Terms of Service");
        return;
      }

      try {
        await authClient.signUp.email({
          email,
          password,
          name,
        });

      } catch (error) {
        setError((error as unknown as any).message || "An error occurred during sign in");
        return;
      }
      router.replace("/");

    } else {
      // social login
      try {
        await authClient.signIn.social({
          provider,
          callbackURL: Platform.OS === "web" ? window.location.origin : "myapp://",
        });

      } catch (error) {
        setError((error as unknown as any).message || "An error occurred during sign in");
        return;
      }
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Please fill in the details below to create a new account.</Text>

        {/* Form */}
        <View style={styles.formContainer}>
          {error ? <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View> : null}

          <View style={styles.inputField}>
            <TextInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#666"
            />
            <FontAwesome5 name="user-alt" size={18} color="#7D7D5E" />
          </View>

          <View style={styles.inputField}>
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              inputMode="email"
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor="#666"
            />
            <Ionicons name="mail" size={20} color="#7D7D5E" />
          </View>

          <View style={styles.inputField}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry={!showPassword}
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#7D7D5E" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputField}>
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#7D7D5E" />
            </TouchableOpacity>
          </View>

          {/* Terms Checkbox */}
          <View style={styles.termsContainer}>
            <TouchableOpacity onPress={() => setAgreeTerms(!agreeTerms)} style={styles.checkbox}>
              {agreeTerms ? <Ionicons name="checkbox" size={24} color="#D4C000" /> : <View style={styles.checkboxUnchecked} />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={() => handleSignUp()}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={() => handleSignUp("google")}>
              <AntDesign name="google" size={24} color="black" style={{ marginRight: 10 }} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={() => handleSignUp("github")}>
              <AntDesign name="github" size={24} color="black" style={{ marginRight: 10 }} />
              <Text style={styles.socialButtonText}>GitHub</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity>
                <Text style={styles.loginText}>Log In</Text>
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
    backgroundColor: '#F9F9F5', // Slightly off-white/beige background from mockup
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  formContainer: {
    //
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F0',
    borderRadius: 25,
    height: 56,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginRight: 10,
  },
  // label: { // Not used in this version, but kept for ref
  //   fontSize: 16,
  //   fontWeight: '600',
  //   marginBottom: 8,
  // },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Top align text with checkbox
    marginBottom: 30,
    marginTop: 10,
    paddingHorizontal: 4,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxUnchecked: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 6,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#000', // Or a darker color
    textDecorationColor: '#D4C000',
    textDecorationStyle: 'solid',
  },
  signUpButton: {
    backgroundColor: '#FFEE00',
    borderRadius: 30,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#FFEE00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  signUpButtonText: {
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
    marginBottom: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: '#FFEE00',
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

