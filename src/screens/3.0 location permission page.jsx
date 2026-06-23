import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { colors, rgba } from "../theme/colors";
import { typography } from "../theme/typography";

const pinIcon = require("../../assets/location-pin-icon.png");

const locationPermission = {
  screenName: "3.0 Location Permission",
  title: "Enable Location",
  description:
    "Allow location access to find nearby Sri Lankan places, hotels, and attractions around you.",
  primaryButton: "Allow Location",
  secondaryButton: "Maybe Later",
  footnote: "Your location is only used to show nearby places and distance.",
};

export default function LocationPermissionScreen({ onAllow, onLater }) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleAllowLocation = async () => {
    if (isRequesting) return;

    setIsRequesting(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      onAllow?.(status);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topSection}>
        <View style={styles.visualWrap}>
          <View style={[styles.ring, styles.ringOuter]} />
          <View style={[styles.ring, styles.ringMiddle]} />
          <View style={[styles.ring, styles.ringInner]} />
          <View style={styles.glow} />
          <Image source={pinIcon} style={styles.pinIcon} resizeMode="contain" />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{locationPermission.title}</Text>
          <Text style={styles.description}>
            {locationPermission.description}
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={handleAllowLocation}>
            <Text style={styles.primaryButtonText}>
              {isRequesting ? "Requesting..." : locationPermission.primaryButton}
            </Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={onLater}>
            <Text style={styles.secondaryButtonText}>
              {locationPermission.secondaryButton}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footnote}>{locationPermission.footnote}</Text>
      </View>
    </View>
  );
}

export { locationPermission };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0E453B",
    paddingHorizontal: 20,
    paddingTop: 78,
    paddingBottom: 48,
  },

  topSection: {
    width: "100%",
    alignItems: "center",
  },

  visualWrap: {
    width: 280,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
  },

  ring: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  ringOuter: {
    width: 258,
    height: 258,
  },

  ringMiddle: {
    width: 194,
    height: 194,
    borderColor: "rgba(255,255,255,0.12)",
  },

  ringInner: {
    width: 128,
    height: 128,
    borderColor: "rgba(255,255,255,0.16)",
  },

  glow: {
    position: "absolute",
    width: 156,
    height: 156,
    borderRadius: 78,
    backgroundColor: "rgba(240, 196, 108, 0.14)",
  },

  pinIcon: {
    width: 178,
    height: 178,
  },

  content: {
    width: "100%",
    maxWidth: 326,
    alignItems: "center",
    marginTop: 8,
  },

  title: {
    fontFamily: typography.fontFamily.heading,
    color: colors.neutral[50],
    fontSize: 30,
    lineHeight: 38,
    fontWeight: typography.fontWeight.regular,
    textAlign: "center",
  },

  description: {
    marginTop: 12,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.78),
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },

  bottomSection: {
    width: "100%",
    alignItems: "center",
    marginTop: "auto",
  },

  actions: {
    width: "100%",
    maxWidth: 334,
    alignItems: "center",
  },

  primaryButton: {
    width: "100%",
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#F0C46C",
  },

  primaryButtonText: {
    fontFamily: typography.fontFamily.body,
    color: "#000000",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: typography.fontWeight.regular,
    textAlign: "center",
  },

  secondaryButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },

  secondaryButtonText: {
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.86),
    fontSize: 16,
    lineHeight: 24,
    fontWeight: typography.fontWeight.regular,
    textAlign: "center",
  },

  footnote: {
    width: "100%",
    maxWidth: 286,
    marginTop: 42,
    fontFamily: typography.fontFamily.body,
    color: rgba(colors.neutral[50], 0.45),
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});