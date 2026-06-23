import React from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";

const navLoginIcon = require("../../assets/nav-login.png");
const profileAvatar = require("../../assets/profile-avatar.jpg");

const APP_BG = "#0B1211";
const PANEL_BG = "#151A18";
const CARD_BG = "#123F3A";
const CARD_BORDER = "#245F58";
const MUTED_GREEN = "#4F8178";
const ACCENT = "#B6D9D6";
const TEXT = "#F4F6F2";
const MUTED_TEXT = "#B9C4BE";

const stats = [
  { value: "24", label: "Saved places" },
  { value: "156", label: "Recently viewed" },
];

const menuSections = [
  [
    { icon: "heart-outline", label: "My Favorites", type: "ion" },
    { icon: "history", label: "Recently Viewed", type: "mc" },
    { icon: "star-outline", label: "Reviews", type: "ion", action: "reviews" },
  ],
  [
    { icon: "locate-outline", label: "Location Settings", type: "ion" },
    { icon: "globe-outline", label: "Language", value: "English", type: "ion" },
    { icon: "moon-outline", label: "Theme Mode", value: "Dark", type: "ion" },
  ],
  [
    { icon: "information-circle-outline", label: "About App", type: "ion" },
    { icon: "alert-circle-outline", label: "Experience Monitoring", type: "ion", action: "emptyStates" },
    { icon: "help-circle-outline", label: "Help", type: "ion" },
  ],
];

export default function ProfilePage({
  onNavPress,
  hasLocationPermission = true,
  savedPlacesCount = 24,
  onReviewsPress,
  onEmptyStatesPress,
  onLoginPress,
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <AppHeader onProfilePress={() => onNavPress?.("Profile")} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.profileBlock}>
            <View style={styles.avatarWrap}>
              <Image source={profileAvatar} style={styles.avatar} resizeMode="cover" />
              <Pressable style={styles.editButton}>
                <Ionicons name="pencil" size={18} color="#0E2421" />
              </Pressable>
            </View>

            <Text style={styles.userName}>Traveler</Text>

            <View style={styles.locationStatusRow}>
              <Ionicons name="location" size={15} color={ACCENT} />
              <Text style={styles.locationStatusText}>
                {hasLocationPermission ? "LOCATION ENABLED" : "LOCATION OFF"}
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            {stats.map((stat, index) => (
              <View key={stat.label} style={styles.statCard}>
                <Text style={styles.statValue}>
                  {index === 0 ? savedPlacesCount : stat.value}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {menuSections.map((section, sectionIndex) => (
            <View key={`section-${sectionIndex}`} style={styles.menuCard}>
              {section.map((item, itemIndex) => (
                <ProfileRow
                  key={item.label}
                  item={item}
                  showDivider={itemIndex < section.length - 1}
                  onPress={item.action === "reviews" ? onReviewsPress : item.action === "emptyStates" ? onEmptyStatesPress : undefined}
                />
              ))}
            </View>
          ))}

          <Pressable style={styles.signOutButton} onPress={onLoginPress}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        </ScrollView>

        <BottomNav activeTab="profile" onNavPress={onNavPress} />
      </View>
    </SafeAreaView>
  );
}

function ProfileRow({ item, showDivider, onPress }) {
  return (
    <View>
      <Pressable style={styles.profileRow} onPress={onPress}>
        <View style={styles.rowIconWrap}>
          {item.type === "mc" ? (
            <MaterialCommunityIcons name={item.icon} size={23} color={ACCENT} />
          ) : (
            <Ionicons name={item.icon} size={23} color={ACCENT} />
          )}
        </View>

        <Text style={styles.rowLabel}>{item.label}</Text>

        {!!item.value && <Text style={styles.rowValue}>{item.value}</Text>}
        <Ionicons name="chevron-forward" size={22} color={MUTED_TEXT} />
      </Pressable>

      {showDivider ? <View style={styles.rowDivider} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: APP_BG,
  },

  screen: {
    flex: 1,
    backgroundColor: APP_BG,
  },

  header: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    backgroundColor: PANEL_BG,
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
    backgroundColor: "#B6D9D6",
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
    borderColor: "#D19F65",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  loginLogoIcon: {
    width: 22,
    height: 22,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 95,
    paddingBottom: 128,
  },

  profileBlock: {
    alignItems: "center",
  },

  avatarWrap: {
    width: 126,
    height: 126,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#7DA7A2",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7DA7A2",
  },

  avatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
  },

  editButton: {
    position: "absolute",
    right: 3,
    bottom: 3,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT,
  },

  userName: {
    marginTop: 18,
    color: TEXT,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 25,
    lineHeight: 31,
  },

  locationStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  locationStatusText: {
    marginLeft: 6,
    color: MUTED_TEXT,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 22,
  },

  statCard: {
    flex: 1,
    height: 102,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CARD_BG,
  },

  statValue: {
    color: ACCENT,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "700",
  },

  statLabel: {
    marginTop: 4,
    color: MUTED_TEXT,
    fontSize: 14,
    lineHeight: 19,
  },

  menuCard: {
    marginTop: 24,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingHorizontal: 25,
    paddingVertical: 16,
    backgroundColor: CARD_BG,
  },

  profileRow: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
  },

  rowIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(79, 129, 120, 0.34)",
  },

  rowLabel: {
    flex: 1,
    marginLeft: 17,
    color: TEXT,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },

  rowValue: {
    marginRight: 4,
    color: MUTED_TEXT,
    fontSize: 14,
    lineHeight: 19,
  },

  rowDivider: {
    height: 1,
    marginLeft: 56,
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  signOutButton: {
    height: 45,
    marginTop: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MUTED_GREEN,
  },

  signOutText: {
    color: TEXT,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
});
