import React from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

const nearlankaLogo = require("../../assets/nearlanka-logo.png");

const APP_BG = "#0B1211";
const ACCENT_GOLD = "#D19F65";

export default function AppHeader({ onMenuPress }) {
  const colors = { background: APP_BG, border: "rgba(255,255,255,0.06)", text: "#C8D8D5", accent: ACCENT_GOLD };
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
});


