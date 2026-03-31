import { useAddress } from "@/hooks/useAddress";
import { useDuration } from "@/hooks/useDuration";
import { APP_COLORS } from "@/lib/consts";
import { withOpacity } from "@/lib/utils";
import { useLatestTripQuery } from "@/module/trip/hooks";
import { useLatestWorkQuery } from "@/module/work/hooks";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import SwipeButton from "rn-swipe-button";

const DutyInfo = () => {
  const { data: trip } = useLatestTripQuery();
  const { data: work } = useLatestWorkQuery(trip?.id);
  const { address } = useAddress(trip?.current_location);
  const duration = useDuration(
    trip?.start_time ?? "",
    trip?.end_time,
    trip?.trip_date,
  );

  if (!trip) {
    return (
      <View
        className="bg-darkCharcoal rounded-xl p-5 items-center justify-center"
        style={{
          minHeight: 130,
          maxHeight: 150,
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
    <View
      className="flex-col rounded-xl overflow-hidden bg-darkCharcoal mb-2"
      style={{ minHeight: 300 }}
    >
      <ImageBackground
        source={require("@/assets/map-fallback.png")}
        imageStyle={{ borderRadius: 12 }}
        style={{ borderRadius: 12, overflow: "hidden", marginTop: 5 }}
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
            <TouchableOpacity onPress={() => router.navigate("/(track)/track")}>
              <Text
                className="text-textPrimary font-bold text-5xl"
                style={{ fontSize: 48 }}
              >
                {duration?.formatted}
              </Text>
            </TouchableOpacity>
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
          {trip.status === "STARTED" && (
            <View className="p-2 bg-cardElevated rounded-b-lg overflow-hidden">
              <SwipeButton
                disableResetOnTap
                railBackgroundColor={APP_COLORS.dangerShadow}
                railFillBorderColor={APP_COLORS.dangerDark}
                railBorderColor={
                  work?.status === "STARTED"
                    ? APP_COLORS.textMuted
                    : APP_COLORS.dangerDark
                }
                onSwipeSuccess={() => {
                  router.navigate("/(trip)/stop");
                }}
                disabled={work?.status === "STARTED"}
                disabledRailBackgroundColor={APP_COLORS.textMutedShadow}
                disabledThumbIconBackgroundColor={APP_COLORS.textMutedShadow}
                disabledThumbIconBorderColor={APP_COLORS.textMuted}
                shouldResetAfterSuccess
                swipeSuccessThreshold={80}
                railFillBackgroundColor={APP_COLORS.dangerDark}
                thumbIconBackgroundColor={APP_COLORS.dangerDark}
                thumbIconBorderColor={APP_COLORS.dangerDark}
                thumbIconComponent={() => (
                  <Ionicons
                    name="square"
                    color={
                      work?.status === "STARTED"
                        ? APP_COLORS.textMuted
                        : APP_COLORS.white
                    }
                    size={20}
                  />
                )}
                thumbIconStyles={{
                  shadowColor: APP_COLORS.dangerShadow,
                  shadowOffset: { width: 70, height: 70 },
                  shadowRadius: 70,
                  shadowOpacity: 0.8,
                  elevation: 10,
                  padding: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                titleColor={
                  work?.status === "STARTED"
                    ? APP_COLORS.textMuted
                    : APP_COLORS.dangerDark
                }
                title="Stop Session"
                titleStyles={{ fontWeight: 900 }}
              />
            </View>
          )}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default DutyInfo;
