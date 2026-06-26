import React, { useMemo, useState } from "react";
import { OptimizedImage } from "../components/OptimizedImage";
import {
  KeyboardAvoidingView,
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";
import placesData from "../../backend/data/placesData";
import { getPlacesWithDistance } from "../utils/distance";
import { normalizePlaces } from "../utils/places";

const APP_BG = "#0B1211";
const SEARCH_BG = "#2D302E";
const CARD_BG = "#123F3A";
const BORDER = "#245F58";
const ACCENT = "#B6D9D6";
const GOLD = "#D19F65";
const TEXT = "#F4F6F2";
const MUTED = "#B9C4BE";

const suggestions = [
  { icon: "bed-outline", label: "Hotels near me", query: "hotel", type: "ion", active: true },
  { icon: "temple-buddhist", label: "Historical places", query: "historical", type: "mc" },
  { icon: "leaf-outline", label: "Nature places", query: "nature", type: "ion" },
];

const recentSearches = ["Hotel Clarion", "Kelaniya Raja Maha Vihara"];

const normalizeText = (text) =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

export default function SearchPage({
  onNavPress,
  onMenuPress,
  favoriteIds = [],
  onFavoritePress,
  userLocation = null,
}) {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalizeText(query);

  const filteredPlaces = useMemo(() => {
    const places = normalizePlaces(getPlacesWithDistance(placesData, userLocation));

    return places.filter((place) => {
      const searchableText = [
        place.name,
        place.title,
        place.category,
        place.location,
        place.description,
      ]
        .map(normalizeText)
        .join(" ");

      return !normalizedQuery || searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery, userLocation]);

  const hasNoResults =
    normalizedQuery.length > 0 && filteredPlaces.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <AppHeader
          onMenuPress={onMenuPress}
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.searchBox}>
            <Ionicons name="search" size={22} color={ACCENT} />

            <TextInput
              autoFocus
              value={query}
              onChangeText={setQuery}
              placeholder="Search nearby places"
              placeholderTextColor="rgba(244,246,242,0.42)"
              style={styles.searchInput}
              selectionColor={GOLD}
            />

            {query ? (
              <Pressable onPress={() => setQuery("")} hitSlop={10}>
                <Ionicons name="close" size={22} color={MUTED} />
              </Pressable>
            ) : (
              <Ionicons name="mic-outline" size={22} color={MUTED} />
            )}
          </View>

          <Text style={styles.sectionEyebrow}>SUGGESTED</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionRow}
          >
            {suggestions.map((item) => (
              <Pressable
                key={item.label}
                style={[
                  styles.suggestionChip,
                  item.active && styles.activeSuggestionChip,
                ]}
                onPress={() => setQuery(item.query)}
              >
                {item.type === "mc" ? (
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={16}
                    color={item.active ? ACCENT : MUTED}
                  />
                ) : (
                  <Ionicons
                    name={item.icon}
                    size={16}
                    color={item.active ? ACCENT : MUTED}
                  />
                )}

                <Text style={styles.suggestionText}>{item.label}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.recentHeader}>
            <Text style={styles.sectionEyebrow}>RECENT</Text>

            <Pressable onPress={() => setQuery("")}>
              <Text style={styles.clearText}>Clear All</Text>
            </Pressable>
          </View>

          <View style={styles.recentList}>
            {recentSearches.map((item) => (
              <Pressable
                key={item}
                style={styles.recentItem}
                onPress={() => setQuery(item)}
              >
                <Ionicons name="time-outline" size={18} color={ACCENT} />
                <Text style={styles.recentText}>{item}</Text>
                <Ionicons name="close" size={24} color={MUTED} />
              </Pressable>
            ))}
          </View>

          <Text style={styles.nearbyTitle}>
            {normalizedQuery ? `${filteredPlaces.length} Results` : "Nearby You"}
          </Text>

          {hasNoResults ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconCircle}>
                <MaterialCommunityIcons
                  name="magnify-close"
                  size={32}
                  color={ACCENT}
                />
              </View>

              <Text style={styles.emptyTitle}>No places found</Text>

              <Text style={styles.emptyText}>
                We couldn't find matches for your search. Try searching for
                hotels, places, nature, or historical sites.
              </Text>

              <Pressable style={styles.emptyButton} onPress={() => setQuery("")}>
                <Text style={styles.emptyButtonText}>Clear Search</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.cardList}>
              {filteredPlaces.map((place) => {
                const placeId = place.id || place.name || place.title;
                const placeName = place.name || place.title;
                const category = place.category || place.type || "place";

                return (
                  <View key={placeId} style={styles.placeCard}>
                    <OptimizedImage
                      source={place.image}
                      style={styles.placeImage}
                      resizeMode="cover"
                    />

                    <View style={styles.ratingPill}>
                      <Text style={styles.ratingText}>{place.rating}</Text>
                      <Ionicons name="star" size={11} color="#102320" />
                    </View>

                    <View style={styles.cardContent}>
                      <View style={styles.cardTitleRow}>
                        <View style={styles.cardTitleBlock}>
                          <Text style={styles.placeTitle}>{placeName}</Text>

                          <View style={styles.locationRow}>
                            <Ionicons
                              name="location-outline"
                              size={15}
                              color={MUTED}
                            />
                            <Text style={styles.locationText}>
                              {place.location}
                            </Text>
                          </View>
                        </View>

                        <Pressable
                          onPress={() => onFavoritePress?.(place)}
                          hitSlop={10}
                        >
                          <Ionicons
                            name={
                              favoriteIds.includes(placeId)
                                ? "heart"
                                : "heart-outline"
                            }
                            size={25}
                            color={
                              favoriteIds.includes(placeId) ? GOLD : TEXT
                            }
                          />
                        </Pressable>
                      </View>

                      <View style={styles.cardFooter}>
                        <View style={styles.tagRow}>
                          <Text style={styles.tagPill}>
                            {String(category).toUpperCase()}
                          </Text>
                        </View>

                        <Text style={styles.distanceText}>
                          {place.distance || "Nearby"}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>

        <BottomNav activeKey="Explore" onNavPress={onNavPress} />
      </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
    paddingTop: 82,
    paddingBottom: 126,
  },

  searchBox: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 17,
    backgroundColor: SEARCH_BG,
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
    color: TEXT,
    fontSize: 16,
    lineHeight: 21,
  },

  sectionEyebrow: {
    marginTop: 27,
    color: ACCENT,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },

  suggestionRow: {
    gap: 12,
    paddingTop: 13,
    paddingRight: 20,
  },

  suggestionChip: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  activeSuggestionChip: {
    borderColor: "rgba(209,159,101,0.52)",
    backgroundColor: "rgba(18,63,58,0.88)",
  },

  suggestionText: {
    marginLeft: 7,
    color: MUTED,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },

  recentHeader: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  clearText: {
    color: GOLD,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },

  recentList: {
    marginTop: 12,
    gap: 8,
  },

  recentItem: {
    minHeight: 47,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD_BG,
  },

  recentText: {
    flex: 1,
    marginLeft: 12,
    color: TEXT,
    fontSize: 16,
    lineHeight: 22,
  },

  nearbyTitle: {
    marginTop: 35,
    color: ACCENT,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },

  emptyCard: {
    marginTop: 24,
    alignItems: "center",
    paddingHorizontal: 26,
    paddingVertical: 30,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD_BG,
  },

  emptyIconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  emptyTitle: {
    marginTop: 20,
    color: TEXT,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },

  emptyText: {
    marginTop: 8,
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },

  emptyButton: {
    width: "82%",
    height: 42,
    marginTop: 22,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "rgba(182,217,214,0.42)",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyButtonText: {
    color: ACCENT,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },

  cardList: {
    marginTop: 24,
    gap: 24,
  },

  placeCard: {
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD_BG,
  },

  placeImage: {
    width: "100%",
    height: 193,
  },

  ratingPill: {
    position: "absolute",
    right: 14,
    top: 14,
    height: 27,
    minWidth: 63,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 14,
    backgroundColor: GOLD,
  },

  ratingText: {
    color: "#102320",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
  },

  cardContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
  },

  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitleBlock: {
    flex: 1,
  },

  placeTitle: {
    color: TEXT,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },

  locationRow: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    marginLeft: 2,
    color: MUTED,
    fontSize: 14,
    lineHeight: 19,
  },

  cardFooter: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    flex: 1,
    marginRight: 10,
  },

  tagPill: {
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    color: ACCENT,
    backgroundColor: "rgba(79,129,120,0.36)",
    fontSize: 12,
    lineHeight: 16,
  },

  distanceText: {
    color: GOLD,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
});
