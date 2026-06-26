import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/ThemedStatusBar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { createThemedStyles } from "../theme/runtimeTheme";

const DARK = { bg: "#0B1211", card: "#123F3A", text: "#F4F6F2", muted: "#B9C4BE", gold: "#D19F65", border: "rgba(182,217,214,0.22)" };

export default function LoginPage({
  onSignIn,
  onSignUp,
  onGooglePress,
  onApplePress,
  onForgotPassword,
  onFavoritesPress,
  onRecentPress,
  onBack,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const updateUsername = (value) => { setUsername(value); setError(""); };
  const updatePassword = (value) => { setPassword(value); setError(""); };

  const handleSignIn = () => {
    const name = username.trim();
    const validPassword = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    if (name.length < 3) return setError("Username must contain at least 3 characters.");
    if (!validPassword) return setError("Password needs 8+ characters, uppercase, lowercase, and a number.");
    onSignIn?.({ username: name, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={DARK.bg} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Pressable accessibilityLabel="Go back" hitSlop={12} onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={DARK.text} />
        </Pressable>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
          <Text style={styles.brand}>NearLanka</Text>
          <Text style={styles.brandSubtitle}>EXPLORE PLACES NEAR YOU</Text>
          <LinearGradient colors={["#123F3A", "#0B221F", "#081816"]} style={styles.card}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Sign in to continue exploring Sri Lanka.</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput value={username} onChangeText={updateUsername} placeholder="Enter username" placeholderTextColor="#71827D" autoCapitalize="words" style={styles.input} />

            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Password</Text>
              <Pressable onPress={onForgotPassword}><Text style={styles.link}>Forgot Password?</Text></Pressable>
            </View>
            <View style={styles.passwordField}>
              <TextInput value={password} onChangeText={updatePassword} placeholder="Enter password" placeholderTextColor="#71827D" secureTextEntry={!showPassword} style={styles.passwordInput} />
              <Pressable onPress={() => setShowPassword((value) => !value)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={21} color={DARK.muted} />
              </Pressable>
            </View>
            <Text style={styles.hint}>8+ characters with uppercase, lowercase, and a number.</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable style={styles.primaryButton} onPress={handleSignIn}>
              <Text style={styles.primaryText}>Sign In</Text>
              <Ionicons name="arrow-forward" size={19} color="#102320" />
            </Pressable>

            <View style={styles.dividerRow}><View style={styles.divider} /><Text style={styles.or}>OR</Text><View style={styles.divider} /></View>
            <Pressable style={styles.socialButton} onPress={onGooglePress}>
              <MaterialCommunityIcons name="google" size={22} color="#4285F4" />
              <Text style={styles.socialText}>Continue with Google</Text>
            </Pressable>
            <Pressable style={styles.socialButton} onPress={onApplePress}>
              <Ionicons name="logo-apple" size={23} color={DARK.text} />
              <Text style={styles.socialText}>Continue with Apple</Text>
            </Pressable>

            <View style={styles.signupRow}>
              <Text style={styles.muted}>Don't have an account?</Text>
              <Pressable onPress={onSignUp}><Text style={styles.link}> Sign Up</Text></Pressable>
            </View>

            <View style={styles.quickRow}>
              <Pressable style={styles.quickButton} onPress={onFavoritesPress}><Ionicons name="heart-outline" size={18} color={DARK.gold} /><Text style={styles.quickText}>My Favorites</Text></Pressable>
              <Pressable style={styles.quickButton} onPress={onRecentPress}><Ionicons name="time-outline" size={18} color={DARK.gold} /><Text style={styles.quickText}>Recent</Text></Pressable>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = createThemedStyles({
  safeArea: { flex: 1, backgroundColor: DARK.bg }, flex: { flex: 1 },
  backButton: { position: "absolute", top: 18, left: 20, zIndex: 5, width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: DARK.border, backgroundColor: "#123F3A" },
  scrollContent: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 24, paddingTop: 70, paddingBottom: 30 },
  brand: { color: DARK.text, textAlign: "center", fontSize: 32, fontWeight: "900" },
  brandSubtitle: { marginTop: 5, marginBottom: 24, color: DARK.gold, textAlign: "center", fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  card: { borderRadius: 26, borderWidth: 1, borderColor: DARK.border, padding: 22 },
  title: { color: DARK.text, textAlign: "center", fontSize: 27, fontWeight: "900" },
  subtitle: { marginTop: 7, marginBottom: 18, color: DARK.muted, textAlign: "center", fontSize: 13 },
  label: { marginTop: 12, marginBottom: 8, color: DARK.muted, fontSize: 13, fontWeight: "700" },
  input: { height: 49, borderRadius: 14, borderWidth: 1, borderColor: DARK.border, paddingHorizontal: 15, color: DARK.text, backgroundColor: "rgba(79,129,120,0.18)" },
  passwordHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  passwordField: { height: 49, flexDirection: "row", alignItems: "center", borderRadius: 14, borderWidth: 1, borderColor: DARK.border, paddingHorizontal: 15, backgroundColor: "rgba(79,129,120,0.18)" },
  passwordInput: { flex: 1, color: DARK.text }, hint: { marginTop: 7, color: "#84938F", fontSize: 11 },
  error: { marginTop: 10, color: "#FF9A91", fontSize: 12, lineHeight: 17, textAlign: "center" },
  primaryButton: { height: 51, marginTop: 22, flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center", borderRadius: 14, backgroundColor: DARK.gold },
  primaryText: { color: "#102320", fontSize: 15, fontWeight: "900" },
  dividerRow: { marginVertical: 18, flexDirection: "row", alignItems: "center" }, divider: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.13)" }, or: { marginHorizontal: 12, color: DARK.muted, fontSize: 10 },
  socialButton: { height: 48, marginBottom: 10, flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", borderRadius: 14, borderWidth: 1, borderColor: DARK.border, backgroundColor: "rgba(255,255,255,0.05)" },
  socialText: { color: DARK.text, fontSize: 14, fontWeight: "700" }, signupRow: { marginTop: 8, flexDirection: "row", justifyContent: "center" }, muted: { color: DARK.muted, fontSize: 13 }, link: { color: DARK.gold, fontSize: 13, fontWeight: "800" },
  quickRow: { marginTop: 18, flexDirection: "row", gap: 10 }, quickButton: { flex: 1, height: 42, flexDirection: "row", gap: 7, alignItems: "center", justifyContent: "center", borderRadius: 12, borderWidth: 1, borderColor: DARK.border }, quickText: { color: DARK.text, fontSize: 12, fontWeight: "700" },
});


