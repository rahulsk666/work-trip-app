import { useDuration } from "@/hooks/useDuration";
import { APP_COLORS } from "@/lib/consts";
import { getAddressFromCoords, parseWKBPoint } from "@/lib/location";
import { withOpacity } from "@/lib/utils";
import { useTodayTripQuery } from "@/module/trip/hooks";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";

const DutyInfo = () => {
  const { data: trip } = useTodayTripQuery();

  const [address, setAddress] = useState<string | null>(null);
  const duration = useDuration(
    trip?.start_time ?? "",
    trip?.end_time,
    trip?.trip_date,
  );

  useEffect(() => {
    if (!trip?.current_location) return;

    let latitude: number;
    let longitude: number;

    // Try POINT(lng lat) format first
    const match = trip.current_location.match(/POINT\(([^ ]+) ([^ ]+)\)/);
    if (match) {
      longitude = parseFloat(match[1]);
      latitude = parseFloat(match[2]);
    } else {
      // Try WKB binary format
      const coords = parseWKBPoint(trip.current_location);
      if (!coords) return;
      ({ latitude, longitude } = coords);
    }

    getAddressFromCoords(latitude, longitude).then(setAddress);
  }, [trip?.current_location]);

  if (!trip) {
    return (
      <View
        className="bg-darkCharcoal rounded-xl p-5 items-center justify-center"
        style={{
          minHeight: 150,
          borderStyle: "dashed",
          borderWidth: 2,
          borderColor: withOpacity(APP_COLORS.textPrimary, 0.3),
          marginVertical: 5,
        }}
      >
        <Ionicons
          name="location-sharp"
          size={40}
          color={withOpacity(APP_COLORS.textPrimary, 0.3)}
          className="border rounded-full p-2 m-3 bg-textMuted"
          style={{
            borderColor: withOpacity(APP_COLORS.textPrimary, 0.3),
            backgroundColor: withOpacity(APP_COLORS.primary, 0.1),
            marginVertical: 12,
          }}
        />
        <Text
          className="text-textPrimary text-xl font-bold mt-3"
          style={{ textAlign: "center", maxWidth: 250 }}
        >
          Your day hasn&apos;t started yet.
        </Text>
        <Text
          className="text-textPrimary text-sm text-center font-medium mt-1"
          style={{ maxWidth: 250, textAlign: "center" }}
        >
          Tap below to begin your trip and log your duty hours.
        </Text>
      </View>
    );
  }
  return (
    <ImageBackground
      source={require("@/assets/map-fallback.png")}
      imageStyle={{ borderRadius: 12 }}
      style={{ borderRadius: 12, overflow: "hidden", marginVertical: 5 }}
    >
      <LinearGradient
        colors={[withOpacity(APP_COLORS.card, 0.8), APP_COLORS.card]}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between z-10 p-5">
          <View className="bg-primary p-2 rounded-lg">
            <Text className="text-textPrimary text-sm uppercase font-bold">
              On Duty
            </Text>
          </View>
          <View className="bg-textPrimary/20 w-[40px] h-[40px] rounded-full flex items-center justify-center">
            <Ionicons
              name="map-sharp"
              size={20}
              color={APP_COLORS.textPrimary}
            />
          </View>
        </View>

        {/* Details */}
        <View className="p-5 flex gap-2">
          <Text className="text-textSecondary">Session Duration</Text>
          <Text
            className="text-textPrimary font-bold text-5xl"
            style={{ fontSize: 48 }}
          >
            {duration.formatted}
          </Text>
          <View className="flex-row gap-2 items-center">
            <Fontisto
              name="map-marker-alt"
              size={16}
              color={APP_COLORS.textSecondary}
            />
            <Text className="text-textSecondary font-medium text-sm">
              {address || "Fetching location..."}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default DutyInfo;
