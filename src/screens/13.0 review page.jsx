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
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";

const alexImage = require("../../assets/review-alex.jpg");
const sarahImage = require("../../assets/review-sarah.jpg");
const michaelImage = require("../../assets/review-michael.jpg");

const APP_BG = "#0B1211";
const CARD_BG = "#123F3A";
const BORDER = "#245F58";
const TEXT = "#F4F6F2";
const MUTED = "#B9C4BE";
const ACCENT = "#B6D9D6";
const GOLD = "#D19F65";
const BUTTON_GOLD = "#F5B956";

const reviews = [
  {
    name: "Alex Mercer",
    date: "October 24, 2023",
    avatar: alexImage,
    rating: 5,
    quote:
      "An absolutely magical experience. The attention to detail and the serene atmosphere made our trip to Ella unforgettable. Highly recommend the sunset trek!",
    tags: ["Adventure", "Solo Traveler"],
  },
  {
    name: "Sarah Jenkins",
    date: "October 12, 2023",
    avatar: sarahImage,
    rating: 4,
    quote:
      "The property is stunning. The pool area feels like a private oasis. The only minor thing was the slow Wi-Fi, but honestly, it helped me disconnect.",
    tags: ["Relaxation"],
  },
  {
    name: "Michael Chen",
    date: "September 30, 2023",
    avatar: michaelImage,
    rating: 5,
    quote:
      "Exceptional service. The staff went above and beyond to organize our local tours. The food was the highlight--authentic Sri Lankan flavors with a modern twist.",
    tags: ["Foodie", "Family Trip"],
  },
];

export default function ReviewsPage({ onNavPress, onMenuPress }) {
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
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>Reviews</Text>
              <Text style={styles.subtitle}>What travelers are{`\n`}saying</Text>
            </View>

            <Pressable style={styles.writeButton}>
              <Text style={styles.writeButtonText}>Write a Review</Text>
            </Pressable>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.scoreBlock}>
              <Text style={styles.scoreText}>4.9</Text>
              <Text style={styles.scoreLabel}>OVERALL</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryInfo}>
              <StarRow rating={5} size={18} />
              <Text style={styles.summaryText}>Based on 128 verified{`\n`}stays</Text>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </View>

          <View style={styles.reviewList}>
            {reviews.map((review) => (
              <View key={review.name} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image source={review.avatar} style={styles.avatar} resizeMode="cover" />
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <StarRow rating={review.rating} size={15} />
                </View>

                <Text style={styles.quoteText}>"{review.quote}"</Text>

                <View style={styles.tagRow}>
                  {review.tags.map((tag) => (
                    <Text key={tag} style={styles.tagPill}>{tag}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <Pressable style={styles.moreButton}>
            <Text style={styles.moreText}>View more reviews</Text>
            <Ionicons name="chevron-down" size={18} color={ACCENT} />
          </Pressable>
        </ScrollView>

        <BottomNav activeKey="Profile" onNavPress={onNavPress} />
      </View>
    </SafeAreaView>
  );
}

function StarRow({ rating, size }) {
  return (
    <View style={styles.starRow}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Ionicons
          key={index}
          name="star"
          size={size}
          color={index < rating ? GOLD : "rgba(185,196,190,0.34)"}
        />
      ))}
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

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 118,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: TEXT,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 28,
    lineHeight: 34,
  },

  subtitle: {
    marginTop: 6,
    color: MUTED,
    fontSize: 16,
    lineHeight: 23,
  },

  writeButton: {
    width: 141,
    height: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BUTTON_GOLD,
  },

  writeButtonText: {
    color: "#24201A",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },

  summaryCard: {
    minHeight: 127,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD_BG,
  },

  scoreBlock: {
    width: 92,
  },

  scoreText: {
    color: ACCENT,
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "800",
  },

  scoreLabel: {
    color: TEXT,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },

  summaryDivider: {
    width: 1,
    height: 70,
    marginHorizontal: 22,
    backgroundColor: BORDER,
  },

  summaryInfo: {
    flex: 1,
  },

  starRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  summaryText: {
    marginTop: 7,
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
  },

  progressTrack: {
    height: 4,
    marginTop: 9,
    borderRadius: 3,
    backgroundColor: "rgba(185,196,190,0.28)",
  },

  progressFill: {
    width: "94%",
    height: 4,
    borderRadius: 3,
    backgroundColor: GOLD,
  },

  reviewList: {
    marginTop: 25,
    gap: 17,
  },

  reviewCard: {
    padding: 25,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD_BG,
  },

  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0C2421",
  },

  reviewerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  reviewerName: {
    color: TEXT,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
  },

  reviewDate: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
  },

  quoteText: {
    marginTop: 19,
    color: TEXT,
    fontSize: 16,
    lineHeight: 22,
  },

  tagRow: {
    marginTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  tagPill: {
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    color: MUTED,
    backgroundColor: "rgba(79,129,120,0.32)",
    fontSize: 13,
    lineHeight: 17,
  },

  moreButton: {
    marginTop: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  moreText: {
    marginRight: 7,
    color: ACCENT,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },
});