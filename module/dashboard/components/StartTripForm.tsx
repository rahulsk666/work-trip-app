import Button from "@/components/Button";
import Input from "@/components/Input";
import { useImageUpload } from "@/hooks/useImageUpload";
import TripImageUpload from "@/module/trip/components/TripImageUpload";
import VehicleStatusCard from "@/module/trip/components/VehicleStatusCard";
import {
  useCreateTripMutation,
  useEditTripMutation,
  useTripCreateForm,
} from "@/module/trip/hooks";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Image, Text, View } from "react-native";
import { toast } from "sonner-native";

const StartTripForm = () => {
  const { handleSubmit, control } = useTripCreateForm();
  const { mutateAsync: createTrip, isPending } = useCreateTripMutation();
  const { mutateAsync: editTrip } = useEditTripMutation();
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const dashboardImage1 = useImageUpload({
    bucket: "trip_dashboard",
  });

  const dashboardImage2 = useImageUpload({
    bucket: "trip_dashboard",
  });

  const onSubmit = async (data: any) => {
    try {
      if (!vehicle) {
        toast.error("Vehicle required");
        return;
      }
      if (!dashboardImage1.asset) {
        toast.error("Dashboard Image required");
        return;
      }

      const trip = await createTrip({
        ...data,
        vehicle_id: vehicle.id,
        trip_date: new Date().toISOString(),
        start_time: new Date().toISOString(),
        start_location: "POINT(77.5946 12.9716)", // TODO: get from location
      });

      let startUrl;
      if (dashboardImage1.asset) {
        startUrl = await dashboardImage1.upload(`${trip.id}/image-1`);
      }

      let endUrl;
      if (dashboardImage2.asset) {
        endUrl = await dashboardImage2.upload(`${trip.id}/image-2`);
      }

      // // 3️⃣ Save URLs
      await editTrip({
        id: trip.id,
        data: {
          start_image: startUrl,
          end_image: endUrl ?? "",
        },
      });
      toast.success("Trip started successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to start trip");
    }
  };

  return (
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
              onChange={(val) => field.onChange(val ? Number(val) : undefined)}
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
            pickImage={dashboardImage1.pickImage}
            uploading={dashboardImage1.uploading}
            preview={dashboardImage1.preview}
          />
          <TripImageUpload
            pickImage={dashboardImage2.pickImage}
            uploading={dashboardImage2.uploading}
            preview={dashboardImage2.preview}
          />
        </View>
        <Text className="text-textMuted mt-2">
          Photo must clearly show the odometer reading
        </Text>
      </View>
      <View>
        <Text className="text-textSecondary text-base mt-5">
          Starting Location
        </Text>
        <View className="h-52 w-full mt-2 rounded-xl">
          <Image
            source={{
              uri: "https://blog.batchgeo.com/wp-content/uploads/2023/06/Optimal-route-1024x639.png",
            }}
            alt="map-image"
            className="rounded-xl"
            style={{ width: "auto", height: 150 }}
          />
        </View>
      </View>
      <View className="items-center mt-6">
        <Button
          text={"Start Trip"}
          classname="w-full m-2"
          onPress={handleSubmit((data) => onSubmit(data))}
          disabled={isPending}
          style={{ width: "100%" }}
        />
      </View>
    </View>
  );
};

export default StartTripForm;
