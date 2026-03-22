import Button from "@/components/Button";
import Input from "@/components/Input";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useUserQuery } from "@/module/profile/hooks";
import TripCurrentLocation from "@/module/trip/components/TripCurrentLocation";
import TripImageUpload from "@/module/trip/components/TripImageUpload";
import VehicleStatusCard from "@/module/trip/components/VehicleStatusCard";
import {
  useCreateTripMutation,
  useEditTripMutation,
  useInsertVehiclePhotosMutation,
  useTodayTripQuery,
  useTripCreateForm,
} from "@/module/trip/hooks";
import { VehiclePhoto } from "@/module/trip/schemas/trip.schema";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { toast } from "sonner-native";

const StartTripForm = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState<
    string | null
  >(null);
  const { handleSubmit, control } = useTripCreateForm();
  const { data: user } = useUserQuery();
  const { mutateAsync: createTrip, isPending } = useCreateTripMutation();
  const { mutateAsync: editTrip } = useEditTripMutation();
  const { mutateAsync: insertVehiclePhotos } = useInsertVehiclePhotosMutation();
  const { data: todayTrip } = useTodayTripQuery();

  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const dashboardImage = useImageUpload({
    bucket: "trip_dashboard",
  });
  const frontImage = useImageUpload({ bucket: "trip_dashboard" });
  const backImage = useImageUpload({ bucket: "trip_dashboard" });
  const leftImage = useImageUpload({ bucket: "trip_dashboard" });
  const rightImage = useImageUpload({ bucket: "trip_dashboard" });

  async function requestLocation() {
    try {
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        toast.error("Please enable location services in your device settings");
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        toast.error("Location permission is required to start a trip");
        return;
      }

      const accurate = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(accurate);

      // if (accurate) {
      const { latitude, longitude } = accurate.coords;

      //provide lat and long to get the the actual address
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      //loop on the responce to get the actual result
      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
      // }
    } catch (err: any) {
      if (location) return; // silently ignore if we already have a location

      if (err?.message?.includes("Current location is unavailable")) {
        toast.error("GPS unavailable. Please tap Refresh to try again.");
      } else {
        toast.error(
          "Unable to get location. Please check your device settings.",
        );
      }
    }
  }

  const onSubmit = async (data: any) => {
    try {
      if (todayTrip) {
        toast.error("A trip has already been started for today");
        return;
      }

      if (!vehicle) {
        toast.error("Vehicle required");
        return;
      }
      if (!location) {
        toast.error("Location permission is required to start a trip");
        return;
      }
      if (!dashboardImage.asset) {
        toast.error("Dashboard Image required");
        return;
      }

      if (!frontImage.asset) {
        toast.error("Front Image required");
        return;
      }

      if (!backImage.asset) {
        toast.error("Back Image required");
        return;
      }

      if (!leftImage.asset) {
        toast.error("Left Image required");
        return;
      }

      if (!rightImage.asset) {
        toast.error("Right Image required");
        return;
      }

      const trip = await createTrip({
        ...data,
        user_id: user?.id,
        vehicle_id: vehicle.id,
        trip_date: new Date().toISOString().split("T")[0],
        start_time: new Date().toISOString(),
        start_location: `POINT(${location.coords.longitude} ${location.coords.latitude})`,
      });

      const [startUrl, frontUrl, backUrl, leftUrl, rightUrl] =
        await Promise.all([
          dashboardImage.upload(`${trip.id}/start-image`),
          frontImage.asset ? frontImage.upload(`${trip.id}/front`) : null,
          backImage.asset ? backImage.upload(`${trip.id}/back`) : null,
          leftImage.asset ? leftImage.upload(`${trip.id}/left`) : null,
          rightImage.asset ? rightImage.upload(`${trip.id}/right`) : null,
        ]);

      // 3️⃣ Insert vehicle photos into vehicle_photos table
      const vehiclePhotos = [
        { trip_id: trip.id, photo_type: "FRONT", photo_url: frontUrl },
        { trip_id: trip.id, photo_type: "BACK", photo_url: backUrl },
        { trip_id: trip.id, photo_type: "LEFT", photo_url: leftUrl },
        { trip_id: trip.id, photo_type: "RIGHT", photo_url: rightUrl },
      ].filter((p) => p.photo_url);

      if (vehiclePhotos.length > 0) {
        await insertVehiclePhotos(vehiclePhotos as VehiclePhoto[]);
      }

      // // 3️⃣ Save URLs
      await editTrip({
        id: trip.id,
        data: {
          start_image: startUrl,
        },
      });
      toast.success("Trip started successfully");
      router.navigate("/(tabs)");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="m-2 mx-4 p-2 rounded-lg">
        <Controller
          name="vehicle_id"
          control={control}
          render={({ field, fieldState }) => (
            <VehicleStatusCard
              vehicle={vehicle}
              onChange={(vId, v) => {
                field.onChange(vId);
                setVehicle(v);
              }}
              locationShared={location !== null}
              error={fieldState.error?.message}
            />
          )}
        />

        <View className="gap-2">
          <Text className="text-textSecondary text-base mt-2">
            Odometer Reading *
          </Text>

          <Controller
            name="start_km"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                value={field.value?.toString() ?? ""}
                onChange={(val) =>
                  field.onChange(val ? Number(val) : undefined)
                }
                type="numeric"
                error={fieldState.error?.message}
              />
            )}
          />
        </View>
        <View>
          <Text className="text-textSecondary text-base mt-2">
            Dashboard Photo *
          </Text>
          <View className="justify-center flex-row items-center gap-2 mt-2">
            <TripImageUpload
              pickImage={dashboardImage.pickImage}
              uploading={dashboardImage.uploading}
              preview={dashboardImage.preview}
            />
          </View>
          <Text className="text-textMuted mt-2">
            Photo must clearly show the odometer reading
          </Text>
        </View>
        <View>
          <Text className="text-textSecondary text-base mt-2">
            Vehicle Photos *
          </Text>
          <View className="justify-center flex-col items-center gap-2 mt-2">
            <View className="justify-center flex-row items-center gap-2 mt-2">
              <TripImageUpload
                pickImage={frontImage.pickImage}
                uploading={frontImage.uploading}
                preview={frontImage.preview}
              />
              <TripImageUpload
                pickImage={backImage.pickImage}
                uploading={backImage.uploading}
                preview={backImage.preview}
              />
            </View>
            <View className="justify-center flex-row items-center gap-2 mt-2">
              <TripImageUpload
                pickImage={leftImage.pickImage}
                uploading={leftImage.uploading}
                preview={leftImage.preview}
              />
              <TripImageUpload
                pickImage={rightImage.pickImage}
                uploading={rightImage.uploading}
                preview={rightImage.preview}
              />
            </View>
          </View>
          <Text className="text-textMuted mt-2">
            Photo must clearly show the odometer reading
          </Text>
        </View>
        <TripCurrentLocation
          location={location}
          displayCurrentAddress={displayCurrentAddress}
          requestLocation={requestLocation}
        />
        <View className="items-center mt-6">
          <Button
            text={"Start Trip"}
            classname="w-full m-2"
            onPress={handleSubmit(
              (data) => onSubmit(data),
              (errors) => {
                toast.error("Please fill in all required fields");
              },
            )}
            disabled={isPending}
            style={{ width: "100%" }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default StartTripForm;
