import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "./src/screens/1.0 splashscreen";
import OnboardingFindPlacesNearYou from "./src/screens/2.0 onboarding find places near you";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("splash");

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveScreen("onboardingFindPlaces");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        {activeScreen === "splash" ? (
          <SplashScreen />
        ) : (
          <OnboardingFindPlacesNearYou />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121414",
  },
});
