import SelectVehiclesModal from "@/components/select-vehicles-modal";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { APP_COLORS } from "@/lib/consts";
import { useAvailableVehicles } from "@/module/vehicle/hooks";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const VehicleStatusCard = () => {
  const [visible, setVisible] = useState(false);
  const { data: vechicles } = useAvailableVehicles();
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  return (
    <View className="bg-cardElevated m-2 mx-4 p-2 rounded-lg">
      <View className="flex-row justify-between items-center">
        <View className="flex-col gap-2">
          <View className="flex-row justify-start gap-1 items-center">
            <Text className="text-textSecondary p-2 justify-start text-xl font-semibold">
              Assigned Vehicle
            </Text>
            <TouchableOpacity onPress={() => setVisible(true)} className="p-2">
              <IconSymbol name="pencil.tip" size={18} color={"white"} />
            </TouchableOpacity>
          </View>
          <View className="p-2">
            <Text className="text-white justify-start text-lg font-medium">
              {vehicle ? vehicle?.vehicle_type : "No vehicle assigned"}
            </Text>
            <Text className="text-textMuted justify-start text-md">
              Lic: {vehicle ? vehicle?.vehicle_number : "No vehicle assigned"}
            </Text>
          </View>
        </View>
        <Image
          source={
            vehicle?.image_url
              ? { uri: vehicle?.image_url }
              : require("@/assets/default-vehicle.png")
          }
          alt="vehicle-image"
          className="rounded-lg m-2"
          style={{ width: 80, height: 80 }}
        />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: APP_COLORS.textMuted,
          marginTop: 4,
        }}
      />

      <View className="flex-row justify-between items-center mt-2">
        <View className="flex-row justify-start items-center bg-green-100 gap-1 p-2 rounded-lg">
          <IconSymbol
            name="location.fill"
            size={15}
            color={APP_COLORS.successDark}
          />
          <Text className="text-successDark text-sm font-bold">
            Location shared (3m)
          </Text>
        </View>
        <View className="flex-row justify-start items-center bg-red-100 p-2 gap-2 rounded-lg">
          <IconSymbol name="clock" size={15} color={APP_COLORS.textMuted} />
          <Text className="text-textMuted text-sm font-bold">8:45 am</Text>
        </View>
      </View>
      <SelectVehiclesModal
        visible={visible}
        setVisible={setVisible}
        vehicles={vechicles}
        onChange={(vehicleId, vehicle) => {
          setVehicle(vehicle);
        }}
      />
    </View>
  );
};

export default VehicleStatusCard;
