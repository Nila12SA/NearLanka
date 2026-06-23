import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomNav from "../components/BottomNav";
import LocationPill from "../components/LocationPill";
import { Ionicons } from "@expo/vector-icons";

const sigiriyaImage = require("../../assets/historical-sigiriya.jpg");
const templeImage = require("../../assets/historical-temple.jpg");
const ruinsColumnsImage = require("../../assets/historical-ruins-columns.jpg");
const ancientStatueImage = require("../../assets/historical-ancient-statue.jpg");
const navHomeIcon = require("../../assets/nav-home.png");
const navCompassIcon = require("../../assets/nav-compass.png");
const navMapIcon = require("../../assets/nav-map.png");
const navLoveIcon = require("../../assets/nav-love.png");
const navUserIcon = require("../../assets/nav-user.png");
const navLoginIcon = require("../../assets/nav-login.png");

const APP_BG = "#0B1211";
const CARD_BG = "#101817";
const TEAL = "#123C39";
const SOFT_TEAL = "#B6D9D6";
const GOLD = "#FFC05A";

const filters = ["All", "Open Now", "Top Rated"];

const historicalPlaces = [
  {
    id: "historical-sigiriya",
    title: "Ancient Citadel of Sigiriya",
    type: "HISTORICAL",
    rating: "4.9",
    distance: "1.2 km away",
    status: "Open Now",
    statusActive: true,
    description:
      "Explore the ruins of a 5th-century royal palace atop a massive rock column,...",
    image: sigiriyaImage,
    featured: true,
  },
  {
    id: "historical-temple-of-tooth",
    title: "Sacred Temple of the Tooth",
    type: "HISTORICAL",
    rating: "4.7",
    distance: "2.8 km away",
    status: "Opens at 08:00",
    description:
      "A world-renowned religious site housing the sacred tooth relic of...",
    image: templeImage,
  },
  {
    id: "historical-galle-fort",
    title: "Galle Heritage Fort",
    type: "HISTORICAL",
    rating: "4.8",
    distance: "4.5 km away",
    status: "Open Now",
    statusActive: true,
    description:
      "A living museum with a blend of European and South Asian styles,...",
    image: ruinsColumnsImage,
  },
  {
    id: "historical-dambulla-cave-temple",
    title: "Dambulla Cave Temple",
    type: "HISTORICAL",
    rating: "4.6",
    distance: "5.1 km away",
    status: "Open Now",
    statusActive: true,
    description:
      "Largest rock temple complex in Sri Lanka, boasting five sanctuaries filled...",
    image: ancientStatueImage,
  },
];

const navItems = [
  { icon: navHomeIcon, label: "Home", key: "Home" },
  { icon: navCompassIcon, label: "Explore", key: "Explore", active: true },
  { icon: navMapIcon, label: "Map", key: "Map" },
  { icon: navLoveIcon, label: "Favorites", key: "Favorites" },
  { icon: navUserIcon, label: "Profile", key: "Profile" },
];

export default function HistoricalPage({
  onMenuPress,
  onNavPress,
  onHistoricalPress,
  onFavoritePress,
  favoriteIds = [],
  hasLocationPermission = true,
}) {
  const [activeFilter, setActiveFilter] = useState("All");

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
            <Image
              source={navLoginIcon}
              style={styles.loginLogoIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Historical Places Near You</Text>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={22} color="#AFC8C4" />
            <TextInput
              placeholder="Search nearby historical places"
              placeholderTextColor="#91A8A5"
              style={styles.searchInput}
            />
          </View>

          {hasLocationPermission ? (
            <LocationPill
              text="Near your current location"
              iconName="navigate-outline"
              style={styles.locationPill}
            />
          ) : null}

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

          <View style={styles.cardList}>
            {historicalPlaces.slice(0, 3).map((place) => (
              <HistoricalCard
                key={place.id}
                place={place}
                onHistoricalPress={onHistoricalPress}
                onFavoritePress={onFavoritePress}
                favoriteIds={favoriteIds}
              />
            ))}

            <View style={styles.mapExploreCard}>
              <View style={styles.mapGridOne} />
              <View style={styles.mapGridTwo} />
              <View style={styles.mapGlow} />

              <Text style={styles.mapTitle}>Explore the Map</Text>

              <Text style={styles.mapText}>
                Discover 12 more heritage sites within walking distance of your
                current stay.
              </Text>

              <Pressable style={styles.mapButton}>
                <Text style={styles.mapButtonText}>Open Interactive Map</Text>
              </Pressable>
            </View>

            <HistoricalCard
              place={historicalPlaces[3]}
              onHistoricalPress={onHistoricalPress}
              onFavoritePress={onFavoritePress}
                favoriteIds={favoriteIds}
              />
          </View>
        </ScrollView>

        <BottomNav activeKey="Explore" onNavPress={onNavPress} />
      </View>
    </SafeAreaView>
  );
}

function HistoricalCard({
  place,
  onHistoricalPress,
  onFavoritePress,
  favoriteIds = [],
}) {
  const isFavorite = favoriteIds.includes(place.id || place.title);

  return (
    <View style={styles.placeCard}>
      <ImageBackground
        source={place.image}
        style={styles.placeImage}
        imageStyle={styles.placeImageRadius}
        resizeMode="cover"
      >
        <View style={styles.imageOverlay} />

        <Pressable
          style={[styles.favoriteButton, isFavorite && styles.activeFavoriteButton]}
          onPress={() => onFavoritePress?.(place)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={23}
            color={isFavorite ? GOLD : "#DCE8E5"}
          />
        </Pressable>

        <View style={styles.cardBottomContent}>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={13} color={GOLD} />
            <Text style={styles.metaText}>{place.rating}</Text>
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>{place.distance}</Text>
          </View>

          <Text style={styles.placeTitle}>{place.title}</Text>
          <Text style={styles.placeDescription}>{place.description}</Text>

          <View style={styles.cardFooter}>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  place.statusActive && styles.activeStatusDot,
                ]}
              />
              <Text style={styles.statusText}>{place.status}</Text>
            </View>

            <Pressable
              style={styles.detailsButton}
              onPress={() => onHistoricalPress?.(place)}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
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
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 116,
  },

  title: {
    color: "#D8E2DF",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 22,
  },

  searchBox: {
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: "#244E4B",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: "#E1E9E6",
    fontSize: 15,
    paddingVertical: 0,
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
    fontSize: 16,
    fontWeight: "700",
    color: "#D3DEDB",
  },

  activeFilterText: {
    color: "#123B37",
    fontWeight: "700",
  },

  cardList: {
    gap: 22,
  },

  placeCard: {
    height: 345,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: CARD_BG,
    shadowColor: "#000",
    shadowOpacity: 0.32,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 14 },
    elevation: 9,
  },

  placeImage: {
    flex: 1,
    justifyContent: "space-between",
  },

  placeImageRadius: {
    borderRadius: 20,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.42)",
  },

  favoriteButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(220,232,229,0.24)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(18,60,57,0.78)",
  },

  activeFavoriteButton: {
    borderColor: "rgba(255,192,90,0.85)",
    backgroundColor: "rgba(18,63,58,0.95)",
  },

  cardBottomContent: {
    marginTop: "auto",
    paddingHorizontal: 20,
    paddingBottom: 18,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  metaText: {
    marginLeft: 5,
    color: "#D4B36B",
    fontSize: 12,
    fontWeight: "800",
  },

  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: 9,
    backgroundColor: "rgba(255,255,255,0.45)",
  },

  placeTitle: {
    color: "#F2F0E8",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 22,
    lineHeight: 28,
  },

  placeDescription: {
    marginTop: 6,
    color: "#D4DDDA",
    fontSize: 14,
    lineHeight: 19,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.55)",
  },

  activeStatusDot: {
    backgroundColor: "#9CE6E1",
  },

  statusText: {
    marginLeft: 6,
    color: "#B7C8C5",
    fontSize: 12,
    fontWeight: "800",
  },

  detailsButton: {
    height: 38,
    minWidth: 125,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GOLD,
  },

  detailsButtonText: {
    color: "#123B37",
    fontSize: 14,
    fontWeight: "800",
  },

  mapExploreCard: {
    height: 220,
    borderRadius: 18,
    overflow: "hidden",
    paddingHorizontal: 28,
    paddingTop: 36,
    backgroundColor: TEAL,
    borderWidth: 1,
    borderColor: "rgba(83,166,158,0.25)",
  },

  mapGridOne: {
    position: "absolute",
    left: 58,
    top: -40,
    bottom: -40,
    width: 1,
    backgroundColor: "rgba(209,159,101,0.32)",
    transform: [{ rotate: "21deg" }],
  },

  mapGridTwo: {
    position: "absolute",
    left: -20,
    right: -20,
    top: 92,
    height: 1,
    backgroundColor: "rgba(209,159,101,0.3)",
    transform: [{ rotate: "-18deg" }],
  },

  mapGlow: {
    position: "absolute",
    right: 34,
    bottom: 22,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,192,90,0.12)",
  },

  mapTitle: {
    color: "#F2F0E8",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 22,
    lineHeight: 28,
  },

  mapText: {
    width: "80%",
    marginTop: 8,
    color: "#D4DDDA",
    fontSize: 14,
    lineHeight: 20,
  },

  mapButton: {
    alignSelf: "flex-start",
    marginTop: 20,
    height: 43,
    borderRadius: 14,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6E9792",
  },

  mapButtonText: {
    color: "#EAF2EF",
    fontSize: 14,
    fontWeight: "800",
  },






});
