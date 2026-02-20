import { APP_COLORS } from "@/lib/consts";
import { withOpacity } from "@/lib/utils";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, Text, View } from "react-native";

const mapImage =
  "https://blog.batchgeo.com/wp-content/uploads/2023/06/Optimal-route-1024x639.png";

const DutyInfo = () => {
  return (
    <ImageBackground
      source={{ uri: mapImage }}
      imageStyle={{ borderRadius: 12 }}
      style={{ borderRadius: 12, overflow: "hidden" }}
      className="my-5"
    >
      <LinearGradient
        colors={[withOpacity(APP_COLORS.card, 0.8), APP_COLORS.card]}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between z-10 p-5">
          <View>
            <Text className="text-textPrimary text-sm bg-primary p-2 px-4 rounded-lg uppercase font-bold">
              On Duty
            </Text>
          </View>
          <View className="bg-textPrimary/10 w-[40px] h-[40px] rounded-full flex items-center justify-center">
            <Ionicons
              name="map-sharp"
              size={20}
              color={APP_COLORS.textPrimary}
            />
          </View>
        </View>

        {/* Details */}
        <View className="p-5 flex gap-2">
          <Text className="text-textSecondary">Session Diration</Text>
          <Text className="text-textPrimary font-bold text-5xl">03:15:20</Text>
          <View className="flex-row gap-2 items-center">
            <Fontisto
              name="map-marker-alt"
              size={16}
              color={APP_COLORS.textSecondary}
            />
            <Text className="text-textSecondary font-medium text-sm">
              I-5, South Bound, Mile 42
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default DutyInfo;
