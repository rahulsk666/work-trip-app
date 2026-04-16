import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import Input from "@/components/Input";
import { useDuration } from "@/hooks/useDuration";
import { APP_COLORS } from "@/lib/consts";
import { Duration } from "@/lib/duration";
import { default as ImageUpload } from "@/module/trip/components/ImageUpload";
import TripCountDown from "@/module/trip/components/TripCountdown";
import TripCurrentLocation from "@/module/trip/components/TripCurrentLocation";
import VehicleStatusCard from "@/module/trip/components/VehicleStatusCard";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const isStop = mode === "stop";
  const duration = useDuration(
    trip?.start_time ?? "",
    trip?.end_time,
    trip?.trip_date,
  );
  const [modal, setModal] = useState<{
    visible: boolean;
    onConfirm: () => void;
  }>({
    visible: false,
    onConfirm: () => { },
  });

  const closeModal = () => setModal({ visible: false, onConfirm: () => { } });

  const err = (msg?: string) => msg ? t(msg) : undefined;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {/* <View className="m-2 mx-4 p-2 rounded-lg"> */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 16, // ✅ accounts for nav bar
        }}
        keyboardShouldPersistTaps="handled"
        className="gap-2 p-2 m-2"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={Keyboard.dismiss}
      >
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
                error={err(fieldState.error?.message)}
              />
            )}
          />
        )}

        <TripCountDown showStatusBadge={mode === "start"} duration={duration} />

        {/* Odometer */}
        <View className="gap-2">
          <Text className="text-textSecondary text-base mt-2">
            {isStop ? t("trip_form.end_odometer_reading") : t("trip_form.odometer_reading")}
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
                error={err(fieldState.error?.message)}
                suffix="KM"
                onSubmitEditing={Keyboard.dismiss}
              />
            )}
          />
        </View>

        {/* Dashboard photo */}
        <View>
          <Text className="text-textSecondary text-base mt-2">
            {isStop ? t("trip_form.end_dashboard_photo") : t("trip_form.dashboard_photo")}
          </Text>
          <View className="justify-center flex-row items-center gap-2 mt-2">
            <ImageUpload
              name={isStop ? t("trip_form.end_dashboard_image") : t("trip_form.dashboard_image")}
              pickImageCamera={dashboardImage.pickImageCamera}
              uploading={dashboardImage.uploading}
              preview={dashboardImage.preview}
            />
          </View>
          <Text className="text-textMuted mt-2">
            {t("trip_form.dashboard_photo_note")}
          </Text>
        </View>

        {/* Vehicle photos */}
        <View>
          <Text className="text-textSecondary text-base mt-2">
            {isStop ? t("trip_form.end_vehicle_photos") : t("trip_form.vehicle_photos")}
          </Text>
          <View className="justify-center flex-col items-center gap-2 mt-2">
            <View className="justify-center flex-row items-center gap-2 mt-2">
              <ImageUpload
                name={t("trip_form.front_image")}
                pickImageCamera={frontImage.pickImageCamera}
                uploading={frontImage.uploading}
                preview={frontImage.preview}
              />
              <ImageUpload
                name={t("trip_form.back_image")}
                pickImageCamera={backImage.pickImageCamera}
                uploading={backImage.uploading}
                preview={backImage.preview}
              />
            </View>
            <View className="justify-center flex-row items-center gap-2 mt-2">
              <ImageUpload
                name={t("trip_form.left_image")}
                pickImageCamera={leftImage.pickImageCamera}
                uploading={leftImage.uploading}
                preview={leftImage.preview}
              />
              <ImageUpload
                name={t("trip_form.right_image")}
                pickImageCamera={rightImage.pickImageCamera}
                uploading={rightImage.uploading}
                preview={rightImage.preview}
              />
            </View>
          </View>
        </View>

        {/* Location */}
        <TripCurrentLocation
          label={mode === "start" ? t("trip_form.starting_location") : t("trip_form.ending_location")}
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
                  ? t("trip_form.stopping_trip")
                  : t("trip_form.starting_trip")
                : isStop
                  ? t("trip_form.end_trip")
                  : t("trip_form.start_trip")
            }
            classname="w-full m-2"
            onPress={handleSubmit(
              (data) =>
                isStop
                  ? setModal({
                    visible: true,
                    onConfirm: () => {
                      closeModal();
                      onSubmit(data);
                    },
                  })
                  : onSubmit(data),
              () => toast.error(t("errors.fill_required_fields")),
            )}
            disabled={isLoading}
            style={{ width: "100%" }}
          />
        </View>
      </ScrollView>
      {/* </View> */}
      <ConfirmModal
        visible={modal.visible}
        description={t("trip_form.end_trip_note")}
        onConfirm={modal.onConfirm}
        onCancel={closeModal}
        title={t("trip_form.confirm_trip_end")}
        icon={
          <Ionicons name="warning" size={40} color={APP_COLORS.warningDark} />
        }
        variant="warning"
      />
    </KeyboardAvoidingView>
  );
};

export default TripFormUI;
