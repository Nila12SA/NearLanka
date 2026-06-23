import React from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

const navLoginIcon = require("../../assets/nav-login.png");

const APP_BG = "#0B1211";
const ACCENT_GOLD = "#D19F65";
const SOFT_TEAL = "#B6D9D6";

export default function AppHeader({ onMenuPress, onProfilePress }) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.menuIcon} onPress={onMenuPress} hitSlop={10}>
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
      </Pressable>

      <Text style={styles.logoText}>NearLanka</Text>

      <Pressable style={styles.loginLogoButton} onPress={onProfilePress}>
        <Image
          source={navLoginIcon}
          style={styles.loginLogoIcon}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    backgroundColor: APP_BG,
  },

  menuIcon: {
    width: 22,
    height: 18,
    justifyContent: "space-between",
  },

  menuLine: {
    width: 20,
    height: 2,
    borderRadius: 1,
    backgroundColor: SOFT_TEAL,
  },

  logoText: {
    marginLeft: 16,
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