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

const heroImage = require("../../assets/onboarding-find-places.jpg");

const onboardingFindPlaces = {
  screenName: "2.0 Onboarding - Find Places Near You",
  title: "Find Places Near You",
  description:
    "Discover nearby hotels, nature spots, and historical attractions based on your current location.",
  activeStep: 1,
  totalSteps: 3,
  primaryButton: "Next",
  secondaryButton: "Skip",
};

export default function OnboardingFindPlacesNearYou({
  heroImageSource = heroImage,
  onNext,
  onSkip,
}) {
  return (
    <View style={styles.screen}>
      <View style={styles.heroFrame}>
        <ImageBackground
          source={heroImageSource}
          resizeMode="cover"
          style={styles.heroImage}
          imageStyle={styles.heroImageRadius}
        >
          <Pressable style={styles.topSkipButton} onPress={onSkip}>
            <Text style={styles.topSkipText}>
              {onboardingFindPlaces.secondaryButton}
            </Text>
          </Pressable>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{onboardingFindPlaces.title}</Text>

        <Text style={styles.description}>
          {onboardingFindPlaces.description}
        </Text>

        <View style={styles.steps}>
          {Array.from({ length: onboardingFindPlaces.totalSteps }).map(
            (_, index) => {
              const isActive = index + 1 === onboardingFindPlaces.activeStep;

              return (
                <View
                  key={`step-${index}`}
                  style={[styles.stepDot, isActive && styles.activeStepDot]}
                />
              );
            }
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.primaryButton} onPress={onNext}>
          <Text style={styles.primaryButtonText}>
            {onboardingFindPlaces.primaryButton}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export { onboardingFindPlaces };

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
    overflow: "hidden",
    borderRadius: 26,
    backgroundColor: "#0E453B",
  },

  heroImage: {
    flex: 1,
  },

  heroImageRadius: {
    borderRadius: 26,
  },

  topSkipButton: {
    position: "absolute",
    top: 22,
    right: 20,
    zIndex: 20,
  },

  topSkipText: {
    fontFamily: typography.fontFamily.body,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#FFFFFF",
  },

  content: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    marginTop: 26,
  },

  title: {
    fontFamily: typography.fontFamily.body,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    color: colors.neutral[50],
    textAlign: "center",
  },

  description: {
    maxWidth: 320,
    marginTop: 10,
    minHeight: 72,
    fontFamily: typography.fontFamily.body,
    fontSize: 16,
    fontWeight: typography.fontWeight.regular,
    lineHeight: 24,
    color: rgba(colors.neutral[50], 0.85),
    textAlign: "center",
  },

  steps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    height: 14,
    marginTop: 18,
  },

  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: rgba(colors.neutral[50], 0.36),
  },

  activeStepDot: {
    width: 32,
    height: 8,
    borderRadius: 12,
    backgroundColor: "#F0C46C",
  },

  footer: {
    width: "100%",
    maxWidth: 306,
    alignItems: "center",
    marginTop: 30,
  },

  primaryButton: {
    width: "100%",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#F0C46C",
  },

  primaryButtonText: {
    fontFamily: typography.fontFamily.body,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#000000",
    textAlign: "center",
  },
});
