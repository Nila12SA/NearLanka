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
import NaturePage from "./src/screens/6.0 nature page";
import NatureInnerPage from "./src/screens/6.1 nature inner page";
import HistoricalPage from "./src/screens/7.0 historical page";
import HistoricalInnerPage from "./src/screens/7.1 historical inner page";
import FavoritesPage from "./src/screens/8.0 favorites page";

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

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => {
        setScreen("onboarding1");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [screen]);

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

  const goToHome = () => {
    setScreen("home");
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
      setScreen("historical");
      return;
    }

    if (screenName === "Map") {
      setScreen("home");
      return;
    }

    if (screenName === "Favorites") {
      setScreen("favorites");
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
        <OnboardingNavigate onNext={goToLocation} onSkip={goToLocation} />
      )}

      {screen === "location" && (
        <LocationPermission onAllow={goToHome} onLater={goToHome} />
      )}

      {screen === "home" && (
        <HomePage
          onNavPress={handleNavPress}
          onHotelsPress={goToHotels}
          onHotelPress={goToHotels}
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

      {screen === "hotels" && (
        <HotelsPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onHotelPress={goToHotelDetails}
          onFavoritePress={(hotel) => addFavorite({ ...hotel, type: "HOTEL" })}
        />
      )}

      {screen === "hotelDetails" && (
        <HotelInnerPage
          onBack={goToHotels}
          onNavPress={handleNavPress}
          onFavoritePress={() => addFavorite(hotelDetailFavorite)}
        />
      )}

      {screen === "nature" && (
        <NaturePage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onNaturePress={goToNatureDetails}
          onFavoritePress={(spot) => addFavorite({ ...spot, type: "NATURE" })}
        />
      )}

      {screen === "natureDetails" && (
        <NatureInnerPage
          onBack={goToNature}
          onFavoritePress={() => addFavorite(natureDetailFavorite)}
        />
      )}

      {screen === "historical" && (
        <HistoricalPage
          onNavPress={handleNavPress}
          onMenuPress={() => {}}
          onHistoricalPress={goToHistoricalDetails}
          onFavoritePress={(place) =>
            addFavorite({ ...place, type: "HISTORICAL" })
          }
        />
      )}

      {screen === "historicalDetails" && (
        <HistoricalInnerPage
          onBack={goToHistorical}
          onFavoritePress={(place) =>
            addFavorite({
              ...(place || selectedHistoricalPlace || historicalDetailFavorite),
              type: "HISTORICAL",
            })
          }
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