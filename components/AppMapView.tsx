import { useCoordinates } from "@/hooks/useCoordinates";
import { APP_COLORS } from "@/lib/consts";
import { withOpacity } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

type MapMode =
  | {
      type: "static";
      location: string | null | undefined;
    }
  | {
      type: "live";
      location: Location.LocationObject | null;
      requestLocation: () => void;
      displayCurrentAddress?: string | null;
    };

interface AppMapViewProps {
  mode: MapMode;
  height?: number;
  label?: string;
  markerTitle?: string;
}

const MapIframe = ({
  latitude,
  longitude,
  height,
}: {
  latitude: number;
  longitude: number;
  height: number;
}) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; }
          body { width: 100%; height: 100vh; overflow: hidden; }
          iframe { width: 100%; height: 100%; border: none; }
        </style>
      </head>
      <body>
        <iframe
          src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed"
          allowfullscreen
        ></iframe>
      </body>
    </html>
  `;

  return (
    <WebView
      source={{ html }}
      style={{ width: "100%", height }}
      scrollEnabled={false}
      javaScriptEnabled
    />
  );
};

const EmptyMap = ({
  height,
  onPress,
  showButton,
}: {
  height: number;
  onPress?: () => void;
  showButton?: boolean;
}) => (
  <View
    className="rounded-2xl items-center justify-center gap-3"
    style={{
      height,
      backgroundColor: withOpacity(APP_COLORS.primary, 0.05),
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: withOpacity(APP_COLORS.textPrimary, 0.2),
    }}
  >
    <Ionicons
      name="location-outline"
      size={32}
      color={withOpacity(APP_COLORS.textPrimary, 0.3)}
    />
    <Text className="font-poppins text-textSecondary text-sm">
      Location not available
    </Text>
    {showButton && onPress && (
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center gap-2 px-4 py-2 rounded-xl"
        style={{ backgroundColor: APP_COLORS.primary }}
      >
        <Ionicons name="refresh" size={16} color={APP_COLORS.textPrimary} />
        <Text className="font-poppins-semibold text-textPrimary text-sm">
          Get Location
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

const StaticMap = ({
  location,
  height,
}: {
  location: string | null | undefined;
  height: number;
}) => {
  const coordinate = useCoordinates(location);

  if (!coordinate) return <EmptyMap height={height} />;

  return (
    <View className="rounded-2xl overflow-hidden" style={{ height }}>
      <MapIframe
        latitude={coordinate.latitude}
        longitude={coordinate.longitude}
        height={height}
      />
    </View>
  );
};

const LiveMap = ({
  location,
  requestLocation,
  displayCurrentAddress,
  height,
}: {
  location: Location.LocationObject | null;
  requestLocation: () => void;
  displayCurrentAddress?: string | null;
  height: number;
}) => {
  if (!location) {
    return <EmptyMap height={height} onPress={requestLocation} showButton />;
  }

  return (
    <View>
      <View className="rounded-2xl overflow-hidden" style={{ height }}>
        <MapIframe
          latitude={location.coords.latitude}
          longitude={location.coords.longitude}
          height={height}
        />
      </View>

      {/* Address + refresh */}
      <View className="flex-row items-center justify-between mt-2">
        <View className="flex-row items-center gap-2 flex-1">
          <Ionicons
            name="location"
            size={16}
            color={APP_COLORS.textSecondary}
          />
          <Text
            className="font-poppins text-textSecondary text-sm flex-1"
            numberOfLines={1}
          >
            {displayCurrentAddress ?? "Fetching address..."}
          </Text>
        </View>
        <TouchableOpacity onPress={requestLocation} className="p-1">
          <Ionicons name="refresh" size={18} color={APP_COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AppMapView = ({ mode, height = 180, label }: AppMapViewProps) => {
  return (
    <View>
      {label && (
        <Text className="font-poppins text-textSecondary text-base mt-2 mb-2">
          {label}
        </Text>
      )}

      {mode.type === "static" ? (
        <StaticMap location={mode.location} height={height} />
      ) : (
        <LiveMap
          location={mode.location}
          requestLocation={mode.requestLocation}
          displayCurrentAddress={mode.displayCurrentAddress}
          height={height}
        />
      )}
    </View>
  );
};

export default AppMapView;
