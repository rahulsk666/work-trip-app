import GoogleSignInButton from "@/components/social-auth-buttons/google-sign-in-button";
import { supabase } from "@/integrations/supabase/supabase";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <LinearGradient colors={["#0b1722", "#0e2235"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoBox}>
            <Ionicons name="car-outline" size={32} color="#1e90ff" />
          </View>

          <Text style={styles.title}>TripTrack Pro</Text>
          <Text style={styles.subtitle}>Work & Trip Tracker</Text>
        </View>

        {/* Username */}
        <Text style={styles.label}>Username or Corporate ID</Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="badge" size={20} color="#7b8ca3" />
          <TextInput
            placeholder="Enter your ID"
            placeholderTextColor="#7b8ca3"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={styles.input}
          />
        </View>

        {/* Password */}
        <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#7b8ca3" />
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#7b8ca3"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!passwordVisible}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#7b8ca3"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot */}
        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login */}
        <TouchableOpacity
          style={styles.loginButton}
          disabled={loading}
          onPress={() => signInWithEmail()}
        >
          <Text style={styles.loginText}>Secure Login</Text>
        </TouchableOpacity>

        {/* Social Login */}
        <View style={styles.googleButton}>
          <GoogleSignInButton />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Need help? Contact IT Support</Text>
          <Text style={styles.footerSub}>🔒 Secured by Enterprise IT</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    paddingHorizontal: 24,
    maxWidth: 480,
    minWidth: 300,
    marginHorizontal: "auto",
  },

  logoWrapper: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#0f2a45",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#9fb3c8",
    marginTop: 6,
  },

  label: {
    color: "#cdd6e3",
    marginBottom: 8,
    fontSize: 14,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16283d",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 54,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#ffffff",
  },

  forgotWrapper: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  forgot: {
    color: "#4aa3ff",
  },

  loginButton: {
    backgroundColor: "#1e90ff",
    borderRadius: 14,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  loginText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  faceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2a3e55",
    borderRadius: 14,
    height: 54,
    marginTop: 16,
  },
  faceText: {
    color: "#cdd6e3",
    marginLeft: 8,
  },
  googleButton: {
    marginTop: 16,
    borderRadius: 14,
    overflow: "hidden",
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingBottom: 24,
  },
  footerText: {
    color: "#8fa3b8",
  },
  footerSub: {
    color: "#6f8398",
    marginTop: 6,
    fontSize: 12,
  },
});
