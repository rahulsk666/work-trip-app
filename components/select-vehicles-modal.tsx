import { APP_COLORS } from "@/lib/consts";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppIcon } from "./icon";

interface SelectVehiclesModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  vehicles?: Vehicle[];
  selectedVehicle?: Vehicle;
  onChange?: (vehicleId: string, vehicle?: Vehicle) => void;
}

const SelectVehiclesModal = ({
  visible,
  setVisible,
  vehicles,
  onChange,
  selectedVehicle,
}: SelectVehiclesModalProps) => {
  return (
    <>
      <Modal visible={visible} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/50 justify-center px-6"
          onPress={() => setVisible(false)}
        >
          <View className="bg-cardElevated rounded-2xl max-h-[70%] p-4">
            <Text className="text-lg text-textPrimary mb-4">
              Select Vehicle
            </Text>

            <FlatList
              data={vehicles ?? []}
              keyExtractor={(item) => item.id}
              style={{ maxHeight: 180 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange && onChange(item.id, item);
                    setVisible(false);
                  }}
                  className="py-3 border-b border-borderSubtle"
                >
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-textPrimary">
                        {item.vehicle_number}
                      </Text>
                      <Text className="text-textSecondary text-sm">
                        {item.vehicle_type}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-3">
                      <Image
                        source={
                          item.image_url
                            ? { uri: item.image_url }
                            : require("@/assets/default-vehicle.png")
                        }
                        alt="Vehicle Image"
                        style={{ width: 40, height: 40 }}
                        className="rounded-lg"
                      />
                      <View className="w-[30px] h-[30px]">
                        {item.id === selectedVehicle?.id && (
                          <AppIcon
                            IconComponent={MaterialIcons}
                            name="done"
                            color={APP_COLORS.success}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default SelectVehiclesModal;
