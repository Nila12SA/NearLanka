import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, rgba } from "../theme/colors";
import { typography } from "../theme/typography";

const teaEstateImage = require("../../assets/home-tea-estate.jpg");
const trainBridgeImage = require("../../assets/home-nine-arch-train.jpg");
const mountainViewImage = require("../../assets/home-mountain-view.jpg");
const navUserIcon = require("../../assets/nav-user.png");
const locationIcon = require("../../assets/home-location-icon.png");
const navHomeIcon = require("../../assets/nav-home.png");
const navCompassIcon = require("../../assets/nav-compass.png");
const navMapIcon = require("../../assets/nav-map.png");
const navLoveIcon = require("../../assets/nav-love.png");
const navLoginIcon = require("../../assets/nav-login.png");

const APP_BG = "#0B1211";
const CARD_BG = "#123C39";
const DARK_CARD = "#1C1D1B";
const ACCENT_TEAL = "#B6D9D6";
const GOLD = "#D19F65";

const filters = ["All", "Hotels", "Nature", "Historical"];

const navItems = [
  { icon: navHomeIcon, label: "Home", isActive: true },
  { icon: navCompassIcon, label: "Explore", isActive: false },
  { icon: navMapIcon, label: "Map", isActive: false },
  { icon: navLoveIcon, label: "Favorites", isActive: false },
  { icon: navUserIcon, label: "Profile", isActive: false },
];

const nearbyPlaces = [
  {
    title: "Emerald Peak Retreat",
    category: "NATURE",
    distance: "1.2 km away",
    rating: "4.9",
    image: teaEstateImage,
  },
  {
    title: "Azure Coast Villa",
    category: "HOTEL",
    distance: "2.5 km away",
    rating: "4.8",
    image: trainBridgeImage,
  },
];

const popularPlaces = [
  {
    title: "Saffron Coast Dining",
    subtitle: "Signature Seafood Experience",
    distance: "3.2 KM",
    rating: "4.9",
    image: trainBridgeImage,
  },
  {
    title: "Secret Cove Beach",
    subtitle: "Untouched Natural Beauty",
    distance: "1.8 KM",
    rating: "5.0",
    image: mountainViewImage,
  },
];

const recentlyViewed = [
  {
    title: "Ancient Temple Ruins",
    viewed: "Viewed 2h ago",
    image: trainBridgeImage,
  },
  {
    title: "Highland Tea Trail",
    viewed: "Viewed 5h ago",
    image: teaEstateImage,
  },
];

export default function HomePage({ onHotelsPress, onCategoryPress }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>

          <Text style={styles.logoText}>NearLanka</Text>
          <View style={styles.loginLogoButton}>
            <Image
              source={navLoginIcon}
              style={styles.loginLogoIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.locationChip}>
            <Image source={locationIcon} style={styles.locationIcon} resizeMode="contain" />
            <Text style={styles.locationText}>Using your current location</Text>
          </View>

          <Text style={styles.heroTitle}>Explore Nearby Sri Lankan Places</Text>

          <Text style={styles.heroDescription}>
            Find hotels, nature spots, and historical places near your current
            location.
          </Text>

          <View style={styles.searchPanel}>
            <View style={styles.searchBox}>
              <Text style={styles.searchText}>Search</Text>
              <Text style={styles.searchPlaceholder}>Search nearby places</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterRow}
            >
              {filters.map((filter, index) => (
                <Pressable
                  key={filter}
                  onPress={() => {
                    onCategoryPress?.(filter);

                    if (filter === "Hotels") {
                      onHotelsPress?.();
                    }
                  }}
                  style={[
                    styles.filterPill,
                    index === 0 && styles.activeFilterPill,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      index === 0 && styles.activeFilterText,
                    ]}
                  >
                    {filter}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitleNoTop}>Near You</Text>
              <Text style={styles.sectionSubtitle}>Within 5km radius</Text>
            </View>
            <Text style={styles.seeAllText}>See All &gt;</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.nearbyRow}
          >
            {nearbyPlaces.map((place) => (
              <View key={place.title} style={styles.nearbyCard}>
                <ImageBackground
                  source={place.image}
                  style={styles.nearbyImage}
                  imageStyle={styles.nearbyImageRadius}
                  resizeMode="cover"
                >
                  <View style={styles.favoriteButton}>
                    <Text style={styles.favoriteText}>Save</Text>
                  </View>

                  <View style={styles.nearbyOverlay}>
                    <View style={styles.metaRow}>
                      <Text style={styles.categoryPill}>{place.category}</Text>
                      <Text style={styles.ratingText}>* {place.rating}</Text>
                    </View>

                    <Text style={styles.cardTitle}>{place.title}</Text>
                    <Text style={styles.distanceText}>LOC {place.distance}</Text>

                    <Pressable style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>View Details</Text>
                    </Pressable>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Popular Near You</Text>

          <View style={styles.popularList}>
            {popularPlaces.map((place) => (
              <View key={place.title} style={styles.popularCard}>
                <Image source={place.image} style={styles.popularImage} />

                <View style={styles.popularContent}>
                  <View style={styles.popularTitleRow}>
                    <Text style={styles.popularTitle}>{place.title}</Text>
                    <Text style={styles.popularRating}>* {place.rating}</Text>
                  </View>

                  <Text style={styles.popularSubtitle}>{place.subtitle}</Text>
                  <Text style={styles.popularDistance}>{place.distance}</Text>
                </View>

                <Text style={styles.arrowText}>&gt;</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Recommended</Text>

          <ImageBackground
            source={mountainViewImage}
            style={styles.recommendCard}
            imageStyle={styles.recommendImageRadius}
            resizeMode="cover"
          >
            <View style={styles.recommendShade} />

            <View style={styles.recommendContent}>
              <Text style={styles.recommendPill}>CURATED FOR YOU</Text>
              <Text style={styles.recommendTitle}>Nirvana Wellness Spa</Text>
              <Text style={styles.recommendText}>
                Rejuvenate your soul with ancient Ayurvedic practices.
              </Text>
              <Text style={styles.bookText}>Book Experience &gt;</Text>
            </View>
          </ImageBackground>

          <Text style={styles.sectionTitle}>Recently Viewed</Text>

          <View style={styles.recentGrid}>
            {recentlyViewed.map((item) => (
              <View key={item.title} style={styles.recentCard}>
                <Image source={item.image} style={styles.recentImage} />
                <Text style={styles.recentTitle}>{item.title}</Text>
                <Text style={styles.recentViewed}>{item.viewed}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Map</Text>
        </View>

        <View style={styles.bottomNav}>
          {navItems.map(({ icon, label, isActive }) => (
            <View key={label} style={styles.navItem}>
              <Image
                source={icon}
                style={[styles.navIcon, isActive && styles.activeNavIcon]}
                resizeMode="contain"
              />
              <Text style={[styles.navLabel, isActive && styles.activeNavText]}>
                {label}
              </Text>
            </View>
          ))}
        </View>
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
    fontFamily: typography.fontFamily.heading,
    color: "#C8D7D4",
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
    tintColor: ACCENT_TEAL,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 150,
  },

  locationChip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(175,203,200,0.24)",
    backgroundColor: "#273D3B",
  },

  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 7,
  },

  locationText: {
    fontFamily: typography.fontFamily.body,
    color: "#B5D0CE",
    fontSize: 15,
    lineHeight: 20,
  },

  heroTitle: {
    maxWidth: 302,
    marginTop: 18,
    fontFamily: typography.fontFamily.heading,
    color: colors.neutral[50],
    fontSize: 34,
    lineHeight: 42,
    fontWeight: typography.fontWeight.regular,
  },

  heroDescription: {
    maxWidth: 315,
    marginTop: 8,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.72),
    fontSize: 16,
    lineHeight: 22,
  },

  searchPanel: {
    marginTop: 58,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(83,166,158,0.26)",
    backgroundColor: CARD_BG,
  },

  searchBox: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: DARK_CARD,
  },

  searchText: {
    fontFamily: typography.fontFamily.body,
    color: GOLD,
    fontSize: 14,
    marginRight: 10,
  },

  searchPlaceholder: {
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.5),
    fontSize: 15,
  },

  filterRow: {
    gap: 10,
    paddingTop: 14,
  },

  filterPill: {
    minWidth: 84,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "#333734",
  },

  activeFilterPill: {
    backgroundColor: ACCENT_TEAL,
  },

  filterText: {
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.72),
    fontSize: 15,
  },

  activeFilterText: {
    color: "#183633",
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 46,
  },

  sectionTitleNoTop: {
    fontFamily: typography.fontFamily.heading,
    color: colors.neutral[50],
    fontSize: 24,
    lineHeight: 30,
    fontWeight: typography.fontWeight.regular,
  },

  sectionTitle: {
    marginTop: 36,
    fontFamily: typography.fontFamily.heading,
    color: colors.neutral[50],
    fontSize: 24,
    lineHeight: 30,
    fontWeight: typography.fontWeight.regular,
  },

  sectionSubtitle: {
    marginTop: 2,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.62),
    fontSize: 14,
    lineHeight: 20,
  },

  seeAllText: {
    fontFamily: typography.fontFamily.body,
    color: "#A6C8C5",
    fontSize: 14,
    lineHeight: 20,
  },

  nearbyRow: {
    gap: 16,
    paddingTop: 22,
    paddingRight: 20,
  },

  nearbyCard: {
    width: 258,
    height: 340,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#111312",
  },

  nearbyImage: {
    flex: 1,
    justifyContent: "space-between",
  },

  nearbyImageRadius: {
    borderRadius: 20,
  },

  favoriteButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(14,69,59,0.72)",
  },

  favoriteText: {
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[50],
    fontSize: 11,
    lineHeight: 14,
  },

  nearbyOverlay: {
    marginTop: "auto",
    padding: 18,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: "hidden",
    fontFamily: typography.fontFamily.body,
    color: ACCENT_TEAL,
    fontSize: 12,
    lineHeight: 16,
    backgroundColor: "rgba(14,69,59,0.78)",
  },

  ratingText: {
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[50],
    fontSize: 14,
    lineHeight: 18,
  },

  cardTitle: {
    marginTop: 10,
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[50],
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },

  distanceText: {
    marginTop: 2,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.78),
    fontSize: 13,
    lineHeight: 18,
  },

  detailsButton: {
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: "#F0C46C",
  },

  detailsButtonText: {
    fontFamily: typography.fontFamily.body,
    color: APP_BG,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },

  popularList: {
    gap: 14,
    marginTop: 18,
  },

  popularCard: {
    minHeight: 118,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(83,166,158,0.22)",
    backgroundColor: CARD_BG,
  },

  popularImage: {
    width: 88,
    height: 88,
    borderRadius: 8,
  },

  popularContent: {
    flex: 1,
    marginLeft: 14,
  },

  popularTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  popularTitle: {
    flex: 1,
    fontFamily: typography.fontFamily.body,
    color: ACCENT_TEAL,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },

  popularRating: {
    marginLeft: 8,
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[50],
    fontSize: 13,
    lineHeight: 18,
  },

  popularSubtitle: {
    marginTop: 2,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.72),
    fontSize: 13,
    lineHeight: 18,
  },

  popularDistance: {
    marginTop: 6,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.68),
    fontSize: 12,
    lineHeight: 16,
  },

  arrowText: {
    marginLeft: 10,
    fontFamily: typography.fontFamily.body,
    color: ACCENT_TEAL,
    fontSize: 26,
    lineHeight: 30,
  },

  recommendCard: {
    height: 320,
    justifyContent: "flex-end",
    marginTop: 18,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#101211",
  },

  recommendImageRadius: {
    borderRadius: 20,
  },

  recommendShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.34)",
  },

  recommendContent: {
    padding: 22,
  },

  recommendPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    fontFamily: typography.fontFamily.body,
    color: ACCENT_TEAL,
    fontSize: 12,
    lineHeight: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  recommendTitle: {
    marginTop: 12,
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[50],
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },

  recommendText: {
    marginTop: 3,
    maxWidth: 250,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.82),
    fontSize: 15,
    lineHeight: 20,
  },

  bookText: {
    marginTop: 18,
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[50],
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },

  recentGrid: {
    flexDirection: "row",
    gap: 16,
    marginTop: 18,
  },

  recentCard: {
    flex: 1,
  },

  recentImage: {
    width: "100%",
    height: 118,
    borderRadius: 10,
  },

  recentTitle: {
    marginTop: 10,
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[50],
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },

  recentViewed: {
    marginTop: 4,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.62),
    fontSize: 12,
    lineHeight: 16,
  },

  mapButton: {
    position: "absolute",
    right: 28,
    bottom: 82,
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9A35F",
  },

  mapButtonText: {
    fontFamily: typography.fontFamily.body,
    color: APP_BG,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    backgroundColor: APP_BG,
  },

  navItem: {
    minWidth: 58,
    alignItems: "center",
    justifyContent: "center",
  },

  navIcon: {
    width: 22,
    height: 22,
    tintColor: rgba(colors.neutral[50], 0.72),
  },

  activeNavIcon: {
    tintColor: ACCENT_TEAL,
  },

  navLabel: {
    marginTop: 3,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.72),
    fontSize: 12,
    lineHeight: 16,
  },

  activeNavText: {
    color: ACCENT_TEAL,
    fontWeight: "700",
  },
});