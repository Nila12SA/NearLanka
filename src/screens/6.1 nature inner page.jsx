import React from "react";
import {
  ImageBackground,
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

const heroImage = require("../../assets/nature-bomburella-waterfall.jpg");

const APP_BG = "#0B1211";
const CARD_BG = "#123C39";
const SOFT_TEAL = "#B6D9D6";
const GOLD = "#FFC05A";

const facilities = [
  { icon: "parking", label: "Parking", type: "mc" },
  { icon: "human-male-female", label: "Washrooms", type: "mc" },
  { icon: "camera-outline", label: "Photo Spots", type: "ion" },
  { icon: "human-male-female-child", label: "Family Friendly", type: "mc" },
];

export default function NatureInnerPage({ onBack, onFavoritePress }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ImageBackground
            source={heroImage}
            style={styles.hero}
            resizeMode="cover"
          >
            <View style={styles.heroShade} />

            <View style={styles.heroTopRow}>
              <Pressable style={styles.circleButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </Pressable>

              <Pressable style={styles.circleButton} onPress={onFavoritePress}>
                <Ionicons name="bookmark-outline" size={23} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.heroContent}>
              <View style={styles.metaRow}>
                <Text style={styles.categoryPill}>Nature</Text>
                <Text style={styles.ratingText}>* 4.8</Text>
                <Text style={styles.reviewText}>(1.2k reviews)</Text>
              </View>

              <Text style={styles.title}>Nearby Nature Spot</Text>

              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={15} color="#E0E9E6" />
                <Text style={styles.locationText}>
                  Ella, Central Highlands  •  2.4 km away
                </Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.content}>
            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>ENTRY FEE</Text>
                <Text style={styles.infoValue}>Rs. 500</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>BEST TIME</Text>
                <Text style={styles.infoValue}>6 AM - 9 AM</Text>
              </View>
            </View>

            <View style={styles.hoursCard}>
              <View>
                <Text style={styles.infoLabel}>OPENING HOURS</Text>
                <Text style={styles.hoursValue}>Daily: 07:00 - 18:00</Text>
              </View>
              <Text style={styles.openBadge}>OPEN NOW</Text>
            </View>

            <Text style={styles.sectionTitle}>About this Haven</Text>
            <Text style={styles.description}>
              Escape into a sanctuary where the emerald canopy meets the sky.
              This hidden gem offers a serene hiking trail leading to a panoramic
              overlook of the valley. Perfect for those seeking a moment of quiet
              reflection amidst ancient boulders and vibrant tropical flora.
            </Text>

            <Text style={styles.sectionTitle}>Facilities</Text>
            <View style={styles.facilityWrap}>
              {facilities.map((facility) => (
                <View key={facility.label} style={styles.facilityPill}>
                  {facility.type === "ion" ? (
                    <Ionicons name={facility.icon} size={18} color={SOFT_TEAL} />
                  ) : (
                    <MaterialCommunityIcons
                      name={facility.icon}
                      size={19}
                      color={SOFT_TEAL}
                    />
                  )}
                  <Text style={styles.facilityText}>{facility.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.locationTitleRow}>
              <Text style={styles.sectionTitleNoMargin}>Location</Text>
              <Text style={styles.mapLink}>View on full map</Text>
            </View>

            <View style={styles.mapCard}>
              <View style={styles.mapGridHorizontal} />
              <View style={styles.mapGridVertical} />
              <View style={styles.mapPathOne} />
              <View style={styles.mapPathTwo} />
              <View style={styles.mapPin}>
                <Ionicons name="location" size={22} color="#D9A35F" />
              </View>
              <Text style={styles.mapLabelOne}>Ella</Text>
              <Text style={styles.mapLabelTwo}>Bomburella Falls</Text>
              <Text style={styles.mapLabelThree}>Central Highlands</Text>
            </View>

            <View style={styles.actionBar}>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Get Directions</Text>
              </Pressable>

              <Pressable style={styles.secondaryButton} onPress={onFavoritePress}>
                <Text style={styles.secondaryButtonText}>Add to Favorites</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
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
    position: "relative",
    backgroundColor: APP_BG,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 44,
  },

  hero: {
    height: 575,
    justifyContent: "space-between",
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.22)",
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(13,48,45,0.72)",
  },

  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 22,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  categoryPill: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 16,
    overflow: "hidden",
    color: "#DDE9E6",
    fontSize: 13,
    lineHeight: 17,
    backgroundColor: "#507875",
  },

  ratingText: {
    marginLeft: 10,
    color: "#F0C46C",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  reviewText: {
    marginLeft: 5,
    color: "#DCE5E2",
    fontSize: 14,
    lineHeight: 19,
  },

  title: {
    marginTop: 14,
    color: "#F2F0E8",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 27,
    lineHeight: 34,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  locationText: {
    marginLeft: 6,
    color: "#E0E9E6",
    fontSize: 15,
    lineHeight: 20,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  infoGrid: {
    flexDirection: "row",
    gap: 12,
  },

  infoCard: {
    flex: 1,
    minHeight: 62,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(83,166,158,0.3)",
    backgroundColor: CARD_BG,
  },

  infoLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    lineHeight: 18,
  },

  infoValue: {
    marginTop: 5,
    color: SOFT_TEAL,
    fontSize: 17,
    lineHeight: 22,
  },

  hoursCard: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(83,166,158,0.3)",
    backgroundColor: CARD_BG,
  },

  hoursValue: {
    color: "#E0E9E6",
    fontSize: 16,
    lineHeight: 21,
  },

  openBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: SOFT_TEAL,
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "800",
  },

  sectionTitle: {
    marginTop: 50,
    marginBottom: 16,
    color: "#C8D7D4",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 23,
    lineHeight: 29,
  },

  description: {
    color: "#D5DDDA",
    fontSize: 16,
    lineHeight: 23,
  },

  facilityWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  facilityPill: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "#171B19",
  },

  facilityText: {
    marginLeft: 7,
    color: "#E1E6E4",
    fontSize: 14,
    lineHeight: 18,
  },

  locationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 14,
  },

  sectionTitleNoMargin: {
    color: "#C8D7D4",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 23,
    lineHeight: 29,
  },

  mapLink: {
    color: SOFT_TEAL,
    fontSize: 14,
    lineHeight: 19,
  },

  mapCard: {
    height: 172,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#D8E9D2",
    marginBottom: 36,
  },

  mapGridHorizontal: {
    position: "absolute",
    left: -20,
    right: -20,
    top: 70,
    height: 2,
    backgroundColor: "rgba(89,143,99,0.32)",
    transform: [{ rotate: "-10deg" }],
  },

  mapGridVertical: {
    position: "absolute",
    top: -20,
    bottom: -20,
    left: 190,
    width: 2,
    backgroundColor: "rgba(89,143,99,0.26)",
    transform: [{ rotate: "24deg" }],
  },

  mapPathOne: {
    position: "absolute",
    left: 32,
    top: 40,
    width: 260,
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(65,125,77,0.45)",
    transform: [{ rotate: "17deg" }],
  },

  mapPathTwo: {
    position: "absolute",
    left: 75,
    top: 108,
    width: 220,
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(65,125,77,0.38)",
    transform: [{ rotate: "-15deg" }],
  },

  mapPin: {
    position: "absolute",
    left: "48%",
    top: 78,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.76)",
  },

  mapLabelOne: {
    position: "absolute",
    left: 55,
    top: 46,
    color: "#4E7868",
    fontSize: 10,
    fontWeight: "700",
  },

  mapLabelTwo: {
    position: "absolute",
    right: 42,
    top: 55,
    color: "#8A67BA",
    fontSize: 10,
    fontWeight: "700",
  },

  mapLabelThree: {
    position: "absolute",
    left: 96,
    bottom: 24,
    color: "#4E7868",
    fontSize: 10,
    fontWeight: "700",
  },

  actionBar: {
    minHeight: 93,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 28,
    padding: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(83,166,158,0.28)",
    backgroundColor: "rgba(18,60,57,0.96)",
  },

  primaryButton: {
    flex: 1,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: GOLD,
  },

  primaryButtonText: {
    color: "#123B37",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },

  secondaryButton: {
    flex: 1,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#507875",
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
});
