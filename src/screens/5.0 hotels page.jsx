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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const cityHotelImage = require("../../assets/colombo-seven-h-facilities-rt.jpg");
const rooftopHotelImage = require("../../assets/colombo-seven-h-facilities-left.jpg");
const poolHotelImage = require("../../assets/poolside-exterior-view-1076x818.jpg");
const gardenHotelImage = require("../../assets/Home-Main-1742X871.jpg");
const navHomeIcon = require("../../assets/nav-home.png");
const navCompassIcon = require("../../assets/nav-compass.png");
const navMapIcon = require("../../assets/nav-map.png");
const navLoveIcon = require("../../assets/nav-love.png");
const navUserIcon = require("../../assets/nav-user.png");
const navLoginIcon = require("../../assets/nav-login.png");

const hotels = [
  {
    id: 1,
    title: "Nearby City Hotel",
    image: cityHotelImage,
    rating: "4.9",
    reviews: "120 reviews",
    distance: "0.8 km from your location",
    description:
      "Experience urban comfort with rooftop views, calm rooms, and easy access to nearby places.",
    amenities: [
      { icon: "wifi", label: "WI-FI", type: "mc" },
      { icon: "parking", label: "PARKING", type: "mc" },
      { icon: "restaurant", label: "DINING", type: "ion" },
    ],
  },
  {
    id: 2,
    title: "Nearby Rooftop Stay",
    image: rooftopHotelImage,
    rating: "4.7",
    reviews: "85 reviews",
    distance: "2.4 km from your location",
    description:
      "A peaceful stay with skyline views, relaxed dining spaces, and a calm city atmosphere.",
    amenities: [
      { icon: "pool", label: "POOL", type: "mc" },
      { icon: "spa", label: "SPA", type: "mc" },
      { icon: "wifi", label: "WI-FI", type: "mc" },
    ],
  },
  {
    id: 3,
    title: "Nearby Pool Resort",
    image: poolHotelImage,
    rating: "4.8",
    reviews: "98 reviews",
    distance: "3.1 km from your location",
    description:
      "Enjoy a relaxing hotel stay with poolside comfort, open views, and premium facilities.",
    amenities: [
      { icon: "pool", label: "POOL", type: "mc" },
      { icon: "local-parking", label: "PARKING", type: "ion" },
      { icon: "wifi", label: "WI-FI", type: "mc" },
    ],
  },
  {
    id: 4,
    title: "Nearby Garden Villa",
    image: gardenHotelImage,
    rating: "4.6",
    reviews: "74 reviews",
    distance: "4.0 km from your location",
    description:
      "A boutique hotel surrounded by greenery, ideal for a quiet and comfortable nearby stay.",
    amenities: [
      { icon: "leaf", label: "GARDEN", type: "ion" },
      { icon: "spa", label: "SPA", type: "mc" },
      { icon: "wifi", label: "WI-FI", type: "mc" },
    ],
  },
];

const filters = ["All", "Open Now", "Top Rated"];

export default function HotelsPage({
  onMenuPress,
  onHotelPress,
  onFavoritePress,
  onNavPress,
  favoriteIds = [],
  hasLocationPermission = true,
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#0B1211" />

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
          <Text style={styles.title}>Hotels Near You</Text>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={22} color="#AFC8C4" />
            <TextInput
              placeholder="Search nearby hotels"
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

          {hotels.map((hotel) => (
            <View key={hotel.id} style={styles.hotelCard}>
              <ImageBackground
                source={hotel.image}
                style={styles.hotelImage}
                imageStyle={styles.hotelImageRadius}
                resizeMode="cover"
              >
                <View style={styles.imageOverlay} />

                <Pressable
                  style={[
                    styles.favoriteButton,
                    favoriteIds.includes(hotel.id || hotel.title) &&
                      styles.activeFavoriteButton,
                  ]}
                  onPress={() => onFavoritePress?.(hotel)}
                >
                  <Ionicons
                    name={favoriteIds.includes(hotel.id || hotel.title) ? "heart" : "heart-outline"}
                    size={25}
                    color={favoriteIds.includes(hotel.id || hotel.title) ? "#FFC05A" : "#DCE8E5"}
                  />
                </Pressable>

                <View style={styles.hotelImageContent}>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={14} color="#FFC05A" />
                    <Text style={styles.ratingText}>
                      {hotel.rating} ({hotel.reviews})
                    </Text>
                  </View>

                  <Text style={styles.hotelTitle}>{hotel.title}</Text>
                </View>
              </ImageBackground>

              <View style={styles.hotelInfo}>
                <View style={styles.distanceRow}>
                  <Ionicons name="location-outline" size={17} color="#AFC8C4" />
                  <Text style={styles.distanceText}>{hotel.distance}</Text>
                </View>

                <Text style={styles.description}>{hotel.description}</Text>

                <View style={styles.amenitiesRow}>
                  {hotel.amenities.map((item) => (
                    <View key={`${hotel.id}-${item.label}`} style={styles.amenityItem}>
                      {item.type === "mc" ? (
                        <MaterialCommunityIcons
                          name={item.icon}
                          size={25}
                          color="#9FB8B4"
                        />
                      ) : (
                        <Ionicons name={item.icon} size={24} color="#9FB8B4" />
                      )}
                      <Text style={styles.amenityText}>{item.label}</Text>
                    </View>
                  ))}
                </View>

                <Pressable
                  style={styles.detailsButton}
                  onPress={() => onHotelPress?.(hotel)}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </Pressable>
              </View>
            </View>
          ))}

          <View style={styles.offerCard}>
            <Text style={styles.offerLabel}>MEMBER SPECIAL</Text>
            <Text style={styles.offerTitle}>Get 20% Off Your First Stay</Text>
            <Text style={styles.offerDescription}>
              Join our travel club and unlock exclusive rates at top-tier hotels in
              your immediate area.
            </Text>

            <Pressable style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Claim Offer</Text>
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
    backgroundColor: "#0B1211",
  },

  screen: {
    flex: 1,
    backgroundColor: "#0B1211",
  },

  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#0B1211",
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
    fontSize: 26,
    lineHeight: 32,
    color: "#C8D7D4",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
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
    tintColor: "#B6D9D6",
  },

  scrollContent: {
    paddingHorizontal: 21,
    paddingTop: 28,
    paddingBottom: 120,
  },

  title: {
    fontSize: 27,
    color: "#D8E2DF",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
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

  searchInput: {
    flex: 1,
    marginLeft: 13,
    color: "#E7EFED",
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
    backgroundColor: "#FFC05A",
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

  hotelCard: {
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#123F3A",
    marginBottom: 26,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  hotelImage: {
    height: 255,
    justifyContent: "flex-end",
  },

  hotelImageRadius: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.34)",
  },

  favoriteButton: {
    position: "absolute",
    top: 17,
    right: 17,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "rgba(210, 232, 228, 0.3)",
    backgroundColor: "rgba(20, 72, 66, 0.75)",
    alignItems: "center",
    justifyContent: "center",
  },

  activeFavoriteButton: {
    borderColor: "rgba(255, 192, 90, 0.85)",
    backgroundColor: "rgba(18, 63, 58, 0.95)",
  },

  hotelImageContent: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "700",
    color: "#E1B15F",
  },

  hotelTitle: {
    fontSize: 25,
    color: "#F2F0E8",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },

  hotelInfo: {
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 25,
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  distanceText: {
    marginLeft: 8,
    color: "#C5D4D1",
    fontSize: 15.5,
    fontWeight: "600",
  },

  description: {
    color: "#D3DEDB",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },

  amenitiesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 28,
    marginBottom: 32,
  },

  amenityItem: {
    alignItems: "center",
  },

  amenityText: {
    marginTop: 4,
    color: "#AFC1BD",
    fontSize: 12,
    fontWeight: "700",
  },

  detailsButton: {
    height: 45,
    borderRadius: 14,
    backgroundColor: "#FFC05A",
    alignItems: "center",
    justifyContent: "center",
  },

  detailsButtonText: {
    color: "#123B37",
    fontSize: 16,
    fontWeight: "800",
  },

  offerCard: {
    borderRadius: 22,
    paddingHorizontal: 33,
    paddingVertical: 33,
    backgroundColor: "#123C39",
    borderWidth: 1,
    borderColor: "rgba(175, 200, 196, 0.22)",
  },

  offerLabel: {
    color: "#FFC05A",
    fontSize: 13,
    marginBottom: 14,
  },

  offerTitle: {
    color: "#E8EFED",
    fontSize: 32,
    lineHeight: 42,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 20,
  },

  offerDescription: {
    color: "#D5E0DD",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 32,
  },

  offerButton: {
    height: 48,
    borderRadius: 15,
    backgroundColor: "#273D3B",
    alignItems: "center",
    justifyContent: "center",
  },

  offerButtonText: {
    color: "#F0F6F4",
    fontSize: 16,
    fontWeight: "700",
  },






});
