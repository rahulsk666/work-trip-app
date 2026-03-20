import { useAvailableVehicles } from "@/module/vehicle/hooks";
import type { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SelectVehiclesModal from "./select-vehicles-modal";

type SelectVehicleProps = {
  value?: string;
  onChange?: (vehicleId: string, vehicle?: Vehicle) => void;
  label?: string;
  disabled?: boolean;
};

export function SelectVehicle({
  value,
  onChange,
  label = "Select Vehicle",
  disabled = false,
}: SelectVehicleProps) {
  const [visible, setVisible] = useState(false);

  const { data: vechicles, isLoading } = useAvailableVehicles();

  const selectedVehicle = vechicles?.find((v) => v.id === value);

  return (
    <View className="gap-2">
      <Text className="text-sm text-textSecondary">{label}</Text>

      {/* Trigger */}
      <TouchableOpacity
        disabled={disabled || isLoading}
        onPress={() => setVisible(true)}
        className="bg-card border border-borderSubtle rounded-xl px-4 py-3"
      >
        <Text className="text-textPrimary">
          {isLoading
            ? "Loading vehicles..."
            : selectedVehicle
              ? `${selectedVehicle.vehicle_number} • ${selectedVehicle.vehicle_type}`
              : "Choose a vehicle"}
        </Text>
      </TouchableOpacity>

      {/* Modal-Dropdown */}
      <SelectVehiclesModal
        visible={visible}
        setVisible={setVisible}
        vehicles={vechicles}
        onChange={onChange}
        selectedVehicle={selectedVehicle}
      />
    </View>
  );
}
