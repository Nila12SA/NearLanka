import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { createThemedStyles } from "../theme/runtimeTheme";

export default function SplashScreen({ onContinue }) {
  const logoText = "NearLanka";

  const letterAnimations = useRef(
    logoText.split("").map(() => new Animated.Value(0.35))
  ).current;

  useEffect(() => {
    const animations = letterAnimations.map((animation) =>
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0.35,
          duration: 450,
          useNativeDriver: true,
        }),
      ])
    );

    const loopAnimation = Animated.loop(Animated.stagger(120, animations));
    loopAnimation.start();

    const timer = setTimeout(() => {
      onContinue?.();
    }, 3000);

    return () => {
      loopAnimation.stop();
      clearTimeout(timer);
    };
  }, [letterAnimations, onContinue]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        {logoText.split("").map((letter, index) => {
          const scale = letterAnimations[index].interpolate({
            inputRange: [0.35, 1],
            outputRange: [0.98, 1.05],
          });

          return (
            <Animated.Text
              key={`${letter}-${index}`}
              style={[
                styles.logo,
                {
                  opacity: letterAnimations[index],
                  transform: [{ scale }],
                },
              ]}
            >
              {letter}
            </Animated.Text>
          );
        })}
      </View>

      <Text style={styles.tagline}>AUTHENTIC EXPERIENCES</Text>
    </View>
  );
}

const styles = createThemedStyles({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#050606",
  },

  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    fontFamily: typography.fontFamily.heading,
    fontSize: 52,
    fontWeight: typography.fontWeight.regular,
    lineHeight: 60,
    color: "#E6E6E6",
  },

  tagline: {
    position: "absolute",
    bottom: 84,
    fontFamily: typography.fontFamily.body,
    fontSize: 13,
    fontWeight: typography.fontWeight.medium,
    color: "#D8A45E",
    letterSpacing: 0,
  },
});

