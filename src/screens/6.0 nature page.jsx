import React, { useState } from "react";
import { OptimizedImageBackground } from "../components/OptimizedImage";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/ThemedStatusBar";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";
import LocationPill from "../components/LocationPill";
import DataState from "../components/DataState";
import usePlaces from "../hooks/usePlaces";
import { filterCategoryPlaces, filterPlacesByQuery } from "../utils/places";
import { Ionicons } from "@expo/vector-icons";

const littleAdamsPeak = require("../../assets/nature-little-adams-peak.jpg");
const ambuluwawaImage = require("../../assets/nature-ambuluwawa.jpg");
const sigiriyaImage = require("../../assets/nature-sigiriya.jpg");
const teaEstateImage = require("../../assets/home-tea-estate.jpg");
const beachImage = require("../../assets/home-mountain-view.jpg");
const navHomeIcon = require("../../assets/nav-home.png");
const navCompassIcon = require("../../assets/nav-compass.png");
const navMapIcon = require("../../assets/nav-map.png");
const navLoveIcon = require("../../assets/nav-love.png");
const navUserIcon = require("../../assets/nav-user.png");
const navLoginIcon = require("../../assets/nav-login.png");

const APP_BG = "#0B1211";
const PANEL_BG = "#123C39";
const CARD_BG = "#0F3A36";
const SOFT_TEAL = "#B6D9D6";
const GOLD = "#FFC05A";

const filters = ["All", "Open Now", "Top Rated"];

const natureSpots = [
  {
    title: "Nearby Nature Spot",
    distance: "1.2 km away",
    rating: "4.9",
    description:
      "Discover a hidden oasis of ancient trees and vibrant wildlife just a short...",
    image: sigiriyaImage,
  },
  {
    title: "Secret Falls Trail",
    distance: "3.5 km away",
    rating: "4.8",
    description:
      "A moderate trail leading to a breathtaking three-tier waterfall...",
    image: ambuluwawaImage,
  },
  {
    title: "Peak Vista Point",
    distance: "4.8 km away",
    rating: "4.7",
    description:
      "Unrivaled views of the morning mist rolling through the valley. The perfect...",
    image: littleAdamsPeak,
  },
  {
    title: "Emerald Lake Sanctuary",
    distance: "0.8 km away",
    rating: "5.0",
    description:
      "Our most exclusive local discovery. A tranquil body of water protected by dense canopy, offering absolute silence and pristine natural beauty.",
    image: beachImage,
  },
  {
    title: "Hillside Tea Gardens",
    distance: "2.1 km away",
    rating: "4.9",
    description:
      "Wander through rows of pristine tea bushes and enjoy a moment of heritage",
    image: teaEstateImage,
  },
];

const navItems = [
  { icon: navHomeIcon, label: "Home", key: "Home" },
  { icon: navCompassIcon, label: "Explore", key: "Explore", active: true },
  { icon: navMapIcon, label: "Map", key: "Map" },
  { icon: navLoveIcon, label: "Favorites", key: "Favorites" },
  { icon: navUserIcon, label: "Profile", key: "Profile" },
];

export default function NaturePage({
  onMenuPress,
  onNavPress,
  onNaturePress,
  onFavoritePress,
  favoriteIds = [],
  hasLocationPermission = true,
  userLocation = null,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const { places, loading, error, reload } = usePlaces({
    category: "nature",
    hasLocationPermission,
    userLocation,
  });
  const filteredPlaces = filterCategoryPlaces(places, activeFilter);
  const displayedPlaces = filterPlacesByQuery(filteredPlaces, query);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <AppHeader
          onMenuPress={onMenuPress}
          onProfilePress={() => onNavPress?.("Profile")}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Nature Spots Near You</Text>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={22} color="#AFC8C4" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search nearby nature spots"
              placeholderTextColor="#91A8A5"
              style={styles.searchText}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersRow}
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[
                    styles.filterButton,
                    isActive && styles.activeFilterButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      isActive && styles.activeFilterText,
                    ]}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.sortRow}>
            <Ionicons name="filter" size={13} color="#AFC8C4" />
            <Text style={styles.sortText}>
              {activeFilter === "Top Rated"
                ? "Sort: Rating"
                : activeFilter === "Open Now"
                  ? "Filter: Open Now"
                  : "Sort: Nearest"}
            </Text>
          </View>

          <View style={styles.cardList}>
            <DataState loading={loading} error={error} empty={!loading && !error && displayedPlaces.length === 0} onRetry={reload} />

            {displayedPlaces.map((spot, index) => (
              <View key={spot.id || spot.title} style={styles.natureCard}>
                <OptimizedImageBackground
                  source={spot.image}
                  style={[styles.cardImage, index === 3 && styles.tallCardImage]}
                  imageStyle={styles.cardImageRadius}
                  resizeMode="cover"
                >
                  <View style={styles.imageShade} />
                  <View style={styles.badgeRow}>
                    <Text style={styles.badge}>NATURE</Text>
                    <Text style={styles.badge}>BEST IN MORNING</Text>
                  </View>

                  <Pressable
                    style={[
                      styles.favoriteButton,
                      favoriteIds.includes(spot.id || spot.title) &&
                        styles.activeFavoriteButton,
                    ]}
                    onPress={() => onFavoritePress?.(spot)}
                  >
                    <Ionicons
                      name={favoriteIds.includes(spot.id || spot.title) ? "heart" : "heart-outline"}
                      size={22}
                      color={favoriteIds.includes(spot.id || spot.title) ? GOLD : "#E3EFEC"}
                    />
                  </Pressable>
                </OptimizedImageBackground>

                <View style={styles.cardContent}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>{spot.title}</Text>
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={14} color={GOLD} />
                      <Text style={styles.ratingText}>{spot.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.distanceRow}>
                    <Ionicons name="location-outline" size={13} color="#AFC8C4" />
                    <Text style={styles.distanceText}>{spot.distance}</Text>
                  </View>

                  <Text style={styles.description}>{spot.description}</Text>

                  <Pressable
                    style={styles.detailsButton}
                    onPress={() => onNaturePress?.(spot)}
                  >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </Pressable>
                </View>
              </View>
            ))}
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

  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    backgroundColor: APP_BG,
  },

  menuIcon: {
    width: 22,
    height: 18,
    justifyContent: "space-between",
  },

  menuLine: {
    width: "100%",
    height: 2,
    borderRadius: 2,
    backgroundColor: "#AFCBC8",
  },

  logoText: {
    marginLeft: 16,
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    color: "#C8D7D4",
    fontSize: 26,
    lineHeight: 32,
  },

  loginLogoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#D19F65",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  loginLogoIcon: {
    width: 20,
    height: 20,
    tintColor: SOFT_TEAL,
  },

  scrollContent: {
    paddingHorizontal: 21,
    paddingTop: 28,
    paddingBottom: 120,
  },

  title: {
    color: "#D8E2DF",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 27,
    marginBottom: 24,
  },

  searchBox: {
    height: 61,
    borderRadius: 18,
    paddingHorizontal: 17,
    backgroundColor: "#123C39",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  searchText: {
    marginLeft: 13,
    color: "#91A8A5",
    fontSize: 16,
  },
  locationPill: {
    marginBottom: 24,
  },

  filtersRow: {
    gap: 12,
    paddingBottom: 64,
  },

  filterButton: {
    height: 39,
    paddingHorizontal: 23,
    borderRadius: 16,
    backgroundColor: "#333734",
    alignItems: "center",
    justifyContent: "center",
  },

  activeFilterButton: {
    backgroundColor: GOLD,
  },

  filterText: {
    color: "#D3DEDB",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },

  activeFilterText: {
    color: "#123B37",
    fontWeight: "700",
  },

  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  sortText: {
    marginLeft: 7,
    color: "#B9C9C6",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },

  cardList: {
    gap: 24,
  },

  natureCard: {
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#123F3A",
    marginBottom: 2,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  cardImage: {
    height: 255,
  },

  tallCardImage: {
    height: 255,
  },

  cardImageRadius: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.08)",
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 12,
    paddingLeft: 12,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: "hidden",
    color: "#D9EEEA",
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "800",
    backgroundColor: "rgba(82,130,126,0.92)",
  },

  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(227,239,236,0.24)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(13,48,45,0.72)",
  },

  activeFavoriteButton: {
    borderColor: "rgba(255,192,90,0.85)",
    backgroundColor: "rgba(18,63,58,0.95)",
  },

  cardContent: {
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 25,
  },

  cardTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  cardTitle: {
    flex: 1,
    color: "#F2F0E8",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 25,
  },

  ratingRow: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  ratingText: {
    marginLeft: 4,
    color: "#D19F65",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  distanceText: {
    marginLeft: 4,
    color: "#B7C8C5",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },

  description: {
    marginTop: 18,
    minHeight: 42,
    color: "#D3DEDB",
    fontSize: 16,
    lineHeight: 22,
  },

  detailsButton: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: GOLD,
  },

  detailsButtonText: {
    color: "#123B37",
    fontSize: 16,
    fontWeight: "800",
  },






});
