import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import SplashScreen from "./src/screens/1.0 splashscreen";
import OnboardingFindPlaces from "./src/screens/2.0 onboarding find places near you";
import OnboardingSaveFavorites from "./src/screens/2.1 onboarding save your favorites";
import OnboardingNavigate from "./src/screens/2.2 onboarding navigate easily";
import LocationPermission from "./src/screens/3.0 location permission page";
import HomePage from "./src/screens/4.0 home page";

export default function App() {
  const [screen, setScreen] = useState("splash");

  const goToLocation = () => {
    setScreen("location");
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="#0B1211" />

      {screen === "splash" && (
        <SplashScreen onContinue={() => setScreen("onboarding1")} />
      )}

      {screen === "onboarding1" && (
        <OnboardingFindPlaces
          onNext={() => setScreen("onboarding2")}
          onSkip={goToLocation}
        />
      )}

      {screen === "onboarding2" && (
        <OnboardingSaveFavorites
          onNext={() => setScreen("onboarding3")}
          onSkip={goToLocation}
        />
      )}

      {screen === "onboarding3" && (
        <OnboardingNavigate
          onNext={goToLocation}
          onSkip={goToLocation}
        />
      )}

      {screen === "location" && (
        <LocationPermission
          onAllow={() => setScreen("home")}
          onLater={() => setScreen("home")}
        />
      )}

      {screen === "home" && <HomePage />}
    </>
  );
}