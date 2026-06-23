import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const APP_BG = "#0B1211";
const TEXT = "#F4F6F2";
const MUTED = "#B9C4BE";
const GOLD = "#D19F65";
const FIELD_BG = "rgba(79, 129, 120, 0.18)";
const BORDER = "rgba(182, 217, 214, 0.22)";

export default function LoginPage({
  onSignIn,
  onSignUp,
  onGooglePress,
  onApplePress,
  onForgotPassword,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    onSignIn?.({ username, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.brandBlock}>
            <Text style={styles.brandTitle}>NearLanka</Text>
            <Text style={styles.brandSubtitle}>Explore places near you</Text>
          </View>

          <View style={styles.cardWrapper}>
            <View style={styles.glowOne} />
            <View style={styles.glowTwo} />

            <LinearGradient
              colors={[
                "rgba(18, 63, 58, 0.98)",
                "rgba(11, 34, 31, 0.98)",
                "rgba(8, 24, 22, 0.98)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              
              <Text style={styles.title}>Login</Text>

              <Text style={styles.subtitle}>
                Sign in to continue exploring nearby places in Sri Lanka.
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Username</Text>

                <View style={styles.inputWrap}>
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter username"
                    placeholderTextColor="rgba(185,196,190,0.48)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    selectionColor={GOLD}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <View style={styles.passwordRow}>
                  <Text style={styles.inputLabel}>Password</Text>

                  <Pressable onPress={onForgotPassword}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </Pressable>
                </View>

                <View style={styles.inputWrap}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    placeholderTextColor="rgba(185,196,190,0.48)"
                    secureTextEntry
                    style={styles.input}
                    selectionColor={GOLD}
                  />
                </View>
              </View>

              <Pressable style={styles.signInButton} onPress={handleSignIn}>
                <Text style={styles.signInText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={20} color="#102320" />
              </Pressable>

              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
              </View>

              <Pressable style={styles.socialButton} onPress={onGooglePress}>
                <MaterialCommunityIcons
                  name="google"
                  size={22}
                  color="#4285F4"
                />
                <Text style={styles.socialText}>Continue with Google</Text>
              </Pressable>

              <Pressable style={styles.socialButton} onPress={onApplePress}>
                <Ionicons name="logo-apple" size={23} color={TEXT} />
                <Text style={styles.socialText}>Continue with Apple</Text>
              </Pressable>

              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Don&apos;t have an account?</Text>

                <Pressable onPress={onSignUp}>
                  <Text style={styles.signupLink}> Sign Up</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: APP_BG,
  },

  keyboardView: {
    flex: 1,
    backgroundColor: APP_BG,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 58,
    paddingBottom: 28,
    justifyContent: "center",
  },

  brandBlock: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: -30,
  },

  brandTitle: {
    color: TEXT,
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  brandSubtitle: {
    marginTop: 5,
    color: GOLD,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  cardWrapper: {
    position: "relative",
  },

  glowOne: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    height: 260,
    borderRadius: 140,
    backgroundColor: "rgba(209, 159, 101, 0.16)",
    transform: [{ scaleX: 1.08 }],
  },

  glowTwo: {
    position: "absolute",
    top: 90,
    left: 45,
    right: 45,
    height: 250,
    borderRadius: 130,
    backgroundColor: "rgba(182, 217, 214, 0.08)",
  },

  card: {
    borderRadius: 26,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
  },

  loginIcon: {
    alignSelf: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(209,159,101,0.42)",
    backgroundColor: "rgba(209,159,101,0.1)",
  },

  title: {
    color: TEXT,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },

  formGroup: {
    marginTop: 19,
  },

  inputLabel: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  forgotText: {
    color: GOLD,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
  },

  inputWrap: {
    height: 49,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(182,217,214,0.25)",
    backgroundColor: FIELD_BG,
  },

  input: {
    flex: 1,
    color: TEXT,
    fontSize: 14,
    lineHeight: 20,
  },

  signInButton: {
    height: 51,
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: GOLD,
  },

  signInText: {
    marginRight: 8,
    color: "#102320",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },

  dividerRow: {
    marginTop: 23,
    marginBottom: 17,
    flexDirection: "row",
    alignItems: "center",
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.13)",
  },

  dividerText: {
    marginHorizontal: 13,
    color: "rgba(185,196,190,0.68)",
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "800",
  },

  socialButton: {
    height: 50,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(182,217,214,0.2)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  socialText: {
    marginLeft: 10,
    color: TEXT,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },

  signupRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  signupText: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
  },

  signupLink: {
    color: GOLD,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "900",
  },
});