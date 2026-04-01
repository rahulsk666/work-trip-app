import Loading from "@/components/Loading";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useRequestLocation } from "@/hooks/useRequestLocation";
import { getLocalDateTime } from "@/lib/date";
import TripFormUI from "@/module/trip/components/TripFormUI";
import {
  useEditTripMutation,
  useInsertVehiclePhotosMutation,
  useLatestTripQuery,
  useTripEndForm,
} from "@/module/trip/hooks";
import { VehiclePhoto } from "@/module/trip/schemas/trip.schema";
import { router } from "expo-router";
import React, { useState } from "react";
import { toast } from "sonner-native";

const StopTripForm = () => {
  const { location, displayCurrentAddress, requestLocation } =
    useRequestLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control } = useTripEndForm();
  const { data: todayTrip } = useLatestTripQuery();
  const { mutateAsync: editTrip, isPending: isEditing } = useEditTripMutation();
  const { mutateAsync: insertVehiclePhotos } = useInsertVehiclePhotosMutation();

  const isLoading = isSubmitting || isEditing;

  const dashboardImage = useImageUpload({ bucket: "trip_dashboard" });
  const frontImage = useImageUpload({ bucket: "trip_dashboard" });
  const backImage = useImageUpload({ bucket: "trip_dashboard" });
  const leftImage = useImageUpload({ bucket: "trip_dashboard" });
  const rightImage = useImageUpload({ bucket: "trip_dashboard" });

  const onSubmit = async (data: any) => {
    if (isLoading) return;
    if (!todayTrip) return toast.error("No active trip found");
    if (!location) return toast.error("Location is required to end the trip");
    if (!dashboardImage.asset) return toast.error("Dashboard image required");
    if (!frontImage.asset) return toast.error("Front image required");
    if (!backImage.asset) return toast.error("Back image required");
    if (!leftImage.asset) return toast.error("Left image required");
    if (!rightImage.asset) return toast.error("Right image required");

    setIsSubmitting(true);
    try {
      const [endUrl, frontUrl, backUrl, leftUrl, rightUrl] = await Promise.all([
        dashboardImage.upload(`${todayTrip.id}/end-image`),
        frontImage.asset
          ? frontImage.upload(`${todayTrip.id}/end-front`)
          : null,
        backImage.asset ? backImage.upload(`${todayTrip.id}/end-back`) : null,
        leftImage.asset ? leftImage.upload(`${todayTrip.id}/end-left`) : null,
        rightImage.asset
          ? rightImage.upload(`${todayTrip.id}/end-right`)
          : null,
      ]);

      const vehiclePhotos = [
        { trip_id: todayTrip.id, photo_type: "END_FRONT", photo_url: frontUrl },
        { trip_id: todayTrip.id, photo_type: "END_BACK", photo_url: backUrl },
        { trip_id: todayTrip.id, photo_type: "END_LEFT", photo_url: leftUrl },
        { trip_id: todayTrip.id, photo_type: "END_RIGHT", photo_url: rightUrl },
      ].filter((p) => p.photo_url);

      if (vehiclePhotos.length > 0) {
        await insertVehiclePhotos(vehiclePhotos as VehiclePhoto[]);
      }

      await editTrip({
        id: todayTrip.id,
        data: {
          ...data,
          status: "ENDED",
          end_time: getLocalDateTime(),
          end_location: `POINT(${location.coords.longitude} ${location.coords.latitude})`,
          end_image: endUrl,
        },
      });

      toast.success("Trip ended successfully");
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
      {isLoading && <Loading showBackground={false} label="Stoping trip..." />}
      <TripFormUI
        mode="stop"
        trip={todayTrip}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
        location={location}
        displayCurrentAddress={displayCurrentAddress}
        requestLocation={requestLocation}
        dashboardImage={dashboardImage}
        frontImage={frontImage}
        backImage={backImage}
        leftImage={leftImage}
        rightImage={rightImage}
      />
    </>
  );
};

export default StopTripForm;
