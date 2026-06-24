import React from "react";
import {
  Image,
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
import BottomNav from "../components/BottomNav";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { openPlaceDirections } from "../utils/maps";

const hotelHeroImage = require("../../assets/Home-Main-1742X871.jpg");
const routeImage = require("../../assets/onboarding-navigate-easily.jpg");
const navHomeIcon = require("../../assets/nav-home.png");
const navCompassIcon = require("../../assets/nav-compass.png");
const navMapIcon = require("../../assets/nav-map.png");
const navLoveIcon = require("../../assets/nav-love.png");
const navUserIcon = require("../../assets/nav-user.png");

const APP_BG = "#0B1211";
const CARD_BG = "#171B19";
const DARK_GREEN = "#123C39";
const SOFT_TEAL = "#B6D9D6";
const GOLD = "#FFC05A";

const facilities = [
  { icon: "wifi", label: "Wi-Fi", type: "ion" },
  { icon: "parking", label: "Parking", type: "mc" },
  { icon: "silverware-fork-knife", label: "Restaurant", type: "mc" },
  { icon: "snowflake", label: "AC", type: "mc" },
  { icon: "human-male-female-child", label: "Family Friendly", type: "mc" },
];

const navItems = [
  { icon: navHomeIcon, label: "Home", key: "Home" },
  { icon: navCompassIcon, label: "Explore", key: "Explore", active: true },
  { icon: navMapIcon, label: "Map", key: "Map" },
  { icon: navLoveIcon, label: "Favorites", key: "Favorites" },
  { icon: navUserIcon, label: "Profile", key: "Profile" },
];

export default function HotelInnerPage({
  place,
  onBack,
  onFavoritePress,
  onNavPress,
  favoriteIds = [],
}) {
  const selectedPlace = place || {
    id: "hotel-nearby-city-hotel", title: "Nearby City Hotel", image: hotelHeroImage,
    rating: "4.8", location: "Near your current location", description: "Discover this Sri Lankan hotel.",
    openingHours: "Open 24 hours", entryFee: "Room rates vary", bestTime: "Any time",
  };
  const isFavorite = favoriteIds.includes(selectedPlace.id || selectedPlace._id || selectedPlace.title);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ImageBackground
            source={selectedPlace.image || hotelHeroImage}
            style={styles.hero}
            imageStyle={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.heroShade} />

            <View style={styles.heroTopRow}>
              <Pressable style={styles.circleButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </Pressable>

              <Pressable
                style={[styles.circleButton, isFavorite && styles.activeCircleButton]}
                onPress={() => onFavoritePress?.(selectedPlace)}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? GOLD : "#FFFFFF"}
                />
              </Pressable>
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.typePill}>Hotel</Text>
              <Text style={styles.title}>{selectedPlace.title || selectedPlace.name}</Text>

              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={15} color="#C8D8D5" />
                <Text style={styles.locationText}>{selectedPlace.location}</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.detailPanel}>
            <View style={styles.statsRow}>
              <View style={styles.ratingBlock}>
                <Ionicons name="star" size={22} color="#E7B567" />
                <Text style={styles.ratingValue}>{selectedPlace.rating}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.distanceBlock}>
                <Text style={styles.distanceValue}>{selectedPlace.distanceKm ?? "--"}</Text>
                <Text style={styles.distanceUnit}>km</Text>
                <Text style={styles.distanceLabel}>DISTANCE</Text>
              </View>

              <Text style={styles.openPill}>{selectedPlace.openingHours}</Text>
            </View>

            <Text style={styles.sectionLabel}>FACILITIES</Text>
            <View style={styles.facilityWrap}>
              {facilities.map((facility) => (
                <View key={facility.label} style={styles.facilityPill}>
                  {facility.type === "ion" ? (
                    <Ionicons name={facility.icon} size={19} color={SOFT_TEAL} />
                  ) : (
                    <MaterialCommunityIcons
                      name={facility.icon}
                      size={20}
                      color={SOFT_TEAL}
                    />
                  )}
                  <Text style={styles.facilityText}>{facility.label}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionLabel}>DESCRIPTION</Text>
            <Text style={styles.description}>{selectedPlace.description}</Text>

            <Text style={styles.sectionLabel}>ENTRY FEE</Text>
            <Text style={styles.description}>{selectedPlace.entryFee}</Text>
            <Text style={styles.sectionLabel}>BEST TIME</Text>
            <Text style={styles.description}>{selectedPlace.bestTime}</Text>

            <ImageBackground
              source={routeImage}
              style={styles.travelCard}
              imageStyle={styles.travelImage}
              resizeMode="cover"
            >
              <View style={styles.travelShade} />
              <View style={styles.travelInfo}>
                <View>
                  <Text style={styles.travelLabel}>Estimated Travel Time</Text>
                  <Text style={styles.travelTime}>15 mins</Text>
                </View>
                <View style={styles.carCircle}>
                  <Ionicons name="car-sport-outline" size={23} color={SOFT_TEAL} />
                </View>
              </View>
            </ImageBackground>

            <Pressable style={styles.primaryButton} onPress={() => openPlaceDirections(selectedPlace)}>
              <Text style={styles.primaryButtonText}>Get Directions</Text>
            </Pressable>

            <Pressable
              style={[styles.secondaryButton, isFavorite && styles.activeSecondaryButton]}
              onPress={() => onFavoritePress?.(selectedPlace)}
            >
              <Text style={styles.secondaryButtonText}>
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
    height: 390,
    justifyContent: "space-between",
  },

  heroImage: {
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5, 35, 33, 0.58)",
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    backgroundColor: "rgba(11,18,17,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  activeCircleButton: {
    borderColor: "rgba(255,192,90,0.85)",
    backgroundColor: "rgba(18,63,58,0.82)",
  },

  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  ratingLabel: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
    lineHeight: 18,
  },

  typePill: {
    alignSelf: "flex-start",
    marginTop: 4,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 13,
    overflow: "hidden",
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 22,
    backgroundColor: "rgba(91,130,127,0.86)",
  },

  title: {
    marginTop: 18,
    color: "#F1F5F3",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 27,
    lineHeight: 34,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  locationText: {
    marginLeft: 6,
    color: "#C8D8D5",
    fontSize: 14,
    lineHeight: 19,
  },

  detailPanel: {
    marginTop: -16,
    paddingHorizontal: 20,
    paddingTop: 32,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: CARD_BG,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },

  ratingBlock: {
    flexDirection: "row",
    alignItems: "center",
  },

  ratingValue: {
    marginLeft: 6,
    color: "#E7B567",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
  },

  divider: {
    width: 1,
    height: 39,
    marginHorizontal: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
  },

  distanceBlock: {
    flexDirection: "row",
    alignItems: "baseline",
    flex: 1,
    flexWrap: "wrap",
  },

  distanceValue: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
  },

  distanceUnit: {
    marginLeft: 5,
    color: "#D5DDDA",
    fontSize: 14,
    lineHeight: 19,
  },

  distanceLabel: {
    width: "100%",
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 17,
  },

  openPill: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 18,
    overflow: "hidden",
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 17,
    backgroundColor: "#507875",
  },

  sectionLabel: {
    marginTop: 10,
    marginBottom: 18,
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    lineHeight: 18,
  },

  facilityWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 32,
  },

  facilityPill: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "#2D302F",
  },

  facilityText: {
    marginLeft: 7,
    color: "#E1E6E4",
    fontSize: 14,
    lineHeight: 18,
  },

  description: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 15.5,
    lineHeight: 21,
    marginBottom: 48,
  },

  travelCard: {
    height: 250,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: APP_BG,
  },

  travelImage: {
    borderRadius: 20,
  },

  travelShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.42)",
  },

  travelInfo: {
    minHeight: 74,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(182,217,214,0.16)",
    backgroundColor: "rgba(18,60,57,0.92)",
  },

  travelLabel: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
    lineHeight: 18,
  },

  travelTime: {
    marginTop: 4,
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 19,
    lineHeight: 24,
  },

  carCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(182,217,214,0.22)",
  },

  primaryButton: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
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
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 38,
    borderRadius: 14,
    backgroundColor: "#507875",
  },

  activeSecondaryButton: {
    borderWidth: 1,
    borderColor: "rgba(255,192,90,0.65)",
  },

  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },






});
