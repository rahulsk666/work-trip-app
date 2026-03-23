import StatusDot from "@/components/StatusDot";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useDuration } from "@/hooks/useDuration";
import { useTripAddress } from "@/hooks/useTripAddress";
import { APP_COLORS } from "@/lib/consts";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useLatestTripQuery } from "../hooks";
import TripCountDown from "./TripCountdown";

const TripSessionCard = () => {
  const { data: trip } = useLatestTripQuery();
  const duration = useDuration(
    trip?.start_time ?? "",
    trip?.end_time,
    trip?.trip_date,
  );
  const { coords } = useTripAddress(trip?.current_location);

  return (
    <View
      className="m-2 p-2 bg-darkCharcoal rounded-xl"
      style={{ backgroundColor: APP_COLORS.darkCharcoal, maxHeight: "60%" }}
    >
      <View className="p-2 flex-row justify-between items-center">
        <View className="flex-row gap-3 items-center">
          <StatusDot
            active
            color={trip?.end_time ? APP_COLORS.danger : APP_COLORS.success}
          />
          <Text className="text-lg font-bold text-textPrimary">
            {trip?.end_time ? "Session Stopped" : "Session Active"}
          </Text>
        </View>
        <View>
          <Text className="text-textPrimary text-sm">
            Date: {trip?.trip_date}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: APP_COLORS.cardElevated,
          marginTop: 4,
        }}
      />
      <TripCountDown duration={duration} />
      <View className="p-2 justify-center items-center">
        <Text className="text-textSecondary font-bold">
          Started at 08:45 AM
        </Text>
      </View>
      <View style={{ height: "40%" }}>
        <Image
          source={require("@/assets/map-fallback.png")}
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            opacity: 0.5,
            borderRadius: 10,
            position: "relative",
          }}
        />
        {/* Dark overlay shade */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: APP_COLORS.darkCharcoal, // ← adjust opacity here
            opacity: 0.5,
            borderRadius: 10,
          }}
        />
        <View
          className="flex-row justify-center items-center"
          style={{
            position: "absolute",
            top: 70,
            left: 30,
            gap: 10,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderRadius: 100,
              borderColor: APP_COLORS.primary,
              padding: 5,
            }}
          >
            <IconSymbol
              name="location.viewfinder"
              size={30}
              color={APP_COLORS.primary}
            />
          </View>
          <View className="flex-col items-start">
            <Text className="text-primary text-xl font-bold">
              Current Location
            </Text>
            <Text className="text-textPrimary">
              {coords
                ? `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`
                : "Fetching coordinates..."}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="p-2 justify-center items-center rounded-xl bg-danger/60"
        style={{
          borderWidth: 1,
          borderColor: APP_COLORS.danger,
          marginTop: 20,
        }}
        activeOpacity={0.9}
        disabled={!!trip?.end_time}
        onPress={() => router.replace("/(trip)/stop")}
      >
        <Text className="text-xl font-bold text-danger">Stop Session</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TripSessionCard;
