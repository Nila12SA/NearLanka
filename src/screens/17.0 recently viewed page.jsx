import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import StatusBar from "../components/ThemedStatusBar";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";
import { OptimizedImage } from "../components/OptimizedImage";

export default function RecentlyViewedPage({
  recentPlaces = [],
  onBack,
  onNavPress,
  onPlacePress,
}) {
  const palette = { bg: "#0B1211", card: "#123F3A", text: "#F4F6F2", muted: "#B9C4BE", border: "#245F58", accent: "#D19F65" };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.bg }]}>
      <StatusBar />
      <AppHeader
        onMenuPress={() => {}}
      />

      <View style={[styles.header, { borderBottomColor: palette.border }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          style={[styles.backButton, { borderColor: palette.border }]}
        >
          <Ionicons name="arrow-back" size={23} color={palette.text} />
        </Pressable>

        <View style={styles.headerText}>
          <Text style={[styles.title, { color: palette.text }]}>Recently Viewed</Text>
          <Text style={[styles.description, { color: palette.muted }]}>
            Places you have actually opened and viewed.
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {recentPlaces.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <Ionicons name="time-outline" size={34} color={palette.accent} />
            <Text style={[styles.emptyTitle, { color: palette.text }]}>No recently viewed places</Text>
            <Text style={[styles.emptyText, { color: palette.muted }]}>
              Open a hotel, nature spot, or historical place to see it here.
            </Text>
          </View>
        ) : (
          recentPlaces.map((place) => (
            <Pressable
              key={place.id || place.title || place.name}
              onPress={() => onPlacePress?.(place)}
              style={[styles.placeCard, { backgroundColor: palette.card, borderColor: palette.border }]}
            >
              {place.image ? <OptimizedImage source={place.image} style={styles.image} /> : null}
              <View style={styles.placeContent}>
                <Text style={[styles.placeTitle, { color: palette.text }]}>{place.title || place.name}</Text>
                <Text style={[styles.placeMeta, { color: palette.muted }]}>{place.location || place.distance}</Text>
                <Text style={[styles.viewedTime, { color: palette.accent }]}>{formatViewedAt(place.viewedAt)}</Text>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function formatViewedAt(value) {
  if (!value) return "Recently viewed";
  const minutes = Math.max(1, Math.round((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { minHeight: 88, flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingVertical: 12, borderBottomWidth: 1 },
  backButton: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerText: { flex: 1, marginLeft: 14 },
  title: { fontSize: 23, lineHeight: 29, fontWeight: "800" },
  description: { marginTop: 3, fontSize: 13, lineHeight: 18 },
  scrollView: { flex: 1 },
  content: { padding: 20, paddingBottom: 110 },
  emptyCard: { minHeight: 190, padding: 24, borderRadius: 18, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  emptyTitle: { marginTop: 14, fontSize: 18, fontWeight: "800", textAlign: "center" },
  emptyText: { marginTop: 8, fontSize: 14, lineHeight: 21, textAlign: "center" },
  placeCard: { minHeight: 116, marginBottom: 14, flexDirection: "row", overflow: "hidden", borderRadius: 17, borderWidth: 1 },
  image: { width: 112, height: "100%" },
  placeContent: { flex: 1, padding: 14, justifyContent: "center" },
  placeTitle: { fontSize: 17, lineHeight: 22, fontWeight: "800" },
  placeMeta: { marginTop: 5, fontSize: 13, lineHeight: 18 },
  viewedTime: { marginTop: 8, fontSize: 12, lineHeight: 16, fontWeight: "800" },
});




