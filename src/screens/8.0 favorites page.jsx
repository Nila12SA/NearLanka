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

const navHomeIcon = require("../../assets/nav-home.png");
const navCompassIcon = require("../../assets/nav-compass.png");
const navMapIcon = require("../../assets/nav-map.png");
const navLoveIcon = require("../../assets/nav-love.png");
const navUserIcon = require("../../assets/nav-user.png");
const navLoginIcon = require("../../assets/nav-login.png");

const APP_BG = "#0B1211";
const SOFT_TEAL = "#B6D9D6";
const GOLD = "#FFC05A";

const navItems = [
  { icon: navHomeIcon, label: "Home", key: "Home" },
  { icon: navCompassIcon, label: "Explore", key: "Explore" },
  { icon: navMapIcon, label: "Map", key: "Map" },
  { icon: navLoveIcon, label: "Favorites", key: "Favorites", active: true },
  { icon: navUserIcon, label: "Profile", key: "Profile" },
];

export default function FavoritesPage({ favorites = [], onNavPress, onMenuPress }) {
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
          <Text style={styles.title}>Your Favorites</Text>
          <Text style={styles.subtitle}>Places you saved for later</Text>

          {favorites.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptyText}>
                Tap a heart on any place card to save it here.
              </Text>
            </View>
          ) : (
            <View style={styles.list}>
              {favorites.map((item) => (
                <View key={item.id || item.title} style={styles.favoriteCard}>
                  {item.image && (
                    <Image source={item.image} style={styles.favoriteImage} />
                  )}

                  <View style={styles.favoriteContent}>
                    <Text style={styles.favoriteType}>{item.type || item.category || "PLACE"}</Text>
                    <Text style={styles.favoriteTitle}>{item.title}</Text>
                    {!!item.distance && (
                      <Text style={styles.favoriteMeta}>{item.distance}</Text>
                    )}
                    {!!item.rating && (
                      <Text style={styles.favoriteRating}>* {item.rating}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.bottomNav}>
          {navItems.map((item) => (
            <Pressable
              key={item.key}
              style={styles.navItem}
              onPress={() => onNavPress?.(item.key)}
            >
              <Image
                source={item.icon}
                style={[styles.navIcon, item.active && styles.activeNavIcon]}
                resizeMode="contain"
              />
              <Text style={[styles.navLabel, item.active && styles.activeNavText]}>
                {item.label}
              </Text>
            </Pressable>
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
    paddingBottom: 112,
  },

  title: {
    color: "#D8E2DF",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 28,
    lineHeight: 36,
  },

  subtitle: {
    marginTop: 6,
    color: "#AFC8C4",
    fontSize: 15,
    lineHeight: 21,
  },

  emptyCard: {
    marginTop: 32,
    padding: 24,
    borderRadius: 18,
    backgroundColor: "#123C39",
  },

  emptyTitle: {
    color: "#F2F0E8",
    fontSize: 20,
    fontWeight: "700",
  },

  emptyText: {
    marginTop: 8,
    color: "#D3DEDB",
    fontSize: 15,
    lineHeight: 22,
  },

  list: {
    gap: 16,
    marginTop: 28,
  },

  favoriteCard: {
    flexDirection: "row",
    minHeight: 118,
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: "#123C39",
  },

  favoriteImage: {
    width: 116,
    height: "100%",
  },

  favoriteContent: {
    flex: 1,
    padding: 14,
  },

  favoriteType: {
    color: GOLD,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "800",
  },

  favoriteTitle: {
    marginTop: 6,
    color: "#F2F0E8",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 19,
    lineHeight: 24,
  },

  favoriteMeta: {
    marginTop: 7,
    color: "#B7C8C5",
    fontSize: 13,
    lineHeight: 18,
  },

  favoriteRating: {
    marginTop: 5,
    color: GOLD,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
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
    tintColor: "rgba(255,255,255,0.72)",
  },

  activeNavIcon: {
    tintColor: SOFT_TEAL,
  },

  navLabel: {
    marginTop: 3,
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 16,
  },

  activeNavText: {
    color: SOFT_TEAL,
    fontWeight: "700",
  },
});
