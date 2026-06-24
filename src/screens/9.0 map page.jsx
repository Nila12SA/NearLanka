import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { getBestAvailableLocation } from "../utils/location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";
import DataState from "../components/DataState";
import usePlaces from "../hooks/usePlaces";
import { openPlaceDirections, openPlaceInMaps } from "../utils/maps";

const placeImage = require("../../assets/Home-Main-1742X871.jpg");

const APP_BG = "#0B1211";
const CARD_BG = "#1F5650";
const CARD_BG_DARK = "#17433F";
const GOLD = "#F5C965";
const TEXT = "#F4F6F2";
const MUTED_TEXT = "#B9C4BE";

const defaultRegion = {
  latitude: 7.957,
  longitude: 80.7603,
  latitudeDelta: 0.065,
  longitudeDelta: 0.065,
};

const featuredPlace = {
  title: "Azure Palm Sanctuary",
  category: "LUXURY BOUTIQUE",
  distance: "1.2 km away",
  latitude: 7.963,
  longitude: 80.772,
};

const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#6F8581" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#2F4541" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#8EA19D" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#7D918D" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#2B3B38" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#5F7874" }] },
];

export default function MapPage({ onNavPress, hasLocationPermission = true }) {
  const { places, loading, error, reload } = usePlaces({ nearby: true, hasLocationPermission });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const [region, setRegion] = useState(defaultRegion);
  const [locationMessage, setLocationMessage] = useState(
    hasLocationPermission
      ? "Here are the places around me right now."
      : "Location access is off. Showing nearby places on the map."
  );

  useEffect(() => {
    if (places.length > 0 && !selectedPlace) setSelectedPlace(places[0]);
  }, [places, selectedPlace]);

  useEffect(() => {
    let subscription;
    let isMounted = true;

    const startLocationTracking = async () => {
      if (!hasLocationPermission) {
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        if (isMounted) {
          setLocationMessage("Location access is off. Showing nearby places on the map.");
        }
        return;
      }

      const currentPosition = await getBestAvailableLocation();
      const currentRegion = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      };

      if (isMounted) {
        setRegion(currentRegion);
        mapRef.current?.animateToRegion(currentRegion, 650);
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 4000,
          distanceInterval: 8,
        },
        (position) => {
          const nextRegion = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
          };

          setRegion(nextRegion);
          mapRef.current?.animateToRegion(nextRegion, 650);
        }
      );
    };

    startLocationTracking().catch((locationError) => {
      console.warn("Map could not obtain the current location:", locationError.message);
      if (isMounted) {
        setLocationMessage("Current GPS location is unavailable. Showing Sri Lankan places instead.");
      }
    });

    return () => {
      isMounted = false;
      subscription?.remove();
    };
  }, [hasLocationPermission]);

  const openGoogleDirections = () => openPlaceDirections(selectedPlace);
  const openNativeMaps = () => openPlaceInMaps(selectedPlace);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={APP_BG} />

      <View style={styles.screen}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={defaultRegion}
          region={region}
          customMapStyle={mapStyle}
          showsUserLocation={hasLocationPermission}
          showsMyLocationButton={false}
          followsUserLocation={hasLocationPermission}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              title={place.title}
              onPress={() => setSelectedPlace(place)}
            >
              <View style={styles.placeMarker}>
                <Ionicons name="location" size={19} color="#102320" />
              </View>
            </Marker>
          ))}
        </MapView>

        <View style={styles.mapTint} pointerEvents="none" />

        <AppHeader onProfilePress={() => onNavPress?.("Profile")} />

        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{locationMessage}</Text>
        </View>
        <View style={styles.placeCard}>
          {!selectedPlace ? (
            <DataState
              loading={loading}
              error={error}
              empty={!loading && !error}
              onRetry={reload}
              compact
            />
          ) : (
            <>
              <Image source={selectedPlace.image || placeImage} style={styles.placeImage} />

              <View style={styles.placeInfo}>
                <Text style={styles.placeCategory}>{selectedPlace.type || selectedPlace.category}</Text>
                <Text style={styles.placeTitle}>{selectedPlace.title}</Text>
                <View style={styles.distanceRow}>
                  <Ionicons name="navigate-outline" size={15} color={MUTED_TEXT} />
                  <Text style={styles.distanceText}>{selectedPlace.distance}</Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <Pressable style={styles.directionsButton} onPress={openGoogleDirections}>
                  <Text style={styles.directionsButtonText}>Get Directions</Text>
                </Pressable>

                <Pressable style={styles.mapsButton} onPress={openNativeMaps}>
                  <Text style={styles.mapsButtonText}>Open in Maps</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>

        <BottomNav activeTab="map" onNavPress={onNavPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: APP_BG,
  },

  screen: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: APP_BG,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  mapTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(17, 55, 51, 0.33)",
  },


  messageBubble: {
    position: "absolute",
    top: 96,
    left: 50,
    right: 22,
    minHeight: 76,
    justifyContent: "center",
    paddingHorizontal: 27,
    borderRadius: 34,
    backgroundColor: "rgba(31, 86, 80, 0.95)",
  },

  messageText: {
    color: TEXT,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
  },

  userDotOuter: {
    position: "absolute",
    top: "44%",
    left: "51%",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(230, 248, 245, 0.82)",
  },

  userDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#80AFAA",
  },

  placeMarker: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9A35F",
  },

  placeCard: {
    position: "absolute",
    left: 30,
    right: 22,
    bottom: 98,
    minHeight: 188,
    borderRadius: 21,
    padding: 17,
    backgroundColor: "rgba(31, 86, 80, 0.96)",
  },

  placeImage: {
    position: "absolute",
    left: 17,
    top: 17,
    width: 96,
    height: 96,
    borderRadius: 10,
  },

  placeInfo: {
    minHeight: 96,
    marginLeft: 112,
    justifyContent: "center",
  },

  placeCategory: {
    color: MUTED_TEXT,
    fontSize: 13,
    lineHeight: 18,
  },

  placeTitle: {
    marginTop: 5,
    color: TEXT,
    fontSize: 18,
    lineHeight: 24,
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  distanceText: {
    marginLeft: 5,
    color: MUTED_TEXT,
    fontSize: 14,
    lineHeight: 19,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },

  directionsButton: {
    flex: 1.1,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GOLD,
  },

  directionsButtonText: {
    color: "#102320",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },

  mapsButton: {
    flex: 1,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5A817C",
  },

  mapsButtonText: {
    color: TEXT,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
  },
});
