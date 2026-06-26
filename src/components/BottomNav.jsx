import React from "react";
import { OptimizedImage } from "../components/OptimizedImage";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const navHomeIcon = require("../../assets/nav-home.png");
const navCompassIcon = require("../../assets/nav-compass.png");
const navMapIcon = require("../../assets/nav-map.png");
const navLoveIcon = require("../../assets/nav-love.png");
const navUserIcon = require("../../assets/nav-user.png");

const APP_BG = "#0B1211";
const ACCENT_GOLD = "#D19F65";
const MUTED_GRAY = "rgba(255,255,255,0.72)";

const navItems = [
  { icon: navHomeIcon, label: "Home", key: "Home" },
  { icon: navCompassIcon, label: "Explore", key: "Explore" },
  { icon: navMapIcon, label: "Map", key: "Map" },
  { icon: navLoveIcon, label: "Favorites", key: "Favorites" },
  { icon: navUserIcon, label: "Profile", key: "Profile" },
];

export default function BottomNav({ activeKey, activeTab, onNavPress }) {
  const colors = { background: APP_BG, border: "rgba(255,255,255,0.06)", muted: MUTED_GRAY, accent: ACCENT_GOLD };
  const selectedTab = activeTab || activeKey;
  return (
    <View style={[styles.bottomNav, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
      {navItems.map((item) => {
        const isActive =
          item.key.toLowerCase() === String(selectedTab).toLowerCase();

        return (
          <Pressable
            key={item.key}
            style={styles.navItem}
            onPress={() => onNavPress?.(item.key)}
          >
            <Image
              source={item.icon}
              style={[styles.navIcon, { tintColor: isActive ? colors.accent : colors.muted }]}
              resizeMode="contain"
            />
            <Text style={[styles.navLabel, { color: isActive ? colors.accent : colors.muted }]}>
              {item.label}
            </Text>
            <View style={[styles.activeDot, { backgroundColor: colors.accent }, !isActive && styles.hiddenDot]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,
    elevation: 30,
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
    tintColor: MUTED_GRAY,
  },

  activeNavIcon: {
    tintColor: ACCENT_GOLD,
  },

  navLabel: {
    marginTop: 3,
    color: MUTED_GRAY,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },

  activeNavText: {
    color: ACCENT_GOLD,
  },

  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
    backgroundColor: ACCENT_GOLD,
  },

  hiddenDot: {
    opacity: 0,
  },
});


