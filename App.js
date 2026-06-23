import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import SplashScreen from "./src/screens/1.0 splashscreen";
import OnboardingFindPlacesNearYou from "./src/screens/2.0 onboarding find places near you";
import OnboardingSaveYourFavorites from "./src/screens/2.1 onboarding save your favorites";
import OnboardingNavigateEasily from "./src/screens/2.2 onboarding navigate easily";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("splash");

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveScreen("onboardingFindPlaces");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const currentBackground =
    activeScreen === "splash" ? "#050606" : "#0E453B";

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: currentBackground }]}
        edges={["top", "bottom"]}
      >
        <StatusBar style="light" />

        {activeScreen === "splash" && <SplashScreen />}

        {activeScreen === "onboardingFindPlaces" && (
          <OnboardingFindPlacesNearYou
            onNext={() => setActiveScreen("onboardingSaveFavorites")}
            onSkip={() => setActiveScreen("onboardingSaveFavorites")}
          />
        )}

        {activeScreen === "onboardingSaveFavorites" && (
          <OnboardingSaveYourFavorites
            onNext={() => setActiveScreen("onboardingNavigateEasily")}
            onSkip={() => setActiveScreen("onboardingNavigateEasily")}
          />
        )}

        {activeScreen === "onboardingNavigateEasily" && (
          <OnboardingNavigateEasily />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});