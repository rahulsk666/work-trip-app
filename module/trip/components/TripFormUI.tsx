import Button from "@/components/Button";
import Input from "@/components/Input";
import { useDuration } from "@/hooks/useDuration";
import { Duration } from "@/lib/duration";
import { default as ImageUpload } from "@/module/trip/components/ImageUpload";
import TripCountDown from "@/module/trip/components/TripCountdown";
import TripCurrentLocation from "@/module/trip/components/TripCurrentLocation";
import VehicleStatusCard from "@/module/trip/components/VehicleStatusCard";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import * as Location from "expo-location";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { toast } from "sonner-native";
import { Trip } from "../schemas/trip.schema";

type ImageUploadHook = {
  pickImageCamera: () => void;
  uploading: boolean;
  preview: string | null;
  asset: any;
};

type TripFormUIProps = {
  mode: "start" | "stop";
  trip?: Trip | null;
  control: Control<any>;
  isLoading: boolean;
  location: Location.LocationObject | null;
  displayCurrentAddress: string | null;
  requestLocation: () => void;
  vehicle?: Vehicle;
  onVehicleChange?: (vehicleId: string, vehicle: Vehicle) => void;
  duration?: Duration | null;
  dashboardImage: ImageUploadHook;
  frontImage: ImageUploadHook;
  backImage: ImageUploadHook;
  leftImage: ImageUploadHook;
  rightImage: ImageUploadHook;
  handleSubmit: (
    onValid: (data: any) => void,
    onInvalid: () => void,
  ) => () => void;
  onSubmit: (data: any) => void;
};

const TripFormUI = ({
  mode,
  trip,
  control,
  isLoading,
  location,
  displayCurrentAddress,
  requestLocation,
  vehicle,
  onVehicleChange,
  dashboardImage,
  frontImage,
  backImage,
  leftImage,
  rightImage,
  handleSubmit,
  onSubmit,
}: TripFormUIProps) => {
  const isStop = mode === "stop";
  const duration = useDuration(
    trip?.start_time ?? "",
    trip?.end_time,
    trip?.trip_date,
  );

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="m-2 mx-4 p-2 rounded-lg">
        {/* Vehicle selector — start only */}
        {!isStop && (
          <Controller
            name="vehicle_id"
            control={control}
            render={({ field, fieldState }) => (
              <VehicleStatusCard
                vehicle={vehicle}
                onChange={(vId, v) => {
                  field.onChange(vId);
                  onVehicleChange?.(vId, v);
                }}
                locationShared={location !== null}
                error={fieldState.error?.message}
              />
            )}
          />
        )}

        <TripCountDown showStatusBadge={mode === "start"} duration={duration} />

        {/* Odometer */}
        <View className="gap-2">
          <Text className="text-textSecondary text-base mt-2">
            {isStop ? "End Odometer Reading *" : "Odometer Reading *"}
          </Text>
          <Controller
            name={isStop ? "end_km" : "start_km"}
            control={control}
            render={({ field, fieldState }) => (
              <Input
                value={field.value?.toString() ?? ""}
                onChange={(val) =>
                  field.onChange(val ? Number(val) : undefined)
                }
                type="numeric"
                error={fieldState.error?.message}
                suffix="KM"
              />
            )}
          />
        </View>

        {/* Dashboard photo */}
        <View>
          <Text className="text-textSecondary text-base mt-2">
            {isStop ? "End Dashboard Photo *" : "Dashboard Photo *"}
          </Text>
          <View className="justify-center flex-row items-center gap-2 mt-2">
            <ImageUpload
              name={isStop ? "End Dashboard" : "Dashboard Image"}
              pickImageCamera={dashboardImage.pickImageCamera}
              uploading={dashboardImage.uploading}
              preview={dashboardImage.preview}
            />
          </View>
          <Text className="text-textMuted mt-2">
            Photo must clearly show the odometer reading
          </Text>
        </View>

        {/* Vehicle photos */}
        <View>
          <Text className="text-textSecondary text-base mt-2">
            {isStop ? "End Vehicle Photos *" : "Vehicle Photos *"}
          </Text>
          <View className="justify-center flex-col items-center gap-2 mt-2">
            <View className="justify-center flex-row items-center gap-2 mt-2">
              <ImageUpload
                name="Front Image"
                pickImageCamera={frontImage.pickImageCamera}
                uploading={frontImage.uploading}
                preview={frontImage.preview}
              />
              <ImageUpload
                name="Back Image"
                pickImageCamera={backImage.pickImageCamera}
                uploading={backImage.uploading}
                preview={backImage.preview}
              />
            </View>
            <View className="justify-center flex-row items-center gap-2 mt-2">
              <ImageUpload
                name="Left Image"
                pickImageCamera={leftImage.pickImageCamera}
                uploading={leftImage.uploading}
                preview={leftImage.preview}
              />
              <ImageUpload
                name="Right Image"
                pickImageCamera={rightImage.pickImageCamera}
                uploading={rightImage.uploading}
                preview={rightImage.preview}
              />
            </View>
          </View>
        </View>

        {/* Location */}
        <TripCurrentLocation
          label={mode === "start" ? "Starting Location" : "Ending Location"}
          location={location}
          displayCurrentAddress={displayCurrentAddress}
          requestLocation={requestLocation}
        />

        {/* Submit */}
        <View className="items-center mt-6">
          <Button
            text={
              isLoading
                ? isStop
                  ? "Ending Trip..."
                  : "Starting Trip..."
                : isStop
                  ? "End Trip"
                  : "Start Trip"
            }
            classname="w-full m-2"
            onPress={handleSubmit(
              (data) => onSubmit(data),
              () => toast.error("Please fill in all required fields"),
            )}
            disabled={isLoading}
            style={{ width: "100%" }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TripFormUI;
