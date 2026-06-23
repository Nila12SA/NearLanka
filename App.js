import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import SplashScreen from "./src/screens/1.0 splashscreen";
import OnboardingFindPlaces from "./src/screens/2.0 onboarding find places near you";
import OnboardingSaveFavorites from "./src/screens/2.1 onboarding save your favorites";
import OnboardingNavigate from "./src/screens/2.2 onboarding navigate easily";
import LocationPermission from "./src/screens/3.0 location permission page";
import HomePage from "./src/screens/4.0 home page";
import HotelsPage from "./src/screens/5.0 hotels page";
import HotelInnerPage from "./src/screens/5.1 hotels inner page";

export default function App() {
  const [screen, setScreen] = useState("splash");

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => {
        setScreen("onboarding1");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [screen]);

  const goToLocation = () => {
    setScreen("location");
  };

  const goToHome = () => {
    setScreen("home");
  };

  const goToHotels = () => {
    setScreen("hotels");
  };

  const goToHotelDetails = () => {
    setScreen("hotelDetails");
  };

  const handleNavPress = (screenName) => {
    if (screenName === "Home") {
      setScreen("home");
      return;
    }

    if (screenName === "Hotels") {
      setScreen("hotels");
      return;
    }

    if (screenName === "Explore") {
      setScreen("home");
      return;
    }

    if (screenName === "Map") {
      setScreen("home");
      return;
    }

    if (screenName === "Favorites") {
      setScreen("home");
      return;
    }

    if (screenName === "Profile") {
      setScreen("home");
    }
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
        <LocationPermission onAllow={goToHome} onLater={goToHome} />
      )}

      {screen === "home" && (
        <HomePage
          onNavPress={handleNavPress}
          onHotelsPress={goToHotels}
          onHotelPress={goToHotels}
          onCategoryPress={(category) => {
            if (
              category === "Hotels" ||
              category?.title === "Hotels" ||
              category?.name === "Hotels"
            ) {
              goToHotels();
            }
          }}
        />
      )}

      {screen === "hotels" && (
        <HotelsPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onHotelPress={goToHotelDetails}
          onFavoritePress={() => {}}
        />
      )}

      {screen === "hotelDetails" && (
        <HotelInnerPage
          onBack={goToHotels}
          onNavPress={handleNavPress}
          onFavoritePress={() => {}}
        />
      )}
    </>
  );
}