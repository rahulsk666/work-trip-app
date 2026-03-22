import * as Location from "expo-location";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface TripCurrentLocationProps {
  location: Location.LocationObject | null;
  displayCurrentAddress: string | null;
  requestLocation: () => void;
}

const TripCurrentLocation = ({
  location,
  requestLocation,
  displayCurrentAddress,
}: TripCurrentLocationProps) => {
  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <View>
      <View className="flex-row justify-between">
        <Text className="text-textSecondary text-base mt-5">
          Starting Location
        </Text>
        <TouchableOpacity onPress={requestLocation}>
          <Text className="text-primary font-bold">Refresh</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderRadius: 16,
          overflow: "hidden",
          height: 180,
          width: "100%",
          marginTop: 8,
        }}
        className="h-52 w-full mt-2"
      >
        {location ? (
          <View className="flex-1">
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              showsUserLocation
              showsMyLocationButton
              provider={PROVIDER_GOOGLE}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Start Location"
              />
            </MapView>
            <View
              style={{
                position: "absolute",
                bottom: 25,
                left: 0,
                right: 0,
                padding: 6,
              }}
            >
              <Text className="text-sm text-textMuted font-bold">
                {displayCurrentAddress}
              </Text>
              <Text className="text-xs text-textMuted font-bold">
                {`Lat: ${location.coords.latitude.toFixed(4)}, Lng: ${location.coords.longitude.toFixed(4)}`}
              </Text>
            </View>
          </View>
        ) : (
          <Image
            source={require("@/assets/map-fallback.png")}
            alt="map-image"
            className="rounded-xl"
            style={{ width: "100%", height: 150 }}
          />
        )}
      </View>
    </View>
  );
};

export default TripCurrentLocation;
