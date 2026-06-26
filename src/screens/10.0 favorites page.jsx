import React from "react";
import { OptimizedImage } from "../components/OptimizedImage";
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
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";

const navHomeIcon = require("../../assets/nav-home.png");
const navCompassIcon = require("../../assets/nav-compass.png");
const navMapIcon = require("../../assets/nav-map.png");
const navLoveIcon = require("../../assets/nav-love.png");
const navUserIcon = require("../../assets/nav-user.png");

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

export default function FavoritesPage({
  favorites = [],
  onNavPress,
  onMenuPress,
  onFavoritePress,
  onBack,
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <AppHeader
          onMenuPress={onMenuPress}
        />

        {onBack ? (
          <Pressable style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={22} color="#F2F0E8" />
            <View style={styles.backCopy}>
              <Text style={styles.backText}>Your Favorites</Text>
              <Text style={styles.backDescription}>Places you saved for later</Text>
            </View>
          </Pressable>
        ) : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {!onBack ? <Text style={styles.title}>Your Favorites</Text> : null}
          {!onBack ? <Text style={styles.subtitle}>Places you saved for later</Text> : null}

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
                    <OptimizedImage source={item.image} style={styles.favoriteImage} />
                  )}

                  <View style={styles.favoriteContent}>
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => onFavoritePress?.(item)}
                      hitSlop={8}
                    >
                      <Ionicons name="heart" size={21} color={GOLD} />
                    </Pressable>
                    <Text style={styles.favoriteType}>{item.type || item.category || "PLACE"}</Text>
                    <Text style={styles.favoriteTitle}>{item.title || item.name}</Text>
                    {!!item.distance && (
                      <Text style={styles.favoriteMeta}>{item.distance}</Text>
                    )}
                    {!!item.rating && (
                      <View style={styles.favoriteRatingRow}>
                        <Ionicons name="star" size={13} color={GOLD} />
                        <Text style={styles.favoriteRating}>{item.rating}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        <BottomNav activeKey="Favorites" onNavPress={onNavPress} />
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

  backButton: {
    marginTop: 14,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },

  backCopy: {
    flex: 1,
    marginLeft: 12,
  },

  backDescription: {
    marginTop: 3,
    color: "#AFC8C4",
    fontSize: 13,
    lineHeight: 18,
  },

  backText: {
    color: "#F2F0E8",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
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

  removeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
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

  favoriteRatingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  favoriteRating: {
    marginLeft: 4,
    marginTop: 5,
    color: GOLD,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
  },






});










