import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TodayActivityCard = () => {
  return (
    <View className="m-2 p-2 flex-col">
      <View className="flex-row justify-between">
        <Text className="text-textPrimary font-bold text-xl">
          Today&apos;s Activity
        </Text>
        <TouchableOpacity
          className="items-center justify-center"
          onPress={() => console.log("View ALl")}
          activeOpacity={1}
        >
          <Text className="text-primary">View all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodayActivityCard;
