import React from "react";
import { OptimizedImageBackground } from "../components/OptimizedImage";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/ThemedStatusBar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

const refreshImage = require("../../assets/home-tea-estate.jpg");

const APP_BG = "#0B1211";
const CARD_BG = "#123F3A";
const CARD_DARK = "#102D2A";
const BORDER = "#245F58";
const TEXT = "#F4F6F2";
const MUTED = "#B9C4BE";
const ACCENT = "#B6D9D6";
const GOLD = "#F5B956";
const DUST = "#C69A82";

const primaryStates = [
  {
    icon: "heart-outline",
    title: "Quiet Trails",
    body: "Your curated collection of escapes is currently empty. Begin your journey by exploring hidden gems.",
    button: "Explore",
    buttonType: "gold",
  },
  {
    icon: "magnify-close",
    iconType: "mc",
    title: "No Paths Found",
    body: "We couldn't find matches for your search. Try adjusting filters or broaden your horizon.",
    button: "Clear Search",
    buttonType: "outline",
  },
  {
    icon: "location-off-outline",
    iconColor: DUST,
    title: "Location Needed",
    body: "To reveal nearby sanctuaries, please enable location services in your device settings.",
    button: "Settings",
    buttonType: "gold",
  },
  {
    icon: "wifi-off",
    iconType: "mc",
    iconBg: "#050908",
    title: "Something went wrong",
    body: "The connection to our island servers was interrupted. Let's try to reconnect.",
    button: "Try Again",
    buttonType: "gold",
  },
];

const statusItems = [
  {
    icon: "information-circle-outline",
    title: "System Status",
    body: "Operational. All premium booking channels are active but may experience slight delays during sync.",
  },
  {
    icon: "history",
    iconType: "mc",
    iconColor: DUST,
    title: "Cache History",
    body: "Viewing offline version of saved destinations. Connect to the network for real-time rates.",
  },
];

export default function EmptyStatePage({ onNavPress, onMenuPress, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <AppHeader
          onMenuPress={onMenuPress}
        />

        <Pressable style={styles.pageBack} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={TEXT} />
          <View style={styles.pageHeading}>
            <Text style={styles.title}>Experience Monitoring</Text>
            <Text style={styles.pageDescription}>System states and edge cases in NearLanka.</Text>
          </View>
        </Pressable>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.divider} />

          <View style={styles.stateList}>
            {primaryStates.map((item) => (
              <View key={item.title} style={styles.stateCard}>
                <View style={[styles.iconCircle, item.iconBg && { backgroundColor: item.iconBg }]}>
                  {item.iconType === "mc" ? (
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={31}
                      color={item.iconColor || ACCENT}
                    />
                  ) : (
                    <Ionicons
                      name={item.icon}
                      size={31}
                      color={item.iconColor || ACCENT}
                    />
                  )}
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardBody}>{item.body}</Text>

                <Pressable
                  style={[
                    styles.actionButton,
                    item.buttonType === "outline" && styles.outlineButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.actionButtonText,
                      item.buttonType === "outline" && styles.outlineButtonText,
                    ]}
                  >
                    {item.button}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>

          <View style={styles.syncRow}>
            <Text style={styles.syncText}>Syncing Sanctuary Data...</Text>
            <View style={styles.syncPill}>
              <View style={styles.syncFill} />
            </View>
          </View>

          <View style={styles.skeletonCard}>
            <View style={styles.skeletonLineLarge} />
            <View style={styles.skeletonLineSmall} />
          </View>

          <OptimizedImageBackground
            source={refreshImage}
            style={styles.refreshCard}
            imageStyle={styles.refreshImage}
            resizeMode="cover"
          >
            <View style={styles.refreshOverlay} />
            <MaterialCommunityIcons name="sync" size={42} color={TEXT} />
            <Text style={styles.refreshTitle}>Data Refresh</Text>
            <Text style={styles.refreshText}>
              We are updating the latest excursion availability from our local partners.
            </Text>
          </OptimizedImageBackground>

          <View style={styles.statusList}>
            {statusItems.map((item) => (
              <View key={item.title} style={styles.statusCard}>
                <View style={styles.statusIconBox}>
                  {item.iconType === "mc" ? (
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={22}
                      color={item.iconColor || ACCENT}
                    />
                  ) : (
                    <Ionicons
                      name={item.icon}
                      size={22}
                      color={item.iconColor || ACCENT}
                    />
                  )}
                </View>
                <View style={styles.statusCopy}>
                  <Text style={styles.statusTitle}>{item.title}</Text>
                  <Text style={styles.statusBody}>{item.body}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <BottomNav activeKey="Profile" onNavPress={onNavPress} />
      </View>
    </SafeAreaView>
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

  pageBack: { marginTop: 12, marginHorizontal: 20, flexDirection: "row", alignItems: "center" },
  pageHeading: { flex: 1, marginLeft: 12 },
  pageDescription: { marginTop: 3, color: MUTED, fontSize: 13, lineHeight: 18 },
  pageBackText: { marginLeft: 7, color: TEXT, fontWeight: "700" },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 118,
  },

  title: {
    color: TEXT,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 25,
    lineHeight: 31,
  },

  subtitle: {
    marginTop: 8,
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  stateList: {
    marginTop: 35,
    gap: 24,
  },

  stateCard: {
    minHeight: 258,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD_DARK,
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  cardTitle: {
    marginTop: 22,
    color: TEXT,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 17,
    lineHeight: 23,
    textAlign: "center",
  },

  cardBody: {
    marginTop: 9,
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  actionButton: {
    width: "84%",
    height: 38,
    marginTop: 25,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GOLD,
  },

  actionButtonText: {
    color: "#123F3A",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: "rgba(182,217,214,0.42)",
    backgroundColor: "transparent",
  },

  outlineButtonText: {
    color: ACCENT,
  },

  syncRow: {
    marginTop: 29,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  syncText: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },

  syncPill: {
    width: 73,
    height: 12,
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: "rgba(18,63,58,0.85)",
  },

  syncFill: {
    width: "54%",
    height: "100%",
    backgroundColor: "rgba(79,129,120,0.42)",
  },

  skeletonCard: {
    height: 178,
    marginTop: 14,
    justifyContent: "center",
    paddingHorizontal: 27,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD_DARK,
  },

  skeletonLineLarge: {
    width: "68%",
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(18,93,86,0.82)",
  },

  skeletonLineSmall: {
    width: "46%",
    height: 12,
    marginTop: 11,
    borderRadius: 6,
    backgroundColor: "rgba(18,93,86,0.36)",
  },

  refreshCard: {
    height: 135,
    marginTop: 66,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  refreshImage: {
    borderRadius: 16,
  },

  refreshOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5,16,15,0.56)",
  },

  refreshTitle: {
    marginTop: 3,
    color: TEXT,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "800",
    textAlign: "center",
  },

  refreshText: {
    marginTop: 2,
    color: TEXT,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  statusList: {
    marginTop: 25,
    gap: 17,
  },

  statusCard: {
    minHeight: 112,
    flexDirection: "row",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD_DARK,
  },

  statusIconBox: {
    width: 38,
    height: 38,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(79,129,120,0.34)",
  },

  statusCopy: {
    flex: 1,
    marginLeft: 14,
  },

  statusTitle: {
    color: TEXT,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },

  statusBody: {
    marginTop: 3,
    color: MUTED,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
});






