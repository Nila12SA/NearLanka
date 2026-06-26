import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/ThemedStatusBar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { OptimizedImage } from "../components/OptimizedImage";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";
import { createThemedStyles } from "../theme/runtimeTheme";

const profileAvatar = require("../../assets/profile-avatar.jpg");
const labels = { favorites: "My Favorites", recent: "Recently Viewed", reviews: "Reviews", location: "Location Settings", about: "About App", monitoring: "Experience Monitoring", help: "Help", signOut: "Sign Out", saved: "Saved places", viewed: "Recently viewed" };

export default function ProfilePage({
  onNavPress, onMenuPress, onSignOut, onFavoritesPress, onRecentPress,
  onReviewsPress, onLocationPress,
  onAboutPress, onMonitoringPress, onHelpPress, hasLocationPermission = true,
  savedPlacesCount = 0, recentPlacesCount = 0, userName = "Traveler",
  themeMode = "Dark",
}) {
  const light = themeMode === "Light";
  const t = labels;
  const palette = light
    ? { bg: "#F3F6F2", card: "#FFFFFF", border: "#C9D8D4", text: "#17322F", muted: "#60736F", accent: "#245F58", button: "#D7A85F" }
    : { bg: "#0B1211", card: "#123F3A", border: "#245F58", text: "#F4F6F2", muted: "#B9C4BE", accent: "#B6D9D6", button: "#4F8178" };
  const sections = [
    [
      { icon: "heart-outline", label: t.favorites, onPress: onFavoritesPress },
      { icon: "history", label: t.recent, type: "mc", onPress: onRecentPress },
      { icon: "star-outline", label: t.reviews, onPress: onReviewsPress },
    ],
    [
      { icon: "locate-outline", label: t.location, value: hasLocationPermission ? "On" : "Off", onPress: onLocationPress },
    ],
    [
      { icon: "information-circle-outline", label: t.about, onPress: onAboutPress },
      { icon: "pulse-outline", label: t.monitoring, onPress: onMonitoringPress },
      { icon: "help-circle-outline", label: t.help, onPress: onHelpPress },
    ],
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.bg }]}>
      <StatusBar style={light ? "dark" : "light"} backgroundColor={palette.bg} />
      <View style={[styles.screen, { backgroundColor: palette.bg }]}>
        <AppHeader onMenuPress={onMenuPress} onProfilePress={() => onNavPress?.("Profile")} themeMode={themeMode} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileBlock}>
            <View style={[styles.avatarWrap, { borderColor: palette.accent }]}><OptimizedImage source={profileAvatar} style={styles.avatar} /></View>
            <Text style={[styles.userName, { color: palette.text }]}>{userName}</Text>
            <View style={styles.statusRow}><Ionicons name="location" size={15} color={palette.accent} /><Text style={[styles.statusText, { color: palette.muted }]}>{hasLocationPermission ? "LOCATION ENABLED" : "LOCATION OFF"}</Text></View>
          </View>
          <View style={styles.statsRow}>
            <Stat value={savedPlacesCount} label={t.saved} palette={palette} />
            <Stat value={recentPlacesCount} label={t.viewed} palette={palette} />
          </View>
          {sections.map((section, index) => (
            <View key={index} style={[styles.menuCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
              {section.map((item, itemIndex) => <ProfileRow key={item.label} item={item} palette={palette} divider={itemIndex < section.length - 1} />)}
            </View>
          ))}
          <Pressable style={[styles.signOut, { backgroundColor: palette.button }]} onPress={onSignOut}><Text style={styles.signOutText}>{t.signOut}</Text></Pressable>
        </ScrollView>
        <BottomNav activeKey="Profile" onNavPress={onNavPress} themeMode={themeMode} />
      </View>
    </SafeAreaView>
  );
}

function Stat({ value, label, palette }) { return <View style={[styles.stat, { backgroundColor: palette.card, borderColor: palette.border }]}><Text style={[styles.statValue, { color: palette.accent }]}>{value}</Text><Text style={[styles.statLabel, { color: palette.muted }]}>{label}</Text></View>; }
function ProfileRow({ item, palette, divider }) { return <View><Pressable style={styles.row} onPress={item.onPress}><View style={[styles.iconWrap, { backgroundColor: palette.bg }]}>{item.type === "mc" ? <MaterialCommunityIcons name={item.icon} size={23} color={palette.accent} /> : <Ionicons name={item.icon} size={23} color={palette.accent} />}</View><Text style={[styles.rowLabel, { color: palette.text }]}>{item.label}</Text>{item.value ? <Text style={[styles.rowValue, { color: palette.muted }]}>{item.value}</Text> : null}<Ionicons name="chevron-forward" size={21} color={palette.muted} /></Pressable>{divider ? <View style={[styles.divider, { backgroundColor: palette.border }]} /> : null}</View>; }

const styles = createThemedStyles({
  safeArea: { flex: 1 }, screen: { flex: 1 }, scrollContent: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 125 },
  profileBlock: { alignItems: "center" }, avatarWrap: { width: 118, height: 118, borderRadius: 59, borderWidth: 4, padding: 4 }, avatar: { width: "100%", height: "100%", borderRadius: 54 },
  userName: { marginTop: 16, fontSize: 26, fontWeight: "800" }, statusRow: { marginTop: 8, flexDirection: "row", alignItems: "center" }, statusText: { marginLeft: 6, fontSize: 12, fontWeight: "700" },
  statsRow: { marginTop: 22, flexDirection: "row", gap: 14 }, stat: { flex: 1, minHeight: 96, alignItems: "center", justifyContent: "center", borderRadius: 15, borderWidth: 1 }, statValue: { fontSize: 27, fontWeight: "800" }, statLabel: { marginTop: 4, fontSize: 13, textAlign: "center" },
  menuCard: { marginTop: 22, paddingHorizontal: 22, paddingVertical: 10, borderRadius: 15, borderWidth: 1 }, row: { minHeight: 62, flexDirection: "row", alignItems: "center" }, iconWrap: { width: 39, height: 39, alignItems: "center", justifyContent: "center", borderRadius: 11 }, rowLabel: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: "600" }, rowValue: { marginRight: 5, fontSize: 13 }, divider: { height: 1, marginLeft: 54, opacity: 0.45 },
  signOut: { height: 46, marginTop: 34, alignItems: "center", justifyContent: "center", borderRadius: 14 }, signOutText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});





