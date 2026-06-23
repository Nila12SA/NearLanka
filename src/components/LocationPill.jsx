import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ACCENT_GOLD = "#D19F65";
const MUTED_TEXT = "#B9C4BE";

export default function LocationPill({
  text = "Using current location",
  iconName = "navigate",
  style,
}) {
  return (
    <View style={[styles.pill, style]}>
      <Ionicons name={iconName} size={15} color={ACCENT_GOLD} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  text: {
    marginLeft: 7,
    color: MUTED_TEXT,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
});
