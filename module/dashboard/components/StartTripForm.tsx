import Input from "@/components/Input";
import TripImageUpload from "@/module/trip/components/TripImageUpload";
import VehicleStatusCard from "@/module/trip/components/VehicleStatusCard";
import React, { useState } from "react";
import { Text, View } from "react-native";

const StartTripForm = () => {
  const [odometer, setOdometer] = useState<string>("");
  return (
    <View className="m-2 mx-4 p-2 rounded-lg">
      <VehicleStatusCard />

      <View className="gap-2">
        <Text className="text-textMuted text-base mt-2">
          Odometer Reading *
        </Text>
        <Input
          // label="Odometer Reading"
          value={odometer}
          onChange={(value) => setOdometer(value)}
          type="numeric"
        />
      </View>
      <View>
        <Text className="text-textMuted text-base mt-2">Dashboard Photo *</Text>
        <View className="justify-center flex-row items-center gap-2 mt-2">
          <TripImageUpload path="" />
          <TripImageUpload path="" />
        </View>
      </View>
    </View>
  );
};

export default StartTripForm;
