import React, { useEffect, useRef, useState } from "react";
import StatusBar from "./src/components/ThemedStatusBar";
import { Alert, Animated, Easing, Linking, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPlaceId, normalizePlace } from "./src/utils/places";
import { setCurrentThemeMode } from "./src/theme/runtimeTheme";

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
import ProfileDetailPage from "./src/screens/16.0 profile detail page";
import RecentlyViewedPage from "./src/screens/17.0 recently viewed page";

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

function AuthOptionPage({ title, description, buttonText, onContinue, onBack }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B1211",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          width: "100%",
          padding: 26,
          borderRadius: 24,
          backgroundColor: "rgba(18, 63, 58, 0.94)",
          borderWidth: 1,
          borderColor: "rgba(182, 217, 214, 0.22)",
        }}
      >
        <Text
          style={{
            color: "#F4F6F2",
            fontSize: 28,
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            marginTop: 12,
            color: "#B9C4BE",
            fontSize: 14,
            lineHeight: 21,
            textAlign: "center",
          }}
        >
          {description}
        </Text>

        <Pressable
          onPress={onContinue}
          style={{
            height: 52,
            marginTop: 26,
            borderRadius: 15,
            backgroundColor: "#D19F65",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#102320",
              fontSize: 15,
              fontWeight: "900",
            }}
          >
            {buttonText}
          </Text>
        </Pressable>

        <Pressable
          onPress={onBack}
          style={{
            marginTop: 18,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#D19F65",
              fontSize: 14,
              fontWeight: "800",
            }}
          >
            Back to Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [favorites, setFavorites] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [recentPlaces, setRecentPlaces] = useState([]);
  const [recentPlacesLoaded, setRecentPlacesLoaded] = useState(false);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginReturnScreen, setLoginReturnScreen] = useState("home");
  const [userProfile, setUserProfile] = useState({ username: "Traveler", provider: "local" });
  const [themeMode, setThemeMode] = useState("Dark");
  const onboardingTransition = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("@nearlanka/favorites");
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Unable to load favorites:", error);
      } finally {
        setFavoritesLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;

    AsyncStorage.setItem("@nearlanka/favorites", JSON.stringify(favorites)).catch(
      (error) => console.error("Unable to save favorites:", error)
    );
  }, [favorites, favoritesLoaded]);

  useEffect(() => {
    const loadRecentPlaces = async () => {
      try {
        const saved = await AsyncStorage.getItem("@nearlanka/recent-places");
        if (saved) setRecentPlaces(JSON.parse(saved));
      } catch (error) {
        console.error("Unable to load recently viewed places:", error);
      } finally {
        setRecentPlacesLoaded(true);
      }
    };

    loadRecentPlaces();
  }, []);

  useEffect(() => {
    if (!recentPlacesLoaded) return;

    AsyncStorage.setItem(
      "@nearlanka/recent-places",
      JSON.stringify(recentPlaces)
    ).catch((error) =>
      console.error("Unable to save recently viewed places:", error)
    );
  }, [recentPlaces, recentPlacesLoaded]);

  useEffect(() => {
    AsyncStorage.multiGet([
      "@nearlanka/user-profile",
      "@nearlanka/theme",
    ])
      .then((entries) => {
        const values = Object.fromEntries(entries);
        if (values["@nearlanka/user-profile"]) {
          setUserProfile(JSON.parse(values["@nearlanka/user-profile"]));
        }
        if (values["@nearlanka/theme"]) setThemeMode(values["@nearlanka/theme"]);
      })
      .catch((error) => console.error("Unable to load profile settings:", error));
  }, []);

  useEffect(() => {
    AsyncStorage.multiSet([
      ["@nearlanka/user-profile", JSON.stringify(userProfile)],
      ["@nearlanka/theme", themeMode],
    ]).catch((error) => console.error("Unable to save profile settings:", error));
  }, [themeMode, userProfile]);
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

  const favoriteIds = favorites
    .flatMap((item) => [getPlaceId(item), item.id, item._id, item.title, item.name])
    .filter(Boolean);

  const addRecentlyViewed = (item) => {
    const place = normalizePlace(item);
    const placeId = getPlaceId(place);
    if (!placeId) return;

    setRecentPlaces((currentPlaces) => [
      { ...place, viewedAt: new Date().toISOString() },
      ...currentPlaces.filter(
        (currentPlace) => getPlaceId(currentPlace) !== placeId
      ),
    ].slice(0, 6));
  };

  const toggleFavorite = (item) => {
    const favorite = normalizePlace(item);
    const favoriteId = getPlaceId(favorite);
    if (!favoriteId) return;

    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (savedItem) => getPlaceId(savedItem) === favoriteId
      );

      return alreadySaved
        ? currentFavorites.filter((savedItem) => getPlaceId(savedItem) !== favoriteId)
        : [favorite, ...currentFavorites];
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

  const completeLogin = ({ username = "Traveler", provider = "local" } = {}) => {
    setUserProfile({ username, provider });
    setIsLoggedIn(true);
    setScreen("profile");
  };

  const openProviderSignIn = async (provider) => {
    const url = provider === "google"
      ? "https://accounts.google.com/signin"
      : "https://appleid.apple.com/sign-in";

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "Unable to open sign in",
        `Could not open the official ${provider} sign-in page.`
      );
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setLoginReturnScreen("home");
    setScreen("login");
  };

  const goToHotels = () => {
    setScreen("hotels");
  };

  const goToHotelDetails = (place) => {
    const normalized = normalizePlace(place);
    setSelectedPlace(normalized);
    addRecentlyViewed(normalized);
    setScreen("hotelDetails");
  };

  const goToNature = () => {
    setScreen("nature");
  };

  const goToNatureDetails = (place) => {
    const normalized = normalizePlace(place);
    setSelectedPlace(normalized);
    addRecentlyViewed(normalized);
    setScreen("natureDetails");
  };

  const goToHistorical = () => {
    setScreen("historical");
  };

  const goToHistoricalDetails = (place) => {
    const normalized = normalizePlace(place || historicalDetailFavorite);
    setSelectedPlace(normalized);
    addRecentlyViewed(normalized);
    setScreen("historicalDetails");
  };

  const handlePlacePress = (place) => {
    const normalized = normalizePlace(place);

    if (normalized?.category === "hotel") {
      goToHotelDetails(normalized);
      return;
    }

    if (normalized?.category === "nature") {
      goToNatureDetails(normalized);
      return;
    }

    goToHistoricalDetails(normalized);
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
      if (isLoggedIn) {
        setScreen("profile");
      } else {
        setLoginReturnScreen(screen);
        setScreen("login");
      }
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

  setCurrentThemeMode(themeMode);

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
          onSignIn={completeLogin}
          onSignUp={() => setScreen("signup")}
          onGooglePress={() => openProviderSignIn("google")}
          onApplePress={() => openProviderSignIn("apple")}
          onForgotPassword={() => setScreen("forgotPassword")}
          onFavoritesPress={() => setScreen("profileFavorites")}
          onRecentPress={() => setScreen("recent")}
          onBack={() => setScreen(loginReturnScreen)}
        />
      )}

      {screen === "signup" && (
        <AuthOptionPage
          title="Create Account"
          description="This is the sign up screen placeholder for NearLanka."
          buttonText="Create Account"
          onContinue={completeLogin}
          onBack={() => setScreen("login")}
        />
      )}

      {screen === "googleLogin" && (
        <AuthOptionPage
          title="Google Login"
          description="Continue using your Google account to explore NearLanka."
          buttonText="Continue with Google"
          onContinue={completeLogin}
          onBack={() => setScreen("login")}
        />
      )}

      {screen === "appleLogin" && (
        <AuthOptionPage
          title="Apple Login"
          description="Continue using your Apple account to explore NearLanka."
          buttonText="Continue with Apple"
          onContinue={completeLogin}
          onBack={() => setScreen("login")}
        />
      )}

      {screen === "forgotPassword" && (
        <AuthOptionPage
          title="Forgot Password"
          description="Password reset screen placeholder for NearLanka."
          buttonText="Back to Login"
          onContinue={() => setScreen("login")}
          onBack={() => setScreen("login")}
        />
      )}

      {screen === "home" && (
        <HomePage
          onNavPress={handleNavPress}
          onSearchPress={goToSearch}
          onHotelsPress={goToHotels}
          onHotelPress={goToHotels}
          onPlacePress={handlePlacePress}
          recentPlaces={recentPlaces}
          hasLocationPermission={hasLocationPermission}
          favoriteIds={favoriteIds}
          onFavoritePress={(place) =>
            toggleFavorite(place)
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
          onFavoritePress={toggleFavorite}
        />
      )}

      {screen === "search" && (
        <SearchPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          favoriteIds={favoriteIds}
          onFavoritePress={toggleFavorite}
        />
      )}

      {screen === "hotels" && (
        <HotelsPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onHotelPress={goToHotelDetails}
          hasLocationPermission={hasLocationPermission}
          favoriteIds={favoriteIds}
          onFavoritePress={toggleFavorite}
        />
      )}

      {screen === "hotelDetails" && (
        <HotelInnerPage
          place={selectedPlace || normalizePlace(hotelDetailFavorite)}
          onBack={goToHotels}
          onNavPress={handleNavPress}
          favoriteIds={favoriteIds}
          onFavoritePress={toggleFavorite}
        />
      )}

      {screen === "nature" && (
        <NaturePage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onNaturePress={goToNatureDetails}
          hasLocationPermission={hasLocationPermission}
          favoriteIds={favoriteIds}
          onFavoritePress={toggleFavorite}
        />
      )}

      {screen === "natureDetails" && (
        <NatureInnerPage
          place={selectedPlace || normalizePlace(natureDetailFavorite)}
          onBack={goToNature}
          favoriteIds={favoriteIds}
          onFavoritePress={toggleFavorite}
        />
      )}

      {screen === "historical" && (
        <HistoricalPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onHistoricalPress={goToHistoricalDetails}
          hasLocationPermission={hasLocationPermission}
          favoriteIds={favoriteIds}
          onFavoritePress={toggleFavorite}
        />
      )}

      {screen === "historicalDetails" && (
        <HistoricalInnerPage
          place={selectedPlace || normalizePlace(historicalDetailFavorite)}
          onBack={goToHistorical}
          favoriteIds={favoriteIds}
          onFavoritePress={toggleFavorite}
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
          onFavoritesPress={() => setScreen("profileFavorites")}
          onRecentPress={() => setScreen("recent")}
          onReviewsPress={goToReviews}
          onLocationPress={() => setScreen("locationSettings")}
          onAboutPress={() => setScreen("about")}
          onMonitoringPress={goToEmptyStates}
          onHelpPress={() => setScreen("help")}
          onSignOut={signOut}
          hasLocationPermission={hasLocationPermission}
          savedPlacesCount={favorites.length}
          recentPlacesCount={recentPlaces.length}
          userName={userProfile.username}
          themeMode={themeMode}
        />
      )}


      {screen === "recent" && (
        <RecentlyViewedPage
          recentPlaces={recentPlaces}
          onPlacePress={handlePlacePress}
          onNavPress={handleNavPress}
          themeMode={themeMode}
          onBack={() => setScreen(isLoggedIn ? "profile" : "login")}
        />
      )}

      {screen === "locationSettings" && (
        <ProfileDetailPage
          type="location"
          onNavPress={handleNavPress}
          hasLocationPermission={hasLocationPermission}
          onLocationChange={setHasLocationPermission}
          themeMode={themeMode}
          onBack={() => setScreen("profile")}
        />
      )}
      {screen === "about" && (
        <ProfileDetailPage type="about" onNavPress={handleNavPress} themeMode={themeMode} onBack={() => setScreen("profile")} />
      )}

      {screen === "help" && (
        <ProfileDetailPage type="help" onNavPress={handleNavPress} themeMode={themeMode} onBack={() => setScreen("profile")} />
      )}
      {screen === "reviews" && isLoggedIn && (
        <ReviewsPage onNavPress={handleNavPress} onMenuPress={() => {}} onBack={() => setScreen("profile")} />
      )}

      {screen === "emptyStates" && isLoggedIn && (
        <EmptyStatePage onNavPress={handleNavPress} onMenuPress={() => {}} onBack={() => setScreen("profile")} />
      )}


      {screen === "profileFavorites" && (
        <FavoritesPage
          favorites={favorites}
          onFavoritePress={toggleFavorite}
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onBack={() => setScreen("profile")}
        />
      )}
      {screen === "favorites" && (
        <FavoritesPage
          favorites={favorites}
          onFavoritePress={toggleFavorite}
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
        />
      )}
    </>
  );
}

















