import { APP_COLORS } from "@/lib/consts";
import * as Location from "expo-location";
import React, { useEffect, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

interface TripCurrentLocationProps {
  label?: string;
  location: Location.LocationObject | null;
  displayCurrentAddress: string | null;
  requestLocation: () => void;
}

const TripCurrentLocation = ({
  label,
  location,
  requestLocation,
  displayCurrentAddress,
}: TripCurrentLocationProps) => {
  useEffect(() => {
    requestLocation();
  }, []);

  // ✅ Generate iframe HTML dynamically
  const mapHtml = useMemo(() => {
    if (!location) return "";

    const lat = location.coords.latitude;
    const lng = location.coords.longitude;

    const delta = 0.01;

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }

          iframe {
            border: none;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>

      <body>
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=${
            lng - delta
          },${lat - delta},${lng + delta},${lat + delta}&layer=mapnik&marker=${lat},${lng}">
        </iframe>
      </body>
    </html>
  `;
  }, [location]);

  return (
    <View style={{ marginVertical: 20 }}>
      <View className="flex-row justify-between" style={{ marginTop: 20 }}>
        <Text className="text-textSecondary text-base mt-5">
          {label ?? "Location"}
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
      >
        {location ? (
          <View
            className="flex-1 overflow-hidden"
            style={{ borderColor: APP_COLORS.background }}
          >
            {/* ✅ WebView Map */}
            <WebView
              originWhitelist={["*"]}
              source={{ html: mapHtml }}
              style={{ flex: 1 }}
              scrollEnabled={false}
            />

            {/* Address Overlay */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 6,
                backgroundColor: APP_COLORS.background,
                borderWidth: 1,
                borderColor: APP_COLORS.background,
                borderEndEndRadius: 16,
              }}
            >
              <Text className="text-sm text-textMuted font-bold">
                {displayCurrentAddress}
              </Text>

              <Text className="text-xs text-textMuted font-bold">
                {`Lat: ${location.coords.latitude.toFixed(
                  4,
                )}, Lng: ${location.coords.longitude.toFixed(4)}`}
              </Text>
            </View>
          </View>
        ) : (
          <Image
            source={require("@/assets/map-fallback.png")}
            className="rounded-xl"
            style={{ width: "100%", height: 150 }}
          />
        )}
      </View>
    </View>
  );
};

export default TripCurrentLocation;
