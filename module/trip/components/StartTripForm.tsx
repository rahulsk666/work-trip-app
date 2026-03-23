import Loading from "@/components/Loading";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useRequestLocation } from "@/hooks/useRequestLoaction";
import { useUserQuery } from "@/module/profile/hooks";
import TripFormUI from "@/module/trip/components/TripFormUI";
import {
  useCreateTripMutation,
  useEditTripMutation,
  useInsertVehiclePhotosMutation,
  useLatestTripQuery,
  useTripCreateForm,
} from "@/module/trip/hooks";
import { VehiclePhoto } from "@/module/trip/schemas/trip.schema";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import { router } from "expo-router";
import React, { useState } from "react";
import { toast } from "sonner-native";

const StartTripForm = () => {
  const { location, displayCurrentAddress, requestLocation } =
    useRequestLocation();
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control } = useTripCreateForm();
  const { data: user } = useUserQuery();
  const { data: todayTrip } = useLatestTripQuery();
  const { mutateAsync: createTrip, isPending: isCreating } =
    useCreateTripMutation();
  const { mutateAsync: editTrip, isPending: isEditing } = useEditTripMutation();
  const { mutateAsync: insertVehiclePhotos } = useInsertVehiclePhotosMutation();

  const isLoading = isSubmitting || isCreating || isEditing;

  const dashboardImage = useImageUpload({ bucket: "trip_dashboard" });
  const frontImage = useImageUpload({ bucket: "trip_dashboard" });
  const backImage = useImageUpload({ bucket: "trip_dashboard" });
  const leftImage = useImageUpload({ bucket: "trip_dashboard" });
  const rightImage = useImageUpload({ bucket: "trip_dashboard" });

  const onSubmit = async (data: any) => {
    if (isLoading) return;
    if (todayTrip)
      return toast.error("A trip has already been started for today");
    if (!vehicle) return toast.error("Vehicle required");
    if (!location) return toast.error("Location is required to start a trip");
    if (!dashboardImage.asset) return toast.error("Dashboard image required");
    if (!frontImage.asset) return toast.error("Front image required");
    if (!backImage.asset) return toast.error("Back image required");
    if (!leftImage.asset) return toast.error("Left image required");
    if (!rightImage.asset) return toast.error("Right image required");

    setIsSubmitting(true);
    try {
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

      const vehiclePhotos = [
        { trip_id: trip.id, photo_type: "START_FRONT", photo_url: frontUrl },
        { trip_id: trip.id, photo_type: "START_BACK", photo_url: backUrl },
        { trip_id: trip.id, photo_type: "START_LEFT", photo_url: leftUrl },
        { trip_id: trip.id, photo_type: "START_RIGHT", photo_url: rightUrl },
      ].filter((p) => p.photo_url);

      if (vehiclePhotos.length > 0) {
        await insertVehiclePhotos(vehiclePhotos as VehiclePhoto[]);
      }

      await editTrip({ id: trip.id, data: { start_image: startUrl } });

      toast.success("Trip started successfully");
      router.replace("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && <Loading showBackground={false} label="Starting trip..." />}
      <TripFormUI
        mode="start"
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
        location={location}
        displayCurrentAddress={displayCurrentAddress}
        requestLocation={requestLocation}
        vehicle={vehicle}
        onVehicleChange={(_, v) => setVehicle(v)}
        dashboardImage={dashboardImage}
        frontImage={frontImage}
        backImage={backImage}
        leftImage={leftImage}
        rightImage={rightImage}
      />
    </>
  );
};

export default StartTripForm;
