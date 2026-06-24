import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function DataState({ loading, error, empty, onRetry, compact = false }) {
  if (!loading && !error && !empty) return null;

  const title = loading
    ? "Finding nearby places"
    : error
      ? "Something went wrong"
      : "No places found";
  const body = loading
    ? "NearLanka is checking the latest places around you."
    : error || "There are no matching places to show right now.";

  return (
    <View style={[styles.card, compact && styles.compactCard]}>
      {loading ? (
        <ActivityIndicator size="large" color="#B6D9D6" />
      ) : error ? (
        <MaterialCommunityIcons name="wifi-off" size={31} color="#B6D9D6" />
      ) : (
        <Ionicons name="search-outline" size={31} color="#B6D9D6" />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {!loading && onRetry ? (
        <Pressable style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 210,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    marginVertical: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#245F58",
    backgroundColor: "#102D2A",
  },
  compactCard: { minHeight: 150 },
  title: { marginTop: 16, color: "#F4F6F2", fontSize: 18, fontWeight: "700" },
  body: { marginTop: 8, color: "#B9C4BE", fontSize: 14, lineHeight: 20, textAlign: "center" },
  button: {
    height: 40,
    minWidth: 140,
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5B956",
  },
  buttonText: { color: "#123F3A", fontSize: 14, fontWeight: "800" },
});
