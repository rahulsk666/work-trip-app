import SelectVehiclesModal from "@/components/select-vehicles-modal";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { APP_COLORS } from "@/lib/consts";
import { getLocalDateTime } from "@/lib/date";
import { formatTime } from "@/lib/formatTime";
import { useAvailableVehicles } from "@/module/vehicle/hooks";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface VehicleStatusCardProps {
  vehicle?: Vehicle;
  onChange: (vehicleId: string, vehicle: Vehicle) => void;
  error?: string;
  locationShared: boolean;
}

const VehicleStatusCard = ({
  vehicle,
  onChange,
  error,
  locationShared,
}: VehicleStatusCardProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const { data: vehicles } = useAvailableVehicles();
  return (
    <View className="bg-cardElevated p-2 rounded-lg">
      <View className="flex-row justify-between items-center">
        <View className="flex-col gap-2">
          <View className="flex-row justify-center gap-1 items-center">
            <Text className="text-textSecondary p-2 justify-start text-xl font-semibold">
              {t("trip_form.vehicle_title")}
            </Text>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className="p-2 items-center justify-center"
            >
              {visible ? (
                <Ionicons
                  name="chevron-up"
                  size={20}
                  color={APP_COLORS.textSecondary}
                />
              ) : (
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={APP_COLORS.textSecondary}
                />
              )}
            </TouchableOpacity>
          </View>
          <View className="p-2">
            <Text className="text-white justify-start text-lg font-medium">
              {vehicle ? vehicle?.vehicle_type : t("trip_form.no_vehicle_assigned")}
            </Text>
            <Text className="text-textMuted justify-start text-md">
              Lic: {vehicle ? vehicle?.vehicle_number : t("trip_form.no_vehicle_assigned")}
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)}>
          {vehicle?.image_url ? (
            <Image
              source={{ uri: vehicle?.image_url }}
              alt="vehicle-image"
              resizeMode="cover"
              className="rounded-lg m-2"
              style={{ width: 80, height: 80 }}
            />
          ) : (
            <Ionicons
              name="car-outline"
              size={80}
              className="m-2"
              color={APP_COLORS.textMuted}
            />
          )}
        </TouchableOpacity>
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
            color={locationShared ? APP_COLORS.successDark : APP_COLORS.danger}
          />
          <Text
            className={`${locationShared ? "text-successDark" : "text-danger"} text-sm font-bold`}
          >
            {t("trip_form.location_shared")}
          </Text>
        </View>
        <View className="flex-row justify-start items-center bg-red-100 p-2 gap-2 rounded-lg">
          <IconSymbol name="clock" size={15} color={APP_COLORS.textMuted} />
          <Text className="text-textMuted text-sm font-bold">
            {formatTime(getLocalDateTime())}
          </Text>
        </View>
      </View>
      {error && <Text className="text-sm text-danger px-3 mb-2">{error}</Text>}

      <SelectVehiclesModal
        visible={visible}
        setVisible={setVisible}
        vehicles={vehicles ?? []}
        onChange={(vehicleId, vehicle) => {
          if (vehicle) {
            onChange(vehicleId, vehicle);
          }
        }}
      />
    </View>
  );
};

export default VehicleStatusCard;
