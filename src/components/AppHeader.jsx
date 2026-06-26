import React from "react";
import { OptimizedImage } from "./OptimizedImage";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { createThemedStyles, getCurrentThemeMode } from "../theme/runtimeTheme";

const navLoginIcon = require("../../assets/nav-login.png");
const nearlankaLogo = require("../../assets/nearlanka-logo.png");

const APP_BG = "#0B1211";
const ACCENT_GOLD = "#D19F65";
const SOFT_TEAL = "#B6D9D6";

export default function AppHeader({ onMenuPress, onProfilePress, themeMode }) {
  const light = (themeMode || getCurrentThemeMode()) === "Light";
  const colors = light
    ? { background: "#F3F6F2", border: "#C9D8D4", text: "#17322F", accent: "#245F58", icon: "#FFFFFF", profileBg: "#FFFFFF" }
    : { background: APP_BG, border: "rgba(255,255,255,0.06)", text: "#C8D8D5", accent: ACCENT_GOLD, icon: "#0B1211", profileBg: "rgba(255,255,255,0.04)" };
  return (
    <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="NearLanka navigation"
        style={[styles.brandMark, { shadowColor: colors.accent }]}
        onPress={onMenuPress}
        hitSlop={10}
      >
        <Image source={nearlankaLogo} style={styles.brandLogo} resizeMode="contain" />
      </Pressable>

      <Text style={[styles.logoText, { color: colors.text }]}>NearLanka</Text>

      <Pressable style={[styles.loginLogoButton, { borderColor: colors.accent, backgroundColor: colors.profileBg }]} onPress={onProfilePress}>
        <OptimizedImage
          source={navLoginIcon}
          style={[styles.loginLogoIcon, light && styles.lightLoginIcon]}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = createThemedStyles({
  header: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    backgroundColor: APP_BG,
  },

  brandMark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT_GOLD,
    shadowColor: ACCENT_GOLD,
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  brandLogo: {
    width: 22,
    height: 28,
  },

  logoText: {
    marginLeft: 12,
    flex: 1,
    color: "#C8D8D5",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 27,
    lineHeight: 34,
  },

  loginLogoButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: ACCENT_GOLD,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  loginLogoIcon: {
    width: 22,
    height: 22,
  },
});


