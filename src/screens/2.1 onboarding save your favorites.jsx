import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, rgba } from "../theme/colors";
import { typography } from "../theme/typography";

const heroImage = require("../../assets/onboarding-save-favorites-leopard.jpg");

export default function OnboardingSaveYourFavorites({
  heroImageSource = heroImage,
  onNext,
  onSkip,
}) {
  return (
    <View style={styles.screen}>
      <View style={styles.heroFrame}>
        <ImageBackground
          source={heroImageSource}
          style={styles.heroImage}
          imageStyle={styles.heroImageRadius}
          resizeMode="cover"
        >
          <Pressable style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Save Your Favorites</Text>

        <Text style={styles.description}>
          Bookmark places you want to visit and access them anytime, even when
          offline.
        </Text>

        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.activeDot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.bottomArea}>
        <Pressable style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0E453B",
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 34,
  },

  heroFrame: {
    width: "100%",
    maxWidth: 360,
    height: 475,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "#0E453B",
  },

  heroImage: {
    flex: 1,
  },

  heroImageRadius: {
    borderRadius: 26,
  },

  skipButton: {
    position: "absolute",
    top: 22,
    right: 20,
    zIndex: 20,
  },

  skipText: {
    fontFamily: typography.fontFamily.body,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },

  content: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    marginTop: 26,
  },

  title: {
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[50],
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    textAlign: "center",
  },

  description: {
    maxWidth: 320,
    marginTop: 10,
    minHeight: 72,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.85),
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    height: 14,
    marginTop: 18,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: rgba(colors.neutral[50], 0.36),
  },

  activeDot: {
    width: 32,
    height: 8,
    borderRadius: 12,
    backgroundColor: "#F0C46C",
  },

  bottomArea: {
    width: "100%",
    maxWidth: 306,
    alignItems: "center",
    marginTop: 30,
  },

  nextButton: {
    width: "100%",
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: "#F0C46C",
    alignItems: "center",
    justifyContent: "center",
  },

  nextButtonText: {
    fontFamily: typography.fontFamily.body,
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
  },
});
