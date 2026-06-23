import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, Easing } from "react-native";

import SplashScreen from "./src/screens/1.0 splashscreen";
import OnboardingFindPlaces from "./src/screens/2.0 onboarding find places near you";
import OnboardingSaveFavorites from "./src/screens/2.1 onboarding save your favorites";
import OnboardingNavigate from "./src/screens/2.2 onboarding navigate easily";
import LocationPermission from "./src/screens/3.0 location permission page";
import HomePage from "./src/screens/4.0 home page";
import ExplorePage from "./src/screens/8.0 explore page";
import HotelsPage from "./src/screens/5.0 hotels page";
import HotelInnerPage from "./src/screens/5.1 hotels inner page";
import NaturePage from "./src/screens/6.0 nature page";
import NatureInnerPage from "./src/screens/6.1 nature inner page";
import HistoricalPage from "./src/screens/7.0 historical page";
import HistoricalInnerPage from "./src/screens/7.1 historical inner page";
import MapPage from "./src/screens/9.0 map page";
import FavoritesPage from "./src/screens/10.0 favorites page";
import ProfilePage from "./src/screens/11.0 profile page";
import SearchPage from "./src/screens/12.0 search page";
import ReviewsPage from "./src/screens/13.0 review page";
import EmptyStatePage from "./src/screens/14.0 empty error state page";
import LoginPage from "./src/screens/15.0 login page";

const hotelDetailFavorite = {
  id: "hotel-nearby-city-hotel",
  title: "Nearby City Hotel",
  type: "HOTEL",
  distance: "Near your current location",
  rating: "4.8",
  image: require("./assets/Home-Main-1742X871.jpg"),
};

const natureDetailFavorite = {
  id: "nature-nearby-nature-spot",
  title: "Nearby Nature Spot",
  type: "NATURE",
  distance: "2.4 km away",
  rating: "4.8",
  image: require("./assets/nature-bomburella-waterfall.jpg"),
};

const historicalDetailFavorite = {
  id: "historical-nearby-heritage-site",
  title: "Nearby Heritage Site",
  type: "HISTORICAL",
  distance: "1.2 km",
  rating: "4.9",
  image: require("./assets/historical-sigiriya.jpg"),
};

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [favorites, setFavorites] = useState([]);
  const [selectedHistoricalPlace, setSelectedHistoricalPlace] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onboardingTransition = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => {
        setScreen("onboarding1");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [screen]);

  useEffect(() => {
    const onboardingScreens = [
      "onboarding1",
      "onboarding2",
      "onboarding3",
      "location",
    ];

    if (!onboardingScreens.includes(screen)) {
      return;
    }

    onboardingTransition.setValue(0);
    Animated.timing(onboardingTransition, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [onboardingTransition, screen]);

  const favoriteIds = favorites.flatMap((item) => [item.id, item.title]).filter(Boolean);

  const addFavorite = (item) => {
    if (!item?.title) {
      return;
    }

    const favorite = {
      id: item.id || item.title,
      type: item.type || item.category || "PLACE",
      ...item,
    };

    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (savedItem) =>
          savedItem.id === favorite.id || savedItem.title === favorite.title
      );

      if (alreadySaved) {
        return currentFavorites;
      }

      return [favorite, ...currentFavorites];
    });
  };

  const goToLocation = () => {
    setScreen("location");
  };

  const goToHome = (locationStatus) => {
    if (locationStatus) {
      setHasLocationPermission(locationStatus === "granted");
    }

    setScreen("home");
  };

  const continueWithoutLocation = () => {
    setHasLocationPermission(false);
    setScreen("home");
  };

  const goToSearch = () => {
    setScreen("search");
  };

  const goToReviews = () => {
    setScreen(isLoggedIn ? "reviews" : "login");
  };

  const goToEmptyStates = () => {
    setScreen(isLoggedIn ? "emptyStates" : "login");
  };

  const goToLogin = () => {
    setScreen("login");
  };

  const completeLogin = () => {
    setIsLoggedIn(true);
    setScreen("profile");
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setScreen("login");
  };

  const goToHotels = () => {
    setScreen("hotels");
  };

  const goToHotelDetails = () => {
    setScreen("hotelDetails");
  };

  const goToNature = () => {
    setScreen("nature");
  };

  const goToNatureDetails = () => {
    setScreen("natureDetails");
  };

  const goToHistorical = () => {
    setScreen("historical");
  };

  const goToHistoricalDetails = (place) => {
    setSelectedHistoricalPlace(place || historicalDetailFavorite);
    setScreen("historicalDetails");
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
      setScreen("explore");
      return;
    }

    if (screenName === "Map") {
      setScreen("map");
      return;
    }

    if (screenName === "Favorites") {
      setScreen("favorites");
      return;
    }

    if (screenName === "Profile") {
      setScreen(isLoggedIn ? "profile" : "login");
    }
  };

  const onboardingAnimatedStyle = {
    flex: 1,
    opacity: onboardingTransition,
    transform: [
      {
        translateX: onboardingTransition.interpolate({
          inputRange: [0, 1],
          outputRange: [28, 0],
        }),
      },
    ],
  };

  const renderOnboardingTransition = (content) => (
    <Animated.View style={onboardingAnimatedStyle}>{content}</Animated.View>
  );

  return (
    <>
      <StatusBar style="light" backgroundColor="#0B1211" />

      {screen === "splash" && (
        <SplashScreen onContinue={() => setScreen("onboarding1")} />
      )}

      {screen === "onboarding1" &&
        renderOnboardingTransition(
          <OnboardingFindPlaces
            onNext={() => setScreen("onboarding2")}
            onSkip={goToLocation}
          />
        )}

      {screen === "onboarding2" &&
        renderOnboardingTransition(
          <OnboardingSaveFavorites
            onNext={() => setScreen("onboarding3")}
            onSkip={goToLocation}
          />
        )}

      {screen === "onboarding3" &&
        renderOnboardingTransition(
          <OnboardingNavigate onNext={goToLocation} onSkip={goToLocation} />
        )}

      {screen === "location" &&
        renderOnboardingTransition(
          <LocationPermission
            onAllow={goToHome}
            onLater={continueWithoutLocation}
          />
        )}
      {screen === "login" && (
        <LoginPage
  onSignIn={() => setCurrentScreen("home")}
  onSignUp={() => setCurrentScreen("signup")}
  onGooglePress={() => setCurrentScreen("googleLogin")}
  onApplePress={() => setCurrentScreen("appleLogin")}
  onForgotPassword={() => setCurrentScreen("forgotPassword")}
/>
      )}

      {screen === "home" && (
        <HomePage
          onNavPress={handleNavPress}
          onSearchPress={goToSearch}
          onHotelsPress={goToHotels}
          onHotelPress={goToHotels}
          hasLocationPermission={hasLocationPermission}
          favoriteIds={favoriteIds}
          onFavoritePress={(place) =>
            addFavorite({ ...place, type: place.category || "PLACE" })
          }
          onCategoryPress={(category) => {
            if (
              category === "Hotels" ||
              category?.title === "Hotels" ||
              category?.name === "Hotels"
            ) {
              goToHotels();
            }

            if (
              category === "Nature" ||
              category?.title === "Nature" ||
              category?.name === "Nature"
            ) {
              goToNature();
            }

            if (
              category === "Historical" ||
              category?.title === "Historical" ||
              category?.name === "Historical"
            ) {
              goToHistorical();
            }
          }}
        />
      )}

      {screen === "explore" && (
        <ExplorePage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onSearchPress={goToSearch}
          hasLocationPermission={hasLocationPermission}
          favoriteIds={favoriteIds}
          onFavoritePress={(place) => addFavorite(place)}
        />
      )}

      {screen === "search" && (
        <SearchPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
        />
      )}

      {screen === "hotels" && (
        <HotelsPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onHotelPress={goToHotelDetails}
          hasLocationPermission={hasLocationPermission}
          favoriteIds={favoriteIds}
          onFavoritePress={(hotel) => addFavorite({ ...hotel, type: "HOTEL" })}
        />
      )}

      {screen === "hotelDetails" && (
        <HotelInnerPage
          onBack={goToHotels}
          onNavPress={handleNavPress}
          favoriteIds={favoriteIds}
          onFavoritePress={() => addFavorite(hotelDetailFavorite)}
        />
      )}

      {screen === "nature" && (
        <NaturePage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onNaturePress={goToNatureDetails}
          hasLocationPermission={hasLocationPermission}
          favoriteIds={favoriteIds}
          onFavoritePress={(spot) => addFavorite({ ...spot, type: "NATURE" })}
        />
      )}

      {screen === "natureDetails" && (
        <NatureInnerPage
          onBack={goToNature}
          favoriteIds={favoriteIds}
          onFavoritePress={() => addFavorite(natureDetailFavorite)}
        />
      )}

      {screen === "historical" && (
        <HistoricalPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onHistoricalPress={goToHistoricalDetails}
          hasLocationPermission={hasLocationPermission}
          favoriteIds={favoriteIds}
          onFavoritePress={(place) =>
            addFavorite({ ...place, type: "HISTORICAL" })
          }
        />
      )}

      {screen === "historicalDetails" && (
        <HistoricalInnerPage
          onBack={goToHistorical}
          favoriteIds={favoriteIds}
          onFavoritePress={(place) =>
            addFavorite({
              ...(place || selectedHistoricalPlace || historicalDetailFavorite),
              type: "HISTORICAL",
            })
          }
        />
      )}


      {screen === "map" && (
        <MapPage
          onNavPress={handleNavPress}
          hasLocationPermission={hasLocationPermission}
        />
      )}

      {screen === "profile" && isLoggedIn && (
        <ProfilePage
          onNavPress={handleNavPress}
          onReviewsPress={goToReviews}
          onEmptyStatesPress={goToEmptyStates}
          onLoginPress={signOut}
          hasLocationPermission={hasLocationPermission}
          savedPlacesCount={favorites.length}
        />
      )}
      {screen === "reviews" && isLoggedIn && (
        <ReviewsPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
        />
      )}
      {screen === "emptyStates" && isLoggedIn && (
        <EmptyStatePage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
        />
      )}

      {screen === "favorites" && (
        <FavoritesPage
          favorites={favorites}
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
        />
      )}
    </>
  );
}
