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
import BottomNav from "../components/BottomNav";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { openPlaceDirections } from "../utils/maps";

const heroImage = require("../../assets/historical-sigiriya.jpg");

const APP_BG = "#0B1211";
const CONTENT_BG = "#07110F";
const CARD_BG = "#0F302C";
const CARD_BG_DEEP = "#123F3A";
const BUTTON_GREEN = "#3E6B63";
const GOLD = "#D9AB4F";
const TEXT_WHITE = "#F4F6F2";
const MUTED_TEXT = "#B9C4BE";
const BORDER = "#1C4D47";
const SOFT_TEAL = MUTED_TEXT;

const facilities = [
  { icon: "parking", label: "Parking", type: "mc" },
  { icon: "human-male-female", label: "Washrooms", type: "mc" },
  { icon: "account-tie-hat", label: "Guides", type: "mc" },
  { icon: "camera-outline", label: "Photo Spots", type: "ion" },
];

export default function HistoricalInnerPage({
  place,
  onBack,
  onFavoritePress,
  onNavPress,
  favoriteIds = [],
}) {
  const favoriteItem = place || {
    id: "historical-nearby-heritage-site", title: "Nearby Heritage Site", image: heroImage,
    rating: "4.9", location: "Sri Lanka", description: "Discover this Sri Lankan historical place.",
    openingHours: "Hours not available", entryFee: "Fee information not available", bestTime: "Any time",
  };

  const favoriteKey = favoriteItem.id || favoriteItem._id || favoriteItem.title;
  const isFavorite =
    favoriteIds.includes(favoriteKey) || favoriteIds.includes(favoriteItem.title);

  const handleFavoritePress = () => {
    onFavoritePress?.(favoriteItem);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <OptimizedImageBackground
            source={favoriteItem.image || heroImage}
            style={styles.hero}
            imageStyle={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.heroShade} />

            <View style={styles.heroTopRow}>
              <Pressable style={styles.circleButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color={TEXT_WHITE} />
              </Pressable>

              <Pressable
                style={[
                  styles.circleButton,
                  isFavorite && styles.activeCircleButton,
                ]}
                onPress={handleFavoritePress}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={25}
                  color={isFavorite ? GOLD : TEXT_WHITE}
                />
              </Pressable>
            </View>

            <View style={styles.heroContent}>
              <View style={styles.metaRow}>
                <Text style={styles.categoryPill}>HISTORICAL</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color={GOLD} />
                  <Text style={styles.ratingText}>{favoriteItem.rating}</Text>
                </View>
              </View>

              <Text style={styles.title}>{favoriteItem.title || favoriteItem.name}</Text>

              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={17} color={MUTED_TEXT} />
                <Text style={styles.locationText}>
                  {favoriteItem.location}
                </Text>

                <MaterialCommunityIcons
                  name="ruler"
                  size={16}
                  color={MUTED_TEXT}
                  style={styles.distanceIcon}
                />
                <Text style={styles.locationText}>{favoriteItem.distanceKm != null ? `${favoriteItem.distanceKm} km` : ""}</Text>
              </View>
            </View>
          </OptimizedImageBackground>

          <View style={styles.contentPanel}>
            <Text style={styles.sectionTitle}>About this Site</Text>

            <Text style={styles.description}>{favoriteItem.description}</Text>

            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Ionicons name="time-outline" size={20} color={SOFT_TEAL} />
                <Text style={styles.infoLabel}>OPENING HOURS</Text>
                <Text style={styles.infoValue}>{favoriteItem.openingHours}</Text>
              </View>

              <View style={styles.infoCard}>
                <MaterialCommunityIcons
                  name="cash"
                  size={21}
                  color={SOFT_TEAL}
                />
                <Text style={styles.infoLabel}>ENTRY FEE</Text>
                <Text style={styles.infoValue}>{favoriteItem.entryFee}</Text>
              </View>

              <View style={styles.infoCard}>
                <Ionicons name="settings-outline" size={20} color={SOFT_TEAL} />
                <Text style={styles.infoLabel}>BEST TIME</Text>
                <Text style={styles.infoValue}>{favoriteItem.bestTime}</Text>
              </View>
            </View>

            <Text style={styles.facilitiesTitle}>AVAILABLE FACILITIES</Text>

            <View style={styles.facilityWrap}>
              {facilities.map((facility) => (
                <View key={facility.label} style={styles.facilityPill}>
                  {facility.type === "mc" ? (
                    <MaterialCommunityIcons
                      name={facility.icon}
                      size={19}
                      color={TEXT_WHITE}
                    />
                  ) : (
                    <Ionicons name={facility.icon} size={18} color={TEXT_WHITE} />
                  )}

                  <Text style={styles.facilityText}>{facility.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.mapCard}>
              <View style={styles.mapGridOne} />
              <View style={styles.mapGridTwo} />
              <View style={styles.mapGridThree} />
              <View style={styles.mapRoadOne} />
              <View style={styles.mapRoadTwo} />
              <View style={styles.mapRoadThree} />

              <Text style={styles.mapLabelOne}>Sigiriya</Text>
              <Text style={styles.mapLabelTwo}>Kimbissa</Text>
              <Text style={styles.mapLabelThree}>Diyabeduma</Text>

              <Pressable style={styles.mapButton} onPress={() => openPlaceDirections(favoriteItem)}>
                <Ionicons name="location" size={15} color={GOLD} />
                <Text style={styles.mapButtonText}>Explore Area Map</Text>
              </Pressable>
            </View>

            <Pressable style={styles.primaryButton} onPress={() => openPlaceDirections(favoriteItem)}>
              <Text style={styles.primaryButtonText}>Get Directions</Text>
            </Pressable>

            <Pressable
              style={[
                styles.secondaryButton,
                isFavorite && styles.activeSecondaryButton,
              ]}
              onPress={handleFavoritePress}
            >
              <Text
                style={[
                  styles.secondaryButtonText,
                  isFavorite && styles.activeSecondaryButtonText,
                ]}
              >
                {isFavorite ? "Added to Favorites" : "Add to Favorites"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        <BottomNav activeKey="Explore" onNavPress={onNavPress} />
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

  scrollContent: {
    paddingBottom: 112,
  },

  hero: {
    height: 530,
    justifyContent: "space-between",
  },

  heroImage: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5, 30, 28, 0.34)",
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
  },

  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "rgba(185, 196, 190, 0.28)",
    backgroundColor: "rgba(18, 63, 58, 0.78)",
    alignItems: "center",
    justifyContent: "center",
  },

  activeCircleButton: {
    borderColor: "rgba(217, 171, 79, 0.72)",
    backgroundColor: "rgba(20, 74, 67, 0.92)",
  },

  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: "rgba(0,0,0,0.34)",
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
    backgroundColor: BUTTON_GREEN,
    color: TEXT_WHITE,
    fontSize: 13,
    lineHeight: 17,
  },

  ratingRow: {
    marginLeft: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  ratingText: {
    marginLeft: 4,
    color: GOLD,
    fontSize: 13,
    lineHeight: 18,
    textDecorationLine: "underline",
  },

  title: {
    marginTop: 10,
    color: TEXT_WHITE,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 27,
    lineHeight: 34,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  locationText: {
    marginLeft: 5,
    color: MUTED_TEXT,
    fontSize: 14,
    lineHeight: 19,
  },

  distanceIcon: {
    marginLeft: 14,
  },

  contentPanel: {
    backgroundColor: CONTENT_BG,
    paddingHorizontal: 20,
    paddingTop: 33,
    paddingBottom: 34,
  },

  sectionTitle: {
    color: SOFT_TEAL,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 23,
    lineHeight: 30,
    marginBottom: 18,
  },

  description: {
    color: MUTED_TEXT,
    fontSize: 17,
    lineHeight: 23,
    marginBottom: 30,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  infoCard: {
    width: "47.5%",
    minHeight: 78,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD_BG,
  },

  infoLabel: {
    marginTop: 6,
    color: MUTED_TEXT,
    fontSize: 10,
    lineHeight: 14,
  },

  infoValue: {
    marginTop: 3,
    color: TEXT_WHITE,
    fontSize: 12.5,
    lineHeight: 17,
  },

  facilitiesTitle: {
    marginTop: 34,
    marginBottom: 16,
    color: MUTED_TEXT,
    fontSize: 13,
    lineHeight: 18,
  },

  facilityWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 34,
  },

  facilityPill: {
    minHeight: 39,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "rgba(28, 77, 71, 0.65)",
    backgroundColor: "#202824",
  },

  facilityText: {
    marginLeft: 8,
    color: TEXT_WHITE,
    fontSize: 14,
    lineHeight: 18,
  },

  mapCard: {
    height: 255,
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: "#AEB8B2",
    marginBottom: 24,
  },

  mapGridOne: {
    position: "absolute",
    left: -20,
    right: -20,
    top: 78,
    height: 1,
    backgroundColor: "rgba(53, 67, 62, 0.28)",
    transform: [{ rotate: "-12deg" }],
  },

  mapGridTwo: {
    position: "absolute",
    left: 115,
    top: -40,
    bottom: -40,
    width: 1,
    backgroundColor: "rgba(53, 67, 62, 0.24)",
    transform: [{ rotate: "25deg" }],
  },

  mapGridThree: {
    position: "absolute",
    right: 90,
    top: -40,
    bottom: -40,
    width: 1,
    backgroundColor: "rgba(53, 67, 62, 0.24)",
    transform: [{ rotate: "-8deg" }],
  },

  mapRoadOne: {
    position: "absolute",
    left: 20,
    top: 122,
    width: 270,
    height: 4,
    borderRadius: 3,
    backgroundColor: "rgba(48, 62, 58, 0.34)",
    transform: [{ rotate: "13deg" }],
  },

  mapRoadTwo: {
    position: "absolute",
    left: 76,
    top: 175,
    width: 270,
    height: 4,
    borderRadius: 3,
    backgroundColor: "rgba(48, 62, 58, 0.30)",
    transform: [{ rotate: "-20deg" }],
  },

  mapRoadThree: {
    position: "absolute",
    right: 62,
    top: 30,
    width: 4,
    height: 230,
    borderRadius: 3,
    backgroundColor: "rgba(48, 62, 58, 0.30)",
    transform: [{ rotate: "22deg" }],
  },

  mapLabelOne: {
    position: "absolute",
    top: 36,
    left: "45%",
    color: "#56645F",
    fontSize: 9,
    fontWeight: "700",
  },

  mapLabelTwo: {
    position: "absolute",
    top: 34,
    left: 72,
    color: "#56645F",
    fontSize: 9,
    fontWeight: "700",
  },

  mapLabelThree: {
    position: "absolute",
    top: 70,
    right: 12,
    color: "#56645F",
    fontSize: 9,
    fontWeight: "700",
  },

  mapButton: {
    position: "absolute",
    left: 20,
    bottom: 18,
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: BUTTON_GREEN,
  },

  mapButtonText: {
    marginLeft: 7,
    color: TEXT_WHITE,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },

  primaryButton: {
    height: 45,
    borderRadius: 14,
    backgroundColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: APP_BG,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },

  secondaryButton: {
    height: 45,
    borderRadius: 14,
    marginTop: 10,
    backgroundColor: BUTTON_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },

  activeSecondaryButton: {
    backgroundColor: BUTTON_GREEN,
    borderWidth: 1,
    borderColor: BUTTON_GREEN,
  },

  secondaryButtonText: {
    color: TEXT_WHITE,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },

  activeSecondaryButtonText: {
    color: TEXT_WHITE,
  },
});



