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
import LocationPill from "../components/LocationPill";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const navHomeIcon = require("../../assets/nav-home.png");
const navCompassIcon = require("../../assets/nav-compass.png");
const navMapIcon = require("../../assets/nav-map.png");
const navLoveIcon = require("../../assets/nav-love.png");
const navUserIcon = require("../../assets/nav-user.png");
const navLoginIcon = require("../../assets/nav-login.png");

const hotelPoolImage = require("../../assets/explore-hotel-pool.jpg");
const coastPalmsImage = require("../../assets/explore-coast-palms.jpg");
const queensHotelImage = require("../../assets/explore-queens-hotel.jpg");
const historicalGateImage = require("../../assets/historical-ruins-columns.jpg");

const APP_BG = "#0B1211";
const PANEL_BG = "#151A18";
const CARD_BG = "#123F3A";
const CARD_BG_DARK = "#0D2C29";
const MUTED_GREEN = "#4F8178";
const GOLD = "#F5C965";
const TEXT = "#F4F6F2";
const MUTED_TEXT = "#B9C4BE";
const BORDER = "#245F58";

const navItems = [
  { icon: navHomeIcon, label: "Home", key: "Home" },
  { icon: navCompassIcon, label: "Explore", key: "Explore", active: true },
  { icon: navMapIcon, label: "Map", key: "Map" },
  { icon: navLoveIcon, label: "Favorites", key: "Favorites" },
  { icon: navUserIcon, label: "Profile", key: "Profile" },
];

const explorePlaces = [
  {
    id: "explore-azure-palms-resort",
    title: "Azure Palms Resort",
    type: "HOTELS",
    distance: "2.4 km away",
    status: "Open Now",
    rating: "4.9",
    image: hotelPoolImage,
  },
  {
    id: "explore-mist-valley-falls",
    title: "Mist Valley Falls",
    type: "NATURE",
    distance: "5.1 km away",
    rating: "4.7",
    image: coastPalmsImage,
  },
  {
    id: "explore-old-citadel-gate",
    title: "Old Citadel Gate",
    type: "HISTORICAL",
    distance: "1.2 km away",
    status: "Closing Soon",
    rating: "4.8",
    image: historicalGateImage,
  },
  {
    id: "explore-eco-sanctuary",
    title: "Eco Sanctuary",
    type: "HOTELS",
    distance: "3.8 km away",
    rating: "4.6",
    image: queensHotelImage,
  },
];

const filterPills = ["All", "Open Now", "Top Rated", "Nearby"];
const sortTabs = ["Nearest", "Top Rated", "Open Now", "42 Results"];

export default function ExplorePage({
  onNavPress,
  onMenuPress,
  onFavoritePress,
  favoriteIds = [],
  hasLocationPermission = true,
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable style={styles.menuIcon} onPress={onMenuPress} hitSlop={10}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </Pressable>

          <Text style={styles.logoText}>NearLanka</Text>

          <Pressable
            style={styles.loginLogoButton}
            onPress={() => onNavPress?.("Profile")}
          >
            <Image source={navLoginIcon} style={styles.loginLogoIcon} resizeMode="contain" />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Explore Places Around{`\n`}You</Text>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={22} color={MUTED_TEXT} />
            <Text style={styles.searchText}>Search destinations...</Text>
            <MaterialCommunityIcons name="tune-variant" size={23} color={MUTED_TEXT} />
          </View>

          {hasLocationPermission ? (
            <LocationPill style={styles.locationPill} />
          ) : null}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {filterPills.map((filter, index) => (
              <Pressable
                key={filter}
                style={[styles.filterPill, index === 0 && styles.activeFilterPill]}
              >
                <Text
                  style={[styles.filterText, index === 0 && styles.activeFilterText]}
                >
                  {filter}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.sortRow}>
            {sortTabs.map((tab, index) => (
              <Text key={tab} style={[styles.sortText, index === 0 && styles.activeSortText]}>
                {tab}{index === 0 ? "  " : ""}
                {index === 0 && <Ionicons name="chevron-down" size={11} color={GOLD} />}
              </Text>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.cardList}>
            {explorePlaces.map((place) => {
              const isFavorite = favoriteIds.includes(place.id) ||
                favoriteIds.includes(place.title);

              return (
                <ExploreCard
                  key={place.id}
                  place={place}
                  isFavorite={isFavorite}
                  onFavoritePress={onFavoritePress}
                />
              );
            })}
          </View>
        </ScrollView>

        <BottomNav activeKey="Explore" onNavPress={onNavPress} />
      </View>
    </SafeAreaView>
  );
}

function ExploreCard({ place, isFavorite, onFavoritePress }) {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={place.image}
        style={styles.cardImage}
        imageStyle={styles.cardImageRadius}
        resizeMode="cover"
      >
        <View style={styles.imageShade} />
        <Pressable
          style={[styles.favoriteButton, isFavorite && styles.activeFavoriteButton]}
          onPress={() => onFavoritePress?.(place)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={25}
            color={isFavorite ? GOLD : TEXT}
          />
        </Pressable>
      </ImageBackground>

      <View style={styles.cardContent}>
        <View style={styles.cardTopRow}>
          <Text style={styles.category}>{place.type}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={13} color={GOLD} />
            <Text style={styles.ratingText}>{place.rating}</Text>
          </View>
        </View>

        <Text style={styles.cardTitle}>{place.title}</Text>

        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={14} color={MUTED_TEXT} />
          <Text style={styles.metaText}>{place.distance}</Text>
          {!!place.status && (
            <>
              <Ionicons name="time-outline" size={14} color={MUTED_TEXT} style={styles.timeIcon} />
              <Text style={styles.metaText}>{place.status}</Text>
            </>
          )}
        </View>
      </View>
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
    flex: 1,
    marginLeft: 16,
    color: "#C8D7D4",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 26,
    lineHeight: 32,
  },

  loginLogoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  loginLogoIcon: {
    width: 20,
    height: 20,
    tintColor: "#B6D9D6",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 106,
    backgroundColor: PANEL_BG,
  },

  title: {
    color: "#D8E2DF",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 27,
    lineHeight: 34,
  },

  searchBox: {
    height: 50,
    borderRadius: 25,
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#303330",
  },

  searchText: {
    flex: 1,
    marginLeft: 12,
    color: MUTED_TEXT,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },

  locationPill: {
    marginTop: 15,
  },

  filterRow: {
    gap: 20,
    paddingTop: 24,
    paddingBottom: 22,
    paddingRight: 34,
  },

  filterPill: {
    height: 36,
    minWidth: 82,
    paddingHorizontal: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MUTED_GREEN,
  },

  activeFilterPill: {
    minWidth: 58,
    backgroundColor: GOLD,
  },

  filterText: {
    color: "#D9E2DF",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },

  activeFilterText: {
    color: "#1D211F",
  },

  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
    marginTop: 1,
  },

  sortText: {
    color: MUTED_TEXT,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "700",
  },

  activeSortText: {
    color: GOLD,
  },

  divider: {
    height: 1,
    marginTop: 13,
    marginBottom: 25,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  cardList: {
    gap: 24,
  },

  card: {
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(36,95,88,0.65)",
    backgroundColor: CARD_BG,
  },

  cardImage: {
    height: 220,
  },

  cardImageRadius: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.12)",
  },

  favoriteButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(244,246,242,0.20)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(18,45,42,0.72)",
  },

  activeFavoriteButton: {
    borderColor: "rgba(245,201,101,0.85)",
    backgroundColor: "rgba(18,63,58,0.95)",
  },

  cardContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 24,
    backgroundColor: CARD_BG_DARK,
  },

  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  category: {
    color: GOLD,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },

  ratingBadge: {
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(7,17,15,0.58)",
  },

  ratingText: {
    marginLeft: 4,
    color: TEXT,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },

  cardTitle: {
    marginTop: 8,
    color: TEXT,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 22,
    lineHeight: 28,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  metaText: {
    marginLeft: 4,
    color: MUTED_TEXT,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },

  timeIcon: {
    marginLeft: 16,
  },







});
