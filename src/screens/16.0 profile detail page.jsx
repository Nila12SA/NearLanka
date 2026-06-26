import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/ThemedStatusBar";
import { Ionicons } from "@expo/vector-icons";
import { OptimizedImage } from "../components/OptimizedImage";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";
import { createThemedStyles } from "../theme/runtimeTheme";

const content = {
  about: { title: "About NearLanka", icon: "information-circle-outline", paragraphs: ["NearLanka is a local Sri Lankan travel guide that helps people discover hotels, nature spots, and historical places near their current location.", "The app includes saved favorites, real recently viewed history, maps, ratings, opening information, and local travel details.", "Version 1.0.0 • Mobile Application Development Assignment"] },
  help: { title: "Help & Support", icon: "help-circle-outline", paragraphs: ["Finding places: enable location access, then use Home, Explore, or Map.", "Saving a place: tap the heart icon on any place card. Open My Favorites from Profile or Login.", "Recently viewed: open a place's detail page. NearLanka records only places you actually viewed.", "If place data does not load, confirm the NearLanka backend is running and your phone is on the same network."] },
  monitoring: { title: "Experience Monitoring", icon: "pulse-outline", paragraphs: ["NearLanka displays loading, empty, offline, and retry states so problems are clear to the user.", "No private location history is uploaded by this settings page. Location is used to calculate nearby results."] },
};

const pageDescriptions = {
  recent: "Places you have actually opened and viewed.",
  location: "Control how NearLanka uses your device location.",
  theme: "Choose how your profile and settings appear.",
  about: "Learn more about NearLanka.",
  help: "Find answers and guidance for using the app.",
};
export default function ProfileDetailPage({ type, onBack, onNavPress, themeMode, onThemeChange, hasLocationPermission, onLocationChange, recentPlaces = [], onPlacePress }) {
  const light = themeMode === "Light";
  const palette = light ? { bg: "#F3F6F2", card: "#FFFFFF", text: "#17322F", muted: "#60736F", border: "#C9D8D4", accent: "#245F58", switchOff: "#B6C5C1", switchThumbOff: "#F7FAF8", buttonText: "#FFFFFF" } : { bg: "#0B1211", card: "#123F3A", text: "#F4F6F2", muted: "#B9C4BE", border: "#245F58", accent: "#D19F65", switchOff: "#4A5C58", switchThumbOff: "#DCE5E2", buttonText: "#102320" };
  const page = content[type];
  const title = type === "theme" ? "Theme Mode" : type === "location" ? "Location Settings" : type === "recent" ? "Recently Viewed" : page?.title;

  return <SafeAreaView style={[styles.safe, { backgroundColor: palette.bg }]}><StatusBar style={light ? "dark" : "light"} /><AppHeader onMenuPress={() => {}} onProfilePress={() => onNavPress?.("Profile")} themeMode={themeMode} /><View style={styles.header}><Pressable onPress={onBack} style={[styles.back, { borderColor: palette.border }]}><Ionicons name="arrow-back" size={23} color={palette.text} /></Pressable><View style={styles.headerCopy}><Text style={[styles.headerTitle, { color: palette.text }]}>{title}</Text>{pageDescriptions[type] ? <Text style={[styles.headerDescription, { color: palette.muted }]}>{pageDescriptions[type]}</Text> : null}</View></View><ScrollView contentContainerStyle={styles.content}>
    {type === "theme" ? <ChoiceGroup options={["Dark", "Light"]} selected={themeMode} onSelect={onThemeChange} palette={palette} /> : null}
    {type === "location" ? <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}><View style={styles.settingRow}><View style={styles.settingCopy}><Text style={[styles.cardTitle, { color: palette.text }]}>Use current location</Text><Text style={[styles.body, { color: palette.muted }]}>Show distances and nearby places based on your device location.</Text></View><Switch style={styles.locationSwitch} value={hasLocationPermission} onValueChange={onLocationChange} trackColor={{ false: palette.switchOff, true: palette.accent }} thumbColor={hasLocationPermission ? (light ? "#FFFFFF" : "#102320") : palette.switchThumbOff} ios_backgroundColor={palette.switchOff} /></View><Pressable onPress={() => Linking.openSettings()} style={[styles.action, { backgroundColor: palette.accent }]}><Text style={[styles.actionText, { color: palette.buttonText }]}>Open Device Settings</Text></Pressable></View> : null}
    {type === "recent" ? (recentPlaces.length ? recentPlaces.map((place) => <Pressable key={place.id || place.title} onPress={() => onPlacePress?.(place)} style={[styles.placeCard, { backgroundColor: palette.card, borderColor: palette.border }]}>{place.image ? <OptimizedImage source={place.image} style={styles.image} /> : null}<View style={styles.placeContent}><Text style={[styles.cardTitle, { color: palette.text }]}>{place.title || place.name}</Text><Text style={[styles.body, { color: palette.muted }]}>{place.location || place.distance}</Text><Text style={[styles.time, { color: palette.accent }]}>{formatViewedAt(place.viewedAt)}</Text></View></Pressable>) : <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}><Text style={[styles.cardTitle, { color: palette.text }]}>No recently viewed places</Text><Text style={[styles.body, { color: palette.muted }]}>Open a hotel, nature spot, or historical place to see it here.</Text></View>) : null}
    {page ? <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}><Ionicons name={page.icon} size={38} color={palette.accent} />{page.paragraphs.map((paragraph, index) => <Text key={index} style={[styles.paragraph, { color: index === 0 ? palette.text : palette.muted }]}>{paragraph}</Text>)}</View> : null}
  </ScrollView><BottomNav activeKey="Profile" onNavPress={onNavPress} themeMode={themeMode} /></SafeAreaView>;
}

function ChoiceGroup({ options, selected, onSelect, palette }) { return <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>{options.map((option) => <Pressable key={option} onPress={() => onSelect?.(option)} style={[styles.choice, { borderBottomColor: palette.border }]}><Text style={[styles.cardTitle, { color: palette.text }]}>{option}</Text><Ionicons name={selected === option ? "radio-button-on" : "radio-button-off"} size={23} color={palette.accent} /></Pressable>)}</View>; }
function formatViewedAt(value) { if (!value) return "Recently viewed"; const minutes = Math.max(1, Math.round((Date.now() - new Date(value).getTime()) / 60000)); if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`; const hours = Math.round(minutes / 60); if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`; const days = Math.round(hours / 24); return `${days} day${days === 1 ? "" : "s"} ago`; }

const styles = createThemedStyles({ safe: { flex: 1 }, header: { minHeight: 82, flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingVertical: 10 }, back: { width: 42, height: 42, alignItems: "center", justifyContent: "center", borderRadius: 21, borderWidth: 1 }, headerCopy: { flex: 1, marginLeft: 14 }, headerTitle: { fontSize: 22, fontWeight: "800" }, headerDescription: { marginTop: 3, fontSize: 13, lineHeight: 18 }, content: { padding: 20, paddingBottom: 110 }, card: { padding: 20, borderRadius: 18, borderWidth: 1 }, cardTitle: { fontSize: 17, fontWeight: "800" }, body: { marginTop: 7, fontSize: 14, lineHeight: 21 }, paragraph: { marginTop: 18, fontSize: 15, lineHeight: 23 }, choice: { minHeight: 58, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: StyleSheet.hairlineWidth }, settingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 14 }, settingCopy: { flex: 1, paddingRight: 8 }, locationSwitch: { flexShrink: 0 }, action: { height: 46, marginTop: 22, alignItems: "center", justifyContent: "center", borderRadius: 13 }, actionText: { color: "#FFFFFF", fontWeight: "800" }, placeCard: { minHeight: 112, marginBottom: 14, flexDirection: "row", overflow: "hidden", borderRadius: 16, borderWidth: 1 }, image: { width: 108, height: "100%" }, placeContent: { flex: 1, padding: 14 }, time: { marginTop: 8, fontSize: 12, fontWeight: "700" } });











