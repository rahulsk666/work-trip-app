import React from "react";
import { Text, View } from "react-native";

interface CountDownBoxProps {
  label: string;
  value?: string | number | null;
}

const CountdownBox = ({ label, value }: CountDownBoxProps) => {
  return (
    <View className="flex-col gap-2 justify-center items-center">
      <View className="p-4 bg-card rounded-lg">
        <Text className="text-3xl font-bold text-textPrimary">
          {value ?? "00"}
        </Text>
      </View>
      <View>
        <Text className="text-sm font-bold text-textPrimary">{label}</Text>
      </View>
    </View>
  );
};

export default CountdownBox;
